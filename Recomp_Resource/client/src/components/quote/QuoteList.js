import { useEffect, useState } from "react";
import { getAllQuotes } from "../../modules/quoteManager";
import Quote from "./Quote";

import {
 
  Button,
  Modal,
  ModalBody,
  
} from "reactstrap";
import AddQuote from "./AddQuote";

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
      <h1 className="text-center"> QUOTES </h1>
      <Button onClick={toggle}>ADD</Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalBody>
          <AddQuote getQuotes={getQuotes} toggle={toggle}/>
        </ModalBody>
      </Modal>
      <section className="container">
        <div className="row justify-content-center">
          {quotes.map((quote) => (
            <div className="d-flex flex-column mt-3" key={quote.id}>
            <Quote quote={quote} getQuotes ={getQuotes} />
            </div>
          ))}
          
        </div>
      </section>
    </>
  );
};
export default QuoteList;
