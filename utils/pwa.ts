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



// export const initiateScreenLock = async () => {
//     if ('wakeLock' in navigator) {
//         const requestWakeLock = async () => {
//             let wakeLock = null;

//             try {
//                 wakeLock = await navigator.wakeLock.request();
//                 wakeLock.addEventListener('release', () => {
//                     console.log('Screen Wake Lock released:', wakeLock.released);
//                 });
//                 console.log('Screen Wake Lock released:', wakeLock.released);
//             } catch (err) {
//                 console.error(`${err.name}, ${err.message}`);
//             }
//         };

//         await requestWakeLock();
//     }
// }

export const registerServiceWorker = () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
    }
}