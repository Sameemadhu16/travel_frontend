import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const VehicleDeal = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [selectedOptions, setSelectedOptions] = useState({
        freeBreakdown: false,
        freeCancellation: true,
        additionalDriver: false,
        gps: false,
        childSeat: false,
        emergencyRoadside: false
    });

    // Get vehicle data based on ID (dummy data for now)
    const vehicleData = {
        1: {
            name: "Perodua Axia",
            category: "Small car",
            seats: 4,
            largeBags: 1,
            transmission: "Automatic",
            mileage: "Unlimited mileage",
            supplier: "Europcar",
            rating: 7.8,
            reviewScore: "Good",
            reviews: 2,
            price: 47991,
            originalPrice: 50544,
            savings: 2553,
            image: "/src/assets/vehicles/suzukiSwift.jpg",
            features: ["4 seats", "1 Large bag", "Automatic", "Unlimited mileage"],
            location: "Colombo Downtown",
            distance: "Downtown",
            pickupInfo: {
                date: "Sat, Aug 9",
                time: "10:00 AM",
                location: "Colombo Downtown",
                instructions: "You'll need to pick up your car at 10:00"
            },
            dropoffInfo: {
                date: "Tue, Aug 12",
                time: "10:00 AM", 
                location: "Colombo Downtown",
                instructions: "View drop-off instructions"
            }
        }
    };

    const vehicle = vehicleData[id] || vehicleData[1];

    const addons = [
        {
            id: 'freeBreakdown',
            name: 'Free breakdown cover',
            description: 'Get help if your car breaks down',
            price: 0,
            originalPrice: 1500,
            savings: 1500,
            recommended: true
        },
        {
            id: 'additionalDriver',
            name: 'Additional driver',
            description: 'Add an extra driver to your rental',
            price: 2500,
            perDay: true
        },
        {
            id: 'gps',
            name: 'GPS Navigation',
            description: 'Built-in GPS navigation system',
            price: 800,
            perDay: true
        },
        {
            id: 'childSeat',
            name: 'Child seat',
            description: 'Safe child seat for kids',
            price: 500,
            perDay: true
        },
        {
            id: 'emergencyRoadside',
            name: 'Emergency roadside assistance',
            description: '24/7 roadside assistance coverage',
            price: 1200,
            perDay: true
        }
    ];

    const handleOptionChange = (optionId) => {
        setSelectedOptions(prev => ({
            ...prev,
            [optionId]: !prev[optionId]
        }));
    };

    const calculateTotal = () => {
        let total = vehicle.price;
        Object.keys(selectedOptions).forEach(optionId => {
            if (selectedOptions[optionId]) {
                const addon = addons.find(a => a.id === optionId);
                if (addon) {
                    total += addon.perDay ? addon.price * 3 : addon.price; // 3 days
                }
            }
        });
        return total;
    };

    const totalPrice = calculateTotal();

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header with booking summary */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 py-4">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                        <div className="flex justify-between items-center">
                            <div className="flex gap-4">
                                <div>
                                    <div className="font-medium text-gray-900">Colombo Downtown</div>
                                    <div className="text-sm text-gray-600">Sat, Aug 9, 2025, 10:00 AM</div>
                                </div>
                                <div className="flex items-center px-2">
                                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="font-medium text-gray-900">Colombo Downtown</div>
                                    <div className="text-sm text-gray-600">Tue, Aug 12, 2025, 10:00 AM</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">You'll need to pick up your car at 10:00</span>
                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium">
                                    Edit
                                </button>
                            </div>
                        </div>
                    </div>

                    <button 
                        onClick={() => navigate('/bookings/vehicles')}
                        className="text-blue-600 hover:underline text-sm font-medium mb-4 inline-block"
                    >
                        ← Back to Search results
                    </button>
                </div>
            </div>

            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Content */}
                    <div className="lg:w-2/3">
                        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                            <h1 className="text-2xl font-bold text-gray-900 mb-4">Your deal</h1>
                            <p className="text-gray-600 mb-6">Next... Protection options</p>

                            {/* Free cancellation notice */}
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-3">
                                <div className="bg-green-100 rounded-full p-1">
                                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <span className="font-medium text-green-800">Free cancellation up to 48 hours before pick-up</span>
                            </div>

                            {/* Vehicle Details */}
                            <div className="flex items-start gap-6 mb-6">
                                <div className="w-48 h-32 relative">
                                    <img
                                        src={vehicle.image}
                                        alt={vehicle.name}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                    <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded font-bold">
                                        Top Pick
                                    </div>
                                </div>
                                
                                <div className="flex-1">
                                    <h2 className="text-xl font-bold text-blue-700 mb-2">{vehicle.name}</h2>
                                    <p className="text-gray-600 mb-3">{vehicle.category}</p>
                                    
                                    <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                                        <span className="flex items-center gap-1">
                                            <span>👥</span> {vehicle.seats} seats
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <span>🧳</span> {vehicle.largeBags} Large bag
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <span>⚙️</span> {vehicle.transmission}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <span>📏</span> {vehicle.mileage}
                                        </span>
                                    </div>
                                    
                                    <div className="text-sm text-gray-600 mb-4">
                                        <strong>{vehicle.location}</strong><br />
                                        {vehicle.distance}
                                    </div>
                                    
                                    <div className="flex items-center gap-2">
                                        <div className="bg-green-600 text-white px-2 py-1 rounded font-bold text-sm">
                                            {vehicle.rating}
                                        </div>
                                        <span className="font-medium text-sm">{vehicle.reviewScore}</span>
                                        <span className="text-gray-500 text-sm">({vehicle.reviews} reviews)</span>
                                    </div>
                                </div>
                            </div>

                            {/* Great Choice Section */}
                            <div className="bg-gray-50 rounded-lg p-6 mb-6">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="bg-green-100 rounded-full p-2">
                                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-lg mb-3">Great choice!</h3>
                                        <div className="grid grid-cols-2 gap-y-2 text-sm">
                                            <div className="flex items-center gap-2">
                                                <span className="text-green-600">✓</span>
                                                <span>Customer rating: {vehicle.rating} / 10</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-green-600">✓</span>
                                                <span>Most popular company here</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-green-600">✓</span>
                                                <span>Most popular fuel policy</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-green-600">✓</span>
                                                <span>Easy to find counter</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-green-600">✓</span>
                                                <span>Helpful counter staff</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-green-600">✓</span>
                                                <span>Free Cancellation</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-shrink-0">
                                        <svg className="w-16 h-16 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Protection Options */}
                            <div className="border-t pt-6">
                                <h3 className="text-xl font-bold mb-4">Included in the price</h3>
                                <div className="space-y-4">
                                    {addons.map((addon) => (
                                        <div key={addon.id} className="flex items-center justify-between p-4 border rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedOptions[addon.id]}
                                                    onChange={() => handleOptionChange(addon.id)}
                                                    className="w-4 h-4 text-blue-600"
                                                />
                                                <div>
                                                    <div className="font-medium">{addon.name}</div>
                                                    <div className="text-sm text-gray-600">{addon.description}</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                {addon.price === 0 ? (
                                                    <div>
                                                        <div className="text-green-600 font-bold">Free</div>
                                                        {addon.originalPrice && (
                                                            <div className="text-xs text-gray-500 line-through">
                                                                LKR {addon.originalPrice.toLocaleString()}
                                                            </div>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <div className="font-bold">
                                                            LKR {(addon.perDay ? addon.price * 3 : addon.price).toLocaleString()}
                                                        </div>
                                                        {addon.perDay && (
                                                            <div className="text-xs text-gray-500">
                                                                LKR {addon.price.toLocaleString()}/day
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:w-1/3">
                        {/* Pick-up and drop-off */}
                        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                            <h3 className="font-bold text-lg mb-4">Pick-up and drop-off</h3>
                            
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="bg-blue-100 rounded-full p-2 mt-1">
                                        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-medium">{vehicle.pickupInfo.date} · {vehicle.pickupInfo.time}</div>
                                        <div className="text-sm text-gray-600">{vehicle.pickupInfo.location}</div>
                                        <button className="text-blue-600 text-sm hover:underline mt-1">
                                            View pick-up instructions
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-3">
                                    <div className="bg-blue-100 rounded-full p-2 mt-1">
                                        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-medium">{vehicle.dropoffInfo.date} · {vehicle.dropoffInfo.time}</div>
                                        <div className="text-sm text-gray-600">{vehicle.dropoffInfo.location}</div>
                                        <button className="text-blue-600 text-sm hover:underline mt-1">
                                            {vehicle.dropoffInfo.instructions}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Price breakdown */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="font-bold text-lg mb-4">Car price breakdown</h3>
                            
                            <div className="space-y-3 mb-4">
                                <div className="flex justify-between">
                                    <span>Car hire charge</span>
                                    <div className="text-right">
                                        <div className="font-medium">LKR {vehicle.price.toLocaleString()}</div>
                                        <div className="text-xs text-gray-500">US$159.57</div>
                                    </div>
                                </div>
                                
                                {/* Show selected addons */}
                                {Object.keys(selectedOptions).map(optionId => {
                                    if (!selectedOptions[optionId]) return null;
                                    const addon = addons.find(a => a.id === optionId);
                                    if (!addon || addon.price === 0) return null;
                                    
                                    return (
                                        <div key={optionId} className="flex justify-between text-sm">
                                            <span>{addon.name}</span>
                                            <span>LKR {(addon.perDay ? addon.price * 3 : addon.price).toLocaleString()}</span>
                                        </div>
                                    );
                                })}
                            </div>
                            
                            <div className="border-t pt-3">
                                <div className="text-sm text-gray-600 mb-2">
                                    LKR prices are approx. You'll pay in USD, because that's your local currency.
                                </div>
                                
                                <div className="flex justify-between items-end mb-4">
                                    <span className="font-bold">Price for 3 days:</span>
                                    <span className="font-bold text-lg">approx. LKR {totalPrice.toLocaleString()}</span>
                                </div>

                                {vehicle.savings > 0 && (
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                                        <div className="font-bold text-green-800">
                                            This car is costing you just LKR {totalPrice.toLocaleString()} – a fantastic deal...
                                        </div>
                                        <div className="text-sm text-green-700 mt-1">
                                            At that time of year, the average small car at Colombo Downtown costs LKR {vehicle.originalPrice.toLocaleString()}!
                                        </div>
                                    </div>
                                )}

                                <button 
                                    onClick={() => navigate(`/bookings/vehicle/${id}/protection`)}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-bold text-lg transition-colors"
                                >
                                    Reserve now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VehicleDeal;
