import React from "react";
import { NavLink } from "react-router-dom";
import { Nav, NavItem, Navbar } from "reactstrap";

const Header = () => {
  return (
    <div>
      {" "}
      <Navbar color="light" light expand="md">
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="/components/">Components</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
};

export default Header;
