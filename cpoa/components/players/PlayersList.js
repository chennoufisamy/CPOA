import styles from './PlayersList.module.css';

const PlayersList = ({ players }) => {
  return (
		<ul>
		{players.map((p) => (
			<li key={p.id} className={styles.container_player}>
				<p>{p.first_name}</p>
				<p>{p.last_name}</p>
				<p>{p.country}</p>
			</li>
		))}
		{console.log(players)}
    	</ul>
  	);
};

export default PlayersList;
