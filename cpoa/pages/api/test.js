import { exec_query } from "../../lib/db";

const handler = async (_, res) => {
    let c1 = 'france';
    let c2 = 'germany'
    try {
      const results = await exec_query(`
      SELECT id from slave_team ORDER BY RAND() LIMIT 1
    `);
      return res.json(results);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };
  
//SELECT r.id from referee r JOIN referee_team rt ON r.id = rt.main_referee WHERE lower(country) <> '${c1}' AND lower(country) <> '${c2}' AND category = 'ITT1' ORDER BY RAND() LIMIT 1
export default handler;