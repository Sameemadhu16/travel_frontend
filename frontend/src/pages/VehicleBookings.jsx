import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Main from '../components/Main';
import Spinner from '../components/Spinner';
import { FaCar, FaCalendarAlt, FaMapMarkerAlt, FaUser } from 'react-icons/fa';
import { getVehicleBookingsByUserId } from '../api/vehicleService';

const VehicleBookings = () => {
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

      console.log('Fetching vehicle bookings for user:', userId);
      const response = await getVehicleBookingsByUserId(userId);

      console.log('Vehicle bookings fetched:', response);
      // Sort by created date - most recent first
      const sortedBookings = response.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      setBookings(sortedBookings);
    } catch (error) {
      console.error('Error fetching vehicle bookings:', error);
      toast.error('Failed to load your vehicle bookings');
    } finally {
      setLoading(false);
    }
  };

  const getFilteredBookings = () => {
    if (filter === 'all') return bookings;
    return bookings.filter(booking => 
      booking.bookingStatus?.toLowerCase() === filter.toLowerCase()
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
      case 'COMPLETED':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case 'PAID':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'FAILED':
        return 'bg-red-100 text-red-800';
      case 'REFUNDED':
        return 'bg-purple-100 text-purple-800';
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Vehicle Bookings</h1>
          <p className="text-gray-600">View and manage all your vehicle rentals</p>
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
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'completed'
                ? 'bg-brand-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Completed ({bookings.filter(b => b.bookingStatus === 'COMPLETED').length})
          </button>
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <div className="mb-4">
              <FaCar className="mx-auto h-16 w-16 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {filter === 'all' ? 'No bookings yet' : `No ${filter} bookings`}
            </h3>
            <p className="text-gray-600 mb-6">
              {filter === 'all'
                ? "You haven't made any vehicle bookings yet. Start exploring!"
                : `You don't have any ${filter} bookings.`}
            </p>
            <button
              onClick={() => navigate('/vehicle-search')}
              className="px-6 py-3 bg-brand-primary text-white rounded-lg hover:bg-brand-primary-dark transition-colors"
            >
              Browse Vehicles
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
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    {/* Booking Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <FaCar className="text-brand-primary text-2xl" />
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900">
                              {booking.vehicle?.name || 'Vehicle Booking'}
                            </h3>
                            <p className="text-gray-600 text-sm">
                              {booking.vehicle?.type} • {booking.vehicle?.seats} seats
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
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

                      {/* Rental Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <FaCalendarAlt className="text-gray-400 text-sm" />
                            <p className="text-xs text-gray-500 font-medium">PICKUP</p>
                          </div>
                          <p className="font-semibold text-gray-900">
                            {new Date(booking.pickupDate).toLocaleDateString('en-US', {
                              weekday: 'short',
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </p>
                          <p className="text-sm text-gray-600">
                            at {booking.pickupTime || '10:00'}
                          </p>
                        </div>

                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <FaCalendarAlt className="text-gray-400 text-sm" />
                            <p className="text-xs text-gray-500 font-medium">RETURN</p>
                          </div>
                          <p className="font-semibold text-gray-900">
                            {new Date(booking.returnDate).toLocaleDateString('en-US', {
                              weekday: 'short',
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </p>
                          <p className="text-sm text-gray-600">
                            at {booking.returnTime || '10:00'}
                          </p>
                        </div>
                      </div>

                      {/* Location Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <FaMapMarkerAlt className="text-green-600 text-sm" />
                            <p className="text-xs text-gray-500 font-medium">PICKUP LOCATION</p>
                          </div>
                          <p className="text-sm text-gray-900 font-medium">
                            {booking.pickupLocation}
                          </p>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <FaMapMarkerAlt className="text-red-600 text-sm" />
                            <p className="text-xs text-gray-500 font-medium">DROPOFF LOCATION</p>
                          </div>
                          <p className="text-sm text-gray-900 font-medium">
                            {booking.dropoffLocation}
                          </p>
                        </div>
                      </div>

                      {/* Additional Info */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Number of Days</p>
                          <p className="font-semibold text-gray-900">
                            {booking.numberOfDays} day{booking.numberOfDays !== 1 ? 's' : ''}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">Driver Option</p>
                          <p className="font-semibold text-gray-900">
                            {booking.withDriver ? 'With Driver' : 'Self Drive'}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">Contact Person</p>
                          <p className="font-semibold text-gray-900">
                            {booking.firstName} {booking.lastName}
                          </p>
                        </div>
                      </div>

                      {!booking.withDriver && booking.driverLicenseNumber && (
                        <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <FaUser className="text-blue-600 text-sm" />
                            <p className="text-xs text-blue-600 font-medium">LICENSE DETAILS</p>
                          </div>
                          <p className="text-sm text-gray-900">
                            License: {booking.driverLicenseNumber}
                          </p>
                          {booking.licenseExpiryDate && (
                            <p className="text-xs text-gray-600">
                              Valid until: {new Date(booking.licenseExpiryDate).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      )}

                      {booking.specialRequests && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-500 mb-1 font-medium">SPECIAL REQUESTS</p>
                          <p className="text-sm text-gray-700">{booking.specialRequests}</p>
                        </div>
                      )}
                    </div>

                    {/* Price & Actions */}
                    <div className="flex flex-col items-end gap-4 lg:min-w-[200px]">
                      <div className="text-right">
                        <p className="text-gray-500 text-sm">Total Amount</p>
                        <p className="text-2xl font-bold text-brand-primary">
                          LKR {booking.totalCost?.toLocaleString()}
                        </p>
                        <div className="text-xs text-gray-500 mt-2 space-y-1">
                          <p>Base: LKR {booking.basePrice?.toLocaleString()}</p>
                          {booking.withDriver && booking.driverFee > 0 && (
                            <p>Driver Fee: LKR {booking.driverFee?.toLocaleString()}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 w-full">
                        <button
                          onClick={() => navigate(`/vehicle-search`)}
                          className="px-4 py-2 border border-brand-primary text-brand-primary rounded-lg hover:bg-brand-accent transition-colors text-sm font-medium"
                        >
                          Browse Vehicles
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
                            Cancel Booking
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-4 pt-4 border-t border-gray-200 flex flex-wrap justify-between items-center gap-4 text-xs text-gray-500">
                    <div>
                      <span>Booking ID: </span>
                      <span className="font-medium">#{booking.id}</span>
                    </div>
                    <div>
                      <span>Booked on: </span>
                      <span className="font-medium">
                        {new Date(booking.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
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
                    <div>
                      <span>Email: </span>
                      <span className="font-medium">{booking.email}</span>
                    </div>
                    <div>
                      <span>Phone: </span>
                      <span className="font-medium">{booking.phone}</span>
                    </div>
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

export default VehicleBookings;
