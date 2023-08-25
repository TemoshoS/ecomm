import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {collection, getDocs,doc,addDoc} from 'firebase/firestore'
import { db } from '../firebase';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import slide1 from '../images/slide1.jpg'
import slide2 from '../images/slide2.jpg'
import slide3 from '../images/slide3.jpg'
import { Header } from './header';

export const ProductList = ({addToCart}) => {

    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    
    const getProduct = (async()=>{
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
    getProduct();

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
      <Header/>

      <Carousel style={{width: '50%'}} showThumbs={false} autoPlay={true} interval={3000} infiniteLoop={true}>
        <div>
          <img src={slide1} alt='slide1' className='slide-image'/>
        </div>
        <div>
          <img src={slide2} alt='slide2' className='slide-image'/>
        </div>
        <div>
          <img src={slide3} alt='slide3' className='slide-image'/>
        </div>
      </Carousel>


            <div className='products'>
              {
                products.map((product) => (
                  <div onClick={() => gotoProduct(product.id)} className='product-card'>
                    <div key={product.id} >
                      <img src={product.productImage} className='product-image' />
                      <p> {product.productName}</p>
                      <p> {product.productPrice}</p>
                      <p className='product-description'>
                        {product.productDescription.length > 4
                          ? `${product.productDescription.substring(0, 30)}...`
                          : product.productDescription}
                      </p>
                      <button onClick={(event) => handleAddToCart(event, product)}>Add to Cart</button>
                    </div>
                  </div>
                ))


              }
            </div>
          
      
    </div>
  )
}