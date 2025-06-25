import {Router} from 'express';
import isAuthenticate from '../middleware/Auth.middleware.js';
import { uploadProduct } from '../controller/product.controller.js';

const productRouter = Router();

productRouter.post('/create-product', isAuthenticate, uploadProduct)

export default productRouter;