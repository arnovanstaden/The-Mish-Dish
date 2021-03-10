import { GetStaticProps, GetStaticPaths } from 'next';
import { handleRecipeShare, recentlyViewed } from "../../utils/utils";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link"

// Components
import Layout from "../../components/Layout/Layout"

// Styles
import styles from "../../styles/pages/recipes/[id].module.scss"

export default function Recipe({ recipe }) {
    const router = useRouter();
    const [currentImage, setCurrentImage] = useState(recipe.recipeImageUrls[0]);

    useEffect(() => {
        recentlyViewed.set(recipe.id)
    }, [])

    const Ingredients = () => {
        let ingredients = null;
        if (Object.keys(recipe.ingredients).length === 1) {
            ingredients =
                <ul>
                    {recipe.ingredients[0].map((ingredient, index) => (
                        <li key={index}>
                            <i className="icon-check"></i>
                            {ingredient}
                        </li>
                    ))}
                </ul>
        } else {
            let recipeParts = Object.keys(recipe.ingredients);
            ingredients =
                recipeParts.map((part, index) => (
                    <div key={index}>
                        <h4>{part}:</h4>
                        <ul>
                            {recipe.ingredients[part].map((ingredient, index) => (
                                <li key={index}>
                                    <i className="icon-check"></i>
                                    {ingredient}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
        }
        return ingredients
    }

    const Method = () => {
        let method = null;
        if (Object.keys(recipe.method).length === 1) {
            method =
                <ul>
                    {recipe.method[0].map((step, index) => (
                        <li key={index}>
                            <i>{index + 1}</i>
                            {step}
                        </li>
                    ))}
                </ul>
        } else {
            let recipeParts = Object.keys(recipe.method);
            method =
                recipeParts.map((part, index) => (
                    <div key={index}>
                        <h4>{part}:</h4>
                        <ul>
                            {recipe.method[part].map((step, index) => (
                                <li key={index}>
                                    <i>{index + 1}</i>
                                    {step}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
        }
        return method
    }

    const Tags = () => {
        if (recipe.tags && recipe.tags.length > 0) {
            return (
                recipe.tags.map((tag, index) => (
                    <li key={index} >
                        <Link href={`/recipes?${tag.toLowerCase()}`}>
                            {tag}
                        </Link>
                    </li>
                ))
            )
        } else {
            return null
        }
    }

    // Handlers
    const handleNavigateBack = () => {
        router.back()
    }

    const handleNextImage = () => {
        const imageArray = recipe.recipeImageUrls
        const imageCount = imageArray.length;
        const currentImagePosition = imageArray.indexOf(currentImage);
        if (currentImagePosition < (imageCount - 1)) {
            setCurrentImage(imageArray[currentImagePosition + 1])
        } else {
            setCurrentImage(imageArray[0])
        }
    }


    return (
        <Layout
            head={{
                title: recipe.name,
                description: recipe.description,
                canonical: `/recipes/${recipe.id}`,
                image: recipe.recipeThumbnailUrl
            }}
            classNameProp={styles.recipe}
            noContainer={true}
        >
            <div className={styles.image}>
                <i className="icon-carrot_down" onClick={handleNavigateBack}></i>
                <img src={currentImage} alt={recipe.name} onClick={handleNextImage} onTouchEnd={handleNextImage} />
            </div>
            <div className={styles.content}>
                <div className="container">
                    <div className={styles.intro}>
                        <h1>{recipe.name}</h1>
                        <div className={styles.icons}>
                            <i className="icon-share" onClick={() => handleRecipeShare(recipe.name, recipe.id)}></i>
                            <i className="icon-favorite_outline"></i>
                        </div>
                    </div>
                    <ul className={styles.tags}>
                        <Tags />
                    </ul>
                    <div className={styles.description}>
                        <h3>Description</h3>
                        <p>{recipe.description}</p>
                        {recipe.servingSuggestion ? <p className={styles.suggestion}> {recipe.servingSuggestion} </p> : null}
                    </div>
                    <div className={styles.stats}>
                        <div className={styles.stat}>
                            <i className="icon-servings"></i>
                            <p>{recipe.servings} Servings</p>
                        </div>
                        <div className={styles.stat}>
                            <i className="icon-servings"></i>
                            <p>{recipe.cookTime} Minutes</p>
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
            </div>
        </Layout >
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

export const getStaticPaths: GetStaticPaths = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes`);
    const recipes = await response.json();
    const paths = recipes.map(recipe => `/recipes/${recipe.id}`);
    return { paths, fallback: false }
}


