import React from 'react'
import './Orderitem.css'

const Orderitem = ({ order }) => {
  if (!order) return null;
  const {
    _id,
    amount,
    items,
    address,
    status,
    date,
    payment
  } = order;

  // calculate total items
  const totalItems = Array.isArray(items)
    ? items.reduce((sum, it) => sum + (it.quantity || 0), 0)
    : 0;

  const orderDate = date ? new Date(date).toLocaleString() : '';

  return (
    <div className='order-card'>
        <div className="Order-header">
            <p>Order Id: {_id}</p>
            <p id='status'>Status: {status || 'Unknown'}</p>
        </div>
        <div className="order-body">
            <p>Total Amount: ₹{amount}</p>
            <p>Total Items: {totalItems}</p>
            <p>Address: {address && `${address.street}, ${address.city}, ${address.state} ${address.zipcode}`}</p>
        </div>
         <div className="order-footer">
            Ordered on: {orderDate}
         </div>
    </div>
  )
}

export default Orderitem

