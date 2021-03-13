// Authentication
export const checkLoggedIn = () => {
    const loggedIn = getCookie("TMDToken");
    console.log(loggedIn)
}

const getCookie = (name) => {
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