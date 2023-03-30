import express from "express";
import dotenv from "dotenv";
import { connection } from "./db_connection.js";
import Time from "cassandra-driver";
import bodyParser from "body-parser";
import {router} from "./src/routes/index.js"

const TimeUuid = Time.types.TimeUuid;
dotenv.config();
const port = process.env.SERVER_PORT;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router)

app.get("/create", async (req, res) => {
  try {
    const journey_id = TimeUuid.fromString(
      "84121060-c66e-11ea-a82e-f931183227ac"
    );
    const spacecraft_name = "Crew Dragon Endeavour,SpaceX";

    const insert =
      "INSERT INTO spacecraft_journey_catalog (spacecraft_name, journey_id, active, summary) VALUES (?,?,?,?);";
    const params = [
      spacecraft_name,
      journey_id,
      false,
      "Bring Astronauts to ISS",
    ];

    connection.client
      .execute(insert, params)
      .then(function (result) {
        console.log("Journey created : %s", journey_id.toString());
        console.log("SUCCESS");
        connection.client.shutdown();
      })
      .catch(function (error) {
        console.log(error.message);
        connection.client.shutdown();
      });
    res.json({
        data: result
    })
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.listen(port, () => {
  console.log(`server running at: port:: ${port}`);
});
