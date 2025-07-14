import React from 'react';

export default function StepIndicator() {
    const steps = [
        { number: 1, title: 'Your Selection', active: true, completed: true },
        { number: 2, title: 'Customization', active: true, completed: true },
        { number: 3, title: 'Complete Request', active: true, completed: false }
    ];

    return (
        <div className="flex items-center justify-center mb-8">
            {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                    {/* Step Circle */}
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold text-sm ${
                        step.active 
                            ? 'bg-brand-primary text-white' 
                            : 'bg-surface-secondary text-content-tertiary'
                    }`}>
                        {step.completed && step.number !== 3 ? (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                            </svg>
                        ) : (
                            step.number
                        )}
                    </div>
                    
                    {/* Step Title */}
                    <span className={`ml-2 text-sm font-medium ${
                        step.active ? 'text-brand-primary' : 'text-content-tertiary'
                    }`}>
                        {step.title}
                    </span>
                    
                    {/* Connector Line */}
                    {index < steps.length - 1 && (
                        <div className={`mx-4 h-0.5 w-16 ${
                            step.completed ? 'bg-brand-primary' : 'bg-border-light'
                        }`} />
                    )}
                </div>
            ))}
        </div>
    );
}
