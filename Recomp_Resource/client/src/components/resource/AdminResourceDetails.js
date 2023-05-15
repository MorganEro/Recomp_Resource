import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardImg,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { DeleteResource, getResourceById } from "../../modules/resourceManager";
import EnterComment from "../comment/EnterComment";
import { getAllCommentsByResourceId } from "../../modules/commentManager";
import ResourceEdit from "./ResourceEdit";

const AdminResourceDetails = () => {
  const [resource, setResource] = useState({});
  const [comments, setComments] = useState([]);
  const { id } = useParams();
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const toggle = () => setModal(!modal);
  const deleteToggle = () => setDeleteModal(!deleteModal);
  const navigate = useNavigate();

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
    DeleteResource(id).then(() => {
      navigate("../../resource/adminList")
    })
    
  };
  const handleCancelButtonClick = () => {
      deleteToggle();
  };
  const handleBackButtonClick = () => {
      navigate("../../resource/adminList");
  };

  return (
    <Card>
      <CardBody>
        <p>
          <strong>{resource.title}</strong>
        </p>
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
        <p>Topic: {resource.topic}</p>
        <p>Date Added: {new Date(resource.dateAdded).toDateString()}</p>
        <p>Saves: {resource.numberOfSaves}</p>

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
          <EnterComment resourceIdA={resource.id} getResourceA={getResource} />
        </div>
      </CardBody>
      {/*--------------Modals-------------*/}
      <CardFooter justified="true">
      <Button color="secondary" size="sm" className="mx-5" onClick={handleBackButtonClick}>
          Back
        </Button>
        <Button outline color="primary" className="mx-5" onClick={toggle}>
          Edit
          <Modal isOpen={modal} toggle={toggle}>
            <ModalBody>
              <ResourceEdit toggle={toggle} />
            </ModalBody>
          </Modal>
        </Button>
        <Button color="danger" size="sm" className="mx-5" onClick={deleteToggle}>
          Delete
        </Button>
        <Modal isOpen={deleteModal} toggle={deleteToggle}>
          <ModalBody>
            You are about to delete a valuable resource. Are you sure?
          </ModalBody>
          <ModalFooter>
            <Button size="sm" className= "mx-5" onClick={handleCancelButtonClick}>Cancel</Button>
            <Button size="sm" className="mx-5" color="danger" onClick={DeleteButton}>
              Delete
            </Button>
          </ModalFooter>
        </Modal>
      </CardFooter>
    </Card>
  );
};
export default AdminResourceDetails;
