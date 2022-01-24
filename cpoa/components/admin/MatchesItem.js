import { useState } from 'react';
import styles from "./admin.module.css";
import Option from "../form/Option";
import ButtonForm from "../form/ButtonForm";
import axios from 'axios';

const MatchesItem = ({ match }) => {

    const [formData, setFormData] = useState({...match});

    const court = [
        {text: "court principale", value: 1},
        {text: "court n°1", value: 2},
        {text: "court n°2", value: 3},
        {text: "court n°3", value: 4},
    ]

    const days = [
        {text: "dimanche", value: "dimanche"},
        {text: "lundi", value: "lundi"},
        {text: "mardi", value: "mardi"},
        {text: "mercredi", value: "mercredi"},
        {text: "jeudi", value: "jeudi"},
        {text: "vendredi", value: "vendredi"},
        {text: "samedi", value: "samedi"}
    ]

    const schedule = [
        {text: "matinée", value: "10:00:00"},
        {text: "midi", value: "12:00:00"},
        {text: "après-midi", value: "14:00:00"},
        {text: "soirée", value: "16:00:00"}
    ]

    const handleChange = event => {
        const formDataCopy = { ...formData };
        formDataCopy[event.target.name] = event.target.value;
        setFormData(formDataCopy);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        let data = {
            content: [formData['date'], formData['day'], formData['court_id'], formData['id']]
        }
        console.log(formData)
        console.log(data)
        axios.post("http://localhost:3000/api/update_match", data);
        //alert('modification réalisé');
    };

    return (
        <div className={styles.match}>
            <p>Match: {match.id}</p>
            <form className={styles.match_form} onSubmit={onSubmit}>
            <select 
            className={styles.select}
            name={"court_id"}
            value={formData['court_id']}
            onChange={handleChange}>
                <option disabled selected hidden>{match.court_id}</option>
                {court.map((p) => (
                    <Option 
                    key={p.value}
                    value={p.value}
                    text={p.text}
                    />
                ))}
            </select>
            <select 
            className={styles.select}
            name={"date"}
            value={formData['date']}
            onChange={handleChange}>
                <option disabled selected hidden>{match.date}</option>
                {schedule.map((p) => (
                    <Option 
                    key={p.value}
                    value={p.value}
                    text={p.text}
                    />
                ))}
            </select>
            <select 
            className={styles.select}
            name={"day"}
            value={formData['day']}
            onChange={handleChange}>
                <option disabled selected hidden>{match.day}</option>
                {days.map((p) => (
                    <Option 
                    key={p.value}
                    value={p.value}
                    text={p.text}
                    />
                ))}
            </select>
            <ButtonForm buttonType='primary' text={"modifier"} />
            </form>
        </div>
    )
}

export default MatchesItem;