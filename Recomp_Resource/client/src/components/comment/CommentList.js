import { useEffect, useState } from "react";

import { getAllCommentsByResourceId } from "../../modules/commentManager";

const CommentList = ({ resourceId }) => {
  const [comments, setComments] = useState([]);

  const getComments = () => {
    getAllCommentsByResourceId(resourceId).then((comments) =>
      setComments(comments)
    );
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <ul className="list-group">
      {comments.map((comment) => (
        <li className="list-group-item" key={comment.id}>
          <strong> {comment?.user?.displayName}</strong>
          <span>{comment.content}</span>
        </li>
      ))}
    </ul>
  );
};
export default CommentList;
