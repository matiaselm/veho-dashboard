import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import Users from "./pages/Users";
import Orders from "./pages/Orders";
import Cars from "./pages/Cars";
import Home from "./pages/Home";
import './App.css';
import axios from './services/axios';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [form, setForm] = React.useState({ username: '', password: '' });

  const onSubmit = (e) => {
    e.preventDefault();
    axios.post('verify', form).then(res => {
      setIsAuthenticated(true);
      setForm({ username: '', password: '' })
    }).catch(e => {
      console.error(e);
      setIsAuthenticated(false);
      setForm({ username: '', password: '' })
    })
  }

  const handleTargetChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }
  
  return (<div style={{ margin: 10 }}>
    { !isAuthenticated && <div style={{ margin: 10, maxWidth: 200 }}>
      Kirjaudu sisään
      <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
      <input style={{ margin: 5 }} type="text" name='username' placeholder="username" value={form['username']} onChange={handleTargetChange} />
      <input style={{ margin: 5 }} type="password" name='password' placeholder="password" value={form['password']} onChange={handleTargetChange} />
      <button style={{ margin: 5 }} type="submit">Kirjaudu</button>
    </form></div> }
    
    { isAuthenticated && <div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', maxWidth: 400, margin: 5 }}>
        <Link to="/">Kaikki</Link><br />
        <Link to="/users">Käyttäjät</Link><br />
        <Link to="/orders">Tilaukset</Link><br />
        <Link to="/cars">Autot</Link><br />
      </div>
      <hr />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/cars" element={<Cars />} />
      </Routes>
    </div>}
  </div>
  );
}

export default App;
