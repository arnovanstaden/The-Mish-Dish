import styles from "./search.module.scss";

export default function Search() {
    return (
        <div className={styles.search}>
            <i className="icon-search"></i>
            <input type="text" placeholder="What are you in the mood for?" />
        </div>
    )
}
