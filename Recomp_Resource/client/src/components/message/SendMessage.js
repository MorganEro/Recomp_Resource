import { useState } from "react";

import {
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Label,
} from "reactstrap";
import { addMessage } from "../../modules/messageManager";

const SendMessage = ({ toggle, recipientId, recipientName }) => {
  const [message, setMessage] = useState({
    subject: "",
    content: "",
  });

  const handleSubmitButtonClick = () => {
    message.recipientId = recipientId;
    addMessage(message).then(() => {
      toggle(false);
      window.location.reload(false);
    });
  };

  const handleCancelButtonClick = () => {
    toggle(false);
  };

  return (
    <div className="card">
      <h2 className="card-title"> Compose A Message</h2>

      <div className="card-body">
        <Form className="text-upper">
          <InputGroup>
            <InputGroupText>Send To</InputGroupText>
            <Input disabled placeholder={recipientName} />
          </InputGroup>
          <br />
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
          <button
            className="btn btn-success mx-5"
            onClick={handleSubmitButtonClick}
          >
            Send Message
          </button>
        )}
      </div>
    </div>
  );
};
export default SendMessage;
