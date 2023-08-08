import { useEffect, useState } from "react";
import { addMessage } from "../../modules/messageManager";
import { getAllUsers } from "../../modules/userManager";

// compose a message for any user from list of users
const CreateMessage = ({ toggle, recipientId, recipientName }) => {
  const [message, setMessage] = useState({
    recipientId: 0,
    subject: "",
    content: "",
  });
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  const handleSubmitButtonClick = () => {
    if (message.recipientId === 0) {
      message.recipientId = recipientId;
    }
    addMessage(message).then(() => {
      toggle(false);
      window.location.reload(false);
    });
  };
  const getUsers = () => {
    getAllUsers().then((data) => setUsers(data));
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleCancelButtonClick = () => {
    toggle(false);
  };

  const handleUserClick = (id, displayName) => {
    const copy = { ...message };
    copy.recipientId = id;
    setMessage(copy);
    setSelectedUser(displayName);
    setFilteredUsers([]);
  };

  const handleFilter = (e) => {
    const searchWord = e.target.value.toLowerCase();
    const newFilter = users.filter((result) => {
      return result.displayName.toLowerCase().includes(searchWord);
    });
    if (searchWord === "") {
      setFilteredUsers([]);
    } else {
      setFilteredUsers(newFilter);
    }
  };

  return (
    <div className="card">
      <h2 className="card-title ms-3"> Compose A Message</h2>
      <div className="card-body">
        <form className="text-upper">
          <div className="mb-3 search">
            <label htmlFor="searchInput">Send To</label>
            <input
              className="form-control mb-1"
              id="searchInput"
              required
              autoFocus
              type="text"
              placeholder="Search contacts"
              value={selectedUser}
              onChange={handleFilter}
            />
            {filteredUsers.length !== 0 && (
              <div className="d-flex flex-column searchOutput mb-3">
                {filteredUsers.slice(0, 8).map((user) => {
                  return (
                    <label
                      className="outputItem ps-2"
                      key={user.id}
                      onClick={() => handleUserClick(user.id, user.displayName)}
                      style={{ cursor: "pointer" }}
                    >
                      {user.displayName}
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="subject">Subject</label>
            <input
              id="subject"
              className="form-control"
              required
              autoFocus
              type="text"
              placeholder="message subject"
              value={message.subject}
              onChange={(evt) => {
                const copy = { ...message };
                copy.subject = evt.target.value;
                setMessage(copy);
              }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="content">Content</label>
            <input
              id="content"
              className="form-control"
              required
              autoFocus
              type="textarea"
              placeholder="message content"
              value={message.content}
              onChange={(evt) => {
                const copy = { ...message };
                copy.content = evt.target.value;
                setMessage(copy);
              }}
            />
          </div>
        </form>
      </div>
      <div className="card-footer d-flex justify-content-around">
        <button
          className="btn btn-outline-danger"
          onClick={handleCancelButtonClick}
        >
          Cancel
        </button>
        {message.recipientId === 0 ||
        message.content === "" ||
        message.subject === "" ? (
          <button disabled className="btn btn-secondary">
            Complete All Fields
          </button>
        ) : (
          <button className="btn btn-success" onClick={handleSubmitButtonClick}>
            Send Message
          </button>
        )}
      </div>
    </div>
  );
};
export default CreateMessage;
