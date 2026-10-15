import {
    Item,
    Route,
    RouteStep,
    StepType,
    StoragePriority,
    StorageType,
    UserStorage,
    RecipeType,
    NormalRecipe,
    ExportRecipe,
    ImportRecipe
} from './types.js';
import { LOCATIONS } from './data.js';
import { getTrunksMaxLoadDistribution } from './utils.js';

// Generates a trucking route to produce specified amounts of multiple items.
// Returns the route and any remaining excess items.
export function generateTruckingRoute(
    items: Item[],
    amounts: number[],
    userInventories: readonly number[],
    userInventoriesVrpNames: readonly string[],
    userStorages: readonly UserStorage[] = [],
    useHighestMultiplier: boolean = false
): { route: Route; resultingUserStorages: UserStorage[] } {
    if (items.length !== amounts.length) {
        throw new Error('Items and amounts arrays must have the same length');
    }

    const storages = userStorages
        .map((storage) => ({
            ...storage,
            items: storage.items.map((item) => ({ ...item }))
        }))
        .sort(({ storage: a }, { storage: b }) => b.priority - a.priority);

    // Precompute maps of item -> prioritized recipe
    const itemToRecipeMap: Record<string, NormalRecipe | ImportRecipe> = {};
    const exportRecipeMap: Record<string, ExportRecipe> = {};

    for (const location of LOCATIONS) {
        for (const recipe of location.recipes) {
            if (recipe.type === RecipeType.Export) {
                if (items.some((item) => recipe.exportItem.item.name === item.name)) {
                    const existingRecipe = exportRecipeMap[recipe.exportItem.item.name];
                    if (!existingRecipe || recipe.priority > existingRecipe.priority) {
                        exportRecipeMap[recipe.exportItem.item.name] = {
                            ...recipe,
                            ingredients: [...recipe.ingredients.map((ingredient) => ({ ...ingredient }))],
                            exportItem: { ...recipe.exportItem }
                        };

                        const newRecipe = exportRecipeMap[recipe.exportItem.item.name];
                        if (useHighestMultiplier) {
                            newRecipe.ingredients = newRecipe.ingredients.map((ingredient) => ({
                                ...ingredient,
                                amount: ingredient.amount * newRecipe.highestMultiplier
                            }));

                            newRecipe.exportItem = {
                                ...newRecipe.exportItem,
                                amount: newRecipe.exportItem.amount * newRecipe.highestMultiplier
                            };

                            newRecipe.cost = Math.round(newRecipe.cost * newRecipe.highestMultiplier);
                        }
                    }
                }
                continue;
            }

            for (const product of recipe.products) {
                const existingRecipe = itemToRecipeMap[product.item.name];
                if (!existingRecipe || recipe.priority > existingRecipe.priority) {
                    itemToRecipeMap[product.item.name] = {
                        ...recipe,
                        ingredients: [...recipe.ingredients.map((ingredient) => ({ ...ingredient }))],
                        products: [...recipe.products.map((product) => ({ ...product }))]
                    };

                    const newRecipe = itemToRecipeMap[product.item.name];

                    if (useHighestMultiplier) {
                        newRecipe.ingredients = newRecipe.ingredients.map((ingredient) => ({
                            ...ingredient,
                            amount: ingredient.amount * newRecipe.highestMultiplier
                        }));
                        newRecipe.products = newRecipe.products.map((product) => ({
                            ...product,
                            amount: product.amount * newRecipe.highestMultiplier
                        }));
                        newRecipe.cost = Math.round(newRecipe.cost * newRecipe.highestMultiplier);
                    }
                }
            }
        }
    }

    // Find recipe for ingredients
    function findRecipe(targetItem: Item): NormalRecipe | ImportRecipe | null {
        return itemToRecipeMap[targetItem.name] ?? null;
    }

    // Recursively creates the graph by producing all the required ingredients
    function produceItem(targetItem: Item, requiredAmount: number): RouteStep[] {
        const subSteps: RouteStep[] = [];

        // Utilize items from storages, if available
        for (const storage of storages) {
            const itemInStorage = storage.items.find((i) => i.item === targetItem);
            if (itemInStorage && itemInStorage.amount > 0) {
                const used = Math.min(itemInStorage.amount, requiredAmount);
                itemInStorage.amount -= used;
                requiredAmount -= used;

                if (itemInStorage.amount === 0) {
                    storage.items = storage.items.filter((i) => i.amount > 0);
                }

                return [
                    {
                        target: {
                            item: targetItem,
                            amount: used
                        },
                        solution: {
                            storage: {
                                name: storage.storage.name,
                                type: storage.storage.type
                            },
                            type: StepType.Storage
                        },
                        subSteps: []
                    },
                    ...(requiredAmount > 0 ? produceItem(targetItem, requiredAmount) : [])
                ];
            }
        }

        // Find a recipe to produce the target item
        const recipe = findRecipe(targetItem);
        if (!recipe) {
            // If no recipe is found create a fake storage step
            console.warn(`No recipe found to produce ${targetItem.name}`);

            return [
                {
                    solution: {
                        storage: {
                            name: 'User Storage',
                            type: StorageType.Storage
                        },
                        type: StepType.Storage
                    },
                    target: {
                        item: targetItem,
                        amount: requiredAmount
                    },
                    subSteps: []
                }
            ];
        }

        // Determine the number of batches required to meet the required amount.
        const batches = Math.ceil(
            requiredAmount / recipe.products.find((p) => p.item.name === targetItem.name)!.amount
        );

        // Calculate the max ingredients per run.
        const productWeight = recipe.products.reduce((sum, prod) => sum + prod.item.weight * prod.amount, 0);
        const ingredientWeight = recipe.ingredients.reduce((sum, ing) => sum + ing.item.weight * ing.amount, 0);
        const weightPerCraft = Math.max(productWeight, ingredientWeight);
        const optimalProcessingRecipesPerRunPerInventory = userInventories.map((capacity) =>
            Math.floor(capacity / weightPerCraft)
        );

        const optimalProcessingIngredientsPerRun = recipe.ingredients.map((ingredient) => ({
            item: ingredient.item,
            amounts: optimalProcessingRecipesPerRunPerInventory.map(
                (optimalProcessingRecipesPerRun) => ingredient.amount * optimalProcessingRecipesPerRun
            ),
            inventories: userInventories,
            vrpNames: userInventoriesVrpNames
        }));

        // Recursively produce ingredients for the recipe.
        for (const ingredient of recipe.ingredients) {
            subSteps.push(...produceItem(ingredient.item, ingredient.amount * batches));
        }

        // Update the storage items
        for (const product of recipe.products) {
            const produced = product.amount * batches;
            const consumed = targetItem === product.item ? requiredAmount : 0;
            const excessAmount = produced - consumed;

            if (excessAmount === 0) continue;

            let storage = storages.find((s) => s.storage.name === recipe.name);
            if (!storage) {
                storage = {
                    storage: {
                        name: recipe.name,
                        id: recipe.name,
                        positions: [],
                        size: 0,
                        fee: 0,
                        type: StorageType.Recipe,
                        priority: StoragePriority.Recipes,
                        defaultPriority: StoragePriority.Recipes
                    },
                    items: []
                };
                storages.push(storage);
            }

            const existingItem = storage.items.find((i) => i.item.name === product.item.name);
            if (existingItem) {
                existingItem.amount += excessAmount;
            } else {
                storage.items.push({ item: product.item, amount: excessAmount });
            }
        }

        const maxLoadData = getTrunksMaxLoadDistribution(recipe, userInventories, userInventoriesVrpNames);

        // Return the route step
        return [
            {
                target: {
                    item: targetItem,
                    amount: requiredAmount
                },
                solution: {
                    recipe,
                    recipeAmount: batches,
                    optimalProcessingRecipesPerRun: optimalProcessingRecipesPerRunPerInventory.reduce(
                        (acc, cv) => acc + cv,
                        0
                    ),
                    optimalProcessingIngredientsPerRun: optimalProcessingIngredientsPerRun,
                    maxLoadRecipesPerRun: maxLoadData.recipeAmountPerRun,
                    maxLoadIngredientsPerRun: maxLoadData.allocations,
                    type: StepType.Recipe
                },
                subSteps: subSteps
            }
        ];
    }

    // Create top-level steps for each requested item
    const topLevelSteps: RouteStep[] = [];

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const amount = amounts[i];

        const exportRecipe = exportRecipeMap[item.name] ?? {
            name: 'User Storage',
            location: 'Store Item',
            ingredients: [
                {
                    item,
                    amount: 1
                }
            ],
            type: RecipeType.Export,
            exportItem: {
                item: item,
                amount: 1
            },
            cost: 0,
            priority: 1,
            path: [],
            highestMultiplier: 1,
            highestMultiplierPath: []
        };

        const batches = Math.ceil(amount / exportRecipe.exportItem.amount);

        // Item has an export recipe
        const subSteps: RouteStep[] = [];
        for (const ingredient of exportRecipe.ingredients) {
            subSteps.push(...produceItem(ingredient.item, ingredient.amount * batches));
        }

        // Calculate max ingredients per run using same logic as produceItem
        const productWeight = exportRecipe.exportItem.amount * exportRecipe.exportItem.item.weight;
        const ingredientWeight = exportRecipe.ingredients.reduce((sum, ing) => sum + ing.item.weight * ing.amount, 0);
        const weightPerCraft = Math.max(productWeight, ingredientWeight);
        const optimalProcessingRecipesPerRunPerInventory = userInventories.map((capacity) =>
            Math.floor(capacity / weightPerCraft)
        );

        const optimalProcessingIngredientsPerRun = exportRecipe.ingredients.map((ingredient) => ({
            item: ingredient.item,
            amounts: optimalProcessingRecipesPerRunPerInventory.map(
                (optimalProcessingRecipesPerRun) => ingredient.amount * optimalProcessingRecipesPerRun
            ),
            vrpNames: userInventoriesVrpNames
        }));

        const maxLoadData = getTrunksMaxLoadDistribution(exportRecipe, userInventories, userInventoriesVrpNames);

        topLevelSteps.push({
            target: {
                item: item,
                amount: amount
            },
            solution: {
                recipe: exportRecipe,
                recipeAmount: batches,
                optimalProcessingRecipesPerRun: optimalProcessingRecipesPerRunPerInventory.reduce(
                    (acc, cv) => acc + cv,
                    0
                ),
                optimalProcessingIngredientsPerRun,
                maxLoadRecipesPerRun: maxLoadData.recipeAmountPerRun,
                maxLoadIngredientsPerRun: maxLoadData.allocations,
                type: StepType.Recipe
            },
            subSteps: subSteps
        });
    }

    return {
        route: {
            steps: topLevelSteps
        },
        resultingUserStorages: storages.filter((storage) => storage.items.length > 0)
    };
}
