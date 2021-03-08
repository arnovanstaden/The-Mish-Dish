import { GetStaticProps } from 'next';
import Link from "next/link";

// Components
import Layout from "../components/Layout/Layout";
import Search from "../components/UI/Search/Search";
import Recipe from "../components/Recipe/Recipe";

// Styles
import styles from "../styles/pages/recipes.module.scss"

export default function Recipes({ recipes }) {
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
                <div className={styles.option}>
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
                    <Recipe {...recipe} key={index} />
                ))}
            </div>

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
