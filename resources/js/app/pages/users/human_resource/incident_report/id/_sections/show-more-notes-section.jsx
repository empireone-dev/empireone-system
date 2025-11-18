import React, { useState } from "react";

export default function ShowMoreNotesSection({ data }) {
    const [showMore, setShowMore] = useState(false);

    // Remove HTML tags to measure text length
    const plainText = data.replace(/<[^>]+>/g, "");

    // Truncate only the text, but still show HTML safely
    const truncatedHtml =
        plainText.length > 20 ? plainText.substring(0, 20) + "..." : plainText;

    return (
        <div>
            <div
                dangerouslySetInnerHTML={{
                    __html: showMore ? data : truncatedHtml,
                }}
            />

            {plainText.length > 10 && (
                <button onClick={() => setShowMore(!showMore)}>
                    {showMore ? "Show Less" : "Show More"}
                </button>
            )}
        </div>
    );
}
