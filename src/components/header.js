import React from 'react'
import {Link} from 'react-router-dom'
import { auth } from '../firebase'
import logo from '../images/mathulas.jpeg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass,faCartShopping ,faRightFromBracket,faUser} from '@fortawesome/free-solid-svg-icons';



export const Header = () => {
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
      <a href='/cart'> <FontAwesomeIcon icon={faCartShopping} /> </a>
      <a href='/logout'><FontAwesomeIcon icon={faRightFromBracket} /></a>
    </div>

   </nav>
    
  )
}