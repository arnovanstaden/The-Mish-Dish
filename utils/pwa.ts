import installStyles from "../components/UI/Install/install.module.scss"

export const installPrompt = () => {
    console.log("Install Prompt")
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
        console.log("Asking to Install")
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

export const notificationPermission = () => {
    Notification.requestPermission(function (status) {
        console.log('Notification permission status:', status);
        if (Notification.permission == 'granted') {
            displayNotification()
        }
    });
}

export const displayNotification = () => {
    navigator.serviceWorker.getRegistration().then(function (reg) {
        const options = {
            body: 'You will be notified when new recipes are added to The Mish Dish.',
            icon: '/images/Logo.png',
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: 1
            }
        };
        reg.showNotification('New Recipes', options);
    });
}

