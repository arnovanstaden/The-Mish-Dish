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
        Router.reload()
    }

    const handleLoginSuccess = (profile) => {
        setShowLogin(false);
        setUser(profile)
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
                {user ? <button onClick={logoutUser}>Logout</button> : <button onClick={() => setShowLogin(true)}>Login</button>}

            </div>
            {showLogin ? <Login handleLoginSuccess={handleLoginSuccess} /> : null}
        </Layout>
    )
}
