import { Router } from 'express';
import isAuthenticate from '../middleware/Auth.middleware.js';
import { AddSubCategory } from '../controller/subCategory.controller.js';

const subCategoryRouter = Router();

subCategoryRouter.post('/create',isAuthenticate,AddSubCategory)
export default subCategoryRouter;