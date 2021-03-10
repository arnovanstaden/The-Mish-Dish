import { useRouter } from 'next/router';
import { useEffect } from "react";

// Styles
import styles from "./search.module.scss";

interface ISearchProps {
    reroute?: boolean,
    handleSearch?: (searchTerm: string) => void
}

export default function Search({ reroute, handleSearch }: ISearchProps) {
    const router = useRouter()

    const instantSearch = (e) => {
        let searchTerm = e.target.value.toLowerCase();
        handleSearch(searchTerm)
    }

    const submitSearch = (e) => {
        let searchTerm = e.target.value.toLowerCase();
        if (e.key === "Enter") {
            router.push(`/recipes/?${searchTerm}`)
        }
    }

    const checkSearchQuery = () => {
        if (router.pathname === "/recipes" && router.query) {
            const searchTerm = location.search.replace("?", "");
            let searchBar = document.getElementById("search-bar") as HTMLInputElement;
            searchBar.value = searchTerm;
        }
    }

    const updatePlaceholder = (e) => {
        let searchBar = e.target as HTMLElement;
        searchBar.setAttribute("placeholder", "Name, type, ingredient...")
    }

    useEffect(() => {
        checkSearchQuery()
    }, [])

    return (
        <div className={styles.search}>
            <i className="icon-search"></i>
            <label hidden>Search</label>
            <input
                id="search-bar"
                type="text"
                placeholder="What are you in the mood for?"
                onChange={reroute ? null : (e) => instantSearch(e)}
                onKeyDown={reroute ? (e) => submitSearch(e) : null}
                onFocus={(e) => updatePlaceholder(e)} />
        </div>
    )
}
