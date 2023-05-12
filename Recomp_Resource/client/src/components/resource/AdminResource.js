import React from "react";
import { Link } from "react-router-dom";
import { Badge, Card, CardTitle, ListGroup, ListGroupItem } from "reactstrap";

const AdminResource = ({ resource }) => {
  resource.numberOfComments = resource.comments.length;
  return (
    <Card>
      <CardTitle>
        <Link to={`../../resource/adminDetails/${resource.id}`}>
          <strong>{resource.title}</strong>
        </Link>
      </CardTitle>
      <ListGroup flush>
        <ListGroupItem>Current Focus: {resource.topic}</ListGroupItem>
        <ListGroupItem>Comments
        <Badge pill>{resource.numberOfComments}</Badge>
           </ListGroupItem>
        <ListGroupItem>
          Number Of Saves
          <Badge pill>{resource.numberOfSaves}</Badge>
        </ListGroupItem>
      </ListGroup>
    </Card>
  );
};
export default AdminResource;
