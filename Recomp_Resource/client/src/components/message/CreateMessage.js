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
import { getAllUsers, getUserSearch } from "../../modules/userManager";

const CreateMessage = ({ toggle, RecipientId, recipientName }) => {
  const [message, setMessage] = useState({
    recipientId: 0,
    subject: "",
    content: "",
  });
  const [users, setUsers] = useState([]);
  // const [searchParams, setSearchParams] = useState("");

  const handleSubmitButtonClick = () => {
    if(message.recipientId === 0){

      message.recipientId = RecipientId;
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
    <Card>
      <CardHeader>
        <h2> Compose A Message</h2>
      </CardHeader>
      {}
      <CardBody>
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
export default CreateMessage;
