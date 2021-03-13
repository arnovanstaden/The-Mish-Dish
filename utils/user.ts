import axios from "axios"

// Authentication
export const loginUser = async (user) => {
    let loginResult = await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_URL}/profile/login`,
        data: user
    }).then(result => {

        // Save Login
        document.cookie = `TMDToken=${result.data.token};path=/`;
        document.cookie = `TMDName=${result.data.name};path=/`;
        localStorage.setItem("favourites", JSON.stringify(result.data.favourites))
        return result
    }).catch(err => {
        console.log(err)
        return err.response
    });
    return loginResult
}

export const registerUser = async (user) => {
    let registerResult = await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_URL}/profile/register`,
        data: user
    }).then(result => {
        // Save Login
        document.cookie = `TMDToken=${result.data.token};path=/`;
        document.cookie = `TMDName=${result.data.name};path=/`;
        return result
    }).catch(err => {
        console.log(err)
        return err.response
    });
    return registerResult
}

export const checkLoggedIn = (): boolean => {
    const loggedIn = getCookie("TMDToken");
    if (!loggedIn) {
        return false
    }
    return true
}

export const getUserName = (): string => {
    return getCookie("TMDName");
}

// Favourites


export const getFavourites = () => {
    return JSON.parse(localStorage.getItem("favourites"))
}

export const checkIfFavourite = (id): boolean => {
    const favourites = getFavourites()
    if (favourites.includes(id)) {
        return true
    }
    return false
}

export const updateFavourite = (id: string) => {
    const favourites = getFavourites()
    let newFavourites = [];
    if (favourites.includes(id)) {
        newFavourites = [...favourites].filter(favourite => favourite != id);
    } else {
        newFavourites = [...favourites, id];
    }
    localStorage.setItem("favourites", JSON.stringify(newFavourites))

    axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_URL}/profile/handleFavourite`,
        headers: {
            Authorization: `BEARER ${getCookie("TMDToken")}`
        },
        data: {
            recipeID: id,
        }
    }).then(result => {

    }).catch(err => {
        console.log(err)
    });
}

const getCookie = (name): string => {
    var cookieArr = document.cookie.split(";");

    // Loop through the array elements
    for (var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");
        if (name == cookiePair[0].trim()) {
            // Decode the cookie value and return
            return decodeURIComponent(cookiePair[1]);
        }
    }
}


