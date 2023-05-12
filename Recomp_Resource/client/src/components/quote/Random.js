import React, { useEffect, useState } from "react";
import { getRandomQuote } from "../../modules/quoteManager";
import { Card, CardImg, CardImgOverlay, CardText } from "reactstrap";

const Random = () => {
  const [random, setRandom] = useState();

  const getQuote = () => {
    getRandomQuote().then((quote) => {
      setRandom(quote);
    });
  };

  useEffect(() => {
    getQuote();
  }, []);

  return (
    <Card  
    style={{
      width: '80vw'
    }}
    body inverse className=" container quote">
      <CardImg
      className="quoteImage"
        alt="gym people"
        src="https://images.unsplash.com/photo-1580086319619-3ed498161c77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjF8fGZpdG5lc3N8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60https://images.unsplash.com/photo-1580086319619-3ed498161c77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80"
       
      />
      <CardImgOverlay className="quoteText">
        <CardText>{random?.content}</CardText>
      </CardImgOverlay>
    </Card>
  );
};

export default Random;
