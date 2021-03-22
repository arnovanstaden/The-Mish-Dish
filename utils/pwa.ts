import installStyles from "../components/UI/Install/install.module.scss";
import { urlBase64ToUint8Array } from "./general";
import axios from "axios";

// API URL
const API_URL = process.env.NEXT_PUBLIC_ENVIRONMENT === "development" ? process.env.NEXT_PUBLIC_LOCAL_API_URL : process.env.NEXT_PUBLIC_API_URL;

export const installPrompt = () => {
    let deferredPrompt;

    window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
        // Stash the event so it can be triggered later.
        deferredPrompt = e;
        if (deferredPrompt) {
            if (!JSON.parse(localStorage.getItem("showedAppInstallShow"))) {
                showInstallModal()
            }
        }
    });

    const showInstallModal = () => {
        // Show Install Modal
        let modal = document.getElementsByClassName(installStyles.install)[0] as HTMLElement;
        modal.classList.add(installStyles.show);

        let installButton = document.getElementById("install-button") as HTMLElement;
        installButton.addEventListener('click', (e) => {
            // Show the prompt
            deferredPrompt.prompt();
            // Wait for the user to respond to the prompt
            modal.classList.remove(installStyles.show);
            deferredPrompt = null;
        });
    }
}

export const registerServiceWorker = () => {

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
            .then(function (registration) {
                registration.addEventListener('updatefound', function () {
                    var installingWorker = registration.installing;
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

// Notifications - Setup

export const requestNotificationPermission = () => {
    if ("Notification" in window) {
        Notification.requestPermission()
    }
}


// export const notificationsPermitted = () => {
//     if (Notification.permission == 'granted') {
//         return true
//     } else {
//         return false
//     }
// }

export const checkSubscription = async () => {
    let subscribed;
    if ('serviceWorker' in navigator) {
        subscribed = await navigator.serviceWorker.getRegistration()
            .then(function (reg) {
                return reg.pushManager.getSubscription()
                    .then(function (subscription) {
                        if (subscription === null) {
                            return false
                        } else {
                            // Ensure Updated
                            handleUserSubscription("subscribe", false);
                            return true
                        }
                    })
                    .catch(function (err) {
                        console.log(err)
                    });
            })
            .catch(function (err) {
                console.log(err)
            });
    }
    return subscribed
}

export const handleUserSubscription = (status: string, notify: boolean) => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(function (reg) {
            if (status === "subscribe") {
                reg.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_APPLICATION_SERVER_KEY)
                }).then(function (pushSubscription) {
                    sendToServer(status, pushSubscription, notify)
                }).catch(function (e) {
                    if (Notification.permission === 'denied') {
                        alert('You first need to enable notifications');
                    } else {
                        console.error('Unable to subscribe to push', e);
                    }
                });
            } else {
                reg.pushManager.getSubscription()
                    .then(function (subscription) {
                        subscription.unsubscribe().then(function (successful) {
                            sendToServer(status, subscription, notify)
                        })
                            .catch(err => console.log(err))
                    })
                    .catch(function (err) {
                        console.log(err)
                    });
            }

        })
    }

    function sendToServer(status, pushSubscription, notify) {
        axios({
            method: "post",
            url: `${API_URL}/profile/subscribe`,
            data: {
                status,
                pushSubscription,
                notify
            }
        })
            .catch(function (err) {
                console.log(err)
            });
    }
}

