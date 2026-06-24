import express from 'express';
import { createUser, getUser, updateUser, deleteUser } from '../controllers/userController.js';
import { authorize } from '../middleware/auth.middleware.js';

const Router = express.Router();

Router.get('/get-user', getUser);
Router.post('/create-user', authorize, createUser);
Router.put('/update-user/:id', authorize, updateUser);
Router.delete('/delete-user/:id', authorize, deleteUser);

export default Router;

