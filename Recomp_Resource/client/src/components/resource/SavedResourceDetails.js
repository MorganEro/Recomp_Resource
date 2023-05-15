import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UnSaveResource, getSavedResourceById } from "../../modules/resourceManager";
import { Button, Card, CardBody, CardFooter, ListGroup, ListGroupItem } from "reactstrap";
import EnterComment from "../comment/EnterComment";

const SavedResourceDetails = () => {
  const [savedResource, setSavedResource] = useState({});

  const { id } = useParams();

  const getSavedResource = () => {
    getSavedResourceById(id).then((resource) => setSavedResource(resource));
  };
 
  useEffect(() => {
    getSavedResource();
  }, []);

  const UnSaveButtonClick = (e) => {
    UnSaveResource(savedResource.id).then(() => {
      getSavedResource();
    });
  };

  return (
    <Card>
      <CardBody>
        <p>
          <strong>{savedResource?.resource?.title}</strong>
        </p>
        <div>
          <iframe
            width="560"
            height="315"
            src={savedResource?.resource?.content}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
        <p>Category: {savedResource?.resource?.category?.goal}</p>
        <p>Topic {savedResource?.resource?.topic}</p>
        <p>
          Date Added:{" "}
          {new Date(savedResource?.resource?.dateAdded).toDateString()}
        </p>

        <ListGroup>
          {savedResource?.resource?.comments.map((comment) => (
            <ListGroupItem key={comment.id}>
              <span>{comment?.user?.displayName}: </span>
              <span>{comment.content}</span>
            </ListGroupItem>
          ))}
        </ListGroup>

        <div>
          <EnterComment
            resourceId={savedResource?.resource?.id}
            getResource={getSavedResource}
          />
        </div>
      </CardBody>
      <CardFooter>
        <Button color= "danger" onClick={UnSaveButtonClick}>UnSave</Button>
      </CardFooter>
    </Card>
  );
};
export default SavedResourceDetails;
