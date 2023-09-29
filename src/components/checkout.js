import React,{useState} from 'react';
import Address from './Address';

export const Checkout = ({ cartItems, totalPrice }) => {
  // State to store the address
  const [address, setAddress] = useState({
    street: '',
    suburb: '',
    province: '',
    postcode: 0,
  });

  // Function to save the address
  const saveAddress = (newAddress) => {
    setAddress(newAddress);
  };

  return (
    <div className='c'>

<Address address={address} onSaveAddress={saveAddress} />

      <h2>Checkout</h2>
      <ul>
        {cartItems.map((item) => (
          <div key={item.id}>
            {item.product.productName} - R{item.product.productPrice} - {item.quantity}
          </div>
        ))}
      </ul>
      <p>Total Price: R {totalPrice()}</p>
      <button>Confirm</button>
    </div>
  );
};
