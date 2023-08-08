import React, { useEffect } from "react";
import { Routes, useNavigate } from "react-router-dom";

const UserLayout = () => {
  const Navigate = useNavigate();
  useEffect(() => {
    Navigate("/subscriptionList");
  }, []);
  return (
    <div>
      <Routes>
        {/* <Route path="/userList" element={<Navigate to="userList" />} /> */}
      </Routes>
    </div>
  );
};
export default UserLayout;
