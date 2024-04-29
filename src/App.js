import logo from './logo.svg';
import './App.css';
import Header from './Shared/Header';
import Menu from './Shared/Menu';
import Dashboard from './Shared/Dashboard';
import Cart from '../src/Components/Cart';
import Checkout from '../src/Components/Checkout';
import Customer from '../src/Components/Customer';
import Home from '../src/Components/Home';
import Thankyou from '../src/Components/Thankyou';
import Footer from './Shared/Footer';
import Orders from './Components/Auth/Orders';
import Signup from './Components/Auth/Signup';
import Login from './Components/Auth/Login';
import { useDispatch, useSelector } from "react-redux";
import { CartProvider } from './utils/CartContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <CartProvider>
      <div className="wrapper">
        <Header/>
        {/* {isLoggedIn && (<Header/>)}
        {isLoggedIn && (<Menu/>)} */}
        <Router>
          <Routes>
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/thank-you" element={<Thankyou />} />
            <Route
              path="/orders"
              element={!isLoggedIn ? <Navigate to="/login" /> : <Orders />}
            />
            {/* <Route
              path="/checkout"
              element={!isLoggedIn ? <Navigate to="/login" /> : <Checkout />}
            /> */}
          </Routes>
        </Router>
        {isLoggedIn && (<Footer/>)}
        <ToastContainer />
      </div>
    </CartProvider>
  );
}

export default App;
