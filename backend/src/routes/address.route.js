import { Router } from "express";
import isAuthenticate from "../middleware/Auth.middleware.js";
import { addAddress, getAddress } from "../controller/address.controller.js";

const addressRouter = Router();

addressRouter.post("/create", isAuthenticate, addAddress); 
addressRouter.get("/get-address", isAuthenticate, getAddress);
addressRouter.put("/update-address", isAuthenticate, addAddress);
addressRouter.delete("/delete-address", isAuthenticate, addAddress);

export default addressRouter;