import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import html2pdf from 'html2pdf.js';

const VehicleBookingConfirmation = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [bookingDetails, setBookingDetails] = useState(null);
    const confirmationRef = useRef(null);

    // Generate booking confirmation data
    useEffect(() => {
        // Simulate booking data (in real app, this would come from API/database)
        const confirmationData = {
            confirmationNumber: `VB${Date.now().toString().slice(-8)}`,
            bookingDate: new Date().toISOString().split('T')[0],
            status: 'Confirmed',
            vehicle: {
                id: id,
                name: "Toyota Prius",
                category: "Medium car",
                image: "/src/assets/vehicles/toyotaPrius.jpg",
                supplier: "Budget",
                location: "Bandaranaike International Airport"
            },
            rental: {
                pickupDate: "2025-08-15",
                pickupTime: "10:00",
                dropoffDate: "2025-08-18",
                dropoffTime: "10:00",
                pickupLocation: "Bandaranaike International Airport",
                dropoffLocation: "Bandaranaike International Airport",
                duration: "3 days"
            },
            customer: {
                name: "John Doe",
                email: "john.doe@example.com",
                phone: "+94771234567"
            },
            pricing: {
                basePrice: 55500,
                protection: 4500,
                taxes: 6000,
                total: 66000
            },
            driver: {
                additionalDriver: false,
                licenseRequired: true
            },
            nextSteps: [
                "Print or save this confirmation for your records",
                "Bring your driver's license and credit card to the pickup location",
                "Arrive 30 minutes before your pickup time",
                "Contact the supplier if you need to make changes"
            ]
        };

        setBookingDetails(confirmationData);
    }, [id]);

    const handlePrintConfirmation = () => {
        window.print();
    };

    const handleDownloadPDF = () => {
        const element = confirmationRef.current;
        const opt = {
            margin: 1,
            filename: `booking-confirmation-${bookingDetails?.confirmationNumber}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        html2pdf().from(element).set(opt).save();
    };

    const handleBookAnother = () => {
        navigate('/bookings/vehicles');
    };

    const handleGoHome = () => {
        navigate('/home');
    };

    if (!bookingDetails) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading confirmation details...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Success Header */}
            <div className="bg-green-600 text-white py-8">
                <div className="container mx-auto px-4 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="bg-white rounded-full p-3">
                            <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
                    <p className="text-xl opacity-90">Your vehicle reservation has been successfully confirmed</p>
                    <p className="text-lg mt-2">Confirmation Number: <span className="font-mono font-bold">{bookingDetails.confirmationNumber}</span></p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto" ref={confirmationRef}>
                    {/* PDF Header - Only visible in PDF */}
                    <div className="hidden print:block mb-6 text-center border-b pb-4">
                        <h1 className="text-2xl font-bold text-gray-900">Vehicle Booking Confirmation</h1>
                        <p className="text-gray-600 mt-2">Confirmation Number: {bookingDetails.confirmationNumber}</p>
                        <p className="text-gray-600">Booking Date: {new Date().toLocaleDateString()}</p>
                    </div>

                    {/* Action Buttons - Hidden in PDF */}
                    <div className="mb-8 flex flex-wrap gap-4 justify-center print:hidden">
                        <button
                            onClick={handlePrintConfirmation}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zM5 14H4v-3h1v3zm6 0H9v2H7v-2H5v-2h10v2zM9 14h2v2H9v-2z" clipRule="evenodd" />
                            </svg>
                            Print Confirmation
                        </button>
                        <button
                            onClick={handleDownloadPDF}
                            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            Download PDF
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Confirmation Details */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Vehicle Details */}
                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="bg-blue-50 px-6 py-4 border-b">
                                    <h2 className="text-lg font-semibold text-gray-900">Vehicle Details</h2>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-start gap-4">
                                        <img
                                            src={bookingDetails.vehicle.image}
                                            alt={bookingDetails.vehicle.name}
                                            className="w-32 h-24 object-cover rounded-lg"
                                        />
                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                                {bookingDetails.vehicle.name}
                                            </h3>
                                            <p className="text-gray-600 mb-1">{bookingDetails.vehicle.category}</p>
                                            <p className="text-gray-600 mb-1">Supplier: {bookingDetails.vehicle.supplier}</p>
                                            <p className="text-gray-600">Location: {bookingDetails.vehicle.location}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Rental Details */}
                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="bg-blue-50 px-6 py-4 border-b">
                                    <h2 className="text-lg font-semibold text-gray-900">Rental Details</h2>
                                </div>
                                <div className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-2">Pick-up</h4>
                                            <p className="text-gray-600 mb-1">{bookingDetails.rental.pickupLocation}</p>
                                            <p className="text-gray-600 mb-1">{bookingDetails.rental.pickupDate}</p>
                                            <p className="text-gray-600">{bookingDetails.rental.pickupTime}</p>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-2">Drop-off</h4>
                                            <p className="text-gray-600 mb-1">{bookingDetails.rental.dropoffLocation}</p>
                                            <p className="text-gray-600 mb-1">{bookingDetails.rental.dropoffDate}</p>
                                            <p className="text-gray-600">{bookingDetails.rental.dropoffTime}</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-4 border-t">
                                        <p className="text-gray-600">Duration: <span className="font-semibold">{bookingDetails.rental.duration}</span></p>
                                    </div>
                                </div>
                            </div>

                            {/* Customer Information */}
                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="bg-blue-50 px-6 py-4 border-b">
                                    <h2 className="text-lg font-semibold text-gray-900">Customer Information</h2>
                                </div>
                                <div className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-gray-600">Name</p>
                                            <p className="font-semibold">{bookingDetails.customer.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Email</p>
                                            <p className="font-semibold">{bookingDetails.customer.email}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Phone</p>
                                            <p className="font-semibold">{bookingDetails.customer.phone}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Driver License</p>
                                            <p className="font-semibold">
                                                {bookingDetails.driver.licenseRequired ? 'Required at pickup' : 'Not required'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Pricing Summary */}
                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="bg-blue-50 px-6 py-4 border-b">
                                    <h2 className="text-lg font-semibold text-gray-900">Pricing Summary</h2>
                                </div>
                                <div className="p-6">
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Base rental</span>
                                            <span>LKR {bookingDetails.pricing.basePrice.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Protection</span>
                                            <span>LKR {bookingDetails.pricing.protection.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Taxes & fees</span>
                                            <span>LKR {bookingDetails.pricing.taxes.toLocaleString()}</span>
                                        </div>
                                        <div className="border-t pt-3">
                                            <div className="flex justify-between text-lg font-semibold">
                                                <span>Total</span>
                                                <span>LKR {bookingDetails.pricing.total.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Next Steps */}
                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="bg-orange-50 px-6 py-4 border-b">
                                    <h2 className="text-lg font-semibold text-gray-900">Next Steps</h2>
                                </div>
                                <div className="p-6">
                                    <ul className="space-y-3">
                                        {bookingDetails.nextSteps.map((step, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <span className="bg-orange-100 text-orange-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                                                    {index + 1}
                                                </span>
                                                <span className="text-gray-700">{step}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="bg-green-50 px-6 py-4 border-b">
                                    <h2 className="text-lg font-semibold text-gray-900">Need Help?</h2>
                                </div>
                                <div className="p-6">
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-gray-600">Supplier Contact</p>
                                            <p className="font-semibold">+94 11 123 4567</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Customer Service</p>
                                            <p className="font-semibold">support@travel.lk</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Emergency Assistance</p>
                                            <p className="font-semibold">+94 77 999 8888</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="mt-8 flex flex-wrap gap-4 justify-center print:hidden">
                        <button
                            onClick={handleBookAnother}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                        >
                            Book Another Vehicle
                        </button>
                        <button
                            onClick={handleGoHome}
                            className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                        >
                            Go to Home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VehicleBookingConfirmation;
