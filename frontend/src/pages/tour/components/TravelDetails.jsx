import { useState, useContext, useEffect, useCallback } from 'react';
import FormContext from '../../../context/InitialValues';
import CustomSelector from '../../../components/CustomSelector';
import { districts, touristAttractions, provinces } from '../../../core/Lists/location';



export default function TravelDetails({setValid}) {
    const { formData, setFormData } = useContext(FormContext);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const { travelDetails, itinerary } = formData;

  
    

    const setFieldTouched = (field) => {
        setTouched(prev => ({ ...prev, [field]: true }));
    };

    const setFieldError = (field, error) => {
        setErrors(prev => ({ ...prev, [field]: error }));
    };

    const validateField = (name, value) => {
        let error = '';
        
        switch (name) {
            case 'destination':
                if (!value) error = 'Please select a destination package';
                break;
            case 'duration':
                if (!value) error = 'Please select trip duration';
                break;
            case 'travelStyle':
                if (!value) error = 'Please select your preferred travel style';
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
                if (!value) error = 'Pickup time is required';
                break;
            case 'adults':
                if (!value || value < 1) error = 'At least 1 adult is required';
                break;
            case 'groupType':
                break;
        }
        
        return error;
    };

    const validateItinerary = useCallback(() => {
        let hasError = false;
        
        for (let dayIndex = 0; dayIndex < itinerary.length; dayIndex++) {
            const day = itinerary[dayIndex];
            for (let activityIndex = 0; activityIndex < day.activities.length; activityIndex++) {
                const activity = day.activities[activityIndex];
                
                // Check if district is selected
                if (!activity.districtId) {
                    hasError = true;
                    break;
                }
                
                // Check if activity/attraction is selected
                if (!activity.attractionId) {
                    hasError = true;
                    break;
                }
                
                // If "other" is selected, check if custom activity is provided
                if (activity.attractionId === 'other' && !activity.customActivity?.trim()) {
                    hasError = true;
                    break;
                }
            }
            if (hasError) break;
        }
        
        return hasError ? 'Please complete all itinerary activities (select district and activity for each)' : '';
    }, [itinerary]);

    const isFormValid = useCallback(() => {
        const requiredFields = ['duration', 'travelStyle', 'startDate', 'location', 'time', 'adults'];
        const hasFieldErrors = requiredFields.some(field => {
            const error = validateField(field, travelDetails[field]);
            return error || !travelDetails[field];
        });
        
        const itineraryError = validateItinerary();
        
        return !hasFieldErrors && !itineraryError;
    }, [travelDetails, validateItinerary]);

    useEffect(() => {
        const valid = isFormValid();
        setValid(valid);
    }, [formData.travelDetails, formData.itinerary, errors, setValid, isFormValid]);

    const updateTravelDetails = (updates) => {
        setFormData(prev => {
            const newFormData = {
                ...prev,
                travelDetails: {
                    ...prev.travelDetails,
                    ...updates
                }
            };
            
            // Clear localStorage to prevent conflicts
            localStorage.removeItem('tour_form_data');
            
            return newFormData;
        });
    };

    const updateItinerary = useCallback((newItinerary) => {
        setFormData(prev => {
            const newFormData = {
                ...prev,
                itinerary: newItinerary
            };
            
            // Clear localStorage to prevent conflicts
            localStorage.removeItem('tour_form_data');
            
            return newFormData;
        });
    }, [setFormData]);

    const addItineraryDay = () => {
        const newDay = { 
            day: itinerary.length + 1, 
            activities: [{ title: '', time: '', description: '', districtId: '', attractionId: '', customActivity: '' }] 
        };
        updateItinerary([...itinerary, newDay]);
    };

    const addItineraryActivity = (dayIndex) => {
        const currentDay = itinerary[dayIndex];
        
        // Check if maximum activities (3) reached
        if (currentDay.activities.length >= 3) {
            return; // Don't add more activities
        }
        
        const newItinerary = [...itinerary];
        // Add new activity with empty fields (don't force same district, let user choose within province)
        newItinerary[dayIndex].activities.push({ 
            title: '', 
            time: '', 
            description: '', 
            districtId: '', // Let user choose district within the same province
            attractionId: '', 
            customActivity: '' 
        });
        updateItinerary(newItinerary);
    };

    const removeItineraryDay = (dayIndex) => {
        const newItinerary = itinerary.filter((_, index) => index !== dayIndex);
        // Update day numbers after removal
        const updatedItinerary = newItinerary.map((day, index) => ({
            ...day,
            day: index + 1
        }));
        updateItinerary(updatedItinerary);
    };

    const removeItineraryActivity = (dayIndex, activityIndex) => {
        const newItinerary = [...itinerary];
        newItinerary[dayIndex].activities = newItinerary[dayIndex].activities.filter(
            (_, index) => index !== activityIndex
        );
        updateItinerary(newItinerary);
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
        setFieldTouched(name);
        const error = validateField(name, value);
        setFieldError(name, error);
    };

    // Add terms and conditions checkbox
    const handleTermsChange = (e) => {
        const { checked } = e.target;
        updateTravelDetails({ agreedToTerms: checked });
    };

    // Auto-adjust itinerary days based on duration selection
    useEffect(() => {
        const duration = travelDetails.duration;
        if (!duration || duration === 'custom') return;

        // Extract number of days from duration string
        const getDaysFromDuration = (duration) => {
            const match = duration.match(/(\d+)-day/);
            return match ? parseInt(match[1]) : 0;
        };

        const requiredDays = getDaysFromDuration(duration);
        const currentDays = itinerary.length;
        
        if (requiredDays > 0 && requiredDays !== currentDays) {
            // Create new itinerary array with the correct number of days
            const newItinerary = [];
            
            for (let i = 0; i < requiredDays; i++) {
                // Keep existing day data if available, otherwise create new day
                const existingDay = itinerary[i];
                newItinerary.push({
                    day: i + 1,
                    activities: existingDay?.activities?.length > 0 
                        ? existingDay.activities 
                        : [{ title: '', time: '', description: '', districtId: '', attractionId: '', customActivity: '' }]
                });
            }
            
            updateItinerary(newItinerary);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [travelDetails.duration, updateItinerary]); // Intentionally excluding itinerary to prevent infinite loops

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
                        Duration <span className="text-red-500">*</span>
                    </label>
                    <select 
                        name="duration"
                        value={travelDetails.duration || ''}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none transition-all ${
                            errors.duration ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' : 
                            'border-border-light focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20'
                        }`}
                        required
                    >
                        <option value="">Select Duration</option>
                        <option value="1-day">1 Day (Day Trip)</option>
                        <option value="2-days">2 Days / 1 Night</option>
                        <option value="3-days">3 Days / 2 Nights</option>
                        <option value="4-days">4 Days / 3 Nights</option>
                        <option value="5-days">5 Days / 4 Nights</option>
                        <option value="6-days">6 Days / 5 Nights</option>
                        <option value="7-days">7 Days / 6 Nights (1 Week)</option>
                        <option value="8-days">8 Days / 7 Nights</option>
                        <option value="9-days">9 Days / 8 Nights</option>
                        <option value="10-days">10 Days / 9 Nights</option>
                        <option value="12-days">12 Days / 11 Nights</option>
                        <option value="14-days">14 Days / 13 Nights (2 Weeks)</option>
                        <option value="16-days">16 Days / 15 Nights</option>
                        <option value="18-days">18 Days / 17 Nights</option>
                        <option value="21-days">21 Days / 20 Nights (3 Weeks)</option>
                        <option value="custom">Custom Duration (Contact us)</option>
                    </select>
                    {errors.duration && <p className="text-red-500 text-xs mt-1">{errors.duration}</p>}
                    
                    {travelDetails.duration && (
                        <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded text-xs">
                            <span className="font-medium text-green-800">ℹ️ What&apos;s included in {travelDetails.duration}:</span>
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
                        value={travelDetails.startDate || ''}
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
                                onClick={() => updateTravelDetails({ adults: Math.max(1, (travelDetails.adults || 1) - 1) })}
                                className="bg-surface-secondary hover:bg-surface-tertiary px-3 py-2 rounded text-sm font-semibold"
                            >
                                -
                            </button>
                            <input 
                                type="number" 
                                min="1" 
                                name="adults"
                                value={travelDetails.adults || 1}
                                onChange={handleInputChange}
                                className="w-16 text-center border border-border-light rounded px-2 py-2 text-sm focus:outline-none focus:border-brand-primary" 
                            />
                            <button 
                                type="button"
                                onClick={() => updateTravelDetails({ adults: (travelDetails.adults || 1) + 1 })}
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
                                onClick={() => updateTravelDetails({ children: Math.max(0, (travelDetails.children || 0) - 1 )})}
                                className="bg-surface-secondary hover:bg-surface-tertiary px-3 py-2 rounded text-sm font-semibold"
                            >
                                -
                            </button>
                            <input 
                                type="number" 
                                min="0" 
                                name="children"
                                value={travelDetails.children || 0}
                                onChange={handleInputChange}
                                className="w-16 text-center border border-border-light rounded px-2 py-2 text-sm focus:outline-none focus:border-brand-primary" 
                            />
                            <button 
                                type="button"
                                onClick={() => updateTravelDetails({ children: (travelDetails.children || 0) + 1 })}
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
                        value={travelDetails.location || ''}
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
                        value={travelDetails.time || ''}
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
                    {travelDetails.duration && travelDetails.duration !== 'custom' && (
                        <span className="text-sm font-normal text-gray-600 ml-2">
                            (Auto-managed based on {travelDetails.duration})
                        </span>
                    )}
                </span>
                {(!travelDetails.duration || travelDetails.duration === 'custom') && (
                    <button 
                        type="button" 
                        onClick={addItineraryDay}
                        className="bg-brand-primary text-white px-3 py-1 rounded text-xs font-semibold hover:bg-warning transition"
                    >
                        Add Day +
                    </button>
                )}
            </div>
            
            {/* Itinerary Guidelines */}
            <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                    <strong>Guidelines:</strong> 
                    {travelDetails.duration && travelDetails.duration !== 'custom' 
                        ? ` Days are automatically set based on your selected duration (${travelDetails.duration}). Each day can have maximum 3 activities.`
                        : ' Each day can have maximum 3 activities. All activities in the same day must be within the same province for practical travel planning.'
                    }
                </p>
            </div>
            {itinerary.map((day, dayIndex) => (
                <div key={dayIndex} className="bg-brand-light rounded-lg border border-brand-secondary border-l-4 border-l-brand-primary p-4 mb-2">
                    <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-brand-primary">Day {day.day} Activities</span>
                        <div className="flex gap-2">
                            <button 
                                type="button" 
                                onClick={() => addItineraryActivity(dayIndex)}
                                disabled={day.activities.length >= 3}
                                className={`px-2 py-1 rounded text-xs font-semibold transition ${
                                    day.activities.length >= 3 
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                                        : 'bg-brand-primary text-white hover:bg-warning'
                                }`}
                            >
                                {day.activities.length >= 3 ? 'Max Activities (3)' : 'Add Activity +'}
                            </button>
                            {itinerary.length > 1 && (!travelDetails.duration || travelDetails.duration === 'custom') && (
                                <button 
                                    type="button" 
                                    onClick={() => removeItineraryDay(dayIndex)}
                                    className="bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold hover:bg-red-600 transition"
                                >
                                    Remove Day
                                </button>
                            )}
                        </div>
                    </div>
                    {day.activities.map((activity, activityIndex) => {
                        // Get the district and province of the first activity for this day
                        const firstActivityDistrictId = day.activities[0]?.districtId;
                        const firstActivityDistrict = districts.find(d => d.id === firstActivityDistrictId);
                        const selectedProvinceId = firstActivityDistrict?.provinceId;
                        
                        // Filter districts based on whether this is the first activity or not
                        const availableDistricts = activityIndex === 0 
                            ? districts // First activity can select any district
                            : selectedProvinceId 
                                ? districts.filter(district => district.provinceId === selectedProvinceId)
                                : []; // Subsequent activities are limited to same province

                        return (
                            <div key={activityIndex} className="mb-3 p-3 bg-white rounded border border-brand-accent">
                                <div className="grid grid-cols-1 gap-3">
                                    {/* Activity Number and Province Info */}
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-brand-primary">
                                            Activity {activityIndex + 1}
                                        </span>
                                        {activityIndex > 0 && selectedProvinceId && (
                                            <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                                                Limited to: {provinces.find(p => p.id === selectedProvinceId)?.value}
                                            </span>
                                        )}
                                    </div>

                                    {/* District Selection */}
                                    <div className="w-full">
                                        <CustomSelector
                                            label="District"
                                            options={availableDistricts}
                                            placeholder={
                                                activityIndex === 0 
                                                    ? "Select District" 
                                                    : availableDistricts.length === 0
                                                        ? "Please select district for first activity"
                                                        : `Select District (${provinces.find(p => p.id === selectedProvinceId)?.value})`
                                            }
                                            value={activity.districtId || ''}
                                            onChange={value => {
                                                const districtId = parseInt(value);
                                                const selectedDistrict = districts.find(d => d.id === districtId);
                                                const newItinerary = [...itinerary];
                                                
                                                // Update current activity
                                                newItinerary[dayIndex].activities[activityIndex] = {
                                                    ...activity,
                                                    districtId: districtId,
                                                    attractionId: '', // Reset activity when district changes
                                                    customActivity: '' // Reset custom activity when district changes
                                                };
                                                
                                                // If this is the first activity and we're changing provinces,
                                                // clear all subsequent activities for this day
                                                if (activityIndex === 0) {
                                                    const newProvinceId = selectedDistrict?.provinceId;
                                                    const currentFirstDistrict = districts.find(d => d.id === day.activities[0]?.districtId);
                                                    const currentProvinceId = currentFirstDistrict?.provinceId;
                                                    
                                                    // If province changed, clear subsequent activities
                                                    if (newProvinceId !== currentProvinceId) {
                                                        for (let i = 1; i < day.activities.length; i++) {
                                                            newItinerary[dayIndex].activities[i] = {
                                                                ...newItinerary[dayIndex].activities[i],
                                                                districtId: '',
                                                                attractionId: '',
                                                                customActivity: ''
                                                            };
                                                        }
                                                    }
                                                }
                                                
                                                updateItinerary(newItinerary);
                                                
                                                // Debug: Log the selected district and available activities
                                                console.log('Selected District ID:', districtId);
                                                console.log('Selected District:', selectedDistrict);
                                                const availableAttractions = touristAttractions.filter(attraction => 
                                                    attraction.districtId === districtId
                                                );
                                                console.log('Available attractions for district', districtId, ':', availableAttractions);
                                                console.log('Number of attractions:', availableAttractions.length);
                                            }}
                                            disabled={activityIndex > 0 && !selectedProvinceId}
                                        />
                                    </div>

                                    {/* Activity Selection */}
                                    <div className="w-full">
                                        {/* Show available attractions count for debugging */}
                                        {activity.districtId && (
                                            <div className="mb-2 text-xs text-gray-600">
                                                Available attractions: {touristAttractions.filter(attraction => 
                                                    attraction.districtId === parseInt(activity.districtId)
                                                ).length}
                                            </div>
                                        )}
                                        <CustomSelector
                                            label="Activities"
                                            options={activity.districtId ? [
                                                ...touristAttractions
                                                    .filter(attraction => 
                                                        attraction.districtId === parseInt(activity.districtId)
                                                    )
                                                    .map(attraction => ({
                                                        id: attraction.id,
                                                        value: `${attraction.value} (${attraction.type})`
                                                    })),
                                                { id: 'other', value: 'Other (Custom Activity)' }
                                            ] : []}
                                            placeholder={activity.districtId ? "Select Activity/Attraction" : "Please select a district first"}
                                            value={activity.attractionId || ''}
                                            onChange={value => {
                                                const newItinerary = [...itinerary];
                                                
                                                // Convert value to number if it's a valid attraction ID, keep as string if 'other'
                                                const attractionId = value === 'other' ? 'other' : parseInt(value);
                                                
                                                newItinerary[dayIndex].activities[activityIndex] = {
                                                    ...activity,
                                                    attractionId: attractionId,
                                                    customActivity: value === 'other' ? activity.customActivity : ''
                                                };
                                                updateItinerary(newItinerary);

                                                // Debug: Log the selected activity and current form data
                                                console.log('Selected Activity ID (raw):', value);
                                                console.log('Selected Activity ID (processed):', attractionId);
                                                
                                                // Find and log the selected attraction details
                                                if (value !== 'other') {
                                                    const selectedAttraction = touristAttractions.find(attr => attr.id === parseInt(value));
                                                    console.log('Selected Attraction Details:', selectedAttraction);
                                                }
                                                
                                                console.log('Updated Activity:', newItinerary[dayIndex].activities[activityIndex]);
                                                console.log('Full Day Activities:', newItinerary[dayIndex].activities);
                                            }}
                                            disabled={!activity.districtId}
                                        />

                                        {/* Custom Activity Input - Only shown when "Other" is selected */}
                                        {activity.attractionId === 'other' && (
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    placeholder="Enter your custom activity"
                                                    value={activity.customActivity || ''}
                                                    onChange={(e) => {
                                                        const newItinerary = [...itinerary];
                                                        newItinerary[dayIndex].activities[activityIndex] = {
                                                            ...activity,
                                                            customActivity: e.target.value
                                                        };
                                                        updateItinerary(newItinerary);
                                                    }}
                                                    className="w-full border border-border-light rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* Remove Activity Button */}
                                    {day.activities.length > 1 && (
                                        <div className="flex justify-end">
                                            <button 
                                                type="button" 
                                                onClick={() => removeItineraryActivity(dayIndex, activityIndex)}
                                                className="bg-danger text-white px-3 py-1 rounded text-xs font-semibold hover:bg-red-600 transition"
                                            >
                                                Remove Activity
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            ))}
            
            {/* Add Terms and Conditions section */}
            <div className="mt-4 p-3 rounded-lg bg-blue-50 border border-blue-200">
                <label className="flex items-start gap-3 cursor-pointer">
                    <input
                        type="checkbox"
                        name="agreedToTerms"
                        checked={travelDetails.agreedToTerms || false}
                        onChange={handleTermsChange}
                        className="mt-1 w-4 h-4 text-brand-primary bg-gray-100 border-gray-300 rounded focus:ring-brand-primary focus:ring-2"
                    />
                    <div className="text-sm">
                        <span className="font-medium text-gray-900">
                            I agree to the{' '}
                            <a href="/terms" className="text-brand-primary hover:underline" target="_blank" rel="noopener noreferrer">
                                Terms and Conditions
                            </a>
                            {' '}and{' '}
                            <a href="/privacy" className="text-brand-primary hover:underline" target="_blank" rel="noopener noreferrer">
                                Privacy Policy
                            </a>
                            <span className="text-red-500"> *</span>
                        </span>
                        <p className="text-gray-600 mt-1">
                            By checking this box, you confirm that you have read and agree to our terms of service and privacy policy.
                        </p>
                    </div>
                </label>
            </div>
            
            <div className="mt-4 p-3 rounded-lg bg-gray-50">
                <div className="flex items-center gap-2">
                    {isFormValid() && travelDetails.agreedToTerms ? (
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
                            <span className="text-orange-700 text-sm font-medium">
                                Please complete all required fields, itinerary details, and accept terms & conditions
                            </span>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}