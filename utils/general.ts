// Image Conversion
export const convertImage = (image: string, width: number | string): string => {
    if (process.env.NEXT_PUBLIC_ENVIRONMENT === "production") {
        const covertedImage = image.replace("upload/v", `upload/f_auto/v`);
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
            .catch((error) => console.log('Error sharing', error));
    }
}

// Loader
export const toggleLoader = () => {
    let loader = document.getElementsByClassName("loader")[0] as HTMLElement;
    loader.classList.toggle("hide")
}

// Base 64
export const urlBase64ToUint8Array = (base64String) => {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    var rawData = atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}