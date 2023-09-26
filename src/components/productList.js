import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection,getDocs,query,where,orderBy} from 'firebase/firestore';
import { db } from '../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'


export const ProductList = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();

  const getProducts = async () => {
    try {

      const q = query(
        collection(db, 'products'),
        orderBy('productName') 
      );
  
      const querySnapshot = await getDocs(q);
      const productData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productData);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const gotoProduct = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleAddToCart = (event, selectedProduct) => {
    event.stopPropagation();
    addToCart(selectedProduct, 1);
  };




  const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    height: '260px',
    width: '100%'
  }
  const slideImages = [
    {
      url: 'https://cdn.pixabay.com/photo/2013/01/29/18/12/flat-tire-76563_1280.jpg',
      caption: 'Slide 1'
    },
    {
      url: 'https://cdn.pixabay.com/photo/2014/08/22/09/40/mechanics-424130_640.jpg',
      caption: 'Slide 2'
    },
    {
      url: 'https://cdn.pixabay.com/photo/2017/11/27/16/33/harley-davidson-2981672_640.jpg',
      caption: 'Slide 3'
    },
  ];


  return (
    <div className='product-list-container'>

      <div className='filter-container'>

        {/*filter by catergory */}
        <div className="category-filter">
          <select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
            className='select-category'
          >
            <option value="">Shop by Department</option>
            <option value="body">Boby Parts</option>
            <option value="engine">Engine</option>
            <option value="interior">Interior</option>
            <option value="wheel">Wheels</option>

          </select>
        </div>

        {/* search function */}
        <div className="search-container">
          <input
            onChange={(event) => setSearch(event.target.value)}
            type="text"
            placeholder="Search for products"
            className="nav-input"
          />
          <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
        </div>
      </div>

      


      <div>

        <div className="slide-container">
          <Slide>
            {slideImages.map((slideImage, index) => (
              <div key={index} >
                <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
                  <span className='spanStyle'>{slideImage.caption}</span>
                </div>
              </div>
            ))}
          </Slide>
        </div>


        <div className="product-list">


          <div className="products">
            {products
              .filter((item) => {
                // Filter by category and search query
                const matchesCategory =
                  selectedCategory === '' || item.productCategory === selectedCategory;
                const matchesSearch =
                  search === '' ||
                  item.productName.toLowerCase().includes(search.toLowerCase());
                return matchesCategory && matchesSearch;
              })
              .map((product) => (
                <div
                  onClick={() => gotoProduct(product.id)}
                  className="product-card"
                  key={product.id}
                >
                  <img src={product.productImage} className="product-image" alt="Product" />
                  <b> {product.productName}</b>
                  <p className="product-description">
                    {product.productDescription.length > 4
                      ? `${product.productDescription.substring(0, 30)}...`
                      : product.productDescription}
                  </p>

                  <div className="price-container">
                    <p className="product-price">R{product.productPrice}.00</p>
                    <div className="line"></div>
                  </div>

                  <button onClick={(event) => handleAddToCart(event, product)}>
                    <FontAwesomeIcon icon={faCartShopping} /> Add
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
