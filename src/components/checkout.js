import React, { useState } from 'react';
import { db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
import PaystackPop from '@paystack/inline-js';

export const Checkout = ({ cartItems, totalPrice, deleteAllCartItems }) => {
  // State variables to store form data
  const [firstname, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [suburb, setSuburb] = useState('');
  const [province, setProvince] = useState('');
  const [postcode, setPostcode] = useState('');

  // Function to handle payment with Paystack
  const paywithpaystack = (e) => {
    e.preventDefault();

    const paystack = new PaystackPop();
    const calculatedAmount = totalPrice();

    paystack.newTransaction({
      key: "pk_test_1614fb1b435881450bf82e4c90488b8143bed936",
      amount: calculatedAmount * 100,
      email: email,
      firstname: firstname,
      phone: phone,

      onSuccess(transaction) {
        let message = `Payment Complete! Reference ${transaction.reference}`
        alert(message);
        // After successful payment, call handleConfirm to save the order data
        handleConfirm();
      },
      onCancel() {
        alert('You have canceled the transaction')
      }
    })
  }

  // Function to handle order confirmation and data submission
  const handleConfirm = async () => {
    const ordersCollectionRef = collection(db, 'orders');

    const orderData = {
      address: {
        firstname,
        email,
        phone,
        street,
        suburb,
        province,
        postcode,
      },
      items: cartItems,
      total: totalPrice(),
    };

    try {
      const docRef = await addDoc(ordersCollectionRef, orderData);

      // Clear the cart and form fields after successful order submission
      deleteAllCartItems();
      setFirstName('');
      setEmail('');
      setPhone('');
      setStreet('');
      setSuburb('');
      setProvince('');
      setPostcode('');
    } catch (error) {
      console.log('Error adding order:', error);
    }
  }

  return (
    <div>
      <div className='billing'>
        {/* Address Form */}
        <div className='address'>
          <h2>Billing Address</h2>

          <div className="address-container">
            <label htmlFor="first-name">Name</label>
            <input type="text" id="first-name" value={firstname} onChange={(e) => setFirstName(e.target.value)} />
          </div>

          <div className="address-container">
            <label htmlFor="email">Email</label>
            <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="address-container">
            <label htmlFor="phone">Phone</label>
            <input type="number" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>

          {/* More address fields... */}
        </div>

        {/* Product Items */}
        <div>
          <div className='checkout-cart'>
            <h2>Cart</h2>
            {/* Display items in the cart */}
            {cartItems.map((item) => (
              <div key={item.id} className="Items">
                {item.product.productName} - R{item.product.productPrice} - {item.quantity}
              </div>
            ))}
            <p>Total Price: R {totalPrice()}</p>
          </div>
        </div>
      </div>

      {/* Payment button */}
      <div className='confirm-button'>
        <button
          onClick={paywithpaystack}
          disabled={
            cartItems.length === 0 ||
            firstname.trim() === '' ||
            email.trim() === '' ||
            phone.trim() === '' ||
            street.trim() === '' ||
            suburb.trim() === '' ||
            province.trim() === '' ||
            postcode.trim() === ''
          }
        >Pay</button>
      </div>
    </div>
  );
};
