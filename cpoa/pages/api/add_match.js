import { exec_query } from "../../lib/db";

const handler = async (req, res) => {
  	try {
		const results = await exec_query(
		`
			INSERT INTO matchs (slave_team, id, date, day, court_id) VALUES ((SELECT id from slave_team ORDER BY RAND() LIMIT 1), ?, ?, ?, ?)
		`,
			req.body.content
		);
    	return res.json(results);
  	} catch (e) {
    	res.status(500).json({ message: e.message });
  	}
};


export default handler;
