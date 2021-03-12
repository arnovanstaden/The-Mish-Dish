import ClassNames from "classnames";
import { useEffect } from "react";
import { capitalize } from "../../utils/utils";
// Styles
import styles from "./filter.module.scss";

interface IFilter {
    recipes: any
    showFilter?: boolean,
    currentFilters: null | {
        type: string[],
        tags: string[],
        diet: string[],
        cookingTime: number,
    }
    handleFilterShow: () => void,
    handleFilterApply: (filters) => void,
    cancelFilter: () => void
}

export default function Filter({ recipes, showFilter, currentFilters, handleFilterShow, handleFilterApply, cancelFilter }: IFilter) {
    const mealTypes = ["Main Meal", "Light Meal", "Side Dish", "Breakfast"];
    const dietRequirements = ["Vegetarian", "Vegan"];

    // Handlers

    useEffect(() => {
        loadFilters()
    }, [showFilter])

    const toggleFilter = (e) => {
        let item = e.target as HTMLElement;
        item.classList.toggle(styles.active);
    }

    const handleFilter = () => {
        // Get all Filter Values
        let filters = {
            type: [],
            diet: [],
            tags: [],
        }
        let activeFilters = Array.from(document.getElementsByClassName(styles.active) as HTMLCollection);
        activeFilters.forEach(item => {
            filters[item.attributes["data-type"].value].push(item.textContent.toLowerCase());
        })
        handleFilterShow()
        handleFilterApply(filters)
    }


    const handleClear = () => {
        let activeFilters = Array.from(document.getElementsByClassName(styles.active) as HTMLCollection);
        activeFilters.forEach(element => element.classList.remove(styles.active))
        cancelFilter()
    }

    const loadFilters = () => {
        if (currentFilters) {
            let filterOptions = Object.keys(currentFilters);
            filterOptions.forEach(option => {
                // Find Element
                currentFilters[option].forEach(filterItem => {
                    let matchingElement = document.querySelector(`li[data-type="${option}"][data-value="${filterItem}"]`) as HTMLElement;
                    if (matchingElement) {
                        matchingElement.classList.add(styles.active)
                    }
                })
            });
        }
    }
    // Components

    const filterClasses = ClassNames(
        styles.filter,
        showFilter ? styles.show : null
    );


    const MealTypes = () => {
        let mealTypes = [];
        recipes.forEach(recipe => {
            mealTypes.includes(recipe.type) ? null : mealTypes.push(recipe.type)

        })
        return (
            <ul className={styles.options}>
                {mealTypes.map((type, index) => (
                    <li data-type="type" data-value={type} key={index} onClick={(e) => toggleFilter(e)}>{capitalize(type)}</li>
                ))}
            </ul>
        )
    }

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
                    <li data-type="tags" data-value={tag.toLowerCase()} key={index} onClick={(e) => toggleFilter(e)}>{capitalize(tag)}</li>
                ))}
            </ul>
        )
    }

    return (
        <section className={filterClasses}>
            <div className="container">
                <div className={styles.upper}>
                    <div className={styles.nav}>
                        <i className="icon-carrot_down" onClick={handleFilterShow}></i>
                        <p onClick={handleClear}>Clear</p>
                    </div>
                    <h2>Filter Recipes</h2>
                    <div className={styles.group}>
                        <h3>Meal Type</h3>
                        <MealTypes />
                    </div>
                    <div className={styles.group}>
                        <h3>Dietary Requirements</h3>
                        <ul className={styles.options}>
                            {dietRequirements.map((diet, index) => (
                                <li data-type="diet" data-value={diet.toLowerCase()} key={index} onClick={(e) => toggleFilter(e)}>{diet}</li>
                            ))}
                        </ul>
                    </div>
                    <div className={styles.group}>
                        <h3>Additional Preferences</h3>
                        <Tags />
                    </div>
                </div>
                <div className={styles.button}>
                    <button onClick={handleFilter}>Apply Filter</button>
                </div>
            </div>
        </section >
    )
}
