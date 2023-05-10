import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getQuoteById } from "../../modules/quoteManager";
import { UpdateQuote } from "../../modules/quoteManager";


const QuoteEdit = () => {

    const [quote, setQuote] = useState({})
    const {id} = useParams();
    const navigate = useNavigate();
  
  

    useEffect(() => {
        getQuoteById(id).then(setQuote);
    }, [id]);

    const handleSubmitButtonClick = (event) => {
            event.preventDefault();

            UpdateQuote(quote.id, quote);
            navigate("../../quote/list")
    }

      const handleCancelButtonClick = () => {
        navigate("../../quote/list")
       }

    return (
        <div className="container">
      <div>&nbsp;</div>
      <form >
        <h2 >Quote Edit</h2>
       
        <fieldset>
          <div>
            <label htmlFor="content">Content: </label>
            <input
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
          </div>
        </fieldset>
        {quote.content === "" ? (
          <button outline className="">
            Complete Changes
          </button>
        ) : (
          <button onClick={handleSubmitButtonClick}>
            Submit Changes
          </button>
        )}

        <button onClick={handleCancelButtonClick}>
          Cancel
        </button>
        
      </form>
    </div>
    )
}
export default QuoteEdit;