import express from 'express'
import {getProduct, deleteProduct, addProduct} from '../controllers/productController.js';

const router = express.Router();

router.get('/get-product', getProduct);
router.post('/add-product', addProduct);
router.delete('/delete-product/:id', deleteProduct);

export default router;