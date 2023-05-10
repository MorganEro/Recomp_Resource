import { useEffect, useState } from "react";

import { getAllCommentsByResourceId } from "../../modules/commentManager";
import { ListGroup, ListGroupItem } from "reactstrap";

const CommentList = ({ resourceId }) => {
  const [comments, setComments] = useState([]);


  const getComments = () => {
    getAllCommentsByResourceId(resourceId).then((comments) => setComments(comments));
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
      <ListGroup>
          {comments.map((comment) => (
            <ListGroupItem key = {comment.id}>
              <Strong> {comment?.user?.displayName}</Strong><span>{comment.content}</span></ListGroupItem>
          ))}
        </ListGroup>
  );
};
export default CommentList;
