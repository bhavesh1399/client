import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/userList");
  }, []);
  return (
    <>
      <div className="row">
        <div className="col-md-2">
          <Sidebar />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
