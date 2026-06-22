import express from 'express';
import { createUser, getUser, updateUser, deleteUser } from '../controllers/userController.js';

const Router = express.Router();

Router.get('/get-user', getUser);
Router.post('/create-user', createUser);
Router.put('/update-user/:id', updateUser);
Router.delete('/delete-user/:id', deleteUser);

export default Router;

