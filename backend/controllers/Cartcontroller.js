import UserModel from "../models/UserModel.js";


// add to cart
const addtocart=async (req,res) => {
    try{
     const { userId, itemId } = req.body || {};
    if(!userId) return res.json({success:false,message:"Missing userId"});
    if(!itemId) return res.json({success:false,message:"Missing itemId"});
        let userdata=await UserModel.findById(req.body.userId);
        let cartdata = userdata?.cartdata || {};
        if(!cartdata[req.body.itemId]){
            cartdata[req.body.itemId]=1;
        }else{
            cartdata[req.body.itemId]+=1;
        }
        await UserModel.findByIdAndUpdate(userId,{cartdata});
        res.json({success:true,message:"Added to cart"});
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}


//remove item from user cart
const removefromcart=async(req,res)=>{
    try{
        const { userId, itemId } = req.body || {};
        if(!userId) return res.json({success:false,message:"Missing userId"});
        if(!itemId) return res.json({success:false,message:"Missing itemId"});
        let userdata=await UserModel.findById(req.body.userId);
        let cartdata=await userdata.cartdata;
        if(cartdata[req.body.itemId]>0){
            cartdata[req.body.itemId]-=1;
        }
        await UserModel.findByIdAndUpdate(userId,{cartdata});
        res.json({success:true,message:"Removed from cart"})

    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}


//fetch user cart data
const getcart=async(req,res)=>{
        try{
            // const { userId } = req.body || {};
            //  if(!userId) return res.json({success:false,message:"Missing userId"});
            //  let userdata=await UserModel.findById(userId);
            //   const cartdata = userdata?.cartdata || {};
            //  res.json({success:true,cartdata});
            let userdata=await UserModel.findById(req.body.userId);
            let cartdata=await userdata.cartdata;
            res.json({success:true,cartdata});
        }catch(error){
            console.log(error);
            res.json({success:false,message:"Error"})
        }
}

export {addtocart,removefromcart,getcart}

