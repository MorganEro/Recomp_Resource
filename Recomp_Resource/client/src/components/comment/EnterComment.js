
import { useState } from "react";
import { addComment } from "../../modules/commentManager";
import { Button, Input, InputGroup } from "reactstrap";




const EnterComment = ({  getComments, resourceId }) => {
 
 

  const [comment, setComment] = useState({

    content: "",
    resourceId: 0,
  });


  const handleSubmitButtonClick = () => {
    comment.resourceId = resourceId
    addComment(comment).then(() => { 
        getComments()
        setComment('')
    });
   
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
        </div>
        )}

    </form>
  );
};
export default EnterComment
