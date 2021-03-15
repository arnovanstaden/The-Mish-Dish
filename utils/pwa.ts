
export const installPrompt = () => {
    console.log("Checking: PWA Install Prompt")
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
        alert("showing install modal")

    }
}