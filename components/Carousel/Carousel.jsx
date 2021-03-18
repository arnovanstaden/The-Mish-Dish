import { Component } from "react";
import Slider, { Settings } from 'react-slick';
import { useMediaQuery } from "react-responsive";

// Components
import Recipe from "../Recipe/Recipe";

// Styles
import styles from "./carousel.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Carousel(props) {
    const { type, recipes, mealType } = props
    const isDesktop = useMediaQuery({ query: '(min-width: 769px)' });
    let recipesToRender = [];
    const sliderItemsCount = isDesktop ? 9 : 6

    switch (type) {
        case "Recommended":
            recipesToRender = recipes.filter(recipe => recipe.recommended === true)
            break;
        case "Meal Types":
            if (mealType === "Popular") {
                recipesToRender = [...recipes].sort((a, b) => b.favourites - a.favourites).splice(0, sliderItemsCount);
                // Fix this
            } else {
                recipesToRender = recipes.filter(recipe => recipe.diet === mealType.toLowerCase());
                recipesToRender = [...recipesToRender].reverse().splice(0, sliderItemsCount);
            }
            break;
        case "Recently Added":
            recipesToRender = [...recipes].reverse().splice(0, sliderItemsCount);
            break;
    }

    return (
        <div className={styles.carousel}>
            <RecipeSlider recipes={recipesToRender} isDesktop />
        </div>
    );

}


class RecipeSlider extends Component {
    constructor(props) {
        super(props)
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
    }

    next() {
        this.slider.slickNext();
    }
    previous() {
        this.slider.slickPrev();
    }

    render() {
        const settings = {
            dots: false,
            arrows: false,
            infinite: false,
            slidesToShow: 4.25,
            slidesToScroll: 1,
            swipe: true,
            swipeToSlide: true,
            draggable: true,
            autoplay: false,
            cssEase: "linear",
            pauseOnHover: true,
            initialSlide: 0,
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

        const Arrows = () => {
            return (
                <div className={styles.arrows}>
                    <i className="icon-carrot_down" onClick={this.previous}></i>
                    <i className="icon-carrot_down" onClick={this.next}></i>
                </div>
            )
        }

        return (
            <>
                <Slider {...settings} ref={c => (this.slider = c)} >
                    {this.props.recipes.map((recipe, index) => (
                        <Recipe recipe={recipe} key={index} carouselItem />
                    ))}
                </Slider>
                {this.props.isDesktop ? <Arrows /> : null}
            </>
        )

    }
}