import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import FormContext from '../../../context/InitialValues';
import { touristAttractions, districts } from '../../../core/Lists/location';

export default function ItineraryOverview() {
    const navigate = useNavigate();
    const { formData } = useContext(FormContext);

    const itinerary = formData.itinerary || [];

    const handleEdit = () => {
        navigate('/tour/create-tour');
    };

    // Helper function to resolve activity details from IDs
    const resolveActivityDetails = (activity) => {
        // If activity already has a title, use it
        if (activity.title?.trim()) {
            return {
                title: activity.title,
                description: activity.description || '',
                time: activity.time || ''
            };
        }

        // If activity has attractionId, resolve to tourist attraction
        if (activity.attractionId) {
            const attraction = touristAttractions.find(attr => attr.id.toString() === activity.attractionId.toString());
            if (attraction) {
                return {
                    title: attraction.value,
                    description: activity.description || `Visit ${attraction.value} (${attraction.type})`,
                    time: activity.time || '',
                    type: attraction.type
                };
            }
        }

        // If activity has districtId, resolve to district name
        if (activity.districtId) {
            const district = districts.find(d => d.id.toString() === activity.districtId.toString());
            if (district) {
                return {
                    title: `Explore ${district.value}`,
                    description: activity.description || `Exploring ${district.value} district`,
                    time: activity.time || ''
                };
            }
        }

        // If activity has customActivity, use it
        if (activity.customActivity?.trim()) {
            return {
                title: activity.customActivity,
                description: activity.description || '',
                time: activity.time || ''
            };
        }

        // Return null for empty activities
        return null;
    };

    // Transform itinerary data for display
    const getItineraryItems = () => {
        if (!itinerary || itinerary.length === 0) return [];
        
        return itinerary.map((day, index) => {
            // Get activities for the day and resolve them
            const activities = day.activities || [];
            const resolvedActivities = activities
                .map(activity => resolveActivityDetails(activity))
                .filter(activity => activity !== null);
            
            // Create description from resolved activities
            const description = resolvedActivities.length > 0 
                ? resolvedActivities.map(activity => activity.title).join(', ')
                : 'No activities planned';
            
            // Create title based on first activity or day number
            const title = resolvedActivities.length > 0 && resolvedActivities[0].title
                ? `Day ${day.day || index + 1}: ${resolvedActivities[0].title}`
                : `Day ${day.day || index + 1}`;
            
            return {
                day: day.day || index + 1,
                title,
                description,
                activities: resolvedActivities,
                timeActivities: resolvedActivities
            };
        });
    };

    const itineraryItems = getItineraryItems();

    return (
        <div className="bg-white rounded-lg border border-brand-primary p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-content-primary">Itinerary Overview</h2>
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
            
            {itineraryItems.length === 0 ? (
                <div className="text-center py-8">
                    <div className="w-16 h-16 bg-surface-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-content-tertiary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 13l-3 3m0 0l-3-3m3 3V8"/>
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-content-secondary mb-2">No Itinerary Created</h3>
                    <p className="text-content-tertiary text-sm mb-4">Please create your travel itinerary</p>
                    <button 
                        onClick={handleEdit}
                        className="bg-brand-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-brand-secondary transition"
                    >
                        Create Itinerary
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {itineraryItems.map((item, index) => (
                        <div key={item.day || index} className="flex gap-4">
                            <div className="flex flex-col items-center">
                                <div className="w-8 h-8 bg-brand-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">
                                    {item.day}
                                </div>
                                {index < itineraryItems.length - 1 && (
                                    <div className="w-0.5 h-12 bg-border-light mt-2"></div>
                                )}
                            </div>
                            <div className="flex-1 pb-4">
                                <h3 className="font-semibold text-content-primary">{item.title}</h3>
                                <p className="text-sm text-content-secondary mt-1">{item.description}</p>
                                
                                {/* Show detailed activities with times */}
                                {item.timeActivities && item.timeActivities.length > 0 && (
                                    <div className="mt-3 space-y-2">
                                        {item.timeActivities.map((activity, actIndex) => (
                                            <div key={`activity-${item.day}-${actIndex}-${activity.title}`} className="flex items-start gap-3 text-sm">
                                                {activity.time && (
                                                    <span className="bg-brand-light text-brand-primary px-2 py-1 rounded text-xs font-medium min-w-fit">
                                                        {activity.time}
                                                    </span>
                                                )}
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <p className="font-medium text-content-primary">{activity.title}</p>
                                                        {activity.type && (
                                                            <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">
                                                                {activity.type}
                                                            </span>
                                                        )}
                                                    </div>
                                                    {activity.description && (
                                                        <p className="text-content-tertiary text-xs mt-1">{activity.description}</p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
