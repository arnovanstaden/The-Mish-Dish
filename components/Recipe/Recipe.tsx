import Link from "next/link";
import { convertImage } from "../../utils/general";
import { getIngredientCount } from "../../utils/recipes";
import { checkIfFavourite } from "../../utils/user"
import ClassNames from "classnames";
import { useEffect, useState } from "react"
// Styles
import styles from "./recipe.module.scss";

interface IRecipeProps {
    recipe: {
        name: string
        id: string
        cookTime: number
        thumbnail: string,
        favourites: number,
        ingredients: {
            [key: number]: string[]
        },
    }
    carouselItem?: boolean
}

export default function Recipe({ recipe, carouselItem }: IRecipeProps) {
    let [isFavourite, setIsFavourite] = useState(undefined)

    const recipeClasses = ClassNames(
        styles.recipe,
        carouselItem ? styles.carouselItem : null
    )

    useEffect(() => {
        setIsFavourite(checkIfFavourite(recipe.id));
    }, [])

    return (
        <Link href={`/recipes/${recipe.id}`}>
            <a className={recipeClasses}>
                <article >
                    <div className={styles.image}>
                        <img loading="lazy" src={recipe.thumbnail} alt={`${recipe.name} Thumbnail`} />
                    </div>
                    <div className={styles.details}>
                        <h3 className={styles.name}>{recipe.name}</h3>
                        <div className={styles.info}>
                            <p>{getIngredientCount(recipe.ingredients)} Ingredients</p>
                            <div className={styles.stats}>
                                <div className={styles.stat}>
                                    <i className="icon-timer"></i>
                                    <p>{recipe.cookTime}</p>
                                </div>
                                <div className={styles.stat}>
                                    {isFavourite ? <i className="icon-favorite"></i> : <i className="icon-favorite_outline"></i>}
                                    <p>{recipe.favourites} </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </a>
        </Link>
    )
}
