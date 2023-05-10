
import { useState } from "react";
import { addComment } from "../../modules/commentManager";




const EnterComment = ({ getResource, resourceId }) => {
 
 

  const [comment, setComment] = useState({

    content: "",
    resourceId: 0,
  });


  const handleSubmitButtonClick = () => {
    comment.resourceId = resourceId
    addComment(comment).then(() => { 
        getResource();
    });
   
  };

  const handleCancelButtonClick = () => {
    setComment("");
  };

  return (
    <form>
      <fieldset>
        <label htmlFor="content">Add Comment</label>
        <input
          required
          autoFocus
          type="textarea"
          placeholder="comment content"
          value={comment.content}
          onChange={(evt) => {
            const copy = { ...comment};
            copy.content = evt.target.value;
            setComment(copy)
          }}
        />
      </fieldset>
      {comment.content === ""  
      ? 
      ( "" ) 
      :
      (
        <div>
          <button onClick={handleSubmitButtonClick}>Send</button>
          <button onClick={handleCancelButtonClick}>Cancel</button>
        </div>
        )}

    </form>
  );
};
export default EnterComment
