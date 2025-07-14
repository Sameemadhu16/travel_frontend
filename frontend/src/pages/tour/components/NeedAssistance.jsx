import React from 'react';

export default function NeedAssistance() {
    const handleCallSupport = () => {
        window.open("tel:+94112345678");
    };

    const handleEmailSupport = () => {
        window.open("mailto:support@sri-lanka-tours.com");
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Need Assistance?</h2>
            <p className="text-gray-600 mb-6">Our customer support team is here to help you 24/7</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                    onClick={handleCallSupport}
                    className="border border-orange-300 text-orange-600 px-4 py-2 rounded-lg font-medium hover:bg-orange-50 transition-colors"
                >
                    📞 Call Support
                </button>
                <button 
                    onClick={handleEmailSupport}
                    className="bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors"
                >
                    ✉️ Email Us
                </button>
            </div>
        </div>
    );
}
