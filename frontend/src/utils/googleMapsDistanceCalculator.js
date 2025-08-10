// Google Maps Distance Matrix API integration
// Add this to your utils folder

/**
 * Google Maps Distance Matrix API integration
 * Requires Google Maps API key with Distance Matrix API enabled
 */

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

/**
 * Calculate distance using Google Maps Distance Matrix API
 * @param {string} origin - Starting location (e.g., "Colombo, Sri Lanka")
 * @param {string} destination - Ending location (e.g., "Kandy, Sri Lanka")
 * @param {string} mode - Travel mode: driving, walking, bicycling, transit
 * @returns {Promise<Object>} Distance and duration data
 */
export async function getGoogleMapsDistance(origin, destination, mode = 'driving') {
  if (!GOOGLE_MAPS_API_KEY) {
    console.warn('Google Maps API key not found. Using fallback distance calculation.');
    return null;
  }

  try {
    const encodedOrigin = encodeURIComponent(origin);
    const encodedDestination = encodeURIComponent(destination);
    
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?` +
                `origins=${encodedOrigin}&` +
                `destinations=${encodedDestination}&` +
                `mode=${mode}&` +
                `units=metric&` +
                `key=${GOOGLE_MAPS_API_KEY}`;

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.status !== 'OK') {
      throw new Error(`Google Maps API error: ${data.status}`);
    }
    
    const element = data.rows[0].elements[0];
    
    if (element.status !== 'OK') {
      throw new Error(`Route not found: ${element.status}`);
    }
    
    return {
      distance: {
        text: element.distance.text,
        value: element.distance.value / 1000 // Convert meters to kilometers
      },
      duration: {
        text: element.duration.text,
        value: element.duration.value / 60 // Convert seconds to minutes
      },
      origin,
      destination
    };
    
  } catch (error) {
    console.error('Google Maps Distance calculation failed:', error);
    return null;
  }
}

/**
 * Calculate multiple distances in batch
 * More efficient for multiple origin-destination pairs
 * @param {Array<string>} origins - Array of starting locations
 * @param {Array<string>} destinations - Array of ending locations
 * @param {string} mode - Travel mode
 * @returns {Promise<Array>} Array of distance results
 */
export async function getBatchGoogleMapsDistances(origins, destinations, mode = 'driving') {
  if (!GOOGLE_MAPS_API_KEY) {
    console.warn('Google Maps API key not found. Using fallback distance calculation.');
    return [];
  }

  try {
    const encodedOrigins = origins.map(o => encodeURIComponent(o)).join('|');
    const encodedDestinations = destinations.map(d => encodeURIComponent(d)).join('|');
    
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?` +
                `origins=${encodedOrigins}&` +
                `destinations=${encodedDestinations}&` +
                `mode=${mode}&` +
                `units=metric&` +
                `key=${GOOGLE_MAPS_API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();
    
    if (data.status !== 'OK') {
      throw new Error(`Google Maps API error: ${data.status}`);
    }
    
    const results = [];
    
    data.rows.forEach((row, originIndex) => {
      row.elements.forEach((element, destIndex) => {
        if (element.status === 'OK') {
          results.push({
            origin: origins[originIndex],
            destination: destinations[destIndex],
            distance: {
              text: element.distance.text,
              value: element.distance.value / 1000
            },
            duration: {
              text: element.duration.text,
              value: element.duration.value / 60
            }
          });
        }
      });
    });
    
    return results;
    
  } catch (error) {
    console.error('Batch Google Maps Distance calculation failed:', error);
    return [];
  }
}

/**
 * Enhanced trip distance calculation with Google Maps fallback
 * Uses Google Maps API when available, falls back to local matrix
 */
export async function calculateTripDistanceWithGoogleMaps(itinerary, startLocation = 'Colombo, Sri Lanka', endLocation = null) {
  const locations = [startLocation];
  
  // Extract locations from itinerary
  itinerary.forEach(day => {
    if (day.activities && day.activities.length > 0) {
      day.activities.forEach(activity => {
        const activityLocation = getLocationFromActivity(activity);
        if (activityLocation && !locations.includes(activityLocation)) {
          locations.push(activityLocation + ', Sri Lanka'); // Add country for better Google Maps recognition
        }
      });
    }
  });
  
  if (endLocation && !locations.includes(endLocation)) {
    locations.push(endLocation + ', Sri Lanka');
  }
  
  let totalDistance = 0;
  const routeDetails = [];
  
  // Calculate distances between consecutive locations
  for (let i = 0; i < locations.length - 1; i++) {
    const origin = locations[i];
    const destination = locations[i + 1];
    
    // Try Google Maps API first
    const googleResult = await getGoogleMapsDistance(origin, destination);
    
    if (googleResult) {
      totalDistance += googleResult.distance.value;
      routeDetails.push({
        from: origin,
        to: destination,
        distance: googleResult.distance.value,
        duration: googleResult.duration.value,
        source: 'google_maps'
      });
    } else {
      // Fallback to local distance matrix
      const fallbackDistance = getFallbackDistance(origin, destination);
      totalDistance += fallbackDistance;
      routeDetails.push({
        from: origin,
        to: destination,
        distance: fallbackDistance,
        duration: fallbackDistance * 1.5, // Estimate: 1.5 minutes per km
        source: 'fallback'
      });
    }
    
    // Add delay to respect API rate limits (optional)
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  return {
    totalDistance,
    routeDetails,
    locations,
    apiCallsUsed: routeDetails.filter(r => r.source === 'google_maps').length
  };
}

// Helper function to get fallback distance from local matrix
function getFallbackDistance(origin, destination) {
  // Import your existing distance calculation logic
  // This is a simplified version - use your actual getDistanceBetween function
  const cityMap = {
    'Colombo, Sri Lanka': 'Colombo',
    'Kandy, Sri Lanka': 'Kandy',
    'Galle, Sri Lanka': 'Galle',
    'Nuwara Eliya, Sri Lanka': 'Nuwara Eliya'
  };
  
  const fromCity = cityMap[origin] || 'Colombo';
  const toCity = cityMap[destination] || 'Kandy';
  
  // Use your existing distance matrix logic here
  return 80; // Default fallback distance
}

// Helper function - implement based on your activity structure
function getLocationFromActivity(activity) {
  // Map districtId to city names
  const districtMap = {
    '1': 'Colombo',
    '2': 'Kandy', 
    '3': 'Galle',
    '4': 'Jaffna',
    '5': 'Nuwara Eliya'
  };
  
  if (activity.districtId) {
    return districtMap[activity.districtId];
  }
  
  return activity.location || null;
}
