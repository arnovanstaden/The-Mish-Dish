import Router from "next/router";
import { useEffect } from "react";
import { toggleLoader } from "../../utils/general";

// Components
import Nav from "../UI/Nav/Nav"
import MobileNav from "../UI/MobileNav/MobileNav";
import Loader from "../UI/Loader/Loader";
import Install from "../UI/Install/Install";

// Page Loader

Router.events.on('routeChangeStart', () => {
    toggleLoader();
});

export default function PageTemplate({ children }) {

    useEffect(() => {
        toggleLoader();
    })

    return (
        <>
            <Nav />
            {children}
            <MobileNav />
            <Loader />
            <Install />
        </>
    )
}
