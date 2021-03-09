import { useRouter } from 'next/router'

// Styles
import styles from "./search.module.scss";

interface ISearchProps {
    reroute?: boolean,
    handleSearch?: (searchTerm: string) => void
}

export default function Search({ reroute, handleSearch }: ISearchProps) {
    const router = useRouter()

    const submitSearch = (e) => {
        let searchTerm = e.target.value.toLowerCase();

        if (reroute) {
            if (e.key === "Enter") {
                router.push(`/recipes/?${searchTerm}`)
            }
        } else {
            handleSearch(searchTerm)
        }
    }

    const updatePlaceholder = (e) => {
        let searchBar = e.target as HTMLElement;
        searchBar.setAttribute("placeholder", "Name, type, ingredient...")
    }

    return (
        <div className={styles.search}>
            <i className="icon-search"></i>
            <input id="search-bar" type="text" placeholder="What are you in the mood for?" onChange={(e) => submitSearch(e)} onFocus={(e) => updatePlaceholder(e)} />
        </div>
    )
}
