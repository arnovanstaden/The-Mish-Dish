import Head from "../Head/Head";

interface ILayout {
    children: React.ReactNode;
    head: {
        title: string;
        description: string;
        canonical: string;
        robots?: boolean;
    };
    classNameProp?: string;
    noContainer?: boolean
}

export default function Layout(props: ILayout) {
    return (
        <>
            <Head {...props.head} />
            <main className={props.classNameProp}>
                {props.noContainer
                    ? props.children
                    : <div className="container">
                        {props.children}
                    </div>
                }
            </main>
        </>
    )
}
