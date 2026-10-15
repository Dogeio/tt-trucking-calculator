import { DEFAULT_COLOR, DEFAULT_STORAGE_COLOR } from './data.js';
import { Node, Link, Route, RouteStep, StepType, Graph, Item } from './types.js';
import { getLocationByName, idify, stepToId } from './utils.js';

export function generateCraftingGraph(
    route: Route,
    useOptimalLoading: boolean
): {
    graph: Graph;
    info: { totalCost: number; totalRuns: number; totalRevenue: number };
} {
    const nodes: Omit<Omit<Omit<Node, 'label'>, 'color'>, 'ingredientsPerRun'>[] = [];
    let links: Link[] = [];

    function processStep(step: RouteStep, parentStep?: RouteStep) {
        // Create appropriate nodeId
        const nodeId = stepToId(step, parentStep);

        // Add node if it doesn't exist
        const existingNode = nodes.find((node) => node.id === nodeId);
        if (!existingNode) {
            nodes.push({
                id: nodeId,
                data: {
                    steps: [step]
                }
            });
        } else {
            existingNode.data.steps.push(step);
        }

        // Create links
        if (parentStep) {
            const targetId = stepToId(parentStep);
            const linkId = `${nodeId}_${targetId}_${idify(step.target.item.name)}`;
            const existingLink = links.find((link) => link.id === linkId);

            // Only create the link if it's not a self-reference
            if (nodeId !== targetId) {
                if (!existingLink) {
                    links.push({
                        id: linkId,
                        source: nodeId,
                        target: targetId,
                        data: {
                            item: step.target.item.name,
                            amount: step.target.amount
                        }
                    });
                } else {
                    existingLink.data.amount += step.target.amount;
                }
            }
        }

        // Process substeps
        for (const subStep of step.subSteps) {
            processStep(subStep, step);
        }
    }

    for (const step of route.steps) {
        processStep(step);
    }

    const graph = {
        nodes: nodes.map((node) => ({ ...node, ...generateOmittedNodeData(node, useOptimalLoading) })),
        links
    };

    // Calculate route information
    let totalCost = 0;
    let totalRuns = 0;
    let totalRevenue = 0;

    // Count runs and calculate costs
    for (const node of graph.nodes) {
        const firstStep = node.data.steps[0];
        if (firstStep && firstStep.solution.type === StepType.Recipe) {
            const solution = firstStep.solution;
            const totalRecipeAmount = node.data.steps.reduce(
                (sum, step) => sum + (step.solution.type === StepType.Recipe ? step.solution.recipeAmount : 0),
                0
            );

            // Always use optimal if both are equal
            const useOptimal =
                solution.optimalProcessingRecipesPerRun === solution.maxLoadRecipesPerRun ? true : useOptimalLoading;

            const recipesPerRun = useOptimal ? solution.optimalProcessingRecipesPerRun : solution.maxLoadRecipesPerRun;
            totalRuns += Math.ceil(totalRecipeAmount / recipesPerRun);

            if (solution.recipe.cost > 0) {
                totalCost += solution.recipe.cost * totalRecipeAmount;
            } else {
                totalRevenue += -solution.recipe.cost * totalRecipeAmount;
            }
        }
    }

    return {
        graph,
        info: {
            totalCost,
            totalRuns,
            totalRevenue
        }
    };
}

function generateOmittedNodeData(
    node: Omit<Omit<Omit<Node, 'label'>, 'color'>, 'ingredientsPerRun'>,
    useOptimalLoading: boolean
): {
    label: string;
    color: string;
    ingredientsPerRun: Array<{ item: Item; amounts: number[]; vrpNames: readonly string[] }>;
} {
    const steps = node.data.steps;
    const firstStep = steps[0];

    if (!firstStep) {
        console.warn(`Unable to find first step for node: ${node.id}`);
        return {
            label: '',
            color: DEFAULT_COLOR,
            ingredientsPerRun: []
        };
    }

    if (firstStep.solution.type === StepType.Recipe) {
        const solution = firstStep.solution;
        const totalRecipeAmount = steps.reduce(
            (sum, step) => sum + (step.solution.type === StepType.Recipe ? step.solution.recipeAmount : 0),
            0
        );
        if (isNaN(totalRecipeAmount)) {
            console.warn(steps);
        }

        // Always use optimal if both are equal
        const useOptimal =
            solution.optimalProcessingRecipesPerRun === solution.maxLoadRecipesPerRun ? true : useOptimalLoading;

        const recipesPerRun = useOptimal ? solution.optimalProcessingRecipesPerRun : solution.maxLoadRecipesPerRun;
        const runs = Math.ceil(totalRecipeAmount / recipesPerRun);

        // Select which ingredientsPerRun array to use
        const ingredientsPerRunArray = useOptimal
            ? solution.optimalProcessingIngredientsPerRun
            : solution.maxLoadIngredientsPerRun;

        // Calculate ingredientsPerRun
        const ingredientsPerRun = solution.recipe.ingredients.map((ingredient) => {
            const itemIngredientsPerRun = ingredientsPerRunArray.find(({ item }) => item === ingredient.item)!;

            let remaining = totalRecipeAmount * ingredient.amount;
            const amountsUsed = [];

            const len = itemIngredientsPerRun.amounts.length;
            for (let i = 0; i < len; i++) {
                const processingIngredientsPerRun = itemIngredientsPerRun.amounts[i];
                const toAdd = Math.min(remaining, processingIngredientsPerRun);
                remaining -= toAdd;
                amountsUsed.push(toAdd);
            }

            return {
                item: ingredient.item,
                amounts: amountsUsed,
                vrpNames: itemIngredientsPerRun.vrpNames
            };
        });

        const ingredientsLabel = solution.recipe.ingredients
            .map((ingredient, index) => {
                return `${ingredient.item.name}: ${ingredientsPerRun[index].amounts.join('x/')}x`;
            })
            .join('\n');

        const locationName = solution.recipe.location.replace('Trucking: ', '');
        return {
            label: `${locationName}\n${solution.recipe.name}\nRuns: ${runs}${ingredientsLabel ? '\n' + ingredientsLabel : ''}`,
            color:
                firstStep.solution.recipe.color ??
                getLocationByName(firstStep.solution.recipe.location)?.color ??
                DEFAULT_STORAGE_COLOR,
            ingredientsPerRun
        };
    } else {
        return {
            label: firstStep.solution.storage.name,
            color: DEFAULT_STORAGE_COLOR,
            ingredientsPerRun: []
        };
    }
}
