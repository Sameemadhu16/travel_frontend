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
    const selectedGuideIds = (selectedItems?.guides || []).map(guide => guide.id).filter(Boolean);
    
    // Extract hotel IDs (legacy and night-wise)
    const selectedHotelIds = (selectedItems?.hotels || []).map(hotel => hotel.id).filter(Boolean);
    const selectedNightHotelIds = (selectedItems?.nightHotels || [])
        .filter(hotel => hotel?.id)
        .map(hotel => hotel.id);
    
    // Extract room IDs (legacy and night-wise)
    const selectedRoomIds = (selectedItems?.rooms || []).map(room => room.id).filter(Boolean);
    const selectedNightRoomIds = (selectedItems?.nightRooms || [])
        .filter(room => room?.id)
        .map(room => room.id);

    // Parse number of travelers from formData structure
    const numberOfAdults = parseInt(travelDetails?.adults) || 1;
    const numberOfKids = parseInt(travelDetails?.children) || 0;
    
    // Calculate distance from vehicle trip cost data if available
    const distanceKm = selectedItems?.selectedVehicle?.tripCostData?.cost?.distance || 0;

    // Format time properly - ensure it has seconds
    const formatTime = (time) => {
        if (!time) return null;
        // If time is like "06:16", add ":00" for seconds
        if (time.split(':').length === 2) {
            return `${time}:00`;
        }
        return time;
    };

    return {
        // Trip code and user
        tripCode: generateTripCode(),
        user: { id: userId },
        
        // Basic trip information - FIX field names to match formData structure
        pickupLocation: travelDetails?.location || "",  // Changed from pickupLocation
        tripStartDate: travelDetails?.startDate || null,
        tripEndDate: null,  // Not collected in current flow
        startTime: formatTime(travelDetails?.time),  // Format time with seconds
        
        // Places to visit (will be populated from itinerary if available)
        placesToBeVisit: extractPlaceIds(itinerary),
        
        // Travelers count - FIX field names
        numberOfAdults: numberOfAdults,
        numberOfKids: numberOfKids,
        
        // Duration and distance
        estimateDuration: travelDetails?.duration || "",
        distanceKm: distanceKm,
        
        // Trip status
        tripStatus: "pending",
        
        // Selected vehicle - FIX to handle actual structure
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
        
        // Pricing - FIX to calculate from bookingSummary
        basePrice: calculateBasePrice(selectedItems, travelDetails),
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
        
        // Travel preferences - FIX to match formData structure
        destination: travelDetails?.destination || "",
        duration: travelDetails?.duration || "",
        travelStyle: travelDetails?.travelStyle || tourPreferences?.travelStyle || "",  // Check both locations
        groupType: travelDetails?.groupType || tourPreferences?.groupType || "",  // Check both locations
        interests: tourPreferences?.interests || [],
        accommodationPreference: tourPreferences?.accommodation || "",  // Changed from accommodationPreference
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
 * Calculate base price from selected items
 */
function calculateBasePrice(selectedItems, travelDetails) {
    let basePrice = 0;
    const duration = parseInt(travelDetails?.duration?.match(/(\d+)/)?.[1] || '1');
    
    // Add guide cost
    if (selectedItems?.guides && selectedItems.guides.length > 0) {
        const guidePrice = selectedItems.guides[0].price || selectedItems.guides[0].pricePerDay || 0;
        basePrice += guidePrice * duration;
    }
    
    // Add hotel cost
    if (selectedItems?.nightHotels && selectedItems.nightHotels.length > 0) {
        selectedItems.nightHotels.forEach((hotel, index) => {
            const room = selectedItems.nightRooms?.[index];
            const nightCost = room ? (room.price || 0) : (hotel.pricePerNight || hotel.price || 0);
            basePrice += nightCost;
        });
    }
    
    // Add vehicle cost
    if (selectedItems?.selectedVehicle?.tripCostData) {
        basePrice += selectedItems.selectedVehicle.tripCostData.cost.totalCost || 0;
    }
    
    return basePrice;
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
