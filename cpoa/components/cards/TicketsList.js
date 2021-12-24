import Ticket from "./Ticket"
import styles from "./Card.module.css"

const TicketsList = () => {

    const ticketsInfos = {
		ticket1: {title: "Billets grand public", button_title: "Acheter", link: "/ticketing", type: 1},
		ticket2: {title: "Billets licenciés", button_title: "Acheter", link: "/ticketing", type: 2},
		ticket3: {title: "Billets court annexe", button_title: "Acheter", link: "/ticketing", type: 3},
		ticket4: {title: "Billets journée de la solidarité", button_title: "Acheter", link: "/ticketing", type: 4},
		ticket5: {title: "Billets \"the big match\"", button_title: "Acheter", link: "/ticketing", type: 5}
	}

    const tickets = [
		ticketsInfos.ticket1,
		ticketsInfos.ticket2,
		ticketsInfos.ticket3,
		ticketsInfos.ticket4,
		ticketsInfos.ticket5
	]

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