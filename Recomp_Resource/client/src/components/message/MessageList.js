import { useEffect, useState } from "react";
import {
  getAllMessagesOfUser,
  getAllMessagesReceivedByUser,
  getAllMessagesSentByUser,
} from "../../modules/messageManager";
import { Button, Modal, ModalBody } from "reactstrap";
import CreateMessage from "./CreateMessage";
import Message from "./Message";

const MessageList = () => {
  const [messages, setMessages] = useState([]);
  const [sentMessages, setSentMessages] = useState([]);
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const getAllMessages = () => {
    getAllMessagesOfUser().then((messages) => setMessages(messages));
  };
  const getAllSentMessages = () => {
    getAllMessagesSentByUser().then((messages) => setSentMessages(messages));
  };
  const getAllReceivedMessages = () => {
    getAllMessagesReceivedByUser().then((messages) =>
      setReceivedMessages(messages)
    );
  };

  useEffect(() => {
    getAllMessages();
  }, []);

  useEffect(() => {
    getAllSentMessages();
  }, []);

  useEffect(() => {
    getAllReceivedMessages();
  }, []);

  //Todo make hover module that has option to view details or message user
  return (
    <div>
      <Button size="sm" className="mx-5" onClick={toggle}>
        Compose
        <Modal isOpen={modal} toggle={toggle}>
          <ModalBody>
            <CreateMessage toggle={toggle} />
          </ModalBody>
        </Modal>
      </Button>
      {messages.length === 0 ? (
        <strong>No Messages</strong>
      ) : (
        messages.map((message) => (
          <div className="d-flex flex-column mt-3" key={message.id}>
            <Message message={message} />
          </div>
        ))
      )}
    </div>
  );
};
export default MessageList;
