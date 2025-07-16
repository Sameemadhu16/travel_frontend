import React from 'react';
import { useTourContext } from '../../../context/TourContext';

export default function TourPreferences() {
    const {
        tourPreferences,
        updateTourPreferences,
        errors,
        touched,
        setFieldError,
        setFieldTouched
    } = useTourContext();

    const validateInterests = (interestList) => {
        return interestList.length === 0 ? 'Please select at least one interest' : '';
    };

    const validateAccommodation = (value) => {
        return !value ? 'Please select an accommodation preference' : '';
    };

    const handleInterestChange = (interest) => {
        const newInterests = tourPreferences.interests.includes(interest) 
            ? tourPreferences.interests.filter(item => item !== interest)
            : [...tourPreferences.interests, interest];
        
        updateTourPreferences({ interests: newInterests });
        
        // Validate if touched
        if (touched.interests) {
            const error = validateInterests(newInterests);
            setFieldError('interests', error);
        }
    };

    const handleAccommodationChange = (value) => {
        updateTourPreferences({ accommodation: value });
        
        // Clear error when selection is made
        if (touched.accommodation) {
            setFieldError('accommodation', '');
        }
    };

    const handleInterestsBlur = () => {
        setFieldTouched('interests', true);
        const error = validateInterests(tourPreferences.interests);
        setFieldError('interests', error);
    };

    const handleAccommodationBlur = () => {
        setFieldTouched('accommodation', true);
        const error = validateAccommodation(tourPreferences.accommodation);
        setFieldError('accommodation', error);
    };

    const isFormValid = () => {
        return tourPreferences.interests.length > 0 && tourPreferences.accommodation !== '';
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
                            {[
                                { value: 'cultural', label: 'Cultural Sites & Temples', icon: '🏛️' },
                                { value: 'wildlife', label: 'Wildlife & Safari', icon: '🦁' },
                                { value: 'beaches', label: 'Beaches & Coastal Areas', icon: '🏖️' },
                                { value: 'tea', label: 'Tea Plantations & Hill Country', icon: '🍃' },
                                { value: 'temples', label: 'Ancient Temples & Ruins', icon: '🏯' },
                                { value: 'adventure', label: 'Adventure Activities', icon: '🏔️' },
                                { value: 'nature', label: 'National Parks & Nature', icon: '🌿' },
                                { value: 'waterfalls', label: 'Waterfalls & Scenic Views', icon: '💧' },
                                { value: 'spice', label: 'Spice Gardens & Plantations', icon: '🌿' },
                                { value: 'train', label: 'Scenic Train Journeys', icon: '🚂' },
                                { value: 'fishing', label: 'Fishing & Water Sports', icon: '🎣' },
                                { value: 'ayurveda', label: 'Ayurveda & Wellness', icon: '🧘' },
                                { value: 'photography', label: 'Photography Tours', icon: '📸' },
                                { value: 'local', label: 'Local Villages & Communities', icon: '🏘️' },
                                { value: 'food', label: 'Food & Culinary Experiences', icon: '🍛' }
                            ].map((interest, index) => (
                                <label key={index} className="flex items-center gap-3 cursor-pointer hover:bg-white/70 p-2 rounded transition-all">
                                    <input 
                                        type="checkbox" 
                                        className="accent-brand-primary w-5 h-5 rounded border-2 border-gray-300 focus:ring-2 focus:ring-brand-primary/20" 
                                        checked={tourPreferences.interests.includes(interest.value)}
                                        onChange={() => handleInterestChange(interest.value)}
                                    /> 
                                    <span className="text-lg">{interest.icon}</span>
                                    <span className="text-sm font-medium text-gray-700">{interest.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    {errors.interests && <p className="text-red-500 text-xs mt-1">{errors.interests}</p>}
                    {!errors.interests && tourPreferences.interests.length > 0 && (
                        <p className="text-green-600 text-xs mt-1">
                            ✓ {tourPreferences.interests.length} interest{tourPreferences.interests.length > 1 ? 's' : ''} selected
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
                            {[
                                { value: 'luxury', label: 'Luxury Hotels', icon: '⭐', desc: '5-star premium accommodations with world-class amenities' },
                                { value: 'boutique', label: 'Boutique Hotels', icon: '🏨', desc: 'Unique, stylish properties with personalized service' },
                                { value: 'eco', label: 'Eco Lodges', icon: '🌿', desc: 'Sustainable, nature-focused stays with eco-friendly practices' },
                                { value: 'heritage', label: 'Heritage Hotels', icon: '🏰', desc: 'Historic properties with traditional charm and character' },
                                { value: 'resort', label: 'Beach Resorts', icon: '🏖️', desc: 'Oceanfront resorts with beach access and water activities' },
                                { value: 'budget', label: 'Budget Friendly', icon: '💰', desc: 'Comfortable, affordable options with essential amenities' },
                                { value: 'villa', label: 'Private Villas', icon: '🏡', desc: 'Exclusive villas with privacy and personalized service' },
                                { value: 'treehouses', label: 'Treehouses & Unique', icon: '🌳', desc: 'Unique accommodations like treehouses and glamping' }
                            ].map((option, index) => (
                                <label key={index} className="flex items-start gap-3 cursor-pointer hover:bg-white/70 p-3 rounded transition-all">
                                    <input 
                                        type="radio" 
                                        name="accommodation" 
                                        className="accent-brand-primary w-5 h-5 mt-1 border-2 border-gray-300 focus:ring-2 focus:ring-brand-primary/20" 
                                        checked={tourPreferences.accommodation === option.value}
                                        onChange={() => handleAccommodationChange(option.value)}
                                    /> 
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg">{option.icon}</span>
                                            <span className="text-sm font-medium text-gray-700">{option.label}</span>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1 ml-6">{option.desc}</p>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>
                    {errors.accommodation && <p className="text-red-500 text-xs mt-1">{errors.accommodation}</p>}
                    {!errors.accommodation && tourPreferences.accommodation && (
                        <p className="text-green-600 text-xs mt-1">
                            ✓ {tourPreferences.accommodation} selected
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
                        <select 
                            name="travelStyle"
                            value={tourPreferences.travelStyle || ''}
                            onChange={(e) => updateTourPreferences({ travelStyle: e.target.value })}
                            className="w-full border border-border-light rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all bg-white"
                        >
                            <option value="">Select travel style</option>
                            <option value="relaxed">🌅 Relaxed & Leisurely</option>
                            <option value="active">⚡ Active & Adventurous</option>
                            <option value="cultural">🏛️ Cultural Immersion</option>
                            <option value="mixed">🎯 Mixed Activities</option>
                            <option value="luxury">💎 Luxury & Comfort</option>
                            <option value="backpacker">🎒 Backpacker Style</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-medium mb-1">Budget Range (USD per day)</label>
                        <select 
                            name="budgetRange"
                            value={tourPreferences.budgetRange || ''}
                            onChange={(e) => updateTourPreferences({ budgetRange: e.target.value })}
                            className="w-full border border-border-light rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all bg-white"
                        >
                            <option value="">Select budget range</option>
                            <option value="budget">💰 $30-60 per day (Budget)</option>
                            <option value="mid-low">🏨 $60-100 per day (Standard)</option>
                            <option value="mid">✨ $100-200 per day (Comfort)</option>
                            <option value="premium">👑 $200-350 per day (Premium)</option>
                            <option value="luxury">💎 $350-500+ per day (Luxury)</option>
                            <option value="ultra">🌟 $500+ per day (Ultra Luxury)</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-medium mb-1">Group Activity Level</label>
                        <select 
                            name="activityLevel"
                            value={tourPreferences.activityLevel || ''}
                            onChange={(e) => updateTourPreferences({ activityLevel: e.target.value })}
                            className="w-full border border-border-light rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all bg-white"
                        >
                            <option value="">Select activity level</option>
                            <option value="low">🚶 Low (Minimal walking, comfortable pace)</option>
                            <option value="moderate">🚶‍♂️ Moderate (Some walking, easy activities)</option>
                            <option value="active">🏃 Active (Regular walking, outdoor activities)</option>
                            <option value="high">🏋️ High (Intense activities, long hikes)</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-medium mb-1">Dining Preference</label>
                        <select 
                            name="diningPreference"
                            value={tourPreferences.diningPreference || ''}
                            onChange={(e) => updateTourPreferences({ diningPreference: e.target.value })}
                            className="w-full border border-border-light rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all bg-white"
                        >
                            <option value="">Select dining preference</option>
                            <option value="local">🍛 Local Sri Lankan Cuisine</option>
                            <option value="international">🌍 International Cuisine</option>
                            <option value="mixed">🍽️ Mix of Local & International</option>
                            <option value="vegetarian">🥗 Vegetarian Focused</option>
                            <option value="vegan">🌱 Vegan Options Required</option>
                            <option value="halal">🕌 Halal Requirements</option>
                            <option value="gluten-free">🌾 Gluten-Free Options</option>
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
