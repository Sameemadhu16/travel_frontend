import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Main from '../../../components/Main';
import PrimaryButton from '../../../components/PrimaryButton';
import SecondaryButton from '../../../components/SecondaryButton';
import { FaCheckCircle, FaCar, FaCalendarAlt, FaMapMarkerAlt, FaPhone, FaEnvelope, FaDownload, FaPrint } from 'react-icons/fa';

export default function VehicleBookingSuccess() {
    const location = useLocation();
    const navigate = useNavigate();
    const [bookingData, setBookingData] = useState(null);

    useEffect(() => {
        const data = location.state?.bookingData;
        if (!data) {
            navigate('/vehicle-search');
            return;
        }
        setBookingData(data);
    }, [location, navigate]);

    const handleDownloadReceipt = () => {
        // PDF download feature coming soon
        alert('Receipt download feature will be available soon');
    };

    const handlePrintReceipt = () => {
        globalThis.print();
    };

    if (!bookingData) {
        return (
            <Main>
                <div className="flex justify-center items-center h-64">
                    <div className="text-center">
                        <p className="text-gray-500">Loading booking details...</p>
                    </div>
                </div>
            </Main>
        );
    }

    return (
        <Main>
            <div className='max-w-4xl mx-auto mt-10 print:mt-0'>
                {/* Success Header */}
                <div className='text-center mb-8 print:mb-4'>
                    <div className='mb-4 print:hidden'>
                        <FaCheckCircle className="text-green-500 text-6xl mx-auto animate-bounce" />
                    </div>
                    <h1 className='text-3xl font-bold mb-2'>Booking Confirmed!</h1>
                    <p className='text-gray-600'>
                        Your vehicle rental has been successfully booked
                    </p>
                </div>

                {/* Booking Details Card */}
                <div className='bg-white border rounded-lg p-6 mb-6 shadow-sm'>
                    <div className='flex justify-between items-start mb-6 pb-4 border-b'>
                        <div>
                            <h3 className='text-lg font-semibold mb-2'>Booking Information</h3>
                            <p className='text-sm text-gray-600'>
                                Booking ID: <span className='font-mono font-semibold'>{bookingData.id || bookingData.bookingId}</span>
                            </p>
                            <p className='text-sm text-gray-600'>
                                Status: <span className='text-green-600 font-semibold'>{bookingData.bookingStatus || 'CONFIRMED'}</span>
                            </p>
                        </div>
                        <div className='text-right'>
                            <p className='text-sm text-gray-600'>Booked on</p>
                            <p className='font-semibold'>
                                {new Date().toLocaleDateString('en-US', { 
                                    weekday: 'short', 
                                    year: 'numeric', 
                                    month: 'short', 
                                    day: 'numeric' 
                                })}
                            </p>
                        </div>
                    </div>

                    {/* Vehicle Details */}
                    <div className='mb-6'>
                        <h4 className='font-semibold mb-3 flex items-center gap-2'>
                            <FaCar className="text-brand-primary" />
                            Vehicle Details
                        </h4>
                        <div className='bg-gray-50 rounded-lg p-4'>
                            <p className='font-semibold text-lg'>{bookingData.vehicle?.name || 'Vehicle'}</p>
                            <p className='text-sm text-gray-600'>{bookingData.vehicle?.type} • {bookingData.vehicle?.seats} seats</p>
                            <p className='text-sm text-gray-600'>{bookingData.vehicle?.rentalAgency}</p>
                        </div>
                    </div>

                    {/* Rental Period */}
                    <div className='mb-6'>
                        <h4 className='font-semibold mb-3 flex items-center gap-2'>
                            <FaCalendarAlt className="text-brand-primary" />
                            Rental Period
                        </h4>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div className='bg-gray-50 rounded-lg p-4'>
                                <p className='text-sm text-gray-600 mb-1'>Pickup</p>
                                <p className='font-semibold'>
                                    {bookingData.pickupDate ? new Date(bookingData.pickupDate).toLocaleDateString('en-US', { 
                                        weekday: 'short', 
                                        year: 'numeric', 
                                        month: 'short', 
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    }) : 'N/A'}
                                </p>
                            </div>
                            <div className='bg-gray-50 rounded-lg p-4'>
                                <p className='text-sm text-gray-600 mb-1'>Return</p>
                                <p className='font-semibold'>
                                    {bookingData.returnDate ? new Date(bookingData.returnDate).toLocaleDateString('en-US', { 
                                        weekday: 'short', 
                                        year: 'numeric', 
                                        month: 'short', 
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    }) : 'N/A'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Location Details */}
                    <div className='mb-6'>
                        <h4 className='font-semibold mb-3 flex items-center gap-2'>
                            <FaMapMarkerAlt className="text-brand-primary" />
                            Location Details
                        </h4>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div className='bg-gray-50 rounded-lg p-4'>
                                <p className='text-sm text-gray-600 mb-1'>Pickup Location</p>
                                <p className='font-semibold'>{bookingData.pickupLocation || 'N/A'}</p>
                            </div>
                            <div className='bg-gray-50 rounded-lg p-4'>
                                <p className='text-sm text-gray-600 mb-1'>Drop-off Location</p>
                                <p className='font-semibold'>{bookingData.dropoffLocation || 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className='mb-6'>
                        <h4 className='font-semibold mb-3'>Contact Information</h4>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div className='flex items-center gap-2'>
                                <FaPhone className="text-gray-400" />
                                <span>{bookingData.phone || 'N/A'}</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <FaEnvelope className="text-gray-400" />
                                <span>{bookingData.email || 'N/A'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Summary */}
                    <div className='bg-gray-50 rounded-lg p-4'>
                        <h4 className='font-semibold mb-3'>Payment Summary</h4>
                        <div className='space-y-2 mb-3'>
                            <div className='flex justify-between'>
                                <span className='text-gray-600'>Number of Days</span>
                                <span className='font-medium'>{bookingData.numberOfDays || 0}</span>
                            </div>
                            {bookingData.withDriver && (
                                <div className='flex justify-between'>
                                    <span className='text-gray-600'>Driver Included</span>
                                    <span className='font-medium text-green-600'>Yes</span>
                                </div>
                            )}
                        </div>
                        <div className='flex justify-between items-center pt-3 border-t'>
                            <span className='text-lg font-semibold'>Total Paid</span>
                            <span className='text-2xl font-bold text-green-600'>
                                LKR {(bookingData.totalCost || 0).toLocaleString()}
                            </span>
                        </div>
                        <p className='text-sm text-gray-600 mt-2'>
                            Payment Status: <span className='text-green-600 font-semibold'>{bookingData.paymentStatus || 'PAID'}</span>
                        </p>
                    </div>
                </div>

                {/* Important Information */}
                <div className='bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6 print:border-gray-300'>
                    <h4 className='font-semibold mb-3 text-blue-900'>Important Information</h4>
                    <ul className='space-y-2 text-sm text-blue-800'>
                        <li>• Please bring a valid driver&apos;s license and ID at the time of pickup</li>
                        <li>• Arrive at least 15 minutes before your scheduled pickup time</li>
                        <li>• A confirmation email has been sent to your registered email address</li>
                        <li>• For any changes or cancellations, please contact us at least 24 hours in advance</li>
                        {!bookingData.withDriver && (
                            <li>• Make sure your driver&apos;s license is valid and not expired</li>
                        )}
                    </ul>
                </div>

                {/* Action Buttons */}
                <div className='flex flex-col md:flex-row gap-4 mb-10 print:hidden'>
                    <PrimaryButton
                        text="Download Receipt"
                        handleClick={handleDownloadReceipt}
                        icon={<FaDownload />}
                        className="flex-1"
                    />
                    <SecondaryButton
                        text="Print Receipt"
                        handleClick={handlePrintReceipt}
                        icon={<FaPrint />}
                        className="flex-1"
                    />
                    <SecondaryButton
                        text="View My Bookings"
                        handleClick={() => navigate('/my-bookings')}
                        className="flex-1"
                    />
                    <SecondaryButton
                        text="Back to Home"
                        handleClick={() => navigate('/home')}
                        className="flex-1"
                    />
                </div>

                {/* Support */}
                <div className='text-center text-sm text-gray-600 mb-10 print:mt-6'>
                    <p>Need help? Contact our support team at</p>
                    <p className='font-semibold'>support@travel.lk • +94 11 123 4567</p>
                </div>
            </div>
        </Main>
    );
}
