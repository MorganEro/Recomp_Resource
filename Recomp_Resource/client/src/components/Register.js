import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../modules/authManager";

export default function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    displayName: "",
    birthday: "",
    currentFocus: "",
    categoryId: 0,
    email: "",
  });

  const [password, setPassword] = useState({
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitButtonClick = async (event) => {
    event.preventDefault();
    if (password.password && password.password !== password.confirmPassword) {
      alert("Passwords don't match");
    } else {
      setIsLoading(true);
      try {
        await register(user, password.password);
        await login(user.email, password.password);
        navigate("/");
      } catch (error) {
        setIsLoading(false);
        alert("An error occurred during registration. Please try again.");
        console.error(error);
      }
    }
  };

  return (
    <div className="card mx-3">
      <h2>Create your account</h2>
      <div className="card-body">
        <form>
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              First Name
            </span>
            <input
              required
              autoFocus
              value={user.firstName}
              type="text"
              className="form-control"
              aria-label="First Name Field"
              onChange={(evt) => {
                const copy = { ...user };
                copy.firstName = evt.target.value;
                setUser(copy);
              }}
            />
          </div>
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              Last Name
            </span>
            <input
              required
              autoFocus
              value={user.lastName}
              type="text"
              className="form-control"
              aria-label="Last Name Field"
              onChange={(evt) => {
                const copy = { ...user };
                copy.lastName = evt.target.value;
                setUser(copy);
              }}
            />
          </div>
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              DisplayName
            </span>
            <input
              required
              autoFocus
              className="form-control"
              aria-label="Display Name Field"
              type="text"
              value={user.displayName}
              onChange={(evt) => {
                const copy = { ...user };
                copy.displayName = evt.target.value;
                setUser(copy);
              }}
            />
          </div>

          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              Birthday
            </span>
            <input
              required
              autoFocus
              className="form-control"
              type="date"
              aria-label="Birthday Field"
              value={user.birthday?.split("T")[0]}
              onChange={(evt) => {
                const copy = { ...user };
                copy.birthday = evt.target.value;
                setUser(copy);
              }}
            />
          </div>
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              Current Focus
            </span>
            <input
              required
              placeholder="ex: running, nutrition, lifting..."
              autoFocus
              className="form-control"
              type="text"
              aria-label="Current Focus Field"
              value={user.currentFocus}
              onChange={(evt) => {
                const copy = { ...user };
                copy.currentFocus = evt.target.value;
                setUser(copy);
              }}
            />
          </div>
          <div className="input-group input-group-sm mb-3">
            <label className="input-group-text" htmlFor="inputGroupSelect">
              Goal
            </label>
            <select
              required
              autoFocus
              className="form-select"
              id="inputGroupSelect"
              value={user.categoryId}
              onChange={(evt) => {
                const copy = { ...user };
                copy.categoryId = parseInt(evt.target.value);
                setUser(copy);
              }}
            >
              <option defaultValue={0}>Choose...</option>
              <option id="1" value="1">
                Fat Loss
              </option>
              <option id="2" value="2">
                Weight Gain
              </option>
            </select>
          </div>

          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              Email
            </span>
            <input
              required
              autoFocus
              className="form-control"
              aria-label="email Field"
              type="email"
              value={user.email}
              onChange={(evt) => {
                const copy = { ...user };
                copy.email = evt.target.value;
                setUser(copy);
              }}
            />
          </div>
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              Password
            </span>
            <input
              required
              autoFocus
              className="form-control"
              aria-label="password field"
              type="password"
              value={password.password}
              onChange={(evt) => {
                const copy = { ...password };
                copy.password = evt.target.value;
                setPassword(copy);
              }}
            />
          </div>
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              Confirm Password
            </span>
            <input
              required
              autoFocus
              className="form-control"
              aria-label="password field"
              type="password"
              value={password.confirmPassword}
              onChange={(evt) => {
                const copy = { ...password };
                copy.confirmPassword = evt.target.value;
                setPassword(copy);
              }}
            />
          </div>
        </form>
      </div>
      {isLoading ? (
        <button type="button" className="btn btn-secondary mb-3 mx-3" disabled>
          Loading...
        </button>
      ) : user.firstName === "" ||
        user.lastName === "" ||
        user.displayName === "" ||
        user.categoryId === 0 ||
        user.birthday === "" ||
        user.currentFocus === "" ||
        password.confirmPassword === "" ||
        password.password === "" ? (
        <button type="button" className="btn btn-secondary mb-3 mx-3" disabled>
          Complete All Fields
        </button>
      ) : (
        <button
          className="btn btn-secondary mb-3 mx-3"
          onClick={handleSubmitButtonClick}
        >
          Submit Changes
        </button>
      )}
    </div>
  );
}
