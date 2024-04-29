import React, { useState, useRef, useEffect, useContext, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartContext } from '../utils/CartContext';
import { doPost, doGet } from "../actions/common";
const Product = (props) => {
  
  const form = useRef();
  const { cartItems, addToCart } = useContext(CartContext)
  const dispatch = useDispatch();
  const [products, setProducts] = useState(props.products); // Initialize products with props
  const [page, setPage] = useState(1); // Initialize page number
  const [loading, setLoading] = useState(false); // State to track loading state
  const [hasMore, setHasMore] = useState(true); // State to track if there are more products to load

  useEffect(() => {
    setProducts(props.products); // Update products when props change
  }, [props.products]); // Run this effect whenever props.products changes

 // Function to fetch more products when user scrolls to the bottom
 const fetchMoreProducts = () => {
    if (!loading && hasMore) {
      setLoading(true); // Set loading state to true to prevent multiple simultaneous requests
      // Simulate an API call to fetch more products
      // Replace this with your actual API call
      dispatch(doGet(`products?page=${page + 1}`)) // Include page parameter in the API call
      .then((response) => {
          // Update products with new products (e.g., fetched from API)
          const newProducts = response.data.data.data;
          console.log('newProducts', newProducts);
          setProducts(products => [...products, ...newProducts]); // Append new products to existing products
          setPage(prevPage => prevPage + 1); // Increment page number
          setLoading(false); // Set loading state back to false
          // For demonstration purposes, set hasMore to false after a few pages
          // Replace this condition with your actual condition based on API response
          if (newProducts.length === 0) {
            setHasMore(false);
          }
        })
        .catch(error => {
          console.error('Error fetching more products:', error);
          setLoading(false); // Set loading state back to false in case of error
        });
    }
  };

    // Intersection Observer callback function
    const observer = useRef();
    const lastProductRef = useCallback(node => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          fetchMoreProducts(); // Call fetchMoreProducts when last product is in view
        }
      });
      if (node) observer.current.observe(node);
    }, [loading]);

  return (
    <>
      {products.map((item, index) => (
        <div key={index} ref={(index === products.length - 1) ? lastProductRef : {}} class="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
            <img src={item.image} alt="Product" class="h-80 w-72 object-cover rounded-t-xl" />
            <div class="px-4 py-3 w-72">
              <span class="text-gray-400 mr-3 uppercase text-xs">{item.tags}</span>
              <p class="text-lg font-bold text-black truncate block capitalize">{item.title}</p>
              <div class="flex items-center">
                <p class="text-lg font-semibold text-black cursor-auto my-3">${item.price}</p>
                <div class="ml-auto">
                    <a onClick={() => addToCart(item)} class="cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-bag-plus" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                        </svg>
                    </a>
                </div>
              </div>
            </div>
          
        </div>
      ))}
      {loading && <div>Loading...</div>}
    </>
  );
};

export default Product;
