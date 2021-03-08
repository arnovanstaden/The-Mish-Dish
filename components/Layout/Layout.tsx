import Head from "../Head/Head";

interface ILayout {
    children: React.ReactNode;
    head: {
        title: string;
        description: string;
        canonical: string;
        robots?: boolean;
    };
    classNameProp?: string
}

export default function Layout({ head, children, classNameProp }: ILayout) {
    return (
        <>
            <Head {...head} />
            <main className={classNameProp}>
                <div className="container">
                    {children}
                </div>
            </main>
        </>
    )
}
