import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Main from '../components/Main';
import Spinner from '../components/Spinner';

// Get API base URL from environment variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5454';

const HotelBookings = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, confirmed, pending, cancelled

  useEffect(() => {
    fetchBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      
      // Get user ID
      const userId = user?.data?.id || user?.uid || user?.id || user?.userId;
      
      if (!userId) {
        toast.error('User not found. Please login again.');
        navigate('/welcome');
        return;
      }

      const response = await axios.get(
        `${API_BASE_URL}/api/hotel-bookings/user/${userId}`
      );

      console.log('Hotel bookings fetched:', response.data);
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching hotel bookings:', error);
      toast.error('Failed to load your hotel bookings');
    } finally {
      setLoading(false);
    }
  };

  const getFilteredBookings = () => {
    if (filter === 'all') return bookings;
    return bookings.filter(booking => 
      booking.bookingStatus.toLowerCase() === filter.toLowerCase()
    );
  };

  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case 'CONFIRMED':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'FAILED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredBookings = getFilteredBookings();

  if (loading) {
    return <Spinner />;
  }

  return (
    <Main>
      <div className="w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Hotel Bookings</h1>
          <p className="text-gray-600">View and manage all your hotel reservations</p>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-3">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'all'
                ? 'bg-brand-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All ({bookings.length})
          </button>
          <button
            onClick={() => setFilter('confirmed')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'confirmed'
                ? 'bg-brand-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Confirmed ({bookings.filter(b => b.bookingStatus === 'CONFIRMED').length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'pending'
                ? 'bg-brand-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Pending ({bookings.filter(b => b.bookingStatus === 'PENDING').length})
          </button>
          <button
            onClick={() => setFilter('cancelled')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'cancelled'
                ? 'bg-brand-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Cancelled ({bookings.filter(b => b.bookingStatus === 'CANCELLED').length})
          </button>
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <div className="mb-4">
              <svg
                className="mx-auto h-16 w-16 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {filter === 'all' ? 'No bookings yet' : `No ${filter} bookings`}
            </h3>
            <p className="text-gray-600 mb-6">
              {filter === 'all'
                ? "You haven't made any hotel bookings yet. Start exploring!"
                : `You don't have any ${filter} bookings.`}
            </p>
            <button
              onClick={() => navigate('/bookings/hotels')}
              className="px-6 py-3 bg-brand-primary text-white rounded-lg hover:bg-brand-primary-dark transition-colors"
            >
              Browse Hotels
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    {/* Booking Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-1">
                            {booking.hotelName}
                          </h3>
                          <p className="text-gray-600">{booking.roomType}</p>
                        </div>
                        <div className="flex gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                              booking.bookingStatus
                            )}`}
                          >
                            {booking.bookingStatus}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getPaymentStatusColor(
                              booking.paymentStatus
                            )}`}
                          >
                            {booking.paymentStatus}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Booking Reference</p>
                          <p className="font-semibold text-gray-900">
                            {booking.bookingReference}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">Guest Name</p>
                          <p className="font-semibold text-gray-900">{booking.userName}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Check-in</p>
                          <p className="font-semibold text-gray-900">
                            {new Date(booking.checkInDate).toLocaleDateString('en-US', {
                              weekday: 'short',
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">Check-out</p>
                          <p className="font-semibold text-gray-900">
                            {new Date(booking.checkOutDate).toLocaleDateString('en-US', {
                              weekday: 'short',
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">Nights</p>
                          <p className="font-semibold text-gray-900">
                            {booking.numberOfNights} night{booking.numberOfNights !== 1 ? 's' : ''}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">Guests</p>
                          <p className="font-semibold text-gray-900">
                            {booking.numberOfGuests} guest{booking.numberOfGuests !== 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>

                      {booking.specialRequests && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-500 mb-1">Special Requests</p>
                          <p className="text-sm text-gray-700">{booking.specialRequests}</p>
                        </div>
                      )}
                    </div>

                    {/* Price & Actions */}
                    <div className="flex flex-col items-end gap-4">
                      <div className="text-right">
                        <p className="text-gray-500 text-sm">Total Amount</p>
                        <p className="text-2xl font-bold text-brand-primary">
                          {booking.currency} ${booking.totalAmount?.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500">
                          ${booking.pricePerNight?.toLocaleString()} per night
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/bookings/hotels/${booking.hotelId}`)}
                          className="px-4 py-2 border border-brand-primary text-brand-primary rounded-lg hover:bg-brand-accent transition-colors text-sm font-medium"
                        >
                          View Hotel
                        </button>
                        {booking.bookingStatus === 'CONFIRMED' && (
                          <button
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                            onClick={() => {
                              if (window.confirm('Are you sure you want to cancel this booking?')) {
                                // TODO: Implement cancel booking
                                toast.info('Cancel booking feature coming soon');
                              }
                            }}
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center text-xs text-gray-500">
                    <div>
                      <span>Booked on: </span>
                      <span className="font-medium">
                        {new Date(booking.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    {booking.paymentDate && (
                      <div>
                        <span>Payment Date: </span>
                        <span className="font-medium">
                          {new Date(booking.paymentDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Main>
  );
};

export default HotelBookings;
