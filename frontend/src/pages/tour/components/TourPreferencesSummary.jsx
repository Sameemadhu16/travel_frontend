import React from 'react';
import { useTourContext } from '../../../context/TourContext';
import { useNavigate } from 'react-router-dom';

export default function TourPreferencesSummary() {
    const navigate = useNavigate();
    const { tourPreferences } = useTourContext();

    // Handle edit button click
    const handleEdit = () => {
        navigate('/tour/create-tour');
    };

    // Format interest labels for display
    const formatInterest = (interest) => {
        const interestMap = {
            'cultural': 'Cultural Sites & Temples',
            'wildlife': 'Wildlife & Safari',
            'beaches': 'Beaches & Coastal Areas',
            'tea': 'Tea Plantations & Hill Country',
            'temples': 'Ancient Temples & Ruins',
            'adventure': 'Adventure Activities',
            'nature': 'National Parks & Nature',
            'waterfalls': 'Waterfalls & Scenic Views',
            'spice': 'Spice Gardens & Plantations',
            'train': 'Scenic Train Journeys',
            'fishing': 'Fishing & Water Sports',
            'ayurveda': 'Ayurveda & Wellness',
            'photography': 'Photography Tours',
            'local': 'Local Villages & Communities',
            'food': 'Food & Culinary Experiences'
        };
        return interestMap[interest] || interest;
    };

    // Format accommodation labels for display
    const formatAccommodation = (accommodation) => {
        const accommodationMap = {
            'luxury': 'Luxury Hotels',
            'boutique': 'Boutique Hotels',
            'eco': 'Eco Lodges',
            'heritage': 'Heritage Hotels',
            'resort': 'Beach Resorts',
            'budget': 'Budget Friendly',
            'villa': 'Private Villas',
            'treehouses': 'Treehouses & Unique'
        };
        return accommodationMap[accommodation] || accommodation;
    };

    // Format display values
    const formatDisplayValue = (value) => {
        if (!value) return 'Not specified';
        return value.replace(/^\w/, c => c.toUpperCase()).replace(/-/g, ' ');
    };

    return (
        <div className="bg-white rounded-lg border border-brand-primary p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-content-primary">Tour Preferences</h2>
                <button 
                    onClick={handleEdit}
                    className="text-brand-primary text-sm font-medium hover:underline flex items-center gap-1"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                    Edit
                </button>
            </div>
            
            {/* Interests */}
            {tourPreferences.interests.length > 0 && (
                <div className="mb-4">
                    <h3 className="text-sm font-medium text-content-secondary mb-2">Interests</h3>
                    <div className="flex gap-2 flex-wrap">
                        {tourPreferences.interests.map((interest, index) => (
                            <span 
                                key={index}
                                className="bg-brand-light text-brand-primary px-3 py-1 rounded-full text-sm font-medium"
                            >
                                {formatInterest(interest)}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Accommodation */}
            {tourPreferences.accommodation && (
                <div className="mb-4">
                    <h3 className="text-sm font-medium text-content-secondary mb-2">Accommodation Preference</h3>
                    <span className="bg-surface-secondary text-content-primary px-3 py-1 rounded-lg text-sm font-medium">
                        {formatAccommodation(tourPreferences.accommodation)}
                    </span>
                </div>
            )}

            {/* Additional Preferences */}
            <div className="grid grid-cols-2 gap-6">
                {tourPreferences.travelStyle && (
                    <div>
                        <h3 className="text-sm font-medium text-content-secondary mb-2">Travel Style</h3>
                        <p className="text-content-primary font-medium">{formatDisplayValue(tourPreferences.travelStyle)}</p>
                    </div>
                )}
                {tourPreferences.budgetRange && (
                    <div>
                        <h3 className="text-sm font-medium text-content-secondary mb-2">Budget Range</h3>
                        <p className="text-content-primary font-medium">{formatDisplayValue(tourPreferences.budgetRange)}</p>
                    </div>
                )}
                {tourPreferences.activityLevel && (
                    <div>
                        <h3 className="text-sm font-medium text-content-secondary mb-2">Activity Level</h3>
                        <p className="text-content-primary font-medium">{formatDisplayValue(tourPreferences.activityLevel)}</p>
                    </div>
                )}
                {tourPreferences.diningPreference && (
                    <div>
                        <h3 className="text-sm font-medium text-content-secondary mb-2">Dining Preference</h3>
                        <p className="text-content-primary font-medium">{formatDisplayValue(tourPreferences.diningPreference)}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
