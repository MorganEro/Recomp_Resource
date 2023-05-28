import { useState } from "react";
import { addQuote } from "../../modules/quoteManager";
import { Button, Card, CardFooter,  CardTitle, Form, FormGroup, Input, Label } from "reactstrap";

const AddQuote = ({ getQuotes, toggle }) => {
  const [quote, setQuote] = useState({
    content: "",
  });

  const handleSubmitButtonClick = (evt) => {
    evt.preventDefault();

    addQuote(quote).then(() => {
      toggle();
      getQuotes();
    });
  };

  const handleCancelButtonClick = () => {
    toggle(false);
  };

  return (
    <Form>
      <h2> Add A Quote</h2>
      <FormGroup>
        
        <Input
          required
          autoFocus
          className="my-3"
          type="textarea"
          placeholder="quote"
          value={quote.content}
          onChange={(evt) => {
            const copy = { ...quote };
            copy.content = evt.target.value;
            setQuote(copy);
          }}
        />
        <Button color="success" className= "mx-5" onClick={handleSubmitButtonClick}>Submit Changes</Button>

        <Button outline className= "mx-5"   onClick={handleCancelButtonClick}>Cancel</Button>
      </FormGroup>
     
      
    </Form>
  );
};
export default AddQuote;
