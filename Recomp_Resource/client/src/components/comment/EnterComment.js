
import { useEffect, useState } from "react";
import { addComment } from "../../modules/commentManager";
import { ThisUser } from "../../modules/userManager";
import { onLoginStatusChange } from "../../modules/authManager";



const EnterComment = ({ getResource, resourceId }) => {

  const [thisUser, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
 

  const [comment, setComment] = useState({

    content: "",
  });

  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      ThisUser().then(setUser);
    } else {
      setUser(null);
    }
  }, [isLoggedIn]);

  const handleSubmitButtonClick = (evt) => {
    evt.preventDefault();

    comment.userId = thisUser.id
    comment.resourceId = resourceId
    addComment(comment).then(() => { 
        getResource();
    });
   
  };

  const handleCancelButtonClick = () => {
    getResource();
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
