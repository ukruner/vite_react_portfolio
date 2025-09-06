
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import backendRoutes from './routes/gemini.js';
import admin from 'firebase-admin'
import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

const serviceAccount = {
  "type": process.env.ADMIN_SDK_TYPE,
  "project_id": process.env.ADMIN_SDK_PROJECTID,
  "private_key_id": process.env.ADMIN_SDK_PRIVATE_KEY_ID,
"private_key": process.env.ADMIN_SDK_PRIVATE_KEY,
  "client_email": process.env.ADMIN_SDK_EMAIL,
  "client_id": process.env.ADMIN_SDK_CLIENT_ID,
  "auth_uri": process.env.ADMIN_SDK_AUTH_URI,
  "token_uri": process.env.ADMIN_SDK_TOKEN_URI,
  "auth_provider_x509_cert_url": process.env.ADMIN_SDK_AUTH_CERT_URL,
  "client_x509_cert_url": process.env.ADMIN_SDK_CLIENT_CERT_URL,
  "universe_domain": process.env.ADMIN_SDK_UNIVERSE_DOMAIN
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app = express();

app.use(cors()); 
app.use(bodyParser.json()); 


app.use('/api/backend', backendRoutes);


app.listen(5000, () => {
    console.log(`Server listening on port 5000`);
});




