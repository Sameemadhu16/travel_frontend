import React from 'react';
import { useNavigate } from 'react-router-dom';
import Main from '../../components/Main';
import GuideFilters from './components/GuideFilters';
import GuideCard from './components/GuideCard';
import { guides } from '../../core/Lists/guides';


export default function SelectGuide() {
    const navigate = useNavigate();

    const handleNext = () => {
        navigate('/tour/select-hotel');
    };
    

    return (
        <Main>
            <div className="max-w-6xl mx-auto px-4">
                {/* Header Section */}
                <div className="mb-2">
                    <h1 className="text-3xl font-bold text-content-primary mb-2">Select Your Tour Guide</h1>
                    <p className="text-content-secondary">Choose from our experienced local guides to make your Sri Lankan adventure unforgettable</p>
                </div>

                {/* Filters Section */}
                <GuideFilters />

                {/* Guides Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {guides.map((guide) => (
                        <GuideCard key={guide.id} guide={guide} />
                    ))}
                </div>

                {/* Next Button */}
                <div className="flex justify-center">
                    <button 
                        onClick={handleNext}
                        className="bg-brand-primary text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-warning transition"
                    >
                        Next: Select Hotel
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
                
                <div className="text-center mt-2">
                    <p className="text-content-tertiary text-sm">Continue to hotel booking after selecting your guide</p>
                </div>
            </div>
        </Main>
    );
}
