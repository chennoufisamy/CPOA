import Link from "next/link";
import styles from "./Card.module.css"

const CardNews = ({ image, title, text, link }) => {
    return (
        <div className={styles.container_news}>
            <div>
                <img src={image}/>
            </div>
            <div className={styles.container_news_info}>
                <h3 className={styles.title_news}>{title}</h3>
                <p className={styles.text_news}>{text}</p>
                <Link href={link}>
                    <a className={styles.read_more}>lire plus</a>
                </Link>
                
            </div>
        </div>
    )
}

export default CardNews;