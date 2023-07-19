import { useState } from "react";
import { addComment } from "../../modules/commentManager";

const EnterComment = ({ getComments, resourceId }) => {
  const [comment, setComment] = useState({
    content: "",
    resourceId: 0,
  });

  const handleSubmitButtonClick = () => {
    comment.resourceId = resourceId;
    addComment(comment).then(() => {
      getComments();
      setComment("");
    });
  };

  return (
    <div className="input-group flex-nowrap">
      <span className="input-group-text" id="search-form">
        <i class="fa fa-comment"></i>
      </span>
      {/*--------------input field-------------*/}
      <input
        type="search"
        id="search-form"
        className="form-control"
        placeholder="Add a comment..."
        aria-label="comment field"
        value={comment.content}
        onChange={(evt) => {
          const copy = { ...comment };
          copy.content = evt.target.value;
          setComment(copy);
        }}
      />
      {/*--------------send span-------------*/}
      {comment.content === "" ? (
        ""
      ) : (
        <span
          className="input-group-text"
          id="search-form"
          onClick={handleSubmitButtonClick}
        >
          <i class="fa fa-paper-plane"></i>
        </span>
      )}
    </div>
  );
};
export default EnterComment;
