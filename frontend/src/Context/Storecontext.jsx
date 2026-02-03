import { createContext, useEffect, useState } from "react";
//import { food_list } from "../assets/assets";
import axios from 'axios';
export const Storecontext = createContext(null)

const StorecontextProvider=(props)=>{
    const [food_list,setFood_list]=useState([]);
    const [cartitems,setCartitems]=useState({});
    const url="http://localhost:8080";
    const [token,setToken]=useState("");

    const addtocart=async(itemId)=>{
        if(!cartitems[itemId]){
            setCartitems((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setCartitems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}});
        }
    }

    const removefromcart=async(itemId)=>{
        setCartitems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}});
        }
    }

    const getTotalCartAmount=()=>{
        let totalAmount=0;
        for(const item in cartitems){
            if(cartitems[item]>0){
             let itemInfo=food_list.find((product)=>product._id===item)
            totalAmount+=itemInfo.price*cartitems[item];
            }

        }
        return totalAmount;
    }

    const fetchfoodlist=async()=>{
        try{
            const response=await axios.get(`${url}/api/food/list`);
            setFood_list(response.data.data ?? []);
        }catch(err){
            console.error('Failed to fetch food list', err);
            setFood_list([]);
        }
    }

    const loadcartdata=async(token)=>{
       const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
        setCartitems(response.data.cartdata || {});
    }

    useEffect(()=>{
        async function loadData(){
           await fetchfoodlist();
            if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"));
            await loadcartdata(localStorage.getItem("token"));
        }
        }
        loadData();
    },[])

    const contextValue={
        food_list,
        cartitems,
        setCartitems,
        addtocart,
        removefromcart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }
    return(
        <Storecontext.Provider value={contextValue}>
            {props.children}
            </Storecontext.Provider>
    )
}

export default StorecontextProvider;