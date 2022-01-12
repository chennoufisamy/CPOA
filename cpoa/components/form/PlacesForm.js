import Form from "../form/Form";
import { useState } from 'react';
import Router, { useRouter } from 'next/router';
import { useUser } from "@auth0/nextjs-auth0";
import axios from 'axios';

export const getStaticProps = async () => {
	const res = await fetch("http://localhost:3000/api/matchs");
	const data = await res.json();
	return {
	  props: { matchs1: data }
	}
}

const FormPlaces = ({ matchs1 }) => {

    const router = useRouter();
    const { id } = router.query;
    const { user } = useUser();

    const [formData, setFormData] = useState({});

    const matchs = {
		match1: { value: "match1", text: "match1"},
		match2: { value: "match2", text: "match2"},
		match3: { value: "match3", text: "match3"}
	};

	const selectMatchs = [
		matchs.match1,
		matchs.match2,
		matchs.match3
	];

    const fields = {
        quantity: {type: "number", name: "quantity", text: "quantity", placeholder: "quantité", required: true},
        places: {type: "text", name: "places", text: "places", placeholder: "places", required: true},
        matchs: {type: "select", name: "matchs", select: selectMatchs, required: true},
        age: {type: "checkbox", name: "age", text: "age", placeholder: "Moins de 12 ans?", required: false},
        licence_number: {type: "text", name:"licence", text: "licence", placeholder: "numéro de licence", require: true},
        discount_code: {type: "text", name:"discount", text: "discount", placeholder: "code promotionnel", require: true}
    };

    const formPlaces = [
        fields.matchs,
        fields.quantity,
        fields.places,
        fields.age
    ];

    if (id === "bl") {
        formPlaces.push(fields.licence_number);
    } else if (id === "bjs") {
        formPlaces.push(fields.discount_code);
    }

    const default_price = (day, cat) => {
        if (!("age" in formData)) {
            switch (day) {
                case "sunday":
                    return cat == 1 ? 30 : 25;
                case "monday":
                    return cat == 1 ? 30 : 25;
                case "tuesday":
                    return cat == 1 ? 30 : 25;
                case "wednesday":
                    return cat == 1 ? 40 : 30;
                case "thursday":
                    return cat == 1 ? 45 : 65;
                case "friday":
                    return cat == 1 ? 60 : 48;
                case "saturday":
                    return cat == 1 ? 60 : 48;
            }
        }
        switch (day) {
            case "sunday":
                return cat == 1 ? 30 : 25;
            case "monday":
                return cat == 1 ? 30 : 25;
            case "tuesday":
                return cat == 1 ? 30 : 25;
            case "wednesday":
                return cat == 1 ? 40 : 30;
            case "thursday":
                return cat == 1 ? 45 : 65;
            case "friday":
                return cat == 1 ? 60 : 48;
            case "saturday":
                return cat == 1 ? 60 : 48;
        }
        return 150;
    }

    const discount_price = (day, cat) => {
        if (id === "bl") {
            let discount = 0.83;
        } else if (id === "bjs") {
            let discount = 0.80;
        }
        return default_price(day, cat) * discount;
    }

    const get_cat = (place) => {
        if (place.substring(1, 3) === "or") {
            return 1;
        } else if (place.substring(1, 3) === "gr") {
            return 2;
        } 
        return 1;
    }

    const ticket_type = () => {
        if (id === "bgp") {
            return 1;
        } else if (id === "bl") {
            return 2;
        } else if (id === "bjs") {
            return 3;
        } else if (id === "tbm") {
            return 4;
        } 
        return 0;
    }

    const pay = () => {
        if (id === "bgp" || id === "tbm") {
            for (let i=0; i < formData['quantity']; i++) {
                let user_id = user.sub.split('|')[1];
                let place = formData['places']
                let price = default_price("monday", get_cat(place));
                console.log("price " + price)
                console.log("form " + formData)
                let type = ticket_type();
                let data = {content: [user_id, i, place, price, type]}
                console.log("data " + data)
                axios.post("http://localhost:3000/api/ticket", data)
            }
        }
    }

    const redirect = () => {
        if (Object.keys(formData).length >= 3) {
            formData['places'] = formData['places'].replace(/[\W_]+/g," ").split(" ")
            console.log(formData)
            if (formData['quantity'] == formData['places'].length) {
                Router.push('/payement');
            }
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        pay()
        redirect();
        
    };

    return (
        
        <Form
            onSubmit={onSubmit}
            formTitle="Choix des places"
            setFormData={setFormData}
            formStructure={formPlaces}
            formData={formData}
            buttonText="Payer"
        />
    )
};

export default FormPlaces;