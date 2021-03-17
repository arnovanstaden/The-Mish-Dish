import { GetStaticProps, GetStaticPaths } from 'next';
import { handleRecipeShare, capitalize, convertImage } from "../../utils/general";
import { checkLoggedIn, updateFavourite, checkIfFavourite } from "../../utils/user";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useMediaQuery } from 'react-responsive';
import Image from "next/image"


// Components
import Layout from "../../components/Layout/Layout"
import Login from "../../components/UI/Login/Login"

// Styles
import styles from "../../styles/pages/recipes/[id].module.scss"

export default function Recipe({ recipe }) {
    let [isFavourite, setIsFavourite] = useState(undefined)
    const [currentImage, setCurrentImage] = useState(recipe.images[0]);
    const [showLogin, setShowLogin] = useState(false)

    const router = useRouter();

    const isMobileDevice = useMediaQuery({ query: '(max-width: 768px)' });

    useEffect(() => {
        setIsFavourite(checkIfFavourite(recipe.id));
    }, [])

    // Handlers
    const handleNavigateBack = () => {
        router.back()
    }

    const handleNextImage = () => {
        const imageArray = recipe.images
        const imageCount = imageArray.length;
        const currentImagePosition = imageArray.indexOf(currentImage);
        if (currentImagePosition < (imageCount - 1)) {
            setCurrentImage(imageArray[currentImagePosition + 1])
        } else {
            setCurrentImage(imageArray[0])
        }
        console.log(currentImage)
    }

    const handleFavourite = (id) => {
        if (checkLoggedIn()) {
            updateFavourite(id);
            setIsFavourite(!isFavourite);
            return
        }
        return setShowLogin(true)
    }


    const handleLoginSuccess = () => {
        setShowLogin(false);
        handleFavourite(recipe.id)
    }

    // Components

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
        return (
            <div className={styles.ingredients}>
                <h3>Ingredients</h3>
                {ingredients}
            </div>
        )
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
        return (
            <div className={styles.method}>
                <h3>Method</h3>
                {method}
            </div>
        )
    }

    const Tags = () => {
        if (recipe.tags && recipe.tags.length > 0) {
            return (
                recipe.tags.map((tag, index) => (
                    <li key={index} >
                        <Link href={`/recipes?${tag.toLowerCase()}`}>
                            {capitalize(tag)}
                        </Link>
                    </li>
                ))
            )
        } else {
            return null
        }
    }

    const Images = () => {
        return (
            <div className={styles.image}>
                {isMobileDevice
                    // ? <img src={convertImage(currentImage, 600)} alt={recipe.name} onClick={handleNextImage} onTouchEnd={handleNextImage} />
                    ? <Image src={currentImage} alt={recipe.name} width={500} height={"auto"} priority quality={60} onClick={handleNextImage} />
                    : <Image src={currentImage} alt={recipe.name} layout="fill" objectFit="cover" objectPosition="center center" priority quality={60} />
                }
                <i className="icon-carrot_down" onClick={isMobileDevice ? handleNavigateBack : handleNextImage}></i>
            </div>
        )
    }

    const Details = () => {
        return (
            <div className={styles.details}>
                <div className={styles.intro}>
                    <h1>{recipe.name}</h1>
                    <div className={styles.icons}>
                        <i className="icon-share" onClick={() => handleRecipeShare(recipe.name, recipe.id)}></i>
                        {isFavourite
                            ? <i className="icon-favorite" onClick={() => handleFavourite(recipe.id)}></i>
                            : <i className="icon-favorite_outline" onClick={() => handleFavourite(recipe.id)}></i>}
                    </div>
                </div>
                <ul className={styles.tags}>
                    <li>
                        <Link href={`/recipes?${recipe.type.toLowerCase()}`}>
                            {capitalize(recipe.type)}
                        </Link>
                    </li>
                    <li>
                        <Link href={`/recipes?${recipe.diet.toLowerCase()}`}>
                            {capitalize(recipe.diet)}
                        </Link>
                    </li>
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
                        <p>{recipe.favourites} Favourites</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <Layout
            head={{
                title: recipe.name,
                description: recipe.description,
                canonical: `/recipes/${recipe.id}`,
                image: recipe.thumbnail
            }}
            classNameProp={styles.recipe}
            noContainer={true}
        >

            {isMobileDevice
                ?
                <>
                    <Images />
                    <div className={styles.content}>
                        <div className="container">
                            <Details />
                            <Ingredients />
                            <Method />
                        </div>
                    </div>
                </>
                :
                <div className="container">
                    <div className={styles.grid}>
                        <div className={styles.row}>
                            <Details />
                            <Images />
                        </div>
                        <div className={styles.row}>
                            <Ingredients />
                            <Method />
                        </div>
                    </div>
                </div>
            }
            {showLogin ? <Login handleLoginSuccess={handleLoginSuccess} /> : null}
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


