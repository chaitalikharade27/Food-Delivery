import OrderModel from "../models/OrderModel.js";
import UserModel from "../models/UserModel.js";



//Placing User Order from Frontend
const placeorder=async(req,res)=>{
    try{
      console.log("placeorder controller");
        console.log("req userid",req.body.userId);
        // const userId=req.userId;
        // const user=await UserModel.findById(userId);
        
        res.json({success:true,message:"Payment successful"});
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}
export {placeorder}