import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card, CardBody, CardFooter, ListGroup, ListGroupItem } from "reactstrap";
import { DeleteResource, getResourceById } from "../../modules/resourceManager";
import EnterComment from "../comment/EnterComment";




const ResourceDetails = () => {
  const [resource, setResource] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const getResource = () => {
    getResourceById(id).then((resource) => setResource(resource));
  };

  useEffect(() => {
    getResource();
  }, []);

  const DeleteButton = (e) => {
    e.preventDefault();

    DeleteResource(resource.id);
    navigate("../../resource/adminList");
  };

  return (
    <Card>
      <CardBody>
        <p>
          <strong>{resource.title}</strong>
        </p>
        <div>{resource.content}</div>
        <p>Category: {resource.category?.goal}</p>
        <p>Topic {resource.topic}</p>
        <p>Date Added: {new Date(resource.dateAdded).toDateString()}</p>

        <ListGroup>
          {resource?.comments?.map((comment) => (
            <ListGroupItem key={resource?.comment?.id}>{comment.content}</ListGroupItem>
          ))}
        </ListGroup>

        <div>
          <EnterComment resourceId={resource.id} getResource={getResource} />
        </div>
      </CardBody>
      <CardFooter>
        <button>
          <Link to={`../../resource/edit/${resource.id}`}>Edit</Link>
        </button>
        <button onClick={(clickEvent) => DeleteButton(clickEvent)}>
          Delete
        </button>
      </CardFooter>
    </Card>
  );
};
export default ResourceDetails;
