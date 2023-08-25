import React, { useEffect, useState } from 'react';
import { useParams, Link} from 'react-router-dom';
import { doc, getDoc} from 'firebase/firestore';
import { db } from '../firebase';
const ProductDetails = ({addToCart}) => {

    
    const { productId } = useParams(); 
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

    const addToCart = async()=>{
        try {
            const cartItem = {
                product:product,
                quantity: quantity,
            };

            const cartRef = await addDoc(collection(db, 'cart'),cartItem);
            alert('added to cart succesful', cartRef.id);
            
        } catch (error) {
            
        }
    }

    const totalPrice = product ? product.productPrice * quantity : 0;

    return (
        <div className='product-details'>
            
            <div className='product-view-card'>
                <div className='back-shop'>
                    <Link to='/'><button>BACK</button></Link>
                </div>

                <img src={product ? product.productImage : ''} className='product-view-image' alt='Product'/>

                <div>
                <h2>{product ? product.productName : ''}</h2>
                <p>{product ? product.productDescription : ''}</p>

                <p>R: {totalPrice.toFixed(2)}</p>

                <div className='product-quanity'>
                    <button onClick={decreaseQuantity}>-</button>
                    <p>{quantity}</p>
                    <button onClick={increaseQuantity}>+</button>
                </div>
                <button onClick={handleAddToCart} className='add-to-cart-btn'>Add to Cart</button>
            </div>
        </div>
        </div>

    );
};

export default ProductDetails;
