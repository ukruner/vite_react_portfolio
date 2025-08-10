
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import geminiRoutes from './routes/gemini.js';
import 'dotenv/config'
import data from './storechatdata-firebase-adminsdk-fbsvc-133107b5ae.js'
import admin from 'firebase-admin';



const app = express();
const port = process.env.PORT || 5000;



app.use(cors()); 
app.use(bodyParser.json()); 


app.use('/api/gemini', geminiRoutes);


admin.initializeApp({
  credential: admin.credential.cert(data),
  databaseURL: "https://storechatdata-default-rtdb.europe-west1.firebasedatabase.app/"
});


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});