import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getMyGuideBookingsGrouped, cancelGuideBooking, payGuideBooking } from '../../api/guideBookingService';
import toast from 'react-hot-toast';
import Main from '../../components/Main';
import Spinner from '../../components/Spinner';
import defaultGuideImg from '../../assets/users/user1.jpg';

const MyGuideBookings = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const [groupedBookings, setGroupedBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, pending, approved, paid, completed, cancelled

    useEffect(() => {
        // Check if user is authenticated
        if (!isAuthenticated || !user?.data?.id) {
            toast.error('Please login to view your bookings');
            navigate('/partner-login/step-1');
            return;
        }
        fetchBookings();
    }, [isAuthenticated, user, navigate]);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const data = await getMyGuideBookingsGrouped();
            setGroupedBookings(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching bookings:', error);
            toast.error(error.message || 'Failed to load bookings');
        } finally {
            setLoading(false);
        }
    };

    const handleCancelBooking = async (bookingId) => {
        if (!window.confirm('Are you sure you want to cancel this booking?')) return;

        try {
            await cancelGuideBooking(bookingId, 'Cancelled by user');
            toast.success('Booking cancelled successfully');
            fetchBookings();
        } catch (error) {
            console.error('Error cancelling booking:', error);
            toast.error('Failed to cancel booking');
        }
    };

    const handlePayment = async (bookingId) => {
        try {
            await payGuideBooking(bookingId, {});
            toast.success('Payment successful!');
            fetchBookings();
        } catch (error) {
            console.error('Error processing payment:', error);
            toast.error('Payment failed');
        }
    };

    const getStatusBadge = (status) => {
        const statusConfig = {
            PENDING: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending Approval' },
            APPROVED: { bg: 'bg-green-100', text: 'text-green-800', label: 'Approved - Pay Now' },
            PAID: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Paid' },
            COMPLETED: { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Completed' },
            CANCELLED: { bg: 'bg-red-100', text: 'text-red-800', label: 'Cancelled' },
            REJECTED: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Rejected' }
        };

        const config = statusConfig[status] || statusConfig.PENDING;
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
                {config.label}
            </span>
        );
    };

    const filteredBookings = groupedBookings.filter(booking => {
        if (filter === 'all') return true;
        return booking.overallStatus?.toLowerCase() === filter.toLowerCase();
    });

    if (loading) {
        return (
            <Main>
                <div className="min-h-screen flex items-center justify-center">
                    <Spinner />
                </div>
            </Main>
        );
    }

    return (
        <Main>
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-content-primary mb-2">My Guide Bookings</h1>
                        <p className="text-content-secondary">Manage your guide booking requests and reservations</p>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                        {['all', 'pending', 'approved', 'paid', 'completed', 'cancelled'].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilter(status)}
                                className={`px-6 py-2 rounded-lg font-medium whitespace-nowrap transition ${
                                    filter === status
                                        ? 'bg-brand-primary text-white'
                                        : 'bg-white text-content-secondary hover:bg-gray-100'
                                }`}
                            >
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </button>
                        ))}
                    </div>

                    {/* Bookings List */}
                    {filteredBookings.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                            <div className="text-6xl mb-4">📋</div>
                            <h3 className="text-xl font-semibold text-content-primary mb-2">No bookings found</h3>
                            <p className="text-content-secondary mb-6">You haven't made any guide bookings yet</p>
                            <button
                                onClick={() => navigate('/bookings/guide')}
                                className="px-6 py-3 bg-brand-primary text-white rounded-lg font-semibold hover:bg-warning transition"
                            >
                                Browse Guides
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {filteredBookings.map((booking) => (
                                <div key={booking.multiRequestId || `booking-${booking.guides[0]?.bookingId}`} className="bg-white rounded-lg shadow-sm overflow-hidden">
                                    {/* Booking Header */}
                                    <div className="bg-gradient-to-r from-brand-primary to-warning p-6 text-white">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-xl font-bold mb-2">
                                                    {booking.locations || 'Tour Booking'}
                                                </h3>
                                                <div className="flex flex-wrap gap-4 text-sm">
                                                    <span>📅 {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}</span>
                                                    <span>⏱️ {booking.numberOfDays} days</span>
                                                    <span>👥 {booking.numberOfPeople} people</span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                {getStatusBadge(booking.overallStatus)}
                                                <p className="text-xs mt-2 opacity-90">
                                                    Booked {new Date(booking.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Guide List */}
                                    <div className="p-6">
                                        <h4 className="font-semibold text-content-primary mb-4">
                                            {booking.guides.length > 1 
                                                ? `Requested ${booking.guides.length} Guides (First to approve gets the booking)`
                                                : 'Guide Details'}
                                        </h4>
                                        
                                        <div className="space-y-4">
                                            {booking.guides.map((guide, index) => (
                                                <div 
                                                    key={guide.bookingId} 
                                                    className={`flex items-center gap-4 p-4 rounded-lg border-2 ${
                                                        guide.guideId === booking.approvedGuideId 
                                                            ? 'border-green-500 bg-green-50' 
                                                            : 'border-gray-200 bg-gray-50'
                                                    }`}
                                                >
                                                    {/* Guide Avatar */}
                                                    <div className="flex-shrink-0">
                                                        <img
                                                            src={guide.guideImage || defaultGuideImg}
                                                            alt={guide.guideName}
                                                            className="w-16 h-16 rounded-full object-cover"
                                                        />
                                                    </div>

                                                    {/* Guide Info */}
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <h5 className="font-semibold text-content-primary">
                                                                {guide.guideName}
                                                            </h5>
                                                            {guide.guideId === booking.approvedGuideId && (
                                                                <span className="text-xs bg-green-500 text-white px-2 py-1 rounded">
                                                                    ✓ Approved Guide
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-sm text-content-secondary mb-2">
                                                            {guide.guideLanguages || 'Languages not specified'}
                                                        </p>
                                                        <div className="flex items-center gap-4 text-sm">
                                                            <span className="font-semibold text-brand-primary">
                                                                ${guide.totalPrice?.toFixed(2) || '0.00'}
                                                            </span>
                                                            {getStatusBadge(guide.status)}
                                                        </div>
                                                    </div>

                                                    {/* Action Buttons */}
                                                    <div className="flex-shrink-0">
                                                        {guide.status === 'APPROVED' && (
                                                            <button
                                                                onClick={() => handlePayment(guide.bookingId)}
                                                                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-sm font-semibold"
                                                            >
                                                                Pay Now
                                                            </button>
                                                        )}
                                                        {(guide.status === 'PENDING' || guide.status === 'APPROVED') && (
                                                            <button
                                                                onClick={() => handleCancelBooking(guide.bookingId)}
                                                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm font-semibold"
                                                            >
                                                                Cancel
                                                            </button>
                                                        )}
                                                        {guide.status === 'REJECTED' && guide.rejectionReason && (
                                                            <div className="text-xs text-red-600 max-w-xs">
                                                                <strong>Reason:</strong> {guide.rejectionReason}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Booking Details Footer */}
                                    {booking.specialRequests && (
                                        <div className="px-6 py-4 bg-gray-50 border-t">
                                            <p className="text-sm">
                                                <strong>Special Requests:</strong> {booking.specialRequests}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Main>
    );
};

export default MyGuideBookings;
