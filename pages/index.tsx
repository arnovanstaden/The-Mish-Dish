// Components
import Layout from "../components/Layout/Layout";

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
    >

    </Layout >
  )
}
