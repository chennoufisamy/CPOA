import styles from "./hamburger.module.css"

const Hamburger = () => {

    function handleClick() {
        console.log("clicked")
    }

    return (
        <button onClick={handleClick} className={styles.container_hamburger}>
            <span className={styles.layer}></span>
            <span className={styles.layer}></span>
            <span className={styles.layer}></span>
        </button>
    )
}

export default Hamburger;