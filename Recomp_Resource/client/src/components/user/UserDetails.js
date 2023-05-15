import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
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
  const navigate = useNavigate();

  useEffect(() => {
    getUserById(id).then((user) => setUser(user));
  }, [id]);

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  return (
    <>
    <div className="d-flex ">

      <Button className="my-2" onClick={handleBackButtonClick}>Back</Button>
    </div>
    <div>

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
              <CardImg src={user.imageAddress} alt="user" />
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
    </div>
    </>
  );
};
export default UserDetails;
