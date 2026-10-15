import state from './state.js';
import { scheduleRefresh } from './index.js';
import { ITEMS } from './calculator/data.js';
import { canProduceItem } from './calculator/utils.js';
import { ItemId } from './calculator/types.js';

export function getSelectedItems() {
    // Return the array of selected items for the calculation
    return state.selectedItems;
}

function addItem() {
    const itemTypeSelect = document.getElementById('itemType') as HTMLInputElement;
    const amountInput = document.getElementById('amount') as HTMLInputElement;

    const itemId = itemTypeSelect.value;
    const amount = parseInt(amountInput.value) || 0;

    if (!itemId || amount <= 0) {
        const errorDiv = document.getElementById('error')!;
        errorDiv.textContent = 'Please select an item and enter a valid amount';
        return;
    }

    // Check if the item already exists in the list
    const existingItemIndex = state.selectedItems.findIndex((item) => item.itemId === itemId);

    if (existingItemIndex !== -1) {
        // If item exists, add to its amount instead of creating a new entry
        state.selectedItems[existingItemIndex].amount += amount;
    } else {
        // Add the item to our selected items array
        state.selectedItems.push({
            itemId: itemId as ItemId,
            amount: amount
        });
    }

    // Save to localStorage
    saveSelectedItems();

    // Update the UI
    updateSelectedItemsList();

    // Clear any error message
    document.getElementById('error')!.textContent = '';

    // Refresh the graph immediately after adding the item
    scheduleRefresh();
}

function removeItem(index: number) {
    // Remove the item at the specified index
    state.selectedItems.splice(index, 1);

    // Save to localStorage
    saveSelectedItems();

    // Update the UI
    updateSelectedItemsList();

    // Schedule a refresh if there are still items
    scheduleRefresh();
}

export function updateSelectedItemsList() {
    const listContainer = document.getElementById('selected-items-list')!;

    // Clear the current list
    listContainer.innerHTML = '';

    if (state.selectedItems.length === 0) {
        // Show a message when no items are selected
        listContainer.innerHTML = '<div class="no-items-message">No items selected. Add an item below.</div>';
        return;
    }

    // Create an entry for each selected item
    state.selectedItems.forEach((item, index) => {
        const itemName = ITEMS[item.itemId].name;
        const isTruckingItem = ITEMS[item.itemId].isTruckingItem;

        const itemEntry = document.createElement('div');
        itemEntry.className = 'item-entry';
        itemEntry.dataset.index = index.toString();

        // Display elements (non-editing mode)
        const nameSpan = document.createElement('span');
        nameSpan.className = isTruckingItem ? 'item-name trucking-item' : 'item-name';
        nameSpan.textContent = itemName;

        const amountSpan = document.createElement('span');
        amountSpan.className = 'item-amount';
        amountSpan.textContent = item.amount.toLocaleString();

        // Edit elements (hidden initially)
        const itemSelect = document.createElement('select');
        itemSelect.className = 'item-name-select';
        itemSelect.innerHTML = Object.entries(ITEMS)
            .filter(([, item]) => canProduceItem(item))
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
        editButton.onclick = () => editItem(index);

        const saveButton = document.createElement('button');
        saveButton.className = 'save-item';
        saveButton.title = 'Save changes';
        saveButton.textContent = '✓';
        saveButton.onclick = () => saveItemEdit(index);

        const cancelButton = document.createElement('button');
        cancelButton.className = 'cancel-edit';
        cancelButton.title = 'Cancel';
        cancelButton.textContent = '✕';
        cancelButton.onclick = () => cancelItemEdit(index);

        const removeButton = document.createElement('button');
        removeButton.className = 'remove-item';
        removeButton.title = 'Remove item';
        removeButton.textContent = '×';
        removeButton.onclick = () => removeItem(index);

        controlsDiv.appendChild(editButton);
        controlsDiv.appendChild(saveButton);
        controlsDiv.appendChild(cancelButton);
        controlsDiv.appendChild(removeButton);

        // Assemble the entry
        itemEntry.appendChild(nameSpan);
        itemEntry.appendChild(amountSpan);
        itemEntry.appendChild(itemSelect);
        itemEntry.appendChild(amountInput);
        itemEntry.appendChild(controlsDiv);

        listContainer.appendChild(itemEntry);
    });
}

function editItem(index: number) {
    const itemEntry = document.querySelector(`.item-entry[data-index="${index}"]`);
    if (itemEntry) {
        itemEntry.classList.add('editing');
    }
}

function saveItemEdit(index: number) {
    const itemEntry = document.querySelector(`.item-entry[data-index="${index}"]`);
    if (!itemEntry) return;

    const itemSelect = itemEntry.querySelector('.item-name-select') as HTMLInputElement;
    const amountInput = itemEntry.querySelector('.item-amount-edit') as HTMLInputElement;

    const newItemId = itemSelect.value;
    const newAmount = parseInt(amountInput.value) || 0;

    if (!newItemId || newAmount <= 0) {
        document.getElementById('error')!.textContent = 'Please select a valid item and enter a valid amount';
        return;
    }

    // Get the existing item
    const oldItemId = state.selectedItems[index].itemId;

    // If item type changed, check if the new item already exists elsewhere
    if (oldItemId !== newItemId) {
        const existingItemIndex = state.selectedItems.findIndex(
            (item) => item.itemId === newItemId && index !== state.selectedItems.indexOf(item)
        );

        if (existingItemIndex !== -1) {
            // If the item exists elsewhere, add to its amount and remove this one
            state.selectedItems[existingItemIndex].amount += newAmount;
            state.selectedItems.splice(index, 1);
        } else {
            // Update this item
            state.selectedItems[index].itemId = newItemId as ItemId;
            state.selectedItems[index].amount = newAmount;
        }
    } else {
        // Just update the amount
        state.selectedItems[index].amount = newAmount;
    }

    // Save to localStorage
    saveSelectedItems();

    // Update the UI
    updateSelectedItemsList();

    // Clear any error message
    document.getElementById('error')!.textContent = '';

    // Refresh the graph
    scheduleRefresh();
}

function cancelItemEdit(index: number) {
    const itemEntry = document.querySelector(`.item-entry[data-index="${index}"]`);
    if (itemEntry) {
        itemEntry.classList.remove('editing');
    }
}

export function saveSelectedItems() {
    localStorage.setItem('selectedItems', JSON.stringify(state.selectedItems));
}

export function loadSelectedItems() {
    try {
        const savedItems = localStorage.getItem('selectedItems');
        if (savedItems) {
            state.selectedItems = JSON.parse(savedItems);

            // Validate the loaded items to ensure they still exist in ITEMS
            state.selectedItems = state.selectedItems.filter(
                (item) => ITEMS[item.itemId] !== undefined && canProduceItem(ITEMS[item.itemId])
            );

            updateSelectedItemsList();
        } else {
            // If no items were previously saved, initialize with default item
            const itemType = (localStorage.getItem('itemType') || state.DEFAULT_ITEM_TYPE) as ItemId;
            const amount = parseInt(localStorage.getItem('amount') ?? '0') || state.DEFAULT_AMOUNT;

            if (ITEMS[itemType] && canProduceItem(ITEMS[itemType])) {
                state.selectedItems = [
                    {
                        itemId: itemType,
                        amount: amount
                    }
                ];

                updateSelectedItemsList();
            }
        }
    } catch (e) {
        console.error('Failed to load selected items:', e);
        state.selectedItems = [];
    }
}

(window as any).addItem = addItem;
(window as any).removeItem = removeItem;
(window as any).editItem = editItem;
(window as any).saveItemEdit = saveItemEdit;
(window as any).cancelItemEdit = cancelItemEdit;
