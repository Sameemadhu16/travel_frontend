import React from 'react';

export default function PaymentProgress() {
    const steps = [
        { number: 1, title: "Tour Details", status: "completed" },
        { number: 2, title: "Payment", status: "active" },
        { number: 3, title: "Confirmation", status: "pending" }
    ];

    const securitySteps = [
        { icon: "�", title: "SSL Secured", subtitle: "Encrypted", status: "active" },
        { icon: "�️", title: "PCI DSS", subtitle: "Compliant", status: "active" },
        { icon: "🔒", title: "Fraud", subtitle: "Protection", status: "active" }
    ];

    return (
        <div className="bg-surface-primary rounded-lg p-6 border border-brand-primary">
            <div className="mb-6">
                <h3 className="text-sm font-medium text-content-secondary mb-2">Payment Progress</h3>
                <p className="text-xs text-brand-primary">Step 2 of 3</p>
            </div>

            {/* Main Progress Steps */}
            <div className="flex items-center justify-between mb-8">
                {steps.map((step, index) => (
                    <div key={index} className="flex items-center">
                        <div className="flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                                step.status === 'completed' 
                                    ? 'bg-success text-surface-primary'
                                    : step.status === 'active' 
                                    ? 'bg-brand-primary text-surface-primary'
                                    : 'bg-surface-secondary text-content-tertiary border border-border-light'
                            }`}>
                                {step.status === 'completed' ? (
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                                    </svg>
                                ) : (
                                    step.number
                                )}
                            </div>
                            <span className={`text-xs mt-2 ${
                                step.status === 'active' ? 'text-content-primary font-medium' : 'text-content-tertiary'
                            }`}>
                                {step.title}
                            </span>
                        </div>
                        {index < steps.length - 1 && (
                            <div className={`w-12 h-px mx-4 ${
                                step.status === 'completed' ? 'bg-success' : 'bg-border-light'
                            }`}></div>
                        )}
                    </div>
                ))}
            </div>

            {/* Security Steps */}
            <div className="flex items-center justify-center space-x-8">
                {securitySteps.map((step, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-brand-light rounded-full flex items-center justify-center">
                            <span className="text-lg">{step.icon}</span>
                        </div>
                        <div>
                            <div className="text-sm font-medium text-content-primary">{step.title}</div>
                            <div className="text-xs text-content-tertiary">{step.subtitle}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
