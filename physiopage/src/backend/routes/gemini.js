// routes/gemini.js
import { Router } from 'express';

import { GoogleGenerativeAI } from '@google/generative-ai';
import { v4 as uuidv4 } from 'uuid'

const router = Router();
const MODEL_NAME = "gemini-1.0-pro"; // or "gemini-1.5-pro-latest", etc.

const chatSessions = {};

// const GEMINI_API_KEY = process.env.API_KEY
// Function to send request to gemini model
async function runGemini(chatId, prompt) {
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    console.log("genAI object:", genAI);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });


    let chat = chatSessions[chatId];


    if(!chat){
        chat = model.startChat({
            history: [], // Initialize empty history
            generationConfig: {
                maxOutputTokens: 200,
            },
        });
        chatSessions[chatId] = chat;
    }
    
    

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    return response.text();
}


// POST route to handle chat requests
router.post('/chat', async (req, res) => {
    try {
        const userMessage = req.body.message;
        const chatId = req.body.chatId; // Get chat ID from request (or create a new one)

        if (!userMessage) {
            return res.status(400).json({ error: 'Missing message in request body' });
        }

        //If chatId is not provided, create a new one for the current conversation
        let currentChatId = chatId;
        if (!chatId) {
            currentChatId = uuidv4();
        }

        const geminiResponse = await runGemini(currentChatId, userMessage); // Pass chatId

        res.json({ response: geminiResponse, chatId: currentChatId });  //Send back chatId in response
    } catch (error) {
        console.error('Error calling Gemini API:', error);
        res.status(500).json({ error: 'Failed to get response from Gemini' });
    }
});

// test.js



// dotenv.config();

// async function runGemini2() {
//     console.log("API Key:", process.env.GEMINI_API_KEY);
//     const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//     const model = genAI.getModel({ model: MODEL_NAME });
//     console.log("response :",model)
// }
// runGemini2();

export default router;