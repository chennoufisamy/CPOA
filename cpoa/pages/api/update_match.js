import { exec_query } from '../../lib/db';

const handler = async (req, res) => {
  	try {
		const results = await exec_query(
		`
			UPDATE matchs SET date = ?, day = ?, court_id = ? WHERE id = ?
		`,
			req.body.content
		);  
    	return res.json(results);
  	} catch (e) {
    	res.status(500).json({ message: e.message });
  	}
};

export default handler;
