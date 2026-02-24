
import express from 'express';
import cors from 'cors';
import backendRoutes from './routes.js';
import admin from 'firebase-admin'
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
// import serviceAccount from "./serviceAccountKey.json" assert { type: "json" };
import { initDb, closeDb } from './db.js';
dotenv.config({ path: "../../.env" });


const serviceAccount = JSON.parse(process.env.ADMIN_SDK_CREDENTIALS_JSON)

const app = express();

 
app.use(
  cors({
    origin: "http://localhost:5173",// your frontend origin
    credentials: true,               // allow cookies
  })
);
app.use(express.json()); 
app.use(cookieParser());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


app.use('/api/backend', backendRoutes);

(async () => {
    await initDb();


const server = app.listen(5000, () => {
  console.log("Server listening on port 5000");
    });
 

  const shutdown = async () => {
    console.log("Shutting down...");
    await closeDb();
    server.close(() => process.exit(0));
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown)})();




