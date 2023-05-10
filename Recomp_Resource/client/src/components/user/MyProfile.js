import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardFooter, CardImg } from "reactstrap";
import { ThisUser } from "../../modules/userManager";

const MyProfile = () => {
  const [user, setUser] = useState({});

  const getUser = () => {
    ThisUser().then((user) => setUser(user));
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Card
      style={{
        width: "50rem",
      }}
    >
      <CardBody>
        <div className="container">
          <div className="row">
            <div className="col">
              <p>
                <strong>{user.displayName}</strong>
                <CardImg src={user.imageAddress} alt="user's picture" />
              </p>
            </div>
            <div className="col">
              <p>Full Name: {user.fullName}</p>
              <p>Email: {user.email}</p>
              <p>Age: {user.age}</p>
              <p>Birthday: {new Date(user.birthday).getFullYear()}</p>
              <p>Weight: {user.weight} lbs.</p>
              <p>Body Fat Percentage: {user.bfPercentage}%</p>
              <p>Basal Metabolic Rate: {user.bmr} kcal</p>
              <p>Current Focus: {user.currentFocus}</p>
              <p>Gall: {user?.category?.goal}</p>
              <p>Join Date: {new Date(user.joinDate).toDateString()}</p>
              <p> About Me: {user.bio}</p>
              <p>
                Active:{" "}
                {user?.deactivated?.toString() === "false"
                  ? "Account Active"
                  : "Account Deactivated"}
              </p>
            </div>
          </div>
        </div>
      </CardBody>
      <CardFooter>
        <button>
          <Link to={`../../user/edit/${user.id}`}>Update</Link>
        </button>
      </CardFooter>
    </Card>
  );
};
export default MyProfile;
