import styles from "./Card.module.css";
import Link from "next/link"

const Card = ({ title, button_title, link }) => {
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>{title}</h3>
            <Link href={link}>
                <a className={styles.button}>{button_title}</a>
            </Link>
        </div>
    )
}

export default Card;