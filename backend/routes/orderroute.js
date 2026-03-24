import express from "express"
import authmiddleware from "../middleware/auth.js"
import { placeorder, getUserOrders, getAllOrders } from "../controllers/Ordercontroller.js"

const orderRouter = express.Router();

orderRouter.post("/place", authmiddleware, placeorder);
orderRouter.get("/get", authmiddleware, getUserOrders); // user-specific orders
orderRouter.get("/all", getAllOrders); // admin-style view (no auth required in this sample)

export default orderRouter;