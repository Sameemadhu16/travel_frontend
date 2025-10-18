import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Main from '../../components/Main';
import { getUserTripsWithGuideRequests } from '../../api/tripService';
import Spinner from '../../components/Spinner';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaCheckCircle, FaClock, FaTimesCircle } from 'react-icons/fa';

export default function Trips() {
    const { user } = useSelector((state) => state.auth);
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user?.data?.id) {
            fetchUserTrips();
        }
    }, [user]);

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
            rejected: {
                icon: <FaTimesCircle className="mr-1" />,
                text: 'Rejected',
                className: 'bg-red-100 text-red-800 border-red-300'
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
                                            <div className="text-sm opacity-90">Status</div>
                                            <div className="mt-1 inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                                                {trip.tripStatus || 'Pending'}
                                            </div>
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
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Main>
    );
}
