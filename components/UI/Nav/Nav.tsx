import Link from "next/link";

// Styles
import styles from "./nav.module.scss";

export default function Nav() {
    return (
        <nav className={styles.nav}>
            <Link href="/">
                <a>
                    <img src="/Logo-wide.svg" alt="The Mish Dish Logo" />
                </a>
            </Link>
            <button>
                <i className="icon-menu"></i>
            </button>
        </nav>
    )
}
