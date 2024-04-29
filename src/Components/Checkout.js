// Cart.js
import React, { useState, useRef, useEffect, useContext } from "react";
import { CartContext } from '../utils/CartContext';
import { successToast, errorToast, infoToast } from "../actions/toast";
import { useDispatch, useSelector } from "react-redux";
import { doPost, doGet, doDelete } from "../actions/common";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } = useContext(CartContext)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [loading, setLoading] = useState(false);
    const placeOrder = (e) => {
        setLoading(true);

        if(cartItems.length  == 0 ){
            errorToast('Your cart is empty');
            setLoading(false);
            navigate('/');
            return
        }

        const data = {
            items: cartItems
        }
        dispatch(doPost("create_order", data))
        .then((response) => {
            clearCart();
            successToast("Order placed.")
            setLoading(false);
            navigate('/thank-you');
        })
        .catch((error) => {
            errorToast(error.message)
            setLoading(false);
            if(error.message == 'Unauthenticated.'){
                navigate('/login');
            }
        });
      };
  return (
    <div>
        <div class="relative mx-auto w-full bg-white">
        <div class="grid min-h-screen grid-cols-10">
            <div class="col-span-full py-6 px-4 sm:py-12 lg:col-span-6 lg:py-24">
            <div class="mx-auto w-full max-w-lg">
                <h1 class="relative text-2xl font-medium text-gray-700 sm:text-3xl">Secure Checkout<span class="mt-2 block h-1 w-10 bg-indigo-600 sm:w-20"></span></h1>
                <p class="mt-10 text-center text-sm font-semibold text-gray-500">By placing this order you agree to the <a href="#" class="whitespace-nowrap text-indigo-400 underline hover:text-indigo-600">Terms and Conditions</a></p>
                <button onClick={() => placeOrder()} type="submit" class="mt-4 inline-flex w-full items-center justify-center rounded bg-indigo-600 py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-teal-500 sm:text-lg">Place Order
                {loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                      )}
                </button>
            </div>
            </div>
            <div class="relative col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24">
            <h2 class="sr-only">Order summary</h2>
            <div>
                <img src="https://images.unsplash.com/photo-1581318694548-0fb6e47fe59b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" class="absolute inset-0 h-full w-full object-cover" />
                <div class="absolute inset-0 h-full w-full bg-gradient-to-t from-indigo-800 to-indigo-400 opacity-85"></div>
            </div>
            <div class="relative">
                <ul class="space-y-5">
                {cartItems.map((item) => (
                <li class="flex justify-between">
                    <div class="inline-flex">
                    <img  src={item.image} alt={item.title}  class="max-h-16" />
                    <div class="ml-3">
                        <p class="text-base font-semibold text-white">{item.title}</p>
                        <p class="text-sm font-medium text-white text-opacity-80">{item.tags}</p>
                    </div>
                    </div>
                    <p class="text-sm font-semibold text-white">${item.price*item.quantity}</p>
                </li>
                ))}
                </ul>
                <div class="my-5 h-0.5 w-full bg-white bg-opacity-30"></div>
                <div class="space-y-2">
                <p class="flex justify-between text-lg font-bold text-white"><span>Total price:</span><span>${getCartTotal()}</span></p>
                </div>
            </div>
            </div>
        </div>
        </div>

    </div>
    
  );
};

export default Checkout;
