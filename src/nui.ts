import state from './state.js';
import { log } from './userapp-handler.js';
import { OPEN_STORAGE, TAKE_TO_TRUNK, DUMP_FROM_TRUNK, PUT_ALL, TAKE, ITEMS, LOCATIONS } from './calculator/data.js';
import { Item, ItemId, NormalRecipe, Recipe, RecipeStep, RecipeType, StepType } from './calculator/types.js';
import { getActiveStoragesCopy } from './browser-utils.js';
import { scheduleRefresh } from './index.js';

const USER_CUSTOM_LOCATION = LOCATIONS.find((location) => location.name === 'Custom Recipes');

function generateNuiExecuteActionsData(actions: { item: Item; amount: number; storage: string }[]) {
    const executionActions = [];
    for (const { item, amount, storage } of actions) {
        executionActions.push({
            actions: [
                { action: storage === 'inventory' ? OPEN_STORAGE : TAKE_TO_TRUNK, mod: 0 },
                { action: storage === 'inventory' ? TAKE : storage, mod: 0 },
                { action: item.vrpName, mod: amount === Number.MAX_SAFE_INTEGER ? -1 : 0 }
            ],
            amount: amount === Number.MAX_SAFE_INTEGER ? 0 : amount
        });
    }

    return executionActions;
}

function generateNuiExecuteDumpData(storages: string[]) {
    const executionActions = [];
    for (const storage of storages) {
        executionActions.push({
            actions: [
                { action: storage === 'inventory' ? OPEN_STORAGE : DUMP_FROM_TRUNK, mod: 0 },
                { action: storage === 'inventory' ? PUT_ALL : storage, mod: 0 }
            ],
            amount: 0
        });
    }

    return executionActions;
}

function generateNuiDumpActions() {
    const useInventory = (document.getElementById('useInventory') as HTMLInputElement).checked;
    const dumpStorages = getActiveStoragesCopy(useInventory)
        .filter(({ storage, items }) => {
            const totalWeight = items.reduce((pv, { item, amount }) => pv + item.weight * amount, 0);

            return totalWeight > 0 && storage.vrpName != null;
        })
        .map(({ storage }) => storage.vrpName!);

    const actions = generateNuiExecuteDumpData(dumpStorages);

    return actions;
}

export async function nuiExecute(): Promise<void> {
    console.log('Executing NUI recipe...');
    try {
        const useOptimalLoading = (document.getElementById('useOptimalLoading') as HTMLInputElement).checked;
        const takeMax = (document.getElementById('takeMax') as HTMLInputElement).checked;
        const dumpBeforeExecuting = (document.getElementById('dumpBeforeExecuting') as HTMLInputElement).checked;

        if (!state.pinnedNodeId) {
            console.warn('No recipe pinned. Please pin a recipe first.');
            log('~r~[DTC]~w~ No recipe pinned. Please pin a recipe first.');
            return;
        }

        if (!state.currentRouteData || !state.currentRouteData.route) {
            console.warn('No route data or pinned node available.');
            log('~r~[DTC]~w~ No route data or pinned node available.');
            return;
        }

        // Find the pinned node data from the state.currentRouteData.graph
        const pinnedNodeData = state.currentRouteData.graph.nodes.find((node) => node.id === state.pinnedNodeId);

        if (!pinnedNodeData) {
            console.warn('Pinned node not found in current graph data or is unsupported.');
            log('~r~[DTC]~w~ Pinned node not found in current graph data or is unsupported.');
            return;
        }

        const solution = pinnedNodeData.data.steps.find((step) => step.solution.type === StepType.Recipe)!
            .solution as RecipeStep;
        const useOptimal =
            solution.optimalProcessingRecipesPerRun === solution.maxLoadRecipesPerRun ? true : useOptimalLoading;
        const recipeItems = takeMax
            ? solution[useOptimal ? 'optimalProcessingIngredientsPerRun' : 'maxLoadIngredientsPerRun']
            : pinnedNodeData.ingredientsPerRun;

        const executionData = [];

        for (const recipeItem of recipeItems) {
            for (const index in recipeItem.amounts) {
                const amount = recipeItem.amounts[index];
                const storage = recipeItem.vrpNames[index];
                const item = recipeItem.item;

                if (item.name === 'Logs') continue;

                if (amount === 0) continue;

                if (storage == null) {
                    console.warn(`Missing vrp name for storage at index ${index}`);
                    continue;
                }

                executionData.push({ item, amount, storage });
            }
        }

        const actions = [
            ...(dumpBeforeExecuting ? generateNuiDumpActions() : []),
            ...generateNuiExecuteActionsData(executionData)
        ];

        if (!actions || actions.length === 0) {
            log('~r~[DTC]~w~ No valid actions to execute.');
            return;
        }

        // Execute the actions via NUI
        if (await executeActions(actions, true)) {
            log('~r~[DTC]~w~ Successfully executed actions.');
        }
    } catch (e: any) {
        log(`~r~[DTC]~w~ Error: ${e?.message ?? e}`);
        console.error('Error in trigger_dtcexecute:', e);
    }
}

export async function nuiDump() {
    console.log('Executing NUI dump...');
    try {
        const actions = generateNuiDumpActions();

        if (!actions || actions.length === 0) {
            log('~r~[DTC]~w~ No valid actions to execute.');
            return;
        }

        // Execute the actions via NUI
        if (await executeActions(actions, true)) {
            log('~r~[DTC]~w~ Successfully executed dump actions.');
        }
    } catch (e: any) {
        log(`~r~[DTC]~w~ Error: ${e?.message ?? e}`);
        console.error('Error in trigger_dtcexecute:', e);
    }
}

export async function nuiTake() {
    console.log('Executing NUI take...');
    try {
        const truckingItemToTake = (document.getElementById('truckingItemToTake') as HTMLInputElement).value;
        const dumpBeforeExecuting = (document.getElementById('dumpBeforeExecuting') as HTMLInputElement).checked;

        if (!truckingItemToTake || !ITEMS[truckingItemToTake as ItemId]) {
            log('~r~[DTC]~w~ No item selected. Please select an item to take first.');
            return;
        }

        const item = ITEMS[truckingItemToTake as ItemId];

        const useInventory = (document.getElementById('useInventory') as HTMLInputElement).checked;
        const storages = getActiveStoragesCopy(useInventory).filter(({ storage }) => storage.vrpName != null);

        if (!storages || storages.length === 0) {
            log('~r~[DTC]~w~ No valid vehicle storages found.');
            return;
        }

        const executionData = [];

        for (const storage of storages) {
            executionData.push({ item, amount: Number.MAX_SAFE_INTEGER, storage: storage.storage.vrpName! });
        }

        const actions = [
            ...(dumpBeforeExecuting ? generateNuiDumpActions() : []),
            ...generateNuiExecuteActionsData(executionData)
        ];

        if (actions.length === 0) {
            log('~r~[DTC]~w~ No valid actions to execute.');
            return;
        }

        // Execute the actions via NUI
        if (await executeActions(actions, true)) {
            log(`~r~[DTC]~w~ Successfully took ${item.name} into trunks.`);
        }
    } catch (e: any) {
        log(`~r~[DTC]~w~ Error: ${e?.message ?? e}`);
        console.error('Error in nuiTake:', e);
    }
}

export async function nuiSetAutoRecipe() {
    try {
        const autoRecipe = (document.getElementById('autoRecipe') as HTMLInputElement).checked;
        const useHighestMultiplier = (document.getElementById('useHighestMultiplier') as HTMLInputElement).checked;

        let path: string[] = [];

        while (autoRecipe) {
            try {
                if (!state.pinnedNodeId) {
                    console.log('No recipe pinned.');
                    break;
                }

                if (!state.currentRouteData || !state.currentRouteData.route) {
                    console.warn('No route data or pinned node available.');
                    break;
                }

                // Find the pinned node data from the state.currentRouteData.graph
                const pinnedNodeData = state.currentRouteData.graph.nodes.find(
                    (node) => node.id === state.pinnedNodeId
                );

                if (!pinnedNodeData) {
                    console.warn('Pinned node not found in current graph data or is unsupported.');
                    break;
                }

                const recipe = (
                    pinnedNodeData.data.steps.find((step) => step?.solution?.type === StepType.Recipe)
                        ?.solution as RecipeStep
                )?.recipe;

                if (!recipe) {
                    console.warn(`Could not find recipe to fetch path for: `, pinnedNodeData.id);
                    break;
                }

                path = useHighestMultiplier ? recipe.highestMultiplierPath : recipe.path;
                break;
            } catch (e) {
                console.warn(`Error while finding recipe path: `, e);
            } finally {
                break;
            }
        }

        // Execute the actions via NUI
        await setAutoRecipe(path);
    } catch (e: any) {
        log(`~r~[DTC]~w~ Error: ${e?.message ?? e}`);
        console.error('Error while setting auto recipe:', e);
    }
}

export async function nuiCustom() {
    console.log('Executing NUI custom...');
    try {
        const dumpBeforeExecuting = (document.getElementById('dumpBeforeExecuting') as HTMLInputElement).checked;
        const useInventory = (document.getElementById('useInventory') as HTMLInputElement).checked;

        if (!state.customRecipeIngredients || state.customRecipeIngredients.length === 0) {
            log('~r~[DTC]~w~ No items selected for custom recipe.');
            return;
        }

        const storages = getActiveStoragesCopy(useInventory).filter(({ storage }) => storage.vrpName != null);

        if (!storages || storages.length === 0) {
            log('~r~[DTC]~w~ No valid vehicle storages found.');
            return;
        }

        const executionData = [];

        const itemsToTake = state.customRecipeIngredients
            .map(({ itemId, amount }) => {
                const item = ITEMS[itemId];
                if (!item) return null;

                return {
                    item,
                    amount
                };
            })
            .filter((v) => v != null);
        const batchWeight = itemsToTake.reduce((pv, { item, amount }) => pv + item.weight * amount, 0);

        // Add execution data for each storage
        for (const storage of storages) {
            const batches = Math.floor(storage.storage.size! / batchWeight);
            if (batches > 0) {
                for (const { item, amount } of itemsToTake) {
                    executionData.push({
                        item,
                        amount: Math.round(batches * amount),
                        storage: storage.storage.vrpName!
                    });
                }
            } else {
                console.warn(`Not enough space in ${storage.storage.vrpName} for custom recipe.`);
            }
        }

        const actions = [
            ...(dumpBeforeExecuting ? generateNuiDumpActions() : []),
            ...generateNuiExecuteActionsData(executionData)
        ];

        if (actions.length === 0) {
            log('~r~[DTC]~w~ No valid actions to execute.');
            return;
        }

        // Execute the actions via NUI
        if (await executeActions(actions, true)) {
            log('~r~[DTC]~w~ Successfully executed custom recipe actions.');
        }
    } catch (e: any) {
        log(`~r~[DTC]~w~ Error: ${e?.message ?? e}`);
        console.error('Error in nuiCustom:', e);
    }
}

export async function nuiCloseMenu(force = false) {
    if (state.executingNuiActions && !force) return;
    console.log('Closing NUI menu');
    window.parent.postMessage({ type: 'forceMenuBack' }, '*');
    await sleep(state.NUI_EXTRA_DELAY);
}

function sleepUntil(check: Function, retries: number, timeout: number, error: any = null) {
    return new Promise(async (resolve, reject) => {
        while (check() === false) {
            if (retries-- <= 0) {
                return reject(error);
            }
            await sleep(timeout);
        }

        await sleep(state.NUI_EXTRA_DELAY);
        resolve(true);
    });
}

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function submitPrompt(value: string | number) {
    console.log(`Submitting prompt value: ${value}`);
    let retries = state.NUI_RETRIES;
    while (retries-- > 0) {
        window.parent.postMessage({ type: 'forceSubmitValue', value: value.toString() }, '*');
        await sleep(state.NUI_EXTRA_DELAY);
        if (!state.cache.prompt) {
            return;
        }
    }
}

async function submitMenu(choice: string, mod = 0) {
    const previousMenu = state.cache.menu;
    const previousMenuOpen = state.cache.menu_open;
    const previousPrompt = state.cache.prompt;
    const previousMenuChoices = JSON.stringify(state.cache.menu_choices);
    console.log(`Submitting menu choice: ${choice}, mod: ${mod}`);
    window.parent.postMessage({ type: 'forceMenuChoice', choice, mod }, '*');
    // Wait until the menu or choices or title change, indicating the menu has been updated
    try {
        if (choice.replace(/(<.+?>)|(&#.+?;)/g, '') === PUT_ALL) {
            // If PUT_ALL is selected, we return early as there is no way to detect if the menu has been updated
            await sleep(100);
            return;
        }
        await sleepUntil(
            () =>
                previousMenu !== state.cache.menu ||
                previousMenuOpen !== state.cache.menu_open ||
                previousPrompt !== state.cache.prompt ||
                previousMenuChoices !== JSON.stringify(state.cache.menu_choices),
            state.NUI_SUBMIT_RETRIES,
            state.NUI_SUBMIT_TIMEOUT
        );
        return;
    } catch {
        console.warn('Menu submission check timed out, continuing...');
    }
}

async function executeActions(
    executionActions: { actions: { action: string; mod: number }[]; amount: number }[],
    autoCloseMenu = true
) {
    try {
        if (state.executingNuiActions) {
            throw new Error('Already executing NUI actions');
        }
        state.executingNuiActions = true;
        const { NUI_RETRIES, NUI_TIMEOUT, NUI_EXTRA_DELAY, cache } = state;

        for (const { actions, amount } of executionActions) {
            for (const { action, mod } of actions) {
                await sleepUntil(
                    () =>
                        cache.menu_open &&
                        (cache.menu_choices ?? []).findIndex(
                            (a: [string, string]) => (a ?? [])[0]?.replace(/(<.+?>)|(&#.+?;)/g, '') === action
                        ) !== -1,
                    NUI_RETRIES,
                    NUI_TIMEOUT,
                    `Could not find option '${action}' in menu, exiting...`
                );

                const option = cache.menu_choices.find(
                    (a: [string, string]) => a[0].replace(/(<.+?>)|(&#.+?;)/g, '') === action
                )[0];

                await submitMenu(option, mod);
            }

            // Take item amount menu
            if (amount > 0) {
                await sleepUntil(
                    () => cache.prompt === true,
                    NUI_RETRIES,
                    NUI_TIMEOUT,
                    'Could not find prompt, exiting...'
                );

                await submitPrompt(amount);
            }

            await sleep(NUI_EXTRA_DELAY);

            if (autoCloseMenu && cache.menu_open) await nuiCloseMenu(true);
        }

        await sleep(NUI_TIMEOUT);

        if (autoCloseMenu && cache.menu_open) await nuiCloseMenu(true);
    } catch (e: any) {
        log(`~r~[DTC]~w~ Error: ${e?.message ?? e}`);
        console.error('Error in executeActions:', e);
        return false;
    } finally {
        state.executingNuiActions = false;
    }

    return true;
}

async function setAutoRecipe(path: string[]) {
    if (state.autoRecipeInterval) {
        clearInterval(state.autoRecipeInterval);
        state.autoRecipeInterval = null;
    }

    state.autoRecipeInterval = setInterval(async () => {
        if (state.executingNuiAutoRecipe) return;
        state.executingNuiAutoRecipe = true;
        try {
            if (
                path.length > 0 &&
                state.cache.menu_open &&
                (state.cache.menu_choices ?? []).findIndex(
                    (a: [string, string]) => (a ?? [])[0]?.replace(/(<.+?>)|(&#.+?;)/g, '') === path[0]
                ) !== -1
            ) {
                await executeActions(
                    [
                        {
                            actions: path.map((action) => ({ action, mod: 0 })),
                            amount: 0
                        }
                    ],
                    false
                );
            }
        } finally {
            state.executingNuiAutoRecipe = false;
        }
    }, state.NUI_AUTO_RECIPE_INTERVAL);
}

export function addCustomRecipeIngredient() {
    const itemTypeSelect = document.getElementById('custom-recipe-ingredient-type') as HTMLInputElement;
    const amountInput = document.getElementById('custom-recipe-ingredient-amount') as HTMLInputElement;

    const itemId = itemTypeSelect.value;
    const amount = parseInt(amountInput.value) || 0;

    if (!itemId || amount <= 0) {
        log('~r~[DTC]~w~ Please select an item and enter a valid amount');
        return;
    }

    // Check if the item already exists in the list
    const existingItemIndex = state.customRecipeIngredients.findIndex((item) => item.itemId === itemId);

    if (existingItemIndex !== -1) {
        // If item exists, add to its amount
        state.customRecipeIngredients[existingItemIndex].amount += amount;
    } else {
        // Add new item
        state.customRecipeIngredients.push({
            itemId: itemId as ItemId,
            amount: amount
        });
    }

    // Save to localStorage
    localStorage.setItem('customRecipeIngredients', JSON.stringify(state.customRecipeIngredients));

    // Update the UI
    updateCustomRecipeIngredients();
}

export function removeCustomRecipeIngredient(index: number) {
    state.customRecipeIngredients.splice(index, 1);
    localStorage.setItem('customRecipeIngredients', JSON.stringify(state.customRecipeIngredients));
    updateCustomRecipeIngredients();
}

export function updateCustomRecipeIngredients() {
    const listContainer = document.getElementById('custom-recipe-ingredients-list')!;
    listContainer.innerHTML = '';

    if (state.customRecipeIngredients.length === 0) {
        listContainer.innerHTML =
            '<div class="no-items-message">No ingredients for custom recipe. Add ingredients below.</div>';
        return;
    }

    state.customRecipeIngredients.forEach((item, index) => {
        const itemName = ITEMS[item.itemId].name;
        const itemEntry = document.createElement('div');
        itemEntry.className = 'custom-recipe-ingredient-entry';
        itemEntry.dataset.index = index.toString();

        // Display elements (non-editing mode)
        const nameSpan = document.createElement('span');
        nameSpan.className = 'item-name';
        nameSpan.textContent = itemName;

        const amountSpan = document.createElement('span');
        amountSpan.className = 'item-amount';
        amountSpan.textContent = item.amount.toLocaleString();

        // Edit elements (hidden initially)
        const itemSelect = document.createElement('select');
        itemSelect.className = 'item-name-select';
        itemSelect.innerHTML = Object.entries(ITEMS)
            .sort(([, a], [, b]) => a.name.localeCompare(b.name))
            .map(([id, item]) => `<option value="${id}">${item.name}</option>`)
            .join('');
        itemSelect.value = item.itemId;

        const amountInput = document.createElement('input');
        amountInput.type = 'number';
        amountInput.min = '1';
        amountInput.className = 'item-amount-edit';
        amountInput.value = item.amount.toString();

        // Control buttons
        const controlsDiv = document.createElement('div');
        controlsDiv.className = 'item-controls';

        const editButton = document.createElement('button');
        editButton.className = 'edit-item';
        editButton.title = 'Edit item';
        editButton.textContent = '✎';
        editButton.onclick = () => editCustomRecipeIngredient(index);

        const saveButton = document.createElement('button');
        saveButton.className = 'save-item';
        saveButton.title = 'Save changes';
        saveButton.textContent = '✓';
        saveButton.onclick = () => saveCustomRecipeIngredientEdit(index);

        const cancelButton = document.createElement('button');
        cancelButton.className = 'cancel-edit';
        cancelButton.title = 'Cancel';
        cancelButton.textContent = '✕';
        cancelButton.onclick = () => cancelCustomRecipeIngredientEdit(index);

        const removeButton = document.createElement('button');
        removeButton.className = 'remove-item';
        removeButton.title = 'Remove item';
        removeButton.textContent = '×';
        removeButton.onclick = () => removeCustomRecipeIngredient(index);

        controlsDiv.appendChild(editButton);
        controlsDiv.appendChild(saveButton);
        controlsDiv.appendChild(cancelButton);
        controlsDiv.appendChild(removeButton);

        itemEntry.appendChild(nameSpan);
        itemEntry.appendChild(amountSpan);
        itemEntry.appendChild(itemSelect);
        itemEntry.appendChild(amountInput);
        itemEntry.appendChild(controlsDiv);

        listContainer.appendChild(itemEntry);
    });
}

function editCustomRecipeIngredient(index: number) {
    const itemEntry = document.querySelector(`.custom-recipe-ingredient-entry[data-index="${index}"]`);
    if (itemEntry) {
        itemEntry.classList.add('editing');
    }
}

function saveCustomRecipeIngredientEdit(index: number) {
    const itemEntry = document.querySelector(`.custom-recipe-ingredient-entry[data-index="${index}"]`);
    if (!itemEntry) return;

    const itemSelect = itemEntry.querySelector('.item-name-select') as HTMLInputElement;
    const amountInput = itemEntry.querySelector('.item-amount-edit') as HTMLInputElement;

    const newItemId = itemSelect.value;
    const newAmount = parseInt(amountInput.value) || 0;

    if (!newItemId || newAmount <= 0) {
        log('~r~[DTC]~w~ Please select a valid item and enter a valid amount');
        return;
    }

    // Get the existing item
    const oldItemId = state.customRecipeIngredients[index].itemId;

    // If item type changed, check if the new item already exists elsewhere
    if (oldItemId !== newItemId) {
        const existingItemIndex = state.customRecipeIngredients.findIndex(
            (item) => item.itemId === newItemId && index !== state.customRecipeIngredients.indexOf(item)
        );

        if (existingItemIndex !== -1) {
            // If the item exists elsewhere, add to its amount and remove this one
            state.customRecipeIngredients[existingItemIndex].amount += newAmount;
            state.customRecipeIngredients.splice(index, 1);
        } else {
            // Update this item
            state.customRecipeIngredients[index].itemId = newItemId as ItemId;
            state.customRecipeIngredients[index].amount = newAmount;
        }
    } else {
        // Just update the amount
        state.customRecipeIngredients[index].amount = newAmount;
    }

    // Save to localStorage
    localStorage.setItem('customRecipeIngredients', JSON.stringify(state.customRecipeIngredients));

    // Update the UI
    updateCustomRecipeIngredients();
}

function cancelCustomRecipeIngredientEdit(index: number) {
    const itemEntry = document.querySelector(`.custom-recipe-ingredient-entry[data-index="${index}"]`);
    if (itemEntry) {
        itemEntry.classList.remove('editing');
    }
}

export function loadSavedCustomRecipes() {
    // Initialize item selectors
    initializeCustomRecipeItemSelectors();

    // Load selected items
    try {
        const savedIngredients = localStorage.getItem('customRecipeIngredients');
        if (savedIngredients) {
            state.customRecipeIngredients = JSON.parse(savedIngredients);
            updateCustomRecipeIngredients();
        }

        const savedProducts = localStorage.getItem('customRecipeProducts');
        if (savedProducts) {
            state.customRecipeProducts = JSON.parse(savedProducts);
            updateCustomRecipeProducts();
        }
    } catch (e) {
        console.error('Failed to load saved NUI items:', e);
        state.customRecipeIngredients = [];
        state.customRecipeProducts = [];
    }

    // Load custom recipes
    try {
        const customLocation = LOCATIONS.find((loc) => loc.name === 'Custom Recipes');
        if (customLocation) {
            const savedRecipes = JSON.parse(localStorage.getItem('customRecipes') ?? '[]');
            customLocation.recipes = savedRecipes.map(
                (recipe: {
                    name: string;
                    ingredients: { itemId: ItemId; amount: number }[];
                    products: { itemId: ItemId; amount: number }[];
                    type: RecipeType;
                }) => ({
                    name: recipe.name,
                    cost: 0,
                    ingredients: recipe.ingredients.map((ing) => ({
                        item: ITEMS[ing.itemId],
                        amount: ing.amount
                    })),
                    products: recipe.products.map((prod) => ({
                        item: ITEMS[prod.itemId],
                        amount: prod.amount
                    })),
                    priority: 100,
                    type: recipe.type,
                    path: [] as string[],
                    highestMultiplier: 1,
                    highestMultiplierPath: [] as string[],
                    location: 'Custom Recipes'
                })
            );
        }
    } catch (e) {
        console.error('Failed to load custom recipes:', e);
    }
}

function initializeCustomRecipeItemSelectors() {
    const customRecipeIngredientTypeList = document.getElementById('custom-recipe-ingredient-type');
    const customRecipeProductTypeList = document.getElementById('custom-recipe-product-type');
    if (!customRecipeIngredientTypeList || !customRecipeProductTypeList) return;

    customRecipeIngredientTypeList.innerHTML = Object.entries(ITEMS)
        .sort(([, a], [, b]) => a.name.localeCompare(b.name))
        .map(([id, item]) => `<option value="${id}">${item.name}</option>`)
        .join('');

    customRecipeProductTypeList.innerHTML = customRecipeIngredientTypeList.innerHTML;

    const customRecipeIngredientAmount = localStorage.getItem('custom-recipe-ingredient-amount');
    if (customRecipeIngredientAmount) {
        (document.getElementById('custom-recipe-ingredient-amount') as HTMLInputElement).value =
            customRecipeIngredientAmount;
    }

    const customRecipeIngredientType = localStorage.getItem('custom-recipe-ingredient-type');
    if (customRecipeIngredientType && Object.hasOwn(ITEMS, customRecipeIngredientType)) {
        (document.getElementById('custom-recipe-ingredient-type') as HTMLInputElement).value =
            customRecipeIngredientType;
    }

    const customRecipeProductAmount = localStorage.getItem('custom-recipe-product-amount');
    if (customRecipeProductAmount) {
        (document.getElementById('custom-recipe-product-amount') as HTMLInputElement).value = customRecipeProductAmount;
    }

    const customRecipeProductType = localStorage.getItem('custom-recipe-product-type');
    if (customRecipeProductType && Object.hasOwn(ITEMS, customRecipeProductType)) {
        (document.getElementById('custom-recipe-product-type') as HTMLInputElement).value = customRecipeProductType;
    }
}

export function addCustomRecipeProduct() {
    const itemTypeSelect = document.getElementById('custom-recipe-product-type') as HTMLInputElement;
    const amountInput = document.getElementById('custom-recipe-product-amount') as HTMLInputElement;

    const itemId = itemTypeSelect.value;
    const amount = parseInt(amountInput.value) || 0;

    if (!itemId || amount <= 0) {
        log('~r~[DTC]~w~ Please select an item and enter a valid amount');
        return;
    }

    // Check if the item already exists in the list
    const existingItemIndex = state.customRecipeProducts.findIndex((item) => item.itemId === itemId);

    if (existingItemIndex !== -1) {
        // If item exists, add to its amount
        state.customRecipeProducts[existingItemIndex].amount += amount;
    } else {
        // Add new item
        state.customRecipeProducts.push({
            itemId: itemId as ItemId,
            amount: amount
        });
    }

    // Save to localStorage
    localStorage.setItem('customRecipeProducts', JSON.stringify(state.customRecipeProducts));

    // Update the UI
    updateCustomRecipeProducts();
}

export function removeCustomRecipeProduct(index: number) {
    state.customRecipeProducts.splice(index, 1);
    localStorage.setItem('customRecipeProducts', JSON.stringify(state.customRecipeProducts));
    updateCustomRecipeProducts();
}

export function updateCustomRecipeProducts() {
    const listContainer = document.getElementById('custom-recipe-products-list')!;
    listContainer.innerHTML = '';

    if (state.customRecipeProducts.length === 0) {
        listContainer.innerHTML =
            '<div class="no-items-message">No products for custom recipe. Add products below.</div>';
        return;
    }

    state.customRecipeProducts.forEach((item, index) => {
        const itemName = ITEMS[item.itemId].name;
        const itemEntry = document.createElement('div');
        itemEntry.className = 'custom-recipe-product-entry';
        itemEntry.dataset.index = index.toString();

        // Display elements (non-editing mode)
        const nameSpan = document.createElement('span');
        nameSpan.className = 'item-name';
        nameSpan.textContent = itemName;

        const amountSpan = document.createElement('span');
        amountSpan.className = 'item-amount';
        amountSpan.textContent = item.amount.toLocaleString();

        // Edit elements (hidden initially)
        const itemSelect = document.createElement('select');
        itemSelect.className = 'item-name-select';
        itemSelect.innerHTML = Object.entries(ITEMS)
            .sort(([, a], [, b]) => a.name.localeCompare(b.name))
            .map(([id, item]) => `<option value="${id}">${item.name}</option>`)
            .join('');
        itemSelect.value = item.itemId;

        const amountInput = document.createElement('input');
        amountInput.type = 'number';
        amountInput.min = '1';
        amountInput.className = 'item-amount-edit';
        amountInput.value = item.amount.toString();

        // Control buttons
        const controlsDiv = document.createElement('div');
        controlsDiv.className = 'item-controls';

        const editButton = document.createElement('button');
        editButton.className = 'edit-item';
        editButton.title = 'Edit item';
        editButton.textContent = '✎';
        editButton.onclick = () => editCustomRecipeProduct(index);

        const saveButton = document.createElement('button');
        saveButton.className = 'save-item';
        saveButton.title = 'Save changes';
        saveButton.textContent = '✓';
        saveButton.onclick = () => saveCustomRecipeProductEdit(index);

        const cancelButton = document.createElement('button');
        cancelButton.className = 'cancel-edit';
        cancelButton.title = 'Cancel';
        cancelButton.textContent = '✕';
        cancelButton.onclick = () => cancelCustomRecipeProductEdit(index);

        const removeButton = document.createElement('button');
        removeButton.className = 'remove-item';
        removeButton.title = 'Remove item';
        removeButton.textContent = '×';
        removeButton.onclick = () => removeCustomRecipeProduct(index);

        controlsDiv.appendChild(editButton);
        controlsDiv.appendChild(saveButton);
        controlsDiv.appendChild(cancelButton);
        controlsDiv.appendChild(removeButton);

        itemEntry.appendChild(nameSpan);
        itemEntry.appendChild(amountSpan);
        itemEntry.appendChild(itemSelect);
        itemEntry.appendChild(amountInput);
        itemEntry.appendChild(controlsDiv);

        listContainer.appendChild(itemEntry);
    });
}

function editCustomRecipeProduct(index: number) {
    const itemEntry = document.querySelector(`.custom-recipe-product-entry[data-index="${index}"]`);
    if (itemEntry) {
        itemEntry.classList.add('editing');
    }
}

function saveCustomRecipeProductEdit(index: number) {
    const itemEntry = document.querySelector(`.custom-recipe-product-entry[data-index="${index}"]`);
    if (!itemEntry) return;

    const itemSelect = itemEntry.querySelector('.item-name-select') as HTMLInputElement;
    const amountInput = itemEntry.querySelector('.item-amount-edit') as HTMLInputElement;

    const newItemId = itemSelect.value;
    const newAmount = parseInt(amountInput.value) || 0;

    if (!newItemId || newAmount <= 0) {
        log('~r~[DTC]~w~ Please select a valid item and enter a valid amount');
        return;
    }

    // Get the existing item
    const oldItemId = state.customRecipeProducts[index].itemId;

    // If item type changed, check if the new item already exists elsewhere
    if (oldItemId !== newItemId) {
        const existingItemIndex = state.customRecipeProducts.findIndex(
            (item) => item.itemId === newItemId && index !== state.customRecipeProducts.indexOf(item)
        );

        if (existingItemIndex !== -1) {
            // If the item exists elsewhere, add to its amount and remove this one
            state.customRecipeProducts[existingItemIndex].amount += newAmount;
            state.customRecipeProducts.splice(index, 1);
        } else {
            // Update this item
            state.customRecipeProducts[index].itemId = newItemId as ItemId;
            state.customRecipeProducts[index].amount = newAmount;
        }
    } else {
        // Just update the amount
        state.customRecipeProducts[index].amount = newAmount;
    }

    // Save to localStorage
    localStorage.setItem('customRecipeProducts', JSON.stringify(state.customRecipeProducts));

    // Update the UI
    updateCustomRecipeProducts();
}

function cancelCustomRecipeProductEdit(index: number) {
    const itemEntry = document.querySelector(`.custom-recipe-product-entry[data-index="${index}"]`);
    if (itemEntry) {
        itemEntry.classList.remove('editing');
    }
}

export function saveCustomRecipes() {
    const customRecipes = (USER_CUSTOM_LOCATION!.recipes as NormalRecipe[]).map((recipe) => ({
        name: recipe.name,
        ingredients: recipe.ingredients.map((ing) => ({
            itemId: Object.entries(ITEMS).find(([, item]) => item === ing.item)![0],
            amount: ing.amount
        })),
        products: recipe.products.map((prod) => ({
            itemId: Object.entries(ITEMS).find(([, item]) => item === prod.item)![0],
            amount: prod.amount
        })),
        type: recipe.type
    }));
    localStorage.setItem('customRecipes', JSON.stringify(customRecipes));
}

export async function createCustomRecipe() {
    try {
        if (!state.customRecipeIngredients || !state.customRecipeProducts) {
            console.log('No items selected for custom recipe.');
            log('~r~[DTC]~w~ No items selected for custom recipe.');
            return;
        }

        let lowestNumber = 1;
        for (const recipe of USER_CUSTOM_LOCATION!.recipes) {
            const match = recipe.name.match(/(\d+)$/);
            if (match && match[1]) {
                const num = parseInt(match[1]);
                if (!isNaN(num) && num >= lowestNumber) {
                    lowestNumber = num + 1;
                }
            }
        }

        const ingredients = state.customRecipeIngredients.map(({ itemId, amount }) => ({
            item: ITEMS[itemId],
            amount: amount
        }));

        const products = state.customRecipeProducts.map(({ itemId, amount }) => ({
            item: ITEMS[itemId],
            amount: amount
        }));

        if (ingredients.length === 0 && products.length === 0) {
            console.log('Cannot create a recipe with no ingredients and no products.');
            log('~r~[DTC]~w~ Cannot create a recipe with no ingredients and no products.');
            return;
        }

        const recipe: Recipe = {
            name: `Custom Recipe ${lowestNumber}`,
            cost: 0,
            ingredients,
            products,
            priority: 100,
            type: RecipeType.Recipe,
            path: [],
            highestMultiplier: 1,
            highestMultiplierPath: [],
            location: 'Custom Recipes'
        };

        USER_CUSTOM_LOCATION!.recipes.push(recipe);

        // Save custom recipes to localStorage
        saveCustomRecipes();

        console.log(`Created custom recipe: `, recipe);
        scheduleRefresh();
    } catch (e: any) {
        log(`~r~[DTC]~w~ Error: ${e?.message ?? e}`);
        console.error('Error in createCustomRecipe:', e);
    }
}

(window as any).nuiTake = nuiTake;
(window as any).nuiDump = nuiDump;
(window as any).nuiExecute = nuiExecute;
(window as any).nuiCustom = nuiCustom;

(window as any).addCustomRecipeIngredient = addCustomRecipeIngredient;
(window as any).removeCustomRecipeIngredient = removeCustomRecipeIngredient;
(window as any).editCustomRecipeIngredient = editCustomRecipeIngredient;
(window as any).saveCustomRecipeIngredientEdit = saveCustomRecipeIngredientEdit;
(window as any).cancelCustomRecipeIngredientEdit = cancelCustomRecipeIngredientEdit;

(window as any).addCustomRecipeProduct = addCustomRecipeProduct;
(window as any).removeCustomRecipeProduct = removeCustomRecipeProduct;
(window as any).editCustomRecipeProduct = editCustomRecipeProduct;
(window as any).saveCustomRecipeProductEdit = saveCustomRecipeProductEdit;
(window as any).cancelCustomRecipeProductEdit = cancelCustomRecipeProductEdit;

(window as any).createCustomRecipe = createCustomRecipe;
