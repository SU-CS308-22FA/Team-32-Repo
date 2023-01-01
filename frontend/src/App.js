import './App.css';
import './bootstrap.min.css';
import React from 'react';
import Header from './components/Header'
import Footer from './components/Footer'
import Productspage from './page/Productspage';
import {Routes, Route} from 'react-router-dom'
import About from './page/About';
import { Container } from 'react-bootstrap'
import Productpage from './page/Productpage';
import Cartpage from './page/Cardpage'
import Loginpage from './page/Loginpage';
import Registerpage from './page/Registerpage';
import Profilepage from './page/Profilepage';
import Homepage from './page/Homepage';


function App() {
  return (
    <div>
      <Header />
      <Container className='mt-50 mb-50 justify-content-center'>
        <Routes>
        <Route path="/home" element={<Homepage />} />
        <Route path='/products' element={<Productspage />} />
        <Route path='/about' element={<About />} />
        <Route path="/product/:id" element={<Productpage />} />
        <Route path="/cart/:id?" element={<Cartpage />} />
        <Route path="/cart/:id" element={<Cartpage />} /> 
        <Route path="/cart" element={<Cartpage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/register" element={<Registerpage />} />
        <Route path="/profile" element={<Profilepage />} />
  
      
      </Routes>
      <Footer/> 
      </Container>
    </div>
  );
}

export default App;
