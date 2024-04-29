import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Link } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { login } from "../../actions/auth";
import { isEmail } from "validator";
import { useNavigate } from "react-router-dom";
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

const Login = (props) => {
  TabTitle("Login");

  const form = useRef();
  const checkBtn = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      dispatch(login(username, password))
        .then(() => {
          navigate("/checkout");
        })
        .catch((error) => {
           console.log(error);
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
            <p className="login-box-msg">Sign in</p>
            {message && (
            <div className="form-group">
                <div className="alert alert-danger" role="alert">
                {message}
                </div>
            </div>
            )}
            <Form onSubmit={handleLogin} ref={form}>
                <div className="input-group mb-3">
                <Input
                      type="email"
                      placeholder="Enter email"
                      className="form-control"
                      onChange={onChangeUsername}
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
                      value={password}
                      placeholder="Password"
                      className="form-control"
                      onChange={onChangePassword}
                      validations={[required]}
                    />
                <div className="input-group-append">
                    <div className="input-group-text">
                    <span className="fas fa-lock"></span>
                    </div>
                </div>
                </div>
                <div className="row">
                <div className="col-8">
                    <div className="icheck-primary">
                    <label style={{ marginLeft: "12px" }}>
                      <input
                        type="checkbox"
                        id="remember-me"
                        name="rememberme"
                        defaultValue="Rememberme"
                        className="mt-3"
                      />
                      Remember me
                    </label>
                    </div>
                </div>
                <div className="col-4">
                    <button
                      className="inline-flex w-full items-center justify-center rounded bg-indigo-600 py-2 px-1 text-base tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-teal-500 sm:text-lg"
                      disabled={loading}
                    >
                      <span>Sign In</span>
                      {loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                      )}
                    </button>
                </div>
                </div>
                <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
            {/* <p className="mb-1">
                <a href="forgot-password.html">I forgot my password</a>
            </p> */}
            <p className="mb-0">
                <a href="/signup" className="mt-4 inline-flex w-full items-center justify-center rounded bg-indigo-600 py-2.5 px-1 text-base  text-white text-opacity-80 outline-none ring-offset-1 transition hover:text-opacity-100 focus:ring-2 focus:ring-teal-500 sm:text-lg">Register a new membership</a>
            </p>
            </div>
        </div>
        </div>
    </div>
  );
};

export default Login;
