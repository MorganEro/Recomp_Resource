import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardImg, CardTitle, Col, Row } from "reactstrap";

const User = ({ user }) => {
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h3">
          <Link to={`../../user/details/${user.id}`}>
            <strong>{user.displayName}</strong>
          </Link>
        </CardTitle>
        <Row>
          <Col>
            <CardImg
              src={user.imageAddress}
              style={{ width: "15em" }}
              alt="Avatar"
            />
          </Col>
          <Col>
          <p>Current Focus: {user.currentFocus}</p>
        <p>Goal: {user?.category?.goal}</p>
        <p>Join Date: {user.joinDate}</p>
        <p>
          Active:{" "}
          {user?.deactivated?.toString() === "false"
            ? "Account Active"
            : "Account Deactivated"}
        </p></Col>
        </Row>

      </CardBody>
    </Card>
  );
};
export default User;
