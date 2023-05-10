import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";

const AdminResource= ({resource}) => {

  resource.numberOfComments = resource.comments.length
    return (
        <Card >
          <CardBody>
            <p>
            <Link to={`../../resource/adminDetails/${resource.id}`}>
            <strong>{resource.title}</strong>
              </Link>
              
            </p>
            <p>Current Focus: {resource.topic}</p>
            <p>Comments: {resource.numberOfComments}</p>
            <p>Number Of Saves: {resource.numberOfSaves}</p>
          </CardBody>
        </Card>
      );
    };
export default AdminResource;