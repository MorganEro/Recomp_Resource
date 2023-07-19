import { useEffect, useState } from "react";
import { getQuoteById } from "../../modules/quoteManager";
import { UpdateQuote } from "../../modules/quoteManager";

const QuoteEdit = ({ toggle, quoteId }) => {
  const [quote, setQuote] = useState({
    content: "",
  });

  useEffect(() => {
    getQuoteById(quoteId).then(setQuote);
  }, [quoteId]);

  const handleSubmitButtonClick = () => {
    UpdateQuote(quote.id, quote).then(() => {
      toggle(false);
      window.location.reload(false);
      // navigate("../../quote/list")
    });
  };

  const handleCancelButtonClick = () => {
    toggle();
  };

  return (
    <div className="card p-2">
      <h2 className="card-title text-center mb-2">Quote Edit</h2>

      <div className="form mb-2">
        <textarea
          required
          autoFocus
          rows="3"
          className="form-control mb-3 "
          aria-label="quote edit input field"
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
export default QuoteEdit;
