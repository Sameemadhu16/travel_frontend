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

    // Format destination for display
    const formatDestination = (destination) => {
        if (!destination) return 'Not specified';
        
        // Map destination values to readable names
        const destinationMap = {
            'colombo-city': 'Colombo City Tour',
            'kandy-day': 'Kandy Day Trip',
            'galle-day': 'Galle Fort & Southern Coast',
            'pinnawala-kandy': 'Pinnawala Elephant Orphanage & Kandy',
            'bentota-day': 'Bentota Beach Day Trip',
            'kandy-nuwara': 'Kandy & Nuwara Eliya',
            'southern-beaches': 'Southern Beaches (Galle, Mirissa, Unawatuna)',
            'sigiriya-dambulla': 'Sigiriya & Dambulla Cultural Tour',
            'ella-adventure': 'Ella Adventure (Train Journey & Hiking)',
            'yala-safari': 'Yala National Park Safari',
            'negombo-colombo': 'Negombo & Colombo',
            'cultural-triangle': 'Cultural Triangle (Anuradhapura, Polonnaruwa, Sigiriya)',
            'hill-country': 'Hill Country Explorer (Kandy, Nuwara Eliya, Ella)',
            'south-west-coast': 'South West Coast (Colombo to Galle)',
            'central-highlands': 'Central Highlands & Tea Country',
            'wildlife-adventure': 'Wildlife & Adventure (Yala, Udawalawe, Sinharaja)',
            'beaches-culture': 'Beaches & Culture Combo',
            'ancient-kingdoms': 'Ancient Kingdoms Tour',
            'grand-tour': 'Grand Sri Lanka Tour',
            'complete-island': 'Complete Island Experience',
            'cultural-nature': 'Cultural Sites & Nature Reserves',
            'coast-to-mountains': 'Coast to Mountains Adventure',
            'photography-tour': 'Photography Expedition',
            'ayurveda-wellness': 'Ayurveda & Wellness Journey',
            'adventure-explorer': 'Adventure Explorer Tour',
            'luxury-sri-lanka': 'Luxury Sri Lanka Experience',
            'honeymoon-special': 'Honeymoon Special Tour',
            'family-adventure': 'Family Adventure Package',
            'wildlife-photography': 'Wildlife Photography Tour',
            'culinary-journey': 'Culinary Journey of Sri Lanka',
            'spiritual-tour': 'Spiritual & Meditation Tour',
            'eco-adventure': 'Eco-Adventure & Conservation Tour',
            'custom-tour': 'Custom Itinerary',
            'business-travel': 'Business Travel Package',
            'educational-tour': 'Educational/School Group Tour'
        };
        
        return destinationMap[destination] || destination.charAt(0).toUpperCase() + destination.slice(1);
    };

    // Format travel style for display
    const formatTravelStyle = (style) => {
        if (!style) return 'Not specified';
        const styleMap = {
            'budget': 'Budget (Economy hotels, local transport)',
            'standard': 'Standard (3-star hotels, AC vehicle)',
            'comfort': 'Comfort (4-star hotels, premium vehicle)',
            'luxury': 'Luxury (5-star hotels, luxury vehicle)',
            'premium': 'Premium (Boutique hotels, exclusive experiences)'
        };
        return styleMap[style] || style;
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
                    <p className="text-content-primary font-medium">{formatDestination(travelDetails.destination)}</p>
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
                        {travelDetails.adults} Adult{travelDetails.adults > 1 ? 's' : ''}
                        {travelDetails.children > 0 && `, ${travelDetails.children} Child${travelDetails.children > 1 ? 'ren' : ''}`}
                    </p>
                </div>
                <div>
                    <h3 className="text-sm font-medium text-content-secondary mb-2">Travel Style</h3>
                    <p className="text-content-primary font-medium">{formatTravelStyle(travelDetails.travelStyle)}</p>
                </div>
                <div>
                    <h3 className="text-sm font-medium text-content-secondary mb-2">Group Type</h3>
                    <p className="text-content-primary font-medium">{travelDetails.groupType || 'Not specified'}</p>
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
