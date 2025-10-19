import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { 
    createGuideBooking, 
    getMyGuideBookingsGrouped,
    approveGuideBooking,
    payGuideBooking,
    cancelGuideBooking 
} from '../api/guideBookingService';
import toast from 'react-hot-toast';

/**
 * Debug page for testing multi-guide booking functionality
 * Access at: /debug-bookings
 */
const DebugBookings = () => {
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);

    // Test booking form data
    const [testData, setTestData] = useState({
        guideIds: [1, 2, 3],
        locations: 'Colombo, Kandy, Galle, Ella',
        startDate: '2024-04-01',
        endDate: '2024-04-05',
        startTime: '09:00:00',
        numberOfDays: 5,
        numberOfPeople: 4,
        contactNumber: '+94771234567',
        specialRequests: 'Test booking for multi-guide feature',
        preferredLanguage: 'English',
        accommodationNeeded: true,
        transportationNeeded: true,
        mealPreferences: 'Vegetarian',
        totalPrice: 500.00
    });

    useEffect(() => {
        if (isAuthenticated && user?.data?.id) {
            fetchBookings();
        }
    }, [isAuthenticated, user]);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const data = await getMyGuideBookingsGrouped();
            setBookings(Array.isArray(data) ? data : []);
            toast.success('Bookings loaded');
        } catch (error) {
            console.error('Error fetching bookings:', error);
            toast.error(error.message || 'Failed to load bookings');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTestBooking = async () => {
        try {
            setLoading(true);
            const result = await createGuideBooking(testData);
            toast.success('Test booking created!');
            console.log('Created booking:', result);
            await fetchBookings();
        } catch (error) {
            console.error('Error creating booking:', error);
            toast.error(error.message || 'Failed to create booking');
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (bookingId, guideId) => {
        try {
            await approveGuideBooking(bookingId, guideId);
            toast.success('Booking approved!');
            await fetchBookings();
        } catch (error) {
            console.error('Error approving booking:', error);
            toast.error(error.message || 'Failed to approve booking');
        }
    };

    const handlePay = async (bookingId) => {
        try {
            await payGuideBooking(bookingId, {});
            toast.success('Payment successful!');
            await fetchBookings();
        } catch (error) {
            console.error('Error processing payment:', error);
            toast.error(error.message || 'Payment failed');
        }
    };

    const handleCancel = async (bookingId) => {
        try {
            await cancelGuideBooking(bookingId, 'Test cancellation');
            toast.success('Booking cancelled!');
            await fetchBookings();
        } catch (error) {
            console.error('Error cancelling booking:', error);
            toast.error(error.message || 'Failed to cancel booking');
        }
    };

    const getStorageDebugInfo = () => {
        try {
            const persistRoot = localStorage.getItem('persist:auth');
            const userObj = localStorage.getItem('user');
            const userId = localStorage.getItem('userId');
            
            return {
                persistAuth: persistRoot ? JSON.parse(persistRoot) : null,
                userObj: userObj ? JSON.parse(userObj) : null,
                userId: userId,
                reduxUser: user,
                isAuthenticated: isAuthenticated
            };
        } catch (e) {
            return { error: e.message };
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-100 p-8">
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-8">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Not Authenticated</h1>
                    <p>Please login to test the booking system.</p>
                    <button
                        onClick={() => window.location.href = '/partner-login/step-1'}
                        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    const debugInfo = getStorageDebugInfo();

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Multi-Guide Booking Debug Page</h1>

                {/* Auth Debug Info */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Authentication Debug Info</h2>
                    <div className="bg-gray-50 p-4 rounded font-mono text-sm overflow-x-auto">
                        <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
                    </div>
                </div>

                {/* Create Test Booking */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Create Test Booking</h2>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Guide IDs (comma-separated)</label>
                            <input
                                type="text"
                                value={testData.guideIds.join(',')}
                                onChange={(e) => setTestData({
                                    ...testData,
                                    guideIds: e.target.value.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id))
                                })}
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Locations</label>
                            <input
                                type="text"
                                value={testData.locations}
                                onChange={(e) => setTestData({ ...testData, locations: e.target.value })}
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Start Date</label>
                            <input
                                type="date"
                                value={testData.startDate}
                                onChange={(e) => setTestData({ ...testData, startDate: e.target.value })}
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">End Date</label>
                            <input
                                type="date"
                                value={testData.endDate}
                                onChange={(e) => setTestData({ ...testData, endDate: e.target.value })}
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Number of People</label>
                            <input
                                type="number"
                                value={testData.numberOfPeople}
                                onChange={(e) => setTestData({ ...testData, numberOfPeople: parseInt(e.target.value) })}
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Total Price</label>
                            <input
                                type="number"
                                step="0.01"
                                value={testData.totalPrice}
                                onChange={(e) => setTestData({ ...testData, totalPrice: parseFloat(e.target.value) })}
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleCreateTestBooking}
                        disabled={loading}
                        className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400"
                    >
                        {loading ? 'Creating...' : 'Create Test Booking'}
                    </button>

                    <div className="mt-4 bg-gray-50 p-4 rounded">
                        <p className="text-sm font-medium mb-2">Request Payload:</p>
                        <pre className="text-xs overflow-x-auto">{JSON.stringify({ ...testData, userId: user?.data?.id }, null, 2)}</pre>
                    </div>
                </div>

                {/* Bookings List */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">My Bookings (Grouped)</h2>
                        <button
                            onClick={fetchBookings}
                            disabled={loading}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
                        >
                            {loading ? 'Loading...' : 'Refresh'}
                        </button>
                    </div>

                    {bookings.length === 0 ? (
                        <p className="text-gray-500">No bookings found. Create a test booking above.</p>
                    ) : (
                        <div className="space-y-6">
                            {bookings.map((booking, index) => (
                                <div key={booking.multiRequestId || `booking-${index}`} className="border rounded-lg p-6">
                                    <div className="mb-4">
                                        <h3 className="text-lg font-semibold">{booking.locations}</h3>
                                        <div className="text-sm text-gray-600 space-y-1 mt-2">
                                            <p>Multi Request ID: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{booking.multiRequestId || 'N/A'}</span></p>
                                            <p>Dates: {booking.startDate} to {booking.endDate} ({booking.numberOfDays} days)</p>
                                            <p>People: {booking.numberOfPeople}</p>
                                            <p>Overall Status: <span className={`font-semibold ${
                                                booking.overallStatus === 'APPROVED' ? 'text-green-600' :
                                                booking.overallStatus === 'PENDING' ? 'text-yellow-600' :
                                                booking.overallStatus === 'PAID' ? 'text-blue-600' :
                                                booking.overallStatus === 'CANCELLED' ? 'text-red-600' :
                                                'text-gray-600'
                                            }`}>{booking.overallStatus}</span></p>
                                            {booking.approvedGuideId && (
                                                <p>Approved Guide: {booking.approvedGuideName} (ID: {booking.approvedGuideId})</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <h4 className="font-semibold">Guides ({booking.guides.length}):</h4>
                                        {booking.guides.map((guide) => (
                                            <div key={guide.bookingId} className={`border-l-4 pl-4 py-2 ${
                                                guide.status === 'APPROVED' ? 'border-green-500 bg-green-50' :
                                                guide.status === 'PENDING' ? 'border-yellow-500 bg-yellow-50' :
                                                guide.status === 'PAID' ? 'border-blue-500 bg-blue-50' :
                                                guide.status === 'CANCELLED' ? 'border-red-500 bg-red-50' :
                                                'border-gray-500 bg-gray-50'
                                            }`}>
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className="font-medium">{guide.guideName}</p>
                                                        <p className="text-sm text-gray-600">
                                                            Guide ID: {guide.guideId} | Booking ID: {guide.bookingId}
                                                        </p>
                                                        <p className="text-sm">
                                                            Status: <span className="font-semibold">{guide.status}</span>
                                                        </p>
                                                        {guide.rejectionReason && (
                                                            <p className="text-sm text-red-600">Reason: {guide.rejectionReason}</p>
                                                        )}
                                                        <p className="text-sm">Price: ${guide.totalPrice}</p>
                                                    </div>

                                                    <div className="flex gap-2">
                                                        {guide.status === 'PENDING' && (
                                                            <>
                                                                <button
                                                                    onClick={() => handleApprove(guide.bookingId, guide.guideId)}
                                                                    className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
                                                                >
                                                                    Approve (as Guide)
                                                                </button>
                                                                <button
                                                                    onClick={() => handleCancel(guide.bookingId)}
                                                                    className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
                                                                >
                                                                    Cancel
                                                                </button>
                                                            </>
                                                        )}
                                                        {guide.status === 'APPROVED' && (
                                                            <button
                                                                onClick={() => handlePay(guide.bookingId)}
                                                                className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                                                            >
                                                                Pay Now
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Debug JSON Output */}
                {bookings.length > 0 && (
                    <div className="bg-white rounded-lg shadow p-6 mt-6">
                        <h2 className="text-xl font-semibold mb-4">Raw JSON Response</h2>
                        <div className="bg-gray-50 p-4 rounded font-mono text-xs overflow-x-auto">
                            <pre>{JSON.stringify(bookings, null, 2)}</pre>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DebugBookings;
