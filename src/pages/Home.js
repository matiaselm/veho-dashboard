import React, { useState, useEffect } from 'react';
import axios from 'axios';
import url from 'url';

const styles = {
    columns: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    card: {
        backgroundColor: '#ddd',
        margin: 5,
        maxWidth: 500
    }
}

const Home = (props) => {
    const [users, setUsers] = useState(null)
    const [orders, setOrders] = useState(null)
    const [cars, setCars] = useState(null)

    useEffect(() => {
        getUsers()
        getOrders()
        getCars()
    }, [])

    const getUsers = async () => {
        console.log(url)
        axios.get(`http://localhost:3000/users`).then(res => {
            setUsers(res.data)
        }).catch(err => console.error(err))
    }

    const getOrders = async () => {
        axios.get(`http://localhost:3000/orders`).then(res => {
            setOrders(res.data)
        }).catch(err => console.error(err))
    }

    const getCars = async () => {
        axios.get(`http://localhost:3000/cars`).then(res => {
            setCars(res.data)
        }).catch(err => console.error(err))
    }

    return <div><h1>Home</h1>
        <div style={styles.columns}>
            <div>
                Käyttäjät
                {(Array.isArray(users) && users.length > 0) && users.map(user => {
                    return <div key={user._id} style={styles.card}>
                        <p>{user.name} {user.manufacturer} {user.model}</p>
                        <p>ID: {user._id}</p>
                    </div>
                })}
            </div>
            <div>
                Tilaukset
                {(Array.isArray(orders) && orders.length > 0) && orders.map(order => {
                    return <div key={order._id} style={styles.card}>
                        <p>{order.starts_at} {order.ends_at}</p>
                        <p>{order.user_id} {order.car_id}</p>
                        <p>ID: {order._id}</p>
                    </div>
                })}
            </div>
            <div>
                Autot
                {(Array.isArray(cars) && cars.length > 0) && cars.map(car => {
                    return <div key={car._id} style={styles.card}>
                        <p>{car.name} {car.manufacturer} {car.model}</p>
                        <p>{car.year} {car.km} {car.fueltype}</p>
                        <p>ID: {car._id}</p>
                    </div>
                })}
            </div>
        </div>
    </div>
}

export default Home;