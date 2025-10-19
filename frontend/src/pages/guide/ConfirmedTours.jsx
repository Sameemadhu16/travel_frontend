import { FaCalendar, FaClock, FaUsers, FaPhone } from 'react-icons/fa';
import { Loader, AlertCircle } from 'lucide-react';
import Main from '../../components/Main';
import Card from './guideComponents/Card';
import PrimaryButton from '../../components/PrimaryButton';
import NavBar from './guideComponents/NavBar'
import { useState } from 'react';
import useConfirmedTours from './hooks/useConfirmedTours';
import { getUserIdFromStorage } from '../../core/authHelper';

const ConfirmedTours = () => {
    const userId = getUserIdFromStorage();
    const guideId = userId;

    const { confirmedTours, loading, error, startTour } = useConfirmedTours(guideId);

    const [showConfirmation, setShowConfirmation] = useState(false);
    const [tourToStart, setTourToStart] = useState(null);
    const [actionLoading, setActionLoading] = useState(false);
    const [actionError, setActionError] = useState(null);

    const handleStartTour = async () => {
        if (!tourToStart) return;

        try {
            setActionLoading(true);
            setActionError(null);
            await startTour(tourToStart.requestId, tourToStart.tripId);
            setShowConfirmation(false);
            setTourToStart(null);
        } catch (err) {
            setActionError(err.message || 'Failed to start tour');
        } finally {
            setActionLoading(false);
        }
    };

    let totalEarnings = 0;

    confirmedTours.forEach(tour => {
        totalEarnings += Number(tour.payment.totalAmount.replace(/,/g, ''));
    });

    return (
        <div className='flex'>
            <div className='sticky top-0 h-fit'>
                <NavBar />
            </div>
            <div className='flex-1'>
                <Main hasNavbar={true}>
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-2xl font-bold mb-1">Confirmed Tours</h1>
                            <p className="text-gray-600">Tours with payment confirmed across Sri Lanka</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm font-medium">
                                {confirmedTours.length} Confirmed
                            </div>
                            <div className="text-gray-700 font-medium border border-gray-300 px-4 py-2 rounded-lg text-sm">
                                Total Earnings: <span className="text-green-600">Rs. {totalEarnings.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Loading State */}
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader className="w-8 h-8 animate-spin text-orange-600 mr-3" />
                            <span className="text-gray-600">Loading confirmed tours...</span>
                        </div>
                    ) : error ? (
                        /* Error State */
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex gap-3">
                            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <h3 className="font-semibold text-red-900">Error Loading Confirmed Tours</h3>
                                <p className="text-red-700 text-sm mt-1">{error}</p>
                            </div>
                        </div>
                    ) : confirmedTours.length > 0 ? (
                        /* Tour Cards */
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {confirmedTours.map((tour) => (
                                <Card key={tour.tour.tour_id} className="h-full">
                                    {/* Customer Info */}
                                    <div className="flex items-center mb-4">
                                        <img
                                            src={tour.customer.image || 'https://via.placeholder.com/50'}
                                            alt={tour.customer.name}
                                            className="w-12 h-12 rounded-lg mr-3 object-cover"
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-900">{tour.customer.name}</h3>
                                            <p className="text-sm text-gray-600">{tour.customer.phone || 'No phone'}</p>
                                        </div>
                                        <div className="flex items-center bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                                            <span className="w-2 h-2 bg-green-600 rounded-full mr-1"></span>
                                            {tour.payment.status}
                                        </div>
                                    </div>

                                    {/* Tour Details */}
                                    <div className="mb-4">
                                        <h4 className="font-semibold text-gray-900 mb-3">{tour.tour.destination}</h4>
                                        <div className="space-y-2">
                                            <div className="flex items-center text-sm text-gray-600 gap-2">
                                                <FaCalendar className='text-orange-500' />
                                                {tour.tour.date}
                                            </div>
                                            <div className="flex items-center text-sm text-gray-600 gap-2">
                                                <FaUsers className='text-orange-500' />
                                                {tour.tour.groupSize} Travelers
                                            </div>
                                            <div className="flex items-center text-sm text-gray-600 gap-2">
                                                <FaClock className='text-orange-500' />
                                                {tour.tour.duration} days
                                            </div>
                                        </div>
                                    </div>

                                    {/* Payment Info */}
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm font-medium text-gray-700">Payment Status</span>
                                            <span className="text-sm font-bold text-green-600">✓ Confirmed</span>
                                        </div>
                                        <p className="text-xs text-gray-600">{tour.payment.due}</p>
                                    </div>

                                    {/* Earnings */}
                                    <div className="flex justify-between items-center mb-4">
                                        <div>
                                            <p className="text-sm text-gray-600">Tour Earnings</p>
                                            <p className="text-2xl font-bold text-green-600">Rs. {tour.payment.totalAmount}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-gray-600">Completed</p>
                                            <p className="text-sm font-medium text-gray-900">{tour.payment.accepted}</p>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex space-x-2">
                                        <div className="flex-1">
                                            <PrimaryButton
                                                text="Start Tour"
                                                type={'button'}
                                                className={'text-base'}
                                                onClick={() => {
                                                    setTourToStart(tour);
                                                    setShowConfirmation(true);
                                                }}
                                            />
                                        </div>
                                        <button className="flex-1 bg-white hover:bg-orange-50 text-orange-600 font-medium py-2 px-3 rounded-lg border border-orange-300 flex items-center justify-center gap-2 transition-colors">
                                            <FaPhone className="w-4 h-4" />
                                        </button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        /* Empty State */
                        <div className="text-center py-12">
                            <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
                                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No confirmed tours</h3>
                            <p className="text-gray-600">All confirmed tours have been started or there are no confirmed tours at the moment.</p>
                        </div>
                    )}

                    {/* Confirmation Modal */}
                    {showConfirmation && tourToStart && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                            <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
                                <div className="p-6 border-b border-gray-200">
                                    <h2 className="text-2xl font-semibold text-gray-900">Start Tour</h2>
                                    <p className="text-gray-600 text-sm mt-1">Are you sure you want to start this tour?</p>
                                </div>

                                <div className="p-6 bg-gray-50">
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-sm text-gray-600">Tour</p>
                                            <p className="font-semibold text-gray-900">{tourToStart.tour.destination}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Customer</p>
                                            <p className="font-semibold text-gray-900">{tourToStart.customer.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Group Size</p>
                                            <p className="font-semibold text-gray-900">{tourToStart.tour.groupSize} Travelers</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Date</p>
                                            <p className="font-semibold text-gray-900">{tourToStart.tour.date}</p>
                                        </div>
                                    </div>

                                    {actionError && (
                                        <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3 flex gap-2">
                                            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                                            <p className="text-sm text-red-700">{actionError}</p>
                                        </div>
                                    )}
                                </div>

                                <div className="p-6 border-t border-gray-200 flex gap-2">
                                    <button
                                        onClick={() => {
                                            setShowConfirmation(false);
                                            setTourToStart(null);
                                            setActionError(null);
                                        }}
                                        disabled={actionLoading}
                                        className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 font-medium disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleStartTour}
                                        disabled={actionLoading}
                                        className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {actionLoading && <Loader className="w-4 h-4 animate-spin" />}
                                        {actionLoading ? 'Starting...' : 'Start Tour'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </Main>
            </div>
        </div>
    );
};

export default ConfirmedTours;
