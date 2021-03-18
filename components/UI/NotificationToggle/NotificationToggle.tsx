import { useEffect, useState } from "react";
import { handleUserSubscription, checkSubscription } from "../../../utils/pwa";


import Toggle from 'react-toggle'
import "react-toggle/style.css" // for ES6 modules

// Styles
import styles from "./notification-toggle.module.scss";

export default function NotificationToggle() {
    const [status, setStatus] = useState(false);

    const handleChange = (e) => {
        let newStatus = e.target.checked
        setStatus(newStatus)
        if (newStatus) {
            handleUserSubscription("subscribe", true)
        } else {
            handleUserSubscription("unsubscribe", false)
        }
    }

    useEffect(() => {
        checkSubscription().then(currentStatus => {
            setStatus(currentStatus)
        })
    }, [])

    return (
        <div className={styles.toggle}>
            <p>New Recipe Notifications</p>
            <Toggle
                onChange={handleChange}
                checked={status}
            />
        </div>
    )
}
