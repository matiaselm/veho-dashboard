import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import Users from "./pages/Users";
import Orders from "./pages/Orders";
import Cars from "./pages/Cars";
import Home from "./pages/Home";
import './App.css';

const App = () => {
  return (<div>
    <Link to="/">Home</Link><br />
    <Link to="/users">Users</Link><br />
    <Link to="/orders">Orders</Link><br />
    <Link to="/cars">Cars</Link><br />

    <hr />

    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/users" element={<Users />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/cars" element={<Cars />} />
    </Routes>
  </div>
  );
}

export default App;
