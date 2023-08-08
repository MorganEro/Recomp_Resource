import { useEffect, useState } from "react";
import { getAllQuotes } from "../../modules/quoteManager";
import Quote from "./Quote";

import { Modal, ModalBody } from "reactstrap";
import AddQuote from "./AddQuote";
import ScrollToTop from "../Utilities/ScrollToTop";
const QuoteList = () => {
  const [quotes, setQuotes] = useState([]);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const getQuotes = () => {
    getAllQuotes().then((quotes) => setQuotes(quotes));
  };

  useEffect(() => {
    getQuotes();
  }, []);

  return (
    <>
      {/* ------------Header-------------------- */}
      <h1 className="text-center">
        <ScrollToTop />
        <strong> QUOTES </strong>{" "}
      </h1>

      {/* ------------Add Button-------------------- */}
      <button
        className="btn btn-outline-success mx-2"
        title="Add Resource"
        onClick={toggle}
      >
        <i className="fa fa-plus"></i>
      </button>

      {/* ------------Quote List-------------------- */}
      <section className="container">
        <div className="row justify-content-center">
          {quotes.map((quote) => (
            <div className="d-flex flex-column mt-3" key={quote.id}>
              <Quote quote={quote} getQuotes={getQuotes} />
            </div>
          ))}
        </div>
      </section>
      {/* ------------Add Modal-------------------- */}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalBody>
          <AddQuote getQuotes={getQuotes} toggle={toggle} />
        </ModalBody>
      </Modal>
    </>
  );
};
export default QuoteList;
