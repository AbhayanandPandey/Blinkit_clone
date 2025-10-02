import { Router } from "express";
import isAuthenticate from "../middleware/Auth.middleware.js";
import { CashPayment, GetOrders, OnlinePayment } from "../controller/order.controller.js";

const orderRouter = Router()

orderRouter.post('/cash-on-delivery',isAuthenticate, CashPayment)
orderRouter.post('/online-payment',isAuthenticate, OnlinePayment)
orderRouter.get('/order-history',isAuthenticate, GetOrders)

export default orderRouter