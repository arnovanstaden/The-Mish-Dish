// Components
import Nav from "../UI/Nav/Nav"
import MobileNav from "../UI/MobileNav/MobileNav";

export default function PageTemplate({ children }) {

    return (
        <>
            <Nav />
            {children}
            <MobileNav />
        </>
    )
}
