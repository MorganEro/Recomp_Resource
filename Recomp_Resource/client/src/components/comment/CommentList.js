import { useCallback, useEffect, useState } from "react";

import {
  DeleteComment,
  getAllCommentsByResourceId,
} from "../../modules/commentManager";
import EnterComment from "./EnterComment";

const CommentList = ({ resourceId }) => {
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState(0);

  const getComments = useCallback(() => {
    getAllCommentsByResourceId(resourceId).then((comments) => {
      setComments(comments);
      setCommentCount(comments.length);
    });
  }, [resourceId]);

  const handleDeleteCommentButtonClick = (commentId) => {
    DeleteComment(commentId).then(() => {
      getComments();
    });
  };

  useEffect(() => {
    getComments();
  }, [getComments]);

  return (
    <div>
      <ul className="list-group mb-3">
        <small className="text-body-secondary text-start">
          Comments {commentCount}
        </small>
        <div className="comment__scroll-container">
          <div className="comment__scroll-content">
            {commentCount === 0 ? (
              <div>Be the first to leave a comment</div>
            ) : (
              comments.map((comment) => (
                <li className="list-group-item" key={comment.id}>
                  <div className="row align-items-center">
                    <div className="col">
                      <img
                        className="rounded"
                        src={comment?.user?.imageAddress}
                        alt="avatar"
                        style={{ width: "45px" }}
                      />
                    </div>
                    <div className="col">
                      <a href={`../../user/details/${comment?.userId}`}>
                        <span>{comment?.user?.displayName} </span>
                      </a>
                    </div>
                    <div className="col-7 flex-grow-1 text-start">
                      {comment.content}
                    </div>
                    <div className="col">
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => {
                          handleDeleteCommentButtonClick(comment.id);
                        }}
                      >
                        <i className="fa fa-trash fa-sm"></i>
                      </button>
                    </div>
                  </div>
                </li>
              ))
            )}
          </div>
        </div>
      </ul>
      <div>
        <EnterComment resourceId={resourceId} getComments={getComments} />
      </div>
    </div>
  );
};
export default CommentList;
