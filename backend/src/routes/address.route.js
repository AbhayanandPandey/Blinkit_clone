import { Router } from "express";
import isAuthenticate from "../middleware/Auth.middleware.js";
import { addAddress, getAddress, updateAddress, deleteAddress } from "../controller/address.controller.js";

const addressRouter = Router();

addressRouter.post("/create", isAuthenticate, addAddress); 
addressRouter.get("/get-address", isAuthenticate, getAddress);
addressRouter.put("/update-address", isAuthenticate, updateAddress);
addressRouter.delete("/delete-address", isAuthenticate, deleteAddress);

export default addressRouter;