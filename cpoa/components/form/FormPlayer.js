import Form from "../form/Form";
import { useState } from 'react';
import countries from "../../coutries.json";
import axios from "axios";

const FormPlayer = () => {

    const [formData, setFormData] = useState({});

    const countriesList = [];
    for (const [key, value] of Object.entries(countries)) {
        countriesList.push({value: key, text: value})
    }

    const fields = {
        firstname: {type: "text", name: "firstname", text: "firstname", placeholder: "prénom", required: true},
        lastname: {type: "text", name: "lastname", text: "lastname", placeholder: "nom", required: true},
        countries: {type: "select", name: "country", select: countriesList, required: true}
    };

    const formCountries = [
        fields.firstname,
        fields.lastname,
        fields.countries
    ];

    const add = () => {
        let data = {content: [formData['firstname'], formData['lastname'], formData['country']]}
        axios.post("http://localhost:3000/api/add_player", data);
        alert("Joueur ajouté");
    };

    const onSubmit = (e) => {
        e.preventDefault();
        add();
    };

    return (
        <Form
            onSubmit={onSubmit}
            formTitle="Ajouter un joueur"
            setFormData={setFormData}
            formStructure={formCountries}
            formData={formData}
            buttonText="Ajouter"
        />
    )
};

export default FormPlayer;