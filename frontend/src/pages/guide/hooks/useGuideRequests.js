// src/pages/guide/hooks/useGuideRequests.js
import { useState, useEffect } from 'react';
import { getRequest, putRequest } from '../../../core/service';

const useGuideRequests = (guideId) => {
  const [tourRequests, setTourRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!guideId) {
      setError('Guide ID not provided');
      setLoading(false);
      return;
    }

    const fetchRequests = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getRequest(`/api/guid-requests/guid/${guideId}`);

        if (!Array.isArray(response)) {
          setTourRequests([]);
          setLoading(false);
          return;
        }

        const pendingRequests = response.filter((req) => req.status?.toLowerCase() === 'pending');

        const transformedRequests = pendingRequests.map((req) => {
          // Get customer info from trip object primarily, fallback to user
          const customerName = req.trip?.fullName ||
                              (req.user?.firstName && req.user?.lastName
                                ? `${req.user.firstName} ${req.user.lastName}`
                                : req.user?.email?.split('@')[0] || 'Unknown Customer');

          const customerEmail = req.trip?.email || req.user?.email || 'Not provided';
          const customerPhone = req.trip?.phone || req.user?.phone || 'Not provided';

          // Get pickup location as destination since destination field is empty
          const destination = req.trip?.pickupLocation || req.trip?.destination || 'Not specified';

          // Calculate duration from trip dates or use duration field
          const durationDays = calculateDuration(req.trip?.tripStartDate, req.trip?.tripEndDate) ||
                              parseDuration(req.trip?.duration) || '0';

          return {
            requestId: req.id,
            tripId: req.trip?.id,
            customer: {
              user_id: req.user?.id,
              name: customerName,
              email: customerEmail,
              phone: customerPhone,
              image: req.user?.profilePictures?.[0] || null,
              joined: req.user?.createdAt
                ? new Date(req.user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
                : 'Unknown',
            },
            tour: {
              tour_id: req.trip?.id,
              destination: destination,
              date: formatTripDates(req.trip?.tripStartDate, req.trip?.tripEndDate),
              groupSize: String((req.trip?.numberOfAdults || 0) + (req.trip?.numberOfKids || 0)),
              duration: durationDays,
            },
            payment: {
              payment_id: req.id,
              dailyRate: formatCurrency(req.trip?.basePrice || 0),
              totalAmount: formatCurrency(
                req.amount || (req.trip?.basePrice * parseInt(durationDays)) || 0
              ),
              status: 'Pending Payment',
              deadline: calculateDeadline(req.createdAt),
              due: req.requestedDate ? new Date(req.requestedDate).toLocaleDateString() : 'Not specified',
            },
            accommodation: transformAccommodation(req.trip?.selectedHotels, req.trip?.selectedRooms),
            transport: transformTransport(req.trip?.selectedVehicle, req.trip?.selectedVehicleAgency),
            itinerary: transformItinerary(req.trip?.itineraryJson),
            rawData: req,
          };
        });

        setTourRequests(transformedRequests);
      } catch (err) {
        setError(err.message || 'Failed to fetch tour requests');
        console.error('Error fetching requests:', err);
        setTourRequests([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [guideId]);

  const acceptRequest = async (requestId, tripId, guideId) => {
    try {
      setError(null);

      const tripPayload = {
        selectedGuide: {
          id: guideId,
        },
        tripStatus: 'accepted',
      };

      await putRequest(`/api/trips/${tripId}`, tripPayload);

      // Try multiple field name formats in case backend expects different casing
      const requestPayload = {
        status: 'accepted',
        paymentStatus: 'PENDING',  // Try uppercase to match enum
      };

      console.log('Accepting request with payload:', requestPayload);
      const response = await putRequest(`/api/guid-requests/${requestId}`, requestPayload);
      console.log('Accept response:', response);

      // Check if paymentStatus was saved
      if (response.paymentStatus === null) {
        console.warn('⚠️ Backend did not save paymentStatus! Backend issue - check backend entity/model.');
      }

      setTourRequests((prev) => prev.filter((req) => req.requestId !== requestId));

      return true;
    } catch (err) {
      setError(err.message || 'Failed to accept request');
      console.error('Error accepting request:', err);
      throw err;
    }
  };

  const rejectRequest = async (requestId) => {
    try {
      setError(null);

      const payload = {
        status: 'rejected',
      };

      await putRequest(`/api/guid-requests/${requestId}`, payload);

      setTourRequests((prev) => prev.filter((req) => req.requestId !== requestId));

      return true;
    } catch (err) {
      setError(err.message || 'Failed to reject request');
      console.error('Error rejecting request:', err);
      throw err;
    }
  };

  return {
    tourRequests,
    loading,
    error,
    acceptRequest,
    rejectRequest,
  };
};

function formatTripDates(startDate, endDate) {
  if (!startDate) return 'Not specified';

  try {
    const start = new Date(startDate);

    // If no end date, just show start date
    if (!endDate) {
      const monthStart = start.toLocaleDateString('en-US', { month: 'short' });
      const dayStart = start.getDate();
      const year = start.getFullYear();
      return `${monthStart} ${dayStart}, ${year}`;
    }

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
  if (!startDate) return null;
  if (!endDate) return null;

  try {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return String(diffDays);
  } catch {
    return null;
  }
}

function parseDuration(durationString) {
  if (!durationString) return '0';

  try {
    // Handle formats like "2-days", "3-days", etc.
    const match = durationString.match(/(\d+)-?day/i);
    if (match) {
      return match[1];
    }

    // If it's just a number, return it
    if (!isNaN(durationString)) {
      return String(durationString);
    }

    return '0';
  } catch {
    return '0';
  }
}

function formatCurrency(amount) {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function calculateDeadline(createdDate) {
  if (!createdDate) return 'Unknown';

  try {
    let created;

    // Handle array format: [2025, 10, 20, 12, 53, 15, 169349000]
    if (Array.isArray(createdDate)) {
      const [year, month, day, hour, minute, second] = createdDate;
      created = new Date(year, month - 1, day, hour, minute, second);
    } else if (typeof createdDate === 'string') {
      created = new Date(createdDate);
    } else {
      return 'Unknown';
    }

    const deadline = new Date(created.getTime() + 7 * 24 * 60 * 60 * 1000);
    const today = new Date();
    const daysLeft = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));

    return daysLeft > 0 ? `${daysLeft} days left` : 'Expired';
  } catch {
    return 'Unknown';
  }
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

    // If it's a string, parse it
    if (typeof itineraryJson === 'string') {
      // Remove any \r\n characters
      const cleaned = itineraryJson.replace(/\r\n/g, '');
      parsed = JSON.parse(cleaned);
    }

    // If it's already an array, return it as-is
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

export default useGuideRequests;