import { exec_query } from "../../lib/db";

const handler = async (req, res) => {
    try {
      const results = await exec_query(`
        SELECT * from matchs m JOIN match_double md ON m.id = md.id
    `);
      return res.json(results);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
};
  
export default handler;