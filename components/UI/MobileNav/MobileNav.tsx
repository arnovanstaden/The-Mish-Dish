import Link from "next/link"
import { useRouter } from "next/router";
import { useEffect } from "react";

// Styles
import styles from "./mobile-nav.module.scss"

export default function MobileNav() {
    const router = useRouter();

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

    useEffect(() => {
        setActiveLink()
    })

    return (
        <nav className={styles.nav}>

            <Link href="/">
                <a className={`${styles.link} ${styles.active}`}>
                    <i className="icon-home"></i>
                </a>
            </Link>

            <Link href="/recipes">
                <a className={styles.link}>
                    <i className="icon-recipe"></i>
                </a>
            </Link>

            <Link href="/favourites">
                <a className={styles.link}>
                    <i className="icon-favorite"></i>
                </a>
            </Link>

            <Link href="/profile">
                <a className={styles.link}>
                    <i className="icon-profile"></i>
                </a>
            </Link>

        </nav>
    )
}
