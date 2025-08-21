
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import geminiRoutes from './routes/gemini.js';


const app = express();




app.use(cors()); 
app.use(bodyParser.json()); 


app.use('/api/gemini', geminiRoutes);


app.listen(5000, () => {
    console.log(`Server listening on port 5000`);
});




