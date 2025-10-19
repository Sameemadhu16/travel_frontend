// src/pages/guide/hooks/useConfirmedTours.js
import { useState, useEffect } from 'react';
import { getRequest, putRequest } from '../../../core/service';

const useConfirmedTours = (guideId) => {
  const [confirmedTours, setConfirmedTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchConfirmedTours = async () => {
    if (!guideId) {
      setError('Guide ID not provided');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await getRequest(`/api/guid-requests/guid/${guideId}`);

      if (!Array.isArray(response)) {
        setConfirmedTours([]);
        setLoading(false);
        return;
      }

      // Filter for confirmed tours with paid status
      const confirmedRequests = response.filter(
        (req) => req.status === 'accepted' && req.paymentStatus === 'paid'
      );

      const transformedTours = confirmedRequests.map((req) => ({
        requestId: req.id,
        tripId: req.trip?.id,
        customer: {
          user_id: req.user?.id,
          name: req.travelerName || `${req.user?.firstName} ${req.user?.lastName}`,
          email: req.travelerEmail || req.user?.email,
          phone: req.travelerPhone || req.user?.phone,
          image: req.user?.profilePictures?.[0] || null,
          joined: req.user?.createdAt
            ? new Date(req.user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
            : 'Unknown',
        },
        tour: {
          tour_id: req.trip?.id,
          destination: req.trip?.destination || 'Not specified',
          date: formatTripDates(req.trip?.tripStartDate, req.trip?.tripEndDate),
          groupSize: String((req.trip?.numberOfAdults || 0) + (req.trip?.numberOfKids || 0)),
          duration: calculateDuration(req.trip?.tripStartDate, req.trip?.tripEndDate) || req.trip?.duration || '0',
        },
        payment: {
          payment_id: req.id,
          dailyRate: formatCurrency(req.trip?.basePrice || 0),
          totalAmount: formatCurrency(
            req.amount ||
              req.trip?.basePrice * parseInt(calculateDuration(req.trip?.tripStartDate, req.trip?.tripEndDate)) ||
              0,
          ),
          status: 'Confirmed',
          accepted: '100%',
          due: 'Payment Received',
          paidDate: req.updatedAt
            ? new Date(req.updatedAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })
            : 'N/A',
        },
        accommodation: transformAccommodation(req.trip?.selectedHotels, req.trip?.selectedRooms),
        transport: transformTransport(req.trip?.selectedVehicle, req.trip?.selectedVehicleAgency),
        itinerary: transformItinerary(req.trip?.itineraryJson),
        rawData: req,
      }));

      setConfirmedTours(transformedTours);
    } catch (err) {
      setError(err.message || 'Failed to fetch confirmed tours');
      console.error('Error fetching confirmed tours:', err);
      setConfirmedTours([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfirmedTours();
  }, [guideId]);

  const startTour = async (requestId, tripId) => {
    try {
      setError(null);

      // Update trip status to 'active' or 'in_progress'
      const tripPayload = {
        tripStatus: 'in_progress',
      };

      await putRequest(`/api/trips/${tripId}`, tripPayload);

      // Optionally update the request status
      const requestPayload = {
        status: 'in_progress',
      };

      await putRequest(`/api/guid-requests/${requestId}`, requestPayload);

      // Remove from confirmed tours list
      setConfirmedTours((prev) => prev.filter((tour) => tour.requestId !== requestId));

      return true;
    } catch (err) {
      setError(err.message || 'Failed to start tour');
      console.error('Error starting tour:', err);
      throw err;
    }
  };

  return {
    confirmedTours,
    loading,
    error,
    startTour,
    refreshTours: fetchConfirmedTours,
  };
};

// Helper functions
function formatTripDates(startDate, endDate) {
  if (!startDate || !endDate) return 'Not specified';

  try {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const monthStart = start.toLocaleDateString('en-US', { month: 'short' });
    const dayStart = start.getDate();
    const monthEnd = end.toLocaleDateString('en-US', { month: 'short' });
    const dayEnd = end.getDate();
    const year = end.getFullYear();

    return `${monthStart} ${dayStart}–${monthEnd} ${dayEnd}, ${year}`;
  } catch {
    return 'Invalid dates';
  }
}

function calculateDuration(startDate, endDate) {
  if (!startDate || !endDate) return '0';

  try {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return String(diffDays);
  } catch {
    return '0';
  }
}

function formatCurrency(amount) {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function transformAccommodation(hotels, rooms) {
  if (!hotels || hotels.length === 0) return [];

  return hotels.map((hotel, idx) => ({
    hotelName: hotel.hotelName || 'Hotel',
    roomType: rooms?.[idx]?.roomType || 'Standard Room',
    nights: rooms?.[idx]?.nights || 1,
    dates: 'Not specified',
    price: formatCurrency(rooms?.[idx]?.pricePerNight || hotel.pricePerNight || 0),
  }));
}

function transformTransport(vehicle, agency) {
  if (!vehicle) return null;

  return {
    type: vehicle.vehicleType || 'Vehicle',
    details: `${vehicle.vehicleModel || ''} - ${agency?.agencyName || 'Agency'}`,
    price: formatCurrency(vehicle.basePrice || 0),
  };
}

function transformItinerary(itineraryJson) {
  if (!itineraryJson) return [];

  try {
    let parsed = itineraryJson;

    if (typeof itineraryJson === 'string') {
      const cleaned = itineraryJson.replace(/\r\n/g, '');
      parsed = JSON.parse(cleaned);
    }

    if (Array.isArray(parsed)) {
      return parsed.map((dayItem) => ({
        day: dayItem.day || 0,
        activities: dayItem.activities || [],
      }));
    }

    return [];
  } catch (err) {
    console.error('Error parsing itinerary:', err, itineraryJson);
    return [];
  }
}

export default useConfirmedTours;
