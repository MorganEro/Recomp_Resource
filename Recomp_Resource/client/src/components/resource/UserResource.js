import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";

const UserResource= ({resource}) => {

  resource.numberOfComments = resource.comments.length
  
    return (
        <Card >
          <CardBody>
            <p>
            <Link to={`../../resource/userDetails/${resource.id}`}>
            <strong>{resource.title}</strong>
              </Link>
              
            </p>
            <p>Current Focus: {resource.topic}</p>
            <p>Comments: {resource.numberOfComments}</p>
          </CardBody>
        </Card>
      );
    };
export default UserResource;