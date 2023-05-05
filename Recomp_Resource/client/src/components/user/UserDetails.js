import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import { getUserById } from "../../modules/userManager";

const UserDetails = () => {
    const [user, setUser] = useState({});
    const {id} = useParams();

    useEffect(() => {
        getUserById(id).then(user => setUser(user));
    }, []);

    return (
        <Card >
          <CardBody>
            <p>
              <strong>{user.displayName}</strong>
            </p>
            <img src={user.imageAddress} alt="user's picture"/>
    
            <p>Age: {user.age}</p>
            <p>Current Focus: {user.currentFocus}</p>
            <p>Goal: {user?.category?.goal}</p>
            <p>Member Since: {new Date(user.joinDate).toDateString()}</p>
            <p>Bio: {user.bio}</p>
            <p>Active: {user?.deactivated?.toString() === "false"? "Account Active" : "Account Deactivated"}</p>
          </CardBody>
        </Card>
      );
    };
export default UserDetails;