import { Router } from 'express';
import isAuthenticate from '../middleware/Auth.middleware.js';
import { AddCategory } from '../controller/category.controller.js';
const categoryRouter = Router();

categoryRouter.post('/create-category', isAuthenticate,AddCategory);

export default categoryRouter;