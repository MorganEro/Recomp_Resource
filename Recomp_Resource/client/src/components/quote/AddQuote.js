import { useState } from "react";
import { addQuote } from "../../modules/quoteManager";
import { Button, Card, CardFooter,  CardTitle, FormGroup, Input, Label } from "reactstrap";

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
    <Card>
      <CardTitle> Add A Quote</CardTitle>
      <FormGroup>
        
        <Input
          required
          autoFocus
          type="textarea"
          placeholder="quote content"
          value={quote.content}
          onChange={(evt) => {
            const copy = { ...quote };
            copy.content = evt.target.value;
            setQuote(copy);
          }}
        />
      </FormGroup>
      <CardFooter>
        <Button color="success" className= "mx-5" onClick={handleSubmitButtonClick}>Submit Changes</Button>

        <Button outline className= "mx-5"   onClick={handleCancelButtonClick}>Cancel</Button>
      </CardFooter>
    </Card>
  );
};
export default AddQuote;
