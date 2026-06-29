import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path'
import authRouter from './router/authRouter.js';
import productRouter from './router/productRouter.js';
import userRouter from './router/userRouter.js';
import connectDB from './config/db.js';

// CREATE INSTANCE
const app = express();

// DEFINE
dotenv.config();

// FILE PATH
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// BUILT-IN MIDDLEWARE
app.use('/images',express.static(path.join(__dirname, 'assets/images')));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// API ROUTES
app.use('/api', authRouter);
app.use('/api', productRouter);
app.use('/api', userRouter);

// PORT
const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    } catch (err) {
        console.error(err);
    }
};

startServer();
