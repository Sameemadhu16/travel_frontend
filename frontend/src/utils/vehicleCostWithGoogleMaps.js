// Example: How to integrate Google Maps API with your vehicle selection

import { calculateCompleteTripCost } from '../utils/tripCalculator.js';
import { calculateTripDistanceWithGoogleMaps } from '../utils/googleMapsDistanceCalculator.js';

/**
 * Enhanced vehicle cost calculation with Google Maps
 * Falls back to local calculation if Google Maps fails
 */
export async function calculateVehicleCostWithGoogleMaps(vehicle, formData) {
  try {
    // Try Google Maps calculation first
    const googleMapsResult = await calculateTripDistanceWithGoogleMaps(
      formData.itinerary,
      formData.travelDetails.location || 'Colombo'
    );
    
    if (googleMapsResult && googleMapsResult.totalDistance > 0) {
      // Use Google Maps distances
      const numberOfDays = getDaysFromDuration(formData.travelDetails.duration);
      const dailyCost = vehicle.pricePerDay * numberOfDays;
      const distanceCost = vehicle.pricePerKm * googleMapsResult.totalDistance;
      
      return {
        vehicle: {
          name: vehicle.name,
          type: vehicle.type,
          id: vehicle.id
        },
        trip: {
          duration: formData.travelDetails.duration,
          numberOfDays,
          startLocation: formData.travelDetails.location || 'Colombo'
        },
        distance: {
          totalDistance: googleMapsResult.totalDistance,
          routeDetails: googleMapsResult.routeDetails,
          source: 'google_maps',
          apiCallsUsed: googleMapsResult.apiCallsUsed
        },
        cost: {
          totalCost: dailyCost + distanceCost,
          breakdown: {
            dailyCost,
            distanceCost,
            pricePerDay: vehicle.pricePerDay,
            pricePerKm: vehicle.pricePerKm,
            numberOfDays,
            totalDistance: googleMapsResult.totalDistance
          }
        }
      };
    }
  } catch (error) {
    console.warn('Google Maps calculation failed, using fallback:', error.message);
  }
  
  // Fallback to local calculation
  return calculateCompleteTripCost(
    vehicle,
    formData.itinerary,
    formData.travelDetails.duration,
    formData.travelDetails.location || 'Colombo'
  );
}

// Helper function for duration parsing
function getDaysFromDuration(duration) {
  if (!duration) return 1;
  const match = /(\d+)-days?/.exec(duration);
  return match ? parseInt(match[1]) : 1;
}

/**
 * Usage in your SearchVehicles component:
 * 
 * // Replace this in SearchVehicles.jsx:
 * const tripCostData = calculateCompleteTripCost(
 *   vehicle,
 *   formData.itinerary,
 *   travelDetails.duration,
 *   travelDetails.location || 'Colombo'
 * );
 * 
 * // With this:
 * const tripCostData = await calculateVehicleCostWithGoogleMaps(vehicle, formData);
 * 
 * // Note: You'll need to make the useMemo async or use useEffect
 */

/**
 * React Hook for Google Maps integration
 */
import { useState, useEffect } from 'react';

export function useVehicleCostCalculation(vehicle, formData) {
  const [tripCostData, setTripCostData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (!vehicle || !formData.itinerary) {
      setTripCostData(null);
      return;
    }
    
    const calculateCost = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const result = await calculateVehicleCostWithGoogleMaps(vehicle, formData);
        setTripCostData(result);
      } catch (err) {
        setError(err.message);
        // Fallback calculation
        const fallback = calculateCompleteTripCost(
          vehicle,
          formData.itinerary,
          formData.travelDetails.duration,
          formData.travelDetails.location || 'Colombo'
        );
        setTripCostData(fallback);
      } finally {
        setLoading(false);
      }
    };
    
    calculateCost();
  }, [vehicle, formData.itinerary, formData.travelDetails.duration, formData.travelDetails.location]);
  
  return { tripCostData, loading, error };
}
