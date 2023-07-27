import { useEffect, useState } from "react";
import {
  UpdateMessage,
  getAllMessagesOfUser,
  getAllMessagesReceivedByUser,
  getAllMessagesSentByUser,
} from "../../modules/messageManager";
import { Modal, ModalBody } from "reactstrap";
import { Tooltip } from "reactstrap";
import CreateMessage from "./CreateMessage";
import SendMessage from "./SendMessage";
import MessageDetails from "./MessageDetails";
import "./message.css";

const MessageList = () => {
  const [messages, setMessages] = useState([]);

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [mModal, setMModal] = useState(false);
  const mToggle = () => setMModal(!mModal);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const tToggle = () => setTooltipOpen(!tooltipOpen);

  const getAllMessages = () => {
    getAllMessagesOfUser().then((messages) => setMessages(messages));
  };
  const getAllSentMessages = () => {
    getAllMessagesSentByUser().then((messages) => setMessages(messages));
  };
  const getAllReceivedMessages = () => {
    getAllMessagesReceivedByUser().then((messages) => setMessages(messages));
  };
  const filterNew = () => {
    setMessages(messages.filter((message) => message.opened === false));
  };

  const doubleToggle = () => {
    toggle();
    tToggle();
    setTooltipOpen(!tooltipOpen);
  };
  const doubleFunction = (message) => {
    UpdateMessage(message.id, message).then(() => {
      mToggle();
    });
  };

  useEffect(() => {
    getAllMessages();
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
          onClick={mToggle}
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
              messages.map((message) => (
                <tr className="text-start" key={message.id}>
                  <td>
                    {message.opened === true ? (
                      ""
                    ) : (
                      <i className="fa fa-check"></i>
                    )}
                  </td>
                  {/* ------------From Header and modal-------------------- */}
                  <td>
                    <strong id="SenderInfoTooltip">
                      <a href={`../../user/details/${message.senderId}`}>
                        {message.sender.displayName}
                      </a>
                    </strong>
                    {/* ------------Sender Tooltip and modal-------------------- */}
                    <Tooltip
                      placement="left"
                      isOpen={tooltipOpen}
                      autohide={false}
                      target="SenderInfoTooltip"
                      toggle={tToggle}
                    >
                      <div className="card">
                        <h5 className="card-title">
                          {" "}
                          {message?.sender?.displayName}
                        </h5>
                        <div className="d-flex justify-content-evenly p-2">
                          {/* ------------Tooltip Image-------------------- */}
                          <a href={`../../user/details/${message.senderId}`}>
                            <img
                              className="rounded mx-2"
                              src={message.sender.imageAddress}
                              alt="avatar"
                              style={{ width: "45px" }}
                            />
                          </a>
                          <button
                            className="btn btn-sm btn-outline-primary mx-2"
                            onClick={doubleToggle}
                          >
                            <i className="fa fa-envelope"></i>
                            {/* ------------Tooltip Modal-------------------- */}
                            <Modal isOpen={modal} toggle={toggle}>
                              <ModalBody>
                                <SendMessage
                                  toggle={toggle}
                                  RecipientId={message.senderId}
                                  recipientName={message.sender.displayName}
                                />
                              </ModalBody>
                            </Modal>
                          </button>
                        </div>
                      </div>
                    </Tooltip>
                  </td>
                  {/* ------------Message Subject Area and Modal-------------------- */}
                  <td
                    className="message__subject"
                    title="click for message Details"
                  >
                    <span
                      onClick={() => {
                        doubleFunction(message);
                      }}
                    >
                      {message.subject}
                    </span>

                    <Modal isOpen={mModal} toggle={mToggle}>
                      <ModalBody>
                        <MessageDetails
                          toggle={mToggle}
                          message={message}
                          getMessages={getAllMessages}
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
        </table>
      </div>
    </div>
  );
};
export default MessageList;
