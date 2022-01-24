import styles from "./Card.module.css";
import { useUser } from "@auth0/nextjs-auth0";
import { useState, useEffect } from "react";

const Myticket = () => {

    const { user } = useUser();
    //const [userId, setUserId] = useState([]);
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        async function get_tickets() {
            const id = user.sub.split('|')[1];
            const res = await fetch("http://localhost:3000/api/ticket_by_user?id="+id);
            const data = await res.json();
            setTickets(data);
        }
        get_tickets();
    }, []);

    const get_ticket_name = (type) => {
        switch(type) {
            case 1:
                return "Billets Grand Public";
            case 2:
                return "Billets Licenciés";
            case 3:
                return "Billets Journée De La Solidarité";
            case 4:
                return "Billets \"The Big Match\"";
        }
    }

    const get_cat = (cat) => {
        switch(cat) {
            case "1":
                return "Catégorie 1";
            case "2":
                return "Catégorie 2";
            case "3":
                return "Loges";
            default:
                return "idk";
        }
    }

    return (
        <div className={styles.container_my_ticket}>
            {tickets.map(t => (
                <div className={styles.my_ticket}>
                    <h2 className={styles.my_ticket_title}>{get_ticket_name(t.type)}</h2>
                    <h4 className={styles.my_ticket_sub}>Match: {t.match_id}</h4>
                    <div className={styles.my_ticket_info_container}>
                        <div className={styles.my_ticket_info}>
                            <p>Jour: {t.day}</p>
                            <p>Court: {t.court_id}</p>
                            <p className={styles.my_ticket_price}>Prix: {t.price}€</p>
                        </div>
                        <div className={styles.my_ticket_info}>
                            <p>Heure: {t.date}</p>
                            <p>Place: {get_cat(t.place)}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Myticket;