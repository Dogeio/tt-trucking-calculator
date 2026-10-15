import { scheduleRefresh } from './index.js';
import { ALL_STORAGES, DEFAULT_STORAGE_PRIORITY } from './calculator/data.js';
import { StorageId } from './calculator/types.js';

let initialized = false;

function resetAllPriorities() {
    ALL_STORAGES.forEach((storage) => {
        const defaultValue = storage.defaultPriority ?? DEFAULT_STORAGE_PRIORITY;

        if (defaultValue !== undefined) {
            storage.priority = defaultValue;

            const inputElement = document.getElementById(`storage-priority-${storage.id}`) as HTMLInputElement;
            if (inputElement) {
                inputElement.value = defaultValue.toString();
            }
        }
    });

    localStorage.setItem('storagePriorities', JSON.stringify({}));
    scheduleRefresh();
}

function resetStoragePriority(storageId: StorageId) {
    const inputElement = document.getElementById(`storage-priority-${storageId}`) as HTMLInputElement;

    // Find and reset the storage directly
    const storage = ALL_STORAGES.find((s) => s.id === storageId);
    if (storage) {
        const defaultValue = storage.defaultPriority ?? DEFAULT_STORAGE_PRIORITY;

        if (inputElement) {
            inputElement.value = defaultValue.toString();
        }

        storage.priority = defaultValue;
    } else {
        console.warn(`Storage with ID ${storageId} not found.`);
    }

    saveStoragePriorities();
    scheduleRefresh();
}

function updateStoragePriority(storageId: StorageId, value: number) {
    const newPriority = parseInt(value.toString());
    if (!isNaN(newPriority)) {
        // Find the storage directly using the ID
        const storage = ALL_STORAGES.find((s) => s.id === storageId);
        if (storage) {
            storage.priority = newPriority;
            saveStoragePriorities();
            scheduleRefresh();
        } else {
            console.warn(`Storage with ID ${storageId} not found.`);
        }
    }
}

function changeStoragePriority(storageId: StorageId, delta: number) {
    const inputElement = document.getElementById(`storage-priority-${storageId}`) as HTMLInputElement;
    const currentValue = parseInt(inputElement.value) ?? DEFAULT_STORAGE_PRIORITY;
    const newValue = currentValue + delta;

    inputElement.value = newValue.toString();
    updateStoragePriority(storageId, newValue);
}

export function loadStoragePriorities() {
    // Initialize default priorities if not set
    if (!initialized) {
        initialized = true;
        ALL_STORAGES.forEach((storage) => {
            // Set initial priority if not set
            if (storage.priority === undefined) {
                console.warn(`Storage ${storage.id} has no priority set. Setting to default.`);
                storage.priority = DEFAULT_STORAGE_PRIORITY;
            }

            storage.defaultPriority = storage.priority;
        });
    }

    try {
        const savedPriorities = JSON.parse(localStorage.getItem('storagePriorities') ?? '{}');

        // Apply saved priorities directly to matching storages
        ALL_STORAGES.forEach((storage) => {
            if (savedPriorities[storage.id] !== undefined) {
                storage.priority = savedPriorities[storage.id];
            } else if (storage.priority === undefined) {
                // Set default priority if not already set
                storage.priority = storage.defaultPriority;
            }
        });
    } catch (e) {
        console.error('Failed to load storage priorities:', e);
        localStorage.removeItem('storagePriorities');
    }
}

export function saveStoragePriorities() {
    const modifiedPriorities: Record<string, number> = {};

    ALL_STORAGES.forEach((storage) => {
        const defaultPriority = storage.defaultPriority ?? DEFAULT_STORAGE_PRIORITY;

        if (storage.priority !== undefined && storage.priority !== defaultPriority) {
            modifiedPriorities[storage.id] = storage.priority;
        }
    });

    localStorage.setItem('storagePriorities', JSON.stringify(modifiedPriorities));
}

// Initialize and store these functions in the global scope for use in HTML event handlers
(window as any).resetAllStoragePriorities = resetAllPriorities;
(window as any).resetStoragePriority = resetStoragePriority;
(window as any).changeStoragePriority = changeStoragePriority;
(window as any).updateStoragePriority = updateStoragePriority;
