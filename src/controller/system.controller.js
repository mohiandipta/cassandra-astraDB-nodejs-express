import { connection } from "../config/db_connection.js";

export const Index = async (req, res) => {
  try {
    const rs = await connection.client.execute("SELECT * FROM system.local");
    console.log(`Hello from cluster: ${rs.first()["cluster_name"]}`);
    return res.status(200).json({
      data: rs,
    });
  } catch (err) {
    console.error(err.message);
  }
};
