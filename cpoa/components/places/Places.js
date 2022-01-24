import styles from './places.module.css';
import PlacesForm from '../form/PlacesForm';
import {image} from "../../public/images/parc.png"

const Places = () => {
    
    const blueSits = (s, n) => {
        let sits_list = []
        for (let i=1; i <= n; i++) {
            sits_list.push(
            <p className={styles.blue_sits}>{`${s}${i < 10 ? "0"+i : i}`}</p>
            )
        }
        return sits_list;
    }

    const sits = (side, s, n) => {
        return (
            <div className={styles.container_sits}>
            <h2>Façace {side}</h2>
            <p className={styles.container_gray}>{s}gr</p>
            <p className={styles.container_orange}>{s}or</p>
            <div className={styles.container_blue}>
                {blueSits(s, n)}
            </div>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.container_places}>
                <img src="/images/parc.png"/>
            </div>
            <PlacesForm />
        </div>
        
    )
}

export default Places