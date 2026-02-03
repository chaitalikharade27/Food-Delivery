import React, { useContext, useEffect, useState } from 'react'
import './Loginpopup.css'
import { assets } from '../../assets/assets'
import { Storecontext } from '../../Context/Storecontext'
import axios from "axios"


const Loginpopup = ({setShowlogin}) => {
        const {url,setToken}=useContext(Storecontext);

    let[currstate,setCurrstate]=useState("Sign Up");
    const [data,setdata]=useState({
      name:"",
      email:"",
      password:""
    })

    const onChangeHandler=(event)=>{
         const name=event.target.name;
        const  value=event.target.value;
        setdata(data=>({...data,[name]:value}));
    }

    const onLogin=async(event)=>{
      event.preventDefault();
      let newUrl=url;
      if(currstate==="Login"){
        newUrl+="/api/user/login";
      }
      else{
        newUrl+="/api/user/register";
      }
      const response=await axios.post(newUrl,data);

      if(response.data.success){
        setToken(response.data.token);
        localStorage.setItem("token",response.data.token);
        setShowlogin(false);

      }
      else{
       console.log(response.data.message);
      }
    }

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin}  className="login-popup-container">
        <div className="login-popup-title">
            <h2>{currstate}</h2>
            <img onClick={()=>setShowlogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
            {currstate==="Login"?<></>: <input name="name" onChange={onChangeHandler} value={data.name} type="text" placeholder="Enter Name" required/>}
            <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Enter Email" required/>
            <input type="password" name="password" value={data.password} onChange={onChangeHandler} placeholder="Enter Password" required />
        </div>
        <button type="submit">{currstate==="Sign Up"?"Create Account":"Login"}</button>
        <div className="login-popup-condition">
            <input type="checkbox" required/>
            <p>By continuing,I agree to the terms of use & privacy policy.</p>
        </div>
        {currstate==="Login"
        ? <p>Create a new account? <span onClick={()=>setCurrstate("Sign Up")}>Click here</span></p>
         : <p>Already have an account? <span onClick={()=>setCurrstate("Login")}>Login here</span></p>}
      </form>
    </div>
  )
}

export default Loginpopup
