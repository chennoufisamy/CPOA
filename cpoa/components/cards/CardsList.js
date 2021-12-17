import Card from "./card";
import styles from "./Card.module.css"

const CardsList = ({ cards }) => {

    return (
        <div className={styles.list}>
            {cards.map(f =>
                <Card 
                    key={f.title} 
                    title={f.title} 
                    button_title={f.button_title} 
                    link={f.link} 
                />
            )}
        </div>
    )
}

export default CardsList;