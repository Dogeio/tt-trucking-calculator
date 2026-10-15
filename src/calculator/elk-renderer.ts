import { Graph } from './types.js';
import { getBestTextColor } from './utils.js';
import type { ELK, ElkNode, ElkExtendedEdge } from 'elkjs';

const HEADER_FONT = "600 13px 'Segoe UI', Arial, sans-serif";
const HEADER_LINE_HEIGHT = 17;
const BODY_FONT = "400 12px 'Segoe UI', Arial, sans-serif";
const BODY_LINE_HEIGHT = 14;
const NODE_PADDING_X = 24;
const SECTION_PADDING_V = 3;
const DIVIDER_HEIGHT = 1;
const BADGE_FONT = "600 8px 'Segoe UI', Arial, sans-serif";
const BADGE_PADDING_X = 5;
const BADGE_PADDING_Y = 3;
const BADGE_MARGIN = 3;

let _measureCtx: CanvasRenderingContext2D | null | undefined;
function getMeasureCtx(): CanvasRenderingContext2D | null {
    if (_measureCtx === undefined) {
        try {
            const canvas = document.createElement('canvas');
            _measureCtx = canvas.getContext('2d');
        } catch {
            _measureCtx = null;
        }
    }
    return _measureCtx;
}

function measureTextWidth(ctx: CanvasRenderingContext2D | null, text: string, font: string): number {
    if (ctx) {
        ctx.font = font;
        return ctx.measureText(text).width;
    }
    return text.length * 7;
}

interface SvgNode extends ElkNode {
    children: SvgNode[];
    edges: SvgEdge[];
    data: {
        label: string;
        color: string;
        headerLines: string[];
        bodyLines: string[];
        runs: string | null;
    };
}

interface SvgEdge extends ElkExtendedEdge {
    data: {
        item: string;
        amount: number;
    };
}

export async function renderElkGraph(elk: ELK, graph: Graph, container: HTMLElement): Promise<void> {
    const elkGraph = convertToElkGraph(graph);
    const layoutedGraph = await elk.layout(elkGraph);
    const svg = createSvgFromElkGraph(layoutedGraph as SvgNode);

    container.innerHTML = '';
    container.appendChild(svg);
}

function parseNodeLabel(label: string): { headerLines: string[]; bodyLines: string[]; runs: string | null } {
    const lines = label.split('\n');
    // Recipe nodes have at least 3 lines (location, recipe name, runs...)
    // Storage nodes are a single line
    if (lines.length <= 2) {
        return { headerLines: lines, bodyLines: [], runs: null };
    }
    const body = lines.slice(2);
    let runs: string | null = null;
    const filteredBody: string[] = [];
    for (const line of body) {
        if (line.startsWith('Runs: ')) {
            runs = line.replace('Runs: ', '');
        } else {
            filteredBody.push(line);
        }
    }
    return { headerLines: lines.slice(0, 2), bodyLines: filteredBody, runs };
}

function calculateNodeDimensions(
    headerLines: string[],
    bodyLines: string[],
    runs: string | null
): { width: number; height: number } {
    const ctx = getMeasureCtx();

    let maxWidth = 0;
    for (const line of headerLines) {
        const w = measureTextWidth(ctx, line, HEADER_FONT);
        if (w > maxWidth) maxWidth = w;
    }
    for (const line of bodyLines) {
        const w = measureTextWidth(ctx, line, BODY_FONT);
        if (w > maxWidth) maxWidth = w;
    }

    // Account for badge taking space in top-right corner
    if (runs) {
        const badgeTextWidth = measureTextWidth(ctx, runs, BADGE_FONT);
        const badgeWidth = badgeTextWidth + BADGE_PADDING_X * 2 + BADGE_MARGIN * 2;
        // Ensure the first header line + badge fit
        const firstLineWidth = headerLines.length > 0 ? measureTextWidth(ctx, headerLines[0], HEADER_FONT) : 0;
        const neededWidth = firstLineWidth + badgeWidth;
        if (neededWidth > maxWidth) maxWidth = neededWidth;
    }

    const headerHeight = headerLines.length * HEADER_LINE_HEIGHT + SECTION_PADDING_V * 2;
    const bodyHeight =
        bodyLines.length > 0 ? bodyLines.length * BODY_LINE_HEIGHT + SECTION_PADDING_V * 2 + DIVIDER_HEIGHT : 0;

    return {
        width: Math.ceil(maxWidth) + NODE_PADDING_X,
        height: headerHeight + bodyHeight
    };
}

function convertToElkGraph(graph: Graph): ElkNode {
    return {
        id: 'root',
        layoutOptions: {
            'elk.algorithm': 'layered',
            'elk.direction': 'RIGHT',
            'elk.spacing.nodeNode': '50',
            'elk.layered.spacing.nodeNodeBetweenLayers': '150',
            'elk.edgeRouting': 'ORTHOGONAL',
            'elk.layered.nodePlacement.favorStraightEdges': 'true',
            'elk.layered.considerModelOrder.strategy': 'NODES_AND_EDGES',
            'elk.layered.crossingMinimization.semiInteractive': 'true',
            'elk.layered.crossingMinimization.strategy': 'LAYER_SWEEP',
            'elk.spacing.edgeEdge': '20',
            'elk.spacing.edgeNode': '30',
            'elk.layered.unnecessaryBendpoints': 'true',
            'elk.layered.spacing.edgeNodeBetweenLayers': '30',
            'elk.padding': '[100, 100, 100, 100]'
        },
        children: graph.nodes.map((node) => {
            const { headerLines, bodyLines, runs } = parseNodeLabel(node.label);
            const dimensions = calculateNodeDimensions(headerLines, bodyLines, runs);
            return {
                id: node.id,
                width: dimensions.width,
                height: dimensions.height,
                data: {
                    label: node.label,
                    color: node.color,
                    headerLines,
                    bodyLines,
                    runs
                }
            };
        }),
        edges: graph.links.map((link) => ({
            id: link.id,
            sources: [link.source],
            targets: [link.target],
            data: {
                item: link.data.item,
                amount: link.data.amount
            }
        }))
    };
}

function createSvgFromElkGraph(layoutedGraph: SvgNode): SVGSVGElement {
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');

    let minX = Infinity,
        minY = Infinity,
        maxX = -Infinity,
        maxY = -Infinity;

    layoutedGraph.children.forEach((node) => {
        minX = Math.min(minX, node.x!);
        minY = Math.min(minY, node.y!);
        maxX = Math.max(maxX, node.x! + node.width!);
        maxY = Math.max(maxY, node.y! + node.height!);
    });

    minX -= 50;
    minY -= 50;
    maxX += 50;
    maxY += 50;

    svg.dataset.width = String(maxX - minX);
    svg.dataset.height = String(maxY - minY);
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', `${minX} ${minY} ${maxX - minX} ${maxY - minY}`);

    const defs = document.createElementNS(svgNS, 'defs');
    svg.appendChild(defs);

    const colors = new Set<string>();
    layoutedGraph.children.forEach((node) => {
        if (node.data.color) {
            colors.add(node.data.color);
        }
    });

    createArrowMarker(svgNS, defs, '#888', 'arrowhead');

    colors.forEach((color) => {
        if (color) {
            createArrowMarker(svgNS, defs, color, `arrowhead-${color.replace('#', '')}`);
        }
    });

    const graphGroup = document.createElementNS(svgNS, 'g');
    svg.appendChild(graphGroup);

    const pathsGroup = document.createElementNS(svgNS, 'g');
    const nodesGroup = document.createElementNS(svgNS, 'g');
    const labelsGroup = document.createElementNS(svgNS, 'g');

    graphGroup.appendChild(pathsGroup);
    graphGroup.appendChild(nodesGroup);
    graphGroup.appendChild(labelsGroup);

    layoutedGraph.edges.forEach((edge) => {
        const sourceNode = layoutedGraph.children.find((n) => n.id === edge.sources[0]);
        if (!sourceNode) return;
        const sourceColor = sourceNode.data.color ?? '#888';

        drawEdge(svgNS, edge, pathsGroup, sourceColor);

        if (edge.data) {
            const labelText = `${edge.data.item}: ${edge.data.amount}`;
            const labelEl = document.createElementNS(svgNS, 'text');

            let x: number, y: number;
            let textAnchor = 'middle';
            if (edge.sections && edge.sections.length > 0) {
                const section = edge.sections[0];
                const points = [section.startPoint, ...(section.bendPoints ?? []), section.endPoint];

                if (points.length >= 2) {
                    const lastIndex = points.length - 1;
                    const secondLastIndex = points.length - 2;

                    const p1 = points[secondLastIndex];
                    const p2 = points[lastIndex];

                    const targetNode = layoutedGraph.children.find((n) => n.id === edge.targets[0]);
                    const safetyMargin = 15;

                    if (Math.abs(p1.x - p2.x) < 5) {
                        x = p2.x + 15;
                        y = p1.y + (p2.y - p1.y) * 0.5;
                        textAnchor = 'start';
                    } else if (Math.abs(p1.y - p2.y) < 5) {
                        const nodeOffset = targetNode ? safetyMargin : 0;
                        x = p2.x - nodeOffset;
                        y = p2.y - 4;
                        textAnchor = 'end';
                    } else {
                        const nodeOffset = targetNode ? safetyMargin : 0;
                        x = p2.x - nodeOffset;
                        y = p1.y + (p2.y - p1.y) * 0.8;
                        textAnchor = 'end';
                    }
                } else {
                    x = points[0].x;
                    y = points[0].y;
                }
            } else {
                x = 0;
                y = 0;
            }

            labelEl.setAttribute('x', String(x));
            labelEl.setAttribute('y', String(y - 5));
            labelEl.setAttribute('text-anchor', textAnchor);

            labelEl.setAttribute('fill', '#fff');
            labelEl.setAttribute('stroke', 'rgba(30, 30, 30, 0.8)');
            labelEl.setAttribute('stroke-width', '5px');
            labelEl.setAttribute('paint-order', 'stroke');
            labelEl.setAttribute('stroke-linejoin', 'round');

            labelEl.setAttribute('font-size', '11px');
            labelEl.setAttribute('font-family', 'Arial, sans-serif');
            labelEl.textContent = labelText;

            labelsGroup.appendChild(labelEl);
        }
    });

    layoutedGraph.children.forEach((node) => {
        const nodeEl = drawNode(svgNS, node, nodesGroup);
        nodeEl.setAttribute('data-id', node.id);
    });

    return svg;
}

function createArrowMarker(svgNS: string, defs: SVGDefsElement, color: string, id: string): void {
    const marker = document.createElementNS(svgNS, 'marker') as SVGAElement;
    marker.setAttribute('id', id);
    marker.setAttribute('markerWidth', '6');
    marker.setAttribute('markerHeight', '4');
    marker.setAttribute('refX', '6');
    marker.setAttribute('refY', '2');
    marker.setAttribute('orient', 'auto');

    const polygon = document.createElementNS(svgNS, 'polygon');
    polygon.setAttribute('points', '0 0, 6 2, 0 4');
    polygon.setAttribute('fill', color);
    marker.appendChild(polygon);
    defs.appendChild(marker);
}

function drawNode(svgNS: string, node: SvgNode, parent: SVGGElement): SVGGElement {
    const nodeGroup = document.createElementNS(svgNS, 'g') as SVGAElement;
    nodeGroup.classList.add('node');

    const x = node.x!;
    const y = node.y!;
    const w = node.width!;
    const h = node.height!;
    const color = node.data.color ?? '#ddd';
    const textColor = getBestTextColor(color);
    const { headerLines, bodyLines, runs } = node.data;

    // Background rect
    const rect = document.createElementNS(svgNS, 'rect');
    rect.classList.add('node-bg');
    rect.setAttribute('x', String(x));
    rect.setAttribute('y', String(y));
    rect.setAttribute('width', String(w));
    rect.setAttribute('height', String(h));
    rect.setAttribute('fill', color);
    rect.setAttribute('rx', '10');
    rect.setAttribute('ry', '10');
    rect.setAttribute('stroke', 'rgba(255,255,255,0.1)');
    rect.setAttribute('stroke-width', '1');
    nodeGroup.appendChild(rect);

    const headerHeight = headerLines.length * HEADER_LINE_HEIGHT + SECTION_PADDING_V * 2;
    const centerX = x + w / 2;

    // If only one line, center it vertically. If multiple lines, align to top with padding
    const isStorageNode = headerLines.length === 1;
    const headerTextY = isStorageNode ? y + h / 2 : y + SECTION_PADDING_V;
    const dominantBaseline = isStorageNode ? 'middle' : 'hanging';

    // Header text
    const headerText = document.createElementNS(svgNS, 'text');
    headerText.setAttribute('x', String(centerX));
    headerText.setAttribute('y', String(headerTextY));
    headerText.setAttribute('text-anchor', 'middle');
    headerText.setAttribute('fill', textColor);
    headerText.setAttribute('font-family', "'Segoe UI', Arial, sans-serif");
    headerText.setAttribute('font-size', '13');
    headerText.setAttribute('font-weight', '600');
    headerText.setAttribute('dominant-baseline', dominantBaseline);

    headerLines.forEach((line, i) => {
        const tspan = document.createElementNS(svgNS, 'tspan');
        tspan.setAttribute('x', String(centerX));
        tspan.setAttribute('dy', i === 0 ? '0' : `${HEADER_LINE_HEIGHT}px`);
        tspan.textContent = line || ' ';
        headerText.appendChild(tspan);
    });
    nodeGroup.appendChild(headerText);

    // Runs badge in top-right corner
    if (runs) {
        const badgeLabel = runs;
        const ctx = getMeasureCtx();
        const badgeTextWidth = measureTextWidth(ctx, badgeLabel, BADGE_FONT);
        const badgeW = badgeTextWidth + BADGE_PADDING_X * 2;
        const badgeH = 10 + BADGE_PADDING_Y * 2;
        const badgeX = x + w - badgeW - BADGE_MARGIN;
        const badgeY = y + BADGE_MARGIN;

        const badgeRect = document.createElementNS(svgNS, 'rect');
        badgeRect.setAttribute('x', String(badgeX));
        badgeRect.setAttribute('y', String(badgeY));
        badgeRect.setAttribute('width', String(badgeW));
        badgeRect.setAttribute('height', String(badgeH));
        badgeRect.setAttribute('fill', 'rgba(0,0,0,0.3)');
        badgeRect.setAttribute('rx', '6');
        badgeRect.setAttribute('ry', '6');
        nodeGroup.appendChild(badgeRect);

        const badgeText = document.createElementNS(svgNS, 'text');
        badgeText.setAttribute('x', String(badgeX + badgeW / 2));
        badgeText.setAttribute('y', String(badgeY + badgeH / 2 + 1.5));
        badgeText.setAttribute('text-anchor', 'middle');
        badgeText.setAttribute('dominant-baseline', 'middle');
        badgeText.setAttribute('fill', '#fff');
        badgeText.setAttribute('font-family', "'Segoe UI', Arial, sans-serif");
        badgeText.setAttribute('font-size', '10');
        badgeText.setAttribute('font-weight', '600');
        badgeText.textContent = badgeLabel;
        nodeGroup.appendChild(badgeText);
    }

    // Divider and body (only if body lines exist)
    if (bodyLines.length > 0) {
        const dividerY = y + headerHeight;
        const dividerInset = NODE_PADDING_X / 2;

        const divider = document.createElementNS(svgNS, 'rect');
        divider.classList.add('node-divider');
        divider.setAttribute('x', String(x + dividerInset));
        divider.setAttribute('y', String(dividerY));
        divider.setAttribute('width', String(w - dividerInset * 2));
        divider.setAttribute('height', String(DIVIDER_HEIGHT));
        divider.setAttribute('fill', 'rgba(255,255,255,0.4)');
        divider.setAttribute('rx', '0.5');
        nodeGroup.appendChild(divider);

        const bodyTextY = dividerY + DIVIDER_HEIGHT + SECTION_PADDING_V;
        const bodyText = document.createElementNS(svgNS, 'text');
        bodyText.setAttribute('x', String(centerX));
        bodyText.setAttribute('y', String(bodyTextY));
        bodyText.setAttribute('text-anchor', 'middle');
        bodyText.setAttribute('fill', textColor);
        bodyText.setAttribute('font-family', "'Segoe UI', Arial, sans-serif");
        bodyText.setAttribute('font-size', '11');
        bodyText.setAttribute('font-weight', '400');
        bodyText.setAttribute('dominant-baseline', 'hanging');
        bodyText.setAttribute('opacity', '0.85');

        bodyLines.forEach((line, i) => {
            const tspan = document.createElementNS(svgNS, 'tspan');
            tspan.setAttribute('x', String(centerX));
            tspan.setAttribute('dy', i === 0 ? '0' : `${BODY_LINE_HEIGHT}px`);
            tspan.textContent = line || ' ';
            bodyText.appendChild(tspan);
        });
        nodeGroup.appendChild(bodyText);
    }

    parent.appendChild(nodeGroup);
    return nodeGroup;
}

function drawEdge(svgNS: string, edge: SvgEdge, parent: SVGGElement, color: string = '#888'): SVGGElement | null {
    if (!edge.sections || edge.sections.length === 0) return null;

    const edgeGroup = document.createElementNS(svgNS, 'g') as SVGAElement;
    edgeGroup.classList.add('edge');

    edge.sections.forEach((section) => {
        const path = document.createElementNS(svgNS, 'path');

        let pathData = `M ${section.startPoint.x} ${section.startPoint.y}`;

        if (section.bendPoints && section.bendPoints.length > 0) {
            section.bendPoints.forEach((point) => {
                pathData += ` L ${point.x} ${point.y}`;
            });
        }

        pathData += ` L ${section.endPoint.x} ${section.endPoint.y}`;

        path.setAttribute('d', pathData);
        path.setAttribute('stroke', color);
        path.setAttribute('stroke-width', '2.5');
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('stroke-linejoin', 'round');
        path.setAttribute('opacity', '0.7');
        path.setAttribute('marker-end', `url(#arrowhead-${color.replace('#', '')})`);

        edgeGroup.appendChild(path);
    });

    parent.appendChild(edgeGroup);
    return edgeGroup;
}
