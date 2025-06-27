import {Router} from 'express';
import isAuthenticate from '../middleware/Auth.middleware.js';
import { getAllProducts, uploadProduct } from '../controller/product.controller.js';

const productRouter = Router();

productRouter.post('/create-product', isAuthenticate, uploadProduct)
productRouter.post('/get-product', isAuthenticate, getAllProducts)

export default productRouter;