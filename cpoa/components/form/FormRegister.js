import Form from "../form/Form";
import { useState } from 'react';
import { sha512 } from 'js-sha512';
//import axios from 'axios';

const FormRegister = () => {

    const [formData, setFormData] = useState({});

    const fields = {
        first_name: {type: "text", name: "firstname", text: "firstname", placeholder: "prénom", required: true},
        last_name: {type: "text", name: "lastname", text: "lastname", placeholder: "nom", required: true},
        dob: {type: "date", name: "dob", text: "dob", placeholder: "date de naissance", required: true},
        email: {type: "email", name: "email", text: "email", placeholder: 'email', required: true},
        confirm_email: {type: "email", name: "confirm_email", text: "email", placeholder: 'confirmer l\'email', required: true},
        password: {type: "password", name: "password", text: "password", placeholder: "mot de passe", required: true},
        confirm_password: {type: "password", name: "confirm_password", text: "password", placeholder: "confirmer le mot de passe", required: true}
    };

    const formRegister = [
        fields.first_name,
        fields.last_name,
        fields.dob,
        fields.email,
        fields.confirm_email,
        fields.password,
        fields.confirm_password
    ];
    //
    const add_user = async () => {
        const response = await fetch(url);
    }

    const register_user = () => {
        if (Object.keys(formData).length == 7) {
            if (formData['password'] === formData['confirm_password'] && formData['email'] === formData['confirm_email']) {
                if (formData['password'].length  >= 8) {
                    delete formData['confirm_email'];
                    delete formData['confirm_password'];
                    Object.keys(formData).map((key) => {
                        if (key != "dob") {
                            formData[key] = sha512(formData[key])
                        }
                    })
                    add_user()
                } else {
                    alert("Le mot de passe doit comporter au moins 8 caractères")
                }
            } else (
                alert("Les emails ou les mots de passes ne correspondent pas")
            )
        } else {
            alert("Champs incomplets")
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        register_user()
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