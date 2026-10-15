import { scheduleRefresh, saveVehicles } from './index.js';
import state from './state.js';

function reloadApp() {
    window.location.reload();
}

(window as any).reloadApp = reloadApp;

document.getElementById('amount')!.addEventListener('change', (e) => {
    localStorage.setItem('amount', (e.target as HTMLInputElement).value);
    scheduleRefresh();
});

document.getElementById('itemType')!.addEventListener('change', (e) => {
    localStorage.setItem('itemType', (e.target as HTMLInputElement).value);
    scheduleRefresh();
});

document.getElementById('premium')!.addEventListener('change', (e) => {
    localStorage.setItem('premium', (e.target as HTMLInputElement).checked ? 'true' : 'false');
    scheduleRefresh();
});

document.getElementById('alternativeApi')!.addEventListener('change', (e) => {
    localStorage.setItem('alternativeApi', (e.target as HTMLInputElement).checked ? 'true' : 'false');
    if ((e.target as HTMLInputElement).checked) {
        state.apiUrl = state.ALTERNATIVE_API_URL;
    } else {
        state.apiUrl = state.DEFAULT_API_URL;
    }
});

document.getElementById('farmersMilk')!.addEventListener('change', (e) => {
    localStorage.setItem('farmersMilk', (e.target as HTMLInputElement).checked ? 'true' : 'false');
    scheduleRefresh();
});

document.getElementById('mk15')!.addEventListener('change', () => {
    saveVehicles();
    scheduleRefresh();
});

document.getElementById('trailer')!.addEventListener('change', () => {
    saveVehicles();
    scheduleRefresh();
});

document.getElementById('useOptimalLoading')!.addEventListener('change', (e) => {
    localStorage.setItem('useOptimalLoading', (e.target as HTMLInputElement).checked ? 'true' : 'false');
    scheduleRefresh();
});

document.getElementById('useItems')!.addEventListener('change', (e) => {
    localStorage.setItem('useItems', (e.target as HTMLInputElement).checked ? 'true' : 'false');
    scheduleRefresh();
});

document.getElementById('useInventory')!.addEventListener('change', (e) => {
    localStorage.setItem('useInventory', (e.target as HTMLInputElement).checked ? 'true' : 'false');
    scheduleRefresh();
});

document.getElementById('perk')!.addEventListener('change', (e) => {
    localStorage.setItem('perk', (e.target as HTMLInputElement).value);
    scheduleRefresh();
});

document.getElementById('takeMax')!.addEventListener('change', (e) => {
    localStorage.setItem('takeMax', (e.target as HTMLInputElement).checked ? 'true' : 'false');
});

document.getElementById('dumpBeforeExecuting')!.addEventListener('change', (e) => {
    localStorage.setItem('dumpBeforeExecuting', (e.target as HTMLInputElement).checked ? 'true' : 'false');
});

document.getElementById('autoOpenTrunk')!.addEventListener('change', (e) => {
    localStorage.setItem('autoOpenTrunk', (e.target as HTMLInputElement).checked ? 'true' : 'false');
});

document.getElementById('autoCloseTrunk')!.addEventListener('change', (e) => {
    localStorage.setItem('autoCloseTrunk', (e.target as HTMLInputElement).checked ? 'true' : 'false');
});

document.getElementById('autoRecipe')!.addEventListener('change', (e) => {
    localStorage.setItem('autoRecipe', (e.target as HTMLInputElement).checked ? 'true' : 'false');
    scheduleRefresh();
});

document.getElementById('useHighestMultiplier')!.addEventListener('change', (e) => {
    localStorage.setItem('useHighestMultiplier', (e.target as HTMLInputElement).checked ? 'true' : 'false');
    scheduleRefresh();
});

document.getElementById('truckingItemToTake')!.addEventListener('change', (e) => {
    localStorage.setItem('truckingItemToTake', (e.target as HTMLInputElement).value);
});

document.getElementById('custom-recipe-ingredient-type')!.addEventListener('change', (e) => {
    localStorage.setItem('custom-recipe-ingredient-type', (e.target as HTMLInputElement).value);
});

document.getElementById('custom-recipe-ingredient-amount')!.addEventListener('change', (e) => {
    localStorage.setItem('custom-recipe-ingredient-amount', (e.target as HTMLInputElement).value);
});

document.getElementById('custom-recipe-product-type')!.addEventListener('change', (e) => {
    localStorage.setItem('custom-recipe-product-type', (e.target as HTMLInputElement).value);
});

document.getElementById('custom-recipe-product-amount')!.addEventListener('change', (e) => {
    localStorage.setItem('custom-recipe-product-amount', (e.target as HTMLInputElement).value);
});
