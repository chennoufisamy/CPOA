import Form from "../form/Form";
import { useState } from 'react';
import countries from "../../coutries.json";
import axios from "axios";

const FormReferee = () => {

    const [formData, setFormData] = useState({});

    const countriesList = [];
    for (const [key, value] of Object.entries(countries)) {
        countriesList.push({value: key, text: value})
    }

    const fields = {
        firstname: {type: "text", name: "firstname", text: "firstname", placeholder: "prénom", required: true},
        lastname: {type: "text", name: "lastname", text: "lastname", placeholder: "nom", required: true},
        countries: {type: "select", name: "country", select: countriesList, required: true},
        category: {type: "text", name: "category", text: "cat", placeholder: "category", required: true}
    };

    const formReferee = [
        fields.firstname,
        fields.lastname,
        fields.countries,
        fields.category
    ];

    const add = () => {
        let data = {content: [formData['firstname'], formData['lastname'], formData['country'], formData['category']]}
        axios.post("http://localhost:3000/api/add_referee", data);
        alert("Arbitre ajouté");
    };

    const onSubmit = (e) => {
        e.preventDefault();
        add();
    };

    return (
        <Form
            onSubmit={onSubmit}
            formTitle="Ajouter un arbitre"
            setFormData={setFormData}
            formStructure={formReferee}
            formData={formData}
            buttonText="Ajouter"
        />
    )
};

export default FormReferee;