import React, { useEffect, useState } from "react";
import { getRandomQuote } from "../../modules/quoteManager";


const Random = () => {
    const [random, setRandom ] = useState();

    const getQuote = () => {
        getRandomQuote().then((quote) =>{setRandom(quote)});   
    };


    useEffect(() => {
        getQuote()
    }, []);

    return (
        <div className="quote ">
           {random?.content}
        </div>
    )
}

export default Random;