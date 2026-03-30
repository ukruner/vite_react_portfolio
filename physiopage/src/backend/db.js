import { MongoClient } from 'mongodb';
import dotenv from "dotenv";


dotenv.config({ path: "../../.env" });

const M_URI= process.env.MONGO_DB_URI
 
   if (!M_URI) {
    throw new Error("MONGODB_URI is missing");
  }


  const client = new MongoClient(M_URI);
  const dbName = "physiodb";
  const collectionName = "QuestionnaireData";
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

export async function initDb(){
  await client.connect();
  const db = client.db("physiodb");
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

export function getDb() {
    return client.db(dbName);
  };

   export async function closeDb() {
    await client.close();
  }
