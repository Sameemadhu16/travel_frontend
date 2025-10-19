import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getMyGuideBookings, cancelGuideBooking, payGuideBooking } from '../../api/guideBookingService';
import toast from 'react-hot-toast';
import Main from '../../components/Main';
import Spinner from '../../components/Spinner';
import defaultGuideImg from '../../assets/users/user1.jpg';

const MyGuideBookings = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const [bookings, setBookings] = useState([]);
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
            const data = await getMyGuideBookings();
            setBookings(Array.isArray(data) ? data : []);
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
            // In a real app, this would redirect to payment gateway
            const paymentData = {
                paymentMethod: 'card',
                amount: bookings.find(b => b.id === bookingId)?.totalPrice
            };
            await payGuideBooking(bookingId, paymentData);
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

    const isPaymentDue = (booking) => {
        if (booking.status !== 'APPROVED') return false;
        
        // Check if within 24 hours of approval
        if (booking.approvedAt) {
            const approvedTime = new Date(booking.approvedAt);
            const now = new Date();
            const hoursSinceApproval = (now - approvedTime) / (1000 * 60 * 60);
            return hoursSinceApproval < 24;
        }
        return true;
    };

    const filteredBookings = bookings.filter(booking => {
        if (filter === 'all') return true;
        return booking.status?.toLowerCase() === filter.toLowerCase();
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
                <div className="container mx-auto px-4 max-w-7xl">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-content-primary mb-2">My Guide Bookings</h1>
                        <p className="text-content-secondary">Manage your guide booking requests and reservations</p>
                    </div>

                    {/* Filters */}
                    <div className="bg-white rounded-lg shadow p-4 mb-6">
                        <div className="flex flex-wrap gap-2">
                            {['all', 'pending', 'approved', 'paid', 'completed', 'cancelled'].map(status => (
                                <button
                                    key={status}
                                    onClick={() => setFilter(status)}
                                    className={`px-4 py-2 rounded-lg font-medium transition ${
                                        filter === status
                                            ? 'bg-brand-primary text-white'
                                            : 'bg-gray-100 text-content-secondary hover:bg-gray-200'
                                    }`}
                                >
                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Bookings List */}
                    {filteredBookings.length === 0 ? (
                        <div className="bg-white rounded-lg shadow p-12 text-center">
                            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <h3 className="text-lg font-semibold text-content-secondary mb-2">No bookings found</h3>
                            <p className="text-content-tertiary mb-4">You haven&apos;t made any guide bookings yet</p>
                            <button
                                onClick={() => navigate('/bookings/guide')}
                                className="px-6 py-2 bg-brand-primary text-white rounded-lg hover:bg-warning transition"
                            >
                                Browse Guides
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredBookings.map(booking => {
                                const guideName = booking.guide?.user 
                                    ? `${booking.guide.user.firstName || ''} ${booking.guide.user.lastName || ''}`.trim()
                                    : 'Unknown Guide';
                                const guideImage = booking.guide?.user?.profilePictures?.[0] || defaultGuideImg;
                                const paymentIsDue = isPaymentDue(booking);

                                return (
                                    <div key={booking.id} className="bg-white rounded-lg shadow hover:shadow-lg transition p-6">
                                        <div className="flex flex-col lg:flex-row gap-6">
                                            {/* Guide Info */}
                                            <div className="flex items-start gap-4 lg:w-1/3">
                                                <img 
                                                    src={guideImage}
                                                    alt={guideName}
                                                    className="w-20 h-20 rounded-lg object-cover"
                                                />
                                                <div>
                                                    <h3 className="font-semibold text-lg text-content-primary">{guideName}</h3>
                                                    <div className="flex items-center gap-1 text-sm mt-1">
                                                        <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                                                        </svg>
                                                        <span>{booking.guide?.rating || 4.5}</span>
                                                    </div>
                                                    <div className="mt-2">
                                                        {getStatusBadge(booking.status)}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Booking Details */}
                                            <div className="lg:w-1/3 space-y-2">
                                                <div className="flex items-start gap-2">
                                                    <svg className="w-5 h-5 text-brand-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    <div>
                                                        <p className="text-sm text-content-secondary">Tour Dates</p>
                                                        <p className="font-medium">{booking.startDate} to {booking.endDate}</p>
                                                        <p className="text-xs text-content-tertiary">{booking.numberOfDays} days</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-2">
                                                    <svg className="w-5 h-5 text-brand-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    <div>
                                                        <p className="text-sm text-content-secondary">Locations</p>
                                                        <p className="font-medium text-sm">{booking.locations}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-2">
                                                    <svg className="w-5 h-5 text-brand-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                    </svg>
                                                    <div>
                                                        <p className="text-sm text-content-secondary">People</p>
                                                        <p className="font-medium">{booking.numberOfPeople} person{booking.numberOfPeople > 1 ? 's' : ''}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Price & Actions */}
                                            <div className="lg:w-1/3 flex flex-col justify-between">
                                                <div className="mb-4">
                                                    <p className="text-sm text-content-secondary mb-1">Total Price</p>
                                                    <p className="text-2xl font-bold text-brand-primary">
                                                        LKR {booking.totalPrice?.toLocaleString()}
                                                    </p>
                                                    {booking.status === 'APPROVED' && paymentIsDue && (
                                                        <p className="text-xs text-warning mt-1">
                                                            ⏰ Payment due within 24 hours
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="space-y-2">
                                                    {booking.status === 'APPROVED' && paymentIsDue && (
                                                        <button
                                                            onClick={() => handlePayment(booking.id)}
                                                            className="w-full bg-success text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition"
                                                        >
                                                            Pay Now
                                                        </button>
                                                    )}
                                                    
                                                    {booking.status === 'PENDING' && (
                                                        <button
                                                            onClick={() => handleCancelBooking(booking.id)}
                                                            className="w-full bg-danger text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition"
                                                        >
                                                            Cancel Request
                                                        </button>
                                                    )}

                                                    <button
                                                        onClick={() => navigate(`/my-bookings/guides/${booking.id}`)}
                                                        className="w-full border-2 border-brand-primary text-brand-primary py-2 rounded-lg font-semibold hover:bg-brand-light transition"
                                                    >
                                                        View Details
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Additional Info */}
                                        {booking.specialRequests && (
                                            <div className="mt-4 pt-4 border-t">
                                                <p className="text-sm text-content-secondary mb-1">Special Requests:</p>
                                                <p className="text-sm text-content-primary">{booking.specialRequests}</p>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </Main>
    );
};

export default MyGuideBookings;
