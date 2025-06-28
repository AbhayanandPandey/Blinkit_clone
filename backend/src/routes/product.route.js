import {Router} from 'express';
import isAuthenticate from '../middleware/Auth.middleware.js';
import { deleteProduct, getAllProducts, updateProduct, uploadProduct } from '../controller/product.controller.js';

const productRouter = Router();

productRouter.post('/create-product', isAuthenticate, uploadProduct)
productRouter.post('/get-product', isAuthenticate, getAllProducts)
productRouter.delete('/delete-product', isAuthenticate,deleteProduct)
productRouter.put('/update-product', isAuthenticate, updateProduct) // Assuming updateProduct uses the same uploadProduct function

export default productRouter;