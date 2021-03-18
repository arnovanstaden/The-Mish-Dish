import React from 'react';

import styles from "./install.module.scss";

export default function Install() {

    const hide = () => {
        let modal = document.getElementsByClassName(styles.install)[0] as HTMLElement;
        modal.classList.remove(styles.show)
        localStorage.setItem("showedAppInstallShow", JSON.stringify(true))
    }

    return (
        <div className={styles.install}>
            <img src="/images/Logo.svg" alt="" />
            <h5>The Mish Dish is now available as an app!</h5>
            <p>Download to get an app experience with features like offline access, push notifications, screen timeout lock and more!</p>
            <div className={styles.options}>
                <button onClick={hide}>
                    No Thanks
                </button>
                <button id="install-button">
                    <i className="icon-install"></i>
                    Install App
            </button>
            </div>
        </div>
    )
}
