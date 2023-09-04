import React from 'react'
import logo from '../images/mathulas.jpeg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass,faCartShopping ,faRightFromBracket,faUser} from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';


export const Header = ({cartItems}) => {
   const location = useLocation();

   const isCheckRoute = location.pathname === '/checkot';

   

  return (

   <nav>
    {!isCheckRoute &&(

      <div className='nav-bar'>
         <div>
        <a href='/'><img src={logo} alt='No logo' className='nav-logo' /></a>
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

      </div>
 
    )}
     
   </nav>
    
  )
}