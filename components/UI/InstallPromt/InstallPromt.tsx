import { isIOS } from "react-device-detect";

// Styles
import styles from "./install-promt.module.scss";

export default function InstallPromt() {
    if (isIOS) {
        return (
            <div>
                is Ios
            </div>
        )
    }
    return null
}
