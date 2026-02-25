
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

 
const allowedOrigins = [
  "https://physiohelp-page.web.app",
  "https://physiohelp-page.firebaseapp.com",
];

const corsOptions = {
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return cb(null, true);
    }
    return cb(new Error("Not allowed by CORS"));
  },
  credentials: true, // allow cookies
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.options('*', cors());
app.use(express.json()); 
app.use(cookieParser());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


app.use('/api/backend', backendRoutes);

(async () => {
    await initDb();

const PORT = process.env.PORT || 5000;
 
const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
    });
 

  const shutdown = async () => {
    console.log("Shutting down...");
    await closeDb();
    server.close(() => process.exit(0));
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown)})();


