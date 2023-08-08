// src/Login.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/User/action";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);
  const navigateToHome = () => {
    navigate(selectedRole === "admin" ? "/admin" : "/user");
  };

  const handleLogin = () => {
    dispatch(login(email, password, selectedRole, navigateToHome));
  };
  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };
  return (
    <div
      className="container mt-5"
      style={{
        width: "300px",
      }}
    >
      <h2 className="mb-5"> Please sign in</h2>
      {error && <div className="alert alert-danger">{error}</div>}
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
      <div>
        <div>
          <input
            type="radio"
            value="admin"
            checked={selectedRole === "admin"}
            onChange={handleRoleChange}
          />
          <span className="font-weight-bold">Admin</span> &nbsp;&nbsp;
          <input
            type="radio"
            value="user"
            checked={selectedRole === "user"}
            onChange={handleRoleChange}
          />
          <span>User</span>
        </div>
      </div>
      <h6 className="mt-2">
        Create a new user ?{" "}
        <span>
          {" "}
          <Link to="/register">Register</Link>
        </span>
      </h6>
      <button className="btn btn-primary mt-3 " onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default Login;
