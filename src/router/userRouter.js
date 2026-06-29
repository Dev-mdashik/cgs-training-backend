import express from 'express';
import { createUser, getUser, updateUser, deleteUser } from '../controllers/userController.js';
import { authorize, protect } from '../middleware/auth.middleware.js';

const Router = express.Router();

Router.get('/get-user', protect, getUser);
Router.post('/create-user', protect, authorize, createUser);
Router.put('/update-user/:id', protect, authorize, updateUser);
Router.delete('/delete-user/:id', protect, authorize, deleteUser);

export default Router;

