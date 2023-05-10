import React, { useState } from "react";
import { Card, CardImg, CardBody, CardFooter } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { register } from "../modules/authManager";

export default function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    displayName: "",
    weight: "",
    height: "",
    bfPercentage: "",
    bmr: "",
    birthday: "",
    currentFocus: "",
    categoryId: 0,
    imageAddress: "",
    bio: "",
    email: "",
    password:"",
    confirmPassword: "",
})


  const handleSubmitButtonClick = (event) => {

    event.preventDefault();
    if (user.password && user.password !== user.confirmPassword) {
      alert("Passwords don't match");
    } else {
      register(user, user.password).then(() => navigate("/"));
    }
  };

  return (
    <Card className="container">
      <h2>Create your account</h2>

      <CardImg src={user.imageAddress} alt="profile" width="50%" />
      <CardBody>
        <form>
          <fieldset>
            <div>
              <label htmlFor="firstName">First Name: </label>
              <input
                required
                autoFocus
                type="text"
                className=" "
                value={user.firstName}
                onChange={(evt) => {
                  const copy = { ...user };
                  copy.firstName = evt.target.value;
                  setUser(copy);
                }}
              />
            </div>
          </fieldset>
          <fieldset>
            <div>
              <label htmlFor="lastName">Last Name: </label>
              <input
                required
                autoFocus
                type="text"
                className=" "
                value={user.lastName}
                onChange={(evt) => {
                  const copy = { ...user };
                  copy.lastName = evt.target.value;
                  setUser(copy);
                }}
              />
            </div>
          </fieldset>
          <fieldset>
            <div>
              <label htmlFor="displayName">DisplayName: </label>
              <input
                required
                autoFocus
                type="text"
                className=" "
                value={user.displayName}
                onChange={(evt) => {
                  const copy = { ...user };
                  copy.displayName = evt.target.value;
                  setUser(copy);
                }}
              />
            </div>
          </fieldset>
          <fieldset>
            <div>
              <label htmlFor="weight">Weight: </label>
              <input
                required
                autoFocus
                type="text"
                className=" "
                value={user.weight}
                onChange={(evt) => {
                  const copy = { ...user };
                  copy.weight = evt.target.value;
                  setUser(copy);
                }}
              />
            </div>
          </fieldset>
          <fieldset>
            <div>
              <label htmlFor="height">Height: </label>
              <input
                required
                autoFocus
                type="text"
                className=" "
                value={user.height}
                onChange={(evt) => {
                  const copy = { ...user };
                  copy.height = evt.target.value;
                  setUser(copy);
                }}
              />
            </div>
          </fieldset>
          <fieldset>
            <div>
              <label htmlFor="bfPercentage">bfPercentage: </label>
              <input
                required
                autoFocus
                type="text"
                className=" "
                value={user.bfPercentage}
                onChange={(evt) => {
                  const copy = { ...user };
                  copy.bfPercentage = evt.target.value;
                  setUser(copy);
                }}
              />
            </div>
          </fieldset>
          <fieldset>
            <div>
              <label htmlFor="bmr">Basal Metabolic Rate: </label>
              <input
                required
                autoFocus
                type="text"
                className=" "
                value={user.bmr}
                onChange={(evt) => {
                  const copy = { ...user };
                  copy.bmr = evt.target.value;
                  setUser(copy);
                }}
              />
            </div>
          </fieldset>
          <fieldset>
            <div>
              <label htmlFor="birthday">Birthday: </label>
              <input
                required
                autoFocus
                type="date"
                className=" "
                value={user.birthday?.split("T")[0]}
                onChange={(evt) => {
                  const copy = { ...user };
                  copy.birthday = evt.target.value;
                  setUser(copy);
                }}
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label htmlFor="currentFocus">Current Focus: </label>
              <input
                required
                autoFocus
                type="text"
                className="form-control"
                value={user.currentFocus}
                onChange={(evt) => {
                  const copy = { ...user };
                  copy.currentFocus = evt.target.value;
                  setUser(copy);
                }}
              />
            </div>
          </fieldset>
          <fieldset>
            <div>
              <label htmlFor="category">Goal: </label>
              <select
                required
                autoFocus
                className=""
                value={user.categoryId}
                onChange={(evt) => {
                  const copy = { ...user };
                  copy.categoryId = evt.target.value;
                  setUser(copy);
                }}
              >
                <option id="0" value="0">
                  --Choose a Category--
                </option>
                <option id="1" value="1">
                  Fat Loss
                </option>
                <option id="2" value="2">
                  Weight Gain
                </option>
              </select>
            </div>
          </fieldset>
          <fieldset>
            <div>
              <label htmlFor="imageAddress">Image URL: </label>
              <input
                required
                autoFocus
                type="text"
                className=" "
                value={user.imageAddress}
                onChange={(evt) => {
                  const copy = { ...user };
                  copy.imageAddress = evt.target.value;
                  setUser(copy);
                }}
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label htmlFor="bio">About Me: </label>
              <input
                required
                autoFocus
                type="text"
                className="form-control"
                value={user.bio}
                onChange={(evt) => {
                  const copy = { ...user };
                  copy.bio = evt.target.value;
                  setUser(copy);
                }}
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label htmlFor="email">Email: </label>
              <input
                required
                autoFocus
                type="email"
                className="form-control"
                value={user.email}
                onChange={(evt) => {
                  const copy = { ...user };
                  copy.email = evt.target.value;
                  setUser(copy);
                }}
              />
            </div>
          </fieldset>
          
          <fieldset>
            <div className="form-group">
              <label htmlFor="password">Password: </label>
              <input
                required
                autoFocus
                type="password"
                className="form-control"
                value={user.password}
                onChange={(evt) => {
                  const copy = { ...user };
                  copy.password = evt.target.value;
                  setUser(copy);
                }}
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label htmlFor="confirmPassword">confirm Password: </label>
              <input
                required
                autoFocus
                type="password"
                className="form-control"
                value={user.confirmPassword}
                onChange={(evt) => {
                  const copy = { ...user };
                  copy.confirmPassword = evt.target.value;
                  setUser(copy);
                }}
              />
            </div>
          </fieldset>
        </form>
      </CardBody>
      <CardFooter>
        {user.firstName === "" || user.lastName === "" || user.displayName === "" || user.birthday === "" || user.currentFocus === "" || user.imageAddress=== "" || user.password === "" ? (
          <button className="">
            Complete Changes
          </button>
        ) : (
          <button onClick={handleSubmitButtonClick}>Submit Changes</button>
        )}
      </CardFooter>
    </Card>
  );
}
