import { getStorage, parseStorage, parseStorageItems } from './utils.js';
import { BACKPACK_STORAGE, INVENTORY_STORAGE } from './data.js';
import { ApiPath, ApiPathResponse, UserStorage } from './types.js';

async function fetchApi<T extends ApiPath>(apiUrl: string, path: T, apiKey: string): Promise<ApiPathResponse[T]> {
    const response = await fetch(apiUrl + path, {
        headers: {
            'X-Tycoon-Key': apiKey
        }
    });

    if (!response.ok) {
        let text: string;
        if (response.status === 402) {
            text = 'No api charges remaining';
        } else if (response.status === 403) {
            text = 'Invalid api key';
        } else {
            text = await response.text().catch(() => 'Unknown');
        }

        throw new Error(`Failed to fetch api: (${response.status}) ${text ?? response.statusText}`);
    }

    return response.json();
}

export async function fetchFactionId(apiUrl: string, userId: string, apiKey: string): Promise<string | null> {
    const data = await fetchApi(apiUrl, `getuserfaq/${userId}`, apiKey);
    return typeof data.faction_id === 'number' ? String(data.faction_id) : null;
}

export async function fetchInventory(apiUrl: string, userId: string, apiKey: string): Promise<UserStorage> {
    const {
        data: { inventory }
    } = await fetchApi(apiUrl, `data/${userId}`, apiKey);

    return {
        items: parseStorageItems(inventory, INVENTORY_STORAGE.id),
        storage: INVENTORY_STORAGE
    };
}

export async function fetchBackpack(apiUrl: string, userId: string, apiKey: string): Promise<UserStorage> {
    const { data: inventory } = await fetchApi(apiUrl, `chest/u${userId}backpack`, apiKey);

    return {
        items: parseStorageItems(inventory ?? {}, BACKPACK_STORAGE.id),
        storage: BACKPACK_STORAGE
    };
}

export async function fetchVehicleStorages(apiUrl: string, userId: string, apiKey: string): Promise<UserStorage[]> {
    const { trunks } = await fetchApi(apiUrl, `trunks/${userId}`, apiKey);

    const storages: UserStorage[] = [];
    for (const trunk of trunks) {
        const storage = getStorage(trunk.vehicle, userId.toString());
        if (!storage) continue;

        storages.push({
            items: parseStorageItems(trunk.inventory, storage.id),
            storage
        });
    }

    return storages;
}

export async function fetchStorages(
    apiUrl: string,
    userId: string,
    apiKey: string,
    factionId?: string | null
): Promise<UserStorage[]> {
    const inventoryPromise = fetchInventory(apiUrl, userId, apiKey);
    const backpackPromise = fetchBackpack(apiUrl, userId, apiKey);
    const vehiclesPromise = fetchVehicleStorages(apiUrl, userId, apiKey);

    const { storages } = await fetchApi(apiUrl, `storages/${userId}`, apiKey);
    const userStorages = storages
        .map((storage) => parseStorage(storage.name, storage.inventory, userId.toString(), factionId))
        .filter((storage) => storage !== null);

    userStorages.push(await inventoryPromise);
    userStorages.push(await backpackPromise);
    userStorages.push(...(await vehiclesPromise));

    return userStorages.sort(({ storage: a }, { storage: b }) => b.priority - a.priority);
}
