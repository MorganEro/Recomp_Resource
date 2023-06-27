import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardImg,
} from "reactstrap";
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
    <div className="d-flex justify-content-center">

    <Card style={{width:'50vw'}}>
      <CardBody>
        <h2>
          <strong>{user.displayName}</strong>
        </h2>
        <div className="container">
          <div className=" d-flex justify-content-center my-3">
            <CardImg
              src={user.imageAddress}
              style={{ width: "20%" }}
              alt="Avatar"
            />
          </div>
          <div className="d-flex flex-column text-mb-left">
            <p><strong>Full Name</strong>{" "} {user.fullName}</p>
            <p><strong>Email</strong> {user.email}{" "}</p>
            <p><strong>Age</strong> {user.age}{" "}</p>
            <p><strong>Birthday</strong>{" "} {new Date(user.birthday).getFullYear()}</p>
            <p><strong>Weight</strong> {" "}{user.weight} lbs.</p>
            <p><strong>Body Fat Percentage</strong>{" "} {user.bfPercentage}%</p>
            <p><strong>Basal Metabolic Rate</strong>{" "} {user.bmr} kcal</p>
            <p><strong>Current Focus</strong>{" "} {user.currentFocus}</p>
            <p><strong>Goal</strong>{" "} {user?.category?.goal}</p>
            <p><strong>Join Date</strong> {" "}{new Date(user.joinDate).toDateString()}</p>
            <p> <strong>About Me</strong>{" "}{user.bio}</p>
            <p>
            <strong>Active</strong>{" "}
              {user?.deactivated?.toString() === "false"
                ? "Account Active"
                : "Account Deactivated"}
            </p>
          </div>
        </div>
      </CardBody>
      <CardFooter>
        <Button 
          href={`../../user/edit/${user.id}`}
        color="primary">Update
        </Button>
        
      </CardFooter>
    </Card>
    </div>
  );
};
export default MyProfile;
