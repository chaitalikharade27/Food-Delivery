import jwt from "jsonwebtoken"

const authmiddleware=async(req,res,next)=>{
   //const {token}=req.headers;
   //console.log("auth middleware hit");
  // console.log("headers:",req.headers);
//    const token = req.headers.token ;
try{

    // support either custom 'token' header or standard 'Authorization: Bearer <token>'
    let token = req.headers.token;
    if (!token && req.headers.authorization) {
      const parts = req.headers.authorization.split(" ");
      if (parts.length === 2 && parts[0].toLowerCase() === "bearer") {
        token = parts[1];
      }
    }

    // log for debugging
    // console.log("auth middleware token:", token);
    if (!token) {
      return res.json({ success: false, message: "Not Authorized, login again" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // make the user id available on both body and request object
    // ensure req.body exists (body may be undefined for GET requests)
    if (!req.body) {
      req.body = {};
    }
    req.body.userId = decoded.id;
    req.userId = decoded.id;

    next();

    }catch(error){
        console.log(error);
    res.json({success:false,message:"Error"});
    }

}

export default authmiddleware;