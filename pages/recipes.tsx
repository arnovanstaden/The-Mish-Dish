import { GetStaticProps } from 'next';
import { useState, useEffect } from "react";
import { searchRecipes, sortRecipes, filterRecipes } from "../utils/recipes"

// Components
import Layout from "../components/Layout/Layout";
import Search from "../components/UI/Search/Search";
import Sort from "../components/UI/Sort/Sort";
import Recipe from "../components/Recipe/Recipe";
import Filter from "../components/Filter/Filter";

// Styles
import styles from "../styles/pages/recipes.module.scss";

export default function Recipes({ allRecipes }) {
    const [showFilter, setShowFilter] = useState(false);
    const [recipes, setRecipes] = useState(allRecipes);
    const [currentFilters, setCurrentFilters] = useState(null)

    // Handlers

    // Filters
    const handleFilterShow = () => {
        setShowFilter(!showFilter);
        const body = document.body;
        body.classList.toggle("no-scroll");
    }

    const handleFilterApply = (activeFilters) => {
        // Apply Filters
        setCurrentFilters(activeFilters);
        const result = filterRecipes(allRecipes, activeFilters);
        setRecipes(result)
    }

    const cancelFilter = () => {
        let result;
        let searchTerm = (document.getElementById("search-bar") as HTMLInputElement).value;
        if (searchTerm.length > 0) {
            result = searchRecipes(allRecipes, searchTerm)
            setRecipes(result);
        } else {
            setRecipes(allRecipes)
        }
        setCurrentFilters(null);
    }

    // Search
    const executeSearch = () => {
        if (location.search) {
            const searchTerm = location.search.replace("?", "").toLowerCase();
            const result = searchRecipes(allRecipes, searchTerm);
            setRecipes(result);
        }
    }

    const handleInstantSearch = (searchTerm: string) => {
        const result = searchRecipes(allRecipes, searchTerm);
        setRecipes(result);
    }

    // Sort
    const handleSort = (sortBy: string) => {
        const sortedRecipes = sortRecipes([...recipes], sortBy);
        console.log(sortedRecipes);
        if (sortedRecipes) {
            setRecipes(sortedRecipes)
        }
    }

    useEffect(() => {
        executeSearch();
    }, []);


    return (
        <Layout
            head={{
                title: "Recipes | The Mish Dish",
                description: "A personal catalogue of some of Mish's personally created, go-to dishes - no life story included.",
                canonical: "/recipes"
            }}
            classNameProp={styles.recipes}
        >
            <h1>Find Recipes</h1>
            <Search handleInstantSearch={(searchTerm) => handleInstantSearch(searchTerm)} />

            <div className={styles.options}>
                <div className={styles.option} onClick={handleFilterShow}>
                    <i className="icon-filter"></i>
                    <p>Filter</p>
                </div>
                <div className={styles.sort}>
                    <p>Sort By:</p>
                    <div className={styles.option}>
                        <Sort
                            handleSort={(sortBy) => handleSort(sortBy)}
                        />
                    </div>
                </div>
            </div>

            <div className={styles.grid}>
                {recipes.map((recipe, index) => (
                    <Recipe recipe={recipe} key={index} />
                ))}
            </div>
            <Filter currentFilters={currentFilters} recipes={allRecipes} showFilter={showFilter} handleFilterShow={handleFilterShow} handleFilterApply={handleFilterApply} cancelFilter={cancelFilter} />
        </Layout >
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes`);

    let allRecipes = await response.json();
    allRecipes = [...allRecipes].reverse()

    return {
        props: {
            allRecipes
        },
    }
}
