// src/Login.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../redux/User/action";
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);
  const navigateToLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    dispatch(signup(email, password, name, navigateToLogin));
  };

  return (
    <div
      className="container mt-5"
      style={{
        width: "300px",
      }}
    >
      <h2 className="mb-5"> Register New User </h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="mb-3">
        <input
          placeholder="Enter your Name"
          type="text"
          className="form-control"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          placeholder="Enter your email"
          type="text"
          className="form-control"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <input
          placeholder="Enter your Password"
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <h6 className="mt-2">
        Go to{" "}
        <span>
          {" "}
          <Link to="/login">Login Page</Link>
        </span>
      </h6>
      <button className="btn btn-primary mt-3 " onClick={handleRegister}>
        Create User
      </button>
    </div>
  );
};

export default Registration;
