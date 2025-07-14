import React from 'react';

export default function SuccessMessage() {
    return (
        <div className="bg-surface-primary rounded-lg p-8 mb-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-success" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
            </div>
            <h1 className="text-2xl font-bold text-content-primary mb-2">Tour Request Sent Successfully!</h1>
            <p className="text-content-secondary">Your Sri Lankan adventure awaits! We've received your tour request.</p>
        </div>
    );
}
