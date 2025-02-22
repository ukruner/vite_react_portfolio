
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import geminiRoutes from './routes/gemini.js';


import 'dotenv/config'; // Load environment variables from .env file


const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing (for React to access)
app.use(bodyParser.json()); // Parse JSON request bodies

// Routes
app.use('/api/gemini', geminiRoutes); // Mount the gemini routes

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});