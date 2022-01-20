import { exec_query } from "../../lib/db";

const handler = async (req, res) => {
  	try {
		const results = await exec_query(
		`
			INSERT INTO match_double (referee_team, id, team1, team2) VALUES ((SELECT r.id from referee r JOIN referee_team rt ON r.id = rt.main_referee WHERE lower(country) NOT IN (SELECT lower(country) FROM player WHERE id = ${req.body.bonus[0]} OR id = ${req.body.bonus[1]} OR id = ${req.body.bonus[2]} OR id = ${req.body.bonus[3]}) ORDER BY RAND() LIMIT 1), ?, ?, ?)
		`,
			req.body.content
		); 
    	return res.json(results);
  	} catch (e) {
    	res.status(500).json({ message: e.message });
  	}
};

/*
SELECT r.id FROM referee r JOIN referee_team rt ON r.id = r.main_referee WHERE r.country <> (SELECT country FROM player )
*/
export default handler;
