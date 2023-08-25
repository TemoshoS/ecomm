import React,{useEffect, useState} from 'react'
import { collection, getDocs,doc, updateDoc,deleteDoc } from 'firebase/firestore'
import { db } from '../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export const Cart = () => {

  const [cartItems, setCartItems] = useState([]);
  


  useEffect(() =>{
    getCartItems();

  },[]);

  const getCartItems = async()=>{
    try {

      const cartSnapshot = await getDocs(collection(db, 'cart'));
      const cartData = cartSnapshot.docs.map((doc)=>({
        id: doc.id,
        ...doc.data(),
      }))
      setCartItems(cartData);
      
    } catch (error) {
      console.log(error.message);
      
    }
  }



  

  const increaseQuantity = async (itemId) => {
    const updatedCartItems = cartItems.map((item) => {
        if (item.id === itemId) {
            return {
                ...item,
                quantity: item.quantity + 1,
            };
        }
        return item;
    });
    setCartItems(updatedCartItems);
    await updateCartItemQuantityInFirestore(itemId, updatedCartItems.find((item) => item.id === itemId).quantity);
}

const decreaseQuantity = async (itemId) => {
  const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId && item.quantity > 1) {
          return {
              ...item,
              quantity: item.quantity - 1,
          };
      }
      return item;
  });
  setCartItems(updatedCartItems);
  await updateCartItemQuantityInFirestore(itemId, updatedCartItems.find((item) => item.id === itemId).quantity);
}
const updateCartItemQuantityInFirestore = async (itemId, quantity) => {
  const cartItemRef = doc(db, 'cart', itemId);
  await updateDoc(cartItemRef, {
      quantity: quantity,
  });
}

const deleteCartItem = async(itemId) =>{
  try {
    await deleteDoc(doc(db, 'cart',itemId));
    setCartItems((prevCartItems)=>prevCartItems.filter((item)=>item.id !== itemId))
    
  } catch (error) {
    console.log(error.message)
    
  }
}

const productTotal =(item)=>{
  return item.product.productPrice * item.quantity;
}


const totalPrice = () => {
  return cartItems.reduce((total, item) => total + productTotal(item), 0);
};

  return (
    <div className='cart'>
      <h2>My cart - {cartItems.length} items</h2>
      {cartItems.length === 0 ?(
        <p>Your cart is empty.</p>
      ):(
        <div>
        <div  >
          {cartItems.map((item)=>(
            <div className='cart-product' key={item.id}>
              <div className='quanity'>

                <div className='cart-buttons-container'>
                <button onClick={() => increaseQuantity(item.id)}>+</button>
                <button onClick={() => decreaseQuantity(item.id)}>-</button>
               </div>

              </div>
              <p><img src={item.product.productImage} style={{width:'100px', height:'100px'}}/></p>
              
              <div>
              <p>{item.product.productName} </p>
              <p>Quanity {item.quantity}</p>
              </div>
              
              <p> R {productTotal(item)}</p>
              <button onClick={()=> deleteCartItem(item.id)}><FontAwesomeIcon icon={faTrash} /></button>
              </div>
          ))}

         </div>
          
          <p>Total Price: R {totalPrice()}</p>

          </div>
      )}
    

    </div>
  )
}