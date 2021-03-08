import Link from "next/link"

// Styles
import styles from "./mobile-nav.module.scss"

export default function MobileNav() {
    return (
        <nav className={styles.nav}>

            <Link href="/">
                <a className={styles.item}>
                    <i className="icon-home"></i>
                </a>
            </Link>

            <Link href="/recipes">
                <a className={styles.item}>
                    <i className="icon-recipe"></i>
                </a>
            </Link>

            <Link href="/favourites">
                <a className={styles.item}>
                    <i className="icon-favorite"></i>
                </a>
            </Link>

            <Link href="/profile">
                <a className={styles.item}>
                    <i className="icon-person"></i>
                </a>
            </Link>

        </nav>
    )
}
