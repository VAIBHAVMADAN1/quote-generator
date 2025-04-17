import { useState } from "react";

export default function QuoteCopyButton({onCopyQuote}){
    const [text,setText] = useState('Copy Quote');

    return (
        <button id="copyButton"
            onClick={() => {
                onCopyQuote();
                setText(String.fromCharCode(10003) + 'Copied')
                setTimeout(() => {
                    setText('Copy Quote'); // Change back after 2 seconds
                }, 2000);
            }}>
            {text}
        </button>
    );
}