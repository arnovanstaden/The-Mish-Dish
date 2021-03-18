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
            showInstallModal()
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
                    console.log('A new service worker is being installed:',
                        installingWorker);
                });
            })
            .catch(function (error) {
                console.log('Service worker registration failed:', error);
            });
    } else {
        console.log('Service workers are not supported.');
    }
}

// Notifications - Setup

export const requestNotificationPermission = () => {
    if (Notification) {
        Notification.requestPermission()
    }
}


export const notificationsPermitted = () => {
    if (Notification.permission == 'granted') {
        return true
    } else {
        return false
    }
}

function checkSubscription() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistration()
            .then(function (reg) {
                reg.pushManager.getSubscription()
                    .then(function (subscription) {
                        if (subscription === null) {
                            // Update UI to ask user to register for Push
                            console.log('Not subscribed to push service!');
                        } else {
                            // We have a subscription, update the database
                            console.log('Subscription object: ', subscription);
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
}

export const subscribeUserPush = () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(function (reg) {
            reg.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_APPLICATION_SERVER_KEY)
            }).then(function (sub) {
                // Send Subscription
                axios({
                    method: "post",
                    url: `${API_URL}/profile/subscribe`,
                    data: sub
                })
                    .catch(function (err) {
                        console.log(err)
                    });

            }).catch(function (e) {
                if (Notification.permission === 'denied') {
                    console.warn('Permission for notifications was denied');
                } else {
                    console.error('Unable to subscribe to push', e);
                }
            });
        })
    }
}

// Display Notification


interface INotification {
    title: string;
    text: string;
    action?: {
        action: string;
        title: string;
    }
}


// function sendWelcomeNotification() {
//     let previouslySent = JSON.parse(localStorage.getItem("sendWelcomeNotification"))
//     if (Notification.permission == 'granted' && !previouslySent) {
//         let notification = {
//             title: "New Recipes",
//             text: "You will be notified when new recipes are added to The Mish Dish",
//         }
//         displayNotification(notification);
//         localStorage.setItem("sendWelcomeNotification", JSON.stringify(true))
//     }
// }

