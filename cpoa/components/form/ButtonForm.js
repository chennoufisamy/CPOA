import styles from './form.module.css'

const ButtonForm = ({ text, clicked, buttonType, name=null }) => {
	return (
		<div>
			<button name={name} onClick={clicked} className={styles.button}>{text}</button>
		</div>
	);
};

export default ButtonForm;