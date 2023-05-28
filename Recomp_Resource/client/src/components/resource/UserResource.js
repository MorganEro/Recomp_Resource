import React from "react";
import { Link } from "react-router-dom";
import { Badge, Card, CardBody } from "reactstrap";

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
            <p><strong>Focus</strong> {resource.topic}</p>
            <p><strong>Comments</strong> <Badge pill>{resource.numberOfComments}</Badge></p>
          </CardBody>
        </Card>
      );
    };
export default UserResource;