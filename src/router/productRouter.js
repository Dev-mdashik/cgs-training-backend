import express from 'express'
import {getProduct, deleteProduct, addProduct, updateProduct} from '../controllers/productController.js';
import { authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/get-product', getProduct);
router.post('/add-product', authorize ,addProduct);
router.put('/update-product/:id', authorize , updateProduct);
router.delete('/delete-product/:id', authorize, deleteProduct);

export default router;