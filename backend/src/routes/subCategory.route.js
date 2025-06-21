import { Router } from 'express';
import isAuthenticate from '../middleware/Auth.middleware.js';
import { AddSubCategory, EditSubCategoryData, GetAllSubCategories } from '../controller/subCategory.controller.js';

const subCategoryRouter = Router();

subCategoryRouter.post('/create',isAuthenticate,AddSubCategory)
subCategoryRouter.post('/get-sub-categories',isAuthenticate,GetAllSubCategories)
subCategoryRouter.put('/update', isAuthenticate, EditSubCategoryData); 
export default subCategoryRouter;