import { exec_query } from "../../../lib/db";

const handler = async (req, res) => {
  	try {
		const results = await exec_query(
		`
			INSERT INTO user (first_name, last_name, date_of_birth, email, password) VALUES (?, ?, ?, ?, ?)
		`,
			//[req.query.fn, req.query.ln, req.query.dob, req.query.em, req.query.pa]
			req.body.content
		);
    	return res.json(results);
  	} catch (e) {
    	res.status(500).json({ message: e.message });
  	}
};

export default handler;
