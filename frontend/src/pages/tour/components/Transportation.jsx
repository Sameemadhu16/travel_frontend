import React from 'react';

export default function Transportation() {
    return (
        <div className="bg-white rounded-lg border border-brand-primary p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-content-primary">Transportation</h2>
                <button className="text-brand-primary text-sm font-medium hover:underline flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                    Edit
                </button>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
                <div>
                    <h3 className="text-sm font-medium text-content-secondary mb-2">Vehicle Type</h3>
                    <p className="text-content-primary font-medium">Air-Conditioned Car</p>
                </div>
                <div>
                    <h3 className="text-sm font-medium text-content-secondary mb-2">Driver</h3>
                    <p className="text-content-primary font-medium">Professional Driver Included</p>
                </div>
                <div>
                    <h3 className="text-sm font-medium text-content-secondary mb-2">Cost</h3>
                    <p className="text-content-primary font-medium">Included</p>
                </div>
                <div className="text-right">
                    <p className="text-lg font-semibold text-brand-primary">LKR 45,000</p>
                </div>
            </div>
        </div>
    );
}
