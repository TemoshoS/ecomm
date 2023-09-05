import React,{useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {collection, getDocs} from 'firebase/firestore'
import { db } from '../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faMagnifyingGlass,faCartShopping } from '@fortawesome/free-solid-svg-icons';


export const ProductList = ({addToCart}) => {

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    
    const getProducts = (async()=>{
      try {
          const quesrySnapShot = await getDocs(collection(db, 'products'));
          const productData = quesrySnapShot.docs.map((doc)=>({
              id: doc.id,
              ...doc.data()
          }))
          setProducts(productData);
         
          
      } catch (error) {
          console.log(error.message)
          
      }


  });
  useEffect(()=>{
    getProducts();

},[]);



    const gotoProduct = (productId) =>{
        navigate(`/product/${productId}`);
    }

    const handleAddToCart = (event, selectedProduct)=>{
      event.stopPropagation();
      addToCart(selectedProduct, 1);
    }
    
  return (
    <div className='product-list'>

    <div className='search-container'>
        <input onChange={(event) => setSearch(event.target.value)} type='text' placeholder='Search for products' className='nav-input' />
        <FontAwesomeIcon icon={faMagnifyingGlass} className='search-icon' />
      </div>
    
            <div className='products'>
             
        {products && products.filter((item) => {
          return search.toLowerCase() === '' ? item : item.productName.toLowerCase().includes(search.toLowerCase())
        }).map((product) => (
          <div onClick={() => gotoProduct(product.id)} className='product-card'>
            <div key={product.id} >
              <img src={product.productImage} className='product-image' alt='Product' />
              <b> {product.productName}</b>
              <p className='product-description'>
                {product.productDescription.length > 4
                  ? `${product.productDescription.substring(0, 30)}...`
                  : product.productDescription}
              </p>
              <p>R {product.productPrice}</p>
              <button onClick={(event) => handleAddToCart(event, product)}><FontAwesomeIcon icon={faCartShopping} />Add</button>
            </div>
          </div>
        ))


        }
            </div>
          
      
    </div>
  )
}