import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Badge,
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
import { DeleteComment, getAllCommentsByResourceId } from "../../modules/commentManager";
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
      navigate("../../resource/adminList");
    });
  };
  const handleDeleteCommentButtonClick = () => {
    DeleteComment(id).then(() => {
     getComments()
    });
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

        <p>
          <strong>Category</strong> {resource.category?.goal}
        </p>
        <p>
          <strong>Topics </strong> {resource.topic}
        </p>
        <p>
          <strong>Added On</strong>{" "}
          {new Date(resource.dateAdded).toDateString()}
        </p>
        <p>
          <strong>Saves</strong> <Badge pill>{resource.numberOfSaves}</Badge>
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
                <Button outline size="sm" color="secondary" onClick={handleDeleteCommentButtonClick}>
            <i className="fa fa-trash fa-lg"></i>
          </Button>
              </ListGroupItem>
            ))}
          </ListGroup>
        </div>

        <div>
          <EnterComment resourceId={resource.id} getComments={getComments} />
        </div>
      </CardBody>
      {/*--------------Modals-------------*/}
      <CardFooter justified="true">
        <Button
          color="secondary"
          size="sm"
          className="mx-5"
          onClick={handleBackButtonClick}
        >
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
        <Button
          color="danger"
          size="sm"
          className="mx-5"
          onClick={deleteToggle}
        >
          Delete
        </Button>
        <Modal isOpen={deleteModal} toggle={deleteToggle}>
          <ModalBody>
            You are about to delete a valuable resource. Are you sure?
          </ModalBody>
          <ModalFooter>
            <Button
              size="sm"
              className="mx-5"
              onClick={handleCancelButtonClick}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              className="mx-5"
              color="danger"
              onClick={DeleteButton}
            >
              Delete
            </Button>
          </ModalFooter>
        </Modal>
      </CardFooter>
    </Card>
  );
};
export default AdminResourceDetails;
