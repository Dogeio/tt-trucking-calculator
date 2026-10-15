import state from './state.js';
import { DEFAULT_STORAGE_PRIORITY } from './calculator/data.js';
import { loadStoragePriorities, saveStoragePriorities } from './storage.js';
import { UserStorage } from './calculator/types.js';

function generateStorageList() {
    const storageList = document.getElementById('storage-list')!;
    storageList.innerHTML = '';

    if (state.storages.length === 0) {
        storageList.innerHTML =
            '<div class="no-storages">No storages found. Please make sure you have entered your API key and refreshed your data.</div>';
        return;
    }

    // Load storage priorities before generating the list
    loadStoragePriorities();

    // Sort all storages by priority (highest first), then by number of items
    const sortedStorages = ([...state.storages] as Array<UserStorage & { priority: number }>).sort((a, b) => {
        // Sort by priority first (higher priority comes first)
        const priorityDiff = (b.priority ?? DEFAULT_STORAGE_PRIORITY) - (a.priority ?? DEFAULT_STORAGE_PRIORITY);
        if (priorityDiff !== 0) return priorityDiff;

        // Then by number of items
        return b.items.length - a.items.length;
    });

    sortedStorages.forEach((storage) => {
        const storageGroup = document.createElement('div');
        storageGroup.className = 'storage-group';
        const storageId = storage.storage.id;

        const storageHeader = document.createElement('div');
        storageHeader.className = 'storage-header';

        // Create type badge
        const typeBadge = document.createElement('span');
        typeBadge.className = `storage-type-badge badge-${storage.storage.type.toLowerCase()}`;
        typeBadge.textContent = storage.storage.type.charAt(0).toUpperCase() + storage.storage.type.slice(1);

        storageHeader.innerHTML = `
            <span style="color: white;">${storage.storage.name} ${`(${storage.items.length} items)`}</span>
            <span class="storage-toggle">▼</span>
        `;
        storageHeader.insertBefore(typeBadge, storageHeader.firstChild!.nextSibling);

        storageHeader.addEventListener('click', () => {
            const contentDiv = storageGroup.querySelector('.storage-content')!;
            const toggle = storageHeader.querySelector('.storage-toggle')!;
            contentDiv.classList.toggle('collapsed');
            toggle.classList.toggle('collapsed');
        });

        const storageContent = document.createElement('div');
        storageContent.className = 'storage-content';

        // Add priority controls section
        const priorityControls = document.createElement('div');
        priorityControls.className = 'storage-priority-section';
        priorityControls.innerHTML = `
			<div class="priority-label">Priority:</div>
			<div class="priority-controls">
				<button onclick="changeStoragePriority('${storageId}', -1)">-</button>
				<input type="number" value="${storage.storage.priority ?? DEFAULT_STORAGE_PRIORITY}" 
					onchange="updateStoragePriority('${storageId}', this.value)" 
					id="storage-priority-${storageId}" />
				<button onclick="changeStoragePriority('${storageId}', 1)">+</button>
			</div>
			<button class="reset-storage" title="Reset to default priority" onclick="resetStoragePriority('${storageId}')">
				Reset (${storage.storage.defaultPriority ?? DEFAULT_STORAGE_PRIORITY})
			</button>
		`;

        storageContent.appendChild(priorityControls);

        if (storage.items.length === 0) {
            const emptyMsg = document.createElement('div');
            emptyMsg.className = 'storage-empty';
            emptyMsg.textContent = 'This storage is empty.';
            storageContent.appendChild(emptyMsg);
        } else {
            // Create table for items
            const table = document.createElement('table');
            table.className = 'storage-table';

            // Table body
            const tbody = document.createElement('tbody');

            const sortedItems = [...storage.items].sort((a, b) => b.amount - a.amount);

            sortedItems.forEach(({ item, amount }) => {
                const row = document.createElement('tr');
                row.dataset.name = item.name.toLowerCase();
                row.dataset.isTruckingItem = item.isTruckingItem ? 'true' : 'false';

                const nameCell = document.createElement('td');
                nameCell.className = item.isTruckingItem ? 'item-name trucking-item' : 'item-name';
                nameCell.innerHTML = `${item.name}${
                    item.isTruckingItem ? '<span class="trucking-badge">T</span>' : ''
                }`;

                const totalWeight = item.weight * amount;
                const amountCell = document.createElement('td');
                amountCell.className = 'item-amount';
                amountCell.textContent = `${amount.toLocaleString()} (${totalWeight.toLocaleString()} kg)`;

                row.appendChild(nameCell);
                row.appendChild(amountCell);
                tbody.appendChild(row);
            });

            table.appendChild(tbody);
            storageContent.appendChild(table);
        }

        storageGroup.appendChild(storageHeader);
        storageGroup.appendChild(storageContent);
        storageList.appendChild(storageGroup);

        // Collapse empty storages by default
        if (storage.items.length === 0) storageHeader.click();
    });
}

function openStoragesUI() {
    const modal = document.getElementById('storage-ui-modal')!;
    modal.classList.remove('hidden');

    (document.getElementById('storage-search') as HTMLInputElement).value = '';
    (document.getElementById('trucking-items-only') as HTMLInputElement).checked = false;

    generateStorageList();
}

function closeStoragesUI() {
    const modal = document.getElementById('storage-ui-modal')!;
    modal.classList.add('hidden');

    // Save priorities when closing
    saveStoragePriorities();
}

function filterStorageItems() {
    const searchTerm = (document.getElementById('storage-search') as HTMLInputElement).value.toLowerCase();
    const truckingOnly = (document.getElementById('trucking-items-only') as HTMLInputElement).checked;

    // Get all item rows
    const itemRows = document.querySelectorAll('.storage-table tr') as NodeListOf<HTMLElement>;

    // Track which storages have visible items
    const storageGroups = document.querySelectorAll('.storage-group') as NodeListOf<HTMLElement>;
    const visibleItems = new Map(); // Changed to a Map to track count of visible items per storage

    // Filter the rows
    itemRows.forEach((row) => {
        const itemName = row.dataset.name;
        const isTruckingItem = row.dataset.isTruckingItem === 'true';

        const matchesSearch = !searchTerm || (itemName ?? '').includes(searchTerm);
        const matchesTrucking = !truckingOnly || isTruckingItem;

        if (matchesSearch && matchesTrucking) {
            row.style.display = '';
            // Count visible items per storage group
            const storageGroup = row.closest('.storage-group');
            if (storageGroup) {
                const currentCount = visibleItems.get(storageGroup) ?? 0;
                visibleItems.set(storageGroup, currentCount + 1);
            }
        } else {
            row.style.display = 'none';
        }
    });

    // Show/hide storages based on visible items
    storageGroups.forEach((group) => {
        const visibleItemCount = visibleItems.get(group) ?? 0;
        const emptyMsg = group.querySelector('.storage-empty:not(.no-matches)');
        const content = group.querySelector('.storage-content')!;

        // Update the item count in the header to show only visible items
        const headerSpan = group.querySelector('.storage-header')!.querySelector('span:nth-child(2)');

        if (headerSpan?.textContent) {
            const storageName = headerSpan.textContent.split('(')[0].trim();
            headerSpan.textContent = `${storageName} (${visibleItemCount} items)`;
        }

        // Remove any existing "no matches" message
        const existingNoMatches = group.querySelector('.no-matches');
        if (existingNoMatches) {
            existingNoMatches.remove();
        }

        if (visibleItemCount === 0 && !emptyMsg) {
            // If no items visible and it's not an empty storage, add temporary message
            const noMatches = document.createElement('div');
            noMatches.className = 'storage-empty no-matches';
            noMatches.textContent = 'No items match your filter criteria.';
            content!.appendChild(noMatches);
        }

        // Always show all storage groups
        group.style.display = '';
    });
}

(window as any).openStoragesUI = openStoragesUI;
(window as any).filterStorageItems = filterStorageItems;
(window as any).closeStoragesUI = closeStoragesUI;
