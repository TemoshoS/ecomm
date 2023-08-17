import React from 'react'

export const Cart = ({ cartItems, removeFromCart, checkout }) => {
  return (
    <div className='cart'>
      <h2>Cart</h2>
      <ul>

          {
            cartItems.map((item)=>(
              <li key={item.id}>
               {item.name} = ${item.price}{' '}
               <button onClick={()=>removeFromCart(item)}>Remove</button>

              </li>
            ))


          }

      </ul>
      <button onClick={checkout}>Checkout</button>




    </div>
  )
}