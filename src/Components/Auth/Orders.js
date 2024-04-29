// Cart.js
import React, { useState, useRef, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doPost, doGet, doDelete } from "../../actions/common";
import { useNavigate } from "react-router-dom";
import { successToast, errorToast, infoToast } from "../../actions/toast";

const Orders = () => {
    const dispatch = useDispatch();
    const [orders, setOrders] = useState([]);

    const getOrders = (inputValue) => {
        dispatch(doGet("orders"))
          .then((response) => {
            setOrders(response.data.data.data);
          })
          .catch((message) => {
            
          });
      };

      const cancelOrder = (id) => {
        dispatch(doPost("cancel_order",{id:id}))
          .then((response) => {
            successToast(response.data.message)
            getOrders();
          })
          .catch((message) => {
            
          });
      };

      useEffect(() => {
        getOrders();
    }, []);
  return (
    <div className="flex-col flex items-center bg-white gap-2 p-10 text-black text-sm">
        <h1 className="text-2xl font-bold">Your orders</h1>
       
            <div class="container mx-auto mt-1">
                <div class="">
                <div class="w-4/4 bg-white px-10 py-10">
                    <div class="flex mt-10 mb-5">
                    <h3 class="font-semibold text-gray-600 text-xs uppercase w-2/5">OrderId</h3>
                    <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Items</h3>
                    <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Total</h3>
                    <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Date</h3>
                    <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Status</h3>
                    <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Action</h3>
                    </div>
                    {orders.map((item) => (
                        <div class="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                        <div class="flex w-2/5">
                            <div class="w-20">
                              #{item.id}
                            </div>
                        </div>
                        
                        <span class="text-center w-1/5 font-semibold text-sm">{item.items.length}</span>
                        <span class="text-center w-1/5 font-semibold text-sm">{item.total}</span>
                        <span class="text-center w-1/5 font-semibold text-sm">{item.date}</span>
                        <span class="text-center w-1/5 font-semibold text-sm">{item.status}</span>
                        <span class="text-center w-1/5 font-semibold text-sm">

                            {
                                item.status == 'Cancelled' ? '' : 
                                <button class="px-11 bg-indigo-600 hover:bg-indigo-200 text-white font-semibold py-2" onClick={() => cancelOrder(item.id)}>
                                Cancel
                                </button>
                            }

                        </span>
                        </div>
                    ))}
                </div>
                </div>
            </div>
        
        </div>
  );
};

export default Orders;
