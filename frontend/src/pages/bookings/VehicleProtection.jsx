import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const VehicleProtection = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [selectedProtection, setSelectedProtection] = useState('basic');

    // Dummy vehicle data (in real app, this would come from API or context)
    const vehicleData = {
        name: "Perodua Axia",
        category: "Small car",
        pickupLocation: "Colombo Downtown",
        pickupDate: "Sat, Aug 9, 2025, 10:00 AM",
        dropoffLocation: "Colombo Downtown", 
        dropoffDate: "Tue, Aug 12, 2025, 10:00 AM",
        price: 47990.68,
        priceUSD: 159.57
    };

    const protectionOptions = [
        {
            id: 'basic',
            name: 'Basic protection',
            price: 0,
            features: [
                {
                    name: 'Theft of car',
                    coverage: 'You pay LKR 243,493.22 (your "excess")',
                    refund: 'No refund',
                    icon: '✓',
                    color: 'text-green-600'
                },
                {
                    name: 'Bodywork damage',
                    coverage: 'You pay up to LKR 243,493.22 (your "excess")',
                    refund: 'No refund',
                    icon: '✓',
                    color: 'text-green-600'
                }
            ]
        },
        {
            id: 'full',
            name: 'Full Protection',
            price: 15000,
            popular: true,
            features: [
                {
                    name: 'Theft of car',
                    coverage: 'Refund for anything you pay',
                    refund: 'Refund',
                    icon: '✓',
                    color: 'text-green-600'
                },
                {
                    name: 'Bodywork damage',
                    coverage: 'Refund for anything you pay',
                    refund: 'Refund',
                    icon: '✓',
                    color: 'text-green-600'
                }
            ]
        }
    ];

    const handleContinue = () => {
        // Navigate to checkout/payment page
        navigate(`/bookings/vehicle/${id}/checkout`);
    };

    const handleBackToDeal = () => {
        navigate(`/bookings/vehicle/${id}/deal`);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header with booking details */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-4">
                    <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div>
                                <div className="font-semibold text-gray-900">{vehicleData.pickupLocation}</div>
                                <div className="text-sm text-gray-600">{vehicleData.pickupDate}</div>
                            </div>
                            <div className="text-gray-400">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                            <div>
                                <div className="font-semibold text-gray-900">{vehicleData.dropoffLocation}</div>
                                <div className="text-sm text-gray-600">{vehicleData.dropoffDate}</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-blue-600">
                                <span className="text-sm">⚠️</span>
                                <span className="text-sm">You'll need to pick up your car at 10:00</span>
                            </div>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700">
                                Edit
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Content */}
                    <div className="lg:w-2/3">
                        {/* Breadcrumb */}
                        <div className="mb-6">
                            <button 
                                onClick={handleBackToDeal}
                                className="text-blue-600 hover:underline"
                            >
                                Back to Your deal
                            </button>
                        </div>

                        {/* Protection Options Header */}
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">Protection options</h1>
                            <div className="flex items-center gap-2">
                                <span className="text-gray-600">Next...</span>
                                <span className="text-blue-600">Checkout</span>
                            </div>
                            <div className="border-b-2 border-blue-600 w-1/3 mt-2"></div>
                        </div>

                        {/* Protection for peace of mind */}
                        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                            <h2 className="text-xl font-semibold mb-4">
                                Protection... <span className="text-green-600">for peace of mind</span>
                            </h2>
                            
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-green-600">🛡️</span>
                                    <span className="font-medium">FREE cancellation</span>
                                    <span className="text-gray-600">Full refund if you cancel your plan anytime before pick-up</span>
                                </div>
                            </div>

                            <p className="text-sm text-gray-600 mb-4">
                                At the counter, the car hire company will block a deposit amount on your credit card. You could lose your whole 
                                deposit if the car is damaged or stolen, but as long as you have our Full Protection, Rentalcover.com will refund 
                                you! (The protection price you see includes all applicable taxes and fees).
                            </p>

                            <p className="text-sm text-gray-600 mb-2">
                                T&Cs and standard exclusions apply. Please read:
                            </p>
                            <button className="text-blue-600 hover:underline text-sm">
                                Protection Terms
                            </button>
                        </div>

                        {/* Protection Options Table */}
                        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                            <div className="grid grid-cols-3 bg-gray-50 border-b">
                                <div className="p-4">
                                    <h3 className="font-semibold text-gray-900">What's covered</h3>
                                </div>
                                <div className="p-4 text-center border-l">
                                    <h3 className="font-semibold text-gray-900">Basic protection</h3>
                                </div>
                                <div className="p-4 text-center border-l bg-green-50">
                                    <h3 className="font-semibold text-green-700">Full Protection</h3>
                                    {protectionOptions[1].popular && (
                                        <span className="inline-block bg-orange-500 text-white text-xs px-2 py-1 rounded-full mt-1">
                                            POPULAR
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Protection Features */}
                            {protectionOptions[0].features.map((feature, index) => (
                                <div key={index} className="grid grid-cols-3 border-b last:border-b-0">
                                    <div className="p-4 border-r">
                                        <div className="font-medium text-gray-900">{feature.name}</div>
                                    </div>
                                    <div className="p-4 border-r text-center">
                                        <div className="flex items-center justify-center mb-2">
                                            <span className="text-green-600 text-xl">✓</span>
                                        </div>
                                        <div className="text-sm text-gray-600 mb-1">
                                            {protectionOptions[0].features[index].coverage}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {protectionOptions[0].features[index].refund}
                                        </div>
                                    </div>
                                    <div className="p-4 text-center bg-green-50">
                                        <div className="flex items-center justify-center mb-2">
                                            <span className="text-green-600 text-xl">✓</span>
                                        </div>
                                        <div className="text-sm text-gray-600 mb-1">
                                            {protectionOptions[1].features[index].coverage}
                                        </div>
                                        <div className="text-xs text-green-600 font-medium">
                                            {protectionOptions[1].features[index].refund}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Protection Selection */}
                            <div className="grid grid-cols-3">
                                <div className="p-4"></div>
                                <div className="p-4 border-l text-center">
                                    <label className="flex items-center justify-center cursor-pointer">
                                        <input
                                            type="radio"
                                            name="protection"
                                            value="basic"
                                            checked={selectedProtection === 'basic'}
                                            onChange={(e) => setSelectedProtection(e.target.value)}
                                            className="mr-2"
                                        />
                                        <span className="font-medium">Select Basic</span>
                                    </label>
                                </div>
                                <div className="p-4 border-l text-center bg-green-50">
                                    <label className="flex items-center justify-center cursor-pointer">
                                        <input
                                            type="radio"
                                            name="protection"
                                            value="full"
                                            checked={selectedProtection === 'full'}
                                            onChange={(e) => setSelectedProtection(e.target.value)}
                                            className="mr-2"
                                        />
                                        <span className="font-medium text-green-700">Select Full Protection</span>
                                    </label>
                                    {selectedProtection === 'full' && (
                                        <div className="mt-2 text-sm text-green-600">
                                            +LKR {protectionOptions[1].price.toLocaleString()}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Continue Button */}
                        <div className="mt-8">
                            <button
                                onClick={handleContinue}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-colors"
                            >
                                Continue to Checkout
                            </button>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:w-1/3">
                        {/* Pick-up and drop-off */}
                        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                            <h3 className="font-semibold text-gray-900 mb-4">Pick-up and drop-off</h3>
                            
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-3 h-3 bg-blue-600 rounded-full mt-2"></div>
                                    <div>
                                        <div className="font-medium">{vehicleData.pickupDate}</div>
                                        <div className="text-gray-600">{vehicleData.pickupLocation}</div>
                                        <button className="text-blue-600 hover:underline text-sm mt-1">
                                            View pick-up instructions
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-3">
                                    <div className="w-3 h-3 bg-blue-600 rounded-full mt-2"></div>
                                    <div>
                                        <div className="font-medium">{vehicleData.dropoffDate}</div>
                                        <div className="text-gray-600">{vehicleData.dropoffLocation}</div>
                                        <button className="text-blue-600 hover:underline text-sm mt-1">
                                            View drop-off instructions
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Fast and reliable */}
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-green-600">✓</span>
                                <span className="font-medium text-green-800">Fast and reliable</span>
                            </div>
                            <p className="text-sm text-green-700">Over 97% of claims paid out</p>
                        </div>

                        {/* Car price breakdown */}
                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <h3 className="font-semibold text-gray-900 mb-4">Car price breakdown</h3>
                            
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Car hire charge</span>
                                    <div className="text-right">
                                        <div className="font-medium">LKR {vehicleData.price.toLocaleString()}</div>
                                        <div className="text-xs text-gray-500">US${vehicleData.priceUSD}</div>
                                    </div>
                                </div>

                                {selectedProtection === 'full' && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Full Protection</span>
                                        <div className="font-medium">LKR {protectionOptions[1].price.toLocaleString()}</div>
                                    </div>
                                )}

                                <div className="border-t pt-3 mt-3">
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold">Total</span>
                                        <div className="text-right">
                                            <div className="font-bold text-lg">
                                                LKR {(vehicleData.price + (selectedProtection === 'full' ? protectionOptions[1].price : 0)).toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <p className="text-xs text-gray-500 mt-4">
                                LKR prices are approx. You'll pay in USD, because that's your local currency.
                            </p>

                            <div className="mt-4 p-3 bg-gray-50 rounded">
                                <div className="font-medium text-sm mb-1">Price for 3 days:</div>
                                <div className="text-sm text-gray-600">
                                    approx. LKR {(vehicleData.price + (selectedProtection === 'full' ? protectionOptions[1].price : 0)).toLocaleString()}
                                </div>
                            </div>

                            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                                <div className="text-sm">
                                    <div className="font-medium mb-1">
                                        This car is costing you just LKR {vehicleData.price.toLocaleString()} – a fantastic deal...
                                    </div>
                                    <div className="text-gray-600">
                                        At that time of year, the average small car at {vehicleData.pickupLocation} costs LKR 50,544.05!
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

export default VehicleProtection;
