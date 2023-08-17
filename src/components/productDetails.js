import React, { useEffect, useState } from 'react';
import { useParams, useNavigate ,Link} from 'react-router-dom';
import { doc, getDoc, addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

const ProductDetails = () => {

    const navigate = useNavigate();
    const { productId } = useParams(); // Retrieve the itemId from the URL
    const [product, setProduct] = useState(null);



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

    return (
        <div className='product-details'>
            <h2>Product</h2>
            <img src={product ? product.productImage : ''} style={{width:'200px', height: '200px'}}/>
            <h2 >{product ? product.productName : ''} </h2>
            <p>{product? product.productDescription : ''}</p>
            
            <p>{product? product.productPrice : ''}</p>

            <Link to='/'><button>back</button></Link>



        </div>
    );
};

export default ProductDetails;
