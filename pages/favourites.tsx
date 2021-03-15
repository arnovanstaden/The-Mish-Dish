import { GetStaticProps, GetServerSideProps } from 'next';
import { useState, useEffect } from "react";
import { checkLoggedIn, getUserName, getFavouritesList } from "../utils/user";
import { searchRecipes, getFullRecipes } from "../utils/recipes"

// Components
import Layout from "../components/Layout/Layout";
import Search from "../components/UI/Search/Search";
import Recipe from "../components/Recipe/Recipe";
import Login from "../components/UI/Login/Login";

// Styles
import styles from "../styles/pages/favourites.module.scss"

export default function Favourites({ allRecipes }) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [favourites, setFavourites] = useState(undefined);
    const [userName, setUserName] = useState(undefined);
    const [searchResults, setSearchResults] = useState(undefined)



    useEffect(() => {
        const isLoggedIn = checkLoggedIn()
        setLoggedIn(isLoggedIn);
        if (isLoggedIn) {
            setUserName(transformUserName());
        }
        const favouritesList = getFavouritesList()
        if (favouritesList) {
            setFavourites(getFullRecipes(allRecipes, favouritesList))
        }
    }, [])

    // Utils
    const transformUserName = (): string => {
        let savedUsername = getUserName()
        let lastChar = savedUsername.charAt(savedUsername.length - 1);
        if (lastChar === "s") {
            return `${savedUsername}'`
        }
        return `${savedUsername}'s`
    }

    // Handlers

    const handleLoginSuccess = (profile) => {
        setLoggedIn(true);
        setUserName(transformUserName())
        setFavourites(getFullRecipes(allRecipes, profile.favourites))
    }

    const handleInstantSearch = (searchTerm: string) => {
        const result = searchRecipes(favourites, searchTerm);
        console.log(result)
        return setSearchResults(result);
    }

    return (
        <Layout
            head={{
                title: "Favourites | The Mish Dish",
                description: "A personal catalogue of some of Mish's personally created, go-to dishes - no life story included.",
                canonical: "/favourites",
                robots: false
            }}
            classNameProp={styles.favourites}
        >
            {loggedIn ?
                <>
                    <h1>{userName} Favourites</h1>
                    <Search handleInstantSearch={(searchTerm) => handleInstantSearch(searchTerm)} />
                    <div className={styles.grid}>
                        {searchResults
                            ? searchResults.map((result, index) => (
                                <Recipe recipe={result} key={index} />
                            ))
                            : null
                        }
                        {!searchResults && favourites ?
                            favourites.map((favourite, index) => (
                                <Recipe recipe={favourite} key={index} />
                            ))
                            : null}
                        {favourites && favourites.length > 0 ? null : <p> You don't have any favourites yet :(</p>}
                    </div>
                </>
                : <Login handleLoginSuccess={handleLoginSuccess} />}
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

// export const getServerSideProps: GetServerSideProps = async () => {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes`);

//     let allRecipes = await response.json();
//     allRecipes = [...allRecipes].reverse()

//     return {
//         props: {
//             allRecipes
//         },
//     }
// }
