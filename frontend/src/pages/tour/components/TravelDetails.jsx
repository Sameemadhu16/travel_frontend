import React, { useState } from 'react';
import { useTourContext } from '../../../context/TourContext';

export default function TravelDetails() {
    const { 
        travelDetails, 
        itinerary,
        updateTravelDetails,
        updateItinerary,
        addItineraryDay,
        removeItineraryDay,
        addItineraryActivity,
        removeItineraryActivity,
        updateItineraryActivity,
        errors: contextErrors,
        touched: contextTouched,
        setFieldError,
        clearFieldError,
        setFieldTouched
    } = useTourContext();

    const [localErrors, setLocalErrors] = useState({});
    const [localTouched, setLocalTouched] = useState({});

    // Use context errors and touched, fallback to local state
    const errors = { ...localErrors, ...contextErrors };
    const touched = { ...localTouched, ...contextTouched };

    const validateField = (name, value) => {
        let error = '';
        
        switch (name) {
            case 'destination':
                if (!value) {
                    error = 'Please select a destination package';
                }
                break;
                
            case 'duration':
                if (!value) {
                    error = 'Please select trip duration';
                }
                break;

            case 'travelStyle':
                if (!value) {
                    error = 'Please select your preferred travel style';
                }
                break;
                
            case 'startDate':
                if (!value) {
                    error = 'Start date is required';
                } else {
                    const selectedDate = new Date(value);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    if (selectedDate < today) {
                        error = 'Start date cannot be in the past';
                    }
                }
                break;
                
            case 'location':
                if (!value.trim()) {
                    error = 'Pickup location is required';
                } else if (value.trim().length < 3) {
                    error = 'Location must be at least 3 characters';
                }
                break;
                
            case 'time':
                if (!value) {
                    error = 'Pickup time is required';
                }
                break;                case 'adults':
                if (!value || value < 1) {
                    error = 'At least 1 adult is required';
                }
                break;

            case 'groupType':
                // Optional field, no validation required
                break;
        }
        
        return error;
    };

    const validateItinerary = () => {
        let hasError = false;
        
        for (let dayIndex = 0; dayIndex < itinerary.length; dayIndex++) {
            const day = itinerary[dayIndex];
            for (let activityIndex = 0; activityIndex < day.activities.length; activityIndex++) {
                const activity = day.activities[activityIndex];
                if (!activity.title.trim() || !activity.time || !activity.description.trim()) {
                    hasError = true;
                    break;
                }
            }
            if (hasError) break;
        }
        
        return hasError ? 'Please complete all itinerary activities' : '';
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        updateTravelDetails({ [name]: value });

        // Validate field on change if it has been touched
        if (touched[name]) {
            const error = validateField(name, value);
            setFieldError(name, error);
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setFieldTouched(name, true);

        const error = validateField(name, value);
        setFieldError(name, error);
    };

    const isFormValid = () => {
        const requiredFields = ['destination', 'duration', 'travelStyle', 'startDate', 'location', 'time', 'adults'];
        const hasFieldErrors = requiredFields.some(field => {
            const error = validateField(field, travelDetails[field]);
            return error || !travelDetails[field];
        });
        
        const itineraryError = validateItinerary();
        
        return !hasFieldErrors && !itineraryError;
    };

    const addDay = () => {
        addItineraryDay();
    };

    const addActivity = (dayIndex) => {
        addItineraryActivity(dayIndex);
    };

    const updateActivity = (dayIndex, activityIndex, field, value) => {
        updateItineraryActivity(dayIndex, activityIndex, field, value);
    };

    const removeDay = (dayIndex) => {
        removeItineraryDay(dayIndex);
    };

    const removeActivity = (dayIndex, activityIndex) => {
        removeItineraryActivity(dayIndex, activityIndex);
    };

    return (
        <section className="bg-white rounded-xl shadow p-6 border border-brand-accent border-l-4 border-l-brand-primary">
            <div className="flex items-center gap-2 mb-4">
                <span className="bg-brand-primary text-white px-3 py-1 rounded font-semibold flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                    </svg>
                    Step 1: Travel Details
                </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-semibold mb-1">
                        Destination <span className="text-red-500">*</span>
                    </label>
                    <select 
                        name="destination"
                        value={travelDetails.destination}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none transition-all ${
                            errors.destination ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' : 
                            'border-border-light focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20'
                        }`}
                        required
                    >
                        <option value="">Select Destination Package</option>
                        
                        {/* Day Trip Options (1 day) */}
                        <optgroup label="Day Trips (1 Day)">
                            <option value="colombo-city">Colombo City Tour</option>
                            <option value="kandy-day">Kandy Day Trip</option>
                            <option value="galle-day">Galle Fort & Southern Coast</option>
                            <option value="pinnawala-kandy">Pinnawala Elephant Orphanage & Kandy</option>
                            <option value="bentota-day">Bentota Beach Day Trip</option>
                        </optgroup>

                        {/* Short Tours (2-3 days) */}
                        <optgroup label="Short Getaways (2-3 Days)">
                            <option value="kandy-nuwara">Kandy & Nuwara Eliya</option>
                            <option value="southern-beaches">Southern Beaches (Galle, Mirissa, Unawatuna)</option>
                            <option value="sigiriya-dambulla">Sigiriya & Dambulla Cultural Tour</option>
                            <option value="ella-adventure">Ella Adventure (Train Journey & Hiking)</option>
                            <option value="yala-safari">Yala National Park Safari</option>
                            <option value="negombo-colombo">Negombo & Colombo</option>
                        </optgroup>

                        {/* Medium Tours (4-7 days) */}
                        <optgroup label="Classic Tours (4-7 Days)">
                            <option value="cultural-triangle">Cultural Triangle (Anuradhapura, Polonnaruwa, Sigiriya)</option>
                            <option value="hill-country">Hill Country Explorer (Kandy, Nuwara Eliya, Ella)</option>
                            <option value="south-west-coast">South West Coast (Colombo to Galle)</option>
                            <option value="central-highlands">Central Highlands & Tea Country</option>
                            <option value="wildlife-adventure">Wildlife & Adventure (Yala, Udawalawe, Sinharaja)</option>
                            <option value="beaches-culture">Beaches & Culture Combo</option>
                            <option value="ancient-kingdoms">Ancient Kingdoms Tour</option>
                        </optgroup>

                        {/* Extended Tours (8-14 days) */}
                        <optgroup label="Extended Tours (8-14 Days)">
                            <option value="grand-tour">Grand Sri Lanka Tour</option>
                            <option value="complete-island">Complete Island Experience</option>
                            <option value="cultural-nature">Cultural Sites & Nature Reserves</option>
                            <option value="coast-to-mountains">Coast to Mountains Adventure</option>
                            <option value="photography-tour">Photography Expedition</option>
                            <option value="ayurveda-wellness">Ayurveda & Wellness Journey</option>
                            <option value="adventure-explorer">Adventure Explorer Tour</option>
                        </optgroup>

                        {/* Luxury Tours (10+ days) */}
                        <optgroup label="Luxury & Special Interest (10+ Days)">
                            <option value="luxury-sri-lanka">Luxury Sri Lanka Experience</option>
                            <option value="honeymoon-special">Honeymoon Special Tour</option>
                            <option value="family-adventure">Family Adventure Package</option>
                            <option value="wildlife-photography">Wildlife Photography Tour</option>
                            <option value="culinary-journey">Culinary Journey of Sri Lanka</option>
                            <option value="spiritual-tour">Spiritual & Meditation Tour</option>
                            <option value="eco-adventure">Eco-Adventure & Conservation Tour</option>
                        </optgroup>

                        {/* Custom Options */}
                        <optgroup label="Custom Options">
                            <option value="custom-tour">Custom Itinerary (Tell us your preferences)</option>
                            <option value="business-travel">Business Travel Package</option>
                            <option value="educational-tour">Educational/School Group Tour</option>
                        </optgroup>
                    </select>
                    {errors.destination && <p className="text-red-500 text-xs mt-1">{errors.destination}</p>}
                    
                    {/* Destination recommendations based on duration */}
                    {travelDetails.duration && (
                        <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-xs">
                            <span className="font-medium text-blue-800">💡 Recommended for {travelDetails.duration}:</span>
                            <div className="text-blue-700 mt-1">
                                {travelDetails.duration === '1-day' && 
                                    "Day trips perfect for exploring single destinations like Colombo city or Kandy temple complex."
                                }
                                {(travelDetails.duration === '2-days' || travelDetails.duration === '3-days') && 
                                    "Short getaways ideal for nearby destinations or quick cultural experiences like Kandy-Nuwara Eliya or Sigiriya-Dambulla."
                                }
                                {(travelDetails.duration === '4-days' || travelDetails.duration === '5-days' || travelDetails.duration === '6-days' || travelDetails.duration === '7-days') && 
                                    "Classic tours allowing deeper exploration of regions like Cultural Triangle, Hill Country, or South Coast with comfortable pace."
                                }
                                {(travelDetails.duration === '8-days' || travelDetails.duration === '9-days' || travelDetails.duration === '10-days' || travelDetails.duration === '12-days' || travelDetails.duration === '14-days') && 
                                    "Extended tours perfect for comprehensive island exploration, wildlife safaris, and cultural immersion experiences."
                                }
                                {(travelDetails.duration === '16-days' || travelDetails.duration === '18-days' || travelDetails.duration === '21-days') && 
                                    "Luxury tours allowing in-depth exploration, multiple activities per location, and relaxed travel pace with premium experiences."
                                }
                            </div>
                        </div>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-1">
                        Duration <span className="text-red-500">*</span>
                    </label>
                    <select 
                        name="duration"
                        value={travelDetails.duration}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none transition-all ${
                            errors.duration ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' : 
                            'border-border-light focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20'
                        }`}
                        required
                    >
                        <option value="">Select Duration</option>
                        
                        {/* Day Trips */}
                        <option value="1-day">1 Day (Day Trip)</option>
                        
                        {/* Short Trips */}
                        <option value="2-days">2 Days / 1 Night</option>
                        <option value="3-days">3 Days / 2 Nights</option>
                        
                        {/* Medium Trips */}
                        <option value="4-days">4 Days / 3 Nights</option>
                        <option value="5-days">5 Days / 4 Nights</option>
                        <option value="6-days">6 Days / 5 Nights</option>
                        <option value="7-days">7 Days / 6 Nights (1 Week)</option>
                        
                        {/* Extended Trips */}
                        <option value="8-days">8 Days / 7 Nights</option>
                        <option value="9-days">9 Days / 8 Nights</option>
                        <option value="10-days">10 Days / 9 Nights</option>
                        <option value="12-days">12 Days / 11 Nights</option>
                        <option value="14-days">14 Days / 13 Nights (2 Weeks)</option>
                        
                        {/* Long Tours */}
                        <option value="16-days">16 Days / 15 Nights</option>
                        <option value="18-days">18 Days / 17 Nights</option>
                        <option value="21-days">21 Days / 20 Nights (3 Weeks)</option>
                        
                        {/* Custom */}
                        <option value="custom">Custom Duration (Contact us)</option>
                    </select>
                    {errors.duration && <p className="text-red-500 text-xs mt-1">{errors.duration}</p>}
                    
                    {/* Duration information */}
                    {travelDetails.duration && (
                        <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded text-xs">
                            <span className="font-medium text-green-800">ℹ️ What's included in {travelDetails.duration}:</span>
                            <div className="text-green-700 mt-1">
                                {travelDetails.duration === '1-day' && 
                                    "Transportation, guide, entrance fees, lunch. Perfect for exploring one main attraction with nearby sites."
                                }
                                {(travelDetails.duration === '2-days' || travelDetails.duration === '3-days') && 
                                    "Accommodation, meals, transportation, guide, entrance fees. Ideal for 2-3 main destinations with comfortable travel."
                                }
                                {(travelDetails.duration === '4-days' || travelDetails.duration === '5-days' || travelDetails.duration === '6-days' || travelDetails.duration === '7-days') && 
                                    "Hotels, all meals, AC transport, expert guide, entrance fees, airport transfers. Perfect for exploring 1-2 regions thoroughly."
                                }
                                {(travelDetails.duration === '8-days' || travelDetails.duration === '9-days' || travelDetails.duration === '10-days' || travelDetails.duration === '12-days' || travelDetails.duration === '14-days') && 
                                    "Premium hotels, all meals, luxury transport, expert guide, all fees, multiple activities. Covers 3-4 major regions."
                                }
                                {(travelDetails.duration === '16-days' || travelDetails.duration === '18-days' || travelDetails.duration === '21-days') && 
                                    "Luxury accommodations, gourmet dining, premium vehicles, specialist guides, exclusive experiences, complete island coverage."
                                }
                            </div>
                        </div>
                    )}
                </div>
                
                {/* Travel Style/Budget */}
                <div>
                    <label className="block text-sm font-semibold mb-1">
                        Travel Style <span className="text-red-500">*</span>
                    </label>
                    <select 
                        name="travelStyle"
                        value={travelDetails.travelStyle || ''}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none transition-all ${
                            errors.travelStyle ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' : 
                            'border-border-light focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20'
                        }`}
                        required
                    >
                        <option value="">Select Travel Style</option>
                        <option value="budget">💰 Budget (Economy hotels, local transport)</option>
                        <option value="standard">🏨 Standard (3-star hotels, AC vehicle)</option>
                        <option value="comfort">✨ Comfort (4-star hotels, premium vehicle)</option>
                        <option value="luxury">👑 Luxury (5-star hotels, luxury vehicle)</option>
                        <option value="premium">💎 Premium (Boutique hotels, exclusive experiences)</option>
                    </select>
                    {errors.travelStyle && <p className="text-red-500 text-xs mt-1">{errors.travelStyle}</p>}
                </div>

                {/* Group Type */}
                <div>
                    <label className="block text-sm font-semibold mb-1">
                        Group Type
                    </label>
                    <select 
                        name="groupType"
                        value={travelDetails.groupType || ''}
                        onChange={handleInputChange}
                        className="w-full border border-border-light rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
                    >
                        <option value="">Select Group Type</option>
                        <option value="family">👨‍👩‍👧‍👦 Family with Children</option>
                        <option value="couple">💑 Couple/Honeymoon</option>
                        <option value="friends">👥 Friends Group</option>
                        <option value="solo">🧑 Solo Traveler</option>
                        <option value="business">💼 Business/Corporate</option>
                        <option value="elderly">👴 Senior Citizens</option>
                        <option value="adventure">🏃 Adventure Seekers</option>
                        <option value="cultural">🏛️ Cultural Enthusiasts</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-1">
                        Start Date <span className="text-red-500">*</span>
                    </label>
                    <input 
                        type="date" 
                        name="startDate"
                        value={travelDetails.startDate}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        min={new Date().toISOString().split('T')[0]}
                        className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none transition-all ${
                            errors.startDate ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' : 
                            'border-border-light focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20'
                        }`}
                        required
                    />
                    {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>}
                </div>
                
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-semibold mb-1">Adults</label>
                        <div className="flex items-center gap-2">
                            <button 
                                type="button"
                                onClick={() => updateTravelDetails({ adults: Math.max(1, travelDetails.adults - 1) })}
                                className="bg-surface-secondary hover:bg-surface-tertiary px-3 py-2 rounded text-sm font-semibold"
                            >
                                -
                            </button>
                            <input 
                                type="number" 
                                min="1" 
                                name="adults"
                                value={travelDetails.adults}
                                onChange={handleInputChange}
                                className="w-16 text-center border border-border-light rounded px-2 py-2 text-sm focus:outline-none focus:border-brand-primary" 
                            />
                            <button 
                                type="button"
                                onClick={() => updateTravelDetails({ adults: travelDetails.adults + 1 })}
                                className="bg-surface-secondary hover:bg-surface-tertiary px-3 py-2 rounded text-sm font-semibold"
                            >
                                +
                            </button>
                        </div>
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-semibold mb-1">Children</label>
                        <div className="flex items-center gap-2">
                            <button 
                                type="button"
                                onClick={() => updateTravelDetails({ children: Math.max(0, travelDetails.children - 1) })}
                                className="bg-surface-secondary hover:bg-surface-tertiary px-3 py-2 rounded text-sm font-semibold"
                            >
                                -
                            </button>
                            <input 
                                type="number" 
                                min="0" 
                                name="children"
                                value={travelDetails.children}
                                onChange={handleInputChange}
                                className="w-16 text-center border border-border-light rounded px-2 py-2 text-sm focus:outline-none focus:border-brand-primary" 
                            />
                            <button 
                                type="button"
                                onClick={() => updateTravelDetails({ children: travelDetails.children + 1 })}
                                className="bg-surface-secondary hover:bg-surface-tertiary px-3 py-2 rounded text-sm font-semibold"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-1">
                        Pickup Location <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="location"
                        value={travelDetails.location}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder="Enter pickup location (e.g., Hotel name, Address)"
                        className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none transition-all ${
                            errors.location ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' : 
                            'border-border-light focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20'
                        }`}
                        required
                    />
                    {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-1">
                        Pickup Time <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="time"
                        name="time"
                        value={travelDetails.time}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none transition-all ${
                            errors.time ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' : 
                            'border-border-light focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20'
                        }`}
                        required
                    />
                    {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
                </div>
            </div>
            <div className="mb-2 flex items-center justify-between">
                <span className="font-semibold text-brand-primary">
                    Itinerary <span className="text-red-500">*</span>
                </span>
                <button 
                    type="button" 
                    onClick={addDay}
                    className="bg-brand-primary text-white px-3 py-1 rounded text-xs font-semibold hover:bg-warning transition"
                >
                    Add Day +
                </button>
            </div>
            {itinerary.map((day, dayIndex) => (
                <div key={dayIndex} className="bg-brand-light rounded-lg border border-brand-secondary border-l-4 border-l-brand-primary p-4 mb-2">
                    <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-brand-primary">Day {day.day} Activities</span>
                        <div className="flex gap-2">
                            <button 
                                type="button" 
                                onClick={() => addActivity(dayIndex)}
                                className="bg-brand-primary text-white px-2 py-1 rounded text-xs font-semibold hover:bg-warning transition"
                            >
                                Add Activity +
                            </button>
                            {itinerary.length > 1 && (
                                <button 
                                    type="button" 
                                    onClick={() => removeDay(dayIndex)}
                                    className="bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold hover:bg-red-600 transition"
                                >
                                    Remove Day
                                </button>
                            )}
                        </div>
                    </div>
                    {day.activities.map((activity, activityIndex) => (
                        <div key={activityIndex} className="mb-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                                <div>
                                    <label className="block text-xs font-medium mb-1">Title</label>
                                    <input 
                                        className="w-full border border-border-light rounded px-3 py-2 text-sm focus:outline-none focus:border-brand-primary" 
                                        placeholder="Enter a title"
                                        value={activity.title}
                                        onChange={(e) => updateActivity(dayIndex, activityIndex, 'title', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium mb-1">Time</label>
                                    <input 
                                        type="time" 
                                        className="w-full border border-border-light rounded px-3 py-2 text-sm focus:outline-none focus:border-brand-primary"
                                        value={activity.time}
                                        onChange={(e) => updateActivity(dayIndex, activityIndex, 'time', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="relative">
                                <label className="block text-xs font-medium mb-1">Description</label>
                                <div className="flex gap-2">
                                    <textarea 
                                        className="flex-1 border border-border-light rounded px-3 py-2 text-sm focus:outline-none focus:border-brand-primary" 
                                        placeholder="Add a description"
                                        rows="2"
                                        value={activity.description}
                                        onChange={(e) => updateActivity(dayIndex, activityIndex, 'description', e.target.value)}
                                    />
                                    {day.activities.length > 1 && (
                                        <button 
                                            type="button" 
                                            onClick={() => removeActivity(dayIndex, activityIndex)}
                                            className="bg-danger text-white px-2 py-1 rounded text-xs font-semibold hover:bg-red-600 transition self-end"
                                        >
                                            ×
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
            
            {/* Form validation status */}
            <div className="mt-4 p-3 rounded-lg bg-gray-50">
                <div className="flex items-center gap-2">
                    {isFormValid() ? (
                        <>
                            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                            </svg>
                            <span className="text-green-700 text-sm font-medium">All travel details are completed</span>
                        </>
                    ) : (
                        <>
                            <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                            </svg>
                            <span className="text-orange-700 text-sm font-medium">Please complete all required fields and itinerary details</span>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}