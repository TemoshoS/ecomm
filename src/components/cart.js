import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { RxCross2} from 'react-icons/rx';

export const Cart = ({ cartItems, increaseQuantity, decreaseQuantity, productTotal,deleteCartItem ,totalPrice}) => {


  const navigate = useNavigate();

  const checkOut=()=>{
    navigate('/checkout')
  }
 
  return (
    <div className='cart'>
      <h2>My cart - {cartItems.length} items</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
        <div  >
          {cartItems.map((item)=>(
            <div className='cart-product' key={item.id}>

             
                <p><img src={item.product.productImage} className='cart-img' alt='Product'/></p>
                <div>
                  <p>{item.product.productName} </p>
                </div>
 <p>
                  <div className='quanity'>
                   <div className='cart-buttons-container'>
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                    <p>{item.quantity}</p>
                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                  </div>

                </div>
                </p>
                <p> R {productTotal(item)}</p>
                <button onClick={() => deleteCartItem(item.id)} className='delete-btn'><RxCross2/></button>
              </div>
            ))}

          </div>

          <p>Total Price: R {totalPrice()}</p>
          <button onClick={checkOut}>Checkout</button>

        </div>
      )}


    </div>
  )
}