import React from 'react';
import { FaCheck } from 'react-icons/fa';

const StepIndicator = ({ currentStep }) => {
    const steps = [
        { id: 1, title: 'Basic Info', description: 'Trip details' },
        { id: 2, title: 'Preferences', description: 'Your interests' },
        { id: 3, title: 'AI Generation', description: 'Create itinerary' }
    ];

    const getStepStatus = (stepId) => {
        if (stepId < currentStep) return 'completed';
        if (stepId === currentStep) return 'current';
        return 'upcoming';
    };

    const getStepClasses = (status) => {
        switch (status) {
            case 'completed':
                return {
                    circle: 'bg-brand-primary text-white border-brand-primary',
                    title: 'text-brand-primary font-semibold',
                    description: 'text-content-secondary',
                    line: 'bg-brand-primary'
                };
            case 'current':
                return {
                    circle: 'bg-brand-primary text-white border-brand-primary ring-4 ring-brand-accent',
                    title: 'text-brand-primary font-semibold',
                    description: 'text-content-secondary',
                    line: 'bg-border-light'
                };
            case 'upcoming':
                return {
                    circle: 'bg-surface-primary text-content-tertiary border-border-light',
                    title: 'text-content-tertiary',
                    description: 'text-content-tertiary',
                    line: 'bg-border-light'
                };
            default:
                return {};
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto mb-8">
            <div className="flex items-center justify-between relative">
                {steps.map((step, index) => {
                    const status = getStepStatus(step.id);
                    const classes = getStepClasses(status);
                    const isLast = index === steps.length - 1;

                    return (
                        <div key={step.id} className="flex-1 relative">
                            <div className="flex flex-col items-center">
                                {/* Step Circle */}
                                <div className={`
                                    relative z-10 w-12 h-12 rounded-full border-2 flex items-center justify-center
                                    transition-all duration-300 ${classes.circle}
                                `}>
                                    {status === 'completed' ? (
                                        <FaCheck className="text-sm" />
                                    ) : (
                                        <span className="text-sm font-bold">{step.id}</span>
                                    )}
                                </div>

                                {/* Step Content */}
                                <div className="mt-3 text-center">
                                    <div className={`text-sm font-medium transition-colors duration-300 ${classes.title}`}>
                                        {step.title}
                                    </div>
                                    <div className={`text-xs mt-1 transition-colors duration-300 ${classes.description}`}>
                                        {step.description}
                                    </div>
                                </div>
                            </div>

                            {/* Connecting Line */}
                            {!isLast && (
                                <div className="absolute top-6 left-1/2 w-full h-0.5 -translate-y-1/2 z-0">
                                    <div className={`
                                        h-full transition-colors duration-300 ${classes.line}
                                        ${status === 'completed' ? 'w-full' : 'w-0'}
                                    `}></div>
                                    <div className="absolute top-0 left-0 w-full h-full bg-border-light"></div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default StepIndicator;
