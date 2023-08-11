import { useEffect, useState } from "react";
import Login from "./Pages/Login";
import { Navigate, Route, Routes, redirect } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import UserLayout from "./layouts/UserLayout";
import Registration from "./Pages/Registration";
import PostPage from "./Pages/postList";
function App() {
  const [token, setToken] = useState();

  console.log(token);
  const userToken = localStorage.getItem("token");

  useEffect(() => {
    setToken(userToken);
  }, [userToken]);
  return (
    <>
      <div className="App wrapper">
        <Routes>
          {token ? (
            <Route path="/" element={<Navigate to="/user" />} />
          ) : (
            <Route path="/" element={<Navigate to="/login" />} />
          )}
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<UserLayout />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/postList" element={<PostPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
