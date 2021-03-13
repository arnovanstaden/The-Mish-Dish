import Link from "next/link";
import { convertImage } from "../../utils/general";
import { getIngredientCount } from "../../utils/recipes";
import ClassNames from "classnames";

// Styles
import styles from "./recipe.module.scss";

interface IRecipeProps {
    recipe: {
        name: string
        id: string
        cookTime: number
        thumbnail: string
        ingredients: {
            [key: number]: string[]
        }
    }
    carouselItem?: boolean
}

export default function Recipe({ recipe, carouselItem }: IRecipeProps) {
    const recipeImage = convertImage(recipe.thumbnail, 600);

    const recipeClasses = ClassNames(
        styles.recipe,
        carouselItem ? styles.carouselItem : null
    )

    return (
        <Link href={`/recipes/${recipe.id}`}>
            <a className={recipeClasses}>
                <article >
                    <div className={styles.image}>
                        <img loading="lazy" src={recipeImage} alt={`${recipe.name} Thumbnail`} />
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
                                    <i className="icon-favorite_outline"></i>
                                    <p>10</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </a>
        </Link>
    )
}
