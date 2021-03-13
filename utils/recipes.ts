// Get Ingredient Count
export const getIngredientCount = (ingredients) => {
    let count = 0;
    if (Object.keys(ingredients).length === 1) {
        count = ingredients[0].length
        return count
    } else {
        let recipeParts = Object.keys(ingredients);
        recipeParts.forEach(part => {
            count += ingredients[part].length
        });
        return count
    }
}

// Search

export const searchRecipes = (allRecipes: any[], searchTerm: string) => {
    let results = [];
    const searchKeys = ["name", "description", "recipeType"];

    allRecipes.forEach(recipe => {

        // Iterate through search keys
        searchKeys.forEach(key => {
            let toSearch = recipe[key];
            if (toSearch && toSearch.toLowerCase().includes(searchTerm)) {
                results.push(recipe)
            }
        })

        // Iterate through Tags
        if (recipe.tags) {
            recipe.tags.forEach(tag => {
                if (tag && tag.toLowerCase().includes(searchTerm)) {
                    results.push(recipe)
                }
            });
        }

        // Ingredients
        let ingredientKeys = Object.keys(recipe.ingredients)
        if (ingredientKeys.length === 1) {
            recipe.ingredients[0].forEach(ingredient => {
                if (ingredient.toLowerCase().includes(searchTerm)) {
                    results.push(recipe)
                }
            });
        } else {
            ingredientKeys.forEach(key => {
                recipe.ingredients[key].forEach(ingredient => {
                    if (ingredient.toLowerCase().includes(searchTerm)) {
                        results.push(recipe)
                    }
                });
            })
        }
    });

    // Remove Duplicates
    results = [...new Set(results)]

    resetSort();

    return results
}

// Sort

export const sortRecipes = (recipes: any[], sortBy: string) => {
    let sortedRecipes;

    switch (sortBy) {
        case "Recently Added":
            break;
        case "Name A-Z":
            sortedRecipes = recipes.sort((a, b) => {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {

                    return 1;
                }
                return 0;
            })
            break;
        case "Popularity":
            sortedRecipes = recipes.sort((a, b) => {
                return b.favourites - a.favourites;
            })
            break;
        case "Cooking Time":
            sortedRecipes = recipes.sort((a, b) => {
                if (a.cookTime < b.cookTime) {
                    return -1;
                }
                if (a.cookTime > b.cookTime) {
                    return 1;
                }
                return 0;
            })
            break;
    }

    return sortedRecipes
}

function resetSort() {
    // Reset Sort
    let sort = document.getElementsByClassName("Dropdown-placeholder is-selected")[0] as HTMLElement;
    sort.innerHTML = "Recently Added"
}


// Filter

export const filterRecipes = (recipes: any[], activeFilters: string[]) => {
    let matchingRecipes = [];
    let isMatch: boolean[];
    let filterOptions = Object.keys(activeFilters);

    // Check if currently searching
    let searchTerm = (document.getElementById("search-bar") as HTMLInputElement).value;
    if (searchTerm.length > 0) {
        recipes = searchRecipes(recipes, searchTerm)
    }

    recipes.forEach(recipe => {
        isMatch = [];
        filterOptions.forEach(option => {
            activeFilters[option].forEach(item => {
                if (typeof recipe[option] === "string") {
                    if (recipe[option] && recipe[option].includes(item)) {
                        isMatch.push(true)
                    } else {
                        isMatch.push(false)
                    }
                } else {
                    let array = recipe[option].map(item => item.toLowerCase());
                    if (array.includes(item)) {
                        isMatch.push(true)
                    } else {
                        isMatch.push(false)
                    }
                }
            })
        });

        // Check if all filters match
        if (!isMatch.includes(false)) {
            matchingRecipes.push(recipe)
        }
    })

    resetSort();

    return matchingRecipes
}