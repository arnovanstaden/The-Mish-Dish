import { loginUser } from "../../../utils/auth"

// Styles
import styles from "./login.module.scss";

interface ILogin {
    handleLoginSuccess: () => void
}

export default function Login({ handleLoginSuccess }: ILogin) {

    const handleLogin = (e) => {
        e.preventDefault();
        // Validate Email
        const loginData = {
            email: (document.querySelector(`.${styles.form} input[name="email"]`) as HTMLInputElement).value,
            password: (document.querySelector(`.${styles.form} input[name="password"]`) as HTMLInputElement).value
        }

        loginUser(loginData)
            .then(result => {
                console.log(result.status.toString());
                let message = document.getElementsByClassName(styles.message)[0] as HTMLElement;
                message.textContent = result.data.message;
                if (result.status.toString().charAt(0) === "4") {
                    message.classList.add(styles.error)
                } else {
                    handleLoginSuccess()
                }
            })
    }

    return (
        <div className={styles.login}>
            <h1>Login</h1>
            <p>Login to save your favourite recipes.</p>
            <form className={styles.form} name="login-form">
                <div className={styles.group}>
                    <label>Email Address</label>
                    <input type="email" name="email" />
                </div>
                <div className={styles.group}>
                    <label>Password</label>
                    <input type="password" name="password" />
                </div>
                <p className={styles.message}></p>
                <button type="submit" onClick={handleLogin}>Login</button>
            </form>
        </div>
    )
}
