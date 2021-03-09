import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import { getCookingTimes } from "../../../utils/utils";
import { useState } from "react";

import styles from "./filter-slider.module.scss";

export default function FilterSlider({ recipes }) {
    const recipeTimes = getCookingTimes(recipes);

    const [sliderValue, setSliderValue] = useState(Math.round(recipeTimes.max / 2))

    const handleChange = (value) => {
        setSliderValue(value)
    }

    return (
        <div className={styles.wrapper}>
            <Slider min={recipeTimes.min} max={recipeTimes.max} defaultValue={sliderValue} onAfterChange={handleChange} />
            <p> {sliderValue} Minutes or less</p>
        </div>
    )
}
