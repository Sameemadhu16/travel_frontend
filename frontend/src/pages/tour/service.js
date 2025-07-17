export function createTripRequest(formData, userId) {
    const {
        travelDetails,
        itinerary,
        tourPreferences,
        contactInfo,
        selectedItems,
        bookingSummary,
    } = formData;

    return {
            tripCode: generateTripCode(), // You can implement a generator
            user: { id: userId },
            pickupLocation: travelDetails.pickupLocation || "",
            tripStartDate: travelDetails.startDate || "",
            tripEndDate: travelDetails.endDate || "",
            startTime: travelDetails.startTime || "08:00:00", // default fallback
            placesToBeVisit: [],
            numberOfAdults: travelDetails.numberOfAdults || 0,
            numberOfKids: travelDetails.numberOfKids || 0,
            estimateDuration: travelDetails.duration || "",
            distanceKm: travelDetails.distanceKm || 0,
            tripStatus: "pending",
            selectedVehicleAgency: selectedItems.selectedVehicle?.agency
            ? { id: selectedItems.selectedVehicle.agency.id }
            : null,
            selectedVehicle: selectedItems.selectedVehicle
            ? {
                id: selectedItems.selectedVehicle.id,
                isVerified: selectedItems.selectedVehicle.isVerified ?? false,
                }
            : null,
            selectedHotel: selectedItems.hotels.length > 0
            ? { id: selectedItems.hotels[0].id }
            : null,
            selectedRooms: selectedItems.rooms.map(room => ({ id: room.id })),
            basePrice: bookingSummary?.basePrice ?? 0,
            totalFare: bookingSummary?.totalCost ?? 0
        };
    }

    // Example generator (simple)
    function generateTripCode() {
        const now = new Date();
        return `TRIP${now.getFullYear()}${Math.floor(Math.random() * 10000)}`;
    }
