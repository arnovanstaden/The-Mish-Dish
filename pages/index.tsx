// Components
import Head from "../components/Head/Head";

import styles from '../styles/pages/home.module.scss';



export default function Home() {
  return (
    <main className={styles.home}>
      <Head
        title="The Mish Dish"
        description="A personal catalogue of some of Mish's personally created, go-to dishes - no life story included."
        canonical="/"
      />


    </main>
  )
}
