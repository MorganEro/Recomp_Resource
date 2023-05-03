import React, { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { logout } from "../modules/authManager";

export default function Header({ isLoggedIn, user}) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand tag={RRNavLink} to="/">
          RECOMP RESOURCE
        </NavbarBrand>

        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>

          <Nav className="mr-auto" navbar>
            {isLoggedIn && (
              <>

              {user?.userTypeId === 1 
              ?  
              <> 
                <NavItem>
                    <NavLink tag={RRNavLink} to="/resource/adminList">
                      Resources
                    </NavLink>
                  </NavItem>
                  <NavItem>
                  <NavLink tag={RRNavLink} to="/quote/list">
                    Quotes
                  </NavLink>
                </NavItem>
              </>
              :
                <NavItem>
                  <NavLink tag={RRNavLink} to="/resource/userList">
                    Resources
                  </NavLink>
                </NavItem>
               }
                <NavItem>
                  <NavLink tag={RRNavLink} to="/user/details/:id">
                    My Profile
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/user/list">
                    Members
                  </NavLink>
                </NavItem>
                <NavItem>
                  <a
                    aria-current="page"
                    className="nav-link"
                    style={{ cursor: "pointer" }}
                    onClick={logout}
                  >
                    Logout
                  </a>
                </NavItem>
                
                <NavbarBrand>
                   {user?.userTypeId === 1 
                   ?  
                   <div>
                      Welcome, Amin {user?.displayName}
                   </div>
                   : 
                   <div>
                      Welcome, {user?.displayName}
                   </div>} 
                </NavbarBrand>
            
              </>
            )}
            {!isLoggedIn && (
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/login">
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/register">
                    Register
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
