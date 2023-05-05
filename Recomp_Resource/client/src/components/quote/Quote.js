import React from "react";
import { DeleteQuote } from "../../modules/quoteManager";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

const Quote = ({ quote, getQuotes }) => {
  

  const DeleteButton = (e) => {
    e.preventDefault();

    DeleteQuote(quote.id);
    getQuotes()
    }
  
  return (
    <Card>
      <CardBody>
        <p>{quote.content}</p>
        <button>
          <Link to={`../../quote/edit/${quote.id}`}>Edit</Link>
        </button>
        <button  onClick={(clickEvent) =>
                DeleteButton(clickEvent)
              }>Delete</button>
      </CardBody>
    </Card>
  )
};

export default Quote;
