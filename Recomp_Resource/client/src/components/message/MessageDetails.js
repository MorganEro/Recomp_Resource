import { Button, Card, CardBody, CardHeader } from "reactstrap";
import { getMessageById } from "../../modules/messageManager";
import { useEffect, useState } from "react";

const MessageDetails = ({ messageId, toggle }) => {
  const [message, setMessage] = useState({});

  useEffect(() => {
    getMessageById(messageId).then((message) => 
    setMessage(message));
  }, [messageId]);


  const handleCloseButtonClick = () => {
    toggle(false);
  };

  return (
    <Card>
      <CardHeader>From {message?.sender?.displayName}</CardHeader>
      <CardBody>
        <strong>{message.subject}</strong>
        <p>{message.content}</p>
        <Button onClick={handleCloseButtonClick}>
          Close
        </Button>
      </CardBody>
    </Card>
  );
};

export default MessageDetails;
