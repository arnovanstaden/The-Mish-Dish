import { useState } from "react";
import { loginUser, registerUser } from "../../../utils/user";

// Styles
import styles from "./login.module.scss";

interface ILogin {
    handleLoginSuccess: (profile) => void
}

export default function Login({ handleLoginSuccess }: ILogin) {
    const [register, setRegister] = useState(false);
    const [forgotPassword, setforgotPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const showMessage = (message: string, status: string) => {
            let messageElem = document.getElementsByClassName(styles.message)[0] as HTMLElement;
            messageElem.textContent = message
            messageElem.classList.add(styles[status])
        }

        let form = document.getElementById("login-form") as HTMLFormElement;

        if (form.checkValidity() === false) {
            return showMessage("Please complete all fields.", "error")
        }
        else {
            const credentials = {
                email: (document.querySelector(`.${styles.form} input[name="email"]`) as HTMLInputElement).value.toLowerCase(),
                password: (document.querySelector(`.${styles.form} input[name="password"]`) as HTMLInputElement).value,
                name: register ? (document.querySelector(`.${styles.form} input[name="name"]`) as HTMLInputElement).value : undefined
            }

            if (register) {
                registerUser(credentials)
                    .then(result => {
                        if (result.status.toString().charAt(0) === "4") {
                            showMessage(result.data.message, "error")
                        } else {
                            handleLoginSuccess(result.data.profile)
                        }
                    })
            } else {
                loginUser(credentials)
                    .then(result => {
                        if (result.status.toString().charAt(0) === "4") {
                            showMessage(result.data.message, "error")
                        } else {
                            handleLoginSuccess(result.data.profile)
                        }
                    })
            }
        }
    }

    return (
        <div className={styles.login}>
            <h1>{register ? "Register" : "Login"}</h1>
            <p>{register ? "Register" : "Login"} to save your favourite recipes.</p>
            <form className={styles.form} name="login-form" id="login-form">
                {register ?
                    <div className={styles.group}>
                        <label>Your Name</label>
                        <input type="text" name="name" />
                    </div>
                    : null}
                <div className={styles.group}>
                    <label>Email Address</label>
                    <input type="email" name="email" />
                </div>
                <div className={styles.group}>
                    <label>Password</label>
                    <input type="password" name="password" />
                </div>
                <p className={styles.message}></p>
                <button type="submit" onClick={handleSubmit}>{register ? "Register" : "Login"}</button>
            </form>
            <div className={styles.options}>
                <p onClick={() => setRegister(!register)}>{register ? "Login" : "Register"}</p>
                {register ? null :
                    <>
                        <span>|</span>
                        <p onClick={() => setRegister(!register)}>Forgot Password?</p>
                    </>
                }
            </div>
        </div>
    )
}
