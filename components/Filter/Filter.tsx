import ClassNames from "classnames";
import { useState } from "react";

// Components
import FilterSlider from "../UI/FilterSlider/FilterSlider";

// Styles
import styles from "./filter.module.scss";

interface IFilter {
    recipes: any
    showFilter?: boolean,
    handleFilterShow: () => void
}

export default function Filter({ recipes, showFilter, handleFilterShow }: IFilter) {
    const [filters, setFilters] = useState()

    const toggleActive = (e) => {
        let item = e.target as HTMLElement;
        item.classList.toggle(styles.active);

    }

    const mealTypes = ["Main Meal", "Light Meal", "Side Dish", "Breakfast"];
    const dietRequirements = ["Vegetarian", "Vegan"];

    const filterClasses = ClassNames(
        styles.filter,
        showFilter ? styles.show : null
    );

    const Tags = () => {
        let tags = [];
        recipes.forEach(recipe => {
            if (recipe.tags) {
                recipe.tags.forEach(tag => {
                    tags.includes(tag) || mealTypes.includes(tag) ? null : tags.push(tag)
                })
            }
        })
        return (
            <ul className={styles.options}>
                {tags.map((tag, index) => (
                    <li key={index} onClick={(e) => toggleActive(e)}>{tag}</li>
                ))}
            </ul>
        )
    }

    return (
        <section className={filterClasses}>
            <div className="container">
                <div className={styles.nav}>
                    <i className="icon-carrot_down" onClick={handleFilterShow}></i>
                    <p>Clear</p>
                </div>
                <h2>Filter Recipes</h2>
                <div className={styles.group}>
                    <h3>Meal Type</h3>
                    <ul className={styles.options}>
                        {mealTypes.map((type, index) => (
                            <li key={index} onClick={(e) => toggleActive(e)}>{type}</li>
                        ))}
                    </ul>
                </div>
                <div className={styles.group}>
                    <h3>Dietary Requirements</h3>
                    <ul className={styles.options}>
                        {dietRequirements.map((tiem, index) => (
                            <li key={index} onClick={(e) => toggleActive(e)}>{tiem}</li>
                        ))}
                    </ul>
                </div>
                <div className={styles.group}>
                    <h3>Cooking Time</h3>
                    <FilterSlider recipes={recipes} />
                </div>
                <div className={styles.group}>
                    <h3>Additional Preferences</h3>
                    <Tags />
                </div>
            </div>
        </section >
    )
}
