import React from 'react';

export default function WhatHappensNext() {
    const steps = [
        {
            number: 1,
            title: "Request Review",
            description: "Our team reviews your requirements",
            timeframe: "Within 2 hours",
            status: "pending"
        },
        {
            number: 2,
            title: "Custom Itinerary Creation", 
            description: "Personalized tour plan with pricing",
            timeframe: "Within 24 hours",
            status: "pending"
        },
        {
            number: 3,
            title: "Confirmation & Booking",
            description: "Final details and payment processing", 
            timeframe: "Within 48 hours",
            status: "pending"
        }
    ];

    return (
        <div className="bg-white rounded-lg border-l-4 border-brand-primary p-6 mb-6">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-6">
                <span className="text-brand-primary">🔥</span>
                What Happens Next
            </h2>
            
            <div className="space-y-6">
                {steps.map((step, index) => (
                    <div key={index} className="flex gap-4">
                        <div className="flex items-center justify-center w-8 h-8 bg-brand-primary text-white rounded-full text-sm font-semibold flex-shrink-0">
                            {step.number}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                                <h3 className="font-semibold text-gray-900">{step.title}</h3>
                                <span className="text-xs text-brand-primary font-medium bg-orange-50 px-2 py-1 rounded">
                                    {step.timeframe}
                                </span>
                            </div>
                            <p className="text-sm text-gray-600">{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
