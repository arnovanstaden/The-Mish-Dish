import { GetStaticProps } from 'next';
import { useState, useEffect } from "react";
import { checkLoggedIn, getCookie } from "../utils/auth";


// Components
import Layout from "../components/Layout/Layout";
import Search from "../components/UI/Search/Search";
import Recipe from "../components/Recipe/Recipe";
import Login from "../components/UI/Login/Login";

// Styles
import styles from "../styles/pages/recipes.module.scss"

export default function Favourites({ allRecipes }) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [favourites, setfavourites] = useState([false]);
    const [username, setUsername] = useState(undefined);

    const getUserName = (): string => {
        let savedUsername = getCookie("TMDName");
        let lastChar = savedUsername.charAt(savedUsername.length - 1);
        if (lastChar === "s") {
            return `${savedUsername}'`
        }
        return `${savedUsername}'s`
    }

    useEffect(() => {
        setLoggedIn(checkLoggedIn());
        if (loggedIn && !username) {
            setUsername(getUserName())
        }
    })

    const handleLoginSuccess = () => {
        setLoggedIn(true);
        setUsername(getUserName())
        // Get Favourites
    }


    return (
        <Layout
            head={{
                title: "Favourites | The Mish Dish",
                description: "A personal catalogue of some of Mish's personally created, go-to dishes - no life story included.",
                canonical: "/favourites",
                robots: false
            }}
            classNameProp={styles.recipes}
        >

            <h1>{username} Favourites</h1>
            <Search reroute />
            <div className={styles.options}>
                <div className={styles.option}>
                    <p>Sort by: <span>Recently Added</span></p>
                    <i className="icon-carrot_down"></i>
                </div>
            </div>

            <div className={styles.grid}>

            </div>
            {loggedIn ? null : <Login handleLoginSuccess={handleLoginSuccess} />}
        </Layout >
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes`);
    let allRecipes = await response.json();
    allRecipes = [...allRecipes].reverse()

    return {
        props: {
            allRecipes
        },
    }
}
