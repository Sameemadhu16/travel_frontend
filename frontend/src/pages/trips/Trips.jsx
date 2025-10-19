import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Main from '../../components/Main';
import { getUserTripsWithGuideRequests, updateTripStatus } from '../../api/tripService';
import Spinner from '../../components/Spinner';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaCheckCircle, FaClock, FaTimesCircle } from 'react-icons/fa';

export default function Trips() {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [processingPayment, setProcessingPayment] = useState({});
    const [statusUpdated, setStatusUpdated] = useState(false);

    const fetchUserTrips = async () => {
        try {
            setLoading(true);
            const data = await getUserTripsWithGuideRequests(user.data.id);
            setTrips(data);
            setError(null);
        } catch (err) {
            console.error('Error loading trips:', err);
            setError('Failed to load your trips. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.data?.id) {
            fetchUserTrips();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);
    
    const handlePayment = async (tripId) => {
        try {
            setProcessingPayment(prev => ({ ...prev, [tripId]: true }));
            
            // Navigate to payment page with trip ID
            navigate('/tour/payment', { state: { tripId } });
            
        } catch (err) {
            console.error('Error processing payment:', err);
            alert('Failed to process payment. Please try again.');
        } finally {
            setProcessingPayment(prev => ({ ...prev, [tripId]: false }));
        }
    };
    
    const hasApprovedGuide = (trip) => {
        return trip.guideRequests && trip.guideRequests.some(
            request => request.status?.toLowerCase() === 'approved'
        );
    };
    
    const canPay = (trip) => {
        const tripStatus = trip.tripStatus?.toLowerCase() || 'pending';
        
        // Cannot pay if already paid or completed
        if (tripStatus === 'paid' || tripStatus === 'completed') {
            return false;
        }
        
        // Must have an approved guide
        if (!hasApprovedGuide(trip)) {
            return false;
        }
        
        // Check if within 24 hours of guide approval
        const approvedRequest = trip.guideRequests?.find(
            request => request.status?.toLowerCase() === 'approved'
        );
        
        if (approvedRequest && approvedRequest.updatedAt) {
            const approvalTime = new Date(approvedRequest.updatedAt);
            const now = new Date();
            const hoursSinceApproval = (now - approvalTime) / (1000 * 60 * 60);
            
            // Must pay within 24 hours
            if (hoursSinceApproval > 24) {
                return false;
            }
        }
        
        return (tripStatus === 'pending' || tripStatus === 'approved');
    };
    
    const getPaymentTimeRemaining = (trip) => {
        const approvedRequest = trip.guideRequests?.find(
            request => request.status?.toLowerCase() === 'approved'
        );
        
        if (!approvedRequest || !approvedRequest.updatedAt) {
            return null;
        }
        
        const approvalTime = new Date(approvedRequest.updatedAt);
        const now = new Date();
        const hoursSinceApproval = (now - approvalTime) / (1000 * 60 * 60);
        const hoursRemaining = 24 - hoursSinceApproval;
        
        if (hoursRemaining <= 0) {
            return { expired: true, hours: 0, minutes: 0 };
        }
        
        const hours = Math.floor(hoursRemaining);
        const minutes = Math.floor((hoursRemaining - hours) * 60);
        
        return { expired: false, hours, minutes };
    };
    
    // Auto-update trip status to "approved" when a guide approves
    useEffect(() => {
        const updateApprovedTrips = async () => {
            let updated = false;
            
            for (const trip of trips) {
                const tripStatus = trip.tripStatus?.toLowerCase() || 'pending';
                
                // If trip is pending and has an approved guide, update to approved
                if (tripStatus === 'pending' && hasApprovedGuide(trip)) {
                    try {
                        await updateTripStatus(trip.id, 'approved');
                        updated = true;
                    } catch (err) {
                        console.error('Error updating trip status to approved:', err);
                    }
                }
            }
            
            // Refresh trips once if any updates were made
            if (updated && !statusUpdated) {
                setStatusUpdated(true);
                fetchUserTrips();
            }
        };
        
        if (trips.length > 0 && !statusUpdated) {
            updateApprovedTrips();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trips, statusUpdated]);

    const getStatusBadge = (status) => {
        const statusConfig = {
            pending: {
                icon: <FaClock className="mr-1" />,
                text: 'Pending',
                className: 'bg-yellow-100 text-yellow-800 border-yellow-300'
            },
            approved: {
                icon: <FaCheckCircle className="mr-1" />,
                text: 'Approved',
                className: 'bg-green-100 text-green-800 border-green-300'
            },
            paid: {
                icon: <FaCheckCircle className="mr-1" />,
                text: 'Paid',
                className: 'bg-blue-100 text-blue-800 border-blue-300'
            },
            rejected: {
                icon: <FaTimesCircle className="mr-1" />,
                text: 'Rejected',
                className: 'bg-red-100 text-red-800 border-red-300'
            },
            completed: {
                icon: <FaCheckCircle className="mr-1" />,
                text: 'Completed',
                className: 'bg-purple-100 text-purple-800 border-purple-300'
            }
        };

        const config = statusConfig[status?.toLowerCase()] || statusConfig.pending;

        return (
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${config.className}`}>
                {config.icon}
                {config.text}
            </span>
        );
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    if (loading) {
        return (
            <Main>
                <div className="flex justify-center items-center min-h-screen">
                    <Spinner />
                </div>
            </Main>
        );
    }

    if (error) {
        return (
            <Main>
                <div className="max-w-7xl mx-auto py-8 px-4">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                        <p className="text-red-800 font-semibold">{error}</p>
                        <button 
                            onClick={fetchUserTrips}
                            className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </Main>
        );
    }

    return (
        <Main>
            <div className="max-w-7xl mx-auto py-8 px-4">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-content-primary">My Trips</h1>
                    <p className="text-content-secondary mt-2">View and manage your booked trips and guide requests</p>
                </div>

                {trips.length === 0 ? (
                    <div className="bg-white rounded-lg border p-12 text-center">
                        <div className="text-6xl text-content-tertiary mb-4">🗺️</div>
                        <h2 className="text-xl font-semibold text-content-primary mb-2">No trips yet</h2>
                        <p className="text-content-secondary mb-6">Start planning your next adventure!</p>
                        <a 
                            href="/tour/search-tour-guides"
                            className="inline-block px-6 py-3 bg-brand-primary text-white rounded-lg hover:bg-brand-secondary transition-colors"
                        >
                            Create New Tour
                        </a>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {trips.map((trip) => (
                            <div key={trip.id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                                {/* Trip Header */}
                                <div className="bg-gradient-to-r from-brand-primary to-brand-secondary p-6 text-white">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-xl font-bold mb-2">{trip.destination || 'Trip Destination'}</h3>
                                            <p className="text-sm opacity-90">Trip Code: {trip.tripCode}</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm opacity-90 mb-1">Status</div>
                                            {getStatusBadge(trip.tripStatus || 'pending')}
                                        </div>
                                    </div>
                                </div>

                                {/* Trip Details */}
                                <div className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                        <div className="flex items-start">
                                            <FaCalendarAlt className="text-brand-primary mt-1 mr-3" />
                                            <div>
                                                <div className="text-xs text-content-tertiary">Duration</div>
                                                <div className="font-semibold text-content-primary">
                                                    {formatDate(trip.tripStartDate)} - {formatDate(trip.tripEndDate)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-start">
                                            <FaMapMarkerAlt className="text-brand-primary mt-1 mr-3" />
                                            <div>
                                                <div className="text-xs text-content-tertiary">Pickup Location</div>
                                                <div className="font-semibold text-content-primary">
                                                    {trip.pickupLocation || 'Not specified'}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-start">
                                            <FaUsers className="text-brand-primary mt-1 mr-3" />
                                            <div>
                                                <div className="text-xs text-content-tertiary">Travelers</div>
                                                <div className="font-semibold text-content-primary">
                                                    {(trip.numberOfAdults || 0) + (trip.numberOfKids || 0)} person(s)
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Guide Requests Section */}
                                    {trip.guideRequests && trip.guideRequests.length > 0 && (
                                        <div className="border-t pt-6">
                                            <h4 className="text-lg font-semibold text-content-primary mb-4">
                                                Tour Guide Requests ({trip.guideRequests.length})
                                            </h4>
                                            <div className="space-y-3">
                                                {trip.guideRequests.map((request) => {
                                                    const guideUser = request.guid?.user || {};
                                                    const firstName = guideUser.firstName || '';
                                                    const lastName = guideUser.lastName || '';
                                                    const guideName = firstName && lastName 
                                                        ? `${firstName} ${lastName}`.trim() 
                                                        : request.guid?.name || 'Tour Guide';
                                                    
                                                    // Get profile picture from user's profilePictures array
                                                    const profilePictures = guideUser.profilePictures || [];
                                                    const guideImage = profilePictures.length > 0 
                                                        ? profilePictures[0] 
                                                        : null;
                                                    
                                                    return (
                                                        <div 
                                                            key={request.id} 
                                                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                                                        >
                                                            <div className="flex items-center space-x-4 flex-1">
                                                                <div className="h-12 w-12 rounded-full bg-brand-accent flex items-center justify-center overflow-hidden">
                                                                    {guideImage ? (
                                                                        <img 
                                                                            src={guideImage} 
                                                                            alt={guideName}
                                                                            className="h-full w-full object-cover"
                                                                        />
                                                                    ) : (
                                                                        <span className="text-brand-primary font-bold text-lg">
                                                                            {guideName.charAt(0).toUpperCase()}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <div className="flex-1">
                                                                    <div className="font-semibold text-content-primary">
                                                                        {guideName}
                                                                    </div>
                                                                    <div className="text-sm text-content-secondary">
                                                                        {guideUser.email || request.guid?.email || 'Email not available'}
                                                                    </div>
                                                                    {request.guid?.specialization && Array.isArray(request.guid.specialization) && (
                                                                        <div className="text-xs text-content-tertiary mt-1">
                                                                            {request.guid.specialization.join(', ')}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div>
                                                                {getStatusBadge(request.status)}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    {/* Total Fare */}
                                    {trip.totalFare && (
                                        <div className="border-t pt-4 mt-6">
                                            <div className="flex justify-between items-center">
                                                <span className="text-content-secondary font-semibold">Total Fare:</span>
                                                <span className="text-2xl font-bold text-brand-primary">
                                                    LKR {parseFloat(trip.totalFare).toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Payment Button */}
                                    <div className="border-t pt-4 mt-6">
                                        {!hasApprovedGuide(trip) && (
                                            <div className="mb-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                                <p className="text-sm text-yellow-800">
                                                    <strong>Note:</strong> Payment will be available once a tour guide accepts your request.
                                                </p>
                                            </div>
                                        )}
                                        
                                        {hasApprovedGuide(trip) && trip.tripStatus?.toLowerCase() !== 'paid' && trip.tripStatus?.toLowerCase() !== 'completed' && (() => {
                                            const timeRemaining = getPaymentTimeRemaining(trip);
                                            if (timeRemaining && !timeRemaining.expired) {
                                                return (
                                                    <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                                        <p className="text-sm text-blue-800">
                                                            <strong>⏰ Payment Window:</strong> {timeRemaining.hours}h {timeRemaining.minutes}m remaining to complete payment
                                                        </p>
                                                    </div>
                                                );
                                            } else if (timeRemaining && timeRemaining.expired) {
                                                return (
                                                    <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                                                        <p className="text-sm text-red-800">
                                                            <strong>⚠️ Payment Window Expired:</strong> The 24-hour payment window has expired. Please contact support.
                                                        </p>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        })()}
                                        
                                        {(trip.tripStatus?.toLowerCase() === 'paid' || trip.tripStatus?.toLowerCase() === 'completed') && (
                                            <div className="mb-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                                                <p className="text-sm text-green-800">
                                                    <strong>✓ Payment Completed</strong> - Your trip has been paid and confirmed.
                                                </p>
                                            </div>
                                        )}
                                        
                                        <button 
                                            onClick={() => handlePayment(trip.id)}
                                            disabled={!canPay(trip) || processingPayment[trip.id]}
                                            className={`w-full px-4 py-2 rounded-lg font-semibold transition-all flex items-center justify-center 
                                            ${canPay(trip) ? 'bg-brand-primary text-white hover:bg-brand-secondary' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                                        >
                                            {processingPayment[trip.id] ? (
                                                <>
                                                    <Spinner size="sm" className="mr-2" />
                                                    Processing...
                                                </>
                                            ) : (
                                                (() => {
                                                    if (trip.tripStatus?.toLowerCase() === 'paid' || trip.tripStatus?.toLowerCase() === 'completed') {
                                                        return 'Payment Completed';
                                                    }
                                                    if (!hasApprovedGuide(trip)) {
                                                        return 'Waiting for Guide Approval';
                                                    }
                                                    const timeRemaining = getPaymentTimeRemaining(trip);
                                                    if (timeRemaining && timeRemaining.expired) {
                                                        return 'Payment Window Expired';
                                                    }
                                                    return 'Proceed to Payment';
                                                })()
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Main>
    );
}
