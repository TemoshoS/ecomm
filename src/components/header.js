import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { auth } from '../firebase'
import logo from '../images/mathulas.jpeg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass,faCartShopping ,faRightFromBracket,faUser} from '@fortawesome/free-solid-svg-icons';
import { collection, getDocs,doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase';


export const Header = () => {

  const [cartItems, setCartItems] = useState([]);
  


  useEffect(() =>{
    getCartItems();

  },[]);

  const getCartItems = async()=>{
    try {

      const cartSnapshot = await getDocs(collection(db, 'cart'));
      const cartData = cartSnapshot.docs.map((doc)=>({
        id: doc.id,
        ...doc.data(),
      }))
      setCartItems(cartData);
      
    } catch (error) {
      console.log(error.message);
      
    }
  }

  return (

   <nav className='nav-bar'>
    <div>
      <a href='/'><img src={logo} alt='No logo' className='nav-logo'/></a>
    </div>

    <div className='search-container'>
  <input type='text' placeholder='Search for products' className='nav-input' />
  <FontAwesomeIcon icon={faMagnifyingGlass} className='search-icon' />
</div>

    <div className='nav-links'>

      <a href='/signin'>Sign In  <FontAwesomeIcon icon={faUser} /></a>
      <a href='/cart' className="cart-icon">
      <FontAwesomeIcon icon={faCartShopping} />
      {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
      </a>

      <a href='/logout'><FontAwesomeIcon icon={faRightFromBracket} /></a>
    </div>

   </nav>
    
  )
}