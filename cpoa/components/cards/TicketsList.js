import Ticket from "./Ticket"
import styles from "./Card.module.css"

const TicketsList = ( { tickets }) => {


    return (
        <div className={styles.tickets_list}>
            {tickets.map(f =>
                <Ticket 
                    key={f.type} 
                    title={f.title} 
                    button_title={f.button_title} 
                    link={f.link}
                    type={f.type}
                />
            )}
        </div>
    )
}

export default TicketsList