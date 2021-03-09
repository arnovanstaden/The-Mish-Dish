import Link from "next/link";
import { GetStaticProps } from 'next';
import { recentlyViewed } from "../utils/utils";
import { useEffect, useState } from "react"

// Components
import Layout from "../components/Layout/Layout";
import Search from "../components/UI/Search/Search";
import Carousel from '../components/Carousel/Carousel'

// Styles
import styles from '../styles/pages/home.module.scss';

export default function Home({ recipes }) {
  const [recent, setRecent] = useState(null);

  useEffect(() => {
    setRecent(recentlyViewed.get())
  }, [])

  return (
    <Layout
      head={{
        title: "The Mish Dish",
        description: "A personal catalogue of some of Mish's personally created, go-to dishes - no life story included.",
        canonical: "/"
      }}
      classNameProp={styles.home}
    >
      <Search />

      <section className={styles.group}>
        <div className={styles.options}>
          <h3>Recommended</h3>
          <Link href="/recipes">
            <a>View All</a>
          </Link>
        </div>
        <div className={styles.carousel}>
          <Carousel type="Recommended" recipes={recipes} />
        </div>
      </section>

      <section className={styles.group}>
        <div className={styles.options}>
          <h3>Popular</h3>
          <Link href="/recipes">
            <a>View All</a>
          </Link>
        </div>
        <div className={styles.carousel}>
        </div>
      </section>

      <section className={styles.group}>
        <div className={styles.options}>
          <h3>Recently Added</h3>
          <Link href="/recipes">
            <a>View All</a>
          </Link>
        </div>
        <div className={styles.carousel}>
          <Carousel type="Recently Added" recipes={recipes} />
        </div>
      </section>

      {recent ?
        <section className={styles.group}>
          <div className={styles.options}>
            <h3>Recently Viewed</h3>
          </div>
          <div className={styles.carousel}>
            <Carousel type="Recently Viewed" recipes={recipes.filter(recipe => recent.includes(recipe.id))} />
          </div>
        </section>
        : null}

    </Layout >
  )
}


export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes`);
  const recipes = await response.json();

  return {
    props: {
      recipes
    },
  }
}