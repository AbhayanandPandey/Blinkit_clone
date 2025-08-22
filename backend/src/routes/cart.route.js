import { Router } from "express";
import isAuthenticate from "../middleware/Auth.middleware.js";
import { addToCart } from "../controller/cart.controller.js";
const cartRouter = Router();

cartRouter.post('/create',isAuthenticate, addToCart)

export default cartRouter;