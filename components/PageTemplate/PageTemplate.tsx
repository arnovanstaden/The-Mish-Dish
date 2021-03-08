
// Components
import MobileNav from "../UI/MobileNav/MobileNav";

export default function PageTemplate({ children }) {
    return (
        <>
            {children}
            <MobileNav />
        </>
    )
}
