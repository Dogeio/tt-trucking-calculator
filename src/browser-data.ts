import state from './state.js';
import { loadRecipePriorities } from './recipes.js';
import { loadStoragePriorities } from './storage.js';
import { loadSelectedItems } from './item-selection.js';
import { ITEMS, VEHICLE_STORAGES } from './calculator/data.js';
import { canProduceItem, getStorage } from './calculator/utils.js';
import { toggleWindowedMode, updateOpacityClasses, getSavedGraphPosition } from './ui.js';
import { loadSavedCustomRecipes } from './nui.js';
import { ItemId, UserStorage } from './calculator/types.js';

type SerializedStorages = Record<string, Record<string, number>>;

function deserializeStorages(serialized: SerializedStorages | null | undefined): UserStorage[] {
    const userId = localStorage.getItem('userId');
    const factionId = localStorage.getItem('factionId');
    if (!serialized) return [];
    return Object.entries(serialized)
        .map(([id, items]) => {
            const storage = getStorage(id, userId, factionId);
            if (!storage) {
                return null;
            }

            const storageItems = Object.entries(items)
                .map(([itemId, amount]) => ({
                    item: ITEMS[itemId as ItemId],
                    amount
                }))
                .filter(({ item, amount }) => {
                    if (item == null) {
                        console.warn('Could not find some of the storage items: ', items, amount);
                        return false;
                    }

                    return true;
                });

            return {
                storage,
                items: storageItems
            } as UserStorage;
        })
        .filter((storage) => storage != null);
}

export function serializeStorages(): SerializedStorages {
    const serialized: SerializedStorages = {};
    for (const entry of state.storages as UserStorage[]) {
        const { storage, items } = entry;
        const storageItems: Record<string, number> = {};
        for (const { item, amount } of items) {
            if (amount > 0) {
                const found = Object.entries(ITEMS).find(([, i]) => i === item);
                const key = found?.[0];
                if (key) {
                    storageItems[key] = amount;
                }
            }
        }
        serialized[storage.id] = storageItems;
    }
    return serialized;
}

export function loadStored() {
    const storageDataVersion = Number(localStorage.getItem('storageDataVersion') ?? -1);
    if (storageDataVersion !== state.STORAGE_DATA_VERSION) {
        console.warn('Old storage data version detected, resetting storages and priorities.');
        localStorage.setItem('storages', JSON.stringify({}));
        localStorage.setItem('storagePriorities', JSON.stringify({}));
        localStorage.setItem('storageDataVersion', state.STORAGE_DATA_VERSION.toString());
    }

    try {
        const savedStorages = JSON.parse(localStorage.getItem('storages') ?? '{}');
        state.storages = deserializeStorages(savedStorages);
    } catch (e) {
        console.error('Failed to load state.storages:', e);
        state.storages = [];
    }

    loadSavedCustomRecipes();
    loadStoragePriorities();
    loadRecipePriorities();
    loadSelectedItems();

    const savedPosition = getSavedGraphPosition();
    if (savedPosition) {
        state.scale = savedPosition.scale ?? state.DEFAULT_SCALE;
        state.translateX = savedPosition.translateX ?? state.DEFAULT_TRANSLATE_X;
        state.translateY = savedPosition.translateY ?? state.DEFAULT_TRANSLATE_Y;
    }

    const apiKey = localStorage.getItem('apiKey');
    if (apiKey) {
        (document.getElementById('apiKey') as HTMLInputElement).value = apiKey;
    }

    const amount = localStorage.getItem('amount');
    if (amount) {
        (document.getElementById('amount') as HTMLInputElement).value = amount;
    } else {
        (document.getElementById('amount') as HTMLInputElement).value = state.DEFAULT_AMOUNT.toString();
    }

    const itemSelect = document.getElementById('itemType') as HTMLSelectElement;
    itemSelect.innerHTML = Object.entries(ITEMS)
        .filter(([, item]) => canProduceItem(item))
        .sort(([, a], [, b]) => a.name.localeCompare(b.name))
        .map(([id, item]) => `<option value="${id}">${item.name}</option>`)
        .join('');

    const itemType = localStorage.getItem('itemType');
    if (itemType && Object.hasOwn(ITEMS, itemType)) {
        itemSelect.value = itemType;
    } else {
        itemSelect.value = state.DEFAULT_ITEM_TYPE;
        localStorage.setItem('itemType', state.DEFAULT_ITEM_TYPE);
    }

    // Populate trailer dropdown
    const trailerSelect = document.getElementById('trailer')!;
    trailerSelect.innerHTML = '<option value="">None</option>';

    // Get all vehicle state.storages except mk15
    const trailerOptions = Object.entries(VEHICLE_STORAGES)
        .filter(([id]) => id !== 'mk15')
        .sort(([, a], [, b]) => (a?.size ?? 0) - (b?.size ?? 0))
        .map(([id, storage]) => `<option value="${id}">${storage.name}</option>`);

    trailerSelect.innerHTML += trailerOptions.join('');

    const userId = localStorage.getItem('userId');
    if (userId) {
        (document.getElementById('userId') as HTMLInputElement).value = userId;
    }

    const premium = localStorage.getItem('premium') !== 'false';
    (document.getElementById('premium') as HTMLInputElement).checked = premium;

    const alternativeApi = localStorage.getItem('alternativeApi') !== 'false';
    (document.getElementById('alternativeApi') as HTMLInputElement).checked = alternativeApi;
    if (alternativeApi) {
        state.apiUrl = state.ALTERNATIVE_API_URL;
    }

    const farmersMilk = localStorage.getItem('farmersMilk') === 'true';
    (document.getElementById('farmersMilk') as HTMLInputElement).checked = farmersMilk;

    // Load the perk value from localStorage
    const perk = localStorage.getItem('perk') ?? 'none';
    (document.getElementById('perk') as HTMLInputElement).value = perk;

    const vehicles = JSON.parse(localStorage.getItem('vehicles') ?? JSON.stringify(state.DEFAULT_VEHICLES));
    (document.getElementById('mk15') as HTMLInputElement).checked = vehicles.includes('mk15');

    // Set trailer value from vehicles array
    const savedTrailer = vehicles.find((v: string) => v !== 'mk15');
    if (savedTrailer && document.querySelector(`#trailer option[value="${savedTrailer}"]`)) {
        (document.getElementById('trailer') as HTMLInputElement).value = savedTrailer;
    } else {
        (document.getElementById('trailer') as HTMLInputElement).value = 'largetrailer';
    }

    // Populate the trucking item dropdown
    const truckingItemSelect = document.getElementById('truckingItemToTake') as HTMLSelectElement;
    truckingItemSelect.innerHTML = '<option value="">Select Item</option>';

    // Get all trucking items and sort them alphabetically
    const truckingItems = Object.entries(ITEMS)
        .sort(([, a], [, b]) => a.name.localeCompare(b.name))
        .map(([id, { name }]) => `<option value="${id}">${name}</option>`);

    truckingItemSelect.innerHTML += truckingItems.join('');

    // Set the saved trucking item
    const savedTruckingItem = localStorage.getItem('truckingItemToTake');
    if (savedTruckingItem && document.querySelector(`#truckingItemToTake option[value="${savedTruckingItem}"]`)) {
        truckingItemSelect.value = savedTruckingItem;
    }

    const useInventory =
        localStorage.getItem('useInventory') === null
            ? state.DEFAULT_USE_INVENTORY
            : localStorage.getItem('useInventory') !== 'false';
    (document.getElementById('useInventory') as HTMLInputElement).checked = useInventory;

    const useOptimalLoading =
        localStorage.getItem('useOptimalLoading') === null
            ? state.DEFAULT_USE_OPTIMAL_LOADING
            : localStorage.getItem('useOptimalLoading') !== 'false';
    (document.getElementById('useOptimalLoading') as HTMLInputElement).checked = useOptimalLoading;

    const useItems =
        localStorage.getItem('useItems') === null
            ? state.DEFAULT_USE_ITEMS
            : localStorage.getItem('useItems') !== 'false';
    (document.getElementById('useItems') as HTMLInputElement).checked = useItems;

    const collapsed = localStorage.getItem('settingsCollapsed') === 'true';
    document.querySelector('.user-input')!.classList.toggle('collapsed', collapsed);

    const windowedMode = localStorage.getItem('windowedMode') === 'true';
    (document.getElementById('windowedMode') as HTMLInputElement).checked = windowedMode;
    toggleWindowedMode(windowedMode);

    const autoRefresh = localStorage.getItem('autoRefresh') !== 'false';
    (document.getElementById('autoRefresh') as HTMLInputElement).checked = autoRefresh;

    const takeMax = localStorage.getItem('takeMax') === 'true';
    (document.getElementById('takeMax') as HTMLInputElement).checked = takeMax;

    const dumpBeforeExecuting = localStorage.getItem('dumpBeforeExecuting') !== 'false';
    (document.getElementById('dumpBeforeExecuting') as HTMLInputElement).checked = dumpBeforeExecuting;

    const autoOpenTrunk = localStorage.getItem('autoOpenTrunk') === 'true';
    (document.getElementById('autoOpenTrunk') as HTMLInputElement).checked = autoOpenTrunk;

    const autoCloseTrunk = localStorage.getItem('autoCloseTrunk') === 'true';
    (document.getElementById('autoCloseTrunk') as HTMLInputElement).checked = autoCloseTrunk;

    const autoRecipe = localStorage.getItem('autoRecipe') === 'true';
    (document.getElementById('autoRecipe') as HTMLInputElement).checked = autoRecipe;

    const useHighestMultiplier = localStorage.getItem('useHighestMultiplier') === 'true';
    (document.getElementById('useHighestMultiplier') as HTMLInputElement).checked = useHighestMultiplier;

    const nodeOpacity = parseInt(localStorage.getItem('nodeOpacity') ?? `${state.DEFAULT_NODE_OPACITY}`);
    const bgOpacity = parseInt(localStorage.getItem('bgOpacity') ?? `${state.DEFAULT_BG_OPACITY}`);
    const pinPanelOpacity = parseInt(localStorage.getItem('pinPanelOpacity') ?? `${state.DEFAULT_PIN_PANEL_OPACITY}`);

    (document.getElementById('nodeOpacity') as HTMLInputElement).value = (nodeOpacity / 100).toString();
    (document.getElementById('bgOpacity') as HTMLInputElement).value = (bgOpacity / 100).toString();
    (document.getElementById('pinPanelOpacity') as HTMLInputElement).value = (pinPanelOpacity / 100).toString();

    state.currentNodeOpacity = nodeOpacity;
    state.currentBgOpacity = bgOpacity;
    state.currentPinPanelOpacity = pinPanelOpacity;

    updateOpacityClasses();

    const hideGridLines = localStorage.getItem('hideGridLines') === 'true';
    (document.getElementById('hideGridLines') as HTMLInputElement).checked = hideGridLines;
    document.getElementById('main')!.classList.toggle('hide-grid-lines', hideGridLines);

    const showPinPanel = localStorage.getItem('showPinPanel') === 'true';
    (document.getElementById('showPinPanel') as HTMLInputElement).checked = showPinPanel;
    document.getElementById('pin-panel')!.classList.toggle('hidden', !showPinPanel);

    if (localStorage.getItem('pinPanelPosition')) {
        try {
            state.pinPanelPosition = JSON.parse(localStorage.getItem('pinPanelPosition') ?? 'null');
        } catch (e) {
            console.warn('Failed to parse saved pin panel position', e);
            state.pinPanelPosition = { x: null, y: null };
        }
    }

    if (localStorage.getItem('pinPanelSize')) {
        try {
            state.pinPanelSize = JSON.parse(localStorage.getItem('pinPanelSize') ?? 'null');
            state.pinPanelSize.width = Math.max(120, state.pinPanelSize.width ?? 300);
            state.pinPanelSize.height = Math.max(100, state.pinPanelSize.height ?? 300);
        } catch (e) {
            console.warn('Failed to parse saved pin panel size', e);
            state.pinPanelSize = { width: 300, height: 300 };
        }
    }

    state.pinnedNodeId = localStorage.getItem('pinnedNodeId');
}
