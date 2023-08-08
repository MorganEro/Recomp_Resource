import { useEffect, useState } from "react";
import {
  UpdateMessage,
  getAllMessagesOfUser,
  getAllMessagesReceivedByUser,
  getAllMessagesSentByUser,
} from "../../modules/messageManager";
import { Modal, ModalBody } from "reactstrap";
import CreateMessage from "./CreateMessage";
import MessageDetails from "./MessageDetails";
import "./message.css";
import UserDetails from "../user/UserDetails";

const MessageList = () => {
  const [messages, setMessages] = useState([]);

  const [visibleMessages, setVisibleMessages] = useState(25);
  const [currentFilter, setCurrentFilter] = useState("Received");

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const mToggle = (messageId) => {
    setMessages((prevMessages) =>
      prevMessages.map((message) =>
        message.id === messageId
          ? { ...message, showMessageModal: !message.showMessageModal }
          : message
      )
    );
  };

  const sToggle = (messageId) => {
    setMessages((prevMessages) =>
      prevMessages.map((message) =>
        message.id === messageId
          ? { ...message, showSenderModal: !message.showSenderModal }
          : message
      )
    );
  };

  const getAllMessages = () => {
    getAllMessagesOfUser().then((messages) => {
      const updatedMessages = messages.map((message) => ({
        ...message,
        showSenderModal: false,
        showMessageModal: false,
      }));
      setMessages(updatedMessages);
      setCurrentFilter("All");
    });
  };

  const getAllSentMessages = () => {
    getAllMessagesSentByUser().then((messages) => {
      const updatedMessages = messages.map((message) => ({
        ...message,
        showSenderModal: false,
        showMessageModal: false,
      }));
      setMessages(updatedMessages);
      setCurrentFilter("Sent");
    });
  };

  const getAllReceivedMessages = () => {
    getAllMessagesReceivedByUser().then((messages) => {
      const updatedMessages = messages.map((message) => ({
        ...message,
        showSenderModal: false,
        showMessageModal: false,
      }));
      setMessages(updatedMessages);
      setCurrentFilter("Received");
    });
  };

  const filterNew = () => {
    setMessages(messages.filter((message) => message.opened === false));
    setCurrentFilter("New");
  };

  useEffect(() => {
    getAllReceivedMessages();
  }, []);

  return (
    <div className="container d-flex justify-content-center">
      <div>
        {/* ------------Compose and Dropdown Button-------------------- */}
        <div className="d-flex justify-content-evenly">
          <button className="btn btn-sm btn-primary  mb-3" onClick={toggle}>
            Compose
            <Modal isOpen={modal} toggle={toggle}>
              <ModalBody>
                <CreateMessage toggle={toggle} />
              </ModalBody>
            </Modal>
          </button>
          <div className="dropdown-center">
            <button
              className="btn btn-sm btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Filter
            </button>
            <ul className="dropdown-menu">
              <li className="dropdown-item" onClick={getAllMessages}>
                ALL
              </li>
              <li className="dropdown-item" onClick={getAllSentMessages}>
                Sent
              </li>
              <li className="dropdown-item" onClick={getAllReceivedMessages}>
                Received
              </li>
              <li className="dropdown-item" onClick={filterNew}>
                New
              </li>
            </ul>
          </div>
        </div>

        {/* ------------Message Table-------------------- */}
        <table
          className="table table-striped table-hover"
          style={{ width: "90vw" }}
        >
          <thead>
            <tr className="text-start">
              <th scope="col">New</th>
              <th scope="col">From</th>
              <th scope="col">Subject</th>
              <th scope="col">Date Received</th>
            </tr>
          </thead>

          {/* ------------Map for Message List-------------------- */}
          <tbody>
            {messages.length === 0 ? (
              <tr>
                <td>No Messages</td>
              </tr>
            ) : (
              messages.slice(0, visibleMessages).map((message) => (
                <tr
                  className="text-start"
                  key={message.id}
                  style={{ border: "solid 1px lightgray" }}
                >
                  <td>
                    {message.opened === true ? (
                      ""
                    ) : (
                      <i className="fa fa-check"></i>
                    )}
                  </td>

                  {/* ------------From Header and modal-------------------- */}
                  <td>
                    <strong>
                      <span
                        title="Sender's Details"
                        style={{ color: "primary", cursor: "pointer" }}
                        onClick={() => sToggle(message.id)}
                      >
                        {message.sender.displayName}
                      </span>
                    </strong>
                    <Modal
                      isOpen={message.showSenderModal}
                      toggle={sToggle}
                      // style={{
                      //   width: "60vw",
                      // }}
                      centered
                    >
                      <ModalBody>
                        <UserDetails
                          sm
                          userId={message.senderId}
                          sToggle={() => sToggle(message.id)}
                          getAll={getAllMessages}
                          getReceived={getAllReceivedMessages}
                          getSent={getAllSentMessages}
                          getNew={filterNew}
                          currentFilter={currentFilter}
                        />
                      </ModalBody>
                    </Modal>
                  </td>

                  {/* ------------Message Subject Area and Modal-------------------- */}
                  <td
                    className="message__subject"
                    title="click for message Details"
                  >
                    <span
                      style={{ textDecoration: "underline" }}
                      onClick={() => mToggle(message.id)}
                    >
                      {message.subject}
                    </span>
                    <Modal
                      isOpen={message.showMessageModal}
                      scrollable
                      toggle={mToggle}
                      onOpened={() => {
                        if (!message.isOpened) {
                          UpdateMessage(message.id, message);
                        }
                      }}
                      style={{
                        width: "60vw",
                        height: "90vh",
                      }}
                    >
                      <ModalBody>
                        <MessageDetails
                          toggle={() => mToggle(message.id)}
                          message={message}
                          getAll={getAllMessages}
                          getReceived={getAllReceivedMessages}
                          getSent={getAllSentMessages}
                          getNew={filterNew}
                          currentFilter={currentFilter}
                        />
                      </ModalBody>
                    </Modal>
                  </td>
                  {/* ------------Message  Date-------------------- */}
                  <td>{message.dayCreated}</td>
                </tr>
              ))
            )}
          </tbody>
          {/* -------button to load more messages--------- */}
          {visibleMessages < messages.length && (
            <div className="text-center">
              <button
                className="btn btn-primary"
                onClick={() =>
                  setVisibleMessages(
                    Math.min(visibleMessages + 25, messages.length)
                  )
                }
              >
                Load More...
              </button>
            </div>
          )}
        </table>
      </div>
    </div>
  );
};
export default MessageList;
