import React, { Component, useState } from 'react'
import { Navigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AuthService from "../services/auth.service";

const Header = (props) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const logout = () => {
    AuthService.logout();
  }
 
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  
    return (
      <div>
      <nav class="bg-white py-2 md:py-4">
                    <div class="container px-4 mx-auto md:flex md:items-center">

                    <div class="flex justify-between items-center">
                        <a href="/" class="font-bold text-xl text-indigo-600">Book Store</a>
                        <button class="border border-solid border-gray-600 px-3 py-1 rounded text-gray-600 opacity-50 hover:opacity-75 md:hidden" id="navbar-toggle">
                        <i class="fas fa-bars"></i>
                        </button>
                    </div>
                    <div class="hidden md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0" id="navbar-collapse">
                        <a href="/" class="p-2 lg:px-4 md:mx-2 text-white rounded bg-indigo-600">Home</a>
                        {/* <a href="#" class="p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300">About</a>
                        <a href="#" class="p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300">Features</a>
                        <a href="#" class="p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300">Pricing</a>
                        <a href="#" class="p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300">Contact</a> */}
                        <a href="/cart" class="p-2 lg:px-4 md:mx-2 text-indigo-600 text-center border border-transparent rounded hover:bg-indigo-100 hover:text-indigo-700 transition-colors duration-300">Cart</a>
                        
                        {isLoggedIn ? 
                        <div className="user-profile">
                          {/* Profile Icon */}
                                <div className="profile-icon" onClick={toggleDropdown}>
                                  <span className="fas fa-user"></span>
                                </div>

                                {/* Dropdown Menu */}
                                {isDropdownOpen && (
                                  <div className="dropdown-menu">
                                    <ul>
                                      <li><a href="/orders">Your orders</a></li>
                                      <li><a href='/' onClick={() => logout()}>Logout</a></li>
                                    </ul>
                                  </div>
                                )}
                              </div>
                           : <a href="/login" class="p-2 lg:px-4 md:mx-2 text-indigo-600 text-center border border-transparent rounded hover:bg-indigo-100 hover:text-indigo-700 transition-colors duration-300">Login</a>}
                  
                    </div>
                    </div>
                </nav>
                
      </div>
    )
  }
  export default Header;

