import installStyles from "../components/UI/Install/install.module.scss"

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