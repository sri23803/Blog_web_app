import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
      axios.post("http://localhost:3001/login", { email, password })
      .then((result) => {
        console.log(result);
        if (result.data === "success") {
          window.location.href = "/home"
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="login-container">
      <div className="bg-white p-3 rounded w-25 login-inner-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="mb-1">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form-control rounded-1"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="mb-1">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              autoComplete="off"
              name="password"
              className="form-control rounded-1"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-none w-100 btn-1 mt-2"
          >
            Login
          </button>
        </form>
        <p className="text-center text-secondary mb-1 mt-3">Don't Have an Account</p>
        <div>
          <Link
            to="/register"
            className="btn btn-none w-100 btn-2 text-decoration-none">
              Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
