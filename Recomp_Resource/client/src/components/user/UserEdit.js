import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UpdateUser, getUserById } from "../../modules/userManager";

const UserEdit = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    displayName: "",
    birthday: "",
    height: "",
    weight: "",
    bfPercentage: "",
    bmr: "",
    categoryId: 0,
    imageAddress: "",
    currentFocus: "",
    bio: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getUserById(id).then(setUser);
  }, [id]);

  const handleSubmitButtonClick = (event) => {
    event.preventDefault();

    UpdateUser(user.id, user);
    navigate("../../user/myProfile");
  };

  const handleCancelButtonClick = () => {
    navigate("../../user/myProfile");
  };

  return (
    <div className="container d-flex justify-content-center mb-5">
      <div className="card" style={{ width: "80vw" }}>
        <h2 className="card-title">
          <strong>User Edit</strong>
        </h2>

        <img
          className="card-image-top"
          style={{
            width: "100%",
          }}
          src={user.imageAddress}
          alt="profile"
        />
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
                Weight
              </span>
              <input
                required
                autoFocus
                className="form-control"
                aria-label="Last Name Field"
                type="text"
                value={user.weight}
                onChange={(evt) => {
                  const copy = { ...user };
                  copy.weight = evt.target.value;
                  setUser(copy);
                }}
              />
            </div>
            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                Height
              </span>
              <input
                required
                autoFocus
                className="form-control"
                aria-label="Height Field"
                type="text"
                value={user.height}
                onChange={(evt) => {
                  const copy = { ...user };
                  copy.height = evt.target.value;
                  setUser(copy);
                }}
              />
            </div>
            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                Body Fat Percentage
              </span>
              <input
                autoFocus
                className="form-control"
                aria-label="Body Fat Field"
                type="text"
                value={user.bfPercentage}
                onChange={(evt) => {
                  const copy = { ...user };
                  copy.bfPercentage = evt.target.value;
                  setUser(copy);
                }}
              />
            </div>
            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                Basal Metabolic Rate
              </span>
              <input
                autoFocus
                className="form-control"
                aria-label="Basal Metabolic Rate Field"
                type="text"
                value={user.bmr}
                onChange={(evt) => {
                  const copy = { ...user };
                  copy.bmr = evt.target.value;
                  setUser(copy);
                }}
              />
              <span
                className="input-group-text"
                id="inputGroup-sizing-sm"
                title="click for Basal Metabolic Rate calculator"
              >
                <a href={"https://tdeecalculator.net/"} target="blank">
                  <i className="fa fa-question-circle text-muted"></i>
                </a>
              </span>
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
                title="current focus to reach your goal. (example: weights, running, sleep)"
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
            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                Image URL
              </span>
              <input
                required
                autoFocus
                className="form-control"
                type="text"
                aria-label="profile picture url Field"
                value={user.imageAddress}
                onChange={(evt) => {
                  const copy = { ...user };
                  copy.imageAddress = evt.target.value;
                  setUser(copy);
                }}
              />
            </div>
            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                About Me
              </span>
              <textarea
                rows={3}
                autoFocus
                className="form-control"
                aria-label="about me Text area"
                value={user.bio}
                onChange={(evt) => {
                  const copy = { ...user };
                  copy.bio = evt.target.value;
                  setUser(copy);
                }}
              />
            </div>
          </form>
        </div>
        <div className="card-footer d-flex justify-content-around">
          {user.currentFocus === "" ||
          user.firstName === "" ||
          user.lastName === "" ||
          user.displayName === "" ||
          user.categoryId === "Choose..." ? (
            <span type="button" className="btn btn-secondary" disabled>
              Complete Changes
            </span>
          ) : (
            <span
              type="button"
              className="btn btn-success"
              color="success"
              onClick={handleSubmitButtonClick}
            >
              Submit Changes
            </span>
          )}

          <span
            type="button"
            className=" btn btn-danger"
            color="secondary"
            onClick={handleCancelButtonClick}
          >
            Cancel
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserEdit;
