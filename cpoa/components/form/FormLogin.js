import Form from "../form/Form";
import { useState } from 'react'

const FormLogin = () => {

    const [formData, setFormData] = useState({});

    const fields = {
        email: {type: "email", name: "email", text: "email", placeholder: 'email', required: true},
        password: {type: "password", name: "password", text: "password", placeholder: "mot de passe", required: true}
    };

    const formLogin = [
        fields.email,
        fields.password
    ];

    const log_user = () => {
        console.log("logged")
    };

    const onSubmit = (e) => {
        e.preventDefault();
        log_user()
    };

    return (
        <Form
            onSubmit={onSubmit}
            formTitle="Se connecter"
            setFormData={setFormData}
            formStructure={formLogin}
            formData={formData}
            buttonText="Se connecter"
        />
    )
};

export default FormLogin;