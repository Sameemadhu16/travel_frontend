import React from 'react';
import { useTourContext } from '../../../context/TourContext';
import { useNavigate } from 'react-router-dom';

export default function DestinationDetails() {
    const navigate = useNavigate();
    const { 
        travelDetails, 
        itinerary,
        tourPreferences 
    } = useTourContext();

    // Format date for display
    const formatDate = (dateString) => {
        if (!dateString) return 'Not specified';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Format duration for display
    const formatDuration = (duration) => {
        if (!duration) return 'Not specified';
        return duration.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
    };

    // Handle edit button click
    const handleEdit = () => {
        navigate('/tour/create-tour');
    };

    // Generate tour package name based on interests
    const getTourPackageName = () => {
        if (tourPreferences.interests.length === 0) {
            return travelDetails.destination || 'Custom Tour Package';
        }
        
        const interests = tourPreferences.interests.slice(0, 2).join(' & ');
        return `${interests} Tour`;
    };

    // Get destinations from main destination and itinerary locations
    const getDestinations = () => {
        const destinations = [];
        
        // Add main destination
        if (travelDetails.destination) {
            destinations.push(travelDetails.destination.charAt(0).toUpperCase() + travelDetails.destination.slice(1));
        }
        
        // Add locations from itinerary activities if available
        if (itinerary.length > 0) {
            const itineraryLocations = itinerary.flatMap(day => 
                day.activities?.map(activity => activity.location).filter(Boolean) || []
            );
            const uniqueLocations = [...new Set(itineraryLocations)];
            uniqueLocations.forEach(location => {
                if (!destinations.includes(location)) {
                    destinations.push(location);
                }
            });
        }
        
        return destinations.length > 0 ? destinations : ['Not specified'];
    };

    return (
        <div className="bg-white rounded-lg border border-brand-primary p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-content-primary">Destination Details</h2>
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
            
            <div className="grid grid-cols-2 gap-6">
                <div>
                    <h3 className="text-sm font-medium text-content-secondary mb-2">Tour Package</h3>
                    <p className="text-content-primary font-medium">{getTourPackageName()}</p>
                </div>
                <div>
                    <h3 className="text-sm font-medium text-content-secondary mb-2">Duration</h3>
                    <p className="text-content-primary font-medium">{formatDuration(travelDetails.duration)}</p>
                </div>
                <div>
                    <h3 className="text-sm font-medium text-content-secondary mb-2">Start Date</h3>
                    <p className="text-content-primary font-medium">{formatDate(travelDetails.startDate)}</p>
                </div>
                <div>
                    <h3 className="text-sm font-medium text-content-secondary mb-2">Travelers</h3>
                    <p className="text-content-primary font-medium">
                        {travelDetails.adults > 0 && (
                            <span>{travelDetails.adults} Adult{travelDetails.adults > 1 ? 's' : ''}</span>
                        )}
                        {travelDetails.children > 0 && (
                            <span>
                                {travelDetails.adults > 0 ? ', ' : ''}
                                {travelDetails.children} Child{travelDetails.children > 1 ? 'ren' : ''}
                            </span>
                        )}
                        {travelDetails.adults === 0 && travelDetails.children === 0 && 'Not specified'}
                    </p>
                </div>
            </div>
            
            <div className="mt-4">
                <h3 className="text-sm font-medium text-content-secondary mb-2">Destinations</h3>
                <div className="flex gap-2 flex-wrap">
                    {getDestinations().map((destination, index) => (
                        <span 
                            key={index}
                            className="bg-brand-light text-brand-primary px-3 py-1 rounded-full text-sm font-medium"
                        >
                            {destination}
                        </span>
                    ))}
                </div>
            </div>
            
            {/* Additional sections for pickup details and preferences */}
            {(travelDetails.location || travelDetails.time) && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-2 gap-6">
                        {travelDetails.location && (
                            <div>
                                <h3 className="text-sm font-medium text-content-secondary mb-2">Pickup Location</h3>
                                <p className="text-content-primary font-medium">{travelDetails.location}</p>
                            </div>
                        )}
                        {travelDetails.time && (
                            <div>
                                <h3 className="text-sm font-medium text-content-secondary mb-2">Pickup Time</h3>
                                <p className="text-content-primary font-medium">{travelDetails.time}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Tour Interests */}
            {tourPreferences.interests.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                    <h3 className="text-sm font-medium text-content-secondary mb-2">Tour Interests</h3>
                    <div className="flex gap-2 flex-wrap">
                        {tourPreferences.interests.map((interest, index) => (
                            <span 
                                key={index}
                                className="bg-surface-secondary text-content-primary px-3 py-1 rounded-full text-sm font-medium"
                            >
                                {interest}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Accommodation Preference */}
            {tourPreferences.accommodation && (
                <div className="mt-4">
                    <h3 className="text-sm font-medium text-content-secondary mb-2">Accommodation Preference</h3>
                    <span className="bg-surface-secondary text-content-primary px-3 py-1 rounded-lg text-sm font-medium">
                        {tourPreferences.accommodation.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                </div>
            )}
        </div>
    );
}
