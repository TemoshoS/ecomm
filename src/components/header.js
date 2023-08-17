import React from 'react'
import {Link} from 'react-router-dom'
import { auth } from '../firebase'


export const Header = () => {
  return (

   <nav className='nav-bar'>
    <div>
      <p>Logo</p>
    </div>

    <div>
      <p>cart</p>
      <p></p>
    </div>

   </nav>
    
  )
}