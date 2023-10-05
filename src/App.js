import './App.css';
import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
import { db } from './firebase';
import { BrowserRouter, Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import { Header } from './components/header';
import ProductDetails from './components/productDetails';
import { ProductList } from './components/productList';
import { Cart } from './components/cart';
import { Checkout } from './components/checkout';
import SignUp from './components/signUp';
import Signin from './components/login';
import ForgotPassword from './components/forgotPassword';
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from './firebase'
import Footer from './components/footer';


function App() {
  // State variables
  const [cartItems, setCartItems] = useState([]); // Store cart items
  const [authUser, setAuthUser] = useState(null); // Store authenticated user
  const navigate = useNavigate(); // Navigation hook
  const location = useLocation(); // Location hook

  // Determine current route
  const isRegisterRoute = location.pathname === '/register';
  const isLoginRoute = location.pathname === '/login';
  const isForgotPassword = location.pathname === '/forgotpassword';

  // useEffect to run code when the component mounts
  useEffect(() => {
    getCartItems(); // Fetch cart items when the component mounts

    // Authentication listener to detect user sign in or sign out
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user); // If user is signed in, set the authenticated user
      } else {
        setAuthUser(null); // If user is signed out, set the authenticated user to null
      }
    });

    // Cleanup the authentication listener when the component unmounts
    return () => {
      listen();
    };
  }, []);

  // Function to sign out the authenticated user
  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        alert('Sign out successful');
        navigate('/');
      })
      .catch((error) => console.log(error));
  };

  // Function to fetch cart items from the database
  const getCartItems = async () => {
    try {
      let cartSnapshot;
    
      if (authUser) {
        // If the user is logged in, fetch only their cart items
        cartSnapshot = await getDocs(query(collection(db, 'cart'), where('userId', '==', authUser.uid)));
      } else {
        // If the user is not logged in, fetch all cart items
        cartSnapshot = await getDocs(collection(db, 'cart'));
      }
      
      const cartData = cartSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCartItems(cartData);
    } catch (error) {
      console.log(error.message);
    }
  };

  // Function to calculate the total price of items in the cart
  const totalPrice = () => {
    return cartItems.reduce((total, item) => total + productTotal(item), 0);
  };

  // Function to calculate the total price of a specific product in the cart
  const productTotal = (item) => {
    return item.product.productPrice * item.quantity;
  };

  // Function to add a product to the cart
  const addToCart = async (product, quantity) => {
    try {
      const cartItem = {
        product: product,
        quantity: quantity,
        userId: authUser ? authUser.uid : null,
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

  // Function to increase the quantity of an item in the cart
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
  };

  // Function to decrease the quantity of an item in the cart
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
  };

  // Function to update the quantity of an item in the cart
  const updateCartItemQuantity = async (itemId, quantity) => {
    const cartItemRef = doc(db, 'cart', itemId);
    await updateDoc(cartItemRef, { quantity: quantity });
    getCartItems(); // Refresh cart items after update
  };

  // Function to delete a product from the cart
  const deleteCartItem = async (itemId) => {
    try {
      await deleteDoc(doc(db, 'cart', itemId));
      setCartItems((prevCartItems) => prevCartItems.filter((item) => item.id !== itemId));
    } catch (error) {
      console.log(error.message);
    }
  };

  // Function to delete all cart items
  const deleteAllCartItems = async () => {
    try {
      if (cartItems.length === 0) {
        alert('Cart is already empty.');
        return;
      }

      // Loop through all cart items and delete them one by one
      for (const cartItem of cartItems) {
        await deleteDoc(doc(db, 'cart', cartItem.id));
      }

      // Clear the cart items from the state
      setCartItems([]);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="App">
            {/* Render Header component if not on certain routes */}
            {!isLoginRoute && !isRegisterRoute && !isForgotPassword && (
        <Header cartItems={cartItems} authUser={authUser} userSignOut={userSignOut} />
      )}

      {/* Define routes for the application */}
      <Routes>
        <Route path='/' element={<ProductList addToCart={addToCart} />} />
        <Route path='/product/:productId' element={<ProductDetails addToCart={addToCart} />} />
        <Route
          path='/cart'
          element={
            <Cart
              cartItems={cartItems}
              updateCartItemQuantity={updateCartItemQuantity}
              deleteCartItem={deleteCartItem}
              decreaseQuantity={decreaseQuantity}
              increaseQuantity={increaseQuantity}
              productTotal={productTotal}
              totalPrice={totalPrice}
            />
          }
        />
        <Route
          path='/checkout'
          element={<Checkout cartItems={cartItems} totalPrice={totalPrice} deleteAllCartItems={deleteAllCartItems} />}
        />
        <Route path='/register' element={<SignUp />} />
        <Route path='/login' element={<Signin />} />
        <Route path='/forgotpassword' element={<ForgotPassword />} />
      </Routes>

      {/* Render Footer component if not on certain routes */}
      {!isLoginRoute && !isRegisterRoute && !isForgotPassword && <Footer />}
    </div>
  );
}

export default App;

