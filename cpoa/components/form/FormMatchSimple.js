import { useState } from 'react';
import Input from './Input';
import Option from './Option';
import styles from './form.module.css'
import ButtonForm from './ButtonForm';
import axios from 'axios';
import crypto from 'crypto';

const FormMatchSimple = ({ players }) => {

    const [formData, setFormData] = useState({});

    const fields = {
        datetime: {type: "time", name: "datetime", text: "datetime", placeholder: "date et heure", required: true},
        /*day: {type: "text", name: "day", text: "day", placeholder: "jour", required: true},*/
        court: {type: "number", name: "court", text: "court", placeholder: "n° du court", required: true},
    };

    const formMatchSimple = [
        fields.datetime,
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

    const handleChange = event => {
        const formDataCopy = { ...formData };
        formDataCopy[event.target.name] = event.target.value;
        setFormData(formDataCopy);
    };

    const is_valid = async () => {
        if (formData['p1'].split(" ")[0] != formData['p2'].split(" ")[0]) {
            let matchs = await fetch("http://localhost:3000/api/date_by_court");
            matchs = await matchs.json();
            if (matchs.length > 0) {
                for(const m of matchs) {
                    if (m['court_id'] == formData['court'] && m['day'] == formData['day']) {
                        let date_m = parseInt(m['date'].split(':').join(''))
                        let date = parseInt(`${formData['datetime']}:00`.split(':').join(''))
                        if (date+10000 < date_m || date > date_m+10000) {
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
            let data_simple = {
                content: [match_id, formData['p1'].split(" ")[0], formData['p2'].split(" ")[0]], 
                bonus: [formData['p1'].split(" ")[1], formData['p2'].split(" ")[1]]
            }
            console.log(data_simple);
            axios.post("http://localhost:3000/api/add_match_simple", data_simple);
            
            let data = {
                content: [match_id, formData['datetime'] +":00", formData['day'], formData['court']]
            }
            console.log(data);
            axios.post("http://localhost:3000/api/add_match", data);
            console.log(typeof match_id)
            
            
            alert("Match ajouté");
        } else {
            alert("Erreur lors de l'ajout du match")
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        add();
    };

    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <h2 className={styles.title}>Ajouter un match simple</h2>
            {formMatchSimple.map(m => (
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
            name={"p1"}
            value={formData['p1']}
            onChange={handleChange}>
                {players.map((p) => (
                    <Option 
                    key={p.id}
                    value={`${p.id} ${p.country}`}
                    text={`${p.id} - ${p.first_name} - ${p.last_name}`}
                    />
                ))}
            </select>
            <select 
            className={styles.select}
            name={"p2"}
            value={formData['p2']}
            onChange={handleChange}>
                {players.map((p) => (
                    <Option 
                    key={p.id}
                    value={`${p.id} ${p.country}`}
                    text={`${p.id} - ${p.first_name} - ${p.last_name}`}
                    />
                ))}
            </select>
            <ButtonForm buttonType='primary' text={"ajouter"} />
        </form>
    )
}


export default FormMatchSimple;