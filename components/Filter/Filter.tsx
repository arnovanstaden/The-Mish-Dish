import ClassNames from "classnames";
import { useState } from "react";
import { getCookingTimes } from "../../utils/utils";


// Components
import FilterSlider from "../UI/FilterSlider/FilterSlider";

// Styles
import styles from "./filter.module.scss";

interface IFilter {
    recipes: any
    showFilter?: boolean,
    handleFilterShow: () => void,
    handleFilterApply: (filters) => void
}

export default function Filter({ recipes, showFilter, handleFilterShow, handleFilterApply }: IFilter) {
    const recipeTimes = getCookingTimes(recipes);
    const [sliderValue, setSliderValue] = useState(recipeTimes.min)

    const toggleFilter = (e) => {
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
                    <li data-attribute="tag" key={index} onClick={(e) => toggleFilter(e)}>{tag}</li>
                ))}
            </ul>
        )
    }

    // Handlers
    const handleFilter = () => {
        // Get all Filter Values
        let filters = {
            type: [],
            diet: [],
            tag: []
        }
        let activeFilters = Array.from(document.getElementsByClassName(styles.active) as HTMLCollection);
        activeFilters.forEach(item => {
            filters[item.attributes["data-attribute"].value].push(item.textContent.toLowerCase());
        })
        handleFilterShow()
        console.log(filters)
        handleFilterApply(filters)
    }


    const handleClear = () => {
        let activeFilters = Array.from(document.getElementsByClassName(styles.active) as HTMLCollection);
        activeFilters.forEach(element => element.classList.remove(styles.active))
        setSliderValue(recipeTimes.min)
    }

    const handleSliderChange = (value) => {
        setSliderValue(value);
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
                        <ul className={styles.options}>
                            {mealTypes.map((type, index) => (
                                <li data-attribute="type" key={index} onClick={(e) => toggleFilter(e)}>{type}</li>
                            ))}
                        </ul>
                    </div>
                    <div className={styles.group}>
                        <h3>Dietary Requirements</h3>
                        <ul className={styles.options}>
                            {dietRequirements.map((item, index) => (
                                <li data-attribute="diet" key={index} onClick={(e) => toggleFilter(e)}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div className={styles.group}>
                        <h3>Cooking Time</h3>
                        <FilterSlider
                            recipeTimes={recipeTimes}
                            value={sliderValue}
                            handleSliderChange={(value) => handleSliderChange(value)} />
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
