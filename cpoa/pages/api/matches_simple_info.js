import { exec_query } from "../../lib/db";

const handler = async (req, res) => {
    try {
      const results = await exec_query(`
        SELECT 
        m.id as match_id, 
        m.date, 
        m.slave_team, 
        m.day, 
        m.court_id, 
        ms.player1, 
        ms.player2, 
        ms.referee_team, 
        p1.first_name as p1_fn,
        p1.last_name as p1_ln,
        p1.country as p1_c,
        p2.first_name as p2_fn,
        p2.last_name as p2_ln,
        p2.country as p2_c
        FROM matchs m JOIN match_simple ms ON m.id = ms.id JOIN player p1 ON ms.player1 = p1.id JOIN player p2 ON ms.player2 = p2.id
    `);
      return res.json(results);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
};
  
export default handler;