import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const VehicleCheckout = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Form states
    const [step, setStep] = useState(1); // 1: Details, 2: Driver License, 3: Payment
    const [formData, setFormData] = useState({
        // Customer Details
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        country: 'Sri Lanka',
        dateOfBirth: '',
        
        // Driver License Details
        licenseNumber: '',
        licenseIssueCountry: 'Sri Lanka',
        licenseIssueDate: '',
        licenseExpiryDate: '',
        licenseImage: null,
        
        // Payment Details
        cardNumber: '',
        expiryMonth: '',
        expiryYear: '',
        cvv: '',
        cardHolderName: '',
        billingAddress: '',
        city: '',
        postalCode: '',
        
        // Additional Options
        additionalDriver: false,
        additionalDriverDetails: {
            firstName: '',
            lastName: '',
            licenseNumber: '',
            dateOfBirth: ''
        }
    });

    const [errors, setErrors] = useState({});
    const [showLicenseUpload, setShowLicenseUpload] = useState(false);

    // Dummy vehicle data (in real app, fetch from API using id)
    const vehicle = {
        name: "Perodua Axia",
        category: "Small car",
        price: 47991,
        period: "3 days",
        pickupDate: "Aug 9, 2025",
        returnDate: "Aug 12, 2025",
        pickupLocation: "Colombo Downtown",
        returnLocation: "Bandaranaike International Airport",
        features: ["4 seats", "1 Large bag", "Automatic", "Unlimited mileage"]
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        if (name.startsWith('additionalDriver.')) {
            const field = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                additionalDriverDetails: {
                    ...prev.additionalDriverDetails,
                    [field]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, licenseImage: file }));
        }
    };

    const validateStep = (currentStep) => {
        const newErrors = {};
        
        if (currentStep === 1) {
            if (!formData.firstName) newErrors.firstName = 'First name is required';
            if (!formData.lastName) newErrors.lastName = 'Last name is required';
            if (!formData.email) newErrors.email = 'Email is required';
            if (!formData.phone) newErrors.phone = 'Phone number is required';
            if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
            
            // If additional driver is selected, validate additional driver details
            if (formData.additionalDriver) {
                if (!formData.additionalDriverDetails.firstName) {
                    newErrors.additionalDriverFirstName = 'Additional driver first name is required';
                }
                if (!formData.additionalDriverDetails.lastName) {
                    newErrors.additionalDriverLastName = 'Additional driver last name is required';
                }
                if (!formData.additionalDriverDetails.licenseNumber) {
                    newErrors.additionalDriverLicense = 'Additional driver license number is required';
                }
                if (!formData.additionalDriverDetails.dateOfBirth) {
                    newErrors.additionalDriverDOB = 'Additional driver date of birth is required';
                }
            }
        }
        
        if (currentStep === 2) {
            // Customer must have license if no additional driver, or additional driver must have license
            if (!formData.additionalDriver) {
                // Customer is the main driver - license required
                if (!formData.licenseNumber) newErrors.licenseNumber = 'Your driving license number is required since you will be the main driver';
                if (!formData.licenseIssueDate) newErrors.licenseIssueDate = 'License issue date is required';
                if (!formData.licenseExpiryDate) newErrors.licenseExpiryDate = 'License expiry date is required';
                
                // Validate license expiry date
                const today = new Date();
                const expiryDate = new Date(formData.licenseExpiryDate);
                if (expiryDate <= today) {
                    newErrors.licenseExpiryDate = 'License has expired. Please provide a valid license.';
                }
            } else {
                // Additional driver is selected - they need license details (already validated in step 1)
                // But we can add additional validation here if needed
                if (!formData.additionalDriverDetails.licenseNumber) {
                    newErrors.additionalDriverLicense = 'Additional driver license number is required';
                }
            }
        }
        
        if (currentStep === 3) {
            if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
            if (!formData.expiryMonth) newErrors.expiryMonth = 'Expiry month is required';
            if (!formData.expiryYear) newErrors.expiryYear = 'Expiry year is required';
            if (!formData.cvv) newErrors.cvv = 'CVV is required';
            if (!formData.cardHolderName) newErrors.cardHolderName = 'Card holder name is required';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep(step)) {
            if (step < 3) {
                setStep(step + 1);
            } else {
                // Process booking
                handleBookingComplete();
            }
        }
    };

    const handleBookingComplete = () => {
        // Here you would normally submit the booking to your API
        // For now, we'll simulate a successful booking and redirect to confirmation
        navigate(`/bookings/vehicle/${id}/confirmation`);
    };

    const renderStepIndicator = () => (
        <div className="flex items-center justify-center mb-8">
            {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                        step >= stepNumber 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-200 text-gray-600'
                    }`}>
                        {stepNumber}
                    </div>
                    <div className={`ml-2 text-sm font-medium ${
                        step >= stepNumber ? 'text-blue-600' : 'text-gray-400'
                    }`}>
                        {stepNumber === 1 && 'Details'}
                        {stepNumber === 2 && 'License'}
                        {stepNumber === 3 && 'Payment'}
                    </div>
                    {stepNumber < 3 && (
                        <div className={`w-12 h-0.5 mx-4 ${
                            step > stepNumber ? 'bg-blue-600' : 'bg-gray-200'
                        }`} />
                    )}
                </div>
            ))}
        </div>
    );

    const renderCustomerDetails = () => (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Customer Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Enter first name"
                    />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Enter last name"
                    />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Enter email address"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Enter phone number"
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                    <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                    >
                        <option value="Sri Lanka">Sri Lanka</option>
                        <option value="India">India</option>
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                    </select>
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>}
                </div>
            </div>
            
            {/* Additional Driver Option */}
            <div className="mt-6">
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        name="additionalDriver"
                        checked={formData.additionalDriver}
                        onChange={handleInputChange}
                        className="mr-2"
                    />
                    <span className="text-sm font-medium">Add additional driver (+LKR 2,500/day)</span>
                </label>
                
                {formData.additionalDriver && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium mb-3">Additional Driver Details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <input
                                    type="text"
                                    name="additionalDriver.firstName"
                                    value={formData.additionalDriverDetails.firstName}
                                    onChange={handleInputChange}
                                    placeholder="First Name"
                                    className={`p-3 border rounded-lg w-full ${errors.additionalDriverFirstName ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.additionalDriverFirstName && <p className="text-red-500 text-xs mt-1">{errors.additionalDriverFirstName}</p>}
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="additionalDriver.lastName"
                                    value={formData.additionalDriverDetails.lastName}
                                    onChange={handleInputChange}
                                    placeholder="Last Name"
                                    className={`p-3 border rounded-lg w-full ${errors.additionalDriverLastName ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.additionalDriverLastName && <p className="text-red-500 text-xs mt-1">{errors.additionalDriverLastName}</p>}
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="additionalDriver.licenseNumber"
                                    value={formData.additionalDriverDetails.licenseNumber}
                                    onChange={handleInputChange}
                                    placeholder="License Number"
                                    className={`p-3 border rounded-lg w-full ${errors.additionalDriverLicense ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.additionalDriverLicense && <p className="text-red-500 text-xs mt-1">{errors.additionalDriverLicense}</p>}
                            </div>
                            <div>
                                <input
                                    type="date"
                                    name="additionalDriver.dateOfBirth"
                                    value={formData.additionalDriverDetails.dateOfBirth}
                                    onChange={handleInputChange}
                                    placeholder="Date of Birth"
                                    className={`p-3 border rounded-lg w-full ${errors.additionalDriverDOB ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.additionalDriverDOB && <p className="text-red-500 text-xs mt-1">{errors.additionalDriverDOB}</p>}
                            </div>
                        </div>
                        <div className="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                            <p className="text-sm text-blue-700">
                                <strong>Note:</strong> Since you have selected an additional driver, they will be the primary driver and must have a valid driving license. You do not need to provide your license details.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    const renderDriverLicense = () => (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">
                {formData.additionalDriver ? 'Additional Driver License Information' : 'Your Driver\'s License Information'}
            </h3>
            
            {/* Information Banner */}
            <div className={`p-4 rounded-lg mb-6 ${formData.additionalDriver ? 'bg-green-50 border-l-4 border-green-400' : 'bg-blue-50 border-l-4 border-blue-400'}`}>
                <div className="flex">
                    <div className="flex-shrink-0">
                        <svg className={`h-5 w-5 ${formData.additionalDriver ? 'text-green-400' : 'text-blue-400'}`} viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <p className={`text-sm ${formData.additionalDriver ? 'text-green-700' : 'text-blue-700'}`}>
                            {formData.additionalDriver 
                                ? 'Great! Your additional driver has been registered. Since they will be driving, we don\'t need your license details.'
                                : 'Since you haven\'t selected an additional driver, you will be the primary driver. Please provide your valid driving license information.'
                            }
                        </p>
                    </div>
                </div>
            </div>

            {/* Show license form only if no additional driver */}
            {!formData.additionalDriver ? (
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">License Number *</label>
                        <input
                            type="text"
                            name="licenseNumber"
                            value={formData.licenseNumber}
                            onChange={handleInputChange}
                            className={`w-full p-3 border rounded-lg ${errors.licenseNumber ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Enter your license number"
                        />
                        {errors.licenseNumber && <p className="text-red-500 text-xs mt-1">{errors.licenseNumber}</p>}
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">License Issued Country</label>
                        <select
                            name="licenseIssueCountry"
                            value={formData.licenseIssueCountry}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        >
                            <option value="Sri Lanka">Sri Lanka</option>
                            <option value="India">India</option>
                            <option value="United States">United States</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="Australia">Australia</option>
                        </select>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Issue Date *</label>
                            <input
                                type="date"
                                name="licenseIssueDate"
                                value={formData.licenseIssueDate}
                                onChange={handleInputChange}
                                className={`w-full p-3 border rounded-lg ${errors.licenseIssueDate ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.licenseIssueDate && <p className="text-red-500 text-xs mt-1">{errors.licenseIssueDate}</p>}
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date *</label>
                            <input
                                type="date"
                                name="licenseExpiryDate"
                                value={formData.licenseExpiryDate}
                                onChange={handleInputChange}
                                className={`w-full p-3 border rounded-lg ${errors.licenseExpiryDate ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.licenseExpiryDate && <p className="text-red-500 text-xs mt-1">{errors.licenseExpiryDate}</p>}
                        </div>
                    </div>
                    
                    {/* License Upload */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <div className="mb-4">
                            <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <p className="text-sm text-gray-600">Upload License Image (Optional)</p>
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                            id="license-upload"
                        />
                        <label
                            htmlFor="license-upload"
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
                        >
                            Choose File
                        </label>
                        {formData.licenseImage && (
                            <p className="text-sm text-green-600 mt-2">File uploaded: {formData.licenseImage.name}</p>
                        )}
                    </div>
                </div>
            ) : (
                /* Show summary when additional driver is selected */
                <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-medium text-lg mb-4">Additional Driver Summary</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="font-medium text-gray-700">Name:</span>
                            <p className="text-gray-900">{formData.additionalDriverDetails.firstName} {formData.additionalDriverDetails.lastName}</p>
                        </div>
                        <div>
                            <span className="font-medium text-gray-700">License Number:</span>
                            <p className="text-gray-900">{formData.additionalDriverDetails.licenseNumber}</p>
                        </div>
                        <div>
                            <span className="font-medium text-gray-700">Date of Birth:</span>
                            <p className="text-gray-900">{formData.additionalDriverDetails.dateOfBirth}</p>
                        </div>
                    </div>
                    <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded-lg">
                        <p className="text-sm text-green-800">
                            ✓ Additional driver information verified. You can proceed to payment.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );

    const renderPaymentDetails = () => (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Payment Details</h3>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Number *</label>
                    <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                    />
                    {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Month *</label>
                        <select
                            name="expiryMonth"
                            value={formData.expiryMonth}
                            onChange={handleInputChange}
                            className={`w-full p-3 border rounded-lg ${errors.expiryMonth ? 'border-red-500' : 'border-gray-300'}`}
                        >
                            <option value="">MM</option>
                            {Array.from({ length: 12 }, (_, i) => (
                                <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                                    {String(i + 1).padStart(2, '0')}
                                </option>
                            ))}
                        </select>
                        {errors.expiryMonth && <p className="text-red-500 text-xs mt-1">{errors.expiryMonth}</p>}
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Year *</label>
                        <select
                            name="expiryYear"
                            value={formData.expiryYear}
                            onChange={handleInputChange}
                            className={`w-full p-3 border rounded-lg ${errors.expiryYear ? 'border-red-500' : 'border-gray-300'}`}
                        >
                            <option value="">YYYY</option>
                            {Array.from({ length: 10 }, (_, i) => (
                                <option key={2025 + i} value={2025 + i}>
                                    {2025 + i}
                                </option>
                            ))}
                        </select>
                        {errors.expiryYear && <p className="text-red-500 text-xs mt-1">{errors.expiryYear}</p>}
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">CVV *</label>
                        <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            className={`w-full p-3 border rounded-lg ${errors.cvv ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="123"
                            maxLength="3"
                        />
                        {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                    </div>
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Holder Name *</label>
                    <input
                        type="text"
                        name="cardHolderName"
                        value={formData.cardHolderName}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg ${errors.cardHolderName ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Name as it appears on card"
                    />
                    {errors.cardHolderName && <p className="text-red-500 text-xs mt-1">{errors.cardHolderName}</p>}
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Billing Address</label>
                    <input
                        type="text"
                        name="billingAddress"
                        value={formData.billingAddress}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        placeholder="Street address"
                    />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            placeholder="City"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                        <input
                            type="text"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            placeholder="Postal code"
                        />
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Booking</h1>
                        <p className="text-gray-600">Please provide the required information to proceed with your vehicle rental</p>
                    </div>

                    {/* Step Indicator */}
                    {renderStepIndicator()}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Form Section */}
                        <div className="lg:col-span-2">
                            {step === 1 && renderCustomerDetails()}
                            {step === 2 && renderDriverLicense()}
                            {step === 3 && renderPaymentDetails()}
                            
                            {/* Navigation Buttons */}
                            <div className="flex justify-between mt-6">
                                <button
                                    onClick={() => setStep(Math.max(1, step - 1))}
                                    disabled={step === 1}
                                    className={`px-6 py-2 rounded-lg ${
                                        step === 1
                                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                >
                                    Previous
                                </button>
                                
                                <button
                                    onClick={handleNext}
                                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    {step === 3 ? 'Complete Booking' : 'Next'}
                                </button>
                            </div>
                        </div>

                        {/* Booking Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                                <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
                                
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-medium text-gray-900">{vehicle.name}</h4>
                                        <p className="text-sm text-gray-600">{vehicle.category}</p>
                                    </div>
                                    
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span>Pick-up:</span>
                                            <span className="font-medium">{vehicle.pickupDate}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Return:</span>
                                            <span className="font-medium">{vehicle.returnDate}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Location:</span>
                                            <span className="font-medium">{vehicle.pickupLocation}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="border-t pt-4">
                                        <div className="flex justify-between text-sm">
                                            <span>Rental cost ({vehicle.period}):</span>
                                            <span>LKR {vehicle.price.toLocaleString()}</span>
                                        </div>
                                        {formData.additionalDriver && (
                                            <div className="flex justify-between text-sm">
                                                <span>Additional driver:</span>
                                                <span>LKR 7,500</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between text-sm">
                                            <span>Taxes & fees:</span>
                                            <span>LKR 5,000</span>
                                        </div>
                                        <div className="border-t pt-2 mt-2">
                                            <div className="flex justify-between font-semibold text-lg">
                                                <span>Total:</span>
                                                <span>LKR {(vehicle.price + (formData.additionalDriver ? 7500 : 0) + 5000).toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                                        <div className="flex items-center">
                                            <svg className="w-4 h-4 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-sm text-green-700">Free cancellation up to 48 hours before pickup</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VehicleCheckout;
