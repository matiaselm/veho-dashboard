import { useState, useEffect } from 'react';
import axios from 'axios';

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
    axios.get('http://localhost:3000/orders').then(res => {
      console.log(res)
      setOrders(res.data)
    }).catch(e => {
      console.error(e)
    })
  }, [])

  return <div><h1>Orders</h1>
    <div>
      {(Array.isArray(orders) && orders.length > 0) && orders.map(order => {
        return <div key={order._id} style={styles.card}>
          <p>{order._id} {order.starts_at} {order.ends_at}</p>
        </div>
      })}
    </div>
  </div>
}

export default Orders;
