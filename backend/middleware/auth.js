import jwt from "jsonwebtoken"

const authmiddleware=async(req,res,next)=>{
   //const {token}=req.headers;
   console.log("auth middleware hit");
   console.log("headers:",req.headers);
//    const token = req.headers.token ;
try{

    const token = req.headers.token; // Assuming Bearer token
    console.log("token",token);
    if(!token){
        return res.json({success:false,message:"Not Authorized login again"});
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId=decoded.id;
        next();

    }catch(error){
        console.log(error);
    res.json({success:false,message:"Error"});
    }

}

export default authmiddleware;