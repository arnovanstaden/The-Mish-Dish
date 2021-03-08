import Link from "next/link"

// Styles
import styles from "./recipe.module.scss";

interface IRecipe {
    name: string;
    id: string;
    cooktTime: number;
    prepTime: number;
    recipeThumbnailUrl: string;
    ingredients: {
        [key: number]: string[]
    }
}

export default function Recipe(recipe: IRecipe) {

    return (
        <Link href={`recipes/${recipe.id}`}>
            <a>
                <article className={styles.recipe}>
                    <div className={styles.image}>
                        <img src={recipe.recipeThumbnailUrl} alt={`${recipe.name} Thumbnail`} />
                    </div>
                    <div className={styles.details}>
                        <h3 className={styles.name}>{recipe.name}</h3>
                        <div className={styles.info}>
                            <p>10 Ingredients</p>
                            <div className={styles.stats}>
                                <div className={styles.stat}>
                                    <i className="icon-timer"></i>
                                    <p>30</p>
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
