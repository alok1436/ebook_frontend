import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Link } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { register } from "../../actions/auth";
import { isEmail } from "validator";
import { useNavigate } from "react-router-dom";
import CheckButton from "react-validation/build/button";
import { successToast, errorToast, infoToast } from "../../actions/toast";
import { TabTitle } from "../../utils/GeneralFunction";

import "../../GlobalVariables";
const API_URL = global.apiUrl;
const HEADER = global.header;
const required = (value) => {
  if (!value) {
    return (
      <div classNameName="alert error" role="alert">
        This field is required!
      </div>
    );
  }
};
const email = (value) => {
  if (!isEmail(value)) {
    return (
      <div classNameName="alert error" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const Signup = (props) => {
  TabTitle("Signup");

  const form = useRef();
  const checkBtn = useRef();
  const  [inputValue, setInputValue] =  useState('');
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setInputValue({
      ...inputValue,
      [event.target.name]: event.target.value
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
        console.log(inputValue);
        dispatch(register(inputValue))
        .then((res) => {
            successToast(res.data.message);
          navigate("/login");
        })
        .catch((error) => {
          errorToast(error);
            setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };
  // if (isLoggedIn) {
  //   return <Navigate to="/dashboard" />;
  // }
  return (
    <div className="login-page">
        <div className="login-box">
        <div className="card">
            <div className="card-body login-card-body">
            <p className="login-box-msg">Sign up</p>
            {message && (
            <div className="form-group">
                <div className="alert alert-danger" role="alert">
                {message}
                </div>
            </div>
            )}
            <Form onSubmit={handleRegister} ref={form}>
            <div className="input-group mb-3">
                <Input
                      type="text"
                      name="name"
                      placeholder="Enter name"
                      className="form-control"
                      onChange={handleChange}
                      validations={[required]}
                />
                    <div className="input-group-append">
                        <div className="input-group-text">
                        <span className="fas fa-user"></span>
                        </div>
                    </div>
                </div>
                <div className="input-group mb-3">
                <Input
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      className="form-control"
                      onChange={handleChange}
                      validations={[required, email]}
                />
                    <div className="input-group-append">
                        <div className="input-group-text">
                        <span className="fas fa-envelope"></span>
                        </div>
                    </div>
                </div>
                <div className="input-group mb-3">
                <Input
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="form-control"
                      onChange={handleChange}
                      validations={[required]}
                    />
                <div className="input-group-append">
                    <div className="input-group-text">
                    <span className="fas fa-lock"></span>
                    </div>
                </div>
                </div>
                <div className="row">
                <div className="col-4">
                    <button
                      className="inline-flex w-full items-center justify-center rounded bg-indigo-600 py-2 px-1 text-base tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-teal-500 sm:text-lg"
                      disabled={loading}
                    >
                      <span>Sign up</span>
                      {loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                      )}
                    </button>
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </div>
                </div>
            </Form>
            {/* <p className="mb-1">
                <a href="forgot-password.html">I forgot my password</a>
            </p>
            <p className="mb-0">
                <a href="register.html" className="text-center">Register a new membership</a>
            </p> */}
            </div>
        </div>
        </div>
    </div>
  );
};

export default Signup;
