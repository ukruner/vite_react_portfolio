import { MongoClient } from 'mongodb';
import dotenv from "dotenv";
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, "../../.env") });

const M_URI= process.env.MONGO_DB_URI
 
   if (!M_URI) {
    throw new Error("MONGODB_URI is missing");
  }


  const dbName = "physiodb";
  const collectionName = "QuestionnaireData";
  let client;
  let db;
  let connectionPromise;
const schemaValidator = {
  "$jsonSchema": {
    "bsonType": "object",
    "required": [
      "bodypart",
      "duration",
      "radiodiagnosis"
    ],
    "properties": {
      "_id": {
        "bsonType": "objectId"
      },
      "apptfrequency": {
        "bsonType": "string"
      },
      "bodypart": {
        "bsonType": "string"
      },
      "caremodality": {
        "bsonType": "string"
      },
      "careprovider": {
        "bsonType": "string"
      },
      "diagnosisdetail": {
        "bsonType": "string"
      },
      "duration": {
        "bsonType": "string"
      },
      "exercisecount": {
        "bsonType": "string"
      },
      "offwork": {
        "bsonType": "string"
      },
      "offworkduration": {
        "bsonType": "string"
      },
      "radiodiagnosis": {
        "bsonType": "string"
      },
      "radioeducation": {
        "bsonType": "string"
      },
      "radiomenopause": {
        "bsonType": "string"
      },
      "radiopregnancy": {
        "bsonType": "string"
      },
      "treatment": {
        "bsonType": "string"
      },
      "uid": {
        "bsonType": "string"
      },
      "user": {
        "bsonType": "string"
      }}}};

async function connectDb() {
  if (db) {
    return db;
  }

  if (!connectionPromise) {
    client = new MongoClient(M_URI);
    connectionPromise = client.connect()
      .then((connectedClient) => {
        db = connectedClient.db(dbName);
        return db;
      })
      .catch(async (error) => {
        try {
          await client?.close();
        } catch (closeError) {
          console.error("Mongo cleanup after failed connect failed:", closeError);
        } finally {
          client = undefined;
          db = undefined;
          connectionPromise = undefined;
        }
        throw error;
      });
  }

  return connectionPromise;
}

export async function initDb(){
  const db = await connectDb();
  try{
  await db.command({collMod: "QuestionnaireData", 
    validator: schemaValidator
    })
  
    console.log("Schema updated via collMod");
  }
  catch(err){
    if (err.codeName === "NamespaceNotFound") {
        await db.createCollection(collectionName, { validator:
  schemaValidator });
        console.log("Collection created with schema");
      } else {
        console.error("Schema setup failed:", err);
      }
  }
  return db;

}

export async function getDb() {
    return connectDb();
  };

   export async function closeDb() {
    await client?.close();
    client = undefined;
    db = undefined;
    connectionPromise = undefined;
  }
