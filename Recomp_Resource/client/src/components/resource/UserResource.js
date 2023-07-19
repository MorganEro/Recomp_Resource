import React from "react";
import { Badge, Card, CardBody } from "reactstrap";

const UserResource = ({ resource }) => {
  resource.numberOfComments = resource.comments.length;

  return (
    <Card>
      <CardBody>
        <p>
          <a href={`../../resource/userDetails/${resource.id}`}>
            <strong>{resource.title}</strong>
          </a>
        </p>
        <p>
          <strong>Focus</strong> {resource.topic}
        </p>
        <p>
          <strong>Comments</strong>{" "}
          <Badge pill>{resource.numberOfComments}</Badge>
        </p>
      </CardBody>
    </Card>
  );
};
export default UserResource;
