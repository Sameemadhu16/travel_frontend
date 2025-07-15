import React, { useState } from 'react';

export default function TravelDetails() {
    const [formData, setFormData] = useState({
        destination: '',
        duration: '',
        startDate: '',
        location: '',
        time: '',
        adults: 2,
        children: 0
    });

    const [itinerary, setItinerary] = useState([
        { day: 1, activities: [{ title: '', time: '', description: '' }] }
    ]);

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const validateField = (name, value) => {
        let error = '';
        
        switch (name) {
            case 'destination':
                if (!value) {
                    error = 'Please select a destination';
                }
                break;
                
            case 'duration':
                if (!value) {
                    error = 'Please select trip duration';
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
                break;
                
            case 'adults':
                if (!value || value < 1) {
                    error = 'At least 1 adult is required';
                }
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
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Validate field on change if it has been touched
        if (touched[name]) {
            const error = validateField(name, value);
            setErrors(prev => ({
                ...prev,
                [name]: error
            }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched(prev => ({
            ...prev,
            [name]: true
        }));

        const error = validateField(name, value);
        setErrors(prev => ({
            ...prev,
            [name]: error
        }));
    };

    const isFormValid = () => {
        const requiredFields = ['destination', 'duration', 'startDate', 'location', 'time', 'adults'];
        const hasFieldErrors = requiredFields.some(field => {
            const error = validateField(field, formData[field]);
            return error || !formData[field];
        });
        
        const itineraryError = validateItinerary();
        
        return !hasFieldErrors && !itineraryError;
    };

    const addDay = () => {
        const newDay = {
            day: itinerary.length + 1,
            activities: [{ title: '', time: '', description: '' }]
        };
        setItinerary(prev => [...prev, newDay]);
    };

    const addActivity = (dayIndex) => {
        const newActivity = { title: '', time: '', description: '' };
        setItinerary(prev => 
            prev.map((day, index) => 
                index === dayIndex 
                    ? { ...day, activities: [...day.activities, newActivity] }
                    : day
            )
        );
    };

    const updateActivity = (dayIndex, activityIndex, field, value) => {
        setItinerary(prev =>
            prev.map((day, dIndex) =>
                dIndex === dayIndex
                    ? {
                        ...day,
                        activities: day.activities.map((activity, aIndex) =>
                            aIndex === activityIndex
                                ? { ...activity, [field]: value }
                                : activity
                        )
                    }
                    : day
            )
        );
    };

    const removeDay = (dayIndex) => {
        if (itinerary.length > 1) {
            setItinerary(prev => 
                prev.filter((_, index) => index !== dayIndex)
                    .map((day, index) => ({ ...day, day: index + 1 }))
            );
        }
    };

    const removeActivity = (dayIndex, activityIndex) => {
        setItinerary(prev =>
            prev.map((day, dIndex) =>
                dIndex === dayIndex && day.activities.length > 1
                    ? {
                        ...day,
                        activities: day.activities.filter((_, aIndex) => aIndex !== activityIndex)
                    }
                    : day
            )
        );
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
                        value={formData.destination}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none transition-all ${
                            errors.destination ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' : 
                            'border-border-light focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20'
                        }`}
                        required
                    >
                        <option value="">Select Destination</option>
                        <option value="colombo">Colombo</option>
                        <option value="kandy">Kandy</option>
                        <option value="galle">Galle</option>
                        <option value="ella">Ella</option>
                        <option value="sigiriya">Sigiriya</option>
                    </select>
                    {errors.destination && <p className="text-red-500 text-xs mt-1">{errors.destination}</p>}
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-1">
                        Duration <span className="text-red-500">*</span>
                    </label>
                    <select 
                        name="duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none transition-all ${
                            errors.duration ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' : 
                            'border-border-light focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20'
                        }`}
                        required
                    >
                        <option value="">Select Duration</option>
                        <option value="3-days">3 Days</option>
                        <option value="5-days">5 Days</option>
                        <option value="7-days">7 Days</option>
                        <option value="10-days">10 Days</option>
                        <option value="14-days">14 Days</option>
                    </select>
                    {errors.duration && <p className="text-red-500 text-xs mt-1">{errors.duration}</p>}
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-1">
                        Start Date <span className="text-red-500">*</span>
                    </label>
                    <input 
                        type="date" 
                        name="startDate"
                        value={formData.startDate}
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
                                onClick={() => setFormData(prev => ({ ...prev, adults: Math.max(1, prev.adults - 1) }))
                                }
                                className="bg-surface-secondary hover:bg-surface-tertiary px-3 py-2 rounded text-sm font-semibold"
                            >
                                -
                            </button>
                            <input 
                                type="number" 
                                min="1" 
                                name="adults"
                                value={formData.adults}
                                onChange={handleInputChange}
                                className="w-16 text-center border border-border-light rounded px-2 py-2 text-sm focus:outline-none focus:border-brand-primary" 
                            />
                            <button 
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, adults: prev.adults + 1 }))
                                }
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
                                onClick={() => setFormData(prev => ({ ...prev, children: Math.max(0, prev.children - 1) }))
                                }
                                className="bg-surface-secondary hover:bg-surface-tertiary px-3 py-2 rounded text-sm font-semibold"
                            >
                                -
                            </button>
                            <input 
                                type="number" 
                                min="0" 
                                name="children"
                                value={formData.children}
                                onChange={handleInputChange}
                                className="w-16 text-center border border-border-light rounded px-2 py-2 text-sm focus:outline-none focus:border-brand-primary" 
                            />
                            <button 
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, children: prev.children + 1 }))
                                }
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
                        value={formData.location}
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
                        value={formData.time}
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