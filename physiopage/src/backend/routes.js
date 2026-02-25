
import { response, Router } from 'express';

import { GoogleGenerativeAI } from '@google/generative-ai';
import { validateToken, authRateLimit, resetAuthAttempts} from './authMiddleware.js';
import admin from 'firebase-admin';
import { getDb } from './db.js';



const router = Router();
const MODEL_NAME = "gemini-2.5-flash"; 





async function runGemini(prompt) {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response;
}

import { geminiRateLimit } from './ratelimit.js';



router.post("/sessionLogin", authRateLimit, async (req, res) => {
    const idToken = req.body.token;
    const rememberMe = req.body.rememberMe;
  const expiresIn = rememberMe ? 3600000 : 300000;
    
  try {
    const verifiedToken = await admin.auth().verifyIdToken(idToken);
    console.log("token verified")
    const sessionCookie = await admin
      .auth()
      .createSessionCookie(idToken, { expiresIn });

    const isProd = process.env.NODE_ENV === "production";
    const options = {
      sameSite: isProd ? "none" : "lax",
      httpOnly: true,
      secure: isProd,
    };
    if (rememberMe){
        options.maxAge = expiresIn
    };
    res.cookie("session", sessionCookie, options);
    resetAuthAttempts(req);

    res.status(200).json({ message: "Session created" });
  } catch (err) {
    console.error("Session login failed", err);
    res.status(401).send("UNAUTHORIZED REQUEST!");
  }
});

router.post("/logout", (req, res) => {
  const isProd = process.env.NODE_ENV === "production";
  res.clearCookie("session", {
    sameSite: isProd ? "none" : "lax",
    httpOnly: true,
    secure: isProd,
  });
  res.status(200).send("Logged out");
});

router.get("/sessionStatus", async (req, res) => {
  const sessionCookie = req.cookies.session || "";

  if (!sessionCookie) {
    console.log("no session cookie")
    return res.json({ uid: '' });
  }
  
  try {
    const decoded = await admin.auth().verifySessionCookie(sessionCookie, true);
    res.json({ uid: decoded.uid, email: decoded.email })
   
  } catch (err) {
    res.json({ uid: '' });
  }
});

router.use(validateToken);

router.post('/gemini', geminiRateLimit, async (req, res) => {
    try {
        const userMessage = req.body.message;

        if (!userMessage) {
            return res.status(400).json({ error: 'Missing message in request body' });
        }
        const geminiResponse = await runGemini(userMessage); 
        const geminiText = geminiResponse.text()
        res.json(geminiText)
        
    } catch (error) {
        console.error("Error stack:", error.stack)
        res.status(500).json({ error: 'Failed to get response from Gemini' });
    }
});
router.post('/mongodb', async (req, res) => {
    try {
        const db =  getDb();
        const coll = db.collection("QuestionnaireData");
        const combinedData = req.body;
        await coll.insertOne(combinedData);
        res.status(200).json({ message: "ok"});
    } 
    catch(err){
            res.status(400).json({ error: "Insert failed", detail: err.message });

    }

});

export default router;
