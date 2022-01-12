import { exec_query } from "../../lib/db";

const handler = async (_, res) => {
    try {
      const results = await exec_query(`
        SELECT * FROM matchs
    `);
      return res.json(results);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };
  
export default handler;