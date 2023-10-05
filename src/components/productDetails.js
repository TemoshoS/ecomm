import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

// Define a functional component called ProductDetails that accepts a prop addToCart
const ProductDetails = ({ addToCart }) => {
    
    // Extract the productId from the URL parameters
    const { productId } = useParams(); 

    // Initialize state variables for product data and quantity
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    
    // Function to increase the quantity
    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    }

    // Function to decrease the quantity, with a check to ensure it doesn't go below 1
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    // useEffect is used for fetching the product details when the component mounts
    useEffect(() => {
        // Define a function to fetch product details asynchronously
        const fetchProduct = async () => {
            try {
                // Fetch the product details using the itemId and set the state
                const productData = await fetchProductDetails(productId);
                setProduct(productData);
            } catch (error) {
                console.log(error.message);
            }
        };

        // Call the fetchProduct function when the component mounts and when the productId changes
        fetchProduct();
    }, [productId]);

    // Function to fetch product details from Firebase based on productId
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

    // Function to handle adding the product to the cart
    const handleAddToCart = () => {
        if (product) {
            addToCart(product, quantity);
        }
    }

    // Calculate the total price based on product price and quantity
    const totalPrice = product ? product.productPrice * quantity : 0;

    // Render the product details and UI elements
    return (
        <div className='product-details'>
            <div className='product-view-card'>
                {/* Display the product image */}
                <img src={product ? product.productImage : ''} className='product-view-image' alt='Product' />

                <div className='product-details-content'>
                    {/* Display product name */}
                    <h2>{product ? product.productName : ''}</h2>
                    
                    {/* Display total price */}
                    <p className='price'>R{totalPrice.toFixed(2)}</p>
                    
                    {/* Display product description */}
                    <p className='product-desc'>{product ? product.productDescription : ''}</p>

                    {/* Product quantity controls */}
                    <div className='product-quanity'>
                        <b>Quantity:</b>
                        <button onClick={decreaseQuantity}>-</button>
                        <p>{quantity}</p>
                        <button onClick={increaseQuantity}>+</button>
                    </div>
                    
                    {/* Add to cart button */}
                    <button onClick={handleAddToCart} className='add-to-cart-btn'>Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
