import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

import styles from "./filter-slider.module.scss";

export default function FilterSlider() {
    return (
        <div className={styles.wrapper}>
            <Slider min={0} max={20} defaultValue={3} />
        </div>
    )
}
