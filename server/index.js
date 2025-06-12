import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './db.js';

dotenv.config({ path: './.env' });
const app = express();

app.use(express.json());


const PORT = process.env.PORT;

dbConnect();

app.listen(PORT, () => {     
    console.log(`Server running on the port ${PORT}...`);
 });