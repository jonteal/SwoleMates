import React, { useState, useEffect } from 'react';

import './quote.css';

function Quote() {
    const [quote, setQuote] = useState('');
    // const [loading, setLoading] = useState(true);
    const [author, setAuthor] = useState('');

    useEffect(() => {
        fetch(`https://quotes.rest/quote/random.json${process.env.REACT_APP_API_KEY_QUOTE}`)
        .then(res=> res.json())
        .then(data=> {
        setQuote(data.contents.quotes[0].quote);
        setAuthor(data.contents.quotes[0].author);
})
    }, [])
    return (
        <>
        <div className="quote-container">

                <h1 className="quote-header">Quote of the Day:</h1>
                <h2 className="quote">"{quote}"</h2>
                <p className="quote">- {author}</p>

        </div>
        </>
    )
}

export default Quote