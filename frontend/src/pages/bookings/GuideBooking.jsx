import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GuideBooking = () => {
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        location: '',
        date: '',
        duration: '',
        language: '',
        priceRange: [0, 15000],
        rating: '',
        specialization: ''
    });
    const [sortBy, setSortBy] = useState('recommended');

    // Dummy guide data
    const guides = [
        {
            id: 1,
            name: "Kasun Fernando",
            location: "Colombo, Western Province",
            rating: 4.8,
            reviews: 127,
            price: 8500,
            specializations: ["Cultural Tours", "City Tours", "Photography"],
            languages: ["English", "Sinhala", "Tamil"],
            experience: "5 years",
            image: "/src/assets/users/user1.jpg",
            verified: true,
            availability: "Available today",
            description: "Expert cultural guide specializing in historical sites and local traditions."
        },
        {
            id: 2,
            name: "Priya Jayasinghe",
            location: "Kandy, Central Province",
            rating: 4.9,
            reviews: 89,
            price: 9200,
            specializations: ["Temple Tours", "Nature Walks", "Tea Estate Tours"],
            languages: ["English", "Sinhala"],
            experience: "7 years",
            image: "/src/assets/users/user2.avif",
            verified: true,
            availability: "Available from tomorrow",
            description: "Passionate about sharing the beauty of Kandy's cultural heritage and natural landscapes."
        },
        {
            id: 3,
            name: "Rohan Silva",
            location: "Galle, Southern Province",
            rating: 4.7,
            reviews: 156,
            price: 7800,
            specializations: ["Beach Tours", "Wildlife Safari", "Adventure Tours"],
            languages: ["English", "Sinhala", "German"],
            experience: "6 years",
            image: "/src/assets/users/user3.avif",
            verified: true,
            availability: "Available today",
            description: "Adventure specialist with extensive knowledge of southern coastal attractions."
        },
        {
            id: 4,
            name: "Manjula Perera",
            location: "Nuwara Eliya, Central Province",
            rating: 4.6,
            reviews: 92,
            price: 8800,
            specializations: ["Hill Country Tours", "Tea Tours", "Hiking"],
            languages: ["English", "Sinhala"],
            experience: "4 years",
            image: "/src/assets/users/user4.jpg",
            verified: true,
            availability: "Available from next week",
            description: "Hill country expert specializing in tea plantations and scenic mountain tours."
        },
        {
            id: 5,
            name: "Saman Wijeratne",
            location: "Anuradhapura, North Central Province",
            rating: 4.9,
            reviews: 134,
            price: 9500,
            specializations: ["Ancient Sites", "Archaeology", "History Tours"],
            languages: ["English", "Sinhala", "Japanese"],
            experience: "8 years",
            image: "/src/assets/users/user5.jpg",
            verified: true,
            availability: "Available today",
            description: "Historical expert with deep knowledge of ancient Sri Lankan civilization."
        }
    ];

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleBookGuide = (guideId) => {
        navigate(`/bookings/guide/${guideId}/confirm`);
    };

    const filteredGuides = guides.filter(guide => {
        if (filters.location && !guide.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
        if (filters.language && !guide.languages.some(lang => lang.toLowerCase().includes(filters.language.toLowerCase()))) return false;
        if (filters.specialization && !guide.specializations.some(spec => spec.toLowerCase().includes(filters.specialization.toLowerCase()))) return false;
        if (filters.rating && guide.rating < parseFloat(filters.rating)) return false;
        return true;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-brand-primary text-white py-6">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold mb-4">Find Your Perfect Guide</h1>
                    
                    {/* Search Bar */}
                    <div className="bg-white rounded-lg p-4 shadow-lg">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                <input
                                    type="text"
                                    placeholder="Where do you want to explore?"
                                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-900"
                                    value={filters.location}
                                    onChange={(e) => handleFilterChange('location', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                <input
                                    type="date"
                                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-900"
                                    value={filters.date}
                                    onChange={(e) => handleFilterChange('date', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                                <select
                                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-900"
                                    value={filters.duration}
                                    onChange={(e) => handleFilterChange('duration', e.target.value)}
                                >
                                    <option value="">Select duration</option>
                                    <option value="half-day">Half Day (4 hours)</option>
                                    <option value="full-day">Full Day (8 hours)</option>
                                    <option value="multi-day">Multi Day</option>
                                </select>
                            </div>
                            <div className="flex items-end">
                                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-lg font-semibold transition-colors">
                                    Search Guides
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
                            <h3 className="text-lg font-semibold mb-4">Filter by</h3>
                            
                            {/* Language Filter */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                                <select
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    value={filters.language}
                                    onChange={(e) => handleFilterChange('language', e.target.value)}
                                >
                                    <option value="">Any language</option>
                                    <option value="english">English</option>
                                    <option value="sinhala">Sinhala</option>
                                    <option value="tamil">Tamil</option>
                                    <option value="german">German</option>
                                    <option value="japanese">Japanese</option>
                                </select>
                            </div>

                            {/* Rating Filter */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Rating</label>
                                <select
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    value={filters.rating}
                                    onChange={(e) => handleFilterChange('rating', e.target.value)}
                                >
                                    <option value="">Any rating</option>
                                    <option value="4.5">4.5+ stars</option>
                                    <option value="4.0">4.0+ stars</option>
                                    <option value="3.5">3.5+ stars</option>
                                </select>
                            </div>

                            {/* Specialization Filter */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
                                <select
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    value={filters.specialization}
                                    onChange={(e) => handleFilterChange('specialization', e.target.value)}
                                >
                                    <option value="">Any specialization</option>
                                    <option value="cultural">Cultural Tours</option>
                                    <option value="nature">Nature Tours</option>
                                    <option value="adventure">Adventure Tours</option>
                                    <option value="history">Historical Tours</option>
                                    <option value="beach">Beach Tours</option>
                                </select>
                            </div>

                            {/* Price Range */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range (LKR per day)</label>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>LKR 5,000</span>
                                        <span>LKR 15,000</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="5000"
                                        max="15000"
                                        step="500"
                                        className="w-full"
                                        value={filters.priceRange[1]}
                                        onChange={(e) => handleFilterChange('priceRange', [0, parseInt(e.target.value)])}
                                    />
                                    <div className="text-center text-sm text-gray-600">
                                        Up to LKR {filters.priceRange[1].toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="lg:w-3/4">
                        {/* Sort Options */}
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold">{filteredGuides.length} guides available</h2>
                            <select
                                className="p-2 border border-gray-300 rounded-lg"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="recommended">Recommended</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="rating">Highest Rated</option>
                                <option value="reviews">Most Reviews</option>
                            </select>
                        </div>

                        {/* Guide Cards */}
                        <div className="space-y-6">
                            {filteredGuides.map((guide) => (
                                <div key={guide.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                    <div className="flex flex-col md:flex-row">
                                        {/* Guide Image */}
                                        <div className="md:w-1/4">
                                            <img
                                                src={guide.image}
                                                alt={guide.name}
                                                className="w-full h-48 md:h-full object-cover"
                                            />
                                        </div>
                                        
                                        {/* Guide Details */}
                                        <div className="flex-1 p-6">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h3 className="text-xl font-semibold flex items-center gap-2">
                                                        {guide.name}
                                                        {guide.verified && (
                                                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                                                Verified
                                                            </span>
                                                        )}
                                                    </h3>
                                                    <p className="text-gray-600">{guide.location}</p>
                                                    <p className="text-sm text-gray-500">Experience: {guide.experience}</p>
                                                </div>
                                                <div className="text-right">
                                                    <div className="flex items-center gap-1 mb-1">
                                                        <span className="text-yellow-400">★</span>
                                                        <span className="font-semibold">{guide.rating}</span>
                                                        <span className="text-gray-500">({guide.reviews} reviews)</span>
                                                    </div>
                                                    <p className="text-sm text-green-600">{guide.availability}</p>
                                                </div>
                                            </div>
                                            
                                            <p className="text-gray-700 mb-3">{guide.description}</p>
                                            
                                            {/* Specializations */}
                                            <div className="mb-3">
                                                <span className="text-sm font-medium text-gray-700">Specializations: </span>
                                                {guide.specializations.map((spec, index) => (
                                                    <span key={index} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2 mb-1">
                                                        {spec}
                                                    </span>
                                                ))}
                                            </div>
                                            
                                            {/* Languages */}
                                            <div className="mb-4">
                                                <span className="text-sm font-medium text-gray-700">Languages: </span>
                                                <span className="text-sm text-gray-600">{guide.languages.join(', ')}</span>
                                            </div>
                                            
                                            {/* Price and Book Button */}
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <span className="text-2xl font-bold text-brand-primary">LKR {guide.price.toLocaleString()}</span>
                                                    <span className="text-gray-600"> per day</span>
                                                </div>
                                                <button
                                                    onClick={() => handleBookGuide(guide.id)}
                                                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                                                >
                                                    Book Now
                                                </button>
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

export default GuideBooking;
