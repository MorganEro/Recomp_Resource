import { useEffect, useState } from "react";
import { getAllQuotes } from "../../modules/quoteManager";
import Quote from "./Quote";
import { Link } from "react-router-dom";

const QuoteList = () => {
  const [quotes, setQuotes] = useState([]);

  const getQuotes = () => {
    getAllQuotes().then((quotes) => setQuotes(quotes));
  };

  useEffect(() => {
    getQuotes();
  }, []);

  return (
    <>
      <h1 className="text-center"> QUOTES </h1>
      <button>
      <Link to={"../../quote/create"}>ADD</Link>
      </button>
      <section className="container">
        <div className="row justify-content-center">
          {quotes.map((quote) => (
            <Quote quote={quote} getQuotes ={getQuotes} key={quote.id} />
          ))}
          
        </div>
      </section>
    </>
  );
};
export default QuoteList;
