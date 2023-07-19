import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Modal, ModalBody } from "reactstrap";
import { getUserById } from "../../modules/userManager";
import SendMessage from "../message/SendMessage";

const UserDetails = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  useEffect(() => {
    getUserById(id).then((user) => setUser(user));
  }, [id]);

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  return (
    <div className="container d-flex flex-column align-items-center">
      {/*--------------Back Button-------------*/}
      <button
        title="Previous page"
        className="btn btn-secondary mb-2 align-self-start"
        onClick={handleBackButtonClick}
      >
        <i className="fa fa-arrow-circle-left"></i>
      </button>

      {/*--------------Card-------------*/}
      <div
        className="card d-flex justify-content-start mb-5"
        style={{ width: "20rem" }}
      >
        {/*--------------Image-------------*/}
        <img className="card-img mb-3" src={user.imageAddress} alt="user" />

        {/*--------------User Info-------------*/}
        <h1 className="card-title">
          <strong>{user.displayName}</strong>
        </h1>

        <div>
          <strong>Age</strong> {user.age}
        </div>
        <div>
          <strong>Current Focus</strong> {user.currentFocus}
        </div>
        <div>
          <strong>Goal</strong> {user?.category?.goal}
        </div>
        <div>
          <strong>Member Since</strong> {new Date(user.joinDate).toDateString()}
        </div>
        <div>
          <strong>Bio</strong> {user.bio}
        </div>
        <div>
          <strong>Active</strong>{" "}
          {user?.deactivated?.toString() === "false"
            ? "Account Active"
            : "Account Deactivated"}
        </div>
        {/*--------------Email Button and Modal-------------*/}
        <div>
          <button
            title={`Send ${user.displayName} a Message`}
            className="btn btn-outline-secondary m-3"
            style={{ width: "50px" }}
            onClick={toggle}
          >
            <i className="fa fa-envelope fa-lg"></i>
          </button>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalBody>
              <SendMessage
                toggle={toggle}
                recipientId={user.id}
                recipientName={user.displayName}
              />
            </ModalBody>
          </Modal>
        </div>
      </div>
    </div>
  );
};
export default UserDetails;
