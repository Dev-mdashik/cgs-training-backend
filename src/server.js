import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path'
import productRouter from './router/productRouter.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/images',express.static(path.join(__dirname, 'assets/images')));

app.use(cors());
app.use(express.json());

app.use('/api', productRouter);
const PORT = 3000;

app.listen(PORT, ()=> {
    console.log(`Server started on port ${PORT}`);
})
