import { exec_query } from "../../lib/db";

const handler = async (req, res) => {
  	try {
		const results = await exec_query(
		`
			INSERT INTO match_simple (referee_team, id, player1, player2) VALUES ((SELECT r.id from referee r JOIN referee_team rt ON r.id = rt.main_referee WHERE lower(country) <> '${req.body.bonus[0]}' AND lower(country) <> '${req.body.bonus[1]}' AND category = 'ITT1' ORDER BY RAND() LIMIT 1), ?, ?, ?)
		`,
			req.body.content
		);
    	return res.json(results);
  	} catch (e) {
    	res.status(500).json({ message: e.message });
  	}
};
export default handler;
