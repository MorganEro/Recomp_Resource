import { useEffect, useState } from "react";
import { addComment } from "../../modules/commentManager";

const EnterComment = ({ resourceId, getComments }) => {
  const [comment, setComment] = useState({
    content: "",
    resourceId: resourceId,
  });

  const handleSubmitButtonClick = () => {
    addComment(comment).then(() => {
      getComments();
    });
    setComment({ ...comment, content: "" });
  };

  useEffect(() => {}, []);

  return (
    <div className="input-group flex-nowrap">
      <span className="input-group-text" id="search-form">
        <i className="fa fa-comment"></i>
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
          <i className="fa fa-paper-plane"></i>
        </span>
      )}
    </div>
  );
};
export default EnterComment;
