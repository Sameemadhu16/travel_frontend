// Example usage of the trip calculator

import { 
  calculateTripDistance, 
  calculateVehicleCost, 
  calculateCompleteTripCost,
  getDaysFromDuration 
} from './tripCalculator.js';

// Example itinerary data structure
const exampleItinerary = [
  {
    day: 1,
    activities: [
      {
        name: "Visit Temple of the Tooth",
        districtId: "2", // Kandy
        time: "09:00"
      },
      {
        name: "Royal Botanical Gardens",
        districtId: "2", // Kandy
        time: "14:00"
      }
    ]
  },
  {
    day: 2,
    activities: [
      {
        name: "Sigiriya Rock Fortress",
        districtId: "8", // Anuradhapura region (approximate)
        time: "08:00"
      },
      {
        name: "Dambulla Cave Temple",
        districtId: "8", // Anuradhapura region (approximate)
        time: "15:00"
      }
    ]
  },
  {
    day: 3,
    activities: [
      {
        name: "Nuwara Eliya Town",
        districtId: "5", // Nuwara Eliya
        time: "10:00"
      },
      {
        name: "Tea plantation visit",
        districtId: "5", // Nuwara Eliya
        time: "14:00"
      }
    ]
  }
];

// Example vehicle from the vehicles list
const exampleVehicle = {
  id: "1",
  name: 'Toyota Corolla',
  type: 'Sedan',
  pricePerDay: 5000,
  pricePerKm: 45
};

// Example usage functions
export function demonstrateDistanceCalculation() {
  console.log('=== DISTANCE CALCULATION DEMO ===');
  
  const distanceResult = calculateTripDistance(
    exampleItinerary, 
    'Colombo', // Start from Colombo
    'Colombo'  // Return to Colombo
  );
  
  console.log('Total Distance:', distanceResult.totalDistance, 'km');
  console.log('Distance Breakdown:');
  distanceResult.breakdown.forEach(day => {
    console.log(`Day ${day.day}: ${day.totalDayDistance}km`);
    day.routes.forEach(route => {
      console.log(`  ${route.from} → ${route.to}: ${route.distance}km (${route.activity})`);
    });
  });
  
  return distanceResult;
}

export function demonstrateVehicleCostCalculation() {
  console.log('=== VEHICLE COST CALCULATION DEMO ===');
  
  const tripDistance = 450; // km
  const tripDays = 3;
  
  const costResult = calculateVehicleCost(exampleVehicle, tripDistance, tripDays);
  
  console.log('Vehicle:', exampleVehicle.name);
  console.log('Trip Duration:', tripDays, 'days');
  console.log('Trip Distance:', tripDistance, 'km');
  console.log('Daily Cost:', costResult.breakdown.dailyCost, 'LKR');
  console.log('Distance Cost:', costResult.breakdown.distanceCost, 'LKR');
  console.log('Total Cost:', costResult.totalCost, 'LKR');
  
  return costResult;
}

export function demonstrateCompleteTripCalculation() {
  console.log('=== COMPLETE TRIP CALCULATION DEMO ===');
  
  const completeCost = calculateCompleteTripCost(
    exampleVehicle,
    exampleItinerary,
    '3-days',
    'Colombo',
    'Colombo'
  );
  
  console.log('Complete Trip Analysis:');
  console.log('Vehicle:', completeCost.vehicle.name, completeCost.vehicle.type);
  console.log('Duration:', completeCost.trip.numberOfDays, 'days');
  console.log('Total Distance:', Math.round(completeCost.distance.totalDistance), 'km');
  console.log('Daily Cost:', completeCost.cost.breakdown.dailyCost, 'LKR');
  console.log('Distance Cost:', completeCost.cost.breakdown.distanceCost, 'LKR');
  console.log('Total Trip Cost:', completeCost.cost.totalCost, 'LKR');
  
  console.log('Daily Breakdown:');
  completeCost.distance.breakdown.forEach(day => {
    if (day.day !== 'Return') {
      console.log(`Day ${day.day}: ${day.totalDayDistance}km`);
    }
  });
  
  return completeCost;
}

// How to integrate with your form data
export function calculateCostFromFormData(formData, selectedVehicle) {
  if (!formData.itinerary || !selectedVehicle || !formData.travelDetails.duration) {
    console.warn('Missing required data for trip calculation');
    return null;
  }
  
  const startLocation = formData.travelDetails.location || 'Colombo';
  
  return calculateCompleteTripCost(
    selectedVehicle,
    formData.itinerary,
    formData.travelDetails.duration,
    startLocation,
    startLocation // Assuming round trip
  );
}

/*
HOW TO CALCULATE DISTANCE FOR YOUR APP:

1. **Using Existing Data**:
   - Each activity has a `districtId` 
   - Map districtId to actual district names using your districts data
   - Use the distance matrix in tripCalculator.js to get distances between districts

2. **Improving Distance Accuracy**:
   - Add more city/district pairs to the distance matrix
   - Consider using Google Maps Distance Matrix API for real distances
   - Add GPS coordinates to attractions for more precise calculations

3. **Alternative Distance Calculation Methods**:
   
   a) **Google Maps API** (Most Accurate):
   ```javascript
   const googleDistanceAPI = async (origins, destinations) => {
     const response = await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origins}&destinations=${destinations}&key=${API_KEY}`);
     const data = await response.json();
     return data.rows[0].elements[0].distance.value / 1000; // Convert to km
   };
   ```
   
   b) **GPS Coordinates** (Good Accuracy):
   ```javascript
   const haversineDistance = (lat1, lon1, lat2, lon2) => {
     const R = 6371; // Earth's radius in kilometers
     const dLat = (lat2 - lat1) * Math.PI / 180;
     const dLon = (lon2 - lon1) * Math.PI / 180;
     const a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
               Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
               Math.sin(dLon/2) * Math.sin(dLon/2);
     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
     return R * c;
   };
   ```
   
   c) **Enhanced Distance Matrix** (Current Approach):
   - Expand the distance matrix with more Sri Lankan locations
   - Include popular tourist destinations
   - Add estimated distances for unknown routes

4. **Data Structure Recommendations**:
   - Add GPS coordinates to your attractions/activities data
   - Create a comprehensive distance matrix for Sri Lankan districts
   - Consider road conditions and typical travel routes (not just straight-line distance)

5. **Integration with Your Current System**:
   - The trip calculator works with your existing itinerary structure
   - Uses districtId to determine locations
   - Falls back to estimation for unknown routes
   - Easily extensible with more accurate distance sources
*/
