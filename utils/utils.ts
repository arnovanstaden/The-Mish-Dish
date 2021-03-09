// Image Conversion
export const convertImage = (image: string, width: number): string => {
    const covertedImage = image.replace("upload/v", `upload/w_${width},c_scale/f_auto/v`);
    return covertedImage
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
export const updateRecentlyViewedRecipes = (id: string) => {
    const recipes = localStorage.getItem("recentlyViewed");

}

// export const getRecentlyViewedRecipes = (id: string) => {
//     const recipes = localStorage.getItem("recentlyViewed");
//     return JSON.parse(recipes);
// }

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
