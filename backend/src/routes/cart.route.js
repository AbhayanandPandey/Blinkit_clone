import { Router } from "express";
import isAuthenticate from "../middleware/Auth.middleware.js";
import { addToCart, getCartItems } from "../controller/cart.controller.js";
const cartRouter = Router();

cartRouter.post('/create',isAuthenticate, addToCart)
cartRouter.get('/get-cart-items',isAuthenticate, getCartItems)

export default cartRouter;