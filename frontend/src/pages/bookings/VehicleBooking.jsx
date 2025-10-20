import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllVehicles } from '../../api/tourService';
import toast from 'react-hot-toast';

const VehicleBooking = () => {
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        pickupLocation: '',
        pickupDate: '',
        pickupTime: '10:00',
        dropoffDate: '',
        dropoffTime: '10:00',
        dropoffLocation: '',
        driverAge: '30-65',
        vehicleType: '',
        transmission: '',
        supplier: '',
        fuelType: ''
    });
    const [sortBy, setSortBy] = useState('recommended');
    const [differentDropoff, setDifferentDropoff] = useState(false);
    const [showLocationDropdown, setShowLocationDropdown] = useState(false);
    const [showDropoffDropdown, setShowDropoffDropdown] = useState(false);
    const [locationSearchResults, setLocationSearchResults] = useState([]);
    const [dropoffSearchResults, setDropoffSearchResults] = useState([]);
    const [selectedLocationIndex, setSelectedLocationIndex] = useState(-1);
    const [selectedDropoffIndex, setSelectedDropoffIndex] = useState(-1);
    const [showImportantInfo, setShowImportantInfo] = useState(false);
    const [showEmailQuote, setShowEmailQuote] = useState(false);
    const [selectedVehicleForInfo, setSelectedVehicleForInfo] = useState(null);
    const locationInputRef = useRef(null);
    const dropoffInputRef = useRef(null);
    const dropdownRef = useRef(null);
    const dropoffDropdownRef = useRef(null);
    
    // State for vehicles from backend
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
            if (dropoffDropdownRef.current && !dropoffDropdownRef.current.contains(event.target)) {
                setShowDropoffDropdown(false);
            }
        }
        if (showLocationDropdown || showDropoffDropdown) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showLocationDropdown, showDropoffDropdown]);

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

    // Dropoff location search functions
    const handleDropoffLocationSearch = (searchTerm) => {
        setFilters(prev => ({ ...prev, dropoffLocation: searchTerm }));
        
        if (!searchTerm.trim()) {
            setDropoffSearchResults(locationData.slice(0, 5));
            setShowDropoffDropdown(true);
            return;
        }

        const filtered = locationData.filter(location =>
            location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
            location.type.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        setDropoffSearchResults(filtered);
        setSelectedDropoffIndex(-1);
        
        if (filtered.length === 0) {
            setShowDropoffDropdown(false);
        } else if (dropoffSearchResults.length > 0) {
            setShowDropoffDropdown(true);
        }
    };

    const handleDropoffLocationFocus = () => {
        if (filters.dropoffLocation.trim() === '') {
            setDropoffSearchResults(locationData.slice(0, 5));
        } else if (dropoffSearchResults.length > 0) {
            setShowDropoffDropdown(true);
        }
    };

    const handleDropoffLocationSelect = (location) => {
        setFilters(prev => ({ ...prev, dropoffLocation: location.name }));
        setShowDropoffDropdown(false);
        setDropoffSearchResults([]);
        setSelectedDropoffIndex(-1);
    };

    const handleDropoffKeyDown = (e) => {
        if (!showDropoffDropdown || dropoffSearchResults.length === 0) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedDropoffIndex(prev => 
                    prev < dropoffSearchResults.length - 1 ? prev + 1 : prev
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedDropoffIndex(prev => prev > 0 ? prev - 1 : -1);
                break;
            case 'Enter':
                e.preventDefault();
                if (selectedDropoffIndex >= 0) {
                    handleDropoffLocationSelect(dropoffSearchResults[selectedDropoffIndex]);
                }
                break;
            case 'Escape':
                setShowDropoffDropdown(false);
                setSelectedDropoffIndex(-1);
                break;
            default:
                break;
        }
    };

    // Fetch vehicles from backend API
    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                setLoading(true);
                setError(null);
                console.log('🚗 Fetching vehicles from API...');
                const backendVehicles = await getAllVehicles();
                console.log('✅ Vehicles fetched successfully:', backendVehicles);
                
                // Map backend vehicle data to match the component's expected format
                const mappedVehicles = backendVehicles.map(vehicle => {
                    const imageUrls = Array.isArray(vehicle.images) 
                        ? vehicle.images.map(img => typeof img === 'string' ? img : img.imageUrl || img.url || '')
                        : [];
                    
                    const amenityNames = Array.isArray(vehicle.amenities)
                        ? vehicle.amenities.map(amenity => typeof amenity === 'string' ? amenity : amenity.amenityName || amenity.name || '')
                        : [];
                    
                    // Map vehicle type to category
                    const categoryMap = {
                        'Sedan': 'Medium car',
                        'Van': 'Large car',
                        'SUV': 'SUV',
                        'Jeep': 'SUV',
                        'Luxury': 'Luxury'
                    };
                    
                    return {
                        id: vehicle.id,
                        name: vehicle.vehicleModel || 'Unknown Vehicle',
                        category: categoryMap[vehicle.vehicleType] || 'Medium car',
                        seats: vehicle.capacity || 4,
                        largeBags: Math.floor((vehicle.capacity || 4) / 2),
                        transmission: 'Automatic', // Default, can be added to model
                        mileage: 'Unlimited mileage',
                        supplier: vehicle.agency?.agencyName || 'Unknown Agency',
                        rating: 8.0,
                        reviewScore: "Good",
                        reviews: 0,
                        price: vehicle.basePrice || 0,
                        pricePerDay: vehicle.basePrice || 0, // Add pricePerDay for booking form
                        period: '3 days',
                        location: vehicle.agency?.city || 'Sri Lanka',
                        distance: `${vehicle.agency?.district || 'Location'} area`,
                        features: amenityNames.slice(0, 5),
                        image: imageUrls[0] || '/placeholder-vehicle.jpg',
                        pickupInfo: vehicle.agency?.city || 'Location',
                        fuel: 'Petrol', // Default, can be added to model
                        doors: 4,
                        // Additional backend fields
                        vehicleType: vehicle.vehicleType,
                        vehicleNo: vehicle.vehicleNo,
                        registrationNo: vehicle.registrationNo,
                        basePrice: vehicle.basePrice,
                        pricePerKilometer: vehicle.pricePerKilometer,
                        insuranceNumber: vehicle.insuranceNumber,
                        insuranceExpiryDate: vehicle.insuranceExpiryDate,
                        isVerified: vehicle.isVerified,
                        availability: vehicle.availability,
                        agency: vehicle.agency,
                        allImages: imageUrls,
                        allAmenities: amenityNames
                    };
                });
                
                console.log('📦 Mapped vehicles:', mappedVehicles);
                setVehicles(mappedVehicles);
            } catch (error) {
                console.error('❌ Error fetching vehicles:', error);
                setError('Failed to load vehicles. Please try again later.');
                setVehicles([]);
            } finally {
                setLoading(false);
            }
        };

        fetchVehicles();
    }, []);

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
        // Find the vehicle from the real data
        const selectedVehicle = vehicles.find(v => v.id === vehicleId);
        
        if (selectedVehicle) {
            // Store the real vehicle data in localStorage
            localStorage.setItem('selectedVehicle', JSON.stringify(selectedVehicle));
            
            // Navigate to the booking form with the vehicle data
            navigate('/book-vehicle', { state: { vehicle: selectedVehicle } });
        } else {
            console.error('Vehicle not found:', vehicleId);
            toast.error('Vehicle not found. Please try again.');
        }
    };

    const handleImportantInfo = (vehicle) => {
        setSelectedVehicleForInfo(vehicle);
        setShowImportantInfo(true);
    };

    const handleEmailQuote = (vehicle) => {
        setSelectedVehicleForInfo(vehicle);
        setShowEmailQuote(true);
    };

    const closeModals = () => {
        setShowImportantInfo(false);
        setShowEmailQuote(false);
        setSelectedVehicleForInfo(null);
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
            <div className="bg-brand-primary text-white py-8">
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
                                <input 
                                    type="checkbox" 
                                    className="mr-2" 
                                    checked={differentDropoff}
                                    onChange={(e) => setDifferentDropoff(e.target.checked)}
                                />
                                <span className="text-gray-700">Drop car off at different location</span>
                            </label>
                            <label className="flex items-center">
                                <input type="checkbox" className="mr-2" defaultChecked />
                                <span className="text-gray-700">Driver aged 30 - 65?</span>
                            </label>
                        </div>

                        {/* Conditional Drop-off Location Field */}
                        {differentDropoff && (
                            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                <h4 className="text-sm font-medium text-gray-700 mb-3">Drop-off location</h4>
                                <div className="relative" ref={dropoffDropdownRef}>
                                    <input
                                        ref={dropoffInputRef}
                                        type="text"
                                        placeholder="City, airport, station, region"
                                        className="w-full p-3 border border-gray-300 rounded-lg text-gray-900"
                                        value={filters.dropoffLocation}
                                        onChange={(e) => handleDropoffLocationSearch(e.target.value)}
                                        onFocus={handleDropoffLocationFocus}
                                        onKeyDown={handleDropoffKeyDown}
                                    />
                                    
                                    {/* Dropoff Location Dropdown */}
                                    {showDropoffDropdown && dropoffSearchResults.length > 0 && (
                                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                            {filters.dropoffLocation.trim() === '' && (
                                                <div className="px-4 py-2 text-sm font-medium text-gray-500 bg-gray-50 border-b">
                                                    Popular locations
                                                </div>
                                            )}
                                            {dropoffSearchResults.map((location, index) => (
                                                <button
                                                    key={location.id}
                                                    className={`w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-0 transition-colors ${
                                                        index === selectedDropoffIndex ? 'bg-blue-50 border-blue-200' : ''
                                                    }`}
                                                    onClick={() => handleDropoffLocationSelect(location)}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-lg">{getLocationIcon(location.type)}</span>
                                                        <div>
                                                            <div className="font-medium text-gray-900">{location.name}</div>
                                                            <div className="text-sm text-gray-500">
                                                                {location.type} • {location.distance}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
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
                            {loading ? (
                                <div className="flex justify-center items-center py-12">
                                    <div className="text-center">
                                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                                        <p className="text-gray-600">Loading vehicles...</p>
                                    </div>
                                </div>
                            ) : error ? (
                                <div className="text-center py-12">
                                    <div className="text-red-500 mb-4">{error}</div>
                                    <button 
                                        onClick={() => window.location.reload()} 
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    >
                                        Retry
                                    </button>
                                </div>
                            ) : filteredVehicles.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-gray-600 mb-2">No vehicles found matching your criteria</p>
                                    <p className="text-gray-500 text-sm">Try adjusting your filters or search parameters</p>
                                </div>
                            ) : (
                                filteredVehicles.map((vehicle) => (
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
                                                    <button 
                                                        onClick={() => handleImportantInfo(vehicle)}
                                                        className="flex-1 text-blue-600 text-sm border border-blue-600 py-2 px-2 rounded hover:bg-blue-50 transition-colors"
                                                    >
                                                        Important info
                                                    </button>
                                                    <button 
                                                        onClick={() => handleEmailQuote(vehicle)}
                                                        className="flex-1 text-blue-600 text-sm border border-blue-600 py-2 px-2 rounded hover:bg-blue-50 transition-colors"
                                                    >
                                                        Email quote
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Important Info Modal */}
            {showImportantInfo && selectedVehicleForInfo && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold text-gray-900">Important Information</h2>
                                <button 
                                    onClick={closeModals}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <h3 className="font-semibold text-blue-900 mb-2">{selectedVehicleForInfo.name}</h3>
                                    <p className="text-blue-800">{selectedVehicleForInfo.category} • {selectedVehicleForInfo.supplier}</p>
                                </div>
                                
                                <div className="space-y-3">
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Rental Conditions</h4>
                                        <ul className="space-y-1 text-gray-700">
                                            <li>• Driver must be between 21-75 years old</li>
                                            <li>• Valid driving license required (minimum 1 year)</li>
                                            <li>• Credit card required for security deposit</li>
                                            <li>• Fuel policy: Full to Full</li>
                                        </ul>
                                    </div>
                                    
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-2">What&apos;s Included</h4>
                                        <ul className="space-y-1 text-gray-700">
                                            {selectedVehicleForInfo.features.map((feature, index) => (
                                                <li key={index}>• {feature}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Pick-up Information</h4>
                                        <p className="text-gray-700">{selectedVehicleForInfo.pickupInfo}</p>
                                        <p className="text-gray-600 text-sm">{selectedVehicleForInfo.distance}</p>
                                    </div>
                                    
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Cancellation Policy</h4>
                                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                                            <p className="text-green-800">✓ Free cancellation up to 48 hours before pick-up</p>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Additional Fees</h4>
                                        <ul className="space-y-1 text-gray-700 text-sm">
                                            <li>• Additional driver: LKR 1,500 per day</li>
                                            <li>• Child seat: LKR 800 per day</li>
                                            <li>• GPS navigation: LKR 600 per day</li>
                                            <li>• Cross-border travel: Not allowed</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-6 flex justify-end">
                                <button 
                                    onClick={closeModals}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Email Quote Modal */}
            {showEmailQuote && selectedVehicleForInfo && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-md w-full">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold text-gray-900">Email Quote</h2>
                                <button 
                                    onClick={closeModals}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h3 className="font-semibold text-gray-900 mb-2">{selectedVehicleForInfo.name}</h3>
                                    <p className="text-gray-600">{selectedVehicleForInfo.category} • {selectedVehicleForInfo.supplier}</p>
                                    <p className="text-xl font-bold text-blue-600 mt-2">
                                        LKR {selectedVehicleForInfo.price.toLocaleString()}
                                    </p>
                                    <p className="text-sm text-gray-600">for {selectedVehicleForInfo.period}</p>
                                </div>
                                
                                <form className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Email address
                                        </label>
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Additional message (optional)
                                        </label>
                                        <textarea
                                            rows={3}
                                            placeholder="Any special requests or questions?"
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                        />
                                    </div>
                                    
                                    <div className="flex gap-3">
                                        <button
                                            type="button"
                                            onClick={closeModals}
                                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                alert('Quote request sent successfully!');
                                                closeModals();
                                            }}
                                        >
                                            Send Quote
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VehicleBooking;
