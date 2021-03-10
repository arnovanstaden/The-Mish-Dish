import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useState } from "react";

import styles from "./filter-slider.module.scss";

interface ISlider {
    value: number,
    recipeTimes: {
        min: number,
        max: number
    },
    handleSliderChange: (value: number) => void
}

export default function FilterSlider({ value, recipeTimes, handleSliderChange }: ISlider) {

    const handleChange = (value) => {
        handleSliderChange(value)
    }

    return (
        <div className={styles.wrapper}>
            <Slider min={recipeTimes.min} max={recipeTimes.max} onAfterChange={handleChange} />
            <p> {value} Minutes or less</p>
        </div>
    )
}
