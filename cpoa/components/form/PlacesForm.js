import Form from "../form/Form";
import { useState } from 'react';
import Router, { useRouter } from 'next/router'

const FormLogin = () => {

    const router = useRouter();
    const { id } = router.query

    const [formData, setFormData] = useState({});

    const countries = {
		match1: { value: "match1", text: "match1"},
		match2: { value: "match2", text: "match2"},
		match3: { value: "match3", text: "match3"}
	};

	const selectMatchs = [
		countries.match1,
		countries.match2,
		countries.match3
	];

    const fields = {
        quantity: {type: "number", name: "quantity", text: "quantity", placeholder: "quantité", required: true},
        places: {type: "text", name: "places", text: "places", placeholder: "places", required: true},
        matchs: {type: "select", name: "matchs", select: selectMatchs, required: true},
        age: {type: "checkbox", name: "age", text: "age", placeholder: "Moins de 12 ans?", required: false}
    };

    const formLogin = [
        fields.matchs,
        fields.quantity,
        fields.places,
        fields.age
    ];

    const compute_price = (cat) => {
        if (id === "bgp") {
            console.log("yes")
        }
    }

    const pay = () => {
        if (Object.keys(formData).length == 3) {
            formData['places'] = formData['places'].replace(/[\W_]+/g," ").split(" ")
            console.log(formData)
            if (formData['quantity'] == formData['places'].length) {
                Router.push('/payement');
            }
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        compute_price()
        pay();
        
    };

    return (
        
        <Form
            onSubmit={onSubmit}
            formTitle="Choix des places"
            setFormData={setFormData}
            formStructure={formLogin}
            formData={formData}
            buttonText="Payer"
        />
    )
};

export default FormLogin;