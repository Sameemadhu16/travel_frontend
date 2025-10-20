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

    // Debug logging to see what we're working with
    console.log('=== CREATE TRIP REQUEST DEBUG ===');
    console.log('selectedItems:', selectedItems);
    console.log('selectedItems.selectedVehicle:', selectedItems?.selectedVehicle);
    console.log('selectedItems.guides:', selectedItems?.guides);
    console.log('selectedItems.nightHotels:', selectedItems?.nightHotels);
    console.log('selectedItems.nightRooms:', selectedItems?.nightRooms);
    console.log('=================================');

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

    // Calculate end date from start date + duration if not provided
    const calculateEndDate = (startDate, duration) => {
        if (!startDate || !duration) {
            console.log('⚠️ Cannot calculate end date - missing startDate or duration:', { startDate, duration });
            return null;
        }
        
        // Extract number of days from duration string (e.g., "2-days" -> 2)
        const daysMatch = duration.match(/(\d+)-day/);
        if (!daysMatch) {
            console.log('⚠️ Cannot parse duration:', duration);
            return null;
        }
        
        const numberOfDays = parseInt(daysMatch[1]);
        const start = new Date(startDate);
        const end = new Date(start);
        end.setDate(start.getDate() + numberOfDays - 1); // -1 because start date counts as day 1
        
        // Format as YYYY-MM-DD
        const endDateStr = end.toISOString().split('T')[0];
        console.log(`✅ Calculated end date: ${startDate} + ${numberOfDays} days = ${endDateStr}`);
        return endDateStr;
    };

    // Format time properly - ensure it has seconds
    const formatTime = (time) => {
        if (!time) return null;
        // If time is like "06:16", add ":00" for seconds
        if (time.split(':').length === 2) {
            return `${time}:00`;
        }
        return time;
    };

    // Calculate end date BEFORE building the trip request
    console.log('🔍 End Date Calculation Debug:');
    console.log('  - travelDetails.endDate:', travelDetails?.endDate);
    console.log('  - travelDetails.startDate:', travelDetails?.startDate);
    console.log('  - travelDetails.duration:', travelDetails?.duration);
    
    const calculatedEndDate = calculateEndDate(travelDetails?.startDate, travelDetails?.duration);
    const finalEndDate = travelDetails?.endDate || calculatedEndDate;
    
    console.log('  - calculatedEndDate:', calculatedEndDate);
    console.log('  - finalEndDate:', finalEndDate);

    // Build the trip request object matching backend Trip entity exactly
    const tripRequest = {
        // === REQUIRED FIELDS ===
        
        // Trip code and user (CRITICAL - must have user with ID)
        tripCode: generateTripCode(),
        user: userId ? { id: userId } : null,
        
        // Basic trip information
        pickupLocation: travelDetails?.location || travelDetails?.pickupLocation || "",
        tripStartDate: travelDetails?.startDate || null,
        tripEndDate: finalEndDate,
        startTime: formatTime(travelDetails?.time),
        
        // Places to visit
        placesToBeVisit: extractPlaceIds(itinerary),
        
        // Travelers count
        numberOfAdults: numberOfAdults,
        numberOfKids: numberOfKids,
        
        // Duration and distance
        estimateDuration: travelDetails?.duration || "",
        distanceKm: Math.round(distanceKm) || 0,
        
        // Trip status (REQUIRED - must be valid enum value: pending, approved, paid, ongoing, completed, cancelled)
        tripStatus: "pending",
        
        // === RELATIONSHIP FIELDS ===
        
        // Selected vehicle agency (must be object with id or null)
        selectedVehicleAgency: selectedItems?.selectedVehicle?.vehicleAgency?.id
            ? { id: selectedItems.selectedVehicle.vehicleAgency.id }
            : (selectedItems?.selectedVehicle?.agency?.id
                ? { id: selectedItems.selectedVehicle.agency.id }
                : null),
        
        // Selected vehicle (must be object with id or null)
        selectedVehicle: selectedItems?.selectedVehicle?.id
            ? { id: selectedItems.selectedVehicle.id }
            : null,
        
        // Selected guide (approved guide - stays NULL until a guide accepts the request)
        selectedGuide: null,
        
        // Selected hotels (ManyToMany - array of objects with IDs)
        selectedHotels: (selectedNightHotelIds.length > 0 ? selectedNightHotelIds : selectedHotelIds)
            .filter(id => id != null)
            .map(hotelId => ({ id: hotelId })),
        
        // Selected rooms (ManyToMany - array of objects with IDs)
        selectedRooms: (selectedNightRoomIds.length > 0 ? selectedNightRoomIds : selectedRoomIds)
            .filter(id => id != null)
            .map(roomId => ({ id: roomId })),
        
        // === PRICING FIELDS ===
        
        basePrice: calculateBasePrice(selectedItems, travelDetails),
        totalFare: parseFloat(bookingSummary?.totalCost) || calculateBasePrice(selectedItems, travelDetails) || 0,
        
        // === CONTACT INFORMATION ===
        
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
        
        // === TRAVEL PREFERENCES ===
        
        destination: travelDetails?.destination || "",
        duration: travelDetails?.duration || "",
        travelStyle: travelDetails?.travelStyle || tourPreferences?.travelStyle || "",
        groupType: travelDetails?.groupType || tourPreferences?.groupType || "",
        interests: Array.isArray(tourPreferences?.interests) ? tourPreferences.interests : [],
        accommodationPreference: tourPreferences?.accommodation || tourPreferences?.accommodationPreference || "",
        budgetRange: tourPreferences?.budgetRange || "",
        activityLevel: tourPreferences?.activityLevel || "",
        diningPreference: tourPreferences?.diningPreference || "",
        
        // === JSON STORAGE FIELDS ===
        
        itineraryJson: itinerary ? JSON.stringify(itinerary) : null,
        travelDetailsJson: travelDetails ? JSON.stringify(travelDetails) : null,
        tourPreferencesJson: tourPreferences ? JSON.stringify(tourPreferences) : null,
        bookingSummaryJson: bookingSummary ? JSON.stringify(bookingSummary) : null,
        
        // === ID ARRAYS (ElementCollection) ===
        
        selectedGuideIds: selectedGuideIds.filter(id => id != null),
        selectedHotelIds: (selectedNightHotelIds.length > 0 ? selectedNightHotelIds : selectedHotelIds).filter(id => id != null),
        selectedNightHotelIds: selectedNightHotelIds.filter(id => id != null),
        selectedNightRoomIds: selectedNightRoomIds.filter(id => id != null),
        
        // === DISPLAY FIELDS (for easy database viewing) ===
        guidesDisplay: selectedGuideIds.filter(id => id != null).join(','),
        selectedHotelIdsDisplay: (selectedNightHotelIds.length > 0 ? selectedNightHotelIds : selectedHotelIds)
            .filter(id => id != null)
            .join(','),
        
        // === TERMS AGREEMENT ===
        
        agreedToTerms: Boolean(agreedToTerms),
    };

    // Final debug log of the complete trip request
    console.log('=== FINAL TRIP REQUEST ===');
    console.log('🔑 Critical Fields:');
    console.log('  - tripCode:', tripRequest.tripCode);
    console.log('  - user:', tripRequest.user);
    console.log('  - tripStatus:', tripRequest.tripStatus);
    console.log('  - pickupLocation:', tripRequest.pickupLocation);
    console.log('  - tripStartDate:', tripRequest.tripStartDate);
    console.log('  - tripEndDate:', tripRequest.tripEndDate);
    console.log('  - startTime:', tripRequest.startTime);
    
    console.log('🚗 Vehicle & Agency:');
    console.log('  - selectedVehicle:', tripRequest.selectedVehicle);
    console.log('  - selectedVehicleAgency:', tripRequest.selectedVehicleAgency);
    
    console.log('👤 Guide:');
    console.log('  - selectedGuide (approved guide):', tripRequest.selectedGuide);
    console.log('  - selectedGuideIds (all requested):', tripRequest.selectedGuideIds);
    console.log('  - guidesDisplay (for DB):', tripRequest.guidesDisplay);
    
    console.log('🏨 Hotels & Rooms:');
    console.log('  - selectedHotels:', tripRequest.selectedHotels);
    console.log('  - selectedHotelIds:', tripRequest.selectedHotelIds);
    console.log('  - selectedHotelIdsDisplay (for DB):', tripRequest.selectedHotelIdsDisplay);
    console.log('  - selectedNightHotelIds:', tripRequest.selectedNightHotelIds);
    console.log('  - selectedRooms:', tripRequest.selectedRooms);
    console.log('  - selectedNightRoomIds:', tripRequest.selectedNightRoomIds);
    
    console.log('💰 Pricing:');
    console.log('  - basePrice:', tripRequest.basePrice);
    console.log('  - totalFare:', tripRequest.totalFare);
    
    console.log('📧 Contact:');
    console.log('  - fullName:', tripRequest.fullName);
    console.log('  - email:', tripRequest.email);
    console.log('  - phone:', tripRequest.phone);
    
    console.log('📍 Travel Details:');
    console.log('  - destination:', tripRequest.destination);
    console.log('  - duration:', tripRequest.duration);
    console.log('  - numberOfAdults:', tripRequest.numberOfAdults);
    console.log('  - numberOfKids:', tripRequest.numberOfKids);
    
    console.log('📋 Complete Request Object:');
    console.log(JSON.stringify(tripRequest, null, 2));
    console.log('==========================');

    return tripRequest;
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
