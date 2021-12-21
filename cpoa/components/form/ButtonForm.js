import styles from './form.module.css'

const ButtonForm = ({ text, clicked, buttonType }) => {
	return (
		<div>
			<button onClick={clicked} className={styles.button}>{text}</button>
		</div>
	);
};

export default ButtonForm;