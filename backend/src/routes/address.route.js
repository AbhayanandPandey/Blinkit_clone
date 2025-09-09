import { Router } from "express";
import isAuthenticate from "../middleware/Auth.middleware.js";
import { addAddress } from "../controller/address.controller.js";

const addressRouter = Router();

addressRouter.post("/create", isAuthenticate, addAddress); 

export default addressRouter;