import Link from "next/link";
import { convertImage } from "../../utils/utils";
import ClassNames from "classnames";

// Styles
import styles from "./recipe.module.scss";

interface IRecipe {
    name: string;
    id: string;
    cookTime: number;
    prepTime: number;
    recipeThumbnailUrl: string;
    ingredients: {
        [key: number]: string[]
    };
    key: number;
    carouselItem: boolean
}

export default function Recipe(recipe: IRecipe) {
    // const recipeImage = convertImage(recipe.recipeThumbnailUrl, 400);
    const recipeImage = recipe.recipeThumbnailUrl;

    const recipeClasses = ClassNames(
        styles.recipe,
        recipe.carouselItem ? styles.carouselItem : null
    )

    return (
        <Link href={`/recipes/${recipe.id}`}>
            <a>
                <article className={recipeClasses}>
                    <div className={styles.image}>
                        <img loading="lazy" src={recipeImage} alt={`${recipe.name} Thumbnail`} />
                    </div>
                    <div className={styles.details}>
                        <h3 className={styles.name}>{recipe.name}</h3>
                        <div className={styles.info}>
                            <p>10 Ingredients</p>
                            <div className={styles.stats}>
                                <div className={styles.stat}>
                                    <i className="icon-timer"></i>
                                    <p>{recipe.cookTime + recipe.prepTime}</p>
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
