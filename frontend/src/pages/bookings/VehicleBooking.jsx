import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VehicleBooking = () => {
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        pickupLocation: '',
        pickupDate: '',
        pickupTime: '10:00',
        dropoffDate: '',
        dropoffTime: '10:00',
        driverAge: '30-65',
        vehicleType: '',
        transmission: '',
        supplier: '',
        fuelType: ''
    });
    const [sortBy, setSortBy] = useState('recommended');
    const [showLocationDropdown, setShowLocationDropdown] = useState(false);
    const [locationSearchResults, setLocationSearchResults] = useState([]);
    const [selectedLocationIndex, setSelectedLocationIndex] = useState(-1);
    const locationInputRef = useRef(null);
    const dropdownRef = useRef(null);

    // Dummy location data for search
    const locationData = [
        {
            id: 1,
            name: "Bandaranaike International Airport",
            type: "Airport",
            code: "CMB",
            city: "Colombo",
            distance: "32 km north of Colombo"
        },
        {
            id: 2,
            name: "Colombo City Center",
            type: "City",
            code: "COL",
            city: "Colombo",
            distance: "Downtown area"
        },
        {
            id: 3,
            name: "Colombo Fort Railway Station",
            type: "Station",
            code: "CFT",
            city: "Colombo",
            distance: "Central business district"
        },
        {
            id: 4,
            name: "Galle International Airport",
            type: "Airport",
            code: "GAL",
            city: "Galle",
            distance: "Southern Province"
        },
        {
            id: 5,
            name: "Kandy City Center",
            type: "City",
            code: "KDY",
            city: "Kandy",
            distance: "Cultural capital"
        },
        {
            id: 6,
            name: "Kandy Railway Station",
            type: "Station",
            code: "KRS",
            city: "Kandy",
            distance: "Central Province"
        },
        {
            id: 7,
            name: "Mattala Rajapaksa International Airport",
            type: "Airport",
            code: "HRI",
            city: "Hambantota",
            distance: "Southern Sri Lanka"
        },
        {
            id: 8,
            name: "Negombo City Center",
            type: "City",
            code: "NEG",
            city: "Negombo",
            distance: "Near airport"
        },
        {
            id: 9,
            name: "Nuwara Eliya City Center",
            type: "City",
            code: "NUW",
            city: "Nuwara Eliya",
            distance: "Hill country"
        },
        {
            id: 10,
            name: "Galle Railway Station",
            type: "Station",
            code: "GRS",
            city: "Galle",
            distance: "Coastal line terminus"
        },
        {
            id: 11,
            name: "Ratnapura City Center",
            type: "City",
            code: "RAT",
            city: "Ratnapura",
            distance: "Gem city"
        },
        {
            id: 12,
            name: "Anuradhapura City Center",
            type: "City",
            code: "ANU",
            city: "Anuradhapura",
            distance: "Ancient capital"
        }
    ];

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowLocationDropdown(false);
            }
        }
        if (showLocationDropdown) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showLocationDropdown]);

    // Real-time search functionality
    const handleLocationSearch = (searchTerm) => {
        setFilters(prev => ({ ...prev, pickupLocation: searchTerm }));
        setSelectedLocationIndex(-1); // Reset selection when searching
        
        if (searchTerm.length > 0) {
            const results = locationData.filter(location =>
                location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                location.type.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setLocationSearchResults(results);
            setShowLocationDropdown(true);
        } else {
            // Show popular locations when search is empty
            const popularLocations = locationData.filter(location => 
                location.type === 'Airport' || 
                (location.type === 'City' && ['Colombo', 'Kandy', 'Galle'].includes(location.city))
            );
            setLocationSearchResults(popularLocations);
            setShowLocationDropdown(true);
        }
    };

    const handleLocationInputFocus = () => {
        if (filters.pickupLocation.length === 0) {
            // Show popular locations when focused and empty
            const popularLocations = locationData.filter(location => 
                location.type === 'Airport' || 
                (location.type === 'City' && ['Colombo', 'Kandy', 'Galle'].includes(location.city))
            );
            setLocationSearchResults(popularLocations);
            setShowLocationDropdown(true);
        } else if (locationSearchResults.length > 0) {
            setShowLocationDropdown(true);
        }
    };

    const handleLocationSelect = (location) => {
        setFilters(prev => ({ ...prev, pickupLocation: location.name }));
        setShowLocationDropdown(false);
        setLocationSearchResults([]);
        setSelectedLocationIndex(-1);
    };

    const handleKeyDown = (e) => {
        if (!showLocationDropdown || locationSearchResults.length === 0) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedLocationIndex(prev => 
                    prev < locationSearchResults.length - 1 ? prev + 1 : prev
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedLocationIndex(prev => prev > 0 ? prev - 1 : -1);
                break;
            case 'Enter':
                e.preventDefault();
                if (selectedLocationIndex >= 0) {
                    handleLocationSelect(locationSearchResults[selectedLocationIndex]);
                }
                break;
            case 'Escape':
                setShowLocationDropdown(false);
                setSelectedLocationIndex(-1);
                break;
            default:
                break;
        }
    };

    const getLocationIcon = (type) => {
        switch (type) {
            case 'Airport':
                return '✈️';
            case 'Station':
                return '🚂';
            case 'City':
                return '🏙️';
            default:
                return '📍';
        }
    };

    // Dummy vehicle data based on booking.com cars style
    const vehicles = [
        {
            id: 1,
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
            period: "3 days",
            location: "Colombo Downtown",
            distance: "11.2 km from center",
            features: ["Free cancellation", "4 seats", "1 Large bag", "Automatic", "Unlimited mileage"],
            image: "/src/assets/vehicles/suzukiSwift.jpg",
            pickupInfo: "Colombo Downtown",
            fuel: "Petrol",
            doors: 4
        },
        {
            id: 2,
            name: "Toyota Prius",
            category: "Medium car",
            seats: 5,
            largeBags: 2,
            transmission: "Automatic",
            mileage: "Unlimited mileage",
            supplier: "Budget",
            rating: 8.2,
            reviewScore: "Very Good",
            reviews: 45,
            price: 55500,
            period: "3 days",
            location: "Bandaranaike International Airport",
            distance: "1.2 km from center",
            features: ["Free cancellation", "5 seats", "2 Large bags", "Automatic", "Hybrid", "GPS included"],
            image: "/src/assets/vehicles/toyotaPrius.jpg",
            pickupInfo: "Airport Terminal",
            fuel: "Hybrid",
            doors: 4
        },
        {
            id: 3,
            name: "Honda Civic",
            category: "Medium car",
            seats: 5,
            largeBags: 2,
            transmission: "Manual",
            mileage: "Unlimited mileage",
            supplier: "Avis",
            rating: 8.5,
            reviewScore: "Very Good",
            reviews: 67,
            price: 62000,
            period: "3 days",
            location: "Colombo City Center",
            distance: "0.5 km from center",
            features: ["Free cancellation", "5 seats", "2 Large bags", "Manual", "Air conditioning"],
            image: "/src/assets/vehicles/hondaCivic.jpg",
            pickupInfo: "City Center",
            fuel: "Petrol",
            doors: 4
        },
        {
            id: 4,
            name: "BMW X5",
            category: "SUV",
            seats: 7,
            largeBags: 4,
            transmission: "Automatic",
            mileage: "Unlimited mileage",
            supplier: "Hertz",
            rating: 9.1,
            reviewScore: "Excellent",
            reviews: 23,
            price: 125000,
            period: "3 days",
            location: "Colombo Premium",
            distance: "2.1 km from center",
            features: ["Premium vehicle", "7 seats", "4 Large bags", "Automatic", "Leather seats", "GPS"],
            image: "/src/assets/vehicles/BMWX5.jpg",
            pickupInfo: "Premium Location",
            fuel: "Petrol",
            doors: 5
        },
        {
            id: 5,
            name: "Mercedes-Benz E-Class",
            category: "Luxury",
            seats: 5,
            largeBags: 3,
            transmission: "Automatic",
            mileage: "Unlimited mileage",
            supplier: "Sixt",
            rating: 9.3,
            reviewScore: "Excellent",
            reviews: 18,
            price: 150000,
            period: "3 days",
            location: "Colombo Luxury Fleet",
            distance: "1.8 km from center",
            features: ["Luxury vehicle", "5 seats", "3 Large bags", "Automatic", "Premium interior", "Chauffeur available"],
            image: "/src/assets/vehicles/mercedesBenz.jpg",
            pickupInfo: "Luxury Fleet Center",
            fuel: "Petrol",
            doors: 4
        },
        {
            id: 6,
            name: "Hyundai Tucson",
            category: "SUV",
            seats: 5,
            largeBags: 3,
            transmission: "Automatic",
            mileage: "Unlimited mileage",
            supplier: "National",
            rating: 8.0,
            reviewScore: "Very Good",
            reviews: 34,
            price: 85000,
            period: "3 days",
            location: "Colombo Airport",
            distance: "35 km from center",
            features: ["Free cancellation", "5 seats", "3 Large bags", "Automatic", "4WD available"],
            image: "/src/assets/vehicles/hyundaiTucson.jpg",
            pickupInfo: "Airport Pickup",
            fuel: "Petrol",
            doors: 5
        }
    ];

    const vehicleCategories = [
        { type: "small", label: "Small car", icon: "🚗" },
        { type: "medium", label: "Medium car", icon: "🚙" },
        { type: "large", label: "Large car", icon: "🚗" },
        { type: "suv", label: "SUVs", icon: "🚙" },
        { type: "minivan", label: "Minivan", icon: "🚐" }
    ];

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleBookVehicle = (vehicleId) => {
        navigate(`/bookings/vehicle/${vehicleId}/confirm`);
    };

    const filteredVehicles = vehicles.filter(vehicle => {
        if (filters.pickupLocation && !vehicle.location.toLowerCase().includes(filters.pickupLocation.toLowerCase())) return false;
        if (filters.vehicleType && !vehicle.category.toLowerCase().includes(filters.vehicleType.toLowerCase())) return false;
        if (filters.transmission && vehicle.transmission.toLowerCase() !== filters.transmission.toLowerCase()) return false;
        if (filters.supplier && vehicle.supplier.toLowerCase() !== filters.supplier.toLowerCase()) return false;
        return true;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-blue-600 text-white py-6">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold mb-4">Car Rentals</h1>
                    
                    {/* Search Bar */}
                    <div className="bg-white rounded-lg p-4 shadow-lg">
                        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                            <div className="relative" ref={dropdownRef}>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Pick-up location</label>
                                <input
                                    ref={locationInputRef}
                                    type="text"
                                    placeholder="Airport, station or city"
                                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={filters.pickupLocation}
                                    onChange={(e) => handleLocationSearch(e.target.value)}
                                    onFocus={handleLocationInputFocus}
                                    onKeyDown={handleKeyDown}
                                />
                                {/* Location Search Dropdown */}
                                {showLocationDropdown && locationSearchResults.length > 0 && (
                                    <div className="absolute top-full left-0 right-0 z-50 bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
                                        {filters.pickupLocation.length === 0 && (
                                            <div className="px-3 py-2 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-700">
                                                Popular locations
                                            </div>
                                        )}
                                        {locationSearchResults.map((location, index) => (
                                            <button
                                                key={location.id}
                                                type="button"
                                                className={`w-full p-3 cursor-pointer border-b border-gray-100 last:border-b-0 text-left transition-colors ${
                                                    index === selectedLocationIndex
                                                        ? 'bg-blue-50 hover:bg-blue-100'
                                                        : 'hover:bg-gray-50'
                                                }`}
                                                onClick={() => handleLocationSelect(location)}
                                                onMouseEnter={() => setSelectedLocationIndex(index)}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className="text-lg">{getLocationIcon(location.type)}</span>
                                                    <div className="flex-1">
                                                        <div className="font-medium text-gray-900">{location.name}</div>
                                                        <div className="text-sm text-gray-600">
                                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                                                                {location.type}
                                                            </span>
                                                            {location.city} • {location.distance}
                                                        </div>
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Pick-up date</label>
                                <input
                                    type="date"
                                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-900"
                                    value={filters.pickupDate}
                                    onChange={(e) => handleFilterChange('pickupDate', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                                <select
                                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-900"
                                    value={filters.pickupTime}
                                    onChange={(e) => handleFilterChange('pickupTime', e.target.value)}
                                >
                                    <option value="10:00">10:00</option>
                                    <option value="12:00">12:00</option>
                                    <option value="14:00">14:00</option>
                                    <option value="16:00">16:00</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Drop-off date</label>
                                <input
                                    type="date"
                                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-900"
                                    value={filters.dropoffDate}
                                    onChange={(e) => handleFilterChange('dropoffDate', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                                <select
                                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-900"
                                    value={filters.dropoffTime}
                                    onChange={(e) => handleFilterChange('dropoffTime', e.target.value)}
                                >
                                    <option value="10:00">10:00</option>
                                    <option value="12:00">12:00</option>
                                    <option value="14:00">14:00</option>
                                    <option value="16:00">16:00</option>
                                </select>
                            </div>
                            <div className="flex items-end">
                                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-lg font-semibold transition-colors">
                                    Search
                                </button>
                            </div>
                        </div>
                        
                        {/* Additional Options */}
                        <div className="mt-4 flex items-center gap-6">
                            <label className="flex items-center">
                                <input type="checkbox" className="mr-2" />
                                <span className="text-gray-700">Drop car off at different location</span>
                            </label>
                            <label className="flex items-center">
                                <input type="checkbox" className="mr-2" defaultChecked />
                                <span className="text-gray-700">Driver aged 30 - 65?</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Vehicle Categories */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4">Vehicle Categories</h3>
                    <div className="flex gap-4 flex-wrap">
                        {vehicleCategories.map((category) => (
                            <button
                                key={category.type}
                                onClick={() => handleFilterChange('vehicleType', category.type)}
                                className={`flex flex-col items-center p-4 rounded-lg border-2 transition-colors ${
                                    filters.vehicleType === category.type
                                        ? 'border-blue-600 bg-blue-50'
                                        : 'border-gray-200 hover:border-blue-300'
                                }`}
                            >
                                <span className="text-2xl mb-2">{category.icon}</span>
                                <span className="text-sm font-medium">{category.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <div className="lg:w-1/4">
                        <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold">Filter</h3>
                                <button className="text-blue-600 text-sm">Clear all filters</button>
                            </div>
                            
                            {/* Location Filter */}
                            <div className="mb-6">
                                <h4 className="font-medium mb-3">Location</h4>
                                <div className="space-y-2">
                                    <label className="flex items-center">
                                        <input type="checkbox" className="mr-2" />
                                        <span className="text-sm">Airport (outside terminal) <span className="text-gray-500">13</span></span>
                                    </label>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="mr-2" />
                                        <span className="text-sm">All other locations <span className="text-gray-500">13</span></span>
                                    </label>
                                </div>
                            </div>

                            {/* Transmission */}
                            <div className="mb-6">
                                <h4 className="font-medium mb-3">Transmission</h4>
                                <div className="space-y-2">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="transmission"
                                            value=""
                                            checked={filters.transmission === ''}
                                            onChange={(e) => handleFilterChange('transmission', e.target.value)}
                                            className="mr-2"
                                        />
                                        <span className="text-sm">All</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="transmission"
                                            value="automatic"
                                            checked={filters.transmission === 'automatic'}
                                            onChange={(e) => handleFilterChange('transmission', e.target.value)}
                                            className="mr-2"
                                        />
                                        <span className="text-sm">Automatic <span className="text-gray-500">26</span></span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="transmission"
                                            value="manual"
                                            checked={filters.transmission === 'manual'}
                                            onChange={(e) => handleFilterChange('transmission', e.target.value)}
                                            className="mr-2"
                                        />
                                        <span className="text-sm">Manual <span className="text-gray-500">12</span></span>
                                    </label>
                                </div>
                            </div>

                            {/* Supplier */}
                            <div className="mb-6">
                                <h4 className="font-medium mb-3">Supplier</h4>
                                <div className="space-y-2">
                                    {['Europcar', 'Budget', 'Avis', 'Hertz', 'Sixt', 'National'].map((supplier) => (
                                        <label key={supplier} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={filters.supplier === supplier.toLowerCase()}
                                                onChange={(e) => handleFilterChange('supplier', e.target.checked ? supplier.toLowerCase() : '')}
                                                className="mr-2"
                                            />
                                            <span className="text-sm">{supplier} <span className="text-gray-500">26</span></span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Mileage */}
                            <div className="mb-6">
                                <h4 className="font-medium mb-3">Mileage</h4>
                                <div className="space-y-2">
                                    <label className="flex items-center">
                                        <input type="checkbox" className="mr-2" defaultChecked />
                                        <span className="text-sm">Unlimited <span className="text-gray-500">26</span></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="lg:w-3/4">
                        {/* Sort Options */}
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold">{filteredVehicles.length} cars available</h2>
                            <div className="flex items-center gap-4">
                                <span className="text-sm">Sort by:</span>
                                <select
                                    className="p-2 border border-gray-300 rounded-lg"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="recommended">Recommended</option>
                                    <option value="price-low">Price (lowest first)</option>
                                    <option value="price-high">Price (highest first)</option>
                                    <option value="rating">Rating</option>
                                </select>
                            </div>
                        </div>

                        {/* Vehicle Cards */}
                        <div className="space-y-6">
                            {filteredVehicles.map((vehicle) => (
                                <div key={vehicle.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                    <div className="flex flex-col md:flex-row">
                                        {/* Vehicle Image */}
                                        <div className="md:w-1/3">
                                            <img
                                                src={vehicle.image}
                                                alt={vehicle.name}
                                                className="w-full h-48 md:h-full object-cover"
                                            />
                                        </div>
                                        
                                        {/* Vehicle Details */}
                                        <div className="flex-1 p-6">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="text-xl font-semibold text-blue-700">
                                                        {vehicle.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-600">{vehicle.category}</p>
                                                    
                                                    {/* Vehicle Features Icons */}
                                                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
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
                                                </div>
                                                
                                                {/* Rating */}
                                                <div className="text-right">
                                                    <div className="flex items-center gap-2">
                                                        <div className="text-right">
                                                            <div className="text-sm font-medium">{vehicle.reviewScore}</div>
                                                            <div className="text-xs text-gray-500">{vehicle.reviews} reviews</div>
                                                        </div>
                                                        <div className="bg-green-600 text-white px-2 py-1 rounded font-bold">
                                                            {vehicle.rating}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            {/* Pickup Location */}
                                            <div className="mb-4">
                                                <p className="text-sm text-gray-600">
                                                    <span className="font-medium">{vehicle.pickupInfo}</span>
                                                    <br />
                                                    {vehicle.distance}
                                                </p>
                                            </div>
                                            
                                            {/* Features */}
                                            <div className="space-y-1">
                                                {vehicle.features.map((feature, index) => (
                                                    <div key={index} className="flex items-center text-sm text-green-700">
                                                        <span className="mr-2">✓</span>
                                                        <span>{feature}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Price and Book Section */}
                                        <div className="md:w-1/4 p-6 bg-gray-50 flex flex-col justify-between">
                                            <div className="text-right">
                                                <div className="mb-2">
                                                    <span className="text-sm text-gray-500">Price for {vehicle.period}:</span>
                                                </div>
                                                <div className="text-2xl font-bold text-gray-900">
                                                    LKR {vehicle.price.toLocaleString()}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    Free cancellation
                                                </div>
                                            </div>
                                            
                                            <div className="space-y-2 mt-4">
                                                <button
                                                    onClick={() => handleBookVehicle(vehicle.id)}
                                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
                                                >
                                                    View deal
                                                </button>
                                                <div className="flex gap-2">
                                                    <button className="flex-1 text-blue-600 text-sm border border-blue-600 py-2 px-2 rounded hover:bg-blue-50">
                                                        Important info
                                                    </button>
                                                    <button className="flex-1 text-blue-600 text-sm border border-blue-600 py-2 px-2 rounded hover:bg-blue-50">
                                                        Email quote
                                                    </button>
                                                </div>
                                            </div>
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

export default VehicleBooking;
