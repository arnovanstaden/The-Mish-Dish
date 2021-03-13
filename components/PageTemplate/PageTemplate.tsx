import Router from "next/router";
import { useEffect } from "react";
import { toggleLoader } from "../../utils/general";

// Components
import Nav from "../UI/Nav/Nav"
import MobileNav from "../UI/MobileNav/MobileNav";
import Loader from "../UI/Loader/Loader";

// Page Loader

Router.events.on('routeChangeStart', () => {
    toggleLoader();
});

// Router.events.on('routeChangeComplete', () => {
//     console.log("end")
//     toggleLoader();
// });


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
        </>
    )
}
