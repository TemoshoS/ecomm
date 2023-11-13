import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RxCross2 } from 'react-icons/rx';
import { auth } from '../firebase';
import LoginModal from './LoginModal';

export const Cart = ({
  cartItems,
  increaseQuantity,
  decreaseQuantity,
  productTotal,
  deleteCartItem,
  totalPrice,
}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Use useEffect to check if the user is authenticated
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Function to handle the checkout process
  const checkOut = async () => {
    if (user) {
      // Redirect to the checkout page if the user is authenticated
      navigate('/checkout');
    } else {
      // Show the login modal if the user is not authenticated
      setShowLoginModal(true);
    }
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  // Function to handle navigation back to the shopping product list
  const handleShopping = () => {
    navigate('/');
  };

  return (
    <div className='cart'>
      <h2>My cart - {cartItems.length} items</h2>
      {cartItems.length === 0 ? (
        <div>
          <p>Your cart is empty.</p>
          <button onClick={handleShopping} className='continue-button'>
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className='cart-content'>
          <div className='products-list'>
            {cartItems.map((item) => (
              <div key={item.id}>
                <div className='cart-product'>
                  <img src={item.product.productImage} className='cart-img' alt='Product' />
                  <div>
                    <p className='product-cart-name'>{item.product.productName}</p>
                  </div>
                  <div className='quantity'>
                    <div className='cart-buttons-container'>
                      <button onClick={() => decreaseQuantity(item.id)}>-</button>
                      <p className='cart-quantity'>{item.quantity}</p>
                      <button onClick={() => increaseQuantity(item.id)}>+</button>
                    </div>
                  </div>
                  <p>R {productTotal(item)}</p>
                  <button onClick={() => deleteCartItem(item.id)} className='delete-btn'>
                    <RxCross2 />
                  </button>
                </div>
                <div className='cart-line'></div>
              </div>
            ))}
          </div>

          <div className='cart-summary'>
            <b className='summary'>Cart Summary</b>
            <p className='cart-tot-price'>
              Total Price: <span className='cart-price'>R{totalPrice()}</span>
            </p>
            <button onClick={checkOut} className='checkout'>
              Checkout
            </button>
          </div>
        </div>
      )}

      {/* Conditionally render the LoginModal based on showLoginModal state */}
      {showLoginModal && <LoginModal onClose={closeLoginModal} />}
    </div>
  );
};
