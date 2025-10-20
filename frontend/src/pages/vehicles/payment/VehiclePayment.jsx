import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Main from '../../../components/Main';
import Title from '../../../components/Title';
import Breadcrumb from '../../../components/Breadcrumb';
import StripePaymentComponent from '../../../components/StripePaymentComponent';
import { FaCar, FaCalendarAlt, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { createVehicleBooking } from '../../../api/vehicleService';

const breadcrumbItems = [
    { label: "Home", path: "/home" },
    { label: "Vehicles", path: "/vehicle-search" },
    { label: "Booking", path: "/book-vehicle" },
    { label: "Payment", path: "/vehicle-payment" },
];

export default function VehiclePayment() {
    const navigate = useNavigate();
    const { user, token } = useSelector((state) => state.auth);
    
    const [bookingData, setBookingData] = useState(null);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [bookingId, setBookingId] = useState(null);

    useEffect(() => {
        // Get booking data from localStorage
        const savedBookingData = JSON.parse(localStorage.getItem('vehicleBookingData') || 'null');
        
        if (!savedBookingData) {
            toast.error('No booking data found');
            navigate('/vehicle-search');
            return;
        }

        if (!user || !token) {
            toast.error('Please login to continue');
            navigate('/auth/login', { state: { from: '/vehicle-payment' } });
            return;
        }
        
        setBookingData(savedBookingData);
    }, [user, token, navigate]);

    const handlePaymentSuccess = async (paymentIntent) => {
        try {
            console.log('Payment successful:', paymentIntent);
            toast.success('Payment successful! Creating your booking...');

            // Create booking in the backend - vehicle_bookings table
            const bookingPayload = {
                vehicleId: parseInt(bookingData.vehicle.id),
                userId: bookingData.userId,
                // Dates and Times
                pickupDate: `${bookingData.bookingDetails.pickupDate}T${bookingData.bookingDetails.pickupTime}:00`,
                pickupTime: bookingData.bookingDetails.pickupTime,
                returnDate: `${bookingData.bookingDetails.returnDate}T${bookingData.bookingDetails.returnTime}:00`,
                returnTime: bookingData.bookingDetails.returnTime,
                // Locations
                pickupLocation: bookingData.bookingDetails.pickupLocation,
                dropoffLocation: bookingData.bookingDetails.dropoffLocation,
                // Driver Options
                withDriver: bookingData.bookingDetails.withDriver,
                driverLicenseNumber: bookingData.bookingDetails.driverLicenseNumber || null,
                licenseExpiryDate: bookingData.bookingDetails.licenseExpiryDate || null,
                // Pricing
                basePrice: bookingData.vehicle.pricePerDay || bookingData.vehicle.basePrice,
                driverFee: bookingData.bookingDetails.withDriver ? 
                    (bookingData.vehicle.pricePerDay * 0.3 * bookingData.totalDays) : 0,
                totalCost: bookingData.totalCost,
                numberOfDays: bookingData.totalDays,
                // Payment Information
                paymentIntentId: paymentIntent.id,
                paymentStatus: 'PAID',
                paymentMethod: 'card',
                paymentDate: new Date().toISOString(),
                bookingStatus: 'CONFIRMED',
                // Contact Details
                firstName: bookingData.bookingDetails.firstName,
                lastName: bookingData.bookingDetails.lastName,
                email: bookingData.bookingDetails.email,
                phone: bookingData.bookingDetails.phone,
                // Additional Info
                specialRequests: bookingData.bookingDetails.specialRequests || null,
            };

            console.log('Creating vehicle booking with payload:', bookingPayload);
            console.log('Saving to vehicle_bookings table...');
            
            const response = await createVehicleBooking(bookingPayload);
            console.log('✅ Vehicle booking created successfully:', response);
            
            setBookingId(response.id || response.bookingId);
            setPaymentSuccess(true);
            
            // Clear booking data from localStorage
            localStorage.removeItem('vehicleBookingData');
            localStorage.removeItem('selectedVehicle');
            
            toast.success('Booking confirmed successfully!');
            
            // Redirect to success page after 2 seconds
            setTimeout(() => {
                navigate('/vehicle-booking-success', { 
                    state: { 
                        bookingId: response.id || response.bookingId,
                        bookingData: response 
                    } 
                });
            }, 2000);

        } catch (error) {
            console.error('Error creating booking:', error);
            toast.error('Payment successful but failed to create booking. Please contact support.');
        }
    };

    const handlePaymentError = (error) => {
        console.error('Payment error:', error);
        toast.error(error.message || 'Payment failed. Please try again.');
    };

    const handleCancel = () => {
        navigate('/book-vehicle');
    };

    if (!bookingData) {
        return (
            <Main>
                <div className="flex justify-center items-center h-64">
                    <div className="text-center">
                        <p className="text-gray-500">Loading payment details...</p>
                    </div>
                </div>
            </Main>
        );
    }

    if (paymentSuccess) {
        return (
            <Main>
                <div className="flex justify-center items-center min-h-[60vh]">
                    <div className="text-center max-w-md">
                        <div className="mb-6">
                            <FaCheckCircle className="text-green-500 text-6xl mx-auto" />
                        </div>
                        <h2 className="text-2xl font-bold mb-4">Payment Successful!</h2>
                        <p className="text-gray-600 mb-4">
                            Your booking has been confirmed. You will be redirected shortly...
                        </p>
                        {bookingId && (
                            <p className="text-sm text-gray-500">
                                Booking ID: {bookingId}
                            </p>
                        )}
                    </div>
                </div>
            </Main>
        );
    }

    const { vehicle, bookingDetails, totalDays, totalCost } = bookingData;

    return (
        <Main>
            <div className='mt-5'>
                <Breadcrumb items={breadcrumbItems} />
            </div>

            <div className='mt-5'>
                <Title title="Complete Payment" size="text-[24px]" font="font-[600]" />
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6'>
                {/* Payment Form */}
                <div className='lg:col-span-2'>
                    <div className='bg-white border rounded-lg p-6'>
                        <h3 className='text-lg font-semibold mb-6'>Payment Details</h3>
                        
                        <StripePaymentComponent
                            amount={totalCost}
                            currency="USD"
                            description={`Vehicle Booking - ${vehicle.name} for ${totalDays} days`}
                            bookingType="VEHICLE"
                            onPaymentSuccess={handlePaymentSuccess}
                            onPaymentError={handlePaymentError}
                            onCancel={handleCancel}
                        />
                    </div>

                    {/* Security Info */}
                    <div className='bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4'>
                        <p className='text-sm text-blue-800'>
                            <strong>Secure Payment:</strong> Your payment information is encrypted and secure. 
                            We use Stripe for payment processing and never store your card details.
                        </p>
                    </div>
                </div>

                {/* Booking Summary */}
                <div className='lg:col-span-1'>
                    <div className='bg-white border rounded-lg p-6 sticky top-24'>
                        <h3 className='text-lg font-semibold mb-4'>Booking Summary</h3>
                        
                        {/* Vehicle Info */}
                        <div className='mb-4 pb-4 border-b'>
                            <img
                                src={vehicle.images?.[0] || ''}
                                alt={vehicle.name}
                                className='w-full h-40 object-cover rounded-lg mb-3'
                            />
                            <h4 className='font-semibold text-lg flex items-center gap-2'>
                                <FaCar className="text-brand-primary" />
                                {vehicle.name}
                            </h4>
                            <p className='text-sm text-gray-600'>{vehicle.type} • {vehicle.seats} seats</p>
                            <p className='text-sm text-gray-600'>{vehicle.rentalAgency}</p>
                        </div>

                        {/* Rental Details */}
                        <div className='space-y-3 mb-4 pb-4 border-b'>
                            <div>
                                <p className='text-sm text-gray-600 flex items-center gap-2'>
                                    <FaCalendarAlt className="text-gray-400" />
                                    Pickup
                                </p>
                                <p className='font-medium'>
                                    {new Date(bookingDetails.pickupDate).toLocaleDateString('en-US', { 
                                        weekday: 'short', 
                                        year: 'numeric', 
                                        month: 'short', 
                                        day: 'numeric' 
                                    })}
                                    {' at '}{bookingDetails.pickupTime}
                                </p>
                            </div>
                            <div>
                                <p className='text-sm text-gray-600 flex items-center gap-2'>
                                    <FaCalendarAlt className="text-gray-400" />
                                    Return
                                </p>
                                <p className='font-medium'>
                                    {new Date(bookingDetails.returnDate).toLocaleDateString('en-US', { 
                                        weekday: 'short', 
                                        year: 'numeric', 
                                        month: 'short', 
                                        day: 'numeric' 
                                    })}
                                    {' at '}{bookingDetails.returnTime}
                                </p>
                            </div>
                            <div>
                                <p className='text-sm text-gray-600 flex items-center gap-2'>
                                    <FaMapMarkerAlt className="text-gray-400" />
                                    Pickup Location
                                </p>
                                <p className='font-medium'>{bookingDetails.pickupLocation}</p>
                            </div>
                            <div>
                                <p className='text-sm text-gray-600 flex items-center gap-2'>
                                    <FaMapMarkerAlt className="text-gray-400" />
                                    Drop-off Location
                                </p>
                                <p className='font-medium'>{bookingDetails.dropoffLocation}</p>
                            </div>
                        </div>

                        {/* Price Breakdown */}
                        <div className='space-y-3 mb-4 pb-4 border-b'>
                            <div className='flex justify-between'>
                                <span className='text-gray-600'>Vehicle rental ({totalDays} days)</span>
                                <span className='font-medium'>LKR {(vehicle.pricePerDay * totalDays).toLocaleString()}</span>
                            </div>
                            {bookingDetails.withDriver && (
                                <div className='flex justify-between'>
                                    <span className='text-gray-600'>Driver fee ({totalDays} days)</span>
                                    <span className='font-medium'>LKR {(vehicle.pricePerDay * 0.3 * totalDays).toLocaleString()}</span>
                                </div>
                            )}
                        </div>

                        {/* Total */}
                        <div className='flex justify-between items-center'>
                            <span className='text-xl font-semibold'>Total Amount</span>
                            <span className='text-2xl font-bold text-brand-primary'>
                                LKR {totalCost.toLocaleString()}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Main>
    );
}
