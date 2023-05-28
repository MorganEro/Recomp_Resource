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
        <ListGroupItem><strong>Focus</strong> {" "} {resource.topic}</ListGroupItem>
        <ListGroupItem><strong>Comments</strong> {" "}
        <Badge pill>{resource.numberOfComments}</Badge>
           </ListGroupItem>
        <ListGroupItem>
          <strong>Saves</strong>{" "}
          <Badge pill>{resource.numberOfSaves}</Badge>
        </ListGroupItem>
      </ListGroup>
    </Card>
  );
};
export default AdminResource;
