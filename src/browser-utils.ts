import { INVENTORY_STORAGE } from './calculator/data.js';
import { StorageType, UserStorage } from './calculator/types.js';
import { getStorage } from './calculator/utils.js';
import state from './state.js';

export function getActiveStoragesCopy(useInventory: boolean): UserStorage[] {
    const premium = (document.getElementById('premium') as HTMLInputElement).checked;
    const farmersMilk = (document.getElementById('farmersMilk') as HTMLInputElement).checked;
    const perk = (document.getElementById('perk') as HTMLInputElement).value;
    const activeStorages = useInventory ? [INVENTORY_STORAGE] : [];
    if ((document.getElementById('mk15') as HTMLInputElement).checked) {
        const storage = getStorage('mk15');
        if (storage) {
            activeStorages.push(storage);
        } else {
            console.error('Storage not found for mk15');
        }
    }
    const trailer = (document.getElementById('trailer') as HTMLInputElement).value;
    if (trailer) {
        const storage = getStorage(trailer);
        if (storage) {
            activeStorages.push(storage);
        } else {
            console.error(`Storage not found for trailer: ${trailer}`);
        }
    }

    const vehicleStorageMultiplier =
        1 + (premium ? 0.15 : 0) + (farmersMilk ? 0.2 : 0) + (perk === 'postop' ? 0.15 : 0);
    const inventoryStorageMultiplier =
        1 + (premium ? 0.15 : 0) + (farmersMilk ? 0.5 : 0) + (perk === 'strength' ? 1 : 0);

    const activeUserStorages = [];

    for (const storage of activeStorages) {
        const storageId = storage.id;
        const s = state.storages.find((s) => s.storage.id === storageId);
        if (s) {
            activeUserStorages.push({
                ...s,
                storage: {
                    ...s.storage,
                    size:
                        s.storage.type === StorageType.Inventory
                            ? Math.round((s.storage.size ?? 0) * inventoryStorageMultiplier)
                            : Math.round((s.storage.size ?? 0) * vehicleStorageMultiplier)
                }
            });
        } else {
            console.warn(`Active storage not found in state: ${storageId}, creating custom`);
            activeUserStorages.push({
                items: [],
                storage: {
                    ...storage,
                    size:
                        storage.type === StorageType.Inventory
                            ? Math.round((storage.size ?? 0) * inventoryStorageMultiplier)
                            : Math.round((storage.size ?? 0) * vehicleStorageMultiplier)
                }
            });
        }
    }

    return activeUserStorages.sort((a, b) => (b.storage.size ?? 0) - (a.storage.size ?? 0));
}
