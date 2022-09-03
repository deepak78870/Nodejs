import React, { StrictMode } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Signup from './Components/Signup';
import Login from './Components/Login';
import Dashboard from './Components/Dashbord';
import UpdateUser from './Components/UpdateUser';
import AddProduct from './Components/AddProduct';
import Home from './Components/Home';


function App() {
  return (
    
    <BrowserRouter>
  
    <Routes>
    <Route path="/login" element={<Login/>} />
    <Route path="/signup" element={<Signup/>} />
    <Route path="/update" element={<UpdateUser/>} />
    <Route path="/addproduct" element={<AddProduct/>} />
    <Route path="/produtdetails" element={<Home/>} />
    <Route path="/" element={<Dashboard/>} /> 
    </Routes>

  </BrowserRouter>
  );
}

export default App;
