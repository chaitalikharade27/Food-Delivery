import foodModel from "../models/FoodModel.js";
import fs from "fs";


//Add food item

const addFood = async(req,res)=>{
    // Check if file was uploaded
    // console.log("received",req.file);
// console.log('req.file:', req.file);
// console.log('req.body:', req.body);
    if(!req.file){
        return res.json({success:false,message:"No image file uploaded"});
    }
    
    let image_filename=`${req.file.filename}`;
    const food=new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })
    try{
        await food.save();
        res.json({success:true,message:"Food Added"});
        // console.log("body",req.body);

    }catch(err){
            console.log(err);
            res.json({success:false,message:"Error"});
    }
}

//  const addFood = async(req,res)=>{
//     try{
//         console.log("file,",req.file);
//         if(!req.file){
//             return res.json({success:false,message:"image not uploaded"});
//         }
//         const food=new foodModel({
//             name:req.body.name,
//             description:req.body.description,
//             price:req.body.price,
//             category:req.body.category,
//             image:req.file.path
//         });
//         res.json({
//             success:true,
//             message:"food added",
//             imageurl:req.file.path
//         });
//     }catch(err){
//         console.error('=== ERROR ===');
//         console.error(err);
//             res.json({success:false,message:"Error", error:err.message});
//     }
// }


//all food list
const listFood=async(req,res)=>{
    try{
        const foods=await foodModel.find({});
        res.json({success:true,data:foods})
    }
    catch(err){
        console.log(err);
        res.json({success:false,message:"category"});
    }
}

//remove food item
const removefood=async(req,res)=>{
    try{
        const food=await foodModel.findById(req.body.id);
       // console.log(food);
        if(!food){
            return res.json({success:false,message:"food not found"});
        }
        fs.unlink(`uploads/${food.image}`,()=>{});
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food removed"});

    }catch(err){
        console.log(err);
        res.json({success:false,message:"Error"});
    }
}


export {addFood,listFood,removefood}