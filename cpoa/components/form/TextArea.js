import styles from './form.module.css'

const Textarea = ({
    text,
    type,
    placeholder = text,
    handleChange,
    name,
    id = name,
    required = false
}) => {
    return (
        <textarea
            className={styles.textarea}
            required={required}
            name={name}
            id={name}
            type={type}
            placeholder={placeholder}
            onChange={handleChange}/>
    )
}

export default Textarea;