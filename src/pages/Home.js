import React, { useState, useEffect } from 'react';
import axios from '../services/axios';
import url from '../url';
import models from '../constants/models';
import InputForm from '../components/InputForm'
import ModifyForm from '../components/ModifyForm'
import Box from '../components/Box';
import { toast } from 'react-toastify';

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
    const [users, setUsers]   = useState(null);
    const [orders, setOrders] = useState(null);
    const [cars, setCars]     = useState(null);
    const [target, setTarget] = useState(null);
    const [modify, setModify] = useState(null);
    const [toggles, setToggles] = useState({
        users: true,
        orders: true,
        cars: true
    });
    const [amount, setAmount] = useState(1);
    const { types } = models;

    useEffect(() => {
        getUsers()
        getOrders()
        getCars()
    }, [])

    useEffect(() => {
        setAmount(1)
    },[target])

    const getUsers = async () => {
        console.log(url)
        axios.get(`users`).then(res => {
            setUsers(res.data)
        }).catch(err => console.error(err))
    }

    const getOrders = async () => {
        axios.get(`orders`).then(res => {
            setOrders(res.data)
        }).catch(err => console.error(err))
    }

    const getCars = async () => {
        axios.get(`cars`).then(res => {
            setCars(res.data)
        }).catch(err => console.error(err))
    }

    const onSubmit = (target, body) => {
        axios.post(`${target}`, body).then(res => {
            console.log(res)
            if(target === 'users') getUsers()
            if(target === 'orders') getOrders()
            if(target === 'cars') getCars()
            toast.success(`Added new to ${target}!`)
            setModify(null)
            setTarget(null)
        }).catch(err => {
            toast.error(err.message)
            console.error(err)
        })
    }

    const onModify = (target, body) => {
        axios.put(`${target}/${body._id}`, body).then(res => {
            console.log(res)
            if(target === 'users') getUsers()
            if(target === 'orders') getOrders()
            if(target === 'cars') getCars()
            setModify(null)
            setTarget(null)
        }).catch(err => {
            console.error(err)
            toast.error(err.message)
        })
    }

    const onPressRemove = (target, id) => {
        const c = window.confirm(`Remove ${target} with id ${id}?`)
        if(c) axios.delete(`${target}/${id}`).then(res => {
            console.log(res)
            toast.success(res.data)
            if(target === 'users') getUsers()
            if(target === 'orders') getOrders()
            if(target === 'cars') getCars()
        }).catch(err => {
            console.error(err)
            toast.error(err.message)
        })
    }

    const onPressModify = (target, body) => {
        setTarget(target)
        setModify(body)
    }

    const handleTargetChange = (target) => {
        setTarget(target)
        setModify(null)
    }

    return <div><h1>Dashboard</h1>
        <div style={styles.columns}>
            <div>
                K??ytt??j??t <br />
                <button onClick={getUsers}>Refresh</button>
                <button onClick={() => handleTargetChange('users')}>Add</button>
                <button onClick={() => setToggles(prev => ({ ...prev, users: !prev['users'] }))}>{toggles.users ? 'Piilota' : 'N??yt??'}</button>
                {toggles.users && (Array.isArray(users) && users.length > 0) && users.map(user => {
                    return <Box key={user._id} image_url={user.image_url} onPressModify={() => onPressModify('users', user)} onPressRemove={() => onPressRemove('users', user._id)}>
                        <p>{user.name} {user.manufacturer} {user.model}</p>
                        <p>ID: {user._id}</p>
                    </Box>
                })}
            </div>
            <div>
                Tilaukset <br />
                <button onClick={getOrders}>Refresh</button>
                <button onClick={() => handleTargetChange('orders')}>Add</button>
                <button onClick={() => setToggles(prev => ({ ...prev, orders: !prev['orders'] }))}>{toggles.orders ? 'Piilota' : 'N??yt??'}</button>
                {toggles.orders && (Array.isArray(orders) && orders.length > 0) && orders.map(order => {
                    const starts_at = new Date(order.starts_at).toLocaleString()
                    const ends_at = new Date(order.ends_at).toLocaleString()
                    return <Box key={order._id} onPressModify={() => onPressModify('orders', order)}>
                        Alkaa: {starts_at} <br/>
                        P????ttyy: {ends_at}
                        <p>K??ytt??j??: {order.user_id}</p>
                        <p>Auto: {order.car_id}</p>
                        <p>ID: {order._id}</p>
                    </Box>
                })}
            </div>
            <div>
                Autot <br />
                <button onClick={getCars}>Refresh</button>
                <button onClick={() => handleTargetChange('cars')}>Add</button>
                <button onClick={() => setToggles(prev => ({ ...prev, cars: !prev['cars'] }))}>{toggles.cars ? 'Piilota' : 'N??yt??'}</button>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {toggles.cars && (Array.isArray(cars) && cars.length > 0) && cars.map(car => {
                    return <Box key={car._id} image_url={car.image_url} onPressModify={() => onPressModify('cars', car)} onPressRemove={() => onPressRemove('cars', car._id)} >
                        <p>{car.name} {car.manufacturer} {car.model}</p>
                        <p>{car.year} {car.km} {car.fueltype}</p>
                        <p>ID: {car._id}</p>
                    </Box>
                })}
                </div>
            </div>
            
            <div style={{ position: 'absolute', right: 30, width: 300, backgroundColor: '#eee', borderRadius: 10 }}>
                {(target && !modify) && Array.from({ length: amount}).map(e => <InputForm key={e} onClose={() => setTarget(null)} target={target} onSubmit={(body) => onSubmit(target, body)} options={types}/>)}
                {(target && modify) && <ModifyForm onClose={() => setTarget(null)} modify={modify} target={target} onSubmit={(body) => onModify(target, body)} options={types}/>}
            </div>
        </div>
        
    </div>
}

export default Home;
