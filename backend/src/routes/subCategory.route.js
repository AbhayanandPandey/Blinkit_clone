import { Router } from 'express';
import isAuthenticate from '../middleware/Auth.middleware.js';
import { AddSubCategory, DeleteSubCategoryData, EditSubCategoryData, GetAllSubCategories } from '../controller/subCategory.controller.js';

const subCategoryRouter = Router();

subCategoryRouter.post('/create',isAuthenticate,AddSubCategory)
subCategoryRouter.post('/get-sub-categories',GetAllSubCategories)
subCategoryRouter.put('/update', isAuthenticate, EditSubCategoryData);
subCategoryRouter.delete('/delete', isAuthenticate, DeleteSubCategoryData); 

export default subCategoryRouter;