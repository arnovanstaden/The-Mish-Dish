import { useState, useEffect } from "react";
import Router from "next/router"
import { getUserName, getUser, logoutUser, checkLoggedIn } from "../utils/user";

// Components
import Layout from "../components/Layout/Layout";
import Login from "../components/UI/Login/Login";

// Styles
import styles from "../styles/pages/settings.module.scss"

export default function settings() {
    const [user, setUser] = useState(undefined);
    const [showLogin, setShowLogin] = useState(false)

    useEffect(() => {
        if (checkLoggedIn()) {
            getUser()
                .then(result => {
                    setUser(result);
                })
                .catch(err => console.log(err))
        }
    }, [])

    // Handlers
    const handleLogout = () => {
        logoutUser();
        setUser(undefined);
        // Router.reload()
    }

    const handleLoginSuccess = (profile) => {
        setShowLogin(false);
        setUser(profile)
    }

    const handleAccordion = (e) => {
        let content = e.target.parentNode.nextElementSibling as HTMLElement;
        content.classList.toggle(styles.closed)
    }

    // Components
    const User = () => {
        return (
            <div className={styles.profile}>
                <p><span>Name:</span> {user.name}</p>
                <p><span>Email:</span> {user.email}</p>
                <p><span>Foodie Since:</span> {user.createdAt.substr(0, 10)}</p>
                <p><span>Favourites:</span> {user.favourites.length}</p>
            </div>
        )
    }

    return (
        <Layout
            head={{
                title: "Recipes | The Mish Dish",
                description: "A personal catalogue of some of Mish's personally created, go-to dishes - no life story included.",
                canonical: "/recipes"
            }}
            classNameProp={styles.settings}
        >
            <div>
                <h1>Settings</h1>
                <h3>Profile</h3>
                {user ? <User /> : null}
                {user ? <button onClick={handleLogout}>Logout</button> : <button onClick={() => setShowLogin(true)}>Login</button>}

            </div>

            <div className={styles.accordion}>
                <div className={styles.heading} onClick={(e) => handleAccordion(e)}>
                    <p>About The Mish Dish</p>
                </div>
                <div className={`${styles.content} ${styles.closed}`}>
                    <p>My name is Mish. I am not a professional chef and I have no education or background in either cooking or nutrition. I am merely your every day gal with a passion for cooking and creating dishes  which are: affordable, easy to make, my personal opinion of healthy, made from your every day fridge ingredients and full of flavor.  That is why I created ‘The Mish Dish’ - a personal catalogue of some of my favorite, personally created, go-to dishes. Enjoy!</p>
                </div>
            </div>

            { showLogin ? <Login handleLoginSuccess={handleLoginSuccess} /> : null}
        </Layout >
    )
}
