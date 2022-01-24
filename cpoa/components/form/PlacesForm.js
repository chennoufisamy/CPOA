import { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import { useUser } from "@auth0/nextjs-auth0";
import axios from 'axios';
import styles from './form.module.css';
import Input from './Input';
import Option from './Option';
import ButtonForm from './ButtonForm';

const FormPlaces = () => {

    const router = useRouter();
    const { id } = router.query;
    const { user } = useUser();

    const [formData, setFormData] = useState({});
    const [matchs, setMatchs] = useState([])

    useEffect(() => {
        async function fetchData() {
            const res = await axios.get("http://localhost:3000/api/matchs");
            setMatchs(res.data);
        }
        fetchData();
    }, []);

    const places = [
        {id: "1", text: "catégorie 1"},
        {id: "2", text: "catégorie 2"},
        {id: "3", text: "loges"}
    ]

    const handleChange = event => {
        const formDataCopy = { ...formData };
        formDataCopy[event.target.name] = event.target.value;
        setFormData(formDataCopy);
    };

    const fields = {
        quantity: {type: "number", name: "quantity", text: "quantity", placeholder: "quantité", required: true},
        places: {type: "text", name: "places", text: "places", placeholder: "places", required: true},
        age: {type: "checkbox", name: "age", text: "age", placeholder: "Moins de 12 ans?", required: false},
        licence_number: {type: "number", name:"licence", text: "licence", placeholder: "numéro de licence", require: true},
        discount_code: {type: "text", name:"discount", text: "discount", placeholder: "code promotionnel", require: true}
    };

    const formPlaces = [
        fields.quantity,
        fields.age
    ];

    if (id === "bl") {
        formPlaces.push(fields.licence_number);
    } else if (id === "bjs") {
        formPlaces.push(fields.discount_code);
    }

    const default_price = (day, cat) => {
        if ("age" in formData) {
            switch (day) {
                case "dimanche":
                    return cat == 1 ? 30 : 20;
                case "lundi":
                    return cat == 1 ? 30 : 20;
                case "mardi":
                    return cat == 1 ? 30 : 20;
                case "mercredi":
                    return cat == 1 ? 40 : 25;
                case "jeudi":
                    return cat == 1 ? 45 : 30;
                case "vendredi":
                    return cat == 1 ? 60 : 38;
                case "samedi":
                    return cat == 1 ? 60 : 38;
            }
        }
        switch (day) {
            case "dimanche":
                return cat == 1 ? 30 : 25;
            case "lundi":
                return cat == 1 ? 30 : 25;
            case "mardi":
                return cat == 1 ? 30 : 25;
            case "mercredi":
                return cat == 1 ? 40 : 30;
            case "jeudi":
                return cat == 1 ? 45 : 65;
            case "vendredi":
                return cat == 1 ? 60 : 48;
            case "samedi":
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

    const pay = async () => {
        let user_id = user.sub.split('|')[1];
        let place = formData['places'];
        let day = formData['match'].split(" ")[1];
        let type = ticket_type();

        if (id === "bgp" || id === "tbm") {
            for (let i=0; i < formData['quantity']; i++) {
                let price = default_price(day, formData['places']);
                let data = {content: [user_id, formData['match'].split(" ")[0], place, price, type]}
                await axios.post("http://localhost:3000/api/ticket", data)
            }
            return true;
        } else if (id === "bjs" || id === "bl") {
            for (let i=0; i < formData['quantity']; i++) {
                let price = discount_price(day, formData['places']);
                let data = {content: [user_id, formData['match'].split(" ")[0], place, price, type]}
                await axios.post("http://localhost:3000/api/ticket", data)
            }
            return true;
        } 
        return false;
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

    const onSubmit = async (e) => {
        e.preventDefault();
        if (await pay()) {
            //Router.push('/payement');
        }
        //redirect();
    };

    

    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <h2 className={styles.title}>Choix du match</h2>
            <select 
            className={styles.select}
            name={"match"}
            value={formData['match']}
            onChange={handleChange}>
                <option>Sélectionner un match</option>
                {matchs.map(m => (
                    <Option
                        key={m.id}
                        value={`${m.id} ${m.day}`}
                        text={`${m.day} - ${m.date} - court n°${m.court_id}`}
                    />
                ))}
            </select>
            <select 
            className={styles.select}
            name={"places"}
            value={formData['places']}
            onChange={handleChange}>
                <option>Sélectionner une place</option>
                {places.map(p => (
                    <Option
                        key={p.id}
                        value={p.id}
                        text={p.text}
                    />
                ))}
            </select>
            {formPlaces.map(m => (
                m.type != "checkbox" ?
                <Input
                key={m.name}
                type={m.type}
                name={m.name}
                id={m.name}
                text={m.text}
                handleChange={handleChange}
                placeholder={m.placeholder}
                required={m.required}
                />
                :
                <div className={styles.container_ckeckbox}>
                    <label for={m.name}>{m.placeholder}</label>
                    <Input
                        key={m.name}
                        type={m.type}
                        name={m.name}
                        id={m.id}
                        text={m.text}
                        handleChange={handleChange}
                        placeholder={m.placeholder}
                        required={m.required}
                    />
                </div>
            ))}
            <ButtonForm buttonType='primary' text={"payer"} />
        </form>
    )
};

export default FormPlaces;