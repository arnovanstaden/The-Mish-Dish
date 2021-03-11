// Image Conversion
export const convertImage = (image: string, width: number): string => {
    if (process.env.ENVIRONMENT === "production") {
        const covertedImage = image.replace("upload/v", `upload/w_${width},c_scale/f_auto/v`);
        return covertedImage
    } else {
        return image
    }
}

// Text Manipulation
export const capitalize = (word: string) => {
    if (typeof word !== 'string') return ''
    return word.charAt(0).toUpperCase() + word.slice(1)
}

// Sharing
export const handleRecipeShare = (name: string, id: string) => {
    if (navigator.share) {
        navigator.share({
            title: name,
            text: `Check out this awesome recipe on The Mish Dish:\n ${name}\n`,
            url: `https://themishdish.co.za/recipes/${id}`,
        })
            .then(() => console.log('Successful share'))
            .catch((error) => console.log('Error sharing', error));
    }
}

// Recently Viewed
export const recentlyViewed = {
    get: () => {
        return JSON.parse(localStorage.getItem("recentlyViewed"));
    },
    set: (id: string) => {
        let recipes = JSON.parse(localStorage.getItem("recentlyViewed"));
        if (recipes && !recipes.includes(id)) {
            recipes.unshift(id)
            if (recipes && recipes.length > 6) {
                recipes.pop()
            }
        } else {
            recipes = [id]
        }
        localStorage.setItem("recentlyViewed", JSON.stringify(recipes))
    }
}

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


// Get Cooking Times
export const getCookingTimes = (recipes) => {
    let times = {
        min: 100,
        max: 0
    };
    recipes.forEach(recipe => {
        times.min = recipe.cookTime < times.min ? recipe.cookTime : times.min
        times.max = recipe.cookTime > times.max ? recipe.cookTime : times.max
    });
    return times
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
            if (option === "cookingTime") {
                if (recipe[option] <= activeFilters[option]) {
                    isMatch.push(true)
                } else {
                    isMatch.push(false)
                }
            } else {
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
            }
        });

        // Check if all filters match
        if (!isMatch.includes(false)) {
            matchingRecipes.push(recipe)
        }
    })

    return matchingRecipes
}
