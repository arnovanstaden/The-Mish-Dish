import { isMobileSafari, isChrome } from "react-device-detect";

// Styles
import styles from "./install-prompt.module.scss";

interface IPrompt {
    handlePromptClose: () => void
}

export default function InstallPrompt({ handlePromptClose }: IPrompt) {
    if (isMobileSafari || isChrome) {
        return (
            <div className={styles.prompt}>
                <div className={styles.content}>
                    <header>
                        <h4>Install The Mish Dish</h4>
                        <p onClick={handlePromptClose}>Cancel</p>
                    </header>
                    <div className={styles.description}>
                        <p>Download to get an app experience with features like offline access, push notifications, screen timeout lock and more!</p>
                    </div>
                    <ul className={styles.instructions}>
                        <li>
                            <i className="icon-ios_share"></i>
                            <p>1. Press the 'Share' Button</p>
                        </li>
                        <li>
                            <i className="icon-add"></i>
                            <p>2. Press 'Add to Home Screen'</p>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
    return null
}
