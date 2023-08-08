import React from "react";

import { NavItem, NavLink, Nav, Row, Col, Button, Navbar } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "../../App.css";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { loggingOutUserThunkAction } from "../../redux/User/action";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const navigateToHome = () => {
    navigate("/login");
  };
  const logoutHandler = () => {
    toast.success("Logged out successfully.");
    dispatch(loggingOutUserThunkAction(navigateToHome));
  };
  return (
    <>
      <div>
        <div className="sidebar-header">
          <h3>ProsesWeb</h3>
        </div>
        <div
          className="side-menu"
          style={{
            background: "#c5e8ff",
          }}
        >
          <Nav vertical className="list-unstyled pb-">
            {role === "admin" && (
              <NavItem>
                <NavLink tag={Link} to={"/userList"}>
                  Users List
                </NavLink>
              </NavItem>
            )}
            <NavItem>
              <NavLink tag={Link} to={"/subscriptionList"}>
                Subscription List
              </NavLink>
            </NavItem>
          </Nav>
          <div
            style={{
              position: "absolute",
              bottom: "4%",
            }}
          >
            <Col xs="12" className="d-flex justify-content-between px-5">
              <Button color="danger" onClick={logoutHandler}>
                Log out
              </Button>
            </Col>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
