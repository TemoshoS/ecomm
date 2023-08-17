import React,{useState, useEffect} from 'react';
import { Header } from './header';
import { useNavigate } from 'react-router-dom';
import {collection, getDocs} from 'firebase/firestore'
import { db } from '../firebase';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import slide1 from '../images/slide1.jpg'
import slide2 from '../images/slide2.jpg'
import slide3 from '../images/slide3.jpg'

export const ProductList = () => {

    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const gotoProduct = (productId) =>{
        navigate(`/product/${productId}`);
    }

    const addToCart = (event)=>{
      event.stopPropagation();
    }

    useEffect(()=>{
        getProduct();

    },[]);

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


    })
  return (
    <div className='product-list'>
      <Header/>
     
      <div>
        <Carousel showThumbs={false} autoPlay={true} interval={3000} infiniteLoop={true}>
          <div>
            <img src={slide1} alt='slide1' className='slide-image' />
          </div>
          <div>
            <img src={slide2} alt='slide2' className='slide-image' />
          </div>
          <div>
            <img src={slide3} alt='slide3' className='slide-image' />
          </div>
        </Carousel>
      </div>


            <div className='products'>
              {
                products.map((product) => (
                  <div onClick={() => gotoProduct(product.id)} className='product-card'>
                    <div key={product.id} >
                      <img src={product.productImage} className='product-image' />
                      <p><b> {product.productName}</b></p>
                      <p> {product.productDescription}</p>
                      <p> R {product.productPrice}</p>
                      <button onClick={(event) => addToCart(event)}>Add to Cart</button>
                    </div>
                  </div>
                ))


              }
            </div>
          
      
    </div>
  )
}