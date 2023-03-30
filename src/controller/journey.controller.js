import { connection } from "../../db_connection.js";

export const Index = async (req, res) => {
    try {
      const result = await connection.client.execute(
        "SELECT * FROM spacecraft_journey_catalog"
      );
      return res.status(200).json({
        data: result.rows,
      });
    } catch (error) {
      console.error(error.message)
    }
}
