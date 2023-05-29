import { useEffect, useState } from "react";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
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
    <Card>
      <CardHeader>
        <h2> Compose A Message</h2>
      </CardHeader>
      {}
      <CardBody>
        <Form className="text-upper">
          <InputGroup>
            <InputGroupText>Send To</InputGroupText>
            <Input disabled placeholder={recipientName}/>
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
      </CardBody>
      <CardFooter>
        <Button className="mx-5" onClick={handleCancelButtonClick}>
          Cancel
        </Button>
        {message.content === "" || message.subject === "" ? (
          <Button disabled className="mx-5">
            Complete Message
          </Button>
        ) : (
          <Button
            color="success"
            className="mx-5"
            onClick={handleSubmitButtonClick}
          >
            Send Message
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
export default SendMessage;
