import { useEffect, useState } from "react";
import Login from "./Pages/Login";
import { Navigate, Route, Routes, redirect } from "react-router-dom";
import "./App.css";
import Dashboard from "./Pages/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import UserPage from "./Pages/UserList";
import PostPage from "./Pages/subscriptionList";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import Registration from "./Pages/Registration";
import SubscriptionPage from "./Pages/subscriptionList";
function App() {
  const [token, setToken] = useState();
  const [role, setRole] = useState();

  console.log(token);
  const tkn = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  useEffect(() => {
    setToken(tkn);
    setRole(userRole);
  }, [tkn, userRole]);
  return (
    <>
      <div className="App wrapper">
        <Routes>
          {token ? (
            <Route
              path="/"
              element={<Navigate to={role === "admin" ? "/admin" : "/user"} />}
            />
          ) : (
            <Route path="/" element={<Navigate to="/login" />} />
          )}
          <Route path="/login" element={<Login />} />
          {role === "admin" ? (
            <Route path="/admin" element={<AdminLayout />} />
          ) : (
            <Route path="/user" element={<UserLayout />} />
          )}
          <Route
            path="/"
            element={<Navigate to={role === "admin" ? "/admin" : "/user"} />}
          />
          <Route path="/userList" element={<UserPage />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/subscriptionList" element={<SubscriptionPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
