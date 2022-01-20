import { exec_query } from "../../lib/db";

const handler = async (_, res) => {
    try {
      const results = await exec_query(`
      SELECT r.id from referee r JOIN referee_team rt ON r.id = rt.main_referee WHERE lower(country) NOT IN (SELECT lower(country) FROM player WHERE id = 33 OR id = 20 OR id = 19 OR id = 17) ORDER BY RAND() LIMIT 1
    `);
      return res.json(results);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
};
  

/*
select
  ordered_item.id as `Id`,
  ordered_item.Item_Name as `ItemName`,
  GROUP_CONCAT(Ordered_Options.Value) as `Options`
from
  ordered_item,
  ordered_options
where
  ordered_item.id=ordered_options.ordered_item_id
group by
  ordered_item.id
*/

//SELECT r.id from referee r JOIN referee_team rt ON r.id = rt.main_referee WHERE lower(country) <> '${c1}' AND lower(country) <> '${c2}' AND category = 'ITT1' ORDER BY RAND() LIMIT 1
export default handler;