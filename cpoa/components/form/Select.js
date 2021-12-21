import Option from './Option';
import styles from './form.module.css'

const Select = ({ 
    name,
    selectData,
    handleChange
}) => {
    return (
        <select
        className={styles.select}
        name={name}
        value=""
        onChange={handleChange}
        >
            {selectData.map(f => (
                <Option 
                    key={f.text}
                    value={f.value}
                    text={f.text}
                />
            ))};
        </select>
    )
}

export default Select;