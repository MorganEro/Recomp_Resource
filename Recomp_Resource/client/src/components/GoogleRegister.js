import React, { useState } from "react";
import { _saveUser } from "../modules/authManager";

//using response from google login to register user in database
const GoogleRegister = (googleResponse) => {
  // creating user state variable with information from google and user input form
  const [user, setUser] = useState({
    displayName: googleResponse.displayName,
    categoryId: 0,
    imageAddress: googleResponse.photoURL,
    email: googleResponse.email,
  });

  // saving updated user state to database
  const handleSubmitButtonClick = (event) => {
    event.preventDefault();

    _saveUser(user);
  };

  return (
    <div className="card mx-3">
      <h2>To access the correct Resources, please select a Goal</h2>
      <div className="card-body">
        <form>
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
                copy.categoryId = evt.target.value;
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
        </form>
      </div>
      {user.categoryId === 0 ? (
        <button type="button" className="btn btn-secondary mb-3 mx-3" disabled>
          Please Select A Category
        </button>
      ) : (
        <button onClick={handleSubmitButtonClick}>Save and Log In</button>
      )}
    </div>
  );
};
export default GoogleRegister;
