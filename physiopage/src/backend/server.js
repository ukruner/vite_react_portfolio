
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import geminiRoutes from './routes/gemini.js';
import 'dotenv/config'



const app = express();
const port = process.env.PORT || 5000;

const GEMINI_API_KEY = process.env.API_KEY
console.log(GEMINI_API_KEY);

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing (for React to access)
app.use(bodyParser.json()); // Parse JSON request bodies

// Routes
app.use('/api/gemini', geminiRoutes); // Mount the gemini routes

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});