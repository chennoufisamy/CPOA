import { useState } from 'react';
import Form from "../form/Form";

const FormMatchDouble = () => {

    const [formData, setFormData] = useState({});

    const fields = {
        datetime: {type: "datetime-local", name: "datetime", text: "datetime", placeholder: "date et heure", required: true},
        referee_team: {type: "number", name: "referee", text: "referee", placeholder: "n° équipe arbitre", required: true},
        slave_team: {type: "number", name: "slave", text: "slave", placeholder: "n° équipe ramasseur", required: true},
        day: {type: "text", name: "day", text: "day", placeholder: "jour", required: true},
        court: {type: "number", name: "court", text: "court", placeholder: "n° du court", required: true},
        id1: {type: "number", name: "id1", text: "id1", placeholder: "n° équipe 1", required: true},
        id2: {type: "number", name: "id2", text: "id2", placeholder: "n° équipe 2", required: true}
    };

    const formMatchDouble = [
        fields.datetime,
        fields.referee_team,
        fields.slave_team,
        fields.day,
        fields.court,
        fields.id1,
        fields.id2
    ];

    const add = () => {
        /*let data = {content: [formData['firstname'], formData['lastname'], formData['country']]}
        axios.post("http://localhost:3000/api/add_player", data);
        alert("Joueur ajouté");*/
    };

    const onSubmit = (e) => {
        e.preventDefault();
        add();
    };

    return (
        <Form
            onSubmit={onSubmit}
            formTitle="Ajouter un match Double"
            setFormData={setFormData}
            formStructure={formMatchDouble}
            formData={formData}
            buttonText="Ajouter"
        />
    )
}

export default FormMatchDouble;