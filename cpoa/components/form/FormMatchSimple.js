import { useState } from 'react';
import Input from './Input';
import Option from './Option';
import styles from './form.module.css'
import ButtonForm from './ButtonForm';
import axios from 'axios';

const FormMatchSimple = ({ players }) => {

    const [formData, setFormData] = useState({});

    const fields = {
        datetime: {type: "date", name: "datetime", text: "datetime", placeholder: "date et heure", required: true},
        referee_team: {type: "number", name: "referee", text: "referee", placeholder: "n° équipe arbitre", required: true},
        slave_team: {type: "number", name: "slave", text: "slave", placeholder: "n° équipe ramasseur", required: true},
        day: {type: "text", name: "day", text: "day", placeholder: "jour", required: true},
        court: {type: "number", name: "court", text: "court", placeholder: "n° du court", required: true},
    };

    const formMatchSimple = [
        fields.datetime,
        fields.referee_team,
        fields.slave_team,
        fields.day,
        fields.court
    ];

    const handleChange = event => {
        const formDataCopy = { ...formData };
        formDataCopy[event.target.name] = event.target.value;
        setFormData(formDataCopy);
    };

    const add = () => {
        let data = {content: [formData['datetime'], formData['referee'], formData['slave'], formData['day'], formData['court']]}
        let data_simple = {content: [formData['p1'], formData['p2']]}
        //axios.post("http://localhost:3000/api/add_match", data);
        axios.post("http://localhost:3000/api/add_match", data_simple);
        alert("Match ajouté");
    };

    const onSubmit = (e) => {
        e.preventDefault();
        add();
        console.log(formData)
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
            name={"p1"}
            value={formData['p1']}
            onChange={handleChange}>
                {players.map((p) => (
                    <Option 
                    key={p.id}
                    value={p.id}
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
                    value={p.id}
                    text={`${p.id} - ${p.first_name} - ${p.last_name}`}
                    />
                ))}
            </select>
            <ButtonForm buttonType='primary' text={"ajouter"} />
        </form>
    )
}


export default FormMatchSimple;