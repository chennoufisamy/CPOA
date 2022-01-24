import { useState } from 'react';
import Input from './Input';
import Option from './Option';
import styles from './form.module.css';
import ButtonForm from './ButtonForm';
import axios from 'axios';

const FormMatchDouble = ({ teams }) => {

    const [formData, setFormData] = useState({});

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

    const is_valid = async () => {
        if (formData['court'] < 1) {
            alert("Numéro du court invalide");
            return false;
        }
        if (formData['t1'].split(" ")[0] != formData['t2'].split(" ")[0]) {
            let matchs = await fetch("http://localhost:3000/api/date_by_court");
            matchs = await matchs.json();
            if (matchs.length > 0) {
                for(const m of matchs) {
                    if (m['court_id'] == formData['court'] && m['day'] == formData['day']) {
                        if (m['date'] != formData['datetime']) {
                            return true;
                        } else {
                            alert("Horraire invalide");
                            return false;
                        }
                    } else {
                        return true;
                    }
                }
            } else {
                return true;
            }
        } else {
            alert('Les joueurs sont les identiques');
            return false;
        }
    }

    const generate_id = (size) => {
        return [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    }

    const add = async () => {
        if (await is_valid()) {
            const match_id = generate_id(32)
            let data_double = {
                content: [match_id, formData['t1'].split(' ')[0], formData['t2'].split(' ')[0]], 
                bonus: [formData['t1'].split(' ')[1], formData['t1'].split(' ')[2], formData['t2'].split(' ')[1], formData['t2'].split(' ')[2]]
            }
            console.log(data_double)
            axios.post("http://localhost:3000/api/add_match_double", data_double);
            
            let data = {
                content: [match_id, formData['datetime'], formData['day'], formData['court']]
            }
            axios.post("http://localhost:3000/api/add_match", data);
            alert("Match ajouté");
        }
        console.log(formData)
    };

    const onSubmit = (e) => {
        e.preventDefault();
        add();
    };

    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <h2 className={styles.title}>Ajouter un match double</h2>
            <select 
            className={styles.select}
            name={"court"}
            value={formData['court']}
            onChange={handleChange}>
                <option>Sélectionner un court</option>
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
            name={"datetime"}
            value={formData['datetime']}
            onChange={handleChange}>
                <option>Sélectionner un horaire</option>
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
                <option>Sélectionner un jour</option>
                {days.map((p) => (
                    <Option 
                    key={p.value}
                    value={p.value}
                    text={p.text}
                    />
                ))}
            </select>
            <select 
            className={styles.select}
            name={"t1"}
            value={formData['t1']}
            onChange={handleChange}>
                <option>Sélectionner l'équipe n°1</option>
                {teams.map((p) => (
                    <Option 
                    key={p.id}
                    value={`${p.id} ${p.player1} ${p.player2}`}
                    text={`${p.id} - j1: ${p.player1} - j2: ${p.player2}`}
                    />
                ))}
            </select>
            <select 
            className={styles.select}
            name={"t2"}
            value={formData['t2']}
            onChange={handleChange}>
                <option>Sélectionner l'équipe n°2</option>
                {teams.map((p) => (
                    <Option 
                    key={p.id}
                    value={`${p.id} ${p.player1} ${p.player2}`}
                    text={`${p.id} - j1: ${p.player1} - j2: ${p.player2}`}
                    />
                ))}
            </select>
            <ButtonForm buttonType='primary' text={"ajouter"} />
        </form>
    )
}


export default FormMatchDouble;