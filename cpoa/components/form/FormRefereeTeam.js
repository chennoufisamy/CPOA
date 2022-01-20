import Form from "../form/Form";
import { useState } from 'react';
import axios from "axios";

const FormTeamReferee = () => {

    const [formData, setFormData] = useState({});

    const fields = {
        main: {type: "number", name: "main", text: "main", placeholder: "n° de l'arbitre de chaise", required: true},
        r1: {type: "number", name: "r1", text: "r1", placeholder: "n° de l'arbitre n°1", required: true},
        r2: {type: "number", name: "r2", text: "r2", placeholder: "n° de l'arbitre n°2", required: true},
        r3: {type: "number", name: "r3", text: "r3", placeholder: "n° de l'arbitre n°3", required: true},
        r4: {type: "number", name: "r4", text: "r4", placeholder: "n° de l'arbitre n°4", required: true},
        r5: {type: "number", name: "r5", text: "r5", placeholder: "n° de l'arbitre n°5", required: true},
        r6: {type: "number", name: "r6", text: "r6", placeholder: "n° de l'arbitre n°6", required: true},
        r7: {type: "number", name: "r7", text: "r7", placeholder: "n° de l'arbitre n°7", required: true},
        r8: {type: "number", name: "r8", text: "r8", placeholder: "n° de l'arbitre n°8", required: true}
    };

    const formTeam = [
        fields.main,
        fields.r1,
        fields.r2,
        fields.r3,
        fields.r4,
        fields.r5,
        fields.r6,
        fields.r7,
        fields.r8,
    ];

    /*const is_valid = async () => {
        const res = await fetch(process.env.API_BASE_URL +  "referee");
        const data = await res.json();
    };*/

    const add = () => {
        let data = {content: [formData['main'], formData['r1'], formData['r2'], formData['r3'], formData['r4'], formData['r5'], formData['r6'], formData['r7'], formData['r8']]}
        axios.post("http://localhost:3000/api/add_referee_team", data);
        alert("Equipe ajouté");
    };

    const onSubmit = (e) => {
        e.preventDefault();
        add();
    };

    return (
        <Form
            onSubmit={onSubmit}
            formTitle="Ajouter une équipe d'arbitre"
            setFormData={setFormData}
            formStructure={formTeam}
            formData={formData}
            buttonText="Ajouter"
        />
    )
};

export default FormTeamReferee;