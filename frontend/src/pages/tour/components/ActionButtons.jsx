import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ActionButtons() {
    const navigate = useNavigate();

    const handleTrackRequest = () => {
        // Navigate to tracking page
        navigate('/tour/track-request');
    };

    const handleCreateNewRequest = () => {
        // Navigate to create new tour request
        navigate('/tour/create-tour');
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <button 
                onClick={handleTrackRequest}
                className="bg-brand-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
            >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
                </svg>
                Track Request Status
            </button>
            <button 
                onClick={handleCreateNewRequest}
                className="border-2 border-brand-primary text-brand-primary px-6 py-3 rounded-lg font-medium hover:bg-orange-50 transition-colors flex items-center justify-center gap-2"
            >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/>
                </svg>
                Create Another Request
            </button>
        </div>
    );
}
