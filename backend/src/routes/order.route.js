import { Router } from "express";
import isAuthenticate from "../middleware/Auth.middleware.js";
import { CashPayment } from "../controller/order.controller.js";

const orderRouter = Router()

orderRouter.post('/cash-on-delivery',isAuthenticate, CashPayment)

export default orderRouter