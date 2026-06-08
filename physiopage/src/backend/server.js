
import express from 'express';
import cors from 'cors';
import backendRoutes from './routes.js';
import admin from 'firebase-admin'
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
// import serviceAccount from "./serviceAccountKey.json" assert { type: "json" };
import { initDb, closeDb } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, "../../.env") });


const serviceAccount = JSON.parse(process.env.ADMIN_SDK_CREDENTIALS_JSON)

const app = express();
app.set('etag', false);

 
const allowedOrigins = [
  "https://physiohelp-page.web.app",
  "https://physiohelp-page.firebaseapp.com",
];

const corsOptions = {
  origin: (origin, cb) => {
    const isLocalDevOrigin =
      /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin || "");

    if (!origin || isLocalDevOrigin || allowedOrigins.includes(origin)) {
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

const PORT = process.env.PORT || 5000;
 
const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
    });

initDb().catch((error) => {
  console.error("Database initialization failed:", error);
});

app.use((error, req, res, next) => {
  if (error?.message === "Not allowed by CORS") {
    return res.status(403).json({ error: "Not allowed by CORS" });
  }

  console.error("Unhandled backend error:", error);
  return res.status(500).json({ error: "Internal server error" });
});
 

  const shutdown = async () => {
    console.log("Shutting down...");
    try {
      await closeDb();
    } catch (error) {
      console.error("Database shutdown failed:", error);
    } finally {
      server.close(() => process.exit(0));
    }
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
