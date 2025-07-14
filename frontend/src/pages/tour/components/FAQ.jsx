import React from 'react';

export default function FAQ() {
    const faqs = [
        {
            question: "How long does it take to receive my itinerary?",
            answer: "You'll receive your custom itinerary within 24 hours of submission.",
            isOpen: true
        },
        {
            question: "Can I modify my tour request?",
            answer: "Yes, you can request modifications until the final booking confirmation.",
            isOpen: false
        },
        {
            question: "What if I need to cancel?",
            answer: "Cancellation policies vary by tour type. Details will be in your itinerary.",
            isOpen: false
        }
    ];

    return (
        <div className="bg-surface-primary rounded-lg border-l-4 border-brand-primary p-6 mb-6">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-content-primary mb-6">
                <span className="text-brand-primary">❓</span>
                Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div key={index} className="border-b border-border-light pb-4 last:border-b-0">
                        <h3 className="font-medium text-content-primary mb-2">{faq.question}</h3>
                        {faq.isOpen && (
                            <p className="text-sm text-content-secondary">{faq.answer}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
