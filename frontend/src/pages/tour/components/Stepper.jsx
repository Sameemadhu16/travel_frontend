import React from 'react';

export default function Stepper() {
    return (
        <div className="flex items-center justify-between w-full mb-8">
            <div className="flex-1 flex items-center">
                <Step label="Details" active />
                <Connector />
                <Step label="Preferences" />
                <Connector />
                <Step label="Budget" />
                <Connector />
                <Step label="Review" />
            </div>
        </div>
    );
}

function Step({ label, active }) {
    return (
        <div className="flex flex-col items-center min-w-[80px]">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${active ? 'bg-brand-primary' : 'bg-content-tertiary'}`}>
                {label[0]}
            </div>
            <span className={`mt-2 text-xs font-semibold ${active ? 'text-brand-primary' : 'text-content-tertiary'}`}>{label}</span>
        </div>
    );
}

function Connector() {
    return <div className="h-1 flex-1 bg-border-light mx-2" />;
}
