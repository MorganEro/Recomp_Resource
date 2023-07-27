const Message = ({ message }) => {
  return (
    <tr>
      <th scope="row">{message.opened === true ? "Opened" : "New"}</th>
      <td>
        <a href={`../../user/details/${message.senderId}`}>
          <strong>{message?.sender?.displayName}</strong>
        </a>
      </td>
      <td>
        <a href={`../../message/details/${message.id}`}>
          <span>{message.subject}</span>
        </a>
      </td>
      <td>{message.dayCreated}</td>
    </tr>
  );
};
export default Message;
