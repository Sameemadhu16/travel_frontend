import React from 'react';

export default function NeedAssistance() {
    const handleCallSupport = () => {
        window.open("tel:+94112345678");
    };

    const handleEmailSupport = () => {
        window.open("mailto:support@sri-lanka-tours.com");
    };

    return (
        <div className="bg-surface-primary rounded-lg border border-brand-primary p-6 text-center">
            <div className="w-12 h-12 bg-brand-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
            </div>
            <h2 className="text-lg font-semibold text-content-primary mb-2">Need Assistance?</h2>
            <p className="text-content-secondary mb-6">Our customer support team is here to help you 24/7</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                    onClick={handleCallSupport}
                    className="border border-brand-secondary text-brand-primary px-4 py-2 rounded-lg font-medium hover:bg-brand-light transition-colors"
                >
                    📞 Call Support
                </button>
                <button 
                    onClick={handleEmailSupport}
                    className="bg-brand-primary text-surface-primary px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                    ✉️ Email Us
                </button>
            </div>
        </div>
    );
}
