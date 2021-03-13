import Slider from "react-slick";
import { useEffect } from "react";

// Components
import Recipe from "../Recipe/Recipe";

// Styles
import styles from "./carousel.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ISlider {
    type: "Recommended" | "Meal Types" | "Recently Added" | "Recently Viewed";
    mealType?: string;
    recipes: any[]
}


export default function Carousel({ type, mealType, recipes }: ISlider) {

    let recipesToRender = [];
    const carouselClass = `carousel-${type.replace(" ", "").toLowerCase()}`


    // useEffect(() => {
    //     // Same Height Carousels
    //     let carousalTrack = document.querySelector(`.${carouselClass} .slick-list .slick-track`) as HTMLElement;
    //     let stHeight = carousalTrack.offsetHeight;
    //     let slides = Array.from(carousalTrack.getElementsByClassName(`slick-slide`) as HTMLCollectionOf<HTMLElement>);
    //     slides.forEach(slide => {
    //         slide.style.height = `${stHeight.toString()}px`
    //     });
    // }, [])


    switch (type) {
        case "Recommended":
            recipesToRender = recipes.filter(recipe => recipe.recommended === true)
            break;
        case "Meal Types":
            if (mealType === "Popular") {
                recipesToRender = [...recipes].sort((a, b) => b.favourites - a.favourites).splice(0, 6);
                // Fix this
            } else {
                recipesToRender = recipes.filter(recipe => recipe.diet === mealType.toLowerCase());
                recipesToRender = [...recipesToRender].reverse().splice(0, 6);
            }
            break;
        case "Recently Added":
            recipesToRender = [...recipes].reverse().splice(0, 6);
            break;
    }

    const settings = {
        dots: false,
        arrows: false,
        infinite: false,
        slidesToShow: 4.25,
        // slidesToScroll: 1,
        swipeToSlide: true,
        draggable: true,
        autoplay: false,
        cssEase: "linear",
        pauseOnHover: true,
        initialSlide: 0,
        className: carouselClass,
        responsive: [
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 3.25,
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2.25,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1.25,
                }
            }
        ]
    };
    return (
        <div className={styles.carousel}>
            <Slider {...settings}>
                {recipesToRender.map((recipe, index) => (
                    <Recipe recipe={recipe} key={index} carouselItem />
                ))}
            </Slider>
        </div>
    );
}
