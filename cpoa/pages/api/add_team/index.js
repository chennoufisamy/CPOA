import { exec_query } from "../../../lib/db";

const handler = async (req, res) => {
  	try {
		const results = await exec_query(
		`
			INSERT INTO player_team (player1, player2) VALUES (?, ?)
		`,
			req.body.content
		);
    	return res.json(results);
  	} catch (e) {
    	res.status(500).json({ message: e.message });
  	}
};


export default handler;
