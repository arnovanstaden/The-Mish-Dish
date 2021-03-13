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

// Loader
export const toggleLoader = () => {
    let loader = document.getElementsByClassName("loader")[0] as HTMLElement;
    loader.classList.toggle("hide")
}