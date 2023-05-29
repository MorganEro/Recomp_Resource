import { Link } from "react-router-dom";

const Message = ({ message }) => {

    
  return (
    <div key={message.id}>
      <Link to={`../../user/details/${message.senderId}`}>
        <strong>{message?.sender?.displayName}</strong>
      </Link>{" "}
      <Link to={`../../message/details/${message.id}`}>
        <span>{message.subject}</span>
      </Link>
    </div>
  );
};
export default Message;
