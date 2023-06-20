import { Link } from "react-router-dom";
import { Button, Modal, ModalBody } from "reactstrap";
import MessageDetails from "./MessageDetails";
import { useState } from "react";

const Message = ({ message }) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <div className="messageList d-flex justify-content-between">
      <div>
        <span>{message.opened === false ? "NEW" : "Opened"}</span>{" "}
        <strong>From: </strong>{" "}
        <Link
          title="Sender's Details"
          to={`../../user/details/${message?.sender?.id}`}
        >
          <strong>{message?.sender?.displayName}</strong>
        </Link>{" "}
      </div>
      <div>
        <strong>Subject: </strong> <span>{message.subject}</span>
      </div>
      <div>
        <strong>Sent: </strong>
        <span>{message.dayCreated}</span>
      </div>
      <Button outline size="sm" onClick={toggle}>
        {" "}
        View
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalBody>
          <MessageDetails messageId={message.id} toggle={toggle} />
        </ModalBody>
      </Modal>
    </div>
  );
};
export default Message;
