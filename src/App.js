import './App.css';
import React, { useState, useEffect } from 'react';
import { collection,getDocs,addDoc, updateDoc, deleteDoc,doc } from 'firebase/firestore';
import { db } from './firebase';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from './components/header';
import ProductDetails from './components/productDetails';
import { ProductList } from './components/productList';
import { Cart } from './components/cart';
import { Checkout } from './components/checkout';


function App() {
  const [cartItems, setCartItems] = useState([]);

 const getCartItems = async()=>{
    try {
      const cartSnapshot = await getDocs(collection(db, 'cart'));
      const cartData = cartSnapshot.docs.map((doc)=>({
        id: doc.id,
        ...doc.data(),
      
      }))
      setCartItems(cartData);

      
    } catch (error) {
      console.log(error.nessage);
      
    }
  };

  const addToCart = async (product,quantity) => {
    try {
        const cartItem = {
            product: product,
            quantity: quantity,
        };

        // Check if the product is already in the cart
        const existingCartItem = cartItems.find(item => item.product.id === product.id);

        if (existingCartItem) {
            // Update the quantity of the existing cart item
            const updatedCartItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + quantity,
            };

            const cartItemRef = doc(db, 'cart', existingCartItem.id);
            await updateDoc(cartItemRef, {
                quantity: updatedCartItem.quantity,
            });

            setCartItems(prevCartItems => {
                return prevCartItems.map(item =>
                    item.product.id === product.id ? updatedCartItem : item
                );
            });

            alert('Quantity updated in cart');
        } else {
            // Add the new item to the cart
            const cartRef = await addDoc(collection(db, 'cart'), cartItem);
            setCartItems(prevCartItems => [...prevCartItems, { id: cartRef.id, ...cartItem }]);
            alert('Added to cart successfully');
        }
    } catch (error) {
        console.log(error.message);
    }
};


const updateCartItemQuantity = async(itemId, quantity)=>{
  const cartItemRef = doc(db, 'cart', itemId);
  await updateDoc(cartItemRef, {quantity: quantity});
  getCartItems();

};

const deleteCartItem = async(itemId)=>{
  try {
    await deleteDoc(doc(db, 'cart', itemId));
    setCartItems((prevCartItems)=> prevCartItems.filter((item)=>item.id !== itemId));
    
    
  } catch (error) {
    console.log(error.message);
    
  }
};

useEffect(()=>{
  getCartItems();
},[]);

  return (
    <div className="App">



      <BrowserRouter>
        <Routes>

          <Route path='/' element={<ProductList addToCart={addToCart}/>} />
          <Route path='/product/:productId' element={<ProductDetails addToCart={addToCart}/>}/>
          <Route path='/cart' element={<Cart cartItems={cartItems} updateCartItemQuantity={updateCartItemQuantity} deleteCartItem={deleteCartItem}/>}/>
          

        </Routes>
      </BrowserRouter>






    </div>
  );
}

export default App;