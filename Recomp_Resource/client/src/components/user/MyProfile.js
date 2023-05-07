import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, CardBody, CardFooter, CardImg } from "reactstrap";
import { getUserById } from "../../modules/userManager";

const MyProfile = ({ thisUser }) => {

  const [user, setUser] = useState({});

  const getUser = () => {
    getUserById(thisUser?.id).then(user => setUser(user));
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Card 
    style={{
      width: '50rem',
     
    }}>
      <CardBody>
        <p>
          <strong>{user.displayName}</strong>
          <CardImg src={user.imageAddress} alt="user's picture" />
        </p>

        <p>Full Name: {user.fullName}</p>
        <p>Email: {user.email}</p>
        <p>Age: {user.age}</p>
        <p>Birthday: {new Date(user.birthday).getFullYear()}</p>
        <p>Weight: {user.weight} lbs.</p>
        <p>Body Fat Percentage: {user.bfPercentage}%</p>
        <p>Basal Metabolic Rate: {user.bMR} kcal</p>
        <p>Current Focus: {user.CurrentFocus}</p>
        <p>Gall: {user?.category?.goal}</p>
        <p>Join Date: {new Date(user.joinDate).toDateString()}</p>
        <p> About Me: {user.bio}</p>
        <p>Active: {user?.deactivated?.toString() === "false"? "Account Active" : "Account Deactivated"}</p>
      </CardBody>
      <CardFooter>
        <button>
          <Link to={`../../users/edit/${user.id}`}>Update</Link>
        </button>
      </CardFooter>
    </Card>
  );
};
export default MyProfile;
