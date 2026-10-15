import { ITEMS } from './data.js';

/** Helper types */

type IsNumber<T extends string> = T extends `${number}` ? true : false;

export type DeepOmit<T, K extends string> = K extends `${infer F}.${infer R}`
    ? F extends keyof T
        ? {
              [P in keyof T]: P extends F ? DeepOmit<T[P], R> : T[P];
          }
        : IsNumber<F> extends true
          ? T extends Array<infer E>
              ? Array<DeepOmit<E, R>>
              : T
          : T
    : {
          [P in keyof T as P extends K ? never : P]: T[P];
      };

/** Api Types */

export type UserFaqPath = `getuserfaq/${string}`;
export type StoragesPath = `storages/${string}`;
export type TrunkDataPath = `trunks/${string}`;
export type UserDataPath = `data/${string}`;
export type UserBackpackPath = `chest/u${string}backpack`;
export type ApiPath = UserFaqPath | StoragesPath | TrunkDataPath | UserDataPath | UserBackpackPath;

export interface StorageInventoryItem {
    amount: number;
}

export interface StorageData {
    inventory: Record<ItemId, StorageInventoryItem>;
    name: string;
}

export interface StorageResponse {
    storages: StorageData[];
}

export interface UserFactionResponse {
    is_in_faction: boolean;
    faction_id?: number;
}

export interface TrunkDataResponse {
    trunks: [
        {
            vehicle: string;
            inventory: Record<ItemId, StorageInventoryItem>;
            type: 'cab' | 'trailer' | 'car' | 'aircraft' | 'helicopter';
        }
    ];
}

export interface UserDataResponse {
    data: {
        inventory: Record<ItemId, StorageInventoryItem>;
    };
}

export interface UserBackpackDataPath {
    data: Record<ItemId, StorageInventoryItem>;
}

export type ApiPathResponse = {
    [P in ApiPath]: P extends UserFaqPath
        ? UserFactionResponse
        : P extends StoragesPath
          ? StorageResponse
          : P extends TrunkDataPath
            ? TrunkDataResponse
            : P extends UserDataPath
              ? UserDataResponse
              : P extends UserBackpackPath
                ? UserBackpackDataPath
                : never;
};

export type ApiResponse<T extends ApiPath> = ApiPathResponse[T];

/** Data Types */

export type ItemId = keyof typeof ITEMS;
export type ItemName = (typeof ITEMS)[ItemId]['name'];
export type RecipeName = string;
export type LocationName = string;
export type StorageId = string;

export enum StorageType {
    Storage = 'storage',
    Recipe = 'recipe',
    Vehicle = 'vehicle',
    Inventory = 'inventory',
    Backpack = 'backpack'
}

export enum VehicleType {
    Cab = 'cab',
    Trailer = 'trailer'
}

export enum StoragePriority {
    Vehicle = 100,
    Inventory = 100,
    Recipes = 90,
    Faction = 30,
    Train = 20,
    Yellowjack = 10,
    PaletoBay = 2,
    UnknownStorage = 1,
    UnknownVehicle = 0,
    Backpack = -1
}

export enum RecipeType {
    Recipe = 'recipe',
    Export = 'export',
    Import = 'import'
}

export type Item = {
    name: ItemName;
    vrpName: string;
    weight: number;
    isTruckingItem: boolean;
};

export type RecipeItem = {
    item: Item;
    amount: number;
};

export type NormalRecipe = {
    name: RecipeName;
    ingredients: RecipeItem[];
    products: RecipeItem[];
    cost: number;
    priority: number;
    location: LocationName;
    color?: string;
    highestMultiplier: number;
    path: string[];
    highestMultiplierPath: string[];
    type: RecipeType.Recipe;
};

export type ImportRecipe = {
    name: RecipeName;
    ingredients: RecipeItem[];
    products: RecipeItem[];
    cost: number;
    priority: number;
    location: LocationName;
    color?: string;
    highestMultiplier: number;
    path: string[];
    highestMultiplierPath: string[];
    type: RecipeType.Import;
};

export type ExportRecipe = {
    name: RecipeName;
    ingredients: RecipeItem[];
    exportItem: RecipeItem;
    cost: number;
    priority: number;
    location: LocationName;
    color?: string;
    highestMultiplier: number;
    path: string[];
    highestMultiplierPath: string[];
    type: RecipeType.Export;
};

export type Recipe = NormalRecipe | ImportRecipe | ExportRecipe;

export type Location = {
    name: LocationName;
    recipes: Recipe[];
    color: string;
};

export type Storage = {
    name: string;
    id: string;
    vrpName?: string;
    positions?: {
        x: number;
        y: number;
        z?: number;
        h?: number;
    }[];
    size?: number;
    fee?: number;
    type: StorageType;
    vehicleType?: VehicleType;
    priority: number;
    defaultPriority: number;
};

export type UserStorage = {
    storage: Storage;
    items: RecipeItem[];
};

/** Calculator types */

export enum StepType {
    Storage = 'storage',
    Recipe = 'recipe'
}

export type StorageStep = {
    storage: {
        name: string;
        type: StorageType;
    };
    type: StepType.Storage;
};

export type RecipeStep = {
    recipe: Recipe;
    recipeAmount: number;
    optimalProcessingRecipesPerRun: number;
    optimalProcessingIngredientsPerRun: {
        item: Item;
        amounts: number[];
        vrpNames: readonly string[];
    }[];
    maxLoadRecipesPerRun: number;
    maxLoadIngredientsPerRun: {
        item: Item;
        amounts: number[];
        vrpNames: readonly string[];
    }[];
    type: StepType.Recipe;
};

export type RouteStep = {
    target: {
        item: Item;
        amount: number;
    };
    solution: StorageStep | RecipeStep;
    subSteps: RouteStep[];
};

export type Route = {
    steps: RouteStep[];
};

/** Graph Types */

export type Node = {
    id: string;
    label: string;
    color: string;
    data: {
        steps: RouteStep[];
    };
    ingredientsPerRun: {
        item: Item;
        amounts: number[];
        vrpNames: readonly string[];
    }[];
};

export type Link = {
    id: string;
    source: string;
    target: string;
    data: {
        item: string;
        amount: number;
    };
};

export type Graph = {
    nodes: Node[];
    links: Link[];
};
