// src/pages/guide/hooks/useAcceptedTours.js
import { useState, useEffect } from 'react';
import { getRequest } from '../../../core/service';

const useAcceptedTours = (guideId) => {
  const [acceptedTours, setAcceptedTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!guideId) {
      setError('Guide ID not provided');
      setLoading(false);
      return;
    }

    const fetchAcceptedTours = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getRequest(`/api/guid-requests/guid/${guideId}`);

        if (!Array.isArray(response)) {
          setAcceptedTours([]);
          setLoading(false);
          return;
        }

        // Filter for accepted tours with pending payment
        const acceptedRequests = response.filter(
          (req) => req.status === 'accepted' && req.paymentStatus === 'pending'
        );

        const transformedTours = acceptedRequests.map((req) => ({
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
            status: 'Pending Payment',
            deadline: calculateDeadline(req.createdAt),
            due: req.trip?.tripStartDate ? new Date(req.trip.tripStartDate).toLocaleDateString() : 'Not specified',
            accepted: req.updatedAt
              ? new Date(req.updatedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })
              : new Date().toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                }),
          },
          accommodation: transformAccommodation(req.trip?.selectedHotels, req.trip?.selectedRooms),
          transport: transformTransport(req.trip?.selectedVehicle, req.trip?.selectedVehicleAgency),
          itinerary: transformItinerary(req.trip?.itineraryJson),
          rawData: req,
        }));

        setAcceptedTours(transformedTours);
      } catch (err) {
        setError(err.message || 'Failed to fetch accepted tours');
        console.error('Error fetching accepted tours:', err);
        setAcceptedTours([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAcceptedTours();
  }, [guideId]);

  const sendPaymentReminder = async (requestId) => {
    try {
      setError(null);
      // TODO: Implement payment reminder logic
      console.log('Sending payment reminder for request:', requestId);
      // You can add an API call here to send email/notification
      return true;
    } catch (err) {
      setError(err.message || 'Failed to send payment reminder');
      console.error('Error sending payment reminder:', err);
      throw err;
    }
  };

  return {
    acceptedTours,
    loading,
    error,
    sendPaymentReminder,
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

function calculateDeadline(createdDate) {
  if (!createdDate) return 'Unknown';

  try {
    const created = new Date(createdDate);
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

export default useAcceptedTours;
