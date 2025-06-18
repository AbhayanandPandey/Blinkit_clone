import { Router } from 'express';
import isAuthenticate from '../middleware/Auth.middleware.js';
import { AddCategory, GetAllCategories } from '../controller/category.controller.js';
const categoryRouter = Router();

categoryRouter.post('/create-category', isAuthenticate,AddCategory);
categoryRouter.get('/get-categories', isAuthenticate, GetAllCategories)

export default categoryRouter;