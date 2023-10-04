import React, { useState } from 'react';
import { db } from '../firebase';
import {  addDoc,collection } from 'firebase/firestore';


export const Checkout = ({ cartItems, totalPrice, deleteAllCartItems }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [suburb, setSuburb] = useState('');
  const [province, setProvince] = useState('');
  const [postcode, setPostcode] = useState('');

  const handleConfirm = async()=>{

    const isConfirmed = window.confirm('Are you sure you want to confirm the order?')
    if(!isConfirmed){
      return;
    }

    const ordersCollectionRef = collection(db, 'orders');

      const orderData = {
        address:{
          name,
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
     
      alert('Order saved with ID: ' + docRef.id);

    deleteAllCartItems();
    setName('');
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
    <div className='bili'>

      
      
      {/* Address */}
      <div className='address'>
      <h2>Billing Address</h2>
      <div className="address-container">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>


      <div className="address-container">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>


      <div className="address-container">
          <label htmlFor="phone">Phone</label>
          <input type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>

        <div className="address-container">
          <label htmlFor="street">Street</label>
          <input type="text" id="street" value={street} onChange={(e) => setStreet(e.target.value)} />
        </div>

        <div className="address-container">
          <label htmlFor="suburb">Suburb</label>
          <input type='text' id="suburb" value={suburb} onChange={(e) => setSuburb(e.target.value)} />
        </div>

        <div className="address-container">
          <label htmlFor="province">Province</label>
          <input type="text" id="province" value={province} onChange={(e) => setProvince(e.target.value)} />
        </div>

        <div className="address-container">
          <label htmlFor="postcode">Postcode</label>
          <input type='text' id="postcode" value={postcode} onChange={(e) => setPostcode(e.target.value)} />
        </div>
      </div>
      
      {/* Product Items */}
      <div>
      <ul className="product-list">
        {cartItems.map((item) => (
          <li key={item.id} className="product-item">
            {item.product.productName} - R{item.product.productPrice} - {item.quantity}
          </li>
        ))}
      </ul>

      <p>Total Price: R {totalPrice()}</p>
      </div>

      <div className='confirm-button'>
          <button
            onClick={handleConfirm}
            disabled={
              cartItems.length === 0 ||
              name.trim() === ''||
              email.trim()===''||
              phone.trim()===''||
              street.trim() === '' ||
              suburb.trim() === '' ||
              province.trim() === '' ||
              postcode.trim() === ''
            }
          >Confirm</button>
          </div>
    </div>
  );
};
