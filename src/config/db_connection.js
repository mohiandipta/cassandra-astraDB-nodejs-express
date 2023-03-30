import { Client } from "cassandra-driver";
import dotenv from "dotenv";
dotenv.config();

const SECURE_CONNECT_BUNDLE = "./secure-connect-myastracluster.zip";
const USERNAME = process.env.ASTRA_USERNAME;
const PASSWORD = process.env.ASTRA_PASSWORD;
const KEYSPACE = "spacecraft";

function init_connection() {
  var connection = {};
  connection.client = new Client({
    cloud: { secureConnectBundle: SECURE_CONNECT_BUNDLE },
    keyspace: KEYSPACE,
    credentials: { username: USERNAME, password: PASSWORD },
  });
  
  connection.client.connect((err)=>{
    if (err) {
      console.log("erron in db connection!");
    }
    else {
      console.log('db connected!')
    }
  })
  return connection;
}

export const connection = init_connection();
