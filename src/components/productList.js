import React,{useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {collection, getDocs} from 'firebase/firestore'
import { db } from '../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

export const ProductList = ({addToCart}) => {

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    
    const getProducts = (async()=>{
      try {
          const quesrySnapShot = await getDocs(collection(db, 'products'));
          const productData = quesrySnapShot.docs.map((doc)=>({
              id: doc.id,
              ...doc.data()
          }))
          setProducts(productData);
          setFilteredProducts(productData);
          
      } catch (error) {
          console.log(error.message)
          
      }


  });
  useEffect(()=>{
    getProducts();

},[]);

const filterProducts = () => {
  const normalizedQuery = searchQuery.toLowerCase();
  if (normalizedQuery === '') {
    setFilteredProducts(products); // Return all products when search query is empty
  } else {
    const filtered = products.filter((product) =>
      product.productName.toLowerCase().includes(normalizedQuery) ||
      product.productDescription.toLowerCase().includes(normalizedQuery)
    );
    setFilteredProducts(filtered);
  }
};


    const gotoProduct = (productId) =>{
        navigate(`/product/${productId}`);
    }

    const handleAddToCart = (event, selectedProduct)=>{
      event.stopPropagation();
      addToCart(selectedProduct, 1);
    }
    
  return (
    <div className='product-list'>
    <div className='search-bar'>
        <input
          type='text'
          placeholder='Search products...'
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            filterProducts();
          }}
        />
      </div>
    
            <div className='products'>
              {
                filteredProducts.map((product) => (
                  <div onClick={() => gotoProduct(product.id)} className='product-card'>
                    <div key={product.id} >
                      <img src={product.productImage} className='product-image' alt='Product'/>
                      <p> {product.productName}</p>
                      <p> {product.productPrice}</p>
                      <p className='product-description'>
                        {product.productDescription.length > 4
                          ? `${product.productDescription.substring(0, 30)}...`
                          : product.productDescription}
                      </p>
                      <button onClick={(event) => handleAddToCart(event, product)}><FontAwesomeIcon icon={faCartShopping} />Add</button>
                    </div>
                  </div>
                ))


              }
            </div>
          
      
    </div>
  )
}