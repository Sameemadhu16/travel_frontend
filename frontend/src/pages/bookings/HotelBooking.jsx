import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HotelBooking = () => {
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        location: '',
        checkIn: '',
        checkOut: '',
        guests: 2,
        rooms: 1,
        priceRange: [5000, 50000],
        rating: '',
        amenities: [],
        propertyType: ''
    });
    const [sortBy, setSortBy] = useState('recommended');

    // Dummy hotel data based on booking.com style
    const hotels = [
        {
            id: 1,
            name: "Royal Lake Hotel",
            location: "Lake Gregory, Nuwara Eliya (Lake Gregory)",
            distance: "1.7 km from downtown",
            rating: 7.9,
            reviewScore: "Good",
            reviews: 58,
            price: 169713,
            originalPrice: 202556,
            discount: 16,
            image: "/src/assets/hotels/amaya.avif",
            features: ["Free cancellation", "Only 3 rooms left at this price"],
            roomType: "Deluxe Double Room",
            bedType: "1 queen bed",
            deal: "Limited-time Deal",
            locationScore: 9.4
        },
        {
            id: 2,
            name: "Winsanda Bungalow, Nuwara Eliya",
            location: "Nuwara Eliya",
            distance: "3.6 km from downtown",
            rating: 8.0,
            reviewScore: "Very Good",
            reviews: 30,
            price: 84586,
            originalPrice: 102794,
            discount: 18,
            image: "/src/assets/hotels/araliya.jpg",
            features: ["Includes high-speed internet + 10% off property services + 2 more", "Free cancellation"],
            roomType: "Deluxe Double Room",
            bedType: "1 queen bed",
            deal: "Getaway Deal",
            locationScore: 8.7
        },
        {
            id: 3,
            name: "Grand Hotel Nuwara Eliya",
            location: "Grand Hotel Road, Nuwara Eliya",
            distance: "0.8 km from downtown",
            rating: 8.5,
            reviewScore: "Very Good",
            reviews: 145,
            price: 225000,
            originalPrice: 250000,
            discount: 10,
            image: "/src/assets/hotels/jetwing.jpg",
            features: ["Free WiFi", "Swimming Pool", "Spa Services"],
            roomType: "Superior Double Room",
            bedType: "1 king bed",
            deal: "Early Bird Special",
            locationScore: 9.8
        },
        {
            id: 4,
            name: "Tea Factory Hotel",
            location: "Kandapola, Nuwara Eliya",
            distance: "12 km from downtown",
            rating: 9.2,
            reviewScore: "Excellent",
            reviews: 89,
            price: 320000,
            originalPrice: 380000,
            discount: 16,
            image: "/src/assets/hotels/mandara.jpg",
            features: ["Heritage Property", "Mountain Views", "Fine Dining"],
            roomType: "Heritage Suite",
            bedType: "1 king bed + living area",
            deal: "Luxury Experience",
            locationScore: 8.5
        },
        {
            id: 5,
            name: "Hill Club Nuwara Eliya",
            location: "Club Road, Nuwara Eliya",
            distance: "1.2 km from downtown",
            rating: 8.8,
            reviewScore: "Excellent",
            reviews: 67,
            price: 180000,
            originalPrice: 200000,
            discount: 10,
            image: "/src/assets/hotels/shan.jpg",
            features: ["Colonial Heritage", "Golf Course", "Fine Dining"],
            roomType: "Classic Double Room",
            bedType: "2 single beds",
            deal: "Heritage Package",
            locationScore: 9.6
        }
    ];

    const amenitiesList = [
        "Free WiFi", "Swimming Pool", "Fitness Center", "Spa", "Restaurant", 
        "Room Service", "Parking", "Pet Friendly", "Business Center", "Laundry"
    ];

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleAmenityToggle = (amenity) => {
        setFilters(prev => ({
            ...prev,
            amenities: prev.amenities.includes(amenity)
                ? prev.amenities.filter(a => a !== amenity)
                : [...prev.amenities, amenity]
        }));
    };

    const handleBookHotel = (hotelId) => {
        navigate(`/bookings/hotel/${hotelId}/confirm`);
    };

    const filteredHotels = hotels.filter(hotel => {
        if (filters.location && !hotel.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
        if (filters.rating && hotel.rating < parseFloat(filters.rating)) return false;
        if (hotel.price < filters.priceRange[0] || hotel.price > filters.priceRange[1]) return false;
        return true;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-blue-600 text-white py-6">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold mb-4">Find Your Perfect Stay</h1>
                    
                    {/* Search Bar */}
                    <div className="bg-white rounded-lg p-4 shadow-lg">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                                <input
                                    type="text"
                                    placeholder="Where are you going?"
                                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-900"
                                    value={filters.location}
                                    onChange={(e) => handleFilterChange('location', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                                <input
                                    type="date"
                                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-900"
                                    value={filters.checkIn}
                                    onChange={(e) => handleFilterChange('checkIn', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                                <input
                                    type="date"
                                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-900"
                                    value={filters.checkOut}
                                    onChange={(e) => handleFilterChange('checkOut', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Guests & Rooms</label>
                                <div className="flex gap-2">
                                    <select
                                        className="flex-1 p-3 border border-gray-300 rounded-lg text-gray-900"
                                        value={filters.guests}
                                        onChange={(e) => handleFilterChange('guests', e.target.value)}
                                    >
                                        <option value={1}>1 guest</option>
                                        <option value={2}>2 guests</option>
                                        <option value={3}>3 guests</option>
                                        <option value={4}>4 guests</option>
                                    </select>
                                    <select
                                        className="flex-1 p-3 border border-gray-300 rounded-lg text-gray-900"
                                        value={filters.rooms}
                                        onChange={(e) => handleFilterChange('rooms', e.target.value)}
                                    >
                                        <option value={1}>1 room</option>
                                        <option value={2}>2 rooms</option>
                                        <option value={3}>3 rooms</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex items-end">
                                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-lg font-semibold transition-colors">
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <div className="lg:w-1/4">
                        <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold">Filter by</h3>
                                <button className="text-blue-600 text-sm">Clear all filters</button>
                            </div>
                            
                            {/* Price Range */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Price per night (LKR)</label>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>LKR 5,000</span>
                                        <span>LKR 50,000+</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="5000"
                                        max="50000"
                                        step="5000"
                                        className="w-full"
                                        value={filters.priceRange[1]}
                                        onChange={(e) => handleFilterChange('priceRange', [5000, parseInt(e.target.value)])}
                                    />
                                    <div className="text-center text-sm text-gray-600">
                                        LKR {filters.priceRange[0].toLocaleString()} - LKR {filters.priceRange[1].toLocaleString()}
                                    </div>
                                </div>
                            </div>

                            {/* Property Rating */}
                            <div className="mb-6">
                                <h4 className="font-medium mb-3">Property rating</h4>
                                <div className="space-y-2">
                                    {[5, 4, 3, 2, 1].map(stars => (
                                        <label key={stars} className="flex items-center">
                                            <input
                                                type="radio"
                                                name="rating"
                                                value={stars}
                                                checked={filters.rating === stars.toString()}
                                                onChange={(e) => handleFilterChange('rating', e.target.value)}
                                                className="mr-2"
                                            />
                                            <span className="flex">
                                                {[...Array(stars)].map((_, i) => (
                                                    <span key={i} className="text-yellow-400">★</span>
                                                ))}
                                                {[...Array(5-stars)].map((_, i) => (
                                                    <span key={i} className="text-gray-300">★</span>
                                                ))}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Amenities */}
                            <div className="mb-6">
                                <h4 className="font-medium mb-3">Popular filters</h4>
                                <div className="space-y-2">
                                    {amenitiesList.slice(0, 8).map((amenity) => (
                                        <label key={amenity} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={filters.amenities.includes(amenity)}
                                                onChange={() => handleAmenityToggle(amenity)}
                                                className="mr-2"
                                            />
                                            <span className="text-sm">{amenity}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="lg:w-3/4">
                        {/* Sort Options */}
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold">Nuwara Eliya: {filteredHotels.length} properties found</h2>
                            <div className="flex items-center gap-4">
                                <span className="text-sm">Sort by:</span>
                                <select
                                    className="p-2 border border-gray-300 rounded-lg"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="recommended">Our top picks</option>
                                    <option value="price-low">Price (lowest first)</option>
                                    <option value="price-high">Price (highest first)</option>
                                    <option value="rating">Guest rating</option>
                                    <option value="distance">Distance from center</option>
                                </select>
                            </div>
                        </div>

                        {/* Hotel Cards */}
                        <div className="space-y-6">
                            {filteredHotels.map((hotel) => (
                                <div key={hotel.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                    <div className="flex flex-col md:flex-row">
                                        {/* Hotel Image */}
                                        <div className="md:w-1/3 relative">
                                            <img
                                                src={hotel.image}
                                                alt={hotel.name}
                                                className="w-full h-48 md:h-full object-cover"
                                            />
                                            {hotel.deal && (
                                                <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded text-xs font-medium">
                                                    {hotel.deal}
                                                </div>
                                            )}
                                        </div>
                                        
                                        {/* Hotel Details */}
                                        <div className="flex-1 p-6">
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex-1">
                                                    <h3 className="text-xl font-semibold text-blue-700 hover:underline cursor-pointer">
                                                        {hotel.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-600">{hotel.location}</p>
                                                    <p className="text-xs text-gray-500">{hotel.distance}</p>
                                                </div>
                                                <div className="text-right ml-4">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <div className="text-right">
                                                            <div className="text-sm font-medium">{hotel.reviewScore}</div>
                                                            <div className="text-xs text-gray-500">{hotel.reviews} reviews</div>
                                                        </div>
                                                        <div className="bg-blue-600 text-white px-2 py-1 rounded font-bold">
                                                            {hotel.rating}
                                                        </div>
                                                    </div>
                                                    <p className="text-xs text-gray-600">Location {hotel.locationScore}</p>
                                                </div>
                                            </div>
                                            
                                            {/* Room Type */}
                                            <div className="mb-3">
                                                <p className="font-medium text-green-700">{hotel.roomType}</p>
                                                <p className="text-sm text-gray-600">{hotel.bedType}</p>
                                            </div>
                                            
                                            {/* Features */}
                                            <div className="mb-4">
                                                {hotel.features.map((feature, index) => (
                                                    <div key={index} className="flex items-center text-sm text-green-700 mb-1">
                                                        <span className="mr-2">✓</span>
                                                        <span>{feature}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Price Section */}
                                        <div className="md:w-1/4 p-6 bg-gray-50 flex flex-col justify-between">
                                            <div className="text-right">
                                                <div className="mb-2">
                                                    <span className="text-sm text-gray-500">5 nights, 2 adults</span>
                                                </div>
                                                {hotel.originalPrice > hotel.price && (
                                                    <div className="text-sm text-gray-500 line-through">
                                                        LKR {hotel.originalPrice.toLocaleString()}
                                                    </div>
                                                )}
                                                <div className="text-2xl font-bold text-gray-900">
                                                    LKR {hotel.price.toLocaleString()}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    Includes taxes and fees
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleBookHotel(hotel.id)}
                                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold mt-4 transition-colors"
                                            >
                                                See availability
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelBooking;
