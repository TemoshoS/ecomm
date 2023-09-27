import React from 'react';

export const Checkout = ({ cartItems, totalPrice }) => {
  return (
    <div className='c'>
      <h2>Checkout</h2>
      <ul>
        {cartItems.map((item) => (
          <div key={item.id}>
            {item.product.productName} - R{item.product.productPrice} - {item.quantity}
          </div>
        ))}
      </ul>
      <p>Total Price: R {totalPrice()}</p>
    </div>
  );
};
