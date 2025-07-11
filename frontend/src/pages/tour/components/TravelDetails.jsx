import React, { useState } from 'react';

export default function TravelDetails() {
    const [formData, setFormData] = useState({
        destination: '',
        duration: '',
        startDate: '',
        groupSize: 2
    });

    const [itinerary, setItinerary] = useState([
        { day: 1, activities: [{ title: '', time: '', description: '' }] }
    ]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
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
                    <label className="block text-sm font-semibold mb-1">Destination</label>
                    <select 
                        name="destination"
                        value={formData.destination}
                        onChange={handleInputChange}
                        className="w-full border border-border-light rounded px-3 py-2 text-sm focus:outline-none focus:border-brand-primary"
                    >
                        <option value="">Select Destination</option>
                        <option value="colombo">Colombo</option>
                        <option value="kandy">Kandy</option>
                        <option value="galle">Galle</option>
                        <option value="ella">Ella</option>
                        <option value="sigiriya">Sigiriya</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-1">Duration</label>
                    <select 
                        name="duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                        className="w-full border border-border-light rounded px-3 py-2 text-sm focus:outline-none focus:border-brand-primary"
                    >
                        <option value="">Select Duration</option>
                        <option value="3-days">3 Days</option>
                        <option value="5-days">5 Days</option>
                        <option value="7-days">7 Days</option>
                        <option value="10-days">10 Days</option>
                        <option value="14-days">14 Days</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-1">Start Date</label>
                    <input 
                        type="date" 
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        className="w-full border border-border-light rounded px-3 py-2 text-sm focus:outline-none focus:border-brand-primary" 
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-1">Group Size</label>
                    <div className="flex items-center gap-2">
                        <button 
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, groupSize: Math.max(1, prev.groupSize - 1) }))}
                            className="bg-surface-secondary hover:bg-surface-tertiary px-3 py-2 rounded text-sm font-semibold"
                        >
                            -
                        </button>
                        <input 
                            type="number" 
                            min="1" 
                            name="groupSize"
                            value={formData.groupSize}
                            onChange={handleInputChange}
                            className="w-16 text-center border border-border-light rounded px-2 py-2 text-sm focus:outline-none focus:border-brand-primary" 
                        />
                        <button 
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, groupSize: prev.groupSize + 1 }))}
                            className="bg-surface-secondary hover:bg-surface-tertiary px-3 py-2 rounded text-sm font-semibold"
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
            <div className="mb-2 flex items-center justify-between">
                <span className="font-semibold text-brand-primary">Itinerary</span>
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
        </section>
    );
}
