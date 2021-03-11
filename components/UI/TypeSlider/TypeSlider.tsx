import Slider from "react-slick";

// Styles
import styles from "./type-slider.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ISlider {
    handleTypeCarousel: (type) => void
}

export default function TypeSlider({ handleTypeCarousel }: ISlider) {

    const handleClick = (e) => {

        // Handle Styles
        const selectedType = e.target
        let typeList = Array.from(document.getElementsByClassName(styles.type) as HTMLCollection);
        typeList.forEach(type => {
            type.classList.remove(styles.active)
        })
        selectedType.classList.add(styles.active)

        handleTypeCarousel(selectedType.textContent)
    }



    return (
        <div className={styles.list}>
            <h3 className={`${styles.active} ${styles.type}`} onClick={(e) => handleClick(e)}>Popular</h3>
            <h3 className={styles.type} onClick={(e) => handleClick(e)}>Meat</h3>
            <h3 className={styles.type} onClick={(e) => handleClick(e)}>Vegan</h3>
            <h3 className={styles.type} onClick={(e) => handleClick(e)}>Vegetarian</h3>
        </div>
    )
}

