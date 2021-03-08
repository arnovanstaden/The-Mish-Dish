export const convertImage = (image: string, width: number): string => {
    const covertedImage = image.replace("upload/v", `upload/w_${width},c_scale/f_auto/v`);
    return covertedImage
}

export const handleRecipeShare = (title: string, id: string) => {
    if (navigator.share) {
        navigator.share({
            title: title,
            text: "Check out this awesome recipe on The Mish Dish!\n",
            url: `https://themishdish.co.za/recipes/${id}`,
        })
            .then(() => console.log('Successful share'))
            .catch((error) => console.log('Error sharing', error));
    }
}
