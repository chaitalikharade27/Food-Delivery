import mongoose from  "mongoose"

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    cartdata:{
        type:Object,
        default:{}
    }
},{minimize:false})  //if we dont add this false then cart data will not created because we are not providing any data here

const UserModel=mongoose.models.user ||mongoose.model("user",userSchema);

export default UserModel;