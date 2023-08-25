import React, { useEffect, useState } from 'react';
import { useParams, useNavigate ,Link} from 'react-router-dom';
import { doc, getDoc, addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

const ProductDetails = () => {

    const navigate = useNavigate();
    const { productId } = useParams(); // Retrieve the itemId from the URL
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    
    const increaseQuantity =()=>{
        setQuantity(quantity + 1);
    }

    const decreaseQuantity=()=>{
        if(quantity > 1){
        setQuantity(quantity - 1);
        }
    }


    useEffect(() => {

        const fetchProduct = async () => {
            try {
                // Fetch the product details using the itemId
                const productData = await fetchProductDetails(productId);
                setProduct(productData);
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchProduct();
    }, [productId]);

    const fetchProductDetails = async (productId) => {
        try {
            const productRef = doc(db, 'products', productId);
            const productSnapshot = await getDoc(productRef);
            return { id: productSnapshot.id, ...productSnapshot.data() };
        } catch (error) {
            console.log(error.message);
            return null;
        }
    };

    const addToCart = async () => {
        try {
            const cartItem = {
                product: product,
                quantity: quantity,
            };
    
            const existingCartItem = cartItems.find(item => item.product.id === product.id);
    
            if (existingCartItem) {
                const updatedCartItems = cartItems.map(item => {
                    if (item.product.id === product.id) {
                        return {
                            ...item,
                            quantity: item.quantity + quantity,
                        };
                    }
                    return item;
                });
                setCartItems(updatedCartItems);
                await updateCartItemQuantityInFirestore(existingCartItem.id, existingCartItem.quantity + quantity);
            } else {
                const cartRef = await addDoc(collection(db, 'cart'), cartItem);
                setCartItems([...cartItems, { ...cartItem, id: cartRef.id }]);
            }
    
            alert('Added to cart successfully');
        } catch (error) {
            console.error(error);
        }
    };
    

    return (
        <div className='product-details'>
            <h2>Product</h2>
            <img src={product ? product.productImage : ''} style={{width:'200px', height: '200px'}}/>
            <h2 >{product ? product.productName : ''} </h2>
            <p>{product? product.productDescription : ''}</p>
            
            <p>{product? product.productPrice : ''}</p>
           <button onClick={decreaseQuantity}>-</button> <p>Quanity: {quantity}</p><button onClick={increaseQuantity}>+</button>
            <button onClick={addToCart}>Add to Cart</button>

            <Link to='/'><button>back</button></Link>



        </div>
    );
};

export default ProductDetails;
