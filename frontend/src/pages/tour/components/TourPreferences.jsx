import React, { useState } from 'react';

export default function TourPreferences() {
    const [interests, setInterests] = useState([]);
    const [accommodation, setAccommodation] = useState('');
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const validateInterests = () => {
        return interests.length === 0 ? 'Please select at least one interest' : '';
    };

    const validateAccommodation = () => {
        return !accommodation ? 'Please select an accommodation preference' : '';
    };

    const handleInterestChange = (interest) => {
        const newInterests = interests.includes(interest) 
            ? interests.filter(item => item !== interest)
            : [...interests, interest];
        
        setInterests(newInterests);
        
        // Validate if touched
        if (touched.interests) {
            const error = newInterests.length === 0 ? 'Please select at least one interest' : '';
            setErrors(prev => ({ ...prev, interests: error }));
        }
    };

    const handleAccommodationChange = (value) => {
        setAccommodation(value);
        
        // Clear error when selection is made
        if (touched.accommodation) {
            setErrors(prev => ({ ...prev, accommodation: '' }));
        }
    };

    const handleInterestsBlur = () => {
        setTouched(prev => ({ ...prev, interests: true }));
        const error = validateInterests();
        setErrors(prev => ({ ...prev, interests: error }));
    };

    const handleAccommodationBlur = () => {
        setTouched(prev => ({ ...prev, accommodation: true }));
        const error = validateAccommodation();
        setErrors(prev => ({ ...prev, accommodation: error }));
    };

    const isFormValid = () => {
        return interests.length > 0 && accommodation !== '';
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
                    <label className="block text-sm font-semibold mb-2">
                        What interests you most? <span className="text-red-500">*</span>
                    </label>
                    <div 
                        className={`p-4 rounded-lg border-2 transition-all ${
                            errors.interests ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'
                        }`}
                        onBlur={handleInterestsBlur}
                        tabIndex={0}
                    >
                        <div className="flex flex-col gap-3">
                            {/*
                                { value: 'cultural', label: 'Cultural Sites & Temples', icon: '🏛️' },
                                { value: 'wildlife', label: 'Wildlife & Safari', icon: '🦁' },
                                { value: 'beaches', label: 'Beaches & Coastal Areas', icon: '🏖️' },
                                { value: 'tea', label: 'Tea Plantations & Hill Country', icon: '🍃' },
                                { value: 'temples', label: 'Ancient Temples & Ruins', icon: '🏯' },
                                { value: 'adventure', label: 'Adventure Activities', icon: '🏔️' }
                            */}
                            {['Cultural Sites & Temples', 'Wildlife & Safari', 'Beaches & Coastal Areas', 'Tea Plantations & Hill Country', 'Ancient Temples & Ruins', 'Adventure Activities'].map((label, index) => (
                                <label key={index} className="flex items-center gap-3 cursor-pointer hover:bg-white/70 p-2 rounded transition-all">
                                    <input 
                                        type="checkbox" 
                                        className="accent-brand-primary w-5 h-5 rounded border-2 border-gray-300 focus:ring-2 focus:ring-brand-primary/20" 
                                        checked={interests.includes(label)}
                                        onChange={() => handleInterestChange(label)}
                                    /> 
                                    <span className="text-lg">{/* {interest.icon} */}</span>
                                    <span className="text-sm font-medium text-gray-700">{label}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    {errors.interests && <p className="text-red-500 text-xs mt-1">{errors.interests}</p>}
                    {!errors.interests && interests.length > 0 && (
                        <p className="text-green-600 text-xs mt-1">
                            ✓ {interests.length} interest{interests.length > 1 ? 's' : ''} selected
                        </p>
                    )}
                </div>
                
                <div>
                    <label className="block text-sm font-semibold mb-2">
                        Accommodation Preference <span className="text-red-500">*</span>
                    </label>
                    <div 
                        className={`p-4 rounded-lg border-2 transition-all ${
                            errors.accommodation ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'
                        }`}
                        onBlur={handleAccommodationBlur}
                        tabIndex={0}
                    >
                        <div className="flex flex-col gap-3">
                            {/*
                                { value: 'luxury', label: 'Luxury Hotels', icon: '⭐', desc: '5-star premium accommodations' },
                                { value: 'boutique', label: 'Boutique Hotels', icon: '🏨', desc: 'Unique, stylish properties' },
                                { value: 'eco', label: 'Eco Lodges', icon: '🌿', desc: 'Sustainable, nature-focused stays' },
                                { value: 'budget', label: 'Budget Friendly', icon: '💰', desc: 'Comfortable, affordable options' }
                            */}
                            {['Luxury Hotels', 'Boutique Hotels', 'Eco Lodges', 'Budget Friendly'].map((label, index) => (
                                <label key={index} className="flex items-start gap-3 cursor-pointer hover:bg-white/70 p-3 rounded transition-all">
                                    <input 
                                        type="radio" 
                                        name="accommodation" 
                                        className="accent-brand-primary w-5 h-5 mt-1 border-2 border-gray-300 focus:ring-2 focus:ring-brand-primary/20" 
                                        checked={accommodation === label}
                                        onChange={() => handleAccommodationChange(label)}
                                    /> 
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg">{/* {option.icon} */}</span>
                                            <span className="text-sm font-medium text-gray-700">{label}</span>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1 ml-6">{/* {option.desc} */}</p>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>
                    {errors.accommodation && <p className="text-red-500 text-xs mt-1">{errors.accommodation}</p>}
                    {!errors.accommodation && accommodation && (
                        <p className="text-green-600 text-xs mt-1">
                            ✓ {accommodation} selected
                        </p>
                    )}
                </div>
            </div>

            {/* Additional preferences */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <label className="block text-sm font-semibold mb-2">Additional Preferences (Optional)</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-medium mb-1">Travel Style</label>
                        <select className="w-full border border-border-light rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all bg-white">
                            <option value="">Select travel style</option>
                            <option value="relaxed">Relaxed & Leisurely</option>
                            <option value="active">Active & Adventurous</option>
                            <option value="cultural">Cultural Immersion</option>
                            <option value="mixed">Mixed Activities</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-medium mb-1">Budget Range (USD)</label>
                        <select className="w-full border border-border-light rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all bg-white">
                            <option value="">Select budget range</option>
                            <option value="budget">$50-100 per day</option>
                            <option value="mid">$100-200 per day</option>
                            <option value="premium">$200-350 per day</option>
                            <option value="luxury">$350+ per day</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Form validation status */}
            <div className="mt-4 p-3 rounded-lg bg-gray-50">
                <div className="flex items-center gap-2">
                    {isFormValid() ? (
                        <>
                            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                            </svg>
                            <span className="text-green-700 text-sm font-medium">Tour preferences are complete</span>
                        </>
                    ) : (
                        <>
                            <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                            </svg>
                            <span className="text-orange-700 text-sm font-medium">Please complete all required preferences</span>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}
