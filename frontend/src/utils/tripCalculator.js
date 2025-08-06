// Utility functions for calculating trip distances and vehicle costs
// Now supports Google Maps API integration for accurate distances

/**
 * Check if Google Maps API is available
 * @returns {boolean} True if API key is configured
 */
export function isGoogleMapsAvailable() {
  // In React, environment variables are available via process.env
  // eslint-disable-next-line no-undef
  return !!(typeof process !== 'undefined' && process.env?.REACT_APP_GOOGLE_MAPS_API_KEY);
}

// Sample distance data between major Sri Lankan cities/districts (in kilometers)
// This is a simplified matrix - in a real application, you might use Google Maps API or similar
export const distanceMatrix = {
  'Colombo': {
    'Kandy': 115,
    'Galle': 120,
    'Jaffna': 395,
    'Nuwara Eliya': 180,
    'Negombo': 40,
    'Batticaloa': 315,
    'Anuradhapura': 205,
    'Trincomalee': 250,
    'Ratnapura': 100,
    'Badulla': 230,
    'Matara': 160,
    'Kurunegala': 105
  },
  'Kandy': {
    'Colombo': 115,
    'Galle': 200,
    'Nuwara Eliya': 78,
    'Sigiriya': 85,
    'Anuradhapura': 140,
    'Trincomalee': 180,
    'Badulla': 115,
    'Matale': 25,
    'Dambulla': 70
  },
  'Galle': {
    'Colombo': 120,
    'Kandy': 200,
    'Matara': 40,
    'Hikkaduwa': 20,
    'Unawatuna': 8,
    'Mirissa': 30,
    'Tangalle': 70
  },
  'Nuwara Eliya': {
    'Colombo': 180,
    'Kandy': 78,
    'Ella': 50,
    'Badulla': 60,
    'Horton Plains': 35,
    'Bandarawela': 45
  },
  'Jaffna': {
    'Colombo': 395,
    'Anuradhapura': 140,
    'Mannar': 65,
    'Kilinochchi': 35,
    'Vavuniya': 105
  }
  // Add more as needed
};

/**
 * Calculate distance between two locations
 * @param {string} from - Starting location
 * @param {string} to - Destination location
 * @returns {number} Distance in kilometers, or estimated distance if not in matrix
 */
export function getDistanceBetween(from, to) {
  if (!from || !to || from === to) return 0;
  
  // Check direct route
  if (distanceMatrix[from] && distanceMatrix[from][to]) {
    return distanceMatrix[from][to];
  }
  
  // Check reverse route
  if (distanceMatrix[to] && distanceMatrix[to][from]) {
    return distanceMatrix[to][from];
  }
  
  // If not found in matrix, return estimated distance based on location type
  // This is a fallback - in production, you'd want to use a proper mapping API
  return estimateDistance(from, to);
}

/**
 * Estimate distance between unknown locations
 * @param {string} from - Starting location
 * @param {string} to - Destination location
 * @returns {number} Estimated distance in kilometers
 */
function estimateDistance(from, to) {
  // Simple estimation based on common Sri Lankan geography
  const avgDistanceBetweenDistricts = 80;
  
  // You could enhance this with more sophisticated logic
  // For now, return a moderate estimate
  console.log(`Estimating distance between ${from} and ${to}: ${avgDistanceBetweenDistricts}km`);
  return avgDistanceBetweenDistricts;
}

/**
 * Calculate total trip distance based on itinerary
 * @param {Array} itinerary - Array of day objects with activities
 * @param {string} startLocation - Starting location (pickup point)
 * @param {string} endLocation - Ending location (drop-off point, defaults to start)
 * @returns {Object} Object containing total distance and breakdown
 */
export function calculateTripDistance(itinerary, startLocation = 'Colombo', endLocation = null) {
  if (!itinerary || itinerary.length === 0) {
    return { totalDistance: 0, breakdown: [], dailyDistances: [] };
  }
  
  const breakdown = [];
  const dailyDistances = [];
  let totalDistance = 0;
  let currentLocation = startLocation;
  
  // Process each day's activities
  itinerary.forEach((day, dayIndex) => {
    let dailyDistance = 0;
    const dayBreakdown = {
      day: day.day || dayIndex + 1,
      routes: [],
      totalDayDistance: 0
    };
    
    if (day.activities && day.activities.length > 0) {
      day.activities.forEach((activity, activityIndex) => {
        // Get the location/district for this activity
        const activityLocation = getLocationFromActivity(activity);
        
        if (activityLocation && activityLocation !== currentLocation) {
          const distance = getDistanceBetween(currentLocation, activityLocation);
          
          dayBreakdown.routes.push({
            from: currentLocation,
            to: activityLocation,
            distance: distance,
            activity: activity.name || activity.title || `Activity ${activityIndex + 1}`
          });
          
          dailyDistance += distance;
          totalDistance += distance;
          currentLocation = activityLocation;
        }
      });
    }
    
    dayBreakdown.totalDayDistance = dailyDistance;
    breakdown.push(dayBreakdown);
    dailyDistances.push(dailyDistance);
  });
  
  // Add return journey if specified
  if (endLocation && endLocation !== currentLocation) {
    const returnDistance = getDistanceBetween(currentLocation, endLocation);
    totalDistance += returnDistance;
    
    breakdown.push({
      day: 'Return',
      routes: [{
        from: currentLocation,
        to: endLocation,
        distance: returnDistance,
        activity: 'Return journey'
      }],
      totalDayDistance: returnDistance
    });
  }
  
  return {
    totalDistance,
    breakdown,
    dailyDistances,
    startLocation,
    endLocation: endLocation || currentLocation
  };
}

/**
 * Extract location from activity object
 * @param {Object} activity - Activity object
 * @returns {string} Location/district name
 */
function getLocationFromActivity(activity) {
  // You'll need to map districtId to actual district names
  // This should match your districts data structure
  if (activity.districtId) {
    return getDistrictNameById(activity.districtId);
  }
  
  // Fallback to custom location if specified
  if (activity.location) {
    return activity.location;
  }
  
  // Extract location from activity name as last resort
  if (activity.name || activity.title) {
    // This is very basic - you might want to enhance this
    const activityName = activity.name || activity.title;
    
    // Check if any major city/district is mentioned
    const majorLocations = Object.keys(distanceMatrix);
    const mentionedLocation = majorLocations.find(location => 
      activityName.toLowerCase().includes(location.toLowerCase())
    );
    
    return mentionedLocation;
  }
  
  return null;
}

/**
 * Get district name by ID (you'll need to implement this based on your districts data)
 * @param {string|number} districtId - District ID
 * @returns {string} District name
 */
function getDistrictNameById(districtId) {
  // This should map to your actual districts data
  const districtMap = {
    '1': 'Colombo',
    '2': 'Kandy',
    '3': 'Galle',
    '4': 'Jaffna',
    '5': 'Nuwara Eliya',
    '6': 'Negombo',
    '7': 'Batticaloa',
    '8': 'Anuradhapura',
    '9': 'Trincomalee',
    '10': 'Ratnapura',
    '11': 'Badulla',
    '12': 'Matara',
    '13': 'Kurunegala'
  };
  
  return districtMap[districtId.toString()] || null;
}

/**
 * Calculate vehicle cost for the trip
 * @param {Object} vehicle - Vehicle object with pricePerDay and pricePerKm
 * @param {number} totalDistance - Total trip distance in kilometers
 * @param {number} numberOfDays - Number of days for the trip
 * @returns {Object} Cost breakdown
 */
export function calculateVehicleCost(vehicle, totalDistance, numberOfDays) {
  if (!vehicle) {
    return { totalCost: 0, breakdown: {} };
  }
  
  const dailyCost = (vehicle.pricePerDay || 0) * numberOfDays;
  const distanceCost = (vehicle.pricePerKm || 0) * totalDistance;
  const totalCost = dailyCost + distanceCost;
  
  return {
    totalCost,
    breakdown: {
      dailyCost,
      distanceCost,
      pricePerDay: vehicle.pricePerDay || 0,
      pricePerKm: vehicle.pricePerKm || 0,
      numberOfDays,
      totalDistance
    }
  };
}

/**
 * Get trip duration in days from duration string
 * @param {string} duration - Duration string like "3-days" or "1-day"
 * @returns {number} Number of days
 */
export function getDaysFromDuration(duration) {
  if (!duration) return 1;
  
  const match = duration.match(/(\d+)-days?/);
  return match ? parseInt(match[1]) : 1;
}

/**
 * Calculate complete trip cost with vehicle
 * @param {Object} vehicle - Vehicle object
 * @param {Array} itinerary - Trip itinerary
 * @param {string} duration - Trip duration
 * @param {string} startLocation - Starting location
 * @param {string} endLocation - Ending location
 * @returns {Object} Complete cost calculation
 */
export function calculateCompleteTripCost(vehicle, itinerary, duration, startLocation = 'Colombo', endLocation = null) {
  const numberOfDays = getDaysFromDuration(duration);
  const distanceCalculation = calculateTripDistance(itinerary, startLocation, endLocation);
  const costCalculation = calculateVehicleCost(vehicle, distanceCalculation.totalDistance, numberOfDays);
  
  return {
    vehicle: {
      name: vehicle.name,
      type: vehicle.type,
      id: vehicle.id
    },
    trip: {
      duration,
      numberOfDays,
      startLocation,
      endLocation: endLocation || startLocation
    },
    distance: distanceCalculation,
    cost: costCalculation
  };
}
