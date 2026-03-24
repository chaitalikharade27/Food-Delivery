import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Orders.css'

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchOrders = async () => {
      const endpoints = [`${url}/api/order/all`, `${url}/api/order`, `${url}/api/order/get`]
      let lastError = 'Unable to fetch orders'

      for (const endpoint of endpoints) {
        try {
          const res = await axios.get(endpoint)
          if (res.data && res.data.success) {
            setOrders(res.data.orders || [])
            setError(null)
            setLoading(false)
            return
          }
          lastError = res.data?.message || 'No orders returned'
        } catch (err) {
          console.error('Error fetching orders from', endpoint, err)
          lastError = err.response?.data?.message || err.message || 'Unable to fetch orders'
        }
      }

      setError(lastError)
      setLoading(false)
    }

    fetchOrders()
  }, [url])

  if (loading) return <div className='orders-loading'>Loading orders...</div>
  if (error) return <div className='orders-error'>{error}</div>

  return (
    <div className="order-list">
      <h1>All User Orders</h1>
      {orders.length === 0 ? (
        <div className='no-orders'>
          <p>No orders placed yet.</p>
          <span>📦</span>
        </div>
      ) : (
        orders.map((order) => {
          const totalItems = Array.isArray(order.items)
            ? order.items.reduce((sum, it) => sum + (it.quantity || 0), 0)
            : 0;
          const orderDate = order.date ? new Date(order.date).toLocaleString() : '';

          return (
            <div key={order._id} className='order-card'>
              <div className="Order-header">
                <p>Order Id: {order._id}</p>
                <p>User Id: {order.userId}</p>
                <p id='status'>Status: {order.status || 'Processing'}</p>
              </div>
              <div className="order-body">
                <p>Total Amount: ₹{order.amount}</p>
                <p>Total Items: {totalItems}</p>
                <p>Address: {order.address && `${order.address.street}, ${order.address.city}, ${order.address.state} ${order.address.zipcode}`}</p>
              </div>
              <div className="order-footer">
                Ordered on: {orderDate}
              </div>
            </div>
          );
        })
      )}
    </div>
  )
}

export default Orders
