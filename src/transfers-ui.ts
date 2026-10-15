import { filterTransferLogs, Transfer } from './transfers.js';

function openTransfersUI() {
    document.getElementById('transfers-ui-modal')!.classList.remove('hidden');

    (document.getElementById('transfer-search') as HTMLInputElement).value = '';
    (document.getElementById('transfer-type-filter') as HTMLInputElement).value = 'all';

    generateTransferList();
}

export function closeTransfersUI() {
    document.getElementById('transfers-ui-modal')!.classList.add('hidden');
}

function generateTransferList() {
    const transferList = document.getElementById('transfers-list')!;
    transferList.innerHTML = '';

    const searchTerm = (document.getElementById('transfer-search') as HTMLInputElement).value;
    const typeFilter = (document.getElementById('transfer-type-filter') as HTMLInputElement).value;

    const transfers = filterTransferLogs(typeFilter, searchTerm);

    if (transfers.length === 0) {
        transferList.innerHTML = '<div class="no-transfers">No transfers found.</div>';
        return;
    }

    const transfersByDay: {
        [k: string]: Array<Transfer>;
    } = {};

    transfers.forEach((transfer: (typeof transfersByDay)[string][number]) => {
        const date = new Date(transfer.timestamp);
        const dateKey = date.toLocaleDateString();

        if (!transfersByDay[dateKey]) {
            transfersByDay[dateKey] = [];
        }

        transfersByDay[dateKey].push(transfer);
    });

    Object.entries(transfersByDay).forEach(([dateKey, dayTransfers]) => {
        const dayGroup = document.createElement('div');
        dayGroup.className = 'transfer-day-group';

        const dayHeader = document.createElement('div');
        dayHeader.className = 'transfer-day-header';
        dayHeader.textContent = dateKey;

        dayGroup.appendChild(dayHeader);

        dayTransfers.forEach((transfer) => {
            const transferEntry = document.createElement('div');
            transferEntry.className = `transfer-entry transfer-${transfer.type}`;

            const timestamp = new Date(transfer.timestamp);
            const timeString = timestamp.toLocaleTimeString();

            const totalItems = transfer.items.reduce((sum, item) => sum + item.amount, 0);

            const transferHeader = document.createElement('div');
            transferHeader.className = 'transfer-header';

            const transferIcon = document.createElement('span');
            transferIcon.className = `transfer-icon transfer-${transfer.type}-icon`;
            transferIcon.textContent = transfer.type === 'in' ? '←' : '→';

            const transferInfo = document.createElement('div');
            transferInfo.className = 'transfer-info';

            const transferTitle = document.createElement('div');
            transferTitle.className = 'transfer-title';
            const playerName = document.createElement('strong');
            playerName.textContent = transfer.player;
            if (transfer.type === 'in') {
                transferTitle.append(playerName, document.createTextNode(` sent you ${totalItems} items`));
            } else {
                transferTitle.append(document.createTextNode('You sent '), playerName, document.createTextNode(` ${totalItems} items`));
            }

            const transferTime = document.createElement('div');
            transferTime.className = 'transfer-time';
            transferTime.textContent = timeString;

            transferInfo.appendChild(transferTitle);
            transferInfo.appendChild(transferTime);

            transferHeader.appendChild(transferIcon);
            transferHeader.appendChild(transferInfo);
            transferEntry.appendChild(transferHeader);

            const itemsList = document.createElement('div');
            itemsList.className = 'transfer-items';

            transfer.items.forEach((item) => {
                const itemEntry = document.createElement('div');
                itemEntry.className = 'transfer-item';
                const itemName = document.createElement('span');
                itemName.className = 'item-name';
                itemName.textContent = item.name;
                const itemAmount = document.createElement('span');
                itemAmount.className = 'item-amount';
                itemAmount.textContent = item.amount.toLocaleString();
                itemEntry.append(itemName, document.createTextNode(' '), itemAmount);
                itemsList.appendChild(itemEntry);
            });

            transferEntry.appendChild(itemsList);
            dayGroup.appendChild(transferEntry);
        });

        transferList.appendChild(dayGroup);
    });
}

function filterTransfers() {
    generateTransferList();
}

(window as any).openTransfersUI = openTransfersUI;
(window as any).closeTransfersUI = closeTransfersUI;
(window as any).filterTransfers = filterTransfers;
