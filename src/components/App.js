import { useState, useEffect } from "react";

import { FetchQuote } from "./FetchQuote.mjs";
import CopyButton from "./CopyButton";
import image from "../image.png";

export default function App() {
    const [quote, setQuote] = useState({});
    const [fetchingQuote, setFetchingQuote] = useState(false);

    useEffect(() => { 
        handleQuote();
    }, []);

    async function handleQuote() {
        setFetchingQuote(true);
        const newQuote = await FetchQuote();
        setQuote(newQuote);
        setFetchingQuote(false);
    }

    function handleCopyQuote() {
        const textToCopy = `${quote.quoteText || "No quote available"} - ${quote.quoteAuthor || "Unknown"}`;
        navigator.clipboard.writeText(textToCopy);
    }

    return (
        <div className="app-container">
        <div className="quote-container">
            {fetchingQuote ? 
            <img src={image} className="show"/> 
            : 
            <h1 className="quote-text">
                {quote.quoteText || "Fetching quote..."}
                {quote.quoteAuthor && <i className="quote-author"> <br/>- {quote.quoteAuthor}</i>}
                <CopyButton onCopyQuote={handleCopyQuote} />
            </h1>}

            <button id="getButton"
                onClick={handleQuote}
                disabled={fetchingQuote}
                style={fetchingQuote? {cursor:"not-allowed"} : {}}>
                {fetchingQuote ? 'Fetching quote....' : 'Get a Quote'}
            </button>
        </div>
            <footer className="footer">
                <p>Powered by <a href="https://forismatic.com/en/api/">forismatic api</a></p>
            </footer>
        </div>
    );
}