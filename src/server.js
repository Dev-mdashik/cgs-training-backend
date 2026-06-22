import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path'
import productRouter from './router/productRouter.js';
import userRouter from './router/userRouter.js';
import connectDB from './config/db.js';

const app = express();

dotenv.config();
connectDB();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/images',express.static(path.join(__dirname, 'assets/images')));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', productRouter);
app.use('/api', userRouter);
const PORT = 3000;

app.listen(PORT, ()=> {
    console.log(`Server started on port ${PORT}`);
})
