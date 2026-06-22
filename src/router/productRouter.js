import express from 'express'
import {getProduct, deleteProduct, addProduct, updateProduct} from '../controllers/productController.js';

const router = express.Router();

router.get('/get-product', getProduct);
router.post('/add-product', addProduct);
router.put('/update-product/:id', updateProduct);
router.delete('/delete-product/:id', deleteProduct);

export default router;