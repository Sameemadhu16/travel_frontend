import React from 'react';
import { useTourContext } from '../../../context/TourContext';

export default function SuccessMessage() {
    const { contactInfo, travelDetails, selectedItems } = useTourContext();

    return (
        <div className="bg-brand-accent rounded-lg p-8 mb-6 text-center border border-green-200">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-success" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
            </div>
            
            <h1 className="text-3xl font-bold text-content-primary mb-3">
                🎉 Tour Request Sent Successfully!
            </h1>
            
            <p className="text-lg text-content-secondary mb-4">
                Thank you, <span className="font-semibold text-brand-primary">{contactInfo.fullName}</span>! 
                Your Sri Lankan adventure awaits!
            </p>
            
            <div className="bg-white rounded-lg p-4 inline-block shadow-sm">
                <div className="flex items-center justify-center gap-6 text-sm">
                    <div className="text-center">
                        <div className="font-semibold text-brand-primary">{selectedItems.guides?.length || 0}</div>
                        <div className="text-content-tertiary">Guide{selectedItems.guides?.length !== 1 ? 's' : ''} Selected</div>
                    </div>
                    <div className="w-px h-8 bg-border-light"></div>
                    <div className="text-center">
                        <div className="font-semibold text-brand-primary">{travelDetails.duration || 'Custom'}</div>
                        <div className="text-content-tertiary">Duration</div>
                    </div>
                    <div className="w-px h-8 bg-border-light"></div>
                    <div className="text-center">
                        <div className="font-semibold text-brand-primary">{travelDetails.adults + (travelDetails.children || 0)}</div>
                        <div className="text-content-tertiary">Traveler{(travelDetails.adults + (travelDetails.children || 0)) !== 1 ? 's' : ''}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
