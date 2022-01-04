import Form from "../form/Form";
import { useState } from 'react';
import { sha512 } from 'js-sha512';

const FormRegister = () => {

    const [formData, setFormData] = useState({});

    const fields = {
        first_name: {type: "text", name: "firstname", text: "firstname", placeholder: "prénom", required: true},
        last_name: {type: "text", name: "lastname", text: "last", placeholder: "nom", required: true},
        email: {type: "email", name: "email", text: "email", placeholder: 'email', required: true},
        confirm_email: {type: "email", name: "confirm_email", text: "email", placeholder: 'confirmer l\'email', required: true},
        password: {type: "password", name: "password", text: "password", placeholder: "mot de passe", required: true},
        confirm_password: {type: "password", name: "confirm_password", text: "password", placeholder: "confirmer le mot de passe", required: true}
    };

    const formRegister = [
        fields.first_name,
        fields.last_name,
        fields.email,
        fields.confirm_email,
        fields.password,
        fields.confirm_password
    ];

    const log_user = () => {
        Object.keys(formData).map((key) => {
            formData[key] = sha512(formData[key])
        })
        console.log(formData)
    };

    const onSubmit = (e) => {
        e.preventDefault();
        log_user()
    };

    return (
        <Form
            onSubmit={onSubmit}
            formTitle="Créer un compte"
            setFormData={setFormData}
            formStructure={formRegister}
            formData={formData}
            buttonText="S'enregistrer"
        />
    )
};

export default FormRegister;