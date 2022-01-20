import { useState } from 'react';
import Input from './Input';
import Option from './Option';
import styles from './form.module.css'
import ButtonForm from './ButtonForm';
import axios from 'axios';

const FormMatchDouble = ({ teams }) => {

    const [formData, setFormData] = useState({});

    const fields = {
        datetime: {type: "time", name: "datetime", text: "datetime", placeholder: "date et heure", required: true},
        court: {type: "number", name: "court", text: "court", placeholder: "n° du court", required: true},
    };

    const formMatchDouble = [
        fields.court
    ];

    const days = [
        {text: "dimanche", value: "sunday"},
        {text: "lundi", value: "monday"},
        {text: "mardi", value: "tuesday"},
        {text: "mercredi", value: "wednesday"},
        {text: "jeudi", value: "thursday"},
        {text: "vendredi", value: "friday"},
        {text: "samedi", value: "saturday"}
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
                        let date_m = parseInt(m['date'].split(':').join(''))
                        let date = parseInt(formData['datetime'].split(':').join(''))
                        if (date+20000 < date_m || date > date_m+20000) {
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
    };

    const onSubmit = (e) => {
        e.preventDefault();
        add();
    };

    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <h2 className={styles.title}>Ajouter un match double</h2>
            {formMatchDouble.map(m => (
                <Input
                key={m.name}
                type={m.type}
                name={m.name}
                id={m.name}
                text={m.text}
                handleChange={handleChange}
                placeholder={m.placeholder}
                required={m.required}
                />
            ))}
            <select 
            className={styles.select}
            name={"datetime"}
            value={formData['datetime']}
            onChange={handleChange}>
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