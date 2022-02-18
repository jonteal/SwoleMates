import React, { useState, useEffect } from 'react';
import './quote.css';

const API_KEY = "?api_key=LGWbmLROAcK7FCHQPr39sQeF";

function Quote() {
    const [quote, setQuote] = useState('');
    const [loading, setLoading] = useState(true);
    const [author, setAuthor] = useState('');

    useEffect(() => {
        fetch(`https://quotes.rest/quote/random.json${API_KEY}`)
        .then(res=> res.json())
        .then(data=> {
        setQuote(data.contents.quotes[0].quote);
        setAuthor(data.contents.quotes[0].author);
})
    }, [])
    return (
        <>
        <div className="quote-container">
            <div className="quote-card">
                <h1 className="quote-header">Quote of the Day:</h1>
                <h2 className="quote">{quote}</h2>
                <p className="quote-author">- {author}</p>
            </div>
        </div>
        </>
    )
}

export default Quote