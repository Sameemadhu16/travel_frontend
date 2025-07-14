import React from 'react';

export default function RequestDetails() {
    return (
        <div className="bg-surface-primary rounded-lg border-l-4 border-brand-primary p-6 mb-6">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-content-primary mb-4">
                <span className="text-brand-primary">📋</span>
                Request Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <span className="text-sm text-content-tertiary">Request ID:</span>
                    <p className="font-semibold text-brand-primary">SLT-2024-7891</p>
                </div>
                <div>
                    <span className="text-sm text-content-tertiary">Submitted:</span>
                    <p className="font-semibold text-content-primary">January 7, 2025 - 2:10 PM</p>
                </div>
            </div>
        </div>
    );
}
