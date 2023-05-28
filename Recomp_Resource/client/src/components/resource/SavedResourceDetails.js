import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UnSaveResource, getSavedResourceById } from "../../modules/resourceManager";
import { Button, Card, CardBody, CardFooter, CardImg, ListGroup, ListGroupItem } from "reactstrap";
import EnterComment from "../comment/EnterComment";

const SavedResourceDetails = () => {
  const [savedResource, setSavedResource] = useState({});
  const { id } = useParams();
  const navigate = useNavigate()

  const getSavedResource = () => {
    getSavedResourceById(id).then((resource) => setSavedResource(resource));
  };
 
  useEffect(() => {
    getSavedResource();
  }, []);

  const handleBackButtonClick = () => { 
    navigate(-1)
  ;}

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
        <p><strong>Category</strong> {savedResource?.resource?.category?.goal}</p>
        <p><strong>Topic</strong> {savedResource?.resource?.topic}</p>
        <p>
        <strong>Added On</strong>{" "}
          {new Date(savedResource?.resource?.dateAdded).toDateString()}
        </p>

        <ListGroup>
          {savedResource?.resource?.comments.map((comment) => (
            <ListGroupItem key={comment.id}>
                <CardImg
              src={savedResource?.user?.imageAddress}
              style={{ width: "3%" }}
              alt="Avatar"
            />
            {"  "}
            <Link to={`../../user/details/${savedResource.userId}`}>
            <span>{savedResource?.user?.displayName}</span>
            </Link>
            {" "}
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
      <Button className="mx-5" onClick={handleBackButtonClick}>Back</Button>
        <Button className="mx-5" color= "danger" onClick={UnSaveButtonClick}>UnSave</Button>
      </CardFooter>
    </Card>
  );
};
export default SavedResourceDetails;
