import React, { useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import { logout } from "../modules/authManager";
import { ReactComponent as RecompLogo } from "../recompLogo.svg";
import SendMessage from "./message/SendMessage";

export default function Header({ isLoggedIn, thisUser }) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const AdminId = 1;

  return (
    <div className="relative">
      <div className="container">
        <nav
          className="navbar fixed-top bg-dark navbar-expand-md"
          data-bs-theme="dark"
        >
          <a className="navbar-brand mx-2" href="/">
            <RecompLogo width="30" height="30" fill="#f0f8ff" />
          </a>
          <a className="navbar-brand" href="/">
            RECOMP RESOURCE
          </a>

          <button
            className="navbar-toggler mx-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {isLoggedIn && (
                <>
                  {thisUser?.userTypeId === 1 ? (
                    <>
                      <li className="nav-item">
                        <a className="nav-link" href="/resource/adminList">
                          Resources
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/quote/list">
                          Quotes
                        </a>
                      </li>
                    </>
                  ) : (
                    <li className="nav-item">
                      <a className="nav-link" href="/resource/userList">
                        Resources
                      </a>
                    </li>
                  )}

                  <li className="nav-item">
                    <a className="nav-link" href="/user/list">
                      Members
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/message/list">
                      Messages
                    </a>
                  </li>
                  <li className="navbar-brand ms-md-5">
                    {thisUser?.userTypeId === 1 ? (
                      <span className="navbar-text">
                        Welcome, Admin {thisUser?.displayName}
                      </span>
                    ) : (
                      <span className="navbar-text">
                        Welcome, {thisUser?.displayName}
                      </span>
                    )}
                  </li>
                  <li className="nav-item dropdown">
                    <span
                      className="dropdown-toggle d-flex align-items-center"
                      id="navbarDropdownMenuAvatar"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img
                        src={thisUser?.imageAddress}
                        className="rounded mx-2"
                        height="40"
                        alt="my avatar"
                        loading="lazy"
                      />
                    </span>
                    <ul
                      className="dropdown-menu"
                      aria-label="navbarDropdownMenuAvatar"
                    >
                      <li>
                        <a className="dropdown-item" href="/user/myProfile">
                          My profile
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="/login"
                          onClick={logout}
                        >
                          Log Out
                        </a>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              {!isLoggedIn && (
                <>
                  <li className="nav-item">
                    <a className="nav-link" href="/login">
                      Login
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/register">
                      Register
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
        {isLoggedIn && (
          <>
            {thisUser?.userTypeId === 2 ? (
              <nav className="navbar fixed-bottom justify-content-end mx-2">
                <button
                  title="Message Admin"
                  className="btn btn-sm btn-primary"
                  style={{ width: "40px" }}
                  onClick={toggle}
                >
                  <i className="fa fa-envelope fa-lg"></i>
                </button>
                <Modal isOpen={modal} toggle={toggle}>
                  <ModalBody>
                    <SendMessage
                      toggle={toggle}
                      RecipientId={AdminId}
                      recipientName={"Admin"}
                    />
                  </ModalBody>
                </Modal>
              </nav>
            ) : (
              ""
            )}
          </>
        )}
      </div>
    </div>
  );
}
