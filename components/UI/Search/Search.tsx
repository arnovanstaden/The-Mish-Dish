import { useRouter } from 'next/router'

// Styles
import styles from "./search.module.scss";

interface ISearchProps {
    home?: boolean,
    handleSearch?: (searchTerm: string) => void
}

export default function Search({ home, handleSearch }: ISearchProps) {
    const router = useRouter()

    const submitSearch = (e) => {
        let input = document.getElementById("search-bar") as HTMLInputElement;
        let searchTerm = input.value.toLowerCase()

        if (home) {
            if (e.key === "Enter") {
                router.push(`/recipes/?${searchTerm}`)
            }
        } else {
            handleSearch(searchTerm)
        }

    }



    return (
        <div className={styles.search}>
            <i className="icon-search"></i>
            <input id="search-bar" type="text" placeholder="What are you in the mood for?" onKeyDown={(e) => submitSearch(e)} />
        </div>
    )
}
