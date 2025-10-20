import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import StripePaymentComponent from '../../components/StripePaymentComponent';
import { useSelector } from 'react-redux';
import Spinner from '../../components/Spinner';
import Main from '../../components/Main';

// Get API base URL from environment variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5454';

const HotelBooking = () => {
  const { hotelId, roomId } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  
  const [hotel, setHotel] = useState(null);
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1); // 1: Details, 2: Payment, 3: Confirmation
  
  // Booking form data
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [specialRequests, setSpecialRequests] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  
  const [bookingId, setBookingId] = useState(null);
  const [bookingData, setBookingData] = useState(null); // Store booking data before payment
  const [totalAmount, setTotalAmount] = useState(0);
  const [numberOfNights, setNumberOfNights] = useState(0);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  useEffect(() => {
    fetchHotelAndRoom();
    
    // Pre-fill user data if logged in
    if (user) {
      setUserEmail(user.email || user.data?.email || '');
      setUserName(user.displayName || user.name || user.data?.firstName + ' ' + user.data?.lastName || '');
      setUserPhone(user.phone || user.phoneNumber || user.data?.phoneNumber || '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hotelId, roomId, user]);

  useEffect(() => {
    calculateTotal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkInDate, checkOutDate, room]);

  const fetchHotelAndRoom = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/hotels/${hotelId}`);
      const hotelData = response.data;
      setHotel(hotelData);
      
      const roomData = hotelData.rooms?.find(r => r.id === parseInt(roomId));
      if (!roomData) {
        toast.error('Room not found');
        navigate(`/bookings/hotels/${hotelId}`);
        return;
      }
      
      if (!roomData.availability) {
        toast.error('This room is not available');
        navigate(`/bookings/hotels/${hotelId}`);
        return;
      }
      
      setRoom(roomData);
    } catch (error) {
      console.error('Error fetching hotel and room:', error);
      toast.error('Failed to load booking details');
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    if (!checkInDate || !checkOutDate || !room) {
      setTotalAmount(0);
      setNumberOfNights(0);
      return;
    }

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));

    if (nights <= 0) {
      setTotalAmount(0);
      setNumberOfNights(0);
      return;
    }

    setNumberOfNights(nights);
    setTotalAmount(room.pricePerNight * nights);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!checkInDate || !checkOutDate) {
      toast.error('Please select check-in and check-out dates');
      return;
    }

    if (new Date(checkInDate) >= new Date(checkOutDate)) {
      toast.error('Check-out date must be after check-in date');
      return;
    }

    if (!userEmail || !userName || !userPhone) {
      toast.error('Please fill in all guest details');
      return;
    }

    // Check if user is authenticated - improved check
    // User must have either isAuthenticated flag or a valid user object
    const hasAuthFlag = isAuthenticated === true;
    const hasUserObject = user && Object.keys(user).length > 0;
    
    if (!hasAuthFlag && !hasUserObject) {
      console.warn('Authentication check failed:', { isAuthenticated, user });
      toast.error('Please login to make a booking');
      navigate('/welcome'); // Redirect to login page
      return;
    }

    // Get user ID - try different possible structures
    // Priority: user.data.id (from backend) > user.uid (Firebase) > user.id (direct)
    const userId = user?.data?.id || user?.uid || user?.id || user?.userId;
    
    if (!userId) {
      console.error('Unable to extract user ID from user object:', user);
      toast.error('Unable to identify user. Please logout and login again.');
      return;
    }
    
    console.log('Preparing booking for user ID:', userId);

    try {
      setLoading(true);

      // Store booking data temporarily (DON'T create booking yet - only after payment)
      const tempBookingData = {
        userId: userId,
        userEmail,
        userName,
        userPhone,
        hotelId: Number.parseInt(hotelId),
        roomId: Number.parseInt(roomId),
        checkInDate,
        checkOutDate,
        numberOfGuests,
        specialRequests
      };

      setBookingData(tempBookingData);
      
      console.log('Booking data prepared, proceeding to payment:', tempBookingData);
      setStep(2); // Move to payment step
      toast.success('Please complete payment to confirm your booking.');
    } catch (error) {
      console.error('Error preparing booking:', error);
      toast.error('Failed to prepare booking');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async (paymentIntent) => {
    try {
      console.log('Payment successful! Creating booking now with payment intent:', paymentIntent.id);
      
      // NOW create the booking with the payment intent ID
      const bookingDataWithPayment = {
        ...bookingData,
        stripePaymentIntentId: paymentIntent.id
      };

      const response = await axios.post(
        `${API_BASE_URL}/api/hotel-bookings/create-with-payment`,
        bookingDataWithPayment
      );
      
      console.log('Booking created successfully after payment:', response.data);
      setConfirmedBooking(response.data);
      setStep(3); // Move to confirmation step
      toast.success('Payment successful! Booking confirmed.');
    } catch (error) {
      console.error('Error creating booking after payment:', error);
      toast.error('Payment was successful but booking creation failed. Please contact support with payment ID: ' + paymentIntent.id);
    }
  };

  const handlePaymentError = (error) => {
    console.error('Payment error:', error);
    toast.error('Payment failed. Please try again.');
  };

  const handlePaymentCancel = () => {
    setStep(1);
    toast.info('Payment cancelled. You can try again.');
  };

  if (loading && !hotel) {
    return <Spinner />;
  }

  if (!hotel || !room) {
    return (
      <Main>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking not available</h2>
            <button
              onClick={() => navigate('/bookings/hotels')}
              className="mt-4 px-6 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary-dark"
            >
              Back to Hotels
            </button>
          </div>
        </div>
      </Main>
    );
  }

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  return (
    <Main>
      <div className="w-full">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(`/bookings/hotels/${hotelId}`)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Hotel
          </button>
          
          <h1 className="text-3xl font-bold text-gray-900">Complete Your Booking</h1>
          <p className="text-gray-600 mt-2">{hotel.hotelName} - {room.roomType}</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                1
              </div>
              <div className={`w-24 h-1 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                2
              </div>
              <div className={`w-24 h-1 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                3
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-2 gap-24">
            <span className={`text-sm ${step >= 1 ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}>
              Details
            </span>
            <span className={`text-sm ${step >= 2 ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}>
              Payment
            </span>
            <span className={`text-sm ${step >= 3 ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}>
              Confirmed
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Authentication Status Banner (only in step 1) */}
            {step === 1 && (
              <div className={`mb-4 p-4 rounded-lg border ${
                (isAuthenticated || (user && Object.keys(user).length > 0))
                  ? 'bg-green-50 border-green-200'
                  : 'bg-yellow-50 border-yellow-200'
              }`}>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    {(isAuthenticated || (user && Object.keys(user).length > 0)) ? (
                      <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div className="ml-3 flex-1">
                    <p className={`text-sm font-medium ${
                      (isAuthenticated || (user && Object.keys(user).length > 0))
                        ? 'text-green-800'
                        : 'text-yellow-800'
                    }`}>
                      {(isAuthenticated || (user && Object.keys(user).length > 0)) ? (
                        <>
                          Logged in as {userEmail || user?.email || 'Guest'}
                        </>
                      ) : (
                        <>
                          You need to be logged in to make a booking. 
                          <button
                            onClick={() => navigate('/welcome')}
                            className="ml-2 font-semibold underline hover:no-underline"
                          >
                            Login now
                          </button>
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 1: Booking Details */}
            {step === 1 && (
              <form onSubmit={handleBookingSubmit} className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Booking Details</h2>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Check-in Date *
                      </label>
                      <input
                        type="date"
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        min={today}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Check-out Date *
                      </label>
                      <input
                        type="date"
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        min={checkInDate || today}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Guests *
                    </label>
                    <input
                      type="number"
                      value={numberOfGuests}
                      onChange={(e) => setNumberOfGuests(parseInt(e.target.value))}
                      min="1"
                      max={room.maxGuests || 10}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Guest Information</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={userPhone}
                        onChange={(e) => setUserPhone(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Special Requests (Optional)
                      </label>
                      <textarea
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        rows="3"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Any special requests or requirements..."
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || totalAmount === 0}
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold"
                >
                  {loading ? 'Processing...' : 'Proceed to Payment'}
                </button>
              </form>
            )}

            {/* Step 2: Payment */}
            {step === 2 && bookingData && (
              <StripePaymentComponent
                amount={totalAmount}
                currency="USD"
                description={`Booking for ${room.roomType} at ${hotel.hotelName}`}
                bookingId={null}
                bookingType="HOTEL"
                onPaymentSuccess={handlePaymentSuccess}
                onPaymentError={handlePaymentError}
                onCancel={handlePaymentCancel}
              />
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && confirmedBooking && (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <div className="mb-6">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
                  <p className="text-gray-600">Your payment has been processed successfully</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
                  <h3 className="font-semibold text-gray-900 mb-4">Booking Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Booking Reference:</span>
                      <span className="font-semibold">{confirmedBooking.bookingReference}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Hotel:</span>
                      <span className="font-semibold">{confirmedBooking.hotelName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Room:</span>
                      <span className="font-semibold">{confirmedBooking.roomType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Check-in:</span>
                      <span className="font-semibold">{new Date(confirmedBooking.checkInDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Check-out:</span>
                      <span className="font-semibold">{new Date(confirmedBooking.checkOutDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Guests:</span>
                      <span className="font-semibold">{confirmedBooking.numberOfGuests}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t">
                      <span className="text-gray-600">Total Paid:</span>
                      <span className="font-bold text-lg">USD ${confirmedBooking.totalAmount?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-6">
                  A confirmation email has been sent to {confirmedBooking.userEmail}
                </p>

                <div className="flex gap-4">
                  <button
                    onClick={() => navigate('/my-bookings')}
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    View My Bookings
                  </button>
                  <button
                    onClick={() => navigate('/bookings/hotels')}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Browse More Hotels
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
              
              {room.images && room.images.length > 0 && (
                <img
                  src={room.images[0]}
                  alt={room.roomType}
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
              )}

              <div className="space-y-3 text-sm mb-4">
                <div>
                  <p className="text-gray-600">Hotel</p>
                  <p className="font-semibold text-gray-900">{hotel.hotelName}</p>
                </div>
                
                <div>
                  <p className="text-gray-600">Room Type</p>
                  <p className="font-semibold text-gray-900">{room.roomType}</p>
                </div>

                {checkInDate && checkOutDate && (
                  <>
                    <div className="border-t pt-3">
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">Check-in:</span>
                        <span className="font-semibold">{new Date(checkInDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">Check-out:</span>
                        <span className="font-semibold">{new Date(checkOutDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Nights:</span>
                        <span className="font-semibold">{numberOfNights}</span>
                      </div>
                    </div>

                    <div className="border-t pt-3">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Price per night:</span>
                        <span className="font-semibold">USD ${room.pricePerNight?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Number of nights:</span>
                        <span className="font-semibold">{numberOfNights}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold border-t pt-2">
                        <span>Total:</span>
                        <span className="text-blue-600">USD ${totalAmount.toLocaleString()}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {room.amenities && room.amenities.length > 0 && (
                <div className="border-t pt-4">
                  <p className="text-sm font-semibold text-gray-900 mb-2">Room Amenities:</p>
                  <div className="flex flex-wrap gap-2">
                    {room.amenities.slice(0, 5).map((amenity, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default HotelBooking;
