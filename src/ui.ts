import state from './state.js';
import { scheduleRefresh } from './index.js';
import { nuiSetAutoRecipe } from './nui.js';
import { closeTransfersUI } from './transfers-ui.js';
import { saveRecipeSettings } from './recipes.js';

export function saveGraphPosition() {
    localStorage.setItem(
        'graphPosition',
        JSON.stringify({
            scale: state.scale,
            translateX: state.translateX,
            translateY: state.translateY
        })
    );
}

function filterRecipes() {
    const searchTerm = (document.getElementById('recipe-search') as HTMLInputElement).value.toLowerCase();
    const recipeItems = document.querySelectorAll('.recipe-item') as NodeListOf<HTMLInputElement>;

    recipeItems.forEach((item) => {
        const name = item.dataset.name;
        const location = item.dataset.location;

        // Get all ingredient and product names from the recipe node
        const ingredientNames = Array.from(item.querySelectorAll('.recipe-ingredients .item-name')).map(
            (el) => el.textContent?.toLowerCase() ?? ''
        );
        const productNames = Array.from(item.querySelectorAll('.recipe-products .item-name')).map(
            (el) => el.textContent?.toLowerCase() ?? ''
        );

        // Check if the search term matches any of the recipe name, location, ingredients, or products
        const matchesName = (name?.includes(searchTerm) ?? false) || (location?.includes(searchTerm) ?? false);
        const matchesIngredient = ingredientNames.some((ing) => ing.includes(searchTerm));
        const matchesProduct = productNames.some((prod) => prod.includes(searchTerm));

        if (matchesName || matchesIngredient || matchesProduct) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    });

    (document.querySelectorAll('.location-group') as NodeListOf<HTMLElement>).forEach((group) => {
        const hasVisibleRecipes = [...group.querySelectorAll('.recipe-item')].some(
            (item) => !item.classList.contains('hidden')
        );

        group.style.display = hasVisibleRecipes ? 'block' : 'none';
    });
}

function initializeWindowedMode() {
    const container = document.querySelector('.graph-container') as HTMLDivElement;
    const header = document.querySelector('.window-header') as HTMLDivElement;
    const resizeHandle = document.querySelector('.resize-handle') as HTMLDivElement;

    if (!resizeHandle.querySelector('.resize-handle-icon')) {
        const icon = document.createElement('div');
        icon.className = 'resize-handle-icon';
        resizeHandle.appendChild(icon);
    }

    const savedPos = JSON.parse(localStorage.getItem('windowPosition') || '{}');
    if (savedPos.top) container.style.top = savedPos.top;
    if (savedPos.left) container.style.left = savedPos.left;
    if (savedPos.width) container.style.width = savedPos.width;
    if (savedPos.height) container.style.height = savedPos.height;

    let isDragging: boolean = false;
    let isResizing: boolean = false;
    let dragOffsetX: number = 0,
        dragOffsetY: number = 0;
    let startWidth: number = 0,
        startHeight: number = 0,
        startX: number = 0,
        startY: number = 0,
        previousX: number = 0,
        previousY: number = 0;
    let pendingResize: boolean = false;
    let currentMouseX: number = 0,
        currentMouseY: number = 0;

    header.onmousedown = function (e) {
        isDragging = true;
        const { left, top } = container.getBoundingClientRect();
        dragOffsetX = e.clientX - left;
        dragOffsetY = e.clientY - top;
        container.style.transition = 'none';
    };

    resizeHandle.onmousedown = function (e) {
        isResizing = true;
        e.stopPropagation();
        const { width, height } = container.getBoundingClientRect();
        startWidth = width;
        startHeight = height;
        startX = e.clientX;
        startY = e.clientY;
        previousX = startX;
        previousY = startY;
        container.style.transition = 'none';
    };

    document.onmousemove = function (e) {
        if (isDragging) {
            const x = e.clientX - dragOffsetX;
            const y = e.clientY - dragOffsetY;
            container.style.left = `${x}px`;
            container.style.top = `${y}px`;
        } else if (isResizing) {
            currentMouseX = e.clientX;
            currentMouseY = e.clientY;

            if (!pendingResize) {
                pendingResize = true;
                requestAnimationFrame(() => {
                    if (isResizing) {
                        const width = startWidth + currentMouseX - startX;
                        const height = startHeight + currentMouseY - startY;
                        container.style.width = `${Math.max(100, width)}px`;
                        container.style.height = `${Math.max(70, height)}px`;
                        const xDiff = currentMouseX - previousX;
                        const yDiff = currentMouseY - previousY;
                        previousX = currentMouseX;
                        previousY = currentMouseY;
                        state.translateX += xDiff / state.scale / 2;
                        state.translateY += yDiff / state.scale / 2;
                        applyTransform();
                    }
                    pendingResize = false;
                });
            }
        }
    };

    document.onmouseup = function () {
        if (isDragging || isResizing) {
            isDragging = false;
            isResizing = false;
            container.style.transition = '';

            localStorage.setItem(
                'windowPosition',
                JSON.stringify({
                    top: container.style.top,
                    left: container.style.left,
                    width: container.style.width,
                    height: container.style.height
                })
            );
        }
    };
}

export function updateOpacityClasses() {
    const mainElement = document.getElementById('main')!;

    const nodeClasses = Array.from(mainElement.classList).filter((cls) => cls.startsWith('node-opacity-'));
    const bgClasses = Array.from(mainElement.classList).filter((cls) => cls.startsWith('bg-opacity-'));
    const pinClasses = Array.from(mainElement.classList).filter((cls) => cls.startsWith('pin-opacity-'));

    nodeClasses.forEach((cls) => mainElement.classList.remove(cls));
    bgClasses.forEach((cls) => mainElement.classList.remove(cls));
    pinClasses.forEach((cls) => mainElement.classList.remove(cls));

    const nodeOpacityRounded = Math.round(state.currentNodeOpacity / 10) * 10;
    const bgOpacityRounded = Math.round(state.currentBgOpacity / 10) * 10;
    const pinOpacityRounded = Math.round(state.currentPinPanelOpacity / 10) * 10;

    mainElement.classList.add(`node-opacity-${nodeOpacityRounded}`);
    mainElement.classList.add(`bg-opacity-${bgOpacityRounded}`);
    mainElement.classList.add(`pin-opacity-${pinOpacityRounded}`);
}

export function toggleWindowedMode(enabled: boolean) {
    const container = document.querySelector('.graph-container') as HTMLDivElement;
    const userInput = document.querySelector('.user-input')!;
    const mainElement = document.getElementById('main')!;

    container.classList.toggle('windowed', enabled);
    userInput.classList.toggle('with-windowed-graph', enabled);

    if (enabled && state.runningInGame) {
        container.classList.add('in-game');
        mainElement.classList.add('in-game-windowed');
    } else {
        container.classList.remove('in-game');
        mainElement.classList.remove('in-game-windowed');
    }

    if (enabled) {
        initializeWindowedMode();
    } else {
        container.style.top = '';
        container.style.left = '';
        container.style.width = '';
        container.style.height = '';
    }

    // Run updates every 20 ms for the next 300 ms
    for (let i = 0; i <= 15; i++) {
        setTimeout(() => {
            applyTransform();
        }, i * 20);
    }
}

export function updatePinPanel() {
    const pinnedRecipe = document.getElementById('pinned-recipe')!;

    try {
        if (!state.pinnedNodeId) {
            pinnedRecipe.innerHTML = '<p>No recipe pinned.</p>';
            return;
        }

        const wrapper = document.querySelector('.graph-wrapper:not([style*="opacity: 0"])');
        if (!wrapper) {
            pinnedRecipe.innerHTML = '<p>Graph is being updated...</p>';
            return;
        }

        const pinnedNode = wrapper.querySelector(`.node[data-id="${state.pinnedNodeId}"]`);
        if (!pinnedNode) {
            pinnedRecipe.innerHTML = '<p>Pinned recipe no longer exists in the current graph.</p>';
            return;
        }

        pinnedRecipe.innerHTML = '';

        // Clone the node group
        const clonedNode = pinnedNode.cloneNode(true) as SVGGElement;

        // Remove the pinned-node class to avoid stroke/glow styling in the pin panel
        clonedNode.classList.remove('pinned-node');

        // Also remove stroke styling from the cloned rect element
        const clonedRect = clonedNode.querySelector('rect');
        if (clonedRect) {
            clonedRect.removeAttribute('stroke');
            clonedRect.removeAttribute('filter');
        }

        // Get the rect from the original pinned node to determine dimensions
        const originalRect = pinnedNode.querySelector('rect');
        if (!originalRect) {
            throw new Error('Node rect not found');
        }

        // Get the rect's position and dimensions from its attributes
        const rectX = parseFloat(originalRect.getAttribute('x') ?? '0');
        const rectY = parseFloat(originalRect.getAttribute('y') ?? '0');
        const rectWidth = parseFloat(originalRect.getAttribute('width') ?? '0');
        const rectHeight = parseFloat(originalRect.getAttribute('height') ?? '0');

        // Create the svg container
        const svgContainer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svgContainer.setAttribute('width', '100%');
        svgContainer.setAttribute('height', '100%');
        svgContainer.setAttribute('preserveAspectRatio', 'xMidYMid meet');

        // Create a viewBox that frames the node with some padding
        const padding = 10;
        svgContainer.setAttribute(
            'viewBox',
            `${rectX - padding} ${rectY - padding} ${rectWidth + padding * 2} ${rectHeight + padding * 2}`
        );

        svgContainer.appendChild(clonedNode);
        pinnedRecipe.appendChild(svgContainer);
    } catch (e) {
        console.error('Error in pin panel rendering:', e);
        pinnedRecipe.innerHTML = `<div style="text-align:center;padding:20px;">Error</div>`;
    } finally {
        nuiSetAutoRecipe();
    }
}

export function setInvisible() {
    const mainElement = document.getElementById('main')!;
    const userInput = document.querySelector('.user-input')!;
    const container = document.querySelector('.graph-container')!;
    const windowHeader = document.querySelector('.window-header')!;
    const pinPanelHeader = document.querySelector('.pin-panel .panel-header')!;
    const pinPanel = document.getElementById('pin-panel')!;
    const showPinPanel = (document.getElementById('showPinPanel') as HTMLInputElement).checked;
    const recipeSettingsModal = document.getElementById('recipe-settings-modal')!;

    if (!recipeSettingsModal.classList.contains('hidden')) {
        saveRecipeSettings();
    }

    closeStoragesUI();
    closeTransfersUI();

    if (state.runningInGame && container.classList.contains('windowed')) {
        mainElement.classList.add('in-game-windowed');
        mainElement.classList.add('hide-settings');
        windowHeader.classList.add('hidden-title');
        pinPanelHeader.classList.add('hidden-title');
        container.classList.remove('invisible');
    } else {
        userInput.classList.add('invisible');
        container.classList.add('invisible');

        mainElement.classList.add('transparent-background');

        if (showPinPanel) {
            pinPanel.classList.remove('hidden');
            pinPanelHeader.classList.add('hidden-title');

            pinPanel.classList.add('hide-resize-handle');

            setTimeout(() => {
                updatePinPanel();
            }, 50);
        }
    }
}

export function setVisible() {
    const mainElement = document.getElementById('main')!;
    const userInput = document.querySelector('.user-input')!;
    const container = document.querySelector('.graph-container')!;
    const windowHeader = document.querySelector('.window-header')!;
    const pinPanelHeader = document.querySelector('.pin-panel .panel-header')!;
    const pinPanel = document.getElementById('pin-panel')!;

    userInput.classList.remove('invisible');
    container.classList.remove('invisible');
    mainElement.classList.remove('hide-settings');
    mainElement.classList.remove('transparent-background');
    windowHeader.classList.remove('hidden-title');
    pinPanelHeader.classList.remove('hidden-title');

    pinPanel.classList.remove('hide-resize-handle');

    if (state.runningInGame && container.classList.contains('windowed')) {
        mainElement.classList.add('in-game-windowed');
    }
}

export function isVisible(): boolean {
    const container = document.querySelector('.graph-container')!;
    const pinPanel = document.getElementById('pin-panel')!;
    const showPinPanel = (document.getElementById('showPinPanel') as HTMLInputElement).checked;

    return !container.classList.contains('invisible') || (showPinPanel && !pinPanel.classList.contains('hidden'));
}

export function closeStoragesUI() {
    document.getElementById('storage-ui-modal')!.classList.add('hidden');
}

export function initializePinPanel() {
    const pinPanel = document.getElementById('pin-panel')!;
    const header = pinPanel.querySelector('.panel-header') as HTMLElement;
    const resizeHandle = pinPanel.querySelector('.resize-handle') as HTMLElement;

    let isDragging: boolean = false;
    let isResizing: boolean = false;
    let offsetX: number = 0,
        offsetY: number = 0;
    let startWidth: number = 0,
        startHeight: number = 0,
        startX: number = 0,
        startY: number = 0;

    if (localStorage.getItem('pinPanelPosition')) {
        try {
            const savedPosition = JSON.parse(localStorage.getItem('pinPanelPosition') ?? 'null');
            if (savedPosition.x !== null) {
                pinPanel.style.left = savedPosition.x + 'px';
                pinPanel.style.right = 'auto';
            }
            if (savedPosition.y !== null) {
                pinPanel.style.top = savedPosition.y + 'px';
                pinPanel.style.bottom = 'auto';
            }
            state.pinPanelPosition = savedPosition;
        } catch (e) {
            console.warn('Failed to parse saved pin panel position', e);
        }
    }

    pinPanel.style.width = state.pinPanelSize.width + 'px';
    pinPanel.style.height = state.pinPanelSize.height + 'px';

    if (localStorage.getItem('pinPanelSize')) {
        try {
            const savedSize = JSON.parse(localStorage.getItem('pinPanelSize') ?? 'null');
            if (savedSize && typeof savedSize.width === 'number' && !isNaN(savedSize.width) && savedSize.width >= 120) {
                pinPanel.style.width = savedSize.width + 'px';
                state.pinPanelSize.width = savedSize.width;
            }
            if (
                savedSize &&
                typeof savedSize.height === 'number' &&
                !isNaN(savedSize.height) &&
                savedSize.height >= 100
            ) {
                pinPanel.style.height = savedSize.height + 'px';
                state.pinPanelSize.height = savedSize.height;
            }
        } catch (e) {
            console.warn('Failed to parse saved pin panel size', e);
            pinPanel.style.width = state.pinPanelSize.width + 'px';
            pinPanel.style.height = state.pinPanelSize.height + 'px';
        }
    }

    resizeHandle.innerHTML = '<div class="resize-handle-icon"></div>';

    if (state.runningInGame && !document.querySelector('.graph-container')!.classList.contains('windowed')) {
        pinPanel.classList.add('hide-resize-handle');
    }

    header.addEventListener('mousedown', function (e: MouseEvent) {
        isDragging = true;
        const { left, top } = pinPanel.getBoundingClientRect();
        offsetX = e.clientX - left;
        offsetY = e.clientY - top;
        pinPanel.style.transition = 'none';
        e.preventDefault();
    });

    resizeHandle.addEventListener('mousedown', function (e: MouseEvent) {
        e.stopPropagation();
        isResizing = true;
        startWidth = pinPanel.offsetWidth;
        startHeight = pinPanel.offsetHeight;
        startX = e.clientX;
        startY = e.clientY;
        pinPanel.style.transition = 'none';
        e.preventDefault();

        pinPanel.classList.add('resizing');
    });

    document.addEventListener('mousemove', function (e: MouseEvent) {
        if (isDragging) {
            const x = e.clientX - offsetX;
            const y = e.clientY - offsetY;
            pinPanel.style.left = x + 'px';
            pinPanel.style.top = y + 'px';
            pinPanel.style.right = 'auto';
            pinPanel.style.bottom = 'auto';
        } else if (isResizing) {
            const width = Math.max(120, startWidth + (e.clientX - startX));
            const height = Math.max(100, startHeight + (e.clientY - startY));
            pinPanel.style.width = `${width}px`;
            pinPanel.style.height = `${height}px`;

            updatePinPanel();
        }
    });

    document.addEventListener('mouseup', function () {
        if (isDragging) {
            isDragging = false;
            pinPanel.style.transition = '';

            const { left, top } = pinPanel.getBoundingClientRect();

            state.pinPanelPosition = {
                x: parseInt(pinPanel.style.left) || left,
                y: parseInt(pinPanel.style.top) || top
            };
            localStorage.setItem('pinPanelPosition', JSON.stringify(state.pinPanelPosition));
        }

        if (isResizing) {
            isResizing = false;
            pinPanel.style.transition = '';
            pinPanel.classList.remove('resizing');

            state.pinPanelSize = {
                width: pinPanel.offsetWidth,
                height: pinPanel.offsetHeight
            };
            localStorage.setItem('pinPanelSize', JSON.stringify(state.pinPanelSize));
        }
    });

    updatePinPanel();
}

function toggleSettings() {
    const panel = document.querySelector('.user-input')!;
    const isCollapsed = panel.classList.toggle('collapsed');
    localStorage.setItem('settingsCollapsed', isCollapsed ? 'true' : 'false');
}

function togglePinPanel() {
    const pinPanel = document.getElementById('pin-panel')!;
    const isHidden = pinPanel.classList.toggle('hidden');
    (document.getElementById('showPinPanel') as HTMLInputElement).checked = !isHidden;
    localStorage.setItem('showPinPanel', !isHidden ? 'true' : 'false');

    if (!isHidden) {
        updatePinPanel();
    }
}

function resetWindowPosition() {
    const container = document.querySelector('.graph-container') as HTMLDivElement;

    if (!container.classList.contains('windowed')) return;

    container.style.transition = 'all 0.3s ease';
    container.style.top = '10%';
    container.style.left = '10%';
    container.style.width = '80%';
    container.style.height = '80%';

    localStorage.setItem(
        'windowPosition',
        JSON.stringify({
            top: '10%',
            left: '10%',
            width: '80%',
            height: '80%'
        })
    );

    resetGraphPosition();

    setTimeout(() => {
        container.style.transition = '';
    }, 300);
}

function toggleSubmenu(header: HTMLElement) {
    const submenu = header.parentElement as HTMLElement;
    const content = submenu.querySelector('.submenu-content')!;
    const toggle = submenu.querySelector('.submenu-toggle')!;
    const isCollapsed = content.classList.toggle('collapsed');
    toggle.classList.toggle('collapsed', isCollapsed);

    const submenus = Array.from(document.querySelectorAll('.submenu'));
    const index = submenus.indexOf(submenu);
    localStorage.setItem(`submenu_${index}_collapsed`, isCollapsed ? 'true' : 'false');
}

function resetPinPanelPosition() {
    const pinPanel = document.getElementById('pin-panel')!;

    pinPanel.style.transition = 'all 0.3s ease';

    pinPanel.style.top = '10px';
    pinPanel.style.right = '10px';
    pinPanel.style.left = 'auto';
    pinPanel.style.bottom = 'auto';

    pinPanel.style.width = '150px';
    pinPanel.style.height = '150px';

    state.pinPanelPosition = { x: null, y: null };
    state.pinPanelSize = { width: 150, height: 150 };

    localStorage.setItem('pinPanelPosition', JSON.stringify(state.pinPanelPosition));
    localStorage.setItem('pinPanelSize', JSON.stringify(state.pinPanelSize));

    updatePinPanel();

    setTimeout(() => {
        pinPanel.style.transition = '';
    }, 300);
}

function clearAllData() {
    localStorage.clear();
    document.getElementById('error')!.textContent = 'All data cleared. Reloading...';
    setTimeout(() => {
        window.location.reload();
    }, 1000);
}

function getContainerRelativeCoordinates(clientX: number, clientY: number): { x: number; y: number } {
    const container = document.querySelector('.graph-container') as Element;
    const { left, top } = container.getBoundingClientRect();
    return {
        x: clientX - left,
        y: clientY - top
    };
}

function updateLastMousePosition(clientX: number, clientY: number) {
    const coords = getContainerRelativeCoordinates(clientX, clientY);
    state.lastMouseX = coords.x;
    state.lastMouseY = coords.y;
}

function stopPanning() {
    const container = document.querySelector('.graph-container')!;
    state.wasPanning = state.isPanning && state.hasMoved;
    state.isPanning = false;
    state.hasMoved = false;
    container.classList.remove('panning');

    setTimeout(() => {
        state.wasPanning = false;
    }, 50);
}

function handleWheelZoom(e: WheelEvent) {
    e.preventDefault();
    const wrapper = document.querySelector('.graph-wrapper');
    const svg = wrapper?.querySelector('svg');
    if (!svg) return;

    // Get current viewBox
    const viewBox = svg.viewBox.baseVal;
    const currentViewBoxX = viewBox.x;
    const currentViewBoxY = viewBox.y;
    const currentViewBoxWidth = viewBox.width;
    const currentViewBoxHeight = viewBox.height;

    // Get mouse position relative to the SVG element
    const { left, top, width, height } = svg.getBoundingClientRect();
    const mouseX = e.clientX - left;
    const mouseY = e.clientY - top;

    // Convert mouse position to SVG coordinates
    const mouseSvgX = currentViewBoxX + (mouseX / width) * currentViewBoxWidth;
    const mouseSvgY = currentViewBoxY + (mouseY / height) * currentViewBoxHeight;

    // Apply zoom
    const zoomFactor = e.deltaY > 0 ? 1 - state.ZOOM_SENSITIVITY : 1 + state.ZOOM_SENSITIVITY;
    state.scale *= zoomFactor;
    state.scale = Math.min(Math.max(0.1, state.scale), 10);

    // Calculate new viewBox dimensions
    const newViewBoxWidth = width / state.scale;
    const newViewBoxHeight = height / state.scale;

    // Calculate new center to keep mouse position fixed
    const mouseRelativeX = mouseX / width;
    const mouseRelativeY = mouseY / height;

    const newViewBoxX = mouseSvgX - mouseRelativeX * newViewBoxWidth;
    const newViewBoxY = mouseSvgY - mouseRelativeY * newViewBoxHeight;

    // Update state with new center coordinates
    state.translateX = newViewBoxX + newViewBoxWidth / 2;
    state.translateY = newViewBoxY + newViewBoxHeight / 2;

    applyTransform();
}

function handleMouseDown(e: MouseEvent) {
    if (e.button !== 0) return;
    e.preventDefault();
    updateLastMousePosition(e.clientX, e.clientY);
    state.startPanX = state.lastMouseX;
    state.startPanY = state.lastMouseY;
    state.isPanning = true;
    state.wasPanning = false;
    state.hasMoved = false;
    const container = document.querySelector('.graph-container')!;
    container.classList.add('panning');
}

function handleMouseMove(e: MouseEvent) {
    if (!state.isPanning) return;
    e.preventDefault();

    const oldLastX = state.lastMouseX;
    const oldLastY = state.lastMouseY;
    updateLastMousePosition(e.clientX, e.clientY);

    const distX = Math.abs(state.lastMouseX - state.startPanX);
    const distY = Math.abs(state.lastMouseY - state.startPanY);

    if (distX > state.PANNING_DETECTION_SENSITIVITY || distY > state.PANNING_DETECTION_SENSITIVITY) {
        state.hasMoved = true;
    }

    // Convert screen pixel movement to SVG coordinate movement
    const deltaX = state.lastMouseX - oldLastX;
    const deltaY = state.lastMouseY - oldLastY;

    // With viewBox, we need to convert pixel deltas to SVG coordinate deltas
    const wrapper = document.querySelector('.graph-wrapper');
    const svg = wrapper?.querySelector('svg');
    if (svg) {
        state.translateX -= deltaX / state.scale;
        state.translateY -= deltaY / state.scale;
    }

    applyTransform();
}

let isPendingUpdate = false;

export function applyTransform(useAnimation: boolean = false) {
    saveGraphPosition();
    if (!isPendingUpdate) {
        isPendingUpdate = true;

        requestAnimationFrame(() => {
            isPendingUpdate = false;
            const wrapper = document.querySelector('.graph-wrapper') as HTMLDivElement;
            const svg = wrapper?.querySelector('svg');
            if (svg) {
                applyViewBoxTransform(svg, useAnimation);
            } else {
                console.warn(`Skipping transformation update: SVG element not found.`);
            }
        });
    }
}

function applyViewBoxTransform(svg: SVGElement, useAnimation: boolean = false) {
    // Get the actual rendered dimensions of the SVG container
    const container = svg.closest('.graph-wrapper') as HTMLElement;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const svgWidth = containerRect.width;
    const svgHeight = containerRect.height;

    // If container has no dimensions, fallback to defaults
    if (svgWidth === 0 || svgHeight === 0) {
        console.warn('SVG container has zero width or height, cannot apply viewBox transform.');
        return;
    }

    const viewBoxWidth = svgWidth / state.scale;
    const viewBoxHeight = svgHeight / state.scale;

    const viewBoxX = state.translateX - viewBoxWidth / 2;
    const viewBoxY = state.translateY - viewBoxHeight / 2;

    const targetViewBox = `${viewBoxX} ${viewBoxY} ${viewBoxWidth} ${viewBoxHeight}`;

    if (useAnimation) {
        // Create the animate element
        const animate = document.createElementNS(svg.namespaceURI, 'animate') as SVGAnimateElement;
        animate.setAttribute('attributeName', 'viewBox');
        animate.setAttribute('begin', 'indefinite');
        animate.setAttribute('repeatCount', '1');
        animate.setAttribute('dur', '0.2s');
        animate.setAttribute('fill', 'freeze');
        animate.setAttribute('calcMode', 'spline');
        animate.setAttribute('keySplines', '0.25 0.1 0.25 1');
        animate.setAttribute('keyTimes', '0;1');
        animate.setAttribute('from', svg.getAttribute('viewBox') ?? '');
        animate.setAttribute('to', targetViewBox);
        svg.appendChild(animate);

        // Add event listener to clean up after animation
        animate.addEventListener('endEvent', () => {
            svg.setAttribute('viewBox', targetViewBox);
            animate.remove();
        });

        // Start animation
        animate.beginElement();
    } else {
        svg.setAttribute('viewBox', targetViewBox);
    }
}

function handleNodeClick(e: MouseEvent) {
    if (state.wasPanning) return;

    const target = e.target as Element;
    const node = target.closest('.node') as Element | null;
    if (!node) return;

    const nodeId = node.getAttribute('data-id');
    if (!nodeId) return;

    if (nodeId === state.pinnedNodeId) {
        state.pinnedNodeId = null;
        localStorage.removeItem('pinnedNodeId');
    } else {
        state.pinnedNodeId = nodeId;
        localStorage.setItem('pinnedNodeId', nodeId);
    }

    applyPinnedNodeStyling();
    updatePinPanel();
}

function handleBlurActive() {
    if (document.activeElement && document.activeElement !== document.body) {
        (document.activeElement as HTMLElement).blur();
    }
}

export function applyPinnedNodeStyling() {
    document.querySelectorAll('.node').forEach((node) => {
        node.classList.remove('pinned-node');
        const rect = node.querySelector('rect');
        if (rect) {
            rect.setAttribute('stroke', '');
            rect.setAttribute('stroke-width', '');
        }
    });

    if (state.pinnedNodeId) {
        const wrapper = document.querySelector('.graph-wrapper:not([style*="opacity: 0"])');
        if (!wrapper) return;

        const pinnedNode = wrapper.querySelector(`.node[data-id="${state.pinnedNodeId}"]`);
        if (pinnedNode) {
            pinnedNode.classList.add('pinned-node');
            const rect = pinnedNode.querySelector('rect');
            if (rect) {
                rect.setAttribute('stroke', '#ff5555');
                rect.setAttribute('stroke-width', '3px');
            }
        }
    }
}

export function initializeGraph() {
    const container = document.querySelector('.graph-container')!;
    const wrapper = document.querySelector('.graph-wrapper')!;
    const svg = wrapper.querySelector('svg');

    if (state.boundWheel) container.removeEventListener('wheel', state.boundWheel as EventListener);
    if (state.boundMouseDown) container.removeEventListener('mousedown', state.boundMouseDown as EventListener);
    if (state.boundMouseMove) document.removeEventListener('mousemove', state.boundMouseMove as EventListener);
    if (state.boundMouseUp) document.removeEventListener('mouseup', state.boundMouseUp as EventListener);
    if (state.boundClick && svg) svg.removeEventListener('click', state.boundClick as EventListener);
    if (state.boundDblClick) container.removeEventListener('dblclick', state.boundDblClick as EventListener);
    if (state.boundBlurActive) container.removeEventListener('click', state.boundBlurActive as EventListener);

    state.boundWheel = handleWheelZoom;
    state.boundMouseDown = handleMouseDown;
    state.boundMouseMove = handleMouseMove;
    state.boundMouseUp = stopPanning;
    state.boundClick = handleNodeClick;
    state.boundDblClick = resetGraphPosition;
    state.boundBlurActive = handleBlurActive;

    (window as any).resetGraphPosition = state.boundDblClick;

    container.addEventListener('wheel', state.boundWheel as EventListener);
    container.addEventListener('mousedown', state.boundMouseDown as EventListener);
    document.addEventListener('mousemove', state.boundMouseMove as EventListener);
    document.addEventListener('mouseup', state.boundMouseUp as EventListener);
    container.addEventListener('mousedown', state.boundBlurActive as EventListener);

    if (svg) {
        svg.addEventListener('click', state.boundClick as EventListener);
    }

    container.addEventListener('dblclick', state.boundDblClick as EventListener);

    if (state.pinnedNodeId) {
        applyPinnedNodeStyling();
    }

    applyTransform();
}

export function getSavedGraphPosition(): { scale?: number; translateX?: number; translateY?: number } | null {
    try {
        return JSON.parse(localStorage.getItem('graphPosition') ?? 'null');
    } catch (e) {
        console.warn('Failed to parse saved graph position', e);
        return null;
    }
}

function resetGraphPosition() {
    const container = document.querySelector('.graph-container')!;
    const svg = document.querySelector('.graph-wrapper')?.querySelector('svg');

    const targetScale = state.DEFAULT_SCALE;
    let targetTranslateX, targetTranslateY;

    if (!svg) {
        console.warn('No SVG found, cannot reset graph position.');
        return;
    }

    targetTranslateX = parseFloat(svg.dataset.width ?? '800') / 2;
    targetTranslateY = parseFloat(svg.dataset.height ?? '200') / 2;

    if (container.classList.contains('windowed')) {
        const headerHeight = 30;
        targetTranslateY += headerHeight;
    }

    state.scale = targetScale;
    state.translateX = targetTranslateX;
    state.translateY = targetTranslateY;

    applyTransform(true);
}

export function initializeSubmenuState() {
    const submenus = document.querySelectorAll('.submenu');
    submenus.forEach((submenu, index) => {
        const isCollapsed =
            localStorage.getItem(`submenu_${index}_collapsed`) === null
                ? index !== 0
                : localStorage.getItem(`submenu_${index}_collapsed`) === 'true';

        const content = submenu.querySelector('.submenu-content');
        const toggle = submenu.querySelector('.submenu-toggle');

        if (isCollapsed) {
            content?.classList.add('collapsed');
            toggle?.classList.add('collapsed');
        }
    });
}

document.getElementById('autoRefresh')!.addEventListener('change', (e: Event) => {
    localStorage.setItem('autoRefresh', (e.target as HTMLInputElement).checked ? 'true' : 'false');
});

document.getElementById('hideGridLines')!.addEventListener('change', (e: Event) => {
    const checked = (e.target as HTMLInputElement).checked;
    localStorage.setItem('hideGridLines', checked ? 'true' : 'false');
    document.getElementById('main')!.classList.toggle('hide-grid-lines', checked);
});

document.getElementById('showPinPanel')!.addEventListener('change', (e: Event) => {
    const checked = (e.target as HTMLInputElement).checked;
    localStorage.setItem('showPinPanel', checked ? 'true' : 'false');
    document.getElementById('pin-panel')!.classList.toggle('hidden', !checked);
});

document.getElementById('windowedMode')!.addEventListener('change', (e: Event) => {
    const checked = (e.target as HTMLInputElement).checked;
    localStorage.setItem('windowedMode', checked ? 'true' : 'false');
    toggleWindowedMode(checked);
});

document.getElementById('nodeOpacity')!.addEventListener('input', (e: Event) => {
    const value = Math.round(parseFloat((e.target as HTMLInputElement).value) * 100);
    state.currentNodeOpacity = value;
    localStorage.setItem('nodeOpacity', value.toString());
    updateOpacityClasses();
});

document.getElementById('bgOpacity')!.addEventListener('input', (e: Event) => {
    const value = Math.round(parseFloat((e.target as HTMLInputElement).value) * 100);
    state.currentBgOpacity = value;
    localStorage.setItem('bgOpacity', value.toString());
    updateOpacityClasses();
});

document.getElementById('pinPanelOpacity')!.addEventListener('input', (e: Event) => {
    const value = Math.round(parseFloat((e.target as HTMLInputElement).value) * 100);
    state.currentPinPanelOpacity = value;
    localStorage.setItem('pinPanelOpacity', value.toString());
    updateOpacityClasses();
});

document.getElementById('recipe-search')!.addEventListener('input', (e: Event) => filterRecipes());

(window as any).filterRecipes = filterRecipes;
(window as any).closeStoragesUI = closeStoragesUI;
(window as any).toggleSettings = toggleSettings;
(window as any).togglePinPanel = togglePinPanel;
(window as any).resetWindowPosition = resetWindowPosition;
(window as any).toggleSubmenu = toggleSubmenu;
(window as any).resetPinPanelPosition = resetPinPanelPosition;
(window as any).clearAllData = clearAllData;

document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (
        e.code === 'Space' &&
        !(
            (e.target as HTMLElement).tagName === 'INPUT' ||
            (e.target as HTMLElement).tagName === 'TEXTAREA' ||
            (e.target as HTMLElement).isContentEditable
        )
    ) {
        e.preventDefault();
        scheduleRefresh();
    } else if (e.key === 'Escape') {
        // Close recipe settings modal first if it's open
        const recipeSettingsModal = document.getElementById('recipe-settings-modal')!;
        if (!recipeSettingsModal.classList.contains('hidden')) {
            saveRecipeSettings();
        }

        closeStoragesUI();
        closeTransfersUI();

        if (state.runningInGame) {
            setInvisible();
            window.parent.postMessage({ type: 'pin' }, '*');
        }
    }
});
