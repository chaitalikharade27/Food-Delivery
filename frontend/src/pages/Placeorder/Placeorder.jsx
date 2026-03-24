import React, { useEffect,useState } from 'react';
//import (useNavigate) from "react-router-dom";
import "./Placeorder.css"
import { useContext } from 'react'
import { Storecontext } from '../../Context/Storecontext'
import axios from "axios"


const url="http://localhost:8080"
const Placeorder = () => {
  const { getTotalCartAmount, token } = useContext(Storecontext);
    const [data, setData] = useState({
  fname: "",
  lname: "",
  email: "",
  street: "",
  city: "",
  state: "",
  zipcode: "",
  country: "",
  phone: ""
});

const onChangeHandler = (event) => {
  const { name, value } = event.target;
  setData(prev => ({ ...prev, [name]: value }));
};

 const onsubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      `${url}/api/order/place`,
      {
        ...data,
        totalAmount: getTotalCartAmount() + 2
      },
      {
        headers: {
          token: token
        }
      }
    );

    if (res.data.success) {
      alert(res.data.message);

      setData({
        fname: "",
        lname: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
      });
    } else {
      alert(res.data.message || "Payment failed");
    }
  } catch (err) {
    console.error(err);
    alert("Payment failed");
  }
};


  // const onsubmit=async(e)=>{
  //    e.preventDefault();
  //    try{
  //         // const formData=new FormData();
  //         // formData.append("fname",data.fname);
  //         //  formData.append("lname",lname);
  //         //   formData.append("email",data.email);
  //         //    formData.append("street",data.street);
  //         //     formData.append("city",data.city);
  //          //  formData.append("state",state);
  //         //   formData.append("zipcode",data.zipcode);
  //         //    formData.append("country",data.country);
  //         //     formData.append("phone",data.phone);
  //         //     const response=await axios.post(`${url}/api/order/place`,formData);
  //         //     if(response.data.success){
  //         //         setData({
  //         //            fname:"",
  //         //            lname:"",
  //          //            email:"",
  //         //            street:"",
  //          //            city:"",
  //         //            state:"",
  //          //            zipcode:"",
  //         //            country:"",
  //         //          phone:""
  //         //             })
  //      const res = await axios.post(`${url}/api/order/place`, {}, { headers: { token, }, });
  //      if(res?.data?.success){
  //        alert(res.data.message || "payment successful");
  //      } else {
  //        alert(res?.data?.message || "payment failed");
  //      }
  //    }catch(err){
  //      console.error(err);
  //      alert("payment failed");
  //    }
  // }

// const navigate=useNavigate();
//    useEffect(()=>{
//    if(!token){
//       navigate('/cart')
//      }
//      else if(getTotalCartAmount()==0){
//       navigate('/cart');
//      }
//    },[token])

  return (
    <form onSubmit={onsubmit} action="" className='place-order'>
      <div className="place-order-left">
        <p className="title">
          Delivery Information
        </p>
        <div className="multi-fields">
          <input required onChange={onChangeHandler} value={data.fname} type="text" name="fname" placeholder='First name' />
          <input required onChange={onChangeHandler} value={data.lname} type="text" name="lname" placeholder='Last name' />
        </div>
        <input required type="email" onChange={onChangeHandler} value={data.email} name="email" placeholder='Email Address' />
        <input required type="text" onChange={onChangeHandler} value={data.street} name="street" placeholder='Street' />
        <div className="multi-fields">
          <input required type="text" onChange={onChangeHandler} value={data.city} name="city" placeholder='City' />
          <input required type="text" onChange={onChangeHandler} value={data.state} name="state" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required type="text" onChange={onChangeHandler} value={data.zipcode} name="zipcode" placeholder='Zip code' />
          <input required type="text" onChange={onChangeHandler} value={data.country} name="country" placeholder='Country' />
        </div>
        <input required type="text" onChange={onChangeHandler} value={data.phone} name="phone" placeholder='Phone' />
      </div>

      <div className="place-order-right">
          <div className="cart-total">
          <h2>Cart Totals</h2>
            <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount()===0? 0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
             <b>Total</b>
             <b>${getTotalCartAmount()===0? 0:getTotalCartAmount()+2}</b>
            </div>
      
          </div>
          <button>PROCEED TO PAYMENT </button>
        </div>        
      </div>
    </form>
  )
}

export default Placeorder
