import { MongoClient } from 'mongodb'

const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log('Connected successfully to MongoDB');
  } finally {
    await client.close();
  }
}

run().catch(console.error);