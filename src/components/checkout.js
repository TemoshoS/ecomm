import React from 'react'

export const Checkout = ({cartItems, total, placeOrder}) => {
  return (
    <div className='checkout'>
      <h2>Checkout</h2>
      <ul>
      {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price}
          </li>
        ))}

      </ul>
      <p>Total: ${total}</p>
      <button onClick={placeOrder}>Place Order</button>


    </div>
  )
}