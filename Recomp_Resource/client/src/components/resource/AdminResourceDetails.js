import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardFooter,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import { DeleteResource, getResourceById } from "../../modules/resourceManager";
import EnterComment from "../comment/EnterComment";
import { getAllCommentsByResourceId } from "../../modules/commentManager";

const AdminResourceDetails = () => {
  const [resource, setResource] = useState({});
  const [comments, setComments] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const code = "";

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

  const DeleteButton = () => {
    DeleteResource(resource.id);
    navigate("../../resource/adminList");
  };

  return (
    <Card>
      <CardBody>
        <p>
          <strong>{resource.title}</strong>
        </p>
        <div>
          <iframe width="560" height="315" src={resource.content} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
         
        </div>

        <p>Category: {resource.category?.goal}</p>
        <p>Topic {resource.topic}</p>
        <p>Date Added: {new Date(resource.dateAdded).toDateString()}</p>
        <p>Number Of Saves: {resource.numberOfSaves}</p>

        <ListGroup>
          {comments.map((comment) => (
            <ListGroupItem key={comment.id}>
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
        <button>
          <Link to={`../../resource/edit/${resource.id}`}>Edit</Link>
        </button>
        <button onClick={DeleteButton}>Delete</button>
      </CardFooter>
    </Card>
  );
};
export default AdminResourceDetails;
