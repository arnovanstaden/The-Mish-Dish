import { useEffect } from "react";
import { subscribeUserPush } from "../../../utils/pwa";


import Toggle from 'react-toggle'
import "react-toggle/style.css" // for ES6 modules

// Styles
import styles from "./notification-toggle.module.scss";

export default function NotificationToggle() {
    const handleChange = (e) => {
        let status = e.target.checked;
        if (status) {
            subscribeUserPush("subscribe")
        } else {
            subscribeUserPush("unsubscribe")
        }
    }
    return (
        <div className={styles.toggle}>
            <p>New Recipe Notifications</p>
            <Toggle
                onChange={handleChange}
            />
        </div>
    )
}
