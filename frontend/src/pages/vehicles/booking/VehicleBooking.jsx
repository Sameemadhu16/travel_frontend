import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Main from '../../../components/Main';
import Title from '../../../components/Title';
import Breadcrumb from '../../../components/Breadcrumb';
import PrimaryButton from '../../../components/PrimaryButton';
import { FaCalendarAlt, FaMapMarkerAlt, FaUser } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const breadcrumbItems = [
    { label: "Home", path: "/home" },
    { label: "Vehicles", path: "/vehicle-search" },
    { label: "Booking", path: "/book-vehicle" },
];

export default function VehicleBooking() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, token } = useSelector((state) => state.auth);
    
    const [vehicle, setVehicle] = useState(null);
    const [bookingDetails, setBookingDetails] = useState({
        pickupDate: '',
        pickupTime: '10:00',
        returnDate: '',
        returnTime: '10:00',
        pickupLocation: '',
        dropoffLocation: '',
        withDriver: false,
        driverLicenseNumber: '',
        licenseExpiryDate: '',
        specialRequests: '',
        // Contact details
        firstName: user?.data?.firstName || '',
        lastName: user?.data?.lastName || '',
        email: user?.data?.email || '',
        phone: user?.data?.phoneNumber || '',
        // Terms acceptance
        agreedToTerms: false,
    });

    const [errors, setErrors] = useState({});
    const [totalDays, setTotalDays] = useState(0);
    const [totalCost, setTotalCost] = useState(0);

    useEffect(() => {
        // Get vehicle from localStorage or location state
        const savedVehicle = location.state?.vehicle || JSON.parse(localStorage.getItem('selectedVehicle') || 'null');
        
        if (!savedVehicle) {
            toast.error('No vehicle selected');
            navigate('/vehicle-search');
            return;
        }
        
        setVehicle(savedVehicle);
    }, [location, navigate]);

    useEffect(() => {
        // Calculate total days and cost
        if (bookingDetails.pickupDate && bookingDetails.returnDate) {
            const pickup = new Date(bookingDetails.pickupDate);
            const returnDate = new Date(bookingDetails.returnDate);
            const diffTime = Math.abs(returnDate - pickup);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
            
            setTotalDays(diffDays);
            
            if (vehicle) {
                // Support multiple price field names
                const pricePerDay = vehicle.pricePerDay || vehicle.basePrice || vehicle.price || 0;
                const basePrice = pricePerDay * diffDays;
                const driverFee = bookingDetails.withDriver ? (pricePerDay * 0.3 * diffDays) : 0;
                setTotalCost(basePrice + driverFee);
            }
        }
    }, [bookingDetails.pickupDate, bookingDetails.returnDate, bookingDetails.withDriver, vehicle]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setBookingDetails(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        // Required fields
        if (!bookingDetails.pickupDate) newErrors.pickupDate = 'Pickup date is required';
        if (!bookingDetails.returnDate) newErrors.returnDate = 'Return date is required';
        if (!bookingDetails.pickupLocation) newErrors.pickupLocation = 'Pickup location is required';
        if (!bookingDetails.dropoffLocation) newErrors.dropoffLocation = 'Dropoff location is required';
        if (!bookingDetails.firstName) newErrors.firstName = 'First name is required';
        if (!bookingDetails.lastName) newErrors.lastName = 'Last name is required';
        if (!bookingDetails.email) newErrors.email = 'Email is required';
        if (!bookingDetails.phone) newErrors.phone = 'Phone number is required';
        
        // Terms & Conditions
        if (!bookingDetails.agreedToTerms) {
            newErrors.agreedToTerms = 'You must agree to the Terms & Conditions';
        }
        
        // If self-drive, require license details
        if (!bookingDetails.withDriver) {
            if (!bookingDetails.driverLicenseNumber) newErrors.driverLicenseNumber = 'Driver license number is required';
            if (!bookingDetails.licenseExpiryDate) newErrors.licenseExpiryDate = 'License expiry date is required';
        }
        
        // Date validations
        if (bookingDetails.pickupDate && bookingDetails.returnDate) {
            const pickup = new Date(bookingDetails.pickupDate);
            const returnDate = new Date(bookingDetails.returnDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (pickup < today) {
                newErrors.pickupDate = 'Pickup date cannot be in the past';
            }
            if (returnDate < pickup) {
                newErrors.returnDate = 'Return date must be after pickup date';
            }
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleProceedToPayment = () => {
        console.log('🔵 Proceed to Payment clicked');
        console.log('📋 Booking Details:', bookingDetails);
        console.log('🚗 Vehicle:', vehicle);
        console.log('✅ User:', user);
        
        if (!validateForm()) {
            console.log('❌ Form validation failed');
            toast.error('Please fill in all required fields');
            return;
        }

        console.log('✅ Form validation passed');

        if (!user || !token) {
            console.log('❌ User not logged in');
            toast.error('Please login to continue');
            navigate('/auth/login', { state: { from: location.pathname } });
            return;
        }

        console.log('✅ User is logged in');

        // Save booking details and proceed to payment
        const bookingData = {
            vehicle,
            bookingDetails,
            totalDays,
            totalCost,
            userId: user.data.id
        };
        
        console.log('💾 Saving booking data:', bookingData);
        localStorage.setItem('vehicleBookingData', JSON.stringify(bookingData));
        
        console.log('🚀 Navigating to /vehicle-payment');
        navigate('/vehicle-payment');
    };

    if (!vehicle) {
        return (
            <Main>
                <div className="flex justify-center items-center h-64">
                    <div className="text-center">
                        <p className="text-gray-500">Loading vehicle details...</p>
                    </div>
                </div>
            </Main>
        );
    }

    return (
        <Main>
            <div className='mt-5'>
                <Breadcrumb items={breadcrumbItems} />
            </div>

            <div className='mt-5'>
                <Title title="Complete Your Vehicle Booking" size="text-[24px]" font="font-[600]" />
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6'>
                {/* Booking Form */}
                <div className='lg:col-span-2 space-y-6'>
                    {/* Rental Period */}
                    <div className='bg-white border rounded-lg p-6'>
                        <h3 className='text-lg font-semibold mb-4 flex items-center gap-2'>
                            <FaCalendarAlt className="text-brand-primary" />
                            Rental Period
                        </h3>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div>
                                <label className='block text-sm font-medium mb-2'>
                                    Pickup Date <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type='date'
                                    name='pickupDate'
                                    value={bookingDetails.pickupDate}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-primary ${errors.pickupDate ? 'border-red-500' : ''}`}
                                    min={new Date().toISOString().split('T')[0]}
                                />
                                {errors.pickupDate && <p className="text-red-500 text-sm mt-1">{errors.pickupDate}</p>}
                            </div>
                            <div>
                                <label className='block text-sm font-medium mb-2'>
                                    Pickup Time
                                </label>
                                <input
                                    type='time'
                                    name='pickupTime'
                                    value={bookingDetails.pickupTime}
                                    onChange={handleInputChange}
                                    className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-primary'
                                />
                            </div>
                            <div>
                                <label className='block text-sm font-medium mb-2'>
                                    Return Date <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type='date'
                                    name='returnDate'
                                    value={bookingDetails.returnDate}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-primary ${errors.returnDate ? 'border-red-500' : ''}`}
                                    min={bookingDetails.pickupDate || new Date().toISOString().split('T')[0]}
                                />
                                {errors.returnDate && <p className="text-red-500 text-sm mt-1">{errors.returnDate}</p>}
                            </div>
                            <div>
                                <label className='block text-sm font-medium mb-2'>
                                    Return Time
                                </label>
                                <input
                                    type='time'
                                    name='returnTime'
                                    value={bookingDetails.returnTime}
                                    onChange={handleInputChange}
                                    className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-primary'
                                />
                            </div>
                        </div>
                    </div>

                    {/* Location Details */}
                    <div className='bg-white border rounded-lg p-6'>
                        <h3 className='text-lg font-semibold mb-4 flex items-center gap-2'>
                            <FaMapMarkerAlt className="text-brand-primary" />
                            Location Details
                        </h3>
                        <div className='space-y-4'>
                            <div>
                                <label className='block text-sm font-medium mb-2'>
                                    Pickup Location <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type='text'
                                    name='pickupLocation'
                                    value={bookingDetails.pickupLocation}
                                    onChange={handleInputChange}
                                    placeholder='Enter pickup location'
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-primary ${errors.pickupLocation ? 'border-red-500' : ''}`}
                                />
                                {errors.pickupLocation && <p className="text-red-500 text-sm mt-1">{errors.pickupLocation}</p>}
                            </div>
                            <div>
                                <label className='block text-sm font-medium mb-2'>
                                    Drop-off Location <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type='text'
                                    name='dropoffLocation'
                                    value={bookingDetails.dropoffLocation}
                                    onChange={handleInputChange}
                                    placeholder='Enter drop-off location'
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-primary ${errors.dropoffLocation ? 'border-red-500' : ''}`}
                                />
                                {errors.dropoffLocation && <p className="text-red-500 text-sm mt-1">{errors.dropoffLocation}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Driver Option */}
                    <div className='bg-white border rounded-lg p-6'>
                        <h3 className='text-lg font-semibold mb-4 flex items-center gap-2'>
                            <FaUser className="text-brand-primary" />
                            Driver Options
                        </h3>
                        <div className='mb-4'>
                            <label className='flex items-center gap-2 cursor-pointer'>
                                <input
                                    type='checkbox'
                                    name='withDriver'
                                    checked={bookingDetails.withDriver}
                                    onChange={handleInputChange}
                                    className='w-5 h-5 text-brand-primary'
                                />
                                <span className='font-medium'>I want a driver (+ LKR {((vehicle.pricePerDay || vehicle.basePrice || vehicle.price || 0) * 0.3).toLocaleString()}/day)</span>
                            </label>
                        </div>

                        {!bookingDetails.withDriver && (
                            <div className='space-y-4 mt-4 p-4 bg-gray-50 rounded-lg'>
                                <p className='text-sm text-gray-600 mb-3'>Please provide your driver license details:</p>
                                <div>
                                    <label className='block text-sm font-medium mb-2'>
                                        Driver License Number <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type='text'
                                        name='driverLicenseNumber'
                                        value={bookingDetails.driverLicenseNumber}
                                        onChange={handleInputChange}
                                        placeholder='Enter license number'
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-primary ${errors.driverLicenseNumber ? 'border-red-500' : ''}`}
                                    />
                                    {errors.driverLicenseNumber && <p className="text-red-500 text-sm mt-1">{errors.driverLicenseNumber}</p>}
                                </div>
                                <div>
                                    <label className='block text-sm font-medium mb-2'>
                                        License Expiry Date <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type='date'
                                        name='licenseExpiryDate'
                                        value={bookingDetails.licenseExpiryDate}
                                        onChange={handleInputChange}
                                        min={new Date().toISOString().split('T')[0]}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-primary ${errors.licenseExpiryDate ? 'border-red-500' : ''}`}
                                    />
                                    {errors.licenseExpiryDate && <p className="text-red-500 text-sm mt-1">{errors.licenseExpiryDate}</p>}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Contact Information */}
                    <div className='bg-white border rounded-lg p-6'>
                        <h3 className='text-lg font-semibold mb-4 flex items-center gap-2'>
                            <FaUser className="text-brand-primary" />
                            Contact Information
                        </h3>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div>
                                <label className='block text-sm font-medium mb-2'>
                                    First Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type='text'
                                    name='firstName'
                                    value={bookingDetails.firstName}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-primary ${errors.firstName ? 'border-red-500' : ''}`}
                                />
                                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                            </div>
                            <div>
                                <label className='block text-sm font-medium mb-2'>
                                    Last Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type='text'
                                    name='lastName'
                                    value={bookingDetails.lastName}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-primary ${errors.lastName ? 'border-red-500' : ''}`}
                                />
                                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                            </div>
                            <div>
                                <label className='block text-sm font-medium mb-2'>
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type='email'
                                    name='email'
                                    value={bookingDetails.email}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-primary ${errors.email ? 'border-red-500' : ''}`}
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>
                            <div>
                                <label className='block text-sm font-medium mb-2'>
                                    Phone Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type='tel'
                                    name='phone'
                                    value={bookingDetails.phone}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-primary ${errors.phone ? 'border-red-500' : ''}`}
                                />
                                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Special Requests */}
                    <div className='bg-white border rounded-lg p-6'>
                        <h3 className='text-lg font-semibold mb-4'>Special Requests</h3>
                        <textarea
                            name='specialRequests'
                            value={bookingDetails.specialRequests}
                            onChange={handleInputChange}
                            placeholder='Any special requirements or notes...'
                            rows='4'
                            className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-primary'
                        />
                    </div>
                </div>

                {/* Summary Card */}
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
                            <h4 className='font-semibold text-lg'>{vehicle.name}</h4>
                            <p className='text-sm text-gray-600'>{vehicle.type} • {vehicle.seats} seats</p>
                            <p className='text-sm text-gray-600'>{vehicle.rentalAgency}</p>
                        </div>

                        {/* Price Breakdown */}
                        <div className='space-y-3 mb-4 pb-4 border-b'>
                            <div className='flex justify-between'>
                                <span className='text-gray-600'>Price per day</span>
                                <span className='font-medium'>LKR {(vehicle.pricePerDay || vehicle.basePrice || vehicle.price || 0).toLocaleString()}</span>
                            </div>
                            {totalDays > 0 && (
                                <div className='flex justify-between'>
                                    <span className='text-gray-600'>Number of days</span>
                                    <span className='font-medium'>{totalDays}</span>
                                </div>
                            )}
                            <div className='flex justify-between'>
                                <span className='text-gray-600'>Vehicle rental</span>
                                <span className='font-medium'>LKR {((vehicle.pricePerDay || vehicle.basePrice || vehicle.price || 0) * (totalDays || 1)).toLocaleString()}</span>
                            </div>
                            {bookingDetails.withDriver && totalDays > 0 && (
                                <div className='flex justify-between'>
                                    <span className='text-gray-600'>Driver fee ({totalDays} days)</span>
                                    <span className='font-medium'>LKR {((vehicle.pricePerDay || vehicle.basePrice || vehicle.price || 0) * 0.3 * totalDays).toLocaleString()}</span>
                                </div>
                            )}
                        </div>

                        {/* Total */}
                        <div className='flex justify-between items-center mb-6'>
                            <span className='text-xl font-semibold'>Total</span>
                            <span className='text-2xl font-bold text-brand-primary'>
                                LKR {totalCost.toLocaleString()}
                            </span>
                        </div>

                        {/* Terms & Conditions Checkbox */}
                        <div className='mb-4'>
                            <label className='flex items-start gap-3 cursor-pointer'>
                                <input
                                    type='checkbox'
                                    name='agreedToTerms'
                                    checked={bookingDetails.agreedToTerms}
                                    onChange={handleInputChange}
                                    className='mt-1 h-4 w-4 text-brand-primary border-gray-300 rounded focus:ring-brand-primary'
                                />
                                <span className='text-sm text-gray-700'>
                                    I agree to the{' '}
                                    <a href='/terms' target='_blank' className='text-brand-primary hover:underline'>
                                        Terms & Conditions
                                    </a>{' '}
                                    and{' '}
                                    <a href='/cancellation-policy' target='_blank' className='text-brand-primary hover:underline'>
                                        Cancellation Policy
                                    </a>
                                </span>
                            </label>
                            {errors.agreedToTerms && (
                                <p className="text-red-500 text-sm mt-2">{errors.agreedToTerms}</p>
                            )}
                        </div>

                        {/* Action Button */}
                        <PrimaryButton
                            text="Proceed to Payment"
                            onClick={handleProceedToPayment}
                            className="w-full"
                        />

                        {/* Info Text */}
                        <p className='text-xs text-gray-500 mt-4 text-center'>
                            Your payment information is secure and encrypted
                        </p>
                    </div>
                </div>
            </div>
        </Main>
    );
}
