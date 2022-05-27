import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Frontpage from './Frontpage'
// import { magic } from './Magic';
import Request from './Request'
import Register from './Register'
import Home from './Home'
import SuccessRequest from './SuccessRequest'
import SuccessRegister from './SuccessRegister'
import SuccessCheckout from './SuccessCheckout'
import Login from './Login'
import Failure from './Failure'

function App() {

  return (
    <>
        <Router>
          <Routes>
              <Route path="*" element={<Frontpage />}/>
              <Route path="request" element={<Request />}/>
              
              <Route path="register" element={<Register />}/>

              <Route path="login" element={<Login />}/>
              <Route path="home" element={<Home />}/>
    
              <Route path="success-checkout" element={<SuccessCheckout />}/>
              <Route path="success-request" element={<SuccessRequest />}/>
              <Route path="success-register" element={<SuccessRegister />}/>
              <Route path="failure" element={<Failure />}/>
          </Routes>
        </Router>
        
    </>
  );
}

export default App;