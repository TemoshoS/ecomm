import './App.css';
import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from './components/header';
import Home from './components/Home';
import ProductDetails from './components/productDetails';
import { ProductList } from './components/productList';
import { Cart } from './components/cart';
import { Checkout } from './components/checkout';
import SignUp from './components/signUp';
import Signin from './components/login';
import ForgotPassword from './components/forgotPassword';


function App() {
  const [cartItems, setCartItems] = useState([]);

  //get all products from cart
  const getCartItems = async () => {
    try {
      const cartSnapshot = await getDocs(collection(db, 'cart'));
      const cartData = cartSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),

      }))
      setCartItems(cartData);


    } catch (error) {
      console.log(error.nessage);

    }
  };

  const productTotal = (item) => {
    return item.product.productPrice * item.quantity;
  }
  const totalPrice = () => {
    return cartItems.reduce((total, item) => total + productTotal(item), 0);
    
  };


  //add product to cart
  const addToCart = async (product, quantity) => {
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

  //increase quantity inside cart
  const increaseQuantity = async (itemId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    await updateCartItemQuantity(itemId, updatedCartItems.find((item) => item.id === itemId).quantity);
  }


  //decrease quantity inside cart
  const decreaseQuantity = async (itemId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId && item.quantity > 1) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    await updateCartItemQuantity(itemId, updatedCartItems.find((item) => item.id === itemId).quantity);
  }

//update cart
  const updateCartItemQuantity = async (itemId, quantity) => {
    const cartItemRef = doc(db, 'cart', itemId);
    await updateDoc(cartItemRef, { quantity: quantity });
    getCartItems();

  };


  //delete product
  const deleteCartItem = async (itemId) => {
    try {
      await deleteDoc(doc(db, 'cart', itemId));
      setCartItems((prevCartItems) => prevCartItems.filter((item) => item.id !== itemId));


    } catch (error) {
      console.log(error.message);

    }
  };



  useEffect(() => {
    getCartItems();
  }, []);


  return (
    <div className="App">



      <BrowserRouter>
        <Header cartItems={cartItems} />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/productlist' element={<ProductList addToCart={addToCart} />} />
          <Route path='/product/:productId' element={<ProductDetails addToCart={addToCart} />} />
          <Route path='/cart' element={<Cart cartItems={cartItems} updateCartItemQuantity={updateCartItemQuantity} deleteCartItem={deleteCartItem} decreaseQuantity={decreaseQuantity} increaseQuantity={increaseQuantity} productTotal={productTotal} totalPrice={totalPrice} />} />
          <Route path='/checkout' element={<Checkout cartItems={cartItems} totalPrice={totalPrice}/>} />
          <Route path='/register' element={<SignUp/>}/>
          <Route path='/login' element={<Signin/>}/>
          <Route path='/forgotpassword' element={<ForgotPassword/>}/>

        </Routes>
      </BrowserRouter>








    </div>
  );
}

export default App;