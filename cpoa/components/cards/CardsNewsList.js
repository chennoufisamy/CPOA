import CardNews from "./CardNews";
import styles from "./Card.module.css"

const CardNewsList = ( { cards }) => {
    return (
        <div className={styles.list_news}>
            {cards.map(f => 
                <CardNews 
                    key={f.title}
                    image={f.image}
                    title={f.title}
                    text={f.text}
                    link={f.link}
                />    
            )}
        </div>
    )
}

export default CardNewsList;