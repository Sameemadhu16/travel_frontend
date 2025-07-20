import React from 'react';

export default function SecurityFeatures() {
    const securityFeatures = [
        {
            icon: '🔒',
            title: 'Bank-level Security',
            description: 'Advanced encryption protects your data'
        },
        {
            icon: '↩️',
            title: 'Flexible Cancellation',
            description: 'Free cancellation up to 48 hours'
        },
        {
            icon: '🎧',
            title: '24/7 Travel Support',
            description: 'Round-the-clock assistance during your trip'
        }
    ];

    return (
        <div className="bg-surface-primary rounded-lg p-6 border-brand-primary">
            <h3 className="text-lg font-semibold text-content-primary mb-4">Why Choose Our Tours?</h3>
            
            <div className="space-y-4">
                {securityFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-brand-light rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-lg">{feature.icon}</span>
                        </div>
                        <div>
                            <h4 className="font-medium text-content-primary text-sm">{feature.title}</h4>
                            <p className="text-xs text-content-tertiary mt-1">{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
