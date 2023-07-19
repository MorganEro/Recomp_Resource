import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Badge, Modal, ModalBody, ModalFooter } from "reactstrap";
import { DeleteResource, getResourceById } from "../../modules/resourceManager";
import EnterComment from "../comment/EnterComment";
import {
  DeleteComment,
  getAllCommentsByResourceId,
} from "../../modules/commentManager";
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
      getComments();
    });
  };
  const handleCancelButtonClick = () => {
    deleteToggle();
  };
  const handleBackButtonClick = () => {
    navigate("../../resource/adminList");
  };

  return (
    <div className="container d-flex justify-content-center">
      <div className="card shadow-sm mb-3" style={{ width: "80vw" }}>
        {/*--------------header-------------*/}
        <div className="card-body">
          <p>
            <strong>{resource.title}</strong>
          </p>
          {/*-------------YouTube-------------*/}
          <div className="mb-3">
            <iframe
              width="90%"
              height="315"
              src={resource.content}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
          <table class="table table-borderless table-sm">
            <thead>
              <tr>
                <th scope="col">Category</th>
                <th scope="col">Topic</th>
                <th scope="col">Added On</th>
                <th scope="col">Saves</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{resource.category?.goal}</td>
                <td title="List of topics are keywords that allow you to search for videos similar to your current focus">
                  {resource.topic}
                </td>
                <td>{new Date(resource.dateAdded).toDateString()}</td>
                <td>
                  <Badge pill>{resource.numberOfSaves}</Badge>
                </td>
              </tr>
            </tbody>
          </table>
          {/*--------------Comment List-------------*/}
          <ul className="list-group mb-3">
            {comments.map((comment) => (
              <li className="list-group-item" key={comment.id}>
                <div class="row align-items-center">
                  <div class="col">
                    <img
                      className="rounded"
                      src={comment?.user?.imageAddress}
                      alt="avatar"
                      style={{ width: "45px" }}
                    />
                  </div>
                  <div class="col">
                    <a href={`../../user/details/${comment?.userId}`}>
                      <span>{comment?.user?.displayName} </span>
                    </a>
                  </div>
                  <div className="col-7 flex-grow-1 text-start">
                    {comment.content}
                  </div>
                  <div class="col">
                    <button
                      outline
                      className="btn btn-outline-danger"
                      onClick={handleDeleteCommentButtonClick}
                    >
                      <i className="fa fa-trash fa-sm"></i>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {/*--------------Add Comment Input-------------*/}
          <div>
            <EnterComment resourceId={resource.id} getComments={getComments} />
          </div>
        </div>

        {/*--------------Buttons and Modals-------------*/}
        <div className="d-flex justify-content-evenly mb-3">
          <button className="btn btn-secondary" onClick={handleBackButtonClick}>
            Back
          </button>

          <button className="btn btn-primary " onClick={toggle}>
            Edit
            <Modal isOpen={modal} toggle={toggle}>
              <ModalBody>
                <ResourceEdit toggle={toggle} />
              </ModalBody>
            </Modal>
          </button>

          <button className="btn btn-danger " onClick={deleteToggle}>
            Delete
          </button>
          <Modal isOpen={deleteModal} toggle={deleteToggle}>
            <ModalBody>
              You are about to delete a valuable resource. Are you sure?
            </ModalBody>
            <ModalFooter>
              <button className="btn mx-5" onClick={handleCancelButtonClick}>
                Cancel
              </button>
              <button className="btn btn-danger mx-5" onClick={DeleteButton}>
                Delete
              </button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    </div>
  );
};
export default AdminResourceDetails;
