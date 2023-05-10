import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import { getUserById } from "../../modules/userManager";

const UserDetails = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getUserById(id).then((user) => setUser(user));
  }, [id]);

  return (
    <Card>
      <CardBody>
        <div className="container">
          <div className="row">
            <div className="col">
              <p>
                <strong>{user.displayName}</strong>
              </p>
              <img src={user.imageAddress} alt="user" />
            </div>
            <div className="col">
              <p>Age: {user.age}</p>
              <p>Current Focus: {user.currentFocus}</p>
              <p>Goal: {user?.category?.goal}</p>
              <p>Member Since: {new Date(user.joinDate).toDateString()}</p>
              <p>Bio: {user.bio}</p>
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
    </Card>
  );
};
export default UserDetails;
