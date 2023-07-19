import React, { useEffect, useState } from "react";
import "./quote.css";
import { getRandomQuote } from "../../modules/quoteManager";

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
    <div className="randomContainer">
      <p className="centerText">{random?.content}</p>
    </div>
  );
};

export default Random;
