import Head from "../Head/Head";
import { IHead } from "../Head/Head";

interface ILayout {
    children: React.ReactNode;
    head: IHead;
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
