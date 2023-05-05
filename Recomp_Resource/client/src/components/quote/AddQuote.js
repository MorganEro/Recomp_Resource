import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addQuote } from "../../modules/quoteManager";

const AddQuote = () => {
  const navigate = useNavigate();

  const [quote, setQuote] = useState({
    content: "",
  });


  const handleSubmitButtonClick = (evt) => {
    evt.preventDefault();

    addQuote(quote);
    navigate("../../quote/list");
  };

  const handleCancelButtonClick = () => {
    navigate("../../quote/list");
  };

  return (
    <form>
      <h2> Add A Quote</h2>
      <fieldset>
        <label for="content">Content</label>
        <input
          required
          autoFocus
          type="textarea"
          placeholder="quote content"
          value={quote.content}
          onChange={(evt) => {
            const copy = { ...quote};
            copy.content = evt.target.value;
            setQuote(copy)
          }}
        />
      </fieldset>
      <button onClick={handleSubmitButtonClick}>Submit Changes</button>

      <button onClick={handleCancelButtonClick}>Cancel</button>
    </form>
  );
};
export default AddQuote;
