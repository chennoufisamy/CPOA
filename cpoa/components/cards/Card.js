import styles from "./Card.module.css";
import Link from "next/link"

const Card = ({ title, button_title, link }) => {

    const colors = {
        green: {bg: "#C9F4BE", border: "#75F128"},
        blue: {bg: "#ace4e7", border: "#4bc3cb"},
        beige: {bg: "#fdefda", border: "#f8d49f"},
        pink: {bg: "#fddada", border: "#f89f9f"},
        purple: {bg: "#e9dafd", border: "#ba8bf6"}
    }

    let keys = Object.keys(colors)
    let randomKey = keys[Math.floor(Math.random() * keys.length)]
    let color = colors[randomKey]

    return (
        <div style={{backgroundColor: color.bg}} className={styles.container}>
            <h2 className={styles.title}>{title}</h2>
            <Link href={link}>
                <a style={{border: `2px solid ${color.border}`}} className={styles.button}>{button_title}</a>
            </Link>
        </div>
    )
}

export default Card;