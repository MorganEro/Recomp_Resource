import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Badge, Modal, ModalBody, ModalFooter } from "reactstrap";
import { DeleteResource, getResourceById } from "../../modules/resourceManager";
import {} from "../../modules/commentManager";
import ResourceEdit from "./ResourceEdit";
import CommentList from "../comment/CommentList";

const AdminResourceDetails = () => {
  const [resource, setResource] = useState({});
  const { id } = useParams();
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const toggle = () => setModal(!modal);
  const deleteToggle = () => setDeleteModal(!deleteModal);
  const navigate = useNavigate();

  const getResource = () => {
    getResourceById(id).then((resource) => setResource(resource));
  };

  useEffect(() => {
    getResource();
  }, []);

  const DeleteButton = () => {
    DeleteResource(id).then(() => {
      navigate("../../resource/adminList");
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
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
          {/*-------------Table and Headers-------------*/}
          <table className="table table-borderless table-sm">
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
          <CommentList resourceId={id} />

          {/*--------------Add Comment Input-------------*/}
          {/* <div>
            <EnterComment resourceId={id} />
          </div> */}
        </div>

        {/*--------------Buttons and Modals-------------*/}
        <div className="d-flex justify-content-evenly mb-3">
          <button className="btn btn-secondary" onClick={handleBackButtonClick}>
            Back
          </button>

          <button
            className="btn btn-primary"
            title="Edit Resource"
            onClick={toggle}
          >
            Edit
            <Modal isOpen={modal} toggle={toggle}>
              <ModalBody>
                <ResourceEdit toggle={toggle} />
              </ModalBody>
            </Modal>
          </button>

          <button
            className="btn btn-danger"
            title="Delete Resource"
            onClick={deleteToggle}
          >
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
