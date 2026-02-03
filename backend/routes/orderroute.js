import express from "express"
import authmiddleware from "../middleware/auth.js"
import {placeorder } from "../controllers/Ordercontroller.js"

const orderRouter = express.Router();

orderRouter.post("/place", authmiddleware, placeorder);
// orderRouter.post("/place", placeorder);

export default orderRouter;