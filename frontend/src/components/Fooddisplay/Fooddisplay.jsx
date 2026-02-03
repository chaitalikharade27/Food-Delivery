import React, { useContext } from 'react'
import './Fooddisplay.css'
import { Storecontext } from '../../Context/Storecontext'
import Fooditem from '../Fooditem/Fooditem'

const Fooddisplay = ({category}) => {
    const context = useContext(Storecontext)
    const food_list = context?.food_list ?? []


  return (
    <div className='food-display' id='food-display'>
        <h2>Top dishes near you</h2>
        <div className="food-display-list">
            {food_list.map((item,index)=>{
                if(category==="All"  || category===item.category){
                return <Fooditem key={index} id={item._id} name={item.name} price={item.price} description={item.description} image={item.image}/>
                }
            })}
        </div>
    </div>
  )
}

export default Fooddisplay
 