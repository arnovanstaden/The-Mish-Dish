import { useRouter } from 'next/router'

// Styles
import styles from "./search.module.scss";

export default function Search() {
    const router = useRouter()

    const submitSearch = (e) => {
        if (e.key === "Enter") {
            const searchTerm = document.getElementById("search-bar") as HTMLInputElement;
            router.push(`/recipes/?${searchTerm.value}`)
        }
    }

    return (
        <div className={styles.search}>
            <i className="icon-search"></i>
            <input id="search-bar" type="text" placeholder="What are you in the mood for?" onKeyDown={(e) => submitSearch(e)} />
        </div>
    )
}
