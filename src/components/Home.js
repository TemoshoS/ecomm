import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import slide1 from '../images/slide1.jpg'
import slide2 from '../images/slide2.jpg'
import slide3 from '../images/slide3.jpg'
import { Link } from 'react-router-dom';

const Home = ()=> {
  return (
    <div>
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
      <Link to='/productlist' ><button className='continue-shopping'>Continue Shopping...</button></Link>
    </div>

    
  )
}

export default Home