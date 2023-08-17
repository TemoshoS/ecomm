import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from './components/header';
import ProductDetails from './components/productDetails';
import { ProductList } from './components/productList';
import { Cart } from './components/cart';
import { Checkout } from './components/checkout';


function App() {

  return (
    <div className="App">



      <BrowserRouter>
        <Routes>

          <Route path='/' element={<ProductList/>} />
          <Route path='/product/:productId' element={<ProductDetails/>}/>

          

        </Routes>
      </BrowserRouter>






    </div>
  );
}

export default App;