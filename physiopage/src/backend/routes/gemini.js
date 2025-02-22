// routes/gemini.js
import { Router } from 'express';
import * as dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = Router();
const MODEL_NAME = "gemini-1.0-pro"; // or "gemini-1.5-pro-latest", etc.

// Function to send request to gemini model
async function runGemini(prompt) {
    console.log("API Key:", process.env.GEMINI_API_KEY); 
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    console.log("genAI object:", genAI);
    const model = genAI.getModel({ model: MODEL_NAME });

    const chat = model.startChat({
        history: [
        // You can optionally include conversation history here for more context
        ],
        generationConfig: {
        maxOutputTokens: 200,  // Adjust as needed
        },
    });

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    return response.text();
}


// POST route to handle chat requests
router.post('/chat', async (req, res) => {
    try {
        const userMessage = req.body.message;  // Get the user's message from the request body

        if (!userMessage) {
            return res.status(400).json({ error: 'Missing message in request body' });
        }

        const geminiResponse = await runGemini(userMessage); // Get the response from Gemini

        res.json({ response: geminiResponse });  // Send the response back to the client
    } catch (error) {
        console.error('Error calling Gemini API:', error);
        res.status(500).json({ error: 'Failed to get response from Gemini' });
    }
});

// test.js



dotenv.config();

async function runGemini2() {
    console.log("API Key:", process.env.GEMINI_API_KEY);
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getModel({ model: MODEL_NAME });
    console.log("response :",model)
}
runGemini2();

export default router;