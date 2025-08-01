import {Router} from 'express';
import isAuthenticate from '../middleware/Auth.middleware.js';
import { deleteProduct, getAllProducts, getAllProductsByCategory, getProductByCategoryAndSubCategory, updateProduct, uploadProduct } from '../controller/product.controller.js';

const productRouter = Router();

productRouter.post('/create-product', isAuthenticate, uploadProduct)
productRouter.post('/get-product', getAllProducts)
productRouter.delete('/delete-product', isAuthenticate,deleteProduct)
productRouter.put('/update-product', isAuthenticate, updateProduct) 
productRouter.post('/get-productbycategory',getAllProductsByCategory)
productRouter.post('/get-productbycategoryandsubcategory', getProductByCategoryAndSubCategory)

export default productRouter;