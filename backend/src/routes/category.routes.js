import { Router } from 'express';
import isAuthenticate from '../middleware/Auth.middleware.js';
import { AddCategory, GetAllCategories, UpdateCategory } from '../controller/category.controller.js';
const categoryRouter = Router();

categoryRouter.post('/create-category', isAuthenticate,AddCategory);
categoryRouter.get('/get-categories', isAuthenticate, GetAllCategories)
categoryRouter.put('/update-category', isAuthenticate, UpdateCategory);

export default categoryRouter;