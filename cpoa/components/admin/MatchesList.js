import styles from "./admin.module.css";
import MatchesItem from "./MatchesItem";

const MatchesList = ({ matches }) => {

    return (
        <div className={styles.container}>
            {matches.map(m => (
                <MatchesItem match={m}/>
            ))}
        </div>
    )

} 

export default MatchesList;