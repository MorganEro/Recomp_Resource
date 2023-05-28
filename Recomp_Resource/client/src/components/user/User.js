import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardImg, CardTitle, Col, Row } from "reactstrap";

const User = ({ user }) => {
  return (
    <Card>
      <CardBody style={{backgroundColor: '#E5E7E9'}}>
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
          <p><strong>Current Focus</strong> {" "}{user.currentFocus}</p>
        <p><strong>Goal</strong>{" "} {user?.category?.goal}</p>
        <p><strong>Join Date</strong>{" "} {user.joinDate}</p>
        <p>
        <strong>Active</strong>{" "}
          {user?.deactivated?.toString() === "false"
            ? "Account Active"
            : "Account Deactivated"}
        </p></Col>
        </Row>
        <strong></strong>

      </CardBody>
    </Card>
  );
};
export default User;
