import ClassNames from "classnames";
import { useState } from "react"

// Components
import FilterSlider from "../UI/FilterSlider/FilterSlider";

// Styles
import styles from "./filter.module.scss";

interface IFilter {
    showFilter?: boolean,
    handleFilterShow: () => void
}

export default function Filter({ showFilter, handleFilterShow }: IFilter) {
    const [state, setState] = useState({ x: 10 });

    const filterClasses = ClassNames(
        styles.filter,
        showFilter ? styles.show : null
    );

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
                        <li>
                            Main Meal
                        </li>
                        <li>
                            Light Meal
                        </li>
                        <li>
                            Breakfast
                        </li>
                        <li>
                            Dessert
                        </li>
                    </ul>
                </div>
                <div className={styles.group}>
                    <h3>Dietary Requirements</h3>
                    <ul className={styles.options}>
                        <li>
                            Vegetarian
                            </li>
                        <li>
                            Vegan
                            </li>
                    </ul>
                </div>
                <div className={styles.group}>
                    <h3>Cooking Time</h3>
                    <FilterSlider />
                </div>
                <div className={styles.group}>
                    <h3>Additional Preferences</h3>
                </div>
            </div>
        </section >
    )
}
