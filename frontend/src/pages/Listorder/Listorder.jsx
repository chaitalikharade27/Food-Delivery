import React, { useContext, useEffect, useState } from 'react'
import './Listorder.css'
import Orderitem from '../Orderitem/Orderitem'
import { Storecontext } from '../../Context/Storecontext'
import axios from 'axios'

const Listorder = () => {
  const { url, token } = useContext(Storecontext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) {
        setError('Not logged in.');
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get(`${url}/api/order/get`, {
          headers: { token }
        });
        if (res.data && res.data.orders) {
          setOrders(res.data.orders);
        } else {
          setError('No orders returned');
        }
      } catch (err) {
        console.error('unable to fetch orders', err);
        setError('Error fetching orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [token, url]);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="order-list">
      <h1>Your Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <Orderitem order={order} key={order._id} />
        ))
      )}
    </div>
  );
}

export default Listorder
