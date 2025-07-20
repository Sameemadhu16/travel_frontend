// Test data to validate tour booking system
// This simulates a complete tour booking flow with realistic data

export const testTourBookingFlow = {
    // Step 1: Tour Creation
    tourDetails: {
        duration: 7, // 7 days
        startDate: "2024-12-15",
        endDate: "2024-12-22",
        numberOfGuests: 4,
        preferences: ["Cultural Sites", "Nature", "Adventure"]
    },

    // Step 2: Guide Selection
    selectedGuides: [
        {
            id: 1,
            name: "Samantha Perera",
            price: 15000, // per day
            rating: 4.8,
            languages: ["English", "Sinhala"],
            specialties: ["Cultural Tours", "Historical Sites"],
            experience: "8 years"
        }
    ],

    // Step 3: Hotel Selection
    selectedHotels: [
        {
            id: 1,
            name: "Galle Face Hotel",
            location: "Colombo",
            pricePerNight: 25000,
            rating: 4.5,
            amenities: ["Wi-Fi", "Pool", "Restaurant", "Spa"],
            type: "5-star"
        }
    ],

    // Step 4: Room Selection  
    selectedRooms: [
        {
            id: 1,
            hotelId: 1,
            roomType: "Deluxe Suite",
            pricePerNight: 35000,
            maxGuests: 4,
            bedType: "King",
            amenities: ["Ocean View", "Balcony", "Mini Bar"]
        }
    ],

    // Step 5: Vehicle Selection
    selectedVehicles: [
        {
            id: 1,
            name: "Toyota Hiace",
            pricePerDay: 12000,
            capacity: 8,
            type: "Van",
            fuel: "Diesel",
            transmission: "Manual",
            features: ["AC", "GPS"]
        }
    ],

    // Step 6: Driver Option
    driverOption: "with-driver", // 30% surcharge applies

    // Personal Details
    personalDetails: {
        firstName: "John",
        lastName: "Smith",
        email: "john.smith@email.com",
        phone: "+94771234567",
        address: "123 Main Street, Colombo",
        nationality: "American",
        passportNumber: "A12345678"
    }
};

// Expected Cost Calculation
export const expectedCosts = {
    // Guide costs: 1 guide × 15000 per day × 7 days = 105,000
    guideCosts: 105000,
    
    // Hotel costs: 1 room × 35000 per night × 6 nights = 210,000
    hotelCosts: 210000,
    
    // Vehicle costs: 1 vehicle × 12000 per day × 7 days = 84,000
    // With driver surcharge: 84,000 × 1.30 = 109,200
    vehicleCosts: 109200,
    
    // Subtotal: 105,000 + 210,000 + 109,200 = 424,200
    subtotal: 424200,
    
    // Service fee (5%): 424,200 × 0.05 = 21,210
    serviceFee: 21210,
    
    // Taxes (8%): 424,200 × 0.08 = 33,936
    taxes: 33936,
    
    // Total: 424,200 + 21,210 + 33,936 = 479,346
    total: 479346
};

// Validation function to test cost calculations
export const validateCostCalculation = (calculatedCosts) => {
    const tolerance = 1; // Allow 1 LKR difference for rounding
    
    const isValid = (calculated, expected, label) => {
        const diff = Math.abs(calculated - expected);
        if (diff > tolerance) {
            console.error(`❌ ${label}: Expected ${expected}, got ${calculated} (diff: ${diff})`);
            return false;
        } else {
            console.log(`✅ ${label}: ${calculated} (correct)`);
            return true;
        }
    };

    console.log("=== Tour Booking Cost Validation ===");
    
    const results = {
        guides: isValid(calculatedCosts.guideCosts, expectedCosts.guideCosts, "Guide Costs"),
        hotels: isValid(calculatedCosts.hotelCosts, expectedCosts.hotelCosts, "Hotel Costs"),
        vehicles: isValid(calculatedCosts.vehicleCosts, expectedCosts.vehicleCosts, "Vehicle Costs"),
        subtotal: isValid(calculatedCosts.subtotal, expectedCosts.subtotal, "Subtotal"),
        serviceFee: isValid(calculatedCosts.serviceFee, expectedCosts.serviceFee, "Service Fee"),
        taxes: isValid(calculatedCosts.taxes, expectedCosts.taxes, "Taxes"),
        total: isValid(calculatedCosts.total, expectedCosts.total, "Total")
    };

    const allValid = Object.values(results).every(Boolean);
    console.log(allValid ? "🎉 All cost calculations are correct!" : "⚠️  Some cost calculations need fixing");
    
    return allValid;
};

// Test data for edge cases
export const edgeCaseTests = {
    // Single day tour
    singleDay: {
        duration: 1,
        nights: 0, // No hotel nights needed
        expectedGuideCost: 15000,
        expectedHotelCost: 0,
        expectedVehicleCost: 12000 * 1.30 // With driver
    },
    
    // No driver option
    withoutDriver: {
        duration: 3,
        driverOption: "self-drive",
        expectedVehicleCost: 12000 * 3 // No surcharge
    },
    
    // Multiple guides
    multipleGuides: {
        guides: [
            { id: 1, price: 15000 },
            { id: 2, price: 18000 }
        ],
        duration: 5,
        expectedGuideCost: (15000 + 18000) * 5
    },
    
    // Multiple rooms
    multipleRooms: {
        rooms: [
            { id: 1, pricePerNight: 35000 },
            { id: 2, pricePerNight: 40000 }
        ],
        nights: 4,
        expectedHotelCost: (35000 + 40000) * 4
    }
};

console.log("Tour booking test data loaded. Use testTourBookingFlow for complete flow testing.");
