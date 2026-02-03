import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

export const connectDB=async()=>{
    await mongoose.connect(process.env.MONGOOSE_LINK)
    .then(()=>{
        console.log("DB connected");
    })
    .catch((error)=>{
        console.error("DB connection failed:",error);
    })

}

