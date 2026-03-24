import dotenv from "dotenv";
dotenv.config();

import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodroute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartroute.js";
import orderRouter from "./routes/orderroute.js";
//import 'dotenv/config'

//app config
const app=express();
const port=8080;

//middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

// Simple request logger to trace incoming requests and token header
app.use((req, res, next) => {
    console.log('HTTP', req.method, req.path, 'token:', req.headers.token);
    next();
});


//db connection
connectDB();

//API endpoints
// app.use('/uploads',express.static('uploads'));
app.use("/api/food",foodRouter);
app.use("/images",express.static('uploads'));
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter);

app.use("/api/order",orderRouter);

app.get("/",(req,res)=>{
    res.send("Api working");
})

app.listen(port,()=>{
    console.log(`server listening on port ${port}`);
})

