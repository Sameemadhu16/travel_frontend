import React, { useState } from 'react';

export default function TourPreferences() {
    const [interests, setInterests] = useState([]);
    const [accommodation, setAccommodation] = useState('');

    const handleInterestChange = (interest) => {
        setInterests(prev => 
            prev.includes(interest) 
                ? prev.filter(item => item !== interest)
                : [...prev, interest]
        );
    };

    const handleAccommodationChange = (value) => {
        setAccommodation(value);
    };

    return (
        <section className="bg-white rounded-xl shadow p-6 border border-brand-accent border-l-4 border-l-brand-primary">
            <div className="flex items-center gap-2 mb-4">
                <span className="bg-brand-primary text-white px-3 py-1 rounded font-semibold flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                    </svg>
                    Step 2: Tour Preferences
                </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold mb-2">What interests you most?</label>
                    <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input 
                                type="checkbox" 
                                className="accent-brand-primary w-4 h-4" 
                                checked={interests.includes('cultural')}
                                onChange={() => handleInterestChange('cultural')}
                            /> 
                            <span className="text-sm">Cultural Sites & Temples</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input 
                                type="checkbox" 
                                className="accent-brand-primary w-4 h-4" 
                                checked={interests.includes('wildlife')}
                                onChange={() => handleInterestChange('wildlife')}
                            /> 
                            <span className="text-sm">Wildlife & Safari</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input 
                                type="checkbox" 
                                className="accent-brand-primary w-4 h-4" 
                                checked={interests.includes('beaches')}
                                onChange={() => handleInterestChange('beaches')}
                            /> 
                            <span className="text-sm">Beaches & Coastal Areas</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input 
                                type="checkbox" 
                                className="accent-brand-primary w-4 h-4" 
                                checked={interests.includes('tea')}
                                onChange={() => handleInterestChange('tea')}
                            /> 
                            <span className="text-sm">Tea Plantations & Hill Country</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input 
                                type="checkbox" 
                                className="accent-brand-primary w-4 h-4" 
                                checked={interests.includes('temples')}
                                onChange={() => handleInterestChange('temples')}
                            /> 
                            <span className="text-sm">Ancient Temples & Ruins</span>
                        </label>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-2">Accommodation Preference</label>
                    <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input 
                                type="radio" 
                                name="accommodation" 
                                className="accent-brand-primary w-4 h-4" 
                                checked={accommodation === 'luxury'}
                                onChange={() => handleAccommodationChange('luxury')}
                            /> 
                            <span className="text-sm">Luxury Hotels</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input 
                                type="radio" 
                                name="accommodation" 
                                className="accent-brand-primary w-4 h-4" 
                                checked={accommodation === 'boutique'}
                                onChange={() => handleAccommodationChange('boutique')}
                            /> 
                            <span className="text-sm">Boutique Hotels</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input 
                                type="radio" 
                                name="accommodation" 
                                className="accent-brand-primary w-4 h-4" 
                                checked={accommodation === 'eco'}
                                onChange={() => handleAccommodationChange('eco')}
                            /> 
                            <span className="text-sm">Eco Lodges</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input 
                                type="radio" 
                                name="accommodation" 
                                className="accent-brand-primary w-4 h-4" 
                                checked={accommodation === 'budget'}
                                onChange={() => handleAccommodationChange('budget')}
                            /> 
                            <span className="text-sm">Budget Friendly</span>
                        </label>
                    </div>
                </div>
            </div>
        </section>
    );
}
