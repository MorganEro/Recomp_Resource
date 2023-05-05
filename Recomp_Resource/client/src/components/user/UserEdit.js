import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UpdateUser, getUserById } from "../../modules/userManager";
import { Card, CardBody, CardFooter, CardImg } from "reactstrap";

const UserEdit = () => {
  const [user, setUser] = useState({});
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

  const handleCancelButtonClick = (event) => {
    navigate("../../user/myProfile");
  };

  return (
    <Card className="container">
      <h2>User Edit</h2>

      <CardImg src={user.imageAddress} alt="profile's picture" />
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
            <div className="input-group w-80">
              Weight:
              <input
                required
                autoFocus
                type="number"
                className="form-control"
                value={user.weight}
                onChange={(evt) => {
                  const copy = { ...user };
                  copy.weight = evt.target.value;
                  setUser(copy);
                }}
              />
              <div>
                <span className="input-group-text"> lbs </span>
              </div>
            </div>
          </fieldset>
          <fieldset>
            <div>
              <label htmlFor="bFPercentage">Body Fat Percentage: </label>
              <input
                required
                autoFocus
                type="number"
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
                type="number"
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
              <label htmlFor="category">Goal: </label>
              <select
                required
                autoFocus
                className=""
                value={user.categoryId}
                onChange={(evt) => {
                  const copy = { ...user };
                  copy.categoryId = parseInt(evt.target.value);
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
              <label htmlFor="imageAddress">Image Address: </label>
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
              <label for="bio">About Me: </label>
              <textarea
                required
                autoFocus
                type="textarea"
                className="form-control"
                rows={3}
                value={user.bio}
                onChange={(evt) => {
                  const copy = { ...user };
                  copy.bio = evt.target.value;
                  setUser(copy);
                }}
              />
            </div>
          </fieldset>
        </form>
      </CardBody>
      <CardFooter>
        {user.content === "" ? (
          <button outline className="">
            Complete Changes
          </button>
        ) : (
          <button onClick={handleSubmitButtonClick}>Submit Changes</button>
        )}

        <button onClick={handleCancelButtonClick}>Cancel</button>
      </CardFooter>
    </Card>
  );
};

export default UserEdit;
