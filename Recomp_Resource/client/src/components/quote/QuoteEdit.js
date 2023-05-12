import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getQuoteById } from "../../modules/quoteManager";
import { UpdateQuote } from "../../modules/quoteManager";
import { Button, FormGroup, Input, Label } from "reactstrap";


const QuoteEdit = ({toggleQ}) => {

    const [quote, setQuote] = useState({})
    const {id} = useParams();
    const navigate = useNavigate();
  
  

    useEffect(() => {
        getQuoteById(id).then(setQuote);
    }, [id]);

    const handleSubmitButtonClick = () => {  
            UpdateQuote(quote.id, quote).then(() => {
              toggleQ(false);
              navigate("../../quote/list")
            })
    }

      const handleCancelButtonClick = () => {
        toggleQ(false);
       }

    return (
        <div className="container">
      <div>&nbsp;</div>
      <form >
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
          <Button outline disabled className="">
            Complete Changes
          </Button>
        ) : (
          <Button onClick={handleSubmitButtonClick}>
            Submit Changes
          </Button>
        )}

        <Button onClick={handleCancelButtonClick}>
          Cancel
        </Button>
        
      </form>
    </div>
    )
}
export default QuoteEdit;