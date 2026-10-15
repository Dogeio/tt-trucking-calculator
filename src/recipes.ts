import { LOCATIONS } from './calculator/data.js';
import state from './state.js';
import { scheduleRefresh } from './index.js';
import { saveCustomRecipes } from './nui.js';
import { Recipe, RecipeType } from './calculator/types.js';

type RecipeData = {
    id: string;
    name: string;
    locationName: string;
    locationColor: string;
    type: RecipeType;
    currentPriority: number;
    defaultPriority: number;
    recipe: Recipe;
};

function resetPriorities() {
    LOCATIONS.forEach((location) => {
        location.recipes.forEach((recipe) => {
            const recipeId = `${location.name}:${recipe.name}`;
            const defaultValue = state.defaultRecipePriorities[recipeId] ?? 0;

            if (defaultValue !== undefined) {
                recipe.priority = defaultValue;

                const inputElement = document.getElementById(`priority-${recipeId}`) as HTMLInputElement;
                if (inputElement) {
                    inputElement.value = defaultValue.toString();
                }
            }
        });
    });

    localStorage.setItem('recipePriorities', JSON.stringify({}));
}

function resetRecipePriority(recipeId: string) {
    const defaultValue = state.defaultRecipePriorities[recipeId] ?? 0;
    const inputElement = document.getElementById(`priority-${recipeId}`) as HTMLInputElement;

    if (inputElement) {
        inputElement.value = defaultValue.toString();
    }

    // Find and reset the recipe directly
    for (const location of LOCATIONS) {
        for (const recipe of location.recipes) {
            const currentRecipeId = `${location.name}:${recipe.name}`;
            if (currentRecipeId === recipeId) {
                recipe.priority = defaultValue;
                return;
            }
        }
    }

    console.warn(`Could not find recipe ${recipeId} to reset the priority of.`);
}

function deleteCustomRecipe(recipeId: string) {
    const [locationName, recipeName] = recipeId.split(':');
    if (locationName !== 'Custom Recipes') {
        console.warn(`Delete custom recipe with invalid recipe: ${recipeId}`);
        return;
    }

    const customLocation = LOCATIONS.find((loc) => loc.name === 'Custom Recipes');
    if (customLocation) {
        const recipeIndex = customLocation.recipes.findIndex((recipe) => recipe.name === recipeName);
        if (recipeIndex !== -1) {
            customLocation.recipes.splice(recipeIndex, 1);
            resetRecipePriority(recipeId);
            saveCustomRecipes();
            scheduleRefresh();
            generateRecipeList();
        } else {
            console.warn('Could not find custom recipe in Custom Recipes');
        }
    } else {
        console.warn('Could not find Custom Recipes location to delete recipe from');
    }
}

function updatePriority(recipeId: string, value: number | string) {
    const newPriority = parseInt(value.toString());
    if (!isNaN(newPriority)) {
        // Find the recipe directly using the ID
        for (const location of LOCATIONS) {
            for (const recipe of location.recipes) {
                const currentRecipeId = `${location.name}:${recipe.name}`;
                if (currentRecipeId === recipeId) {
                    recipe.priority = newPriority;
                    return;
                }
            }
        }
    }
    console.warn(`Failed to find recipe ${recipeId} to set priority`);
}

function changePriority(recipeId: string, delta: number) {
    const inputElement = document.getElementById(`priority-${recipeId}`) as HTMLInputElement;
    const currentValue = parseInt(inputElement.value) || 0;
    const newValue = currentValue + delta;

    inputElement.value = newValue.toString();
    updatePriority(recipeId, newValue);
}

export function loadRecipePriorities() {
    if (Object.keys(state.defaultRecipePriorities).length === 0) {
        LOCATIONS.forEach((location) => {
            location.recipes.forEach((recipe) => {
                const id = `${location.name}:${recipe.name}`;
                state.defaultRecipePriorities[id] = recipe.priority;
            });
        });
    }

    try {
        const savedPriorities = JSON.parse(localStorage.getItem('recipePriorities') || '{}');

        // Apply saved priorities directly to matching recipes
        LOCATIONS.forEach((location) => {
            location.recipes.forEach((recipe) => {
                const recipeId = `${location.name}:${recipe.name}`;
                if (savedPriorities[recipeId] !== undefined) {
                    recipe.priority = savedPriorities[recipeId];
                }
            });
        });
    } catch (e) {
        console.error('Failed to load recipe priorities:', e);
    }
}

function openRecipeSettings() {
    const modal = document.getElementById('recipe-settings-modal')!;
    modal.classList.remove('hidden');

    loadRecipePriorities();

    (document.getElementById('recipe-search') as HTMLInputElement).value = '';

    generateRecipeList();
}

function generateRecipeList() {
    const recipeList = document.getElementById('recipe-list')!;
    recipeList.innerHTML = '';

    const recipesList: {
        location: string;
        color: string;
        recipes: RecipeData[];
    }[] = [];

    LOCATIONS.forEach((location) => {
        const locationId = location.name;
        const recipes = location.recipes.map((recipe) => {
            const recipeId = `${locationId}:${recipe.name}`;
            return {
                id: recipeId,
                name: recipe.name,
                locationName: location.name,
                locationColor: location.color,
                type: recipe.type,
                currentPriority: recipe.priority,
                defaultPriority: state.defaultRecipePriorities[recipeId] ?? 0,
                recipe: recipe
            };
        });

        recipesList.push({
            location: location.name,
            color: location.color,
            recipes: recipes
        });
    });

    recipesList.sort((a, b) => a.location.localeCompare(b.location));

    recipesList.forEach((locationGroup) => {
        const locationColor = locationGroup.color || '#808080';
        const locationDiv = document.createElement('div');
        locationDiv.className = 'location-group';

        const locationHeader = document.createElement('div');
        locationHeader.className = 'location-header';
        locationHeader.innerHTML = `
			<span style="color: ${locationColor}">${locationGroup.location}</span>
			<span class="location-toggle">▼</span>
		`;
        locationHeader.addEventListener('click', () => {
            const recipesDiv = locationDiv.querySelector('.location-recipes')!;
            const toggle = locationHeader.querySelector('.location-toggle')!;
            recipesDiv.classList.toggle('collapsed');
            toggle.classList.toggle('collapsed');
        });

        const recipesDiv = document.createElement('div');
        recipesDiv.className = 'location-recipes';

        locationGroup.recipes.sort((a, b) => a.name.localeCompare(b.name));

        locationGroup.recipes.forEach((recipe) => {
            const recipeItem = document.createElement('div');
            recipeItem.className = 'recipe-item';
            recipeItem.dataset.id = recipe.id;
            recipeItem.dataset.name = recipe.name.toLowerCase();
            recipeItem.dataset.location = recipe.locationName.toLowerCase();

            // Create the recipe node visualization
            const recipeNode = createRecipeNode(recipe);

            // Create the priority controls
            const priorityControls = document.createElement('div');
            priorityControls.className = 'recipe-priority-section';
            priorityControls.innerHTML = `
				<div class="priority-label">Priority:</div>
				<div class="priority-controls">
					<button onclick="changePriority('${recipe.id}', -1)">-</button>
					<input type="number" value="${recipe.currentPriority}" 
						onchange="updatePriority('${recipe.id}', this.value)" 
						id="priority-${recipe.id}" />
					<button onclick="changePriority('${recipe.id}', 1)">+</button>
				</div>
				<button class="reset-recipe" title="Reset to default priority" onclick="resetRecipePriority('${recipe.id}')">
					Reset (${recipe.defaultPriority})
				</button>${
                    locationGroup.location === 'Custom Recipes'
                        ? `
				<button class="delete-recipe" title="Delete" onclick="deleteCustomRecipe('${recipe.id}')">
					Delete
				</button>`
                        : ''
                }
			`;

            recipeItem.appendChild(recipeNode);
            recipeItem.appendChild(priorityControls);

            recipesDiv.appendChild(recipeItem);
        });

        locationDiv.appendChild(locationHeader);
        locationDiv.appendChild(recipesDiv);
        recipeList.appendChild(locationDiv);
    });
}

function createRecipeNode(recipeData: RecipeData) {
    const originalRecipe = recipeData.recipe;
    const container = document.createElement('div');
    container.className = 'recipe-node';

    // Recipe header with name and type
    const recipeHeader = document.createElement('div');
    recipeHeader.className = 'recipe-node-header';

    const typeBadge = document.createElement('span');
    typeBadge.className = 'recipe-type-badge';
    typeBadge.textContent =
        recipeData.type === 'export' ? 'Export' : recipeData.type === 'import' ? 'Import' : 'Recipe';
    typeBadge.classList.add(
        recipeData.type === 'export' ? 'export-badge' : recipeData.type === 'import' ? 'import-badge' : 'recipe-badge'
    );

    const recipeName = document.createElement('h3');
    recipeName.className = 'recipe-node-name';
    recipeName.textContent = recipeData.name;

    recipeHeader.appendChild(recipeName);
    recipeHeader.appendChild(typeBadge);

    // Recipe cost
    const recipeCost = document.createElement('div');
    recipeCost.className = 'recipe-cost';

    const costValue = originalRecipe.cost;
    recipeCost.innerHTML =
        costValue < 0
            ? `Revenue: <span class="profit">$${Math.abs(costValue).toLocaleString()}</span>`
            : `Cost: <span class="expense">$${costValue.toLocaleString()}</span>`;

    // Create recipe details container - side by side for ingredients and products
    const recipeDetailsContainer = document.createElement('div');
    recipeDetailsContainer.className = 'recipe-details-container';

    // Create ingredients section
    const hasIngredients = originalRecipe.ingredients.length > 0;

    // Create products section
    let products = null;
    if ((originalRecipe.type === 'recipe' || originalRecipe.type === 'import') && originalRecipe.products.length > 0) {
        products = document.createElement('div');
        products.className = 'recipe-products';

        const productsTitle = document.createElement('h4');
        productsTitle.textContent = 'Products:';
        products.appendChild(productsTitle);

        const productsList = document.createElement('ul');
        originalRecipe.products.forEach((prod) => {
            const item = document.createElement('li');
            item.innerHTML = `<span class="item-amount">${prod.amount}×</span> <span class="item-name">${prod.item.name}</span>`;
            productsList.appendChild(item);
        });
        products.appendChild(productsList);
    }

    // For recipes with no ingredients, products should be on the left side
    if (!hasIngredients && products) {
        recipeDetailsContainer.appendChild(products);
    }

    // Add ingredients section if there are any
    if (hasIngredients) {
        const ingredients = document.createElement('div');
        ingredients.className = 'recipe-ingredients';

        const ingredientsTitle = document.createElement('h4');
        ingredientsTitle.textContent = 'Ingredients:';
        ingredients.appendChild(ingredientsTitle);

        const ingredientsList = document.createElement('ul');
        originalRecipe.ingredients.forEach((ing) => {
            const item = document.createElement('li');
            item.innerHTML = `<span class="item-amount">${ing.amount}×</span> <span class="item-name">${ing.item.name}</span>`;
            ingredientsList.appendChild(item);
        });
        ingredients.appendChild(ingredientsList);

        recipeDetailsContainer.appendChild(ingredients);

        // For recipes with ingredients, products should be on the right side
        if (products) {
            recipeDetailsContainer.appendChild(products);
        }
    }

    // Assemble the recipe node
    container.appendChild(recipeHeader);
    container.appendChild(recipeCost);
    container.appendChild(recipeDetailsContainer);

    return container;
}

export function saveRecipeSettings() {
    const modifiedPriorities: { [key: string]: number } = {};

    LOCATIONS.forEach((location) => {
        location.recipes.forEach((recipe) => {
            const recipeId = `${location.name}:${recipe.name}`;
            const defaultPriority = state.defaultRecipePriorities[recipeId];

            if (recipe.priority !== defaultPriority) {
                modifiedPriorities[recipeId] = recipe.priority;
            }
        });
    });

    localStorage.setItem('recipePriorities', JSON.stringify(modifiedPriorities));
    closeRecipeSettings();
    scheduleRefresh();
}

function closeRecipeSettings() {
    document.getElementById('recipe-settings-modal')!.classList.add('hidden');
}

(window as any).resetPriorities = resetPriorities;
(window as any).resetRecipePriority = resetRecipePriority;
(window as any).deleteCustomRecipe = deleteCustomRecipe;
(window as any).changePriority = changePriority;
(window as any).updatePriority = updatePriority;
(window as any).openRecipeSettings = openRecipeSettings;
(window as any).saveRecipeSettings = saveRecipeSettings;
(window as any).closeRecipeSettings = closeRecipeSettings;
