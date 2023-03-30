import express from "express";
import dotenv from "dotenv";
import Time from "cassandra-driver";
import bodyParser from "body-parser";
import {router} from "./src/routes/index.js"

dotenv.config();
const port = process.env.SERVER_PORT;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router)

app.listen(port, () => {
  console.log(`server running at: port:: ${port}`);
});
