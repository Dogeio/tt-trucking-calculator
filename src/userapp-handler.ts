import state from './state.js';
import { scheduleRefresh } from './index.js';
import { nuiExecute, nuiDump, nuiCloseMenu, nuiTake, nuiCustom } from './nui.js';
import { setVisible, setInvisible } from './ui.js';
import { serializeStorages } from './browser-data.js';
import { parseStorage } from './calculator/utils.js';
import {
    INVENTORY_FULL,
    NOT_ENOUGH_ITEMS,
    ITEMS_EXCEED_INVENTORY_WEIGHT,
    OPEN_TRUNK,
    OPEN_CAB
} from './calculator/data.js';
import {
    VehicleType,
    RecipeType,
    StorageType,
    UserStorage,
    RecipeStep,
    RecipeItem,
    NormalRecipe
} from './calculator/types.js';
import { getActiveStoragesCopy } from './browser-utils.js';
import { addTransferLog } from './transfers.js';

function updateStorage(storage: UserStorage) {
    const oldStorageIndex = state.storages.findIndex(({ storage: oldStorage }) => oldStorage.id === storage.storage.id);

    let oldStorage = null;
    if (oldStorageIndex === -1) {
        state.storages.push(storage);
    } else {
        [oldStorage] = state.storages.splice(oldStorageIndex, 1, storage);
    }

    localStorage.setItem('storages', JSON.stringify(serializeStorages()));

    state.storagesUpdatedSinceLastRefresh = true;

    if (oldStorage) {
        const allStorageItems = [
            ...new Set([...oldStorage.items.map(({ item }) => item), ...storage.items.map(({ item }) => item)])
        ];

        const itemDifferences = [];
        for (const item of allStorageItems) {
            const difference =
                (storage.items.find(({ item: i }) => i === item)?.amount ?? 0) -
                (oldStorage.items.find(({ item: i }) => i === item)?.amount ?? 0);
            if (difference === 0) continue;
            itemDifferences.push({
                item,
                difference
            });
        }

        state.lastPotentialTransfer = itemDifferences;
    }
}

async function update(keys: string[]) {
    const useHighestMultiplier = (document.getElementById('useHighestMultiplier') as HTMLInputElement).checked;

    try {
        // Focus update
        if (keys.includes('focused')) {
            if (Boolean(state.cache.focused)) {
                setVisible();
                if (state.pendingRefresh) {
                    state.pendingRefresh = false;
                    try {
                        scheduleRefresh();
                    } catch (e) {
                        console.error('Error scheduling refresh:', e);
                    }
                } else if (
                    keys.includes('pinned') &&
                    !Boolean(state.cache.pinned) &&
                    state.storagesUpdatedSinceLastRefresh &&
                    (document.getElementById('useItems') as HTMLInputElement).checked
                ) {
                    try {
                        scheduleRefresh();
                    } catch (e) {
                        console.error('Error scheduling refresh:', e);
                    }
                }
            } else {
                setInvisible();
            }
        }

        // Storage updates
        const userId = (document.getElementById('userId') as HTMLInputElement).value;
        const errorDiv = document.getElementById('error') as HTMLDivElement;

        if (!userId) {
            errorDiv.textContent = 'Please enter a User ID';
            return;
        }

        const storedUserId = localStorage.getItem('userId') ?? userId;

        if (storedUserId !== userId) {
            errorDiv.textContent = 'Please enter and save an API key first';
            return;
        }

        const factionId = localStorage.getItem('factionId');

        if (factionId == null) {
            errorDiv.textContent = 'Please enter and save an API key first';
            return;
        }

        let shouldRefresh = false;

        for (const key of keys) {
            if ((key.startsWith('chest') && key !== 'chest') || key === 'inventory' || key === 'backpack') {
                const updatedStorage = parseStorage(
                    key,
                    JSON.parse(state.cache[key] === '' ? '{}' : (state.cache[key] ?? '{}')),
                    userId,
                    factionId === '-1' ? null : factionId
                );

                if (updatedStorage) {
                    updateStorage(updatedStorage);
                    shouldRefresh = true;
                } else {
                    console.warn('No storage update found for', key);
                }
            }
        }

        // Automatic trunks update
        while (keys.includes('notification')) {
            try {
                if (state.updatingTrunks) break;
                state.updatingTrunks = true;

                if (
                    !(
                        state.cache.notification === INVENTORY_FULL ||
                        state.cache.notification === ITEMS_EXCEED_INVENTORY_WEIGHT ||
                        state.cache.notification === NOT_ENOUGH_ITEMS
                    )
                ) {
                    break;
                }

                const autoOpenTrunk = (document.getElementById('autoOpenTrunk') as HTMLInputElement).checked;
                const autoCloseTrunk = (document.getElementById('autoCloseTrunk') as HTMLInputElement).checked;

                if (!autoOpenTrunk) break;

                if (!state.pinnedNodeId) {
                    console.warn('[AUTOTRUNK] No recipe pinned. Please pin a recipe first.');
                    break;
                }

                if (!state.currentRouteData || !state.currentRouteData.route) {
                    console.warn('[AUTOTRUNK] No route data or pinned node available.');
                    break;
                }

                const pinnedNodeData = state.currentRouteData.graph.nodes.find(
                    (node) => node.id === state.pinnedNodeId
                )?.data;

                if (!pinnedNodeData) {
                    console.warn('[AUTOTRUNK] Pinned node not found in current graph data or is unsupported.');
                    break;
                }

                const recipe = (
                    pinnedNodeData.steps.find((step) => step?.solution?.type === 'recipe')?.solution as RecipeStep
                )?.recipe;

                if (!recipe) {
                    console.warn('Pinned node not found in current graph data or is unsupported.');
                    log('~r~[DTC]~w~ [AUTOTRUNK] Pinned node not found in current graph data or is unsupported.');
                    return;
                }

                const activeStorages: {
                    storage: Storage & { totalWeight: number };
                    items: RecipeItem[];
                    remainingIngredientCrafts: number;
                    remainingProductsCrafts: number;
                }[] = getActiveStoragesCopy(false) as any;

                const inventoryStorage = activeStorages.find((s) => s.storage.type === StorageType.Inventory);

                activeStorages.forEach((s) => {
                    s.storage.totalWeight = s.items.reduce((pv, { item, amount }) => pv + item.weight * amount, 0);
                    // Find how many recipe crafts are possible to be done with the available items
                    s.remainingIngredientCrafts = Math.min(
                        ...recipe.ingredients.map(({ item, amount }) => {
                            if (s.storage.type === StorageType.Inventory || !inventoryStorage) {
                                return (s.items.find((i) => i.item === item)?.amount ?? 0) / amount;
                            } else {
                                const sAmount = s.items.find((i) => i.item === item)?.amount ?? 0;
                                const invAmount = inventoryStorage.items.find((i) => i.item === item)?.amount ?? 0;
                                return (sAmount + invAmount) / amount;
                            }
                        })
                    );

                    const productsWeight =
                        ((recipe as NormalRecipe).products ?? []).reduce(
                            (pv, { item, amount }) => pv + item.weight * amount,
                            0
                        ) * (useHighestMultiplier ? (recipe.highestMultiplier ?? 1) : 1);
                    s.remainingProductsCrafts =
                        productsWeight === 0
                            ? 0
                            : Math.floor((s.storage.size - s.storage.totalWeight) / productsWeight);
                });

                if (
                    (recipe.type === RecipeType.Export || recipe.type === RecipeType.Recipe) &&
                    (state.cache.notification === INVENTORY_FULL || state.cache.notification === NOT_ENOUGH_ITEMS)
                ) {
                    // Not enough items detection
                    const nextVehicleStorage = activeStorages.sort(
                        (a, b) => b.remainingIngredientCrafts - a.remainingIngredientCrafts
                    )[0];

                    if (nextVehicleStorage.remainingIngredientCrafts > 0) {
                        await nuiCloseMenu();
                        if (nextVehicleStorage.storage.vehicleType === VehicleType.Cab) {
                            window.parent.postMessage({ type: 'sendCommand', command: OPEN_CAB }, '*');
                        } else {
                            window.parent.postMessage({ type: 'sendCommand', command: OPEN_TRUNK }, '*');
                        }
                    } else {
                        if (autoCloseTrunk && state.cache.menu_open) await nuiCloseMenu();
                        console.log('[AUTOTRUNK] No available vehicle storage found.');
                    }
                } else if (
                    (recipe.type === RecipeType.Import || recipe.type === RecipeType.Recipe) &&
                    (state.cache.notification === INVENTORY_FULL ||
                        state.cache.notification === ITEMS_EXCEED_INVENTORY_WEIGHT)
                ) {
                    // Full inventory/trunk detection
                    const nextVehicleStorage = activeStorages.sort(
                        (a, b) => b.remainingProductsCrafts - a.remainingProductsCrafts
                    )[0];

                    if (nextVehicleStorage.remainingProductsCrafts > 0) {
                        await nuiCloseMenu();
                        if (nextVehicleStorage.storage.vehicleType === VehicleType.Cab) {
                            window.parent.postMessage({ type: 'sendCommand', command: OPEN_CAB }, '*');
                        } else {
                            window.parent.postMessage({ type: 'sendCommand', command: OPEN_TRUNK }, '*');
                        }
                    } else {
                        if (autoCloseTrunk && state.cache.menu_open) await nuiCloseMenu();
                        console.log('[AUTOTRUNK] No available vehicle storage found.');
                    }
                }
            } catch (e: any) {
                console.error('Error in automatic trunk update:', e.message);
            } finally {
                state.updatingTrunks = false;
                break;
            }
        }

        // Graph refresh update
        const unpinnedJustNow = keys.includes('pinned') && !Boolean(state.cache.pinned);

        if (
            ((document.getElementById('useItems') as HTMLInputElement).checked &&
                shouldRefresh &&
                (document.getElementById('autoRefresh') as HTMLInputElement).checked) ||
            (unpinnedJustNow && state.storagesUpdatedSinceLastRefresh)
        ) {
            try {
                scheduleRefresh();
            } catch (e) {
                console.error('Error scheduling refresh from update:', e);
            }
        }
    } catch (e: any) {
        console.error('Error in update function:', e.message);
    }
}

export function log(message: string | number) {
    window.parent.postMessage({ type: 'notification', text: message }, '*');
}

window.addEventListener('message', ({ data: eventData }) => {
    if (eventData.fromTycoonScript === true && !state.runningInGame) {
        state.runningInGame = true;
        window.parent.postMessage({ type: 'pin' }, '*');
        setInvisible();

        if (document.querySelector('.graph-container')!.classList.contains('windowed')) {
            document.querySelector('.graph-container')!.classList.add('in-game');
            document.getElementById('main')!.classList.add('in-game-windowed');
            document.getElementById('console-button-container')!.classList.remove('hidden');
        }
    }

    try {
        const data = eventData.data;
        if (!data || Object.keys(data).length === 0) return;

        if (state.keybindsEnabled) {
            if (state.cache.job === 'trucker') {
                if (
                    data['trigger_dtcexecute'] != null &&
                    data['trigger_dtcexecute'] !== state.cache['trigger_dtcexecute']
                ) {
                    console.log(
                        `nuiExecute: ${data['trigger_dtcexecute']} ${typeof data['trigger_dtcexecute']} ${
                            state.cache['trigger_dtcexecute']
                        } ${typeof state.cache['trigger_dtcexecute']}`
                    );
                    nuiExecute();
                } else if (
                    data['trigger_dtcdump'] != null &&
                    data['trigger_dtcdump'] !== state.cache['trigger_dtcdump']
                ) {
                    console.log(
                        `nuiDump: ${data['trigger_dtcdump']} ${typeof data['trigger_dtcdump']} ${
                            state.cache['trigger_dtcdump']
                        } ${typeof state.cache['trigger_dtcdump']}`
                    );
                    nuiDump();
                } else if (
                    data['trigger_dtctake'] != null &&
                    data['trigger_dtctake'] !== state.cache['trigger_dtctake']
                ) {
                    console.log(
                        `nuiTake: ${data['trigger_dtctake']} ${typeof data['trigger_dtctake']} ${
                            state.cache['trigger_dtctake']
                        } ${typeof state.cache['trigger_dtctake']}`
                    );
                    nuiTake();
                } else if (
                    data['trigger_dtccustom'] != null &&
                    data['trigger_dtccustom'] !== state.cache['trigger_dtccustom']
                ) {
                    console.log(
                        `nuiCustom: ${data['trigger_dtccustom']} ${typeof data['trigger_dtccustom']} ${
                            state.cache['trigger_dtccustom']
                        } ${typeof state.cache['trigger_dtccustom']}`
                    );
                    nuiCustom();
                }
            }
        }

        for (const [key, value] of Object.entries(data)) {
            if (key === 'menu_choices') {
                state.cache[key] = JSON.parse((value as string) ?? '[]');
            } else {
                state.cache[key] = value;
            }
        }

        update(Object.keys(data));

        if (data['notification']) {
            const match = data['notification'].match(/^Moved (\d+) items to (.+)$/);
            if (match && state.lastPotentialTransfer) {
                const amount = parseInt(match[1]);
                const user = match[2];
                if (user !== 'the trunk' && user !== 'trunk') {
                    const itemTransfer = state.lastPotentialTransfer.find(
                        ({ difference }: { difference: number }) => -difference === amount
                    );

                    if (itemTransfer) {
                        // Store to transfer logs
                        addTransferLog('out', user, [
                            {
                                name: itemTransfer.item.vrpName ?? itemTransfer.item.name,
                                amount
                            }
                        ]);
                        console.log(
                            `[OUT] Transfer of item ${
                                itemTransfer.item.vrpName ?? itemTransfer.item.name
                            } (${amount}x) to ${user}`
                        );
                        log(
                            `~r~[DTC]~w~ Detected transfer of item ${
                                itemTransfer.item.vrpName ?? itemTransfer.item.name
                            } (${amount}x) to ${user}`
                        );

                        state.lastPotentialTransfer = null;
                    } else {
                        console.warn(
                            `Notification amount (${amount}) does not match any of the last potential transfers. Notification: ${data['notification']}. Transfers: ${state.lastPotentialTransfer}`
                        );
                    }
                }
            }
        }

        if (data['notification']) {
            const match = data['notification'].match(/^(.+) transfered (\d+)x (.+) to your .+ storage$/);
            if (match) {
                // Store to transfer logs
                const from = match[1];
                const amount = parseInt(match[2]);
                const itemName = match[3];

                addTransferLog('in', from, [{ name: itemName, amount }]);
                console.log(`[IN] Transfer of item: ${match[3]} (${match[2]}x) from ${match[1]}`);
                log(`~r~[DTC]~w~ Detected transfer of item ${match[3]} (${match[2]}x) from ${match[1]}`);
            }
        }
    } catch {}
});
