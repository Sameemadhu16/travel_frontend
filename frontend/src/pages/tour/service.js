/**
 * Creates a properly formatted trip request object for backend submission
 * Maps frontend formData to backend Trip entity structure
 */
export function createTripRequest(formData, userId) {
    const {
        travelDetails,
        itinerary,
        tourPreferences,
        contactInfo,
        selectedItems,
        bookingSummary,
        agreedToTerms,
    } = formData;

    // Extract guide IDs from selected guides
    const selectedGuideIds = (selectedItems?.guides || []).map(guide => guide.id);
    
    // Extract hotel IDs (legacy and night-wise)
    const selectedHotelIds = (selectedItems?.hotels || []).map(hotel => hotel.id);
    const selectedNightHotelIds = (selectedItems?.nightHotels || [])
        .filter(hotel => hotel?.id)
        .map(hotel => hotel.id);
    
    // Extract room IDs (legacy and night-wise)
    const selectedRoomIds = (selectedItems?.rooms || []).map(room => room.id);
    const selectedNightRoomIds = (selectedItems?.nightRooms || [])
        .filter(room => room?.id)
        .map(room => room.id);

    return {
        // Trip code and user
        tripCode: generateTripCode(),
        user: { id: userId },
        
        // Basic trip information
        pickupLocation: travelDetails?.pickupLocation || "",
        tripStartDate: travelDetails?.startDate || null,
        tripEndDate: travelDetails?.endDate || null,
        startTime: travelDetails?.startTime || "08:00:00",
        
        // Places to visit (will be populated from itinerary if available)
        placesToBeVisit: extractPlaceIds(itinerary),
        
        // Travelers count
        numberOfAdults: parseInt(travelDetails?.numberOfAdults) || 0,
        numberOfKids: parseInt(travelDetails?.numberOfKids) || 0,
        
        // Duration and distance
        estimateDuration: travelDetails?.duration || "",
        distanceKm: parseInt(travelDetails?.distanceKm) || 0,
        
        // Trip status
        tripStatus: "pending",
        
        // Selected vehicle
        selectedVehicleAgency: selectedItems?.selectedVehicle?.agency?.id
            ? { id: selectedItems.selectedVehicle.agency.id }
            : null,
        selectedVehicle: selectedItems?.selectedVehicle?.id
            ? { 
                id: selectedItems.selectedVehicle.id,
                isVerified: selectedItems.selectedVehicle.isVerified ?? false 
              }
            : null,
        
        // Selected hotel (legacy - first hotel)
        selectedHotel: selectedHotelIds.length > 0 || selectedNightHotelIds.length > 0
            ? { id: selectedNightHotelIds[0] || selectedHotelIds[0] }
            : null,
        
        // Selected rooms
        selectedRooms: (selectedRoomIds.length > 0 ? selectedRoomIds : selectedNightRoomIds)
            .map(roomId => ({ id: roomId })),
        
        // Pricing
        basePrice: parseFloat(bookingSummary?.basePrice) || 0,
        totalFare: parseFloat(bookingSummary?.totalCost) || 0,
        
        // Contact Information
        fullName: contactInfo?.fullName || "",
        email: contactInfo?.email || "",
        phone: contactInfo?.phone || "",
        country: contactInfo?.country || "",
        nicNumber: contactInfo?.nicNumber || "",
        optionalContact: contactInfo?.optionalContact || "",
        specialRequests: contactInfo?.specialRequests || "",
        ageGroup: contactInfo?.ageGroup || "",
        occupation: contactInfo?.occupation || "",
        travelExperience: contactInfo?.travelExperience || "",
        referralSource: contactInfo?.referralSource || "",
        
        // Travel preferences
        destination: travelDetails?.destination || "",
        duration: travelDetails?.duration || "",
        travelStyle: tourPreferences?.travelStyle || "",
        groupType: tourPreferences?.groupType || "",
        interests: tourPreferences?.interests || [],
        accommodationPreference: tourPreferences?.accommodationPreference || "",
        budgetRange: tourPreferences?.budgetRange || "",
        activityLevel: tourPreferences?.activityLevel || "",
        diningPreference: tourPreferences?.diningPreference || "",
        
        // JSON fields for complex data
        itineraryJson: itinerary ? JSON.stringify(itinerary) : null,
        travelDetailsJson: travelDetails ? JSON.stringify(travelDetails) : null,
        tourPreferencesJson: tourPreferences ? JSON.stringify(tourPreferences) : null,
        bookingSummaryJson: bookingSummary ? JSON.stringify(bookingSummary) : null,
        
        // Selected guides, hotels, and rooms (as ID arrays)
        selectedGuideIds: selectedGuideIds,
        selectedHotelIds: selectedNightHotelIds.length > 0 ? selectedNightHotelIds : selectedHotelIds,
        selectedNightHotelIds: selectedNightHotelIds,
        selectedNightRoomIds: selectedNightRoomIds,
        
        // Terms agreement
        agreedToTerms: agreedToTerms || false,
    };
}

/**
 * Generates a unique trip code
 */
function generateTripCode() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `TRIP${year}${month}${day}${random}`;
}

/**
 * Extracts place IDs from itinerary data
 */
function extractPlaceIds(itinerary) {
    if (!itinerary || !Array.isArray(itinerary)) {
        return [];
    }
    
    const placeIds = [];
    itinerary.forEach(day => {
        if (day.activities && Array.isArray(day.activities)) {
            day.activities.forEach(activity => {
                if (activity.placeId) {
                    placeIds.push(activity.placeId);
                }
            });
        }
    });
    
    return placeIds;
}
