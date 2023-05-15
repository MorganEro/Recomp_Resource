
import { useState } from "react";
import { addComment } from "../../modules/commentManager";
import { Button, Input, InputGroup } from "reactstrap";




const EnterComment = ({  getResourceA, resourceIdA }) => {
 
 

  const [comment, setComment] = useState({

    content: "",
    resourceId: 0,
  });


  const handleSubmitButtonClick = () => {
    comment.resourceId = resourceIdA
    addComment(comment).then(() => { 
        getResourceA();
    });
   
  };

  const handleCancelButtonClick = () => {
    comment.content = "";
  };

  return (
    <form>
      <InputGroup>
       
        <Input
          required
          autoFocus
          type="search"
          placeholder="Enter A comment"
          value={comment.content}
          onChange={(evt) => {
            const copy = { ...comment};
            copy.content = evt.target.value;
            setComment(copy)
          }}
        />
      </InputGroup>
      {comment.content === ""  
      ? 
      ( "" ) 
      :
      (
        <div>
          <Button outline className= "mx-5 my-3" onClick={handleSubmitButtonClick}>Send</Button>
          <Button outline className= "mx-5" onClick={handleCancelButtonClick}>Cancel</Button>
        </div>
        )}

    </form>
  );
};
export default EnterComment
