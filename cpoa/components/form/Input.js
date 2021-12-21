import styles from './form.module.css'

const Input = ({
    text,
    type,
    placeholder = text,
    handleChange,
    name,
    id = name,
    required = false
}) => {
    return (
        <input
            className={styles.input}
            required={required}
            name={name}
            type={type}
            placeholder={placeholder}
            onChange={handleChange}
        />
    );
};

//<label htmlFor={id}>{text}</label>

export default Input;