import { useState } from 'react';
import styles from "./admin.module.css";
import ButtonForm from "../form/ButtonForm";
import axios from 'axios';

const MatchesDelete = ({ id }) => {

    const [formData, setFormData] = useState({id: id});

    const handleChange = event => {
        const formDataCopy = { ...formData };
        formDataCopy[event.target.name] = event.target.value;
        setFormData(formDataCopy);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        let data = {
            content: [id]
        }
        
        axios.post("http://localhost:3000/api/delete_match", data);
        alert('match supprimé');
    };

    return (
        <div>
            <form className={styles.match_form} onSubmit={onSubmit}>
                <ButtonForm buttonType='primary' text={"supprimer"} />
            </form>
        </div>
    )
}

export default MatchesDelete;