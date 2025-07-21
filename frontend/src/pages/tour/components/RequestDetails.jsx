import React, { useContext } from 'react';
import { useTourContext } from '../../../context/TourContext';
import FormContext from '../../../context/InitialValues';

export default function RequestDetails() {
    const {formData} = useContext(FormContext);
    const { 
        travelDetails, 
        contactInfo, 
        selectedItems, 
        tourPreferences,
        itinerary,
        bookingSummary,
        resetTour 
    } = formData;

    // Generate a unique request ID based on current data
    const generateRequestId = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const randomNum = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
        return `SLT-${year}-${month}${day}-${randomNum}`;
    };

    // Format destination for display
    const formatDestination = (destination) => {
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
        return destinationMap[destination] || destination;
    };

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

    return (
        <div className="bg-surface-primary rounded-lg border-l-4 border-brand-primary p-6 mb-6">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-content-primary mb-4">
                <span className="text-brand-primary">📋</span>
                Your Tour Request Details
            </h2>
            
            {/* Request ID and Timestamp */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-brand-light rounded-lg">
                <div>
                    <span className="text-sm text-content-tertiary">Request ID:</span>
                    <p className="font-semibold text-brand-primary">{generateRequestId()}</p>
                </div>
                <div>
                    <span className="text-sm text-content-tertiary">Submitted:</span>
                    <p className="font-semibold text-content-primary">
                        {new Date().toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </p>
                </div>
            </div>

            {/* Travel Details */}
            <div className="mb-6">
                <h3 className="text-md font-semibold text-content-primary mb-3 flex items-center gap-2">
                    <span className="text-brand-primary">🗺️</span>
                    Travel Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <span className="text-sm text-content-tertiary">Destination Package:</span>
                        <p className="font-medium text-content-primary">{formatDestination(travelDetails.destination)}</p>
                    </div>
                    <div>
                        <span className="text-sm text-content-tertiary">Duration:</span>
                        <p className="font-medium text-content-primary">{travelDetails.duration || 'Not specified'}</p>
                    </div>
                    <div>
                        <span className="text-sm text-content-tertiary">Start Date:</span>
                        <p className="font-medium text-content-primary">{formatDate(travelDetails.startDate)}</p>
                    </div>
                    <div>
                        <span className="text-sm text-content-tertiary">Travelers:</span>
                        <p className="font-medium text-content-primary">
                            {travelDetails.adults} Adult{travelDetails.adults > 1 ? 's' : ''}
                            {travelDetails.children > 0 && `, ${travelDetails.children} Child${travelDetails.children > 1 ? 'ren' : ''}`}
                        </p>
                    </div>
                    <div>
                        <span className="text-sm text-content-tertiary">Travel Style:</span>
                        <p className="font-medium text-content-primary">{travelDetails.travelStyle || 'Not specified'}</p>
                    </div>
                    <div>
                        <span className="text-sm text-content-tertiary">Group Type:</span>
                        <p className="font-medium text-content-primary">{travelDetails.groupType || 'Not specified'}</p>
                    </div>
                </div>
            </div>

            {/* Contact Information */}
            <div className="mb-6">
                <h3 className="text-md font-semibold text-content-primary mb-3 flex items-center gap-2">
                    <span className="text-brand-primary">👤</span>
                    Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <span className="text-sm text-content-tertiary">Name:</span>
                        <p className="font-medium text-content-primary">{contactInfo.fullName}</p>
                    </div>
                    <div>
                        <span className="text-sm text-content-tertiary">Email:</span>
                        <p className="font-medium text-content-primary">{contactInfo.email}</p>
                    </div>
                    <div>
                        <span className="text-sm text-content-tertiary">Phone:</span>
                        <p className="font-medium text-content-primary">{contactInfo.phone}</p>
                    </div>
                    <div>
                        <span className="text-sm text-content-tertiary">Country:</span>
                        <p className="font-medium text-content-primary">{contactInfo.country}</p>
                    </div>
                </div>
            </div>

            {/* Selected Guides */}
            {selectedItems.guides && selectedItems.guides.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-md font-semibold text-content-primary mb-3 flex items-center gap-2">
                        <span className="text-brand-primary">👨‍🎓</span>
                        Selected Guides ({selectedItems.guides.length})
                    </h3>
                    <div className="space-y-3">
                        {selectedItems.guides.map((guide, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-surface-secondary rounded-lg">
                                <div>
                                    <p className="font-medium text-content-primary">{guide.name}</p>
                                    <p className="text-sm text-content-secondary">{guide.specialty || 'Professional Tour Guide'}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium text-brand-primary">LKR {(guide.price || guide.pricePerDay || 8500).toLocaleString()}/day</p>
                                    <div className="flex items-center gap-1 text-sm">
                                        <svg className="w-4 h-4 text-warning fill-current" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                        </svg>
                                        <span className="text-content-secondary">{guide.rating || '4.8'}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Tour Preferences */}
            {tourPreferences.interests && tourPreferences.interests.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-md font-semibold text-content-primary mb-3 flex items-center gap-2">
                        <span className="text-brand-primary">❤️</span>
                        Your Interests
                    </h3>
                    <div className="flex gap-2 flex-wrap">
                        {tourPreferences.interests.map((interest, index) => (
                            <span 
                                key={index}
                                className="bg-brand-light text-brand-primary px-3 py-1 rounded-full text-sm font-medium"
                            >
                                {interest}
                            </span>
                        ))}
                    </div>
                    {tourPreferences.accommodation && (
                        <div className="mt-3">
                            <span className="text-sm text-content-tertiary">Accommodation Preference:</span>
                            <p className="font-medium text-content-primary">{tourPreferences.accommodation}</p>
                        </div>
                    )}
                </div>
            )}

            {/* Optional Services Status */}
            <div className="bg-brand-accent border-brand-secondary rounded-lg p-4">
                <h3 className="text-md font-semibold text-brand-primary mb-2 flex items-center gap-2">
                    <span>ℹ️</span>
                    Service Selection Status
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                        <span className="text-gray-700">Hotels/Accommodation:</span>
                        <p className="font-medium text-gray-800">
                            {(selectedItems.hotels && selectedItems.hotels.length > 0) || 
                             (selectedItems.rooms && selectedItems.rooms.length > 0) 
                                ? `✅ ${(selectedItems.hotels?.length || 0) + (selectedItems.rooms?.length || 0)} selected` 
                                : '📋 To be arranged by guide'}
                        </p>
                    </div>
                    <div>
                        <span className="text--700">Transportation:</span>
                        <p className="font-medium text-gray-800">
                            {selectedItems.selectedVehicle 
                                ? `✅ ${selectedItems.selectedVehicle.name}` 
                                : '📋 To be arranged by guide'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
