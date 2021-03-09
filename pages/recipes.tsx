import { GetStaticProps } from 'next';
import Link from "next/link";
import { useState } from "react";

// Components
import Layout from "../components/Layout/Layout";
import Search from "../components/UI/Search/Search";
import Recipe from "../components/Recipe/Recipe";
import Filter from "../components/Filter/Filter";

// Styles
import styles from "../styles/pages/recipes.module.scss"

export default function Recipes({ recipes }) {
    const [showFilter, setShowFilter] = useState(false);

    // Initial Sort; Recently Added
    const allRecipes = [...recipes].reverse();

    // Handlers
    const handleFilterShow = () => {
        setShowFilter(!showFilter)
    }

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
            <Search />

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
                {allRecipes.map((recipe, index) => (
                    <Recipe recipe={recipe} key={index} />
                ))}
            </div>
            <Filter showFilter={showFilter} handleFilterShow={handleFilterShow} />
        </Layout >
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes`);
    const recipes = await response.json();

    return {
        props: {
            recipes
        },
    }
}
