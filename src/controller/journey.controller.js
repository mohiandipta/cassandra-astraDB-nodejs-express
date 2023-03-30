import { connection } from "../config/db_connection.js";
import Time from "cassandra-driver";

const TimeUuid = Time.types.TimeUuid;

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

export const Create = async (req, res) => {
  try {
    const {spacecraft_name, journey_id, active, summary} = req.body
    const query = "INSERT INTO spacecraft_journey_catalog (spacecraft_name, journey_id, active, summary) VALUES (?,?,?,?);";

    const journey_Id = TimeUuid.now();

    const result = connection.client
      .execute(query, {
        spacecraft_name: spacecraft_name,
        journey_id: journey_Id,
        active: active,
        summary: summary,
      })

    res.status(200).json({
      data: result,
      message: "journey has been created!"
    });
  } catch (error) {
    console.error(error.message)
  }
}
