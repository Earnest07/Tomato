import express from "express";
import authMiddleware from "../middleware/auth.js";
import { placeOrder } from "../controllers/OrderControllers.js";
import cartRouter from "./cartRoute.js";

const orderRouter = express.Router();

cartRouter.post("/place", authMiddleware, placeOrder);

export default orderRouter;
