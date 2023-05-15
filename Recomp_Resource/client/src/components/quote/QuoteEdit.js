import { useEffect, useState } from "react";
import { getQuoteById } from "../../modules/quoteManager";
import { UpdateQuote } from "../../modules/quoteManager";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";


const QuoteEdit = ({toggle, quoteId}) => {

    const [quote, setQuote] = useState({
      content: ""
    })
  
  
  

    useEffect(() => {
        getQuoteById(quoteId).then(setQuote);
    }, [quoteId]);

    const handleSubmitButtonClick = () => {  
            UpdateQuote(quote.id, quote).then(() => {
              toggle(false);
              window.location.reload(false);
              // navigate("../../quote/list")
            })
    }

      const handleCancelButtonClick = () => {
        toggle();
       }

    return (
        <div className="container">
      <div>&nbsp;</div>
      <Form >
        <h2 >Quote Edit</h2>
       
        <FormGroup>
         
            <Label htmlFor="content">Content: </Label>
            <Input
              required
              autoFocus
              type="text"
              className=" "
              value={quote.content}
              onChange={(evt) => {
                const copy = { ...quote}
                copy.content = evt.target.value;
                setQuote(copy);
              }}
            />
        </FormGroup>
        {quote.content === "" ? (
          <Button className="mx-5" outline disabled>
            Complete Changes
          </Button>
        ) : (
          <Button color="success" className="mx-5" onClick={handleSubmitButtonClick}>
            Submit Changes
          </Button>
        )}

        <Button className="mx-5" onClick={handleCancelButtonClick}>
          Cancel
        </Button>
        
      </Form>
    </div>
    )
}
export default QuoteEdit;