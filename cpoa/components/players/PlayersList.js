import styles from './PlayersList.module.css';

const PlayersList = ({ players }) => {
  return (
		<ul className={styles.container_players}>
			<h1>Liste des joueurs</h1>
		{players.map((p) => (
			<li key={p.id} className={styles.container_player}>
				{p.first_name} {p.last_name}, {p.country}
			</li>
		))}
    	</ul>
  	);
};

export default PlayersList;
