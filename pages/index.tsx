import Link from "next/link";

// Components
import Layout from "../components/Layout/Layout";
import Search from "../components/UI/Search/Search";

// Styles
import styles from '../styles/pages/home.module.scss';

export default function Home() {
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
        </div>
      </section>

      <section className={styles.group}>
        <div className={styles.options}>
          <h3>Recently Viewed</h3>
        </div>
        <div className={styles.carousel}>
        </div>
      </section>


    </Layout >
  )
}
