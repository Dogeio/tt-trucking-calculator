import { ALL_STORAGES, FACTION_STORAGE, ID_REPLACERS, ITEMS, LOCATIONS } from './data.js';
import {
    RouteStep,
    StepType,
    StorageType,
    Storage,
    UserStorage,
    StorageInventoryItem,
    ItemId,
    Item,
    RecipeType,
    LocationName,
    Location,
    StoragePriority,
    Recipe
} from './types.js';

export function idify(str: string): string {
    return str.replaceAll(' ', '_').toLowerCase();
}

export function stepToId(step: RouteStep, parentStep?: RouteStep): string {
    const isExportRecipe = step.solution.type === StepType.Recipe && step.solution.recipe.type === RecipeType.Export;

    return isExportRecipe
        ? `export_${idify(step.target.item.name)}`
        : step.solution.type === StepType.Recipe
          ? `recipe_${idify(step.solution.recipe.name)}`
          : step.solution.storage.type === StorageType.Recipe
            ? `recipe_${idify(step.solution.storage.name)}`
            : parentStep
              ? `storage_${idify(step.solution.storage.name)}_${stepToId(parentStep)}`
              : `storage_${idify(step.solution.storage.name)}`;
}

export function parseStorageItems(items: Record<ItemId | string, StorageInventoryItem>, storageId: string = 'unknown') {
    return Object.entries(items)
        .map(([itemId, { amount }]) => {
            let id = ID_REPLACERS.reduce((cv, pv) => cv.replace(pv, ''), itemId);
            if (id.startsWith('gut_knife')) {
                id = id.split('|')[0];
            } else if (id.startsWith('aircargo')) {
                return null;
            }

            const item = ITEMS[id as ItemId];

            if (item == null) {
                if (id !== 'outfit|ig_furry') console.info(`Unknown item: ${id} in ${storageId}`);
                return null;
            }
            return { item, amount };
        })
        .filter((item) => item !== null);
}

export function getStorage(storageId: string, userId: string | null = '', factionId?: string | null): Storage | null {
    let id = storageId
        .replace(new RegExp(`^chest_u${userId}`), '')
        .replace(new RegExp(`^chest_self_storage:${userId}:(.+):chest$`), '$1');
    const vehicleMatch = id.match(/^veh_\w+_(.+)$/);
    id = vehicleMatch ? vehicleMatch[1] : id;

    if (/^chest_u\d+/.test(id) || /^chest_self_storage:\d+:/.test(id)) {
        // Transfer to another player
        return null;
    }

    const foundStorage = ALL_STORAGES.find((s) => s.id === id);
    if (foundStorage) {
        return foundStorage;
    }

    if (id.startsWith('faq_')) {
        if (id === `faq_${factionId}`) {
            return FACTION_STORAGE;
        } else {
            return null;
        }
    }

    const newFoundStorage = ALL_STORAGES.find((s) => s.id === id);
    if (newFoundStorage) {
        return newFoundStorage;
    }

    console.warn(`Unknown storage: '${id}', assuming vehicle`);
    const storage: Storage = {
        name: id,
        id: id,
        type: StorageType.Vehicle,
        priority: StoragePriority.UnknownVehicle,
        defaultPriority: StoragePriority.UnknownVehicle
    };

    ALL_STORAGES.push(storage);

    return storage;
}

export function parseStorage(
    storageKey: string,
    items: Record<ItemId, StorageInventoryItem>,
    userId: string,
    factionId?: string | null
): UserStorage | null {
    const storage = getStorage(storageKey, userId, factionId);

    if (storage == null) {
        return null;
    }

    return {
        storage: storage,
        items: parseStorageItems(items, storage.id)
    };
}

export function canProduceItem(item: Item) {
    return LOCATIONS.some((location) =>
        location.recipes.some(
            (recipe) =>
                (recipe.type === RecipeType.Recipe && recipe.products.some((p) => p.item === item)) ||
                (recipe.type === RecipeType.Export && recipe.exportItem.item == item)
        )
    );
}

export function getTrunksMaxLoadDistribution(
    recipe: Recipe,
    userInventories: readonly number[],
    userInventoriesVrpNames: readonly string[]
): {
    allocations: {
        item: Item;
        amounts: number[];
        vrpNames: readonly string[];
    }[];
    recipeAmountPerRun: number;
} {
    const ingredients = recipe.ingredients;
    const products = recipe.type === RecipeType.Export ? [] : recipe.products;

    // Compute total weight of one recipe (max of ingredients or products)
    const totalIngredientsWeight = ingredients.reduce((sum, ri) => sum + ri.item.weight * ri.amount, 0);
    const totalProductsWeight = products.reduce((sum, pi) => sum + pi.item.weight * pi.amount, 0);
    const totalRecipeWeight = Math.max(totalIngredientsWeight, totalProductsWeight);

    const trunkCapacities = [...userInventories]; // Clone to avoid mutating original
    const vrpNames = [...userInventoriesVrpNames];

    // Helper: Check if k full recipes can be distributed across trunks
    function canFit(k: number): { success: boolean; allocations: Map<Item, number[]> } {
        const requiredWeights: { item: Item; totalWeight: number; totalAmount: number }[] = ingredients.map((ri) => ({
            item: ri.item,
            totalAmount: ri.amount * k,
            totalWeight: ri.item.weight * ri.amount * k
        }));

        const capacities = [...trunkCapacities]; // Working copy of trunks
        const allocations = new Map<Item, number[]>(); // Stores amount per trunk for each item

        for (const { item, totalAmount } of requiredWeights) {
            const itemAlloc: number[] = new Array(capacities.length).fill(0);
            let remaining = totalAmount;

            for (let i = 0; i < capacities.length && remaining > 0; i++) {
                const maxAmountThatFits = Math.floor(capacities[i] / item.weight);
                const toPlace = Math.min(maxAmountThatFits, remaining);

                if (toPlace > 0) {
                    itemAlloc[i] = toPlace;
                    capacities[i] -= toPlace * item.weight;
                    remaining -= toPlace;
                }
            }

            if (remaining > 0) return { success: false, allocations: new Map() }; // Not enough space

            allocations.set(item, itemAlloc);
        }

        return { success: true, allocations };
    }

    // Decrementing search from the theoretical maximum
    const totalCapacity = trunkCapacities.reduce((a, b) => a + b, 0);
    let maxPossible = Math.floor(totalCapacity / totalRecipeWeight);
    let bestAlloc: Map<Item, number[]> = new Map();
    let maxRecipes = 0;

    for (let k = maxPossible; k >= 0; k--) {
        const result = canFit(k);
        if (result.success) {
            maxRecipes = k;
            bestAlloc = result.allocations;
            break;
        }
    }

    // Format output
    const allocations = ingredients.map((ri) => ({
        item: ri.item,
        amounts: bestAlloc.get(ri.item) || new Array(userInventories.length).fill(0),
        vrpNames
    }));

    return {
        allocations,
        recipeAmountPerRun: maxRecipes
    };
}

export function getLocationByName(locationName: LocationName): Location | undefined {
    return LOCATIONS.find((l) => l.name === locationName);
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
}

function luminance(r: number, g: number, b: number) {
    let [R, G, B] = [r / 255, g / 255, b / 255].map((value) =>
        value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4)
    );
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

function contrastRatio(luminance1: number, luminance2: number) {
    return (luminance1 + 0.05) / (luminance2 + 0.05);
}

export function getBestTextColor(backgroundHex: string) {
    let { r, g, b } = hexToRgb(backgroundHex);
    let bgLuminance = luminance(r, g, b);
    let whiteLuminance = luminance(255, 255, 255);
    let blackLuminance = luminance(0, 0, 0);

    let whiteContrast = contrastRatio(whiteLuminance, bgLuminance);
    let blackContrast = contrastRatio(blackLuminance, bgLuminance);

    return whiteContrast > blackContrast ? '#111111' : '#ffffff';
}
