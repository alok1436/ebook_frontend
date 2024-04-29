import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doPost, doGet, doDelete } from "../actions/common";
import Product from './Product';
import { successToast, errorToast, infoToast } from "../actions/toast";

const Home = (props) => {
  
  const form = useRef();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  const getProducts = (inputValue) => {
    dispatch(doGet("products"))
      .then((response) => {
       // console.log('response',response.data.data.data);
        setProducts(response.data.data.data);
        //successToast("Loaded successfully")
      })
      .catch((message) => {
        
      });
  };

  useEffect(() => {
    getProducts();
}, []);
  // ...

    return (
        <div>
            <div class="text-center p-10">
                <h1 class="font-bold text-4xl mb-4">Online Book Store</h1>
                {/* <h1 class="text-3xl">Tailwind CSS</h1> */}
            </div>

            <section class="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">

            <Product products={products} />

            </section>

            {/* <div class="text-center py-20 px-10">
                <h2 class="font-bold text-2xl md:text-4xl mb-4">Thanks to <a href="https://unsplash.com/@nixcreative" class="underline font-black">Tyler Nix</a> for those AMAZING product images!</h2>
            </div> */}
        </div>
    )
}

export default Home;
