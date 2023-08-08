import React, { useEffect } from "react";

import { Route, Routes, useNavigate } from "react-router-dom";
const AdminLayout = () => {
  const Navigate = useNavigate();
  useEffect(() => {
    Navigate("/userList");
  }, []);
  return (
    <div>
      <Routes>
        <Route path="/userList" element={<Navigate to="userList" />} />
      </Routes>
    </div>
  );
};

export default AdminLayout;
