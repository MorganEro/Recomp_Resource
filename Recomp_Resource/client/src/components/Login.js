import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../modules/authManager";

export default function Login() {
  let navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginSubmit = (e) => {
    e.preventDefault();
    login(email, password)
      .then(() => navigate("/"))
      .catch(() => alert("Login Failed"));
  };

  return (
    <div
      className="container d-flex flex-column align-items-center"
      style={{ width: "70vw" }}
    >
      <div>
        <form
          className="mb-3 row justify-content-center"
          onSubmit={loginSubmit}
        >
          <fieldset className="mb-3 row">
            <label htmlFor="username" className="col-sm-2 col-form-label">
              Email
            </label>
            <div className="col-sm-10">
              <input
                autoFocus
                type="email"
                autoComplete="username"
                className="form-control"
                id="username"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </fieldset>
          <fieldset className="mb-3 row">
            <label htmlFor="password" className="col-sm-2 col-form-label">
              Password
            </label>
            <div className="col-sm-10">
              <input
                autoFocus
                type="password"
                autoComplete="current-password"
                className="form-control"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </fieldset>
          <button
            className="btn btn-secondary"
            style={{ width: "100px" }}
            onClick={loginSubmit}
          >
            Login
          </button>
        </form>
      </div>
      <h2 className="mb-3">---OR---</h2>
    </div>
  );
}
