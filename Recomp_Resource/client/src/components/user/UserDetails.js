import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  Modal,
  ModalBody,
} from "reactstrap";
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
    <>
    <div className="d-flex">

      <Button className="my-2" onClick={handleBackButtonClick}>Back</Button>
    </div>
    <div>

      <Card
        style={{
          width: "50rem",
        }}
      >
        <CardTitle tag="h1">
          <strong>{user.displayName}</strong>
        </CardTitle>
       
        <CardBody className="container">
          <section className="row">
            <section className="col">
              <CardImg src={user.imageAddress} alt="user" />
            </section>
            <section className="col my-3">
              <div><strong>Age</strong>{" "}
 {user.age}</div>
              <div><strong>Current Focus</strong>{" "}
 {user.currentFocus}</div>
              <div><strong>Goal</strong>{" "} {user?.category?.goal}</div>
              <div>
              <strong>Member Since</strong>{" "}{new Date(user.joinDate).toDateString()}
              </div>
              <div><strong>Bio</strong>{" "} {user.bio}</div>
              <div>
              <strong>Active</strong>{" "}
                {user?.deactivated?.toString() === "false"
                  ? "Account Active"
                  : "Account Deactivated"}
              </div>
              <Button 
              title={`Send ${user.displayName} a Message`}
              outline size="sm" 
              onClick={toggle}>
              <i className="fa fa-envelope fa-lg"></i>
            </Button>
            <Modal isOpen={modal}
            toggle={toggle}>
              <ModalBody>
              <SendMessage toggle= {toggle} recipientId={user.id} recipientName ={user.displayName}/>
              </ModalBody>
            </Modal>
            </section>
          </section>
        </CardBody>
      </Card>
    </div>
    </>
  );
};
export default UserDetails;
