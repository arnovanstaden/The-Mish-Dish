import NextHead from 'next/head';

export interface IHead {
    title: string;
    description: string;
    canonical: string;
    robots?: boolean;
    image?: string
}

export default function Head(props: IHead) {
    const date = new Date();
    const currentYear = date.getFullYear();

    return (
        <NextHead>
            <title>{props.title}</title>
            <link rel="icon" type="image/png" href="images/favicon.png" />
            <meta name="description" content={props.description} />
            <meta name="robots" content={props.robots === false ? "noindex, nofollow" : "index, follow"} />
            {props.canonical ? <link rel="canonical" href={`https://www.themishdish.co.za${props.canonical}`} /> : null}


            <meta name="author" content="Webdacity" />
            <meta name="copyright" content={`C-DOC © ${currentYear}`} />
            <meta name="theme-color" content="#ffffff" />
            <link rel="manifest" href="/manifest.json" />

            {/* Open Graph */}
            <meta property="og:site_name" content="C-DOC" />
            <meta property="og:title" content={props.title} />
            <meta property="og:description" content={props.description} />
            <meta property="og:type" content="Website" />
            {props.canonical ? <meta property="og:url" content={`https://www.themishdish.co.za${props.canonical}`} /> : null}
            <meta property="og:image" name="image" content={props.image ? props.image : "https://www.themishdish.co.zaimages/social.png"} />
            <meta property="og:image:type" content="image/png" />
            <meta property="og:image:width" content="500" />
            <meta property="og:image:height" content="500" />
            <meta property="og:image:alt" content="C-DOC Logo" />
        </NextHead >
    )
}
