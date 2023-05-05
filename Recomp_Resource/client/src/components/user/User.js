import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";

const User = ({user}) => {
    return (
        <Card >
          <CardBody>
            <p>
            <Link to={`../../user/details/${user.id}`}>
            <strong>{user.displayName}</strong>
              </Link>
              
            </p>
            <p>Current Focus: {user.currentFocus}</p>
            <p>Goal: {user?.category?.goal}</p>
            <p>Join Date: {user.joinDate}</p>
            <p>Active: {user?.deactivated?.toString() === "false"? "Account Active" : "Account Deactivated"}</p>
          </CardBody>
        </Card>
      );
    };
export default User;