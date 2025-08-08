import {Router} from 'express';
import isAuthenticate from '../middleware/Auth.middleware.js';
import { deleteProduct, getAllProducts, getAllProductsByCategory, getProductByCategoryAndSubCategory, getProductDetails, updateProduct, uploadProduct } from '../controller/product.controller.js';

const productRouter = Router();

productRouter.post('/create-product', isAuthenticate, uploadProduct)
productRouter.post('/get-product', getAllProducts)
productRouter.delete('/delete-product', isAuthenticate,deleteProduct)
productRouter.put('/update-product', isAuthenticate, updateProduct) 
productRouter.post('/get-productbycategory',getAllProductsByCategory)
productRouter.post('/get-productbycategoryandsubcategory', getProductByCategoryAndSubCategory)
productRouter.post('/get-product-details', isAuthenticate,getProductDetails )

export default productRouter;