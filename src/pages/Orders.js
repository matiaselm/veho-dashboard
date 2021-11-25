import { useState, useEffect } from 'react';
import axios from '../services/axios';
import url from '../url';
import Box from '../components/Box';

const styles = {
  card: {
    backgroundColor: '#ddd',
    margin: 5,
    maxWidth: 500
  }
}

const Orders = (props) => {
  const [orders, setOrders] = useState(null)

  useEffect(() => {
    getOrders()
  }, [])

  const getOrders = () => {
    axios.get(`${url}/orders`)
      .then(res => setOrders(res.data))
      .catch(e => console.error(e))
  }

  return <div><h1>Orders</h1>
    <div>
      {(Array.isArray(orders) && orders.length > 0) && orders.map(order => {
        return <Box key={order._id} style={styles.card}>
          {order.user && <p>{order.user.name}</p>}
          {order.car && <p>{order.car.manufacturer} {order.car.model}</p>}
          <p>Alkaa: {new Date(order.starts_at).toLocaleString()} <br/> Päättyy: {new Date(order.ends_at).toLocaleString()}</p>
        </Box>
      })}
    </div>
  </div>
}

export default Orders;
