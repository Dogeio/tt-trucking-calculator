import { ITEMS } from './calculator/data.js';
import { fetchStorages, fetchFactionId } from './calculator/api.js';
import { generateTruckingRoute } from './calculator/crafting.js';
import { generateCraftingGraph } from './calculator/graph.js';
import { renderElkGraph } from './calculator/elk-renderer.js';
import { StorageType } from './calculator/types.js';
import { getActiveStoragesCopy } from './browser-utils.js';
import state from './state.js';
import './console.js';
import './settings-handlers.js';
import './storages-ui.js';
import './transfers-ui.js';
import {
    isVisible,
    initializePinPanel,
    updatePinPanel,
    initializeSubmenuState,
    initializeGraph,
    applyPinnedNodeStyling,
    getSavedGraphPosition,
    applyTransform
} from './ui.js';
import { getSelectedItems, updateSelectedItemsList } from './item-selection.js';
import './recipes.js';
import { loadStored, serializeStorages } from './browser-data.js';
import './userapp-handler.js';

async function saveApiKey() {
    const errorDiv = document.getElementById('error');
    const apiKey = (document.getElementById('apiKey') as HTMLInputElement).value;
    if (!apiKey) {
        if (errorDiv) errorDiv.textContent = 'Please enter an API Key';
        return;
    }

    const userId = (document.getElementById('userId') as HTMLInputElement).value;
    if (!userId) {
        if (errorDiv) errorDiv.textContent = 'Please enter a User ID';
        return;
    }

    try {
        const factionId = (await fetchFactionId(state.apiUrl, userId, apiKey)) ?? '-1';

        state.storages = [];
        localStorage.setItem('storages', JSON.stringify(serializeStorages()));

        localStorage.setItem('userId', userId);
        localStorage.setItem('apiKey', apiKey);
        localStorage.setItem('factionId', factionId);

        setTimeout(() => {
            const el = document.getElementById('error');
            if (el) el.textContent = '';
        }, 2000);

        if (errorDiv) errorDiv.textContent = 'API Key saved!';
    } catch (e) {
        console.error('Error saving API key:', e);
        if (errorDiv) errorDiv.textContent = 'Error: ' + (e instanceof Error ? e.message : 'Unknown error');
        return;
    }
}

export function scheduleRefresh() {
    if (!isVisible()) {
        state.pendingRefresh = true;
        return;
    }

    state.pendingRefresh = false;

    if (state.isRefreshing) {
        state.storagesUpdatedSinceLastRefresh = true;
        return;
    }

    if (state.refreshTimeout) {
        clearTimeout(state.refreshTimeout);
    }

    state.refreshTimeout = setTimeout(async () => {
        try {
            state.isRefreshing = true;
            state.storagesUpdatedSinceLastRefresh = false;
            await refreshGraph();
        } catch (e) {
            console.error('Error during refresh:', e);
            const errorDiv = document.getElementById('error');
            if (errorDiv) {
                errorDiv.textContent = `Error during refresh: ${e instanceof Error ? e.message : 'Unknown error'}`;
            }
        } finally {
            state.isRefreshing = false;
            state.refreshTimeout = null;

            if (state.storagesUpdatedSinceLastRefresh) {
                setTimeout(() => scheduleRefresh(), state.REFRESH_IMMEDIATE_DELAY);
            }
        }
    }, state.REFRESH_IMMEDIATE_DELAY);
}

export function saveVehicles() {
    const activeVehicles = [];
    if ((document.getElementById('mk15') as HTMLInputElement).checked) activeVehicles.push('mk15');
    const trailer = (document.getElementById('trailer') as HTMLInputElement).value;
    if (trailer) activeVehicles.push(trailer);
    localStorage.setItem('vehicles', JSON.stringify(activeVehicles));
}

async function refreshGraph() {
    const errorDiv = document.getElementById('error') as HTMLDivElement;
    const wrapper = document.querySelector('.graph-wrapper') as HTMLDivElement;
    const graphDiv = document.querySelector('.elk-graph') as HTMLDivElement;
    const useOptimalLoading = (document.getElementById('useOptimalLoading') as HTMLInputElement).checked;
    const useItems = (document.getElementById('useItems') as HTMLInputElement).checked;
    const useInventory = (document.getElementById('useInventory') as HTMLInputElement).checked;
    const useHighestMultiplier = (document.getElementById('useHighestMultiplier') as HTMLInputElement).checked;

    if (state.pinnedNodeId) {
        const pinnedNode = wrapper.querySelector(`.node[data-id="${state.pinnedNodeId}"]`);
        if (pinnedNode) {
            const rect = pinnedNode.getBoundingClientRect();
            const wrapperRect = wrapper.getBoundingClientRect();
            state.pinnedNodePosition = {
                x: rect.left - wrapperRect.left,
                y: rect.top - wrapperRect.top
            };
        }
    }

    const oldWrapper = wrapper.cloneNode(true) as HTMLDivElement;
    wrapper.parentNode!.appendChild(oldWrapper);

    wrapper.style.opacity = '0';

    const savedScale = state.scale;
    const savedTranslateX = state.translateX;
    const savedTranslateY = state.translateY;

    try {
        errorDiv.textContent = '';
        graphDiv.style.visibility = 'hidden';

        const activeStorages = getActiveStoragesCopy(useInventory);

        const availableStorages = state.storages.filter(
            ({ storage }) =>
                storage.priority >= 0 &&
                (storage.type === StorageType.Storage ||
                    (useInventory && storage.type === StorageType.Inventory) ||
                    (storage.type === StorageType.Vehicle &&
                        activeStorages.findIndex(({ storage: { id } }) => storage.id === id) !== -1))
        );

        // Get the selected items from the multi-select
        state.selectedItems = getSelectedItems();
        if (state.selectedItems.length === 0) {
            errorDiv.textContent = 'Please select at least one item';
            wrapper.style.opacity = '1';
            if (oldWrapper && oldWrapper.parentNode) {
                oldWrapper.parentNode.removeChild(oldWrapper);
            }
            return;
        }

        const selectedItemObjects = state.selectedItems.map((item) => ({
            item: ITEMS[item.itemId],
            amount: item.amount
        }));

        const routeData = generateTruckingRoute(
            selectedItemObjects.map((item) => item.item),
            selectedItemObjects.map((item) => item.amount),
            activeStorages.map(({ storage }) => storage.size ?? 0),
            activeStorages.map(({ storage }) => storage.vrpName ?? ''),
            useItems ? availableStorages : [],
            useHighestMultiplier
        );

        const graphResult = generateCraftingGraph(routeData.route, useOptimalLoading);
        const graph = graphResult.graph;
        state.currentRouteData = {
            route: routeData.route,
            resultingUserStorages: routeData.resultingUserStorages,
            graph
        };

        // Update route info in the UI
        document.getElementById('total-cost')!.textContent = '$' + graphResult.info.totalCost.toLocaleString();
        document.getElementById('total-runs')!.textContent = graphResult.info.totalRuns.toLocaleString();
        document.getElementById('total-revenue')!.textContent = '$' + graphResult.info.totalRevenue.toLocaleString();

        graphDiv.innerHTML = '';
        graphDiv.removeAttribute('data-processed');

        renderElkGraph(state.elk, graph, graphDiv)
            .then(() => {
                try {
                    initializeGraph();
                    state.scale = savedScale;
                    state.translateX = savedTranslateX;
                    state.translateY = savedTranslateY;

                    const svg = wrapper.querySelector('svg');
                    if (svg) {
                        wrapper.style.opacity = '1';
                        oldWrapper.style.opacity = '0';
                        graphDiv.style.visibility = 'visible';

                        const newPinnedNode = wrapper.querySelector(`.node[data-id="${state.pinnedNodeId}"]`);
                        if (!newPinnedNode && state.pinnedNodeId) {
                            state.pinnedNodeId = null;
                            state.pinnedNodePosition = null;
                            localStorage.removeItem('pinnedNodeId');
                        }

                        updatePinPanel();

                        if (state.pinnedNodeId) {
                            applyPinnedNodeStyling();

                            if (state.pinnedNodePosition) {
                                const savedPinnedPosition = state.pinnedNodePosition!;
                                const newPinnedNode = wrapper.querySelector(`.node[data-id="${state.pinnedNodeId}"]`);
                                if (newPinnedNode) {
                                    requestAnimationFrame(() => {
                                        const newRect = newPinnedNode.getBoundingClientRect();
                                        const newWrapperRect = wrapper.getBoundingClientRect();
                                        const newPosition = {
                                            x: newRect.left - newWrapperRect.left,
                                            y: newRect.top - newWrapperRect.top
                                        };

                                        const dx = (newPosition.x - savedPinnedPosition.x) / state.scale;
                                        const dy = (newPosition.y - savedPinnedPosition.y) / state.scale;
                                        state.translateX += dx;
                                        state.translateY += dy;
                                        applyTransform();
                                    });
                                } else {
                                    state.pinnedNodeId = null;
                                    state.pinnedNodePosition = null;
                                    localStorage.removeItem('pinnedNodeId');
                                }
                            }
                        } else {
                            const savedPosition = getSavedGraphPosition();
                            if (savedPosition) {
                                state.scale = savedPosition.scale || state.scale;
                                state.translateX = savedPosition.translateX || state.translateX;
                                state.translateY = savedPosition.translateY || state.translateY;
                            }
                        }

                        setTimeout(() => {
                            if (oldWrapper && oldWrapper.parentNode) {
                                oldWrapper.parentNode.removeChild(oldWrapper);
                            }
                        }, 500);
                    }
                } catch (innerError) {
                    console.error('Error in post-render callback:', innerError);
                    wrapper.style.opacity = '1';
                    if (oldWrapper && oldWrapper.parentNode) {
                        oldWrapper.parentNode.removeChild(oldWrapper);
                    }
                }
            })
            .catch((elkError) => {
                console.error('ELK rendering error:', elkError);
                throw new Error('Failed to render graph: ' + (elkError.message || 'Unknown ELK error'));
            });
    } catch (error: any) {
        wrapper.style.opacity = '1';
        if (oldWrapper && oldWrapper.parentNode) {
            oldWrapper.parentNode.removeChild(oldWrapper);
        }
        errorDiv.textContent = `Error: ${error.message}`;
        console.error('Graph refresh error:', error);
        throw error;
    }
}

async function refresh() {
    const apiKey = localStorage.getItem('apiKey');
    const userId = (document.getElementById('userId') as HTMLInputElement).value;
    const errorDiv = document.getElementById('error') as HTMLDivElement;

    if (!apiKey) {
        errorDiv.textContent = 'Please enter and save an API key first';
        return;
    }

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

    try {
        errorDiv.textContent = '';
        // First reload the state.storages
        state.storages = await fetchStorages(state.apiUrl, userId, apiKey, factionId === '-1' ? undefined : factionId);
        localStorage.setItem('storages', JSON.stringify(serializeStorages()));

        state.storagesUpdatedSinceLastRefresh = true;

        // Then refresh the graph
        await refreshGraph();
    } catch (error) {
        errorDiv.textContent = `Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
        console.error(error);
    }
}

(window as any).saveApiKey = saveApiKey;
(window as any).refresh = refresh;

document.addEventListener('DOMContentLoaded', function () {
    fetch('https://science.doggos-tt-apps.workers.dev/', {
        method: 'POST',
        body: 'Trucking Calculator: app loaded'
    }).catch(() => {});

    // Initialize the UI components
    loadStored();
    initializeSubmenuState();
    initializePinPanel();
    updateSelectedItemsList();

    // Schedule initial refresh
    scheduleRefresh();

    setTimeout(() => {
        window.parent.postMessage(
            {
                type: 'getData'
            },
            '*'
        );

        window.parent.postMessage(
            {
                type: 'registerTrigger',
                trigger: 'dtcexecute',
                name: 'DTC Execute'
            },
            '*'
        );

        window.parent.postMessage(
            {
                type: 'registerTrigger',
                trigger: 'dtcdump',
                name: 'DTC Dump'
            },
            '*'
        );

        window.parent.postMessage(
            {
                type: 'registerTrigger',
                trigger: 'dtctake',
                name: 'DTC Take'
            },
            '*'
        );

        window.parent.postMessage(
            {
                type: 'registerTrigger',
                trigger: 'dtccustom',
                name: 'DTC Execute Custom'
            },
            '*'
        );
    }, 250);

    setTimeout(() => {
        state.keybindsEnabled = true;
    }, 2000);
});
