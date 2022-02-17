import React, { useState, useEffect } from 'react';

function Quote() {
    const [quote, setQuote] = useState('');
    const [loading, setLoading] = useState(true);
    const [author, setAuthor] = useState('');

    useEffect(() => {
        fetch('https://quotes.rest/qod?category=inspire&language=en')
        .then(res=> res.json())
        .then(data=>{
        console.log(data);
        setQuote(data.contents.quotes[0].quote);
        setAuthor(data.contents.quotes[0].author);
})
    }, [])
    return (
        <>
        <h1>{quote}</h1>
        <p>- {author}</p>
        </>
    )
}

export default Quote