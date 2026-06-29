import express from 'express'
import {getProduct, deleteProduct, addProduct, updateProduct, getProductById} from '../controllers/productController.js';
import { authorize, protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/get-product', getProduct);
router.get('/get-product/:id', getProductById);
router.post('/add-product', protect, authorize ,addProduct);
router.put('/update-product/:id', protect, authorize , updateProduct);
router.delete('/delete-product/:id', protect, authorize, deleteProduct);

export default router;