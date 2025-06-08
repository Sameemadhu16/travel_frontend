import React from 'react';

export default function FormatText({ text }) {
    if (!text) return null;

    const parts = text.split(/\*\*(.*?)\*\*/g);

    return (
        <>
            {parts.map((part, index) => {
                if (index % 2 === 1) {
                return (
                    <strong key={index} className="block font-bold my-2">
                    {part}
                    </strong>
                );
                }
                else if (part.trim()) {
                return (
                    <p key={index} className="">
                    {part}
                    </p>
                );
                }
                return null;
            })}
        </>
    );
}