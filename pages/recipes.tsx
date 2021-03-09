import { GetStaticProps } from 'next';
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import queryString from "query-string"
import { filterSearch } from "../utils/utils"

// Components
import Layout from "../components/Layout/Layout";
import Search from "../components/UI/Search/Search";
import Recipe from "../components/Recipe/Recipe";
import Filter from "../components/Filter/Filter";

// Styles
import styles from "../styles/pages/recipes.module.scss"

export default function Recipes({ allRecipes }) {
    const [showFilter, setShowFilter] = useState(false);
    const [recipes, setRecipes] = useState(allRecipes);

    // Handlers
    const handleFilterShow = () => {
        setShowFilter(!showFilter)
    }

    // Search
    const executeSearch = () => {
        if (location.search) {
            const searchTerm = location.search.replace("?", "").toLowerCase();
            const result = filterSearch(allRecipes, searchTerm);
            setRecipes(result);
        }
    }

    const handleSearch = (searchTerm: string) => {
        const result = filterSearch(allRecipes, searchTerm);
        setRecipes(result);
    }

    useEffect(() => {
        executeSearch();
    }, []);



    return (
        <Layout
            head={{
                title: "Recipes | The Mish Dish",
                description: "A personal catalogue of some of Mish's personally created, go-to dishes - no life story included.",
                canonical: "/"
            }}
            classNameProp={styles.recipes}
        >
            <h1>Find Recipes</h1>
            <Search handleSearch={(searchTerm) => handleSearch(searchTerm)} />

            <div className={styles.options}>
                <div className={styles.option} onClick={handleFilterShow}>
                    <i className="icon-filter"></i>
                    <p>Filter Recipes</p>
                </div>
                <div className={styles.option}>
                    <p>Sort by: <span>Recently Added</span></p>
                    <i className="icon-carrot_down"></i>
                </div>
            </div>

            <div className={styles.grid}>
                {recipes.map((recipe, index) => (
                    <Recipe recipe={recipe} key={index} />
                ))}
            </div>
            <Filter recipes={recipes} showFilter={showFilter} handleFilterShow={handleFilterShow} />
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
