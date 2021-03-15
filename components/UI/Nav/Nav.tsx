import Link from "next/link";
import { useRouter } from "next/router";

import { useEffect } from "react";


// Styles
import styles from "./nav.module.scss";

export default function Nav() {
    const router = useRouter();

    useEffect(() => {
        setActiveLink()
    })

    const setActiveLink = () => {
        // Remove old active link
        const activeLinks = Array.from(document.getElementsByClassName(`${styles.link}`) as HTMLCollection);
        activeLinks.forEach(link => {
            link.classList.remove(styles.active)
        })

        // Add new active link
        const currentPath = router.pathname;
        const navLinks = Array.from(document.getElementsByClassName(`${styles.link}`) as HTMLCollection);
        navLinks.forEach(link => {
            link.getAttribute("href") === currentPath ? link.classList.add(styles.active) : null
        })
    }

    const toggleNav = () => {
        let nav = document.getElementsByClassName(styles.content)[0] as HTMLElement;
        nav.classList.toggle(styles.open)
    }


    return (
        <nav className={styles.nav}>
            <Link href="/">
                <a>
                    <img src="/images/Logo-wide.svg" alt="The Mish Dish Logo" />
                </a>
            </Link>
            <button onClick={toggleNav}>
                <i className="icon-menu"></i>
            </button>

            <div className={styles.content}>
                <i className="icon-clear" onClick={toggleNav}> </i>

                <div className={styles.menu}>
                    <Link href="/" >
                        <a className={`${styles.link} ${styles.active}`} onClick={toggleNav}>
                            Home
                    </a>
                    </Link>

                    <Link href="/recipes">
                        <a className={styles.link} onClick={toggleNav}>
                            Recipes
                        </a>
                    </Link>

                    <Link href="/favourites">
                        <a className={styles.link} onClick={toggleNav}>
                            Favourites
                    </a>
                    </Link>

                    <Link href="/settings">
                        <a className={styles.link} onClick={toggleNav}>
                            Settings
                    </a>
                    </Link>
                </div>
            </div>
        </nav>
    )
}
