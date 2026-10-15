import { Graph, Item, ItemId, Route, UserStorage } from './calculator/types.js';

const STORAGE_DATA_VERSION = 2;

const MAX_LOGS = 1000;
const ZOOM_SENSITIVITY = 0.1;
const PANNING_DETECTION_SENSITIVITY = 3;

const DEFAULT_SCALE = 1;
const DEFAULT_TRANSLATE_X = 0;
const DEFAULT_TRANSLATE_Y = 0;
const DEFAULT_NODE_OPACITY = 100;
const DEFAULT_BG_OPACITY = 100;
const DEFAULT_PIN_PANEL_OPACITY = 0;
const REFRESH_IMMEDIATE_DELAY = 25;
const DEFAULT_AMOUNT = 500;
const DEFAULT_VEHICLES = ['trailerlarge'];
const DEFAULT_USE_INVENTORY = true;
const DEFAULT_USE_OPTIMAL_LOADING = true;
const DEFAULT_USE_ITEMS = true;
const DEFAULT_ITEM_TYPE = 'crafted_concrete';
const DEFAULT_CONSOLE_FILTER = 'all';
const DEFAULT_API_URL = 'https://tycoon-2epova.users.cfx.re/status/';
const ALTERNATIVE_API_URL = 'https://d.ttstats.eu/public-main/status/';
const NUI_TIMEOUT = 10;
const NUI_RETRIES = 300;
const NUI_SUBMIT_TIMEOUT = 5;
const NUI_SUBMIT_RETRIES = 200;
const NUI_EXTRA_DELAY = 10;
const NUI_AUTO_RECIPE_INTERVAL = 50;

const state: {
    STORAGE_DATA_VERSION: number;
    MAX_LOGS: number;
    ZOOM_SENSITIVITY: number;
    PANNING_DETECTION_SENSITIVITY: number;
    DEFAULT_SCALE: number;
    DEFAULT_TRANSLATE_X: number;
    DEFAULT_TRANSLATE_Y: number;
    DEFAULT_NODE_OPACITY: number;
    DEFAULT_BG_OPACITY: number;
    DEFAULT_PIN_PANEL_OPACITY: number;
    REFRESH_IMMEDIATE_DELAY: number;
    DEFAULT_AMOUNT: number;
    DEFAULT_VEHICLES: string[];
    DEFAULT_USE_INVENTORY: boolean;
    DEFAULT_USE_OPTIMAL_LOADING: boolean;
    DEFAULT_USE_ITEMS: boolean;
    DEFAULT_ITEM_TYPE: string;
    DEFAULT_CONSOLE_FILTER: string;
    DEFAULT_API_URL: string;
    ALTERNATIVE_API_URL: string;
    NUI_TIMEOUT: number;
    NUI_RETRIES: number;
    NUI_SUBMIT_TIMEOUT: number;
    NUI_SUBMIT_RETRIES: number;
    NUI_EXTRA_DELAY: number;
    NUI_AUTO_RECIPE_INTERVAL: number;
    logs: HTMLDivElement[];
    cache: { [k: string]: any };
    scale: number;
    translateX: number;
    translateY: number;
    isPanning: boolean;
    wasPanning: boolean;
    hasMoved: boolean;
    startPanX: number;
    startPanY: number;
    lastMouseX: number;
    lastMouseY: number;
    storages: UserStorage[];
    currentNodeOpacity: number;
    currentBgOpacity: number;
    currentPinPanelOpacity: number;
    runningInGame: boolean;
    pendingRefresh: boolean;
    refreshTimeout: ReturnType<typeof setTimeout> | null;
    storagesUpdatedSinceLastRefresh: boolean;
    isRefreshing: boolean;
    pinnedNodeId: string | null;
    pinnedNodePosition: { x: number; y: number } | null;
    boundWheel: ((e: WheelEvent) => void) | null;
    boundMouseDown: ((e: MouseEvent) => void) | null;
    boundMouseMove: ((e: MouseEvent) => void) | null;
    boundMouseUp: (() => void) | null;
    boundClick: ((e: MouseEvent) => void) | null;
    boundDblClick: (() => void) | null;
    boundBlurActive: (() => void) | null;
    elk: any;
    currentRouteData: { route: Route; resultingUserStorages: UserStorage[]; graph: Graph } | null;
    pinPanelPosition: { x: number | null; y: number | null };
    pinPanelSize: { width: number; height: number };
    defaultRecipePriorities: { [key: string]: number };
    selectedItems: { itemId: ItemId; amount: number }[];
    customRecipeIngredients: { itemId: ItemId; amount: number }[];
    customRecipeProducts: { itemId: ItemId; amount: number }[];
    updatingTrunks: boolean;
    lastPotentialTransfer: { item: Item; difference: number }[] | null;
    apiUrl: string;
    autoRecipeInterval: ReturnType<typeof setInterval> | null;
    executingNuiActions: boolean;
    executingNuiAutoRecipe: boolean;
    keybindsEnabled: boolean;
} = {
    STORAGE_DATA_VERSION,
    MAX_LOGS,
    ZOOM_SENSITIVITY,
    PANNING_DETECTION_SENSITIVITY,
    DEFAULT_SCALE,
    DEFAULT_TRANSLATE_X,
    DEFAULT_TRANSLATE_Y,
    DEFAULT_NODE_OPACITY,
    DEFAULT_BG_OPACITY,
    DEFAULT_PIN_PANEL_OPACITY,
    REFRESH_IMMEDIATE_DELAY,
    DEFAULT_AMOUNT,
    DEFAULT_VEHICLES,
    DEFAULT_USE_INVENTORY,
    DEFAULT_USE_OPTIMAL_LOADING,
    DEFAULT_USE_ITEMS,
    DEFAULT_ITEM_TYPE,
    DEFAULT_CONSOLE_FILTER,
    DEFAULT_API_URL,
    ALTERNATIVE_API_URL,
    NUI_TIMEOUT,
    NUI_RETRIES,
    NUI_SUBMIT_TIMEOUT,
    NUI_SUBMIT_RETRIES,
    NUI_EXTRA_DELAY,
    NUI_AUTO_RECIPE_INTERVAL,
    logs: [],
    cache: {},
    scale: DEFAULT_SCALE,
    translateX: DEFAULT_TRANSLATE_X,
    translateY: DEFAULT_TRANSLATE_Y,
    isPanning: false,
    wasPanning: false,
    hasMoved: false,
    startPanX: 0,
    startPanY: 0,
    lastMouseX: 0,
    lastMouseY: 0,
    storages: [],
    currentNodeOpacity: DEFAULT_NODE_OPACITY,
    currentBgOpacity: DEFAULT_BG_OPACITY,
    currentPinPanelOpacity: DEFAULT_PIN_PANEL_OPACITY,
    runningInGame: false,
    pendingRefresh: false,
    refreshTimeout: null,
    storagesUpdatedSinceLastRefresh: false,
    isRefreshing: false,
    pinnedNodeId: null,
    pinnedNodePosition: null,
    boundWheel: null,
    boundMouseDown: null,
    boundMouseMove: null,
    boundMouseUp: null,
    boundClick: null,
    boundDblClick: null,
    boundBlurActive: null,
    elk: new (window as any).ELK(),
    currentRouteData: null,
    pinPanelPosition: { x: null, y: null },
    pinPanelSize: { width: 300, height: 300 },
    defaultRecipePriorities: {},
    selectedItems: [],
    customRecipeIngredients: [],
    customRecipeProducts: [],
    updatingTrunks: false,
    lastPotentialTransfer: null,
    apiUrl: DEFAULT_API_URL,
    autoRecipeInterval: null,
    executingNuiActions: false,
    executingNuiAutoRecipe: false,
    keybindsEnabled: false
};

export default state;
