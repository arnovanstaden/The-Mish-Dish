import { isIOS, isMobileSafari } from "react-device-detect";

// Styles
import styles from "./install-promt.module.scss";

export default function InstallPrompt() {
    if (isIOS || isMobileSafari) {
        return (
            <div>
                is Ios
            </div>
        )
    }
    return null
}
