import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import { getResourceById, saveResource } from "../../modules/resourceManager";
import EnterComment from "../comment/EnterComment";
import { getAllCommentsByResourceId } from "../../modules/commentManager";

const UserResourceDetails = () => {
  const [resource, setResource] = useState({});
  const [comments, setComments] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const savedResource = {
    resourceId: 0,
  };

  const getResource = () => {
    getResourceById(id).then((resource) => setResource(resource));
  };
  const getComments = () => {
    getAllCommentsByResourceId(id).then((comments) => setComments(comments));
  };

  useEffect(() => {
    getResource();
  }, []);
  useEffect(() => {
    getComments();
  }, []);

  const handleSaveButtonClick = () => {
    savedResource.resourceId = resource.id;
    saveResource(savedResource);
    navigate("../../resource/userList");
  };
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h3">
          <strong>{resource.title}</strong>
        </CardTitle>
        <div>
          <iframe
            width="560"
            height="315"
            src={resource.content}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
        <p>Category: {resource.category?.goal}</p>
        <p>Topic {resource.topic}</p>
        <p>Date Added: {new Date(resource.dateAdded).toDateString()}</p>

        <ListGroup>
          {comments.map((comment) => (
            <ListGroupItem key={comment.id}>
                <CardImg
              src={comment?.user?.imageAddress}
              style={{ width: "3%" }}
              alt="Avatar"
            />
            {"  "}
              <span>{comment?.user?.displayName}: </span>
              <span>{comment.content}</span>
            </ListGroupItem>
          ))}
        </ListGroup>

        <div>
          <EnterComment resourceId={resource.id} getResource={getResource} />
        </div>
      </CardBody>

      <CardFooter>
        <Button onClick={handleSaveButtonClick}>Save Resource</Button>
      </CardFooter>
    </Card>
  );
};
export default UserResourceDetails;
