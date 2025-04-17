const ApiKey = '330e0f7b7253db57';
const EDUCORS_URL = 'https://educorssolver.host/api/getData';
const forismatic_url = "http://api.forismatic.com/api/1.0/?method=getQuote&format=xml&lang=en";

export const fullUrl = `${EDUCORS_URL}?ApiKey=${ApiKey}&Target=${encodeURIComponent(forismatic_url)}`;

export async function FetchQuote() {
    try {
        const response = await fetch(fullUrl);
        const text = await response.text();

        // Create a DOMParser to parse XML
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, "text/xml");

        const quoteText = xmlDoc.querySelector("quoteText")?.textContent || "";
        const quoteAuthor = xmlDoc.querySelector("quoteAuthor")?.textContent || "";

        return {
            quoteText,
            quoteAuthor,
        };
    } catch (error) {
        console.error("Failed to parse XML:", error);
        return {
            quoteText: "Error fetching quote",
            quoteAuthor: "Unknown",
        };
    }
}