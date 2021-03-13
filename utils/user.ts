import axios from "axios"

// Authentication
export const loginUser = async (user) => {
    let loginResult = await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_LOCAL_API_URL}/profile/login`,
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
    return loginResult
}

export const registerUser = () => {

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

export const getFavourites = async () => {
    let response = await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_LOCAL_API_URL}/profile/`,
        headers: {
            Authorization: `BEARER ${getCookie("TMDToken")}`
        }
    }).then(result => {
        return result.data.favourites
    }).catch(err => {
        console.log(err)
    });
    return response
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

