import { GetStaticProps, GetStaticPaths } from 'next';

export default function Recipe({ recipe }) {
    return (
        <div>
            <p>{recipe.name}</p>
            <p>{recipe.description}</p>
        </div>
    )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes/${params.id}`);
    const recipe = await response.json();
    return {
        props: {
            recipe,
        },
    }
}

export async function getStaticPaths() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes`);
    const recipes = await response.json();
    const paths = recipes.map(recipe => `/recipes/${recipe.id}`);
    return { paths, fallback: false }
}


