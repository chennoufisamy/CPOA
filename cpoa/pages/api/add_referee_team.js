import { exec_query } from "../../lib/db";

const handler = async (req, res) => {
  	try {
		const results = await exec_query(
		`
			INSERT INTO referee_team (main_referee, referee1, referee2, referee3, referee4, referee5, referee6, referee7, referee8) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
		`,
			req.body.content
		);
    	return res.json(results);
  	} catch (e) {
    	res.status(500).json({ message: e.message });
  	}
};


export default handler;
