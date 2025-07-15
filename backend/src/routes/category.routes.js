import { Router } from 'express';
import isAuthenticate from '../middleware/Auth.middleware.js';
import { AddCategory, DeleteCategory, GetAllCategories, UpdateCategory } from '../controller/category.controller.js';
const categoryRouter = Router();

categoryRouter.post('/create-category', isAuthenticate,AddCategory);
categoryRouter.get('/get-categories', GetAllCategories)
categoryRouter.put('/update-category', isAuthenticate, UpdateCategory);
categoryRouter.delete('/delete-category',isAuthenticate,DeleteCategory)

export default categoryRouter;