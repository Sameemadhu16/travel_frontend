export const convertFormDataToTripRequest = (formData) => {
    const {
        travelDetails,
        selectedItems,
        contactInfo,
        itinerary,
        userId // you must include this in formData or pass it separately
    } = formData;
    // Parse duration
    const durationMatch = travelDetails?.duration?.match(/(\d+)/);
    const durationDays = durationMatch ? parseInt(durationMatch[1]) : 1;

    const startDate = new Date(travelDetails.startDate);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + durationDays - 1);

    // Calculate base price
    const guidePrices = (selectedItems?.guides || []).map(g => g.pricePerDay).filter(Boolean);
    const roomPrices = (selectedItems?.rooms || []).map(r => r.pricePerNight).filter(Boolean);
    const vehiclePrice = selectedItems?.selectedVehicle?.pricePerDay || 0;

    const totalDailyPrices = [...guidePrices, ...roomPrices];
    if (vehiclePrice) totalDailyPrices.push(vehiclePrice);

    const basePrice = totalDailyPrices.reduce((sum, price) => sum + price, 0) * durationDays;
    const totalFare = basePrice * 1.13;

    // Build Trip object compatible with your Java model
    const tripRequest = {
        pickupLocation: travelDetails?.location || '',
        tripStartDate: startDate.toISOString().split('T')[0],        // expects "yyyy-MM-dd"
        tripEndDate: endDate.toISOString().split('T')[0],
        startTime: travelDetails?.time ? `${travelDetails.time}:00` : "00:00:00", // ensure "HH:mm:ss"
        placesToBeVisit: Array.isArray(itinerary)
            ? itinerary.flatMap(day => day.activities || [])
                .map(activity => activity.placeId)
                .filter(Boolean)
            : [],
        numberOfAdults: travelDetails?.adults || 0,
        numberOfKids: travelDetails?.children || 0,
        estimateDuration: travelDetails?.duration || '',
        distanceKm: 0, // optional: calculate if needed
        tripStatus: "pending",
        selectedVehicle: selectedItems?.selectedVehicle
            ? { id: selectedItems.selectedVehicle.id }
            : null,
        selectedHotel: selectedItems?.hotels?.[0]
            ? { id: selectedItems.hotels[0].id }
            : null,
        selectedRooms: (selectedItems?.rooms || []).map(room => ({ id: room.id })),
        basePrice: basePrice.toFixed(2),     // if API accepts as string
        totalFare: totalFare.toFixed(2),
        user: {
            id: userId || null,
            email: contactInfo?.email || '',
            phone: contactInfo?.phone || ''
        }
    };

    return tripRequest;
};
