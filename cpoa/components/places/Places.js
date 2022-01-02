import styles from './places.module.css';

const Places = () => {
    
    const blueSits = (side, n) => {
        let sits_list = []
        for (let i=0; i < n; i++) {
            sits_list.push(
            <div className={styles.container_blue}>
                <input className={styles.checkbox_blue} type="checkbox" name="blue" value={side+i} />
                <span className={styles.blue_sits}></span>
            </div>
            )
        }
        return sits_list
    }

    return (
        <form className={styles.form}>
            <div className={styles.container_east}>
                <div className={styles.container_gray}>
                    <input className={styles.checkbox_gray} type="checkbox" name="gray" value="gray" />
                    <span className={styles.gray_sits}></span>
                </div>
                {blueSits("e", 16)}
            </div>
            <div className={styles.container_west}>
                {blueSits("w", 16)}
            </div>
        </form>
    )
}

export default Places