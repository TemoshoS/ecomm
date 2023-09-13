import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faCartShopping } from '@fortawesome/free-solid-svg-icons';

export const ProductList = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(''); // Add state for selected category
  const navigate = useNavigate();

  const getProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
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

  return (
    <div className="product-list">
      <div className="search-container">
        <input
          onChange={(event) => setSearch(event.target.value)}
          type="text"
          placeholder="Search for products"
          className="nav-input"
        />
        <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
      </div>

      {/*filter by catergory */}
      <div className="category-filter">
        <select
          value={selectedCategory}
          onChange={(event) => setSelectedCategory(event.target.value)}
        >
          <option value="">All Categories</option>
          <option value="body">Boby Parts</option>
          <option value="engine">Engine</option>
          <option value="interior">Interior</option>
          <option value="wheel">Wheels</option>
         
        </select>
      </div>

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

              <p>R {product.productPrice}</p>
              <button onClick={(event) => handleAddToCart(event, product)}>
                <FontAwesomeIcon icon={faCartShopping} /> Add
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};
