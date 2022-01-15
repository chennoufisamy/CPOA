import Form from "../form/Form";
import { useState } from 'react';
import countries from "../../coutries.json";
import axios from "axios";

const FormTeam = () => {

    const [formData, setFormData] = useState({});

    const countriesList = [];
    for (const [key, value] of Object.entries(countries)) {
        countriesList.push({value: key, text: value})
    };

    const fields = {
        id1: {type: "number", name: "id1", text: "id1", placeholder: "n° du joueur 1", required: true},
        id2: {type: "number", name: "id2", text: "id2", placeholder: "n° du joueur 2", required: true}
    };

    const formTeam = [
        fields.id1,
        fields.id2
    ];

    const is_valid = async () => {
        const res = await fetch("http://localhost:3000/api/team");
        const data = await res.json();
        for (const team of data) {
            if (formData['id1'] == team['player1'] || formData['id2'] == team['player2']) {
                alert("Un des joeurs est déja présent dans une équipe");
                return false;
            }
        }
        return true;
    };

    const add = async () => {
        if (await is_valid()) {
            if (formData['id1'] !== formData['id2']) {
                let data = {content: [formData['id1'], formData['id2']]}
                axios.post("http://localhost:3000/api/add_team", data);
                alert("Equipe ajouté");
                setFormData({});
            } else {
                alert("Le numéro est le même pour les deux joueurs");
            }
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        add();
    };

    return (
        <Form
            onSubmit={onSubmit}
            formTitle="Ajouter une équipe"
            setFormData={setFormData}
            formStructure={formTeam}
            formData={formData}
            buttonText="Ajouter"
        />
    )
};

export default FormTeam;