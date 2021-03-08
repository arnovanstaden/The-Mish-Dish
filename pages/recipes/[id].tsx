import { GetStaticProps, GetStaticPaths } from 'next';

// Styles
import styles from "../../styles/pages/recipes/[id].module.scss"

export default function Recipe({ recipe }) {

    const Ingredients = () => {
        if (Object.keys(recipe.ingredients).length === 1) {
            return (
                <ul>
                    {recipe.ingredients[0].map((ingredient, index) => (
                        <li key={index}>
                            <i className="icon-check"></i>
                            {ingredient}
                        </li>
                    ))}
                </ul>
            )
        } else {
            return null
        }
    }

    const Method = () => {
        if (Object.keys(recipe.method).length === 1) {
            return (
                <ul>
                    {recipe.method[0].map((step, index) => (
                        <li key={index}>
                            <i>{index}</i>
                            {step}
                        </li>
                    ))}
                </ul>
            )
        } else {
            return null
        }
    }


    return (
        <section className={styles.recipe}>
            <div className={styles.image}>
                <img src={recipe.recipeImageUrls[0]} alt="" />
            </div>
            <div className={styles.content}>
                <div className={styles.intro}>
                    <h1>{recipe.name}</h1>
                    <div className={styles.icons}>
                        <i className="icon-share"></i>
                        <i className="icon-favorite_outline"></i>
                    </div>
                </div>
                <div className={styles.tags}>
                    <p>Vegetarian</p>
                    <p>Curry</p>
                </div>
                <div className={styles.description}>
                    <h3>Description</h3>
                    <p>{recipe.description}</p>
                </div>
                <div className={styles.stats}>
                    <div className={styles.stat}>
                        <i className="icon-servings"></i>
                        <p>{recipe.servings} Servings</p>
                    </div>
                    <div className={styles.stat}>
                        <i className="icon-servings"></i>
                        <p>{recipe.cookTime + recipe.prepTime} Minutes</p>
                    </div>
                    <div className={styles.stat}>
                        <i className="icon-favorite_outline"></i>
                        <p>10 Favourites</p>
                    </div>
                </div>
                <div className={styles.ingredients}>
                    <h3>Ingredients</h3>
                    <Ingredients />
                </div>
                <div className={styles.method}>
                    <h3>Method</h3>
                    <Method />
                </div>
            </div>
        </section>
    )
}





export const getStaticProps: GetStaticProps = async ({ params }) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes/${params.id}`);
    const recipe = await response.json();
    return {
        props: {
            recipe,
        },
    }
}

export async function getStaticPaths() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes`);
    const recipes = await response.json();
    const paths = recipes.map(recipe => `/recipes/${recipe.id}`);
    return { paths, fallback: false }
}


