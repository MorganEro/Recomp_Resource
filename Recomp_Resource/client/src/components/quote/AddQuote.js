import { useState } from "react";
import { addQuote } from "../../modules/quoteManager";

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
    <div className="card p-2">
      <h2 className="card-title text-center mb-2"> Add Quote</h2>
      <div className="form mb-2">
        <textarea
          required
          autoFocus
          rows="3"
          className="form-control mb-3 "
          aria-label="add quote input field"
          value={quote.content}
          onChange={(evt) => {
            const copy = { ...quote };
            copy.content = evt.target.value;
            setQuote(copy);
          }}
        />
        <div className="d-flex justify-content-evenly mb-1">
          {quote.content === "" ? (
            <button className="btn btn-secondary mx-5" disabled>
              Complete
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-success mx-5"
              onClick={handleSubmitButtonClick}
            >
              Submit
            </button>
          )}
          <button
            type="button"
            className="btn btn-outline-danger mx-5"
            onClick={handleCancelButtonClick}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
export default AddQuote;
