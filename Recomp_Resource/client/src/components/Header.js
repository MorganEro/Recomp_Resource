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
  CardImg,
} from "reactstrap";
import { logout } from "../modules/authManager";
import {ReactComponent as RecompLogo} from '../recompLogo.svg';

export default function Header({ isLoggedIn, thisUser }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      <Navbar fixed="top" color="dark" dark expand="md">
        <NavbarBrand>
      <RecompLogo width="30" height="30" fill="#f0f8ff"/>
        </NavbarBrand>
        <NavbarBrand tag={RRNavLink} to="/">
          RECOMP RESOURCE
        </NavbarBrand>

        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav navbar>
            {isLoggedIn && (
              <>
                {thisUser?.userTypeId === 1 ? (
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
                ) : (
                  <NavItem>
                    <NavLink tag={RRNavLink} to="/resource/userList">
                      Resources
                    </NavLink>
                  </NavItem>
                )}
                <NavItem>
                  <NavLink tag={RRNavLink} to="/user/myProfile">
                    My Profile
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/user/list">
                    Members
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={logout} href="/login">
                    Log out
                  </NavLink>
                </NavItem>

                <NavbarBrand className="welcome">
                  {thisUser?.userTypeId === 1 ? (
                    <div>Welcome, Amin {thisUser?.displayName}</div>
                  ) : (
                    <div>Welcome, {thisUser?.displayName}</div>
                  )}
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
