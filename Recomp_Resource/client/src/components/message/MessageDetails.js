const MessageDetails = ({ message, toggle, getMessages }) => {
  const handleCloseButtonClick = () => {
    getMessages();
    toggle(false);
  };

  return (
    <div className="card">
      <img
        src={message?.sender?.imageAddress}
        className="card-img-top mb-3"
        alt="..."
      />

      <h5 className="card-title mx-3">{message.subject} </h5>
      <div className="card-body ">
        <p className="card-text">{message.content}</p>
        <p className="card-text">
          <small>{message.dayCreated}</small>
        </p>
      </div>
      <button
        className="btn btn-secondary mx-3 mb-3"
        style={{ width: "100px" }}
        onClick={handleCloseButtonClick}
      >
        Close
      </button>
    </div>
  );
};

export default MessageDetails;
