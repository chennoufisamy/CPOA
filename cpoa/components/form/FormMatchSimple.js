import { useState } from 'react';
import Form from "../form/Form";

export const getStaticProps = async () => {
	const res = await fetch("http://localhost:3000/api/players");
	const data = await res.json();
	return {
	  props: { players: data }
	}
}

const FormMatchSimple = ({ players }) => {

    const [formData, setFormData] = useState({});

    const fields = {
        datetime: {type: "datetime-local", name: "datetime", text: "datetime", placeholder: "date et heure", required: true},
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

    const add = () => {
        let data = {content: [formData['firstname'], formData['lastname'], formData['country']]}
        axios.post("http://localhost:3000/api/add_match", data);
        alert("Joueur ajouté");
    };

    const onSubmit = (e) => {
        e.preventDefault();
        add();
    };

    return (
        <Form
            onSubmit={onSubmit}
            formTitle="Ajouter un match simple"
            setFormData={setFormData}
            formStructure={formMatchSimple}
            formData={formData}
            buttonText="Ajouter"
        />
    )
}

export default FormMatchSimple;