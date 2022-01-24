import { exec_query } from "../../lib/db";

const handler = async (req, res) => {
    try {
      const results = await exec_query(`
        SELECT * FROM ticket t JOIN matchs m ON t.match_id = m.id WHERE user_id = '${req.query.id}'
    `);
      return res.json(results);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };
  
export default handler;