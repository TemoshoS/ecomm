import React, { useState } from 'react';
import { db } from '../firebase';
import {  addDoc,collection } from 'firebase/firestore';
import PaystackPop from '@paystack/inline-js'



export const Checkout = ({ cartItems, totalPrice, deleteAllCartItems }) => {
  const [firstname, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [suburb, setSuburb] = useState('');
  const [province, setProvince] = useState('');
  const [postcode, setPostcode] = useState('');


  const paywithpaystack =(e)=>{
    e.preventDefault();

    const paystack = new PaystackPop();
    const calculatedAmount = totalPrice();

    paystack.newTransaction({
      key:"pk_test_1614fb1b435881450bf82e4c90488b8143bed936",
      amount: calculatedAmount * 100,
      email:email,
      firstname:firstname,
      phone:phone,

      onSuccess(transaction){
        let message = `Payment Complete! Reference ${transaction.reference}`
        alert(message);
        // After successful payment, call handleConfirm to save the order data
      handleConfirm();
      },
      onCancel(){
        alert('you have canceled the transaction')
      }
    })
  }

  const handleConfirm = async()=>{

  
    const ordersCollectionRef = collection(db, 'orders');

      const orderData = {
        address:{
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

      
      
      {/* Address */}
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
      
      <div className='checkout-cart'>
        <h2>Cart</h2>
        {cartItems.map((item) => (
          <div key={item.id} className="Items">
            {item.product.productName} - R{item.product.productPrice} - {item.quantity}
          </div>
        ))}
        <p>Total Price: R {totalPrice()}</p>
      </div>

      
      </div>
      </div>
      <div className='confirm-button'>
          <button
            onClick={paywithpaystack}
            disabled={
              cartItems.length === 0 ||
              firstname.trim() === ''||
              email.trim()===''||
              phone.trim()===''||
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