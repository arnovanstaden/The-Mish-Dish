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
