import express from 'express';
import { addFood, listFood,removefood} from '../controllers/Foodcontroller.js';
import multer from 'multer';
// import {storage} from "../cloudconfig.js"
const foodRouter=express.Router();

const storage=multer.diskStorage({
    destination:"./uploads",
    filename:(req,file,cb)=>{
            return cb(null,`${Date.now()}${file.originalname}`);
    }
})
const upload=multer({storage:storage});


foodRouter.post("/add",upload.single("image"),addFood);
foodRouter.get("/list",listFood);
foodRouter.post("/remove",removefood);













export default foodRouter;