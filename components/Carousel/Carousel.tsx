import Slider from "react-slick";

// Components
import Recipe from "../Recipe/Recipe";

// Styles
import styles from "./carousel.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ISlider {
    type: "Recommended" | "Meal Types" | "Recently Added" | "Recently Viewed";
    recipes: object[]
}


export default function Carousel({ type, recipes }: ISlider) {

    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        slidesToShow: 1.25,
        slidesToScroll: 1,
        swipeToSlide: true,
        draggable: true,
        autoplay: true,
        autoplaySpeed: 5000,
        cssEase: "linear",
        pauseOnHover: true,
        speed: 500,
    };
    return (
        <div className={styles.carousel}>
            <Slider {...settings}>
                {recipes.map((recipe, index) => (
                    index <= 5 ? <Recipe {...recipe} key={index} carouselItem={true} /> : null
                ))}
            </Slider>
        </div>
    );
}
