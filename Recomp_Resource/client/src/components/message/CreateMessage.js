import { useEffect, useState } from "react";

import { Form, FormGroup, Input, Label } from "reactstrap";
import { addMessage } from "../../modules/messageManager";
import { getAllUsers } from "../../modules/userManager";

const CreateMessage = ({ toggle, recipientId, recipientName }) => {
  const [message, setMessage] = useState({
    recipientId: 0,
    subject: "",
    content: "",
  });
  const [users, setUsers] = useState([]);
  // const [searchParams, setSearchParams] = useState("");

  const handleSubmitButtonClick = () => {
    if (message.recipientId === 0) {
      message.recipientId = recipientId;
    }
    addMessage(message).then(() => {
      toggle(false);
      window.location.reload(false);
    });
  };

  const handleCancelButtonClick = () => {
    toggle(false);
  };

  const getUsers = () => {
    getAllUsers().then((data) => setUsers(data));
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="card">
      <h2 className="card-title"> Compose A Message</h2>
      <div className="card-body">
        <Form className="text-upper">
          <FormGroup>
            <Label>Send To</Label>
            <Input
              required
              autoFocus
              type="select"
              value={message.recipientId}
              onChange={(evt) => {
                const copy = { ...message };
                copy.recipientId = parseInt(evt.target.value);
                setMessage(copy);
              }}
            >
              {users.map((user) => (
                <option key={user.id} id={user.id} value={user.id}>
                  {user.displayName}
                </option>
              ))}
            </Input>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="subject">Subject</Label>
            <Input
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
          </FormGroup>

          <FormGroup>
            <Label htmlFor="content">Content</Label>
            <Input
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
          </FormGroup>
        </Form>
      </div>
      <div className="card-footer d-flex justify-content-around">
        <button
          className="btn btn-outline-danger"
          onClick={handleCancelButtonClick}
        >
          Cancel
        </button>
        {message.content === "" || message.subject === "" ? (
          <button disabled className="btn btn-secondary">
            Complete Message
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
