import installStyles from "../components/UI/Install/install.module.scss"

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
    }
}



export const requestNotificationPermission = () => {
    Notification.requestPermission(function (status) {
        sendWelcomeNotification()
    });
}

function sendWelcomeNotification() {
    let previouslySent = JSON.parse(localStorage.getItem("sendWelcomeNotification"))
    if (Notification.permission == 'granted' && !previouslySent) {
        let notification = {
            title: "New Recipes",
            text: "You will be notified when new recipes are added to The Mish Dish",
        }
        displayNotification(notification);
        localStorage.setItem("sendWelcomeNotification", JSON.stringify(true))
    }
}

export const getNotificationPermission = () => {
    if (Notification.permission == 'granted') {
        return true
    } else {
        return false
    }
}

interface INotification {
    title: string;
    text: string;
    action?: {
        action: string;
        title: string;
    }
}

export const displayNotification = ({ title, text, action }: INotification) => {
    navigator.serviceWorker.getRegistration().then(function (reg) {
        const options = {
            body: text,
            icon: '/images/logo-transparent-small.png',
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: 1
            },
            // actions: [
            //     action
            // ]
        };
        reg.showNotification(title, options);
    });
}

