import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/register", { username, email, password })
      .then((result) => {
        console.log(result);
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="signup-container">
      <div className="bg-white p-3 rounded w-25 signup-inner-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="mb-1">
              <strong>Username</strong>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              autoComplete="off"
              name="email"
              className="form-control rounded-1"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
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
              placeholder="Enter Password"
              name="password"
              className="form-control rounded-1"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-none w-100 btn-1"
          >
            Register
          </button>
        </form>
        <div>
          <p className="text-center text-secondary mb-1 mt-3">Already Have an Account</p>
        </div>
        <div>
          <Link to="/login" className="btn btn-none w-100 btn-2">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
