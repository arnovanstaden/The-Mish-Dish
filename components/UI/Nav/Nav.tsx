import Link from "next/link";

// Styles
import styles from "./nav.module.scss";

export default function Nav() {
    return (
        <nav className={styles.nav}>
            <Link href="/">
                <a>
                    <img src="/images/logo-wide.svg" alt="The Mish Dish Logo" />
                </a>
            </Link>
            <button>
                <i className="icon-menu"></i>
            </button>
        </nav>
    )
}
