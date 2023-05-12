import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardImg,
  CardTitle,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import { getUserById } from "../../modules/userManager";

const UserDetails = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getUserById(id).then((user) => setUser(user));
  }, [id]);

  return (
    <Card
      style={{
        width: "50rem",
      }}
    >
      <CardTitle tag="h1">
        <strong>{user.displayName}</strong>
      </CardTitle>
      <CardBody className="container">
        <ListGroup className="row">
          <ListGroup className="col">
            <CardImg 
            src={user.imageAddress} alt="user" />
          </ListGroup>
          <ListGroup className="col">
            <ListGroupItem>Age: {user.age}</ListGroupItem>
            <ListGroupItem>Current Focus: {user.currentFocus}</ListGroupItem>
            <ListGroupItem>Goal: {user?.category?.goal}</ListGroupItem>
            <ListGroupItem>
              Member Since: {new Date(user.joinDate).toDateString()}
            </ListGroupItem>
            <ListGroupItem>Bio: {user.bio}</ListGroupItem>
            <ListGroupItem>
              Active:{" "}
              {user?.deactivated?.toString() === "false"
                ? "Account Active"
                : "Account Deactivated"}
            </ListGroupItem>
          </ListGroup>
        </ListGroup>
      </CardBody>
    </Card>
  );
};
export default UserDetails;
