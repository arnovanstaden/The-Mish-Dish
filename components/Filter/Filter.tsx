import ClassNames from "classnames";

// Styles
import styles from "./filter.module.scss";

interface IFilter {
    showFilter?: boolean,
    handleFilterShow: () => void
}

export default function Filter({ showFilter, handleFilterShow }: IFilter) {
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

                </div>
                <div className={styles.group}>
                    <h3>Additional Preferences</h3>
                </div>
            </div>
        </section >
    )
}
