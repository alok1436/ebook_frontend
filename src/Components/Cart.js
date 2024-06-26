// Cart.js
import React, { useState, useRef, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartContext } from '../utils/CartContext';
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } = useContext(CartContext)
 
    const navigate = useNavigate();
    
  return (
    <div className="flex-col flex items-center bg-white gap-2 p-10 text-black text-sm">
        <h1 className="text-2xl font-bold">Cart</h1>
        {cartItems.length > 0 ? 
            <div class="container mx-auto mt-1">
                <div class="flex shadow-md my-10">
                <div class="w-3/4 bg-white px-10 py-10">
                    <div class="flex justify-between border-b pb-8">
                    <h1 class="font-semibold text-2xl">Shopping Cart</h1>
                    <h2 class="font-semibold text-2xl">({cartItems.length}) Items</h2>
                    </div>
                    <div class="flex mt-10 mb-5">
                    <h3 class="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
                    <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Quantity</h3>
                    <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Price</h3>
                    <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Total</h3>
                    </div>
                    {cartItems.map((item) => (
                        <div class="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                        <div class="flex w-2/5">
                            <div class="w-20">
                                <img class="h-24"  src={item.image} alt={item.title} />
                            </div>
                            <div class="flex flex-col justify-between ml-4 flex-grow">
                                <span class="font-bold text-sm">{item.title}</span>
                                <span class="text-red-500 text-xs">{item.tags}</span>
                                <a href="#" class="font-semibold hover:text-red-500 text-gray-500 text-xs" onClick={() => { removeFromCart( ) }}>Remove</a>
                            </div>
                        </div>
                        <div class="flex justify-center w-1/5">
                            <svg onClick={() => { removeFromCart(item) }}  class="curser-pointer fill-current text-gray-600 w-3"  viewBox="0 0 448 512"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
                            </svg>

                            <input class="mx-2 border text-center w-8" type="text" value={item.quantity} />

                            <svg onClick={() => { addToCart(item) }} class="curser-pointer fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                            <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
                            </svg>
                        </div>
                        <span class="text-center w-1/5 font-semibold text-sm">${item.quantity*item.price}</span>
                        <span class="text-center w-1/5 font-semibold text-sm">${item.quantity*item.price}</span>
                        </div>
                    ))}

                    {cartItems.length == 0 ? 

                        <div class="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                            You cart is empty
                        </div>
                        :
                        <></>
                    }

                    <div class="flex">
                        <a href="/" class="flex font-semibold text-indigo-600 text-sm mt-10">
                        <svg class="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"/></svg>
                        Continue Shopping
                        </a>

                        {cartItems.length > 0 ? 
                        <button onClick={() => { clearCart() }} class="ml-5 flex font-semibold text-indigo-600 text-sm mt-10">
                            Clear cart
                        </button>
                        :
                        <></>
                        }
                    </div>
                    
                </div>

                <div id="summary" class="w-1/4 px-8 py-10">
                    <h1 class="font-semibold text-2xl border-b pb-8">Order Summary</h1>
                    <div class="flex justify-between mt-10 mb-5">
                    <span class="font-semibold text-sm uppercase">Items {cartItems.length}</span>
                    <span class="font-semibold text-sm">${getCartTotal()}</span>
                    </div>
                    <div class="border-t mt-8">
                    <div class="flex font-semibold justify-between py-6 text-sm uppercase">
                        <span>Total cost</span>
                        <span>${getCartTotal()}</span>
                    </div>
                        <button onClick={() => navigate("/checkout")} class="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">Checkout</button>
                    </div>
                </div>
                </div>
            </div>
        : 
            <div>
               <div class="flex justify-between border-b pb-8">
                    <h1 class="font-semibold text-2xl">Your cart is empty</h1>
                </div>
                <a href="/" class="flex font-semibold text-indigo-600 text-sm mt-10">
                <svg class="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"/></svg>
                Continue Shopping
                </a>
            </div>
        }
        </div>
  );
};

export default Cart;
