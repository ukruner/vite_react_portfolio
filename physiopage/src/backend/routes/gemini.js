
import { response, Router } from 'express';

import { GoogleGenerativeAI } from '@google/generative-ai';
import { v4 as uuidv4 } from 'uuid'

import { MongoClient } from 'mongodb';
import { validateToken } from '../authMiddleware.js';
import admin from 'firebase-admin';



const router = Router();
const MODEL_NAME = "gemini-2.5-flash"; 

const chatSessions = {};
const uri = "mongodb://127.0.0.1:27017"
const client = new MongoClient(uri);



async function runGemini(chatId, prompt) {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


    const model = genAI.getGenerativeModel({ model: MODEL_NAME });


    let chat = chatSessions[chatId];


    if(!chat){
        chat = model.startChat({
            history: [],
            generationConfig: {
                maxOutputTokens: 10000,
            },
        });
        chatSessions[chatId] = chat;
    }
    
    

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    console.log(response.text())
    return response;
}

router.post('/gemini', async (req, res) => {
    try {
        const userMessage = req.body.message;
        const chatId = req.body.chatId; 

        if (!userMessage) {
            return res.status(400).json({ error: 'Missing message in request body' });
        }


        let currentChatId = chatId;
        if (!chatId) {
            currentChatId = uuidv4();
        }

        const geminiResponse = await runGemini(currentChatId, userMessage); 
        const geminiText = geminiResponse.text()
        console.log(geminiText)
        res.json(geminiText)
        
    } catch (error) {
        console.error("Error stack:", error.stack)
        res.status(500).json({ error: 'Failed to get response from Gemini' });
    }
});

router.post("/sessionLogin", async (req, res) => {
    console.log(req.body);
    const idToken = req.body.token;
    const rememberMe = req.body.rememberMe;
  const expiresIn = rememberMe ? 3600000 : 300000;
    
  try {
    const verifiedToken = await admin.auth().verifyIdToken(idToken);
    console.log("token verified")
    const sessionCookie = await admin
      .auth()
      .createSessionCookie(idToken, { expiresIn });

    const options = { sameSite: "strict", httpOnly: true, secure: process.env.NODE_ENV === "production"}
    if (rememberMe){
        options.maxAge = expiresIn
    };
    console.log(options);
    res.cookie("session", sessionCookie, options);
    res.status(200).json({ message: "Session created" });
  } catch (err) {
    console.error("Session login failed", err);
    res.status(401).send("UNAUTHORIZED REQUEST!");
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("session");
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
    console.log(decoded)
    res.json({ uid: decoded.uid, email: decoded.email })
   
  } catch (err) {
    console.log("wtf")
    res.json({ uid: '' });
  }
});

router.use(validateToken);

router.post('/mongodb', async (req, res) => {
    try {
        console.log("trying to connect")
    await client.connect();
    // database and collection code goes here
    const db = client.db("physiodb");
    const coll = db.collection("gemini");
    // insert code goes here
    const combinedData = req.body
    
    const docs = [combinedData];
    const result = await coll.insertMany(docs);
    // display the results of your operation
    console.log(docs)
    console.log(result);
    res.status(200).json({ message: "ok"});
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
})




export default router;