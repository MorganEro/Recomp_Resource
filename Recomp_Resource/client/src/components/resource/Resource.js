import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";

const Resource= ({resource}) => {
    return (
        <Card >
          <CardBody>
            <p>
            <Link to={`../../resource/details/${resource.id}`}>
            <strong>{resource.title}</strong>
              </Link>
              
            </p>
            <p>Current Focus: {resource.topic}</p>
            <p>Comments: {resource.numberOfComments}</p>
          </CardBody>
        </Card>
      );
    };
export default Resource;