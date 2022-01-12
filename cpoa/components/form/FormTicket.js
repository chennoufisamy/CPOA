import Form from "../form/Form";
import { useState } from 'react'

const FormTicket = () => {

    const [formData, setFormData] = useState({});

    const fields = {
        quantity: {type: "number", name: "quantity", text: "quantity", placeholder: "quntité", required: true}
    };

    const formTicket = [
        fields.quantity
    ];

    const buy = () => {
        console.log("bought")
    };

    const onSubmit = (e) => {
        e.preventDefault();
        buy()
    };

    return (
        <Form
            onSubmit={onSubmit}
            formTitle="Choix des places"
            setFormData={setFormData}
            formStructure={formTicket}
            formData={formData}
            buttonText="Payer"
        />
    )
};

export default FormTicket;