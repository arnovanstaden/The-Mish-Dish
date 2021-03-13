import Layout from "../components/Layout/Layout"

export default function PageNotFound() {
    return (
        <Layout
            head={{
                title: "Recipes | The Mish Dish",
                description: "A personal catalogue of some of Mish's personally created, go-to dishes - no life story included.",
                canonical: "/404",
                robots: false
            }}
        >
            <div className="not-found">
                <div>
                    <h1>4</h1>
                    <img src="images/favicon.svg" alt="" />
                    <h1>4</h1>
                </div>
                <h3>This page does not exist</h3>
            </div>
        </Layout >
    )
}
