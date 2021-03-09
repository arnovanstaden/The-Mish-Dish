import Slider from "react-slick";

// Components
import Recipe from "../Recipe/Recipe";

// Styles
import styles from "./carousel.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ISlider {
    type: "Recommended" | "Meal Types" | "Recently Added" | "Recently Viewed";
    recipes: any[]
}


export default function Carousel({ type, recipes }: ISlider) {
    let recipesToRender = [];

    switch (type) {
        case "Recommended":
            recipesToRender = recipes.filter(recipe => recipe.recommended === true)
            break;
        case "Meal Types":

            break;
        case "Recently Added":
            recipesToRender = [...recipes].reverse().splice(0, 6);
            break;
        case "Recently Viewed":
            recipesToRender = [...recipes]
            break;
    }

    const settings = {
        dots: false,
        arrows: false,
        infinite: false,
        slidesToShow: 1.25,
        slidesToScroll: 1,
        swipeToSlide: true,
        draggable: true,
        autoplay: false,
        cssEase: "linear",
        pauseOnHover: true,
        speed: 500,
        initialSlide: 0,
    };
    return (
        <div className={styles.carousel}>
            <Slider {...settings}>
                {recipesToRender.map((recipe, index) => (
                    <Recipe {...recipe} key={index} />
                ))}
            </Slider>
        </div>
    );
}
