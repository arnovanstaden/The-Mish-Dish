import Dropdown from 'react-dropdown';
// import 'react-dropdown/style.css';

// Styles
import styles from "./sort.module.scss";

interface ISort {
    handleSort: (sortBy: string) => void
}

export default function Sort({ handleSort }: ISort) {
    const options = [
        'Recently Added', 'Popularity', 'Name A-Z', 'Cooking Time'
    ];
    const defaultOption = options[0];

    const handleChange = (sort) => {
        handleSort(sort.value)
    }

    return (
        <Dropdown
            options={options}
            value={defaultOption}
            placeholder="Select an option"
            menuClassName={styles.menu}
            className={styles.dropdown}
            onChange={sort => handleChange(sort)}
        />
    )
}
