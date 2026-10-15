export type Transfer = {
    type: 'in' | 'out';
    player: string;
    items: {
        name: string;
        amount: number;
    }[];
    timestamp: number;
};

export function addTransferLog(
    type: 'in' | 'out',
    player: string,
    items: {
        name: string;
        amount: number;
    }[]
) {
    if (!['in', 'out'].includes(type)) {
        console.error('Invalid transfer type:', type);
        return;
    }

    if (!items || !items.length) {
        console.warn('No items to log in transfer');
        return;
    }

    const transfers = getTransferLogs();

    transfers.unshift({
        type,
        player,
        items,
        timestamp: Date.now()
    });

    // Save to localStorage
    localStorage.setItem('transferLogs', JSON.stringify(transfers));
}

export function getTransferLogs(): Transfer[] {
    try {
        return JSON.parse(localStorage.getItem('transferLogs') || '[]');
    } catch (e) {
        console.error('Failed to parse transfer logs:', e);
        return [];
    }
}

export function clearTransferLogs() {
    localStorage.setItem('transferLogs', '[]');
}

export function filterTransferLogs(type = 'all', search = '') {
    const logs = getTransferLogs();

    return logs.filter((log) => {
        // Filter by type
        if (type !== 'all' && log.type !== type) {
            return false;
        }

        // Filter by search term (case insensitive)
        if (search) {
            const searchLower = search.toLowerCase();
            const playerMatch = log.player.toLowerCase().includes(searchLower);
            const itemMatch = log.items.some((item) => item.name.toLowerCase().includes(searchLower));

            return playerMatch || itemMatch;
        }

        return true;
    });
}

(window as any).clearTransferLogs = clearTransferLogs;
