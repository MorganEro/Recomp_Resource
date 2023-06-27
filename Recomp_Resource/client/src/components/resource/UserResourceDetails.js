import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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

  const handleBackButtonClick = () => {
    navigate(-1);
  };

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
        <p>
          <strong>Category</strong> {resource.category?.goal}
        </p>
        <p>
          <strong
          title="List of topics are keywords that allow you to search for videos similar to your current focus"
          >Topic</strong> {resource.topic}
        </p>
        <p>
          <strong>Added On</strong>{" "}
          {new Date(resource.dateAdded).toDateString()}
        </p>
        <div className="comment_section">
          <ListGroup>
            {comments.map((comment) => (
              <ListGroupItem key={comment.id}>
                <CardImg
                  src={comment?.user?.imageAddress}
                  style={{ width: "2%" }}
                  alt="Avatar"
                />
                {"  "}
                <Link to={`../../user/details/${comment?.userId}`}>
                  <span>{comment?.user?.displayName} </span>
                </Link>
                <span>{comment.content}</span>
              </ListGroupItem>
            ))}
          </ListGroup>

        </div>
          <div>
            <EnterComment resourceId={resource.id} getComments={getComments} />
          </div>
      </CardBody>

      <CardFooter>
        <Button className="mx-5" onClick={handleBackButtonClick}>
          Back
        </Button>
        {resource.saved === true ? (
          <Button disabled>SAVED</Button>
        ) : (
          <Button
            color="success"
            className="mx-5"
            onClick={handleSaveButtonClick}
          >
            Save Resource
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
export default UserResourceDetails;
