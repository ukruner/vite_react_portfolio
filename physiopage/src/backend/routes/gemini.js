
import { Router } from 'express';

import { GoogleGenerativeAI } from '@google/generative-ai';
import { v4 as uuidv4 } from 'uuid'

const router = Router();
const MODEL_NAME = "gemini-2.5-flash"; 

const chatSessions = {};


async function runGemini(chatId, prompt) {
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);


    const model = genAI.getGenerativeModel({ model: MODEL_NAME });


    let chat = chatSessions[chatId];


    if(!chat){
        chat = model.startChat({
            history: [],
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


router.post('/chat', async (req, res) => {
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
        console.log(geminiResponse)  

        res.json({ response: geminiResponse, chatId: currentChatId });
    } catch (error) {
        console.error('Error calling Gemini API:', error);
        res.status(500).json({ error: 'Failed to get response from Gemini' });
    }
});


export default router;