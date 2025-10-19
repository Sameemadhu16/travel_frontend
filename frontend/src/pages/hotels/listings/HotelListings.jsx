import { useState, useEffect } from 'react';
import { FaBed, FaStar, FaHotel, FaMapMarkerAlt, FaUsers, FaEye, FaEdit, FaTrash, FaPlus, FaFilter, FaSearch, FaArrowUp, FaArrowDown, FaBell, FaCheckCircle, FaExclamationTriangle, FaClock, FaChartBar, FaTimes, FaPhone, FaEnvelope, FaSave } from 'react-icons/fa';
import HotelLayout from '../../../components/hotel/HotelLayout';
import AdminCard from '../../../components/admin/AdminCard';
import PrimaryButton from '../../../components/PrimaryButton';
import SecondaryButton from '../../../components/SecondaryButton';

// Ceylon Heritage Hotels Chain - Realistic Sri Lankan hotel properties
const initialChainProperties = [
  {
    id: 1,
    name: "Ceylon Heritage Grand Colombo",
    location: "Galle Face, Colombo 03",
    region: "Western Province",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop",
    rating: 4.8,
    reviewCount: 2847,
    startingPrice: 48500,
    status: "Operational",
    rooms: 485,
    occupied: 421,
    occupancyRate: 86.8,
    manager: "Ms. Dilani Wickramasinghe",
    phone: "+94 11 244 1234",
    email: "colombo@ceylonheritage.lk",
    dailyRevenue: 6850000,
    monthlyRevenue: 187450000,
    category: "Luxury City Hotel",
    amenities: ["Spa", "Pool", "Business Center", "Fine Dining", "Conference Halls"],
    lastUpdated: "2 hours ago",
    alerts: 0
  },
  {
    id: 2,
    name: "Ceylon Heritage Kandy",
    location: "Kandy Lake, Kandy",
    region: "Central Province", 
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    rating: 4.7,
    reviewCount: 1654,
    startingPrice: 35800,
    status: "Operational",
    rooms: 298,
    occupied: 267,
    occupancyRate: 89.6,
    manager: "Mr. Chandana Perera",
    phone: "+94 81 222 4567",
    email: "kandy@ceylonheritage.lk",
    dailyRevenue: 4120000,
    monthlyRevenue: 119480000,
    category: "Heritage Cultural Hotel",
    amenities: ["Cultural Shows", "Temple Tours", "Spa", "Lake View", "Traditional Cuisine"],
    lastUpdated: "1 hour ago",
    alerts: 1
  },
  {
    id: 3,
    name: "Ceylon Heritage Galle Fort",
    location: "Dutch Fort, Galle",
    region: "Southern Province",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop",
    rating: 4.6,
    reviewCount: 1289,
    startingPrice: 42000,
    status: "Operational", 
    rooms: 245,
    occupied: 215,
    occupancyRate: 87.8,
    manager: "Mrs. Priyanka Fernando",
    phone: "+94 91 223 7890",
    email: "galle@ceylonheritage.lk",
    dailyRevenue: 2980000,
    monthlyRevenue: 86420000,
    category: "Historic Fort Hotel",
    amenities: ["Historic Tours", "Beach Access", "Colonial Architecture", "Art Gallery", "Sunset Dining"],
    lastUpdated: "3 hours ago",
    alerts: 0
  },
  {
    id: 4,
    name: "Ceylon Heritage Nuwara Eliya",
    location: "Gregory Lake, Nuwara Eliya",
    region: "Central Province",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
    rating: 4.7,
    reviewCount: 945,
    startingPrice: 39500,
    status: "Seasonal Peak",
    rooms: 219,
    occupied: 183,
    occupancyRate: 83.6,
    manager: "Mr. Ruwan Jayawardena", 
    phone: "+94 52 222 3456",
    email: "nuwara@ceylonheritage.lk",
    dailyRevenue: 1900000,
    monthlyRevenue: 55100000,
    category: "Hill Country Retreat",
    amenities: ["Tea Plantations", "Golf Course", "Fireplace Rooms", "Mountain Views", "Tea Factory Tours"],
    lastUpdated: "4 hours ago",
    alerts: 2
  },
  {
    id: 5,
    name: "Ceylon Heritage Sigiriya",
    location: "Ancient City, Sigiriya",
    region: "North Central Province",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop", 
    rating: 4.5,
    reviewCount: 876,
    startingPrice: 52000,
    status: "Under Renovation",
    rooms: 156,
    occupied: 0,
    occupancyRate: 0,
    manager: "Dr. Sampath Kumara",
    phone: "+94 66 228 9012",
    email: "sigiriya@ceylonheritage.lk",
    dailyRevenue: 0,
    monthlyRevenue: 0,
    category: "Archaeological Heritage Hotel",
    amenities: ["Rock Fortress Views", "Archaeological Tours", "Wildlife Safari", "Ayurveda Center"],
    lastUpdated: "1 day ago",
    alerts: 5
  },
  {
    id: 6,
    name: "Ceylon Heritage Bentota Beach",
    location: "Bentota Beach, Bentota",  
    region: "Southern Province",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
    rating: 4.8,
    reviewCount: 1547,
    startingPrice: 45500,
    status: "Operational",
    rooms: 189,
    occupied: 156,
    occupancyRate: 82.5,
    manager: "Ms. Sanduni Rajapaksa",
    phone: "+94 34 227 5678", 
    email: "bentota@ceylonheritage.lk",
    dailyRevenue: 3200000,
    monthlyRevenue: 92800000,
    category: "Beach Resort",
    amenities: ["Private Beach", "Water Sports", "Ayurveda Spa", "Turtle Hatchery", "River Safari"],
    lastUpdated: "30 minutes ago",
    alerts: 0
  }
];

// Enhanced Statistics Card Component (matching admin style)
function EnhancedStatsCard({ icon, title, value, change, changeType, color, subtitle, onClick }) {
  const isPositive = changeType === 'positive';
  
  return (
    <AdminCard className="hover:shadow-lg transition-shadow cursor-pointer" onClick={onClick}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <p className="text-gray-600 text-sm font-medium">{title}</p>
            {changeType && (
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${isPositive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                {isPositive ? <FaArrowUp className="inline mr-1" /> : <FaArrowDown className="inline mr-1" />}
                {change}
              </span>
            )}
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-xl ${color}`}>
          {icon}
        </div>
      </div>
    </AdminCard>
  );
}

// Property Status Badge Component
function StatusBadge({ status }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Operational': return 'bg-green-100 text-green-700 border-green-200';
      case 'Seasonal Peak': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Under Renovation': return 'bg-red-100 text-red-700 border-red-200';
      case 'Maintenance': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  return (
    <span className={`text-xs px-2 py-1 rounded-full font-medium border ${getStatusColor(status)}`}>
      {status}
    </span>
  );
}

// Add Hotel Modal Component
function AddHotelModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    region: '',
    image: '',
    rooms: '',
    startingPrice: '',
    category: '',
    manager: '',
    phone: '',
    email: '',
    amenities: '',
    status: 'Under Construction'
  });

  const [errors, setErrors] = useState({});

  const sriLankanProvinces = [
    'Western Province',
    'Central Province',
    'Southern Province',
    'Northern Province',
    'Eastern Province',
    'North Western Province',
    'North Central Province',
    'Uva Province',
    'Sabaragamuwa Province'
  ];

  const hotelCategories = [
    'Luxury City Hotel',
    'Heritage Cultural Hotel',
    'Beach Resort',
    'Hill Country Retreat',
    'Archaeological Heritage Hotel',
    'Wildlife Safari Lodge',
    'Ayurveda Wellness Resort',
    'Business Hotel',
    'Eco Lodge'
  ];

  const statusOptions = [
    'Under Construction',
    'Pre-Opening',
    'Operational',
    'Seasonal Peak',
    'Under Renovation',
    'Maintenance'
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Hotel name is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.region) newErrors.region = 'Province is required';
    if (!formData.rooms || formData.rooms < 1) newErrors.rooms = 'Valid room count is required';
    if (!formData.startingPrice || formData.startingPrice < 1000) newErrors.startingPrice = 'Valid starting price is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.manager.trim()) newErrors.manager = 'Manager name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = 'Valid email is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newHotel = {
        id: Date.now(),
        ...formData,
        rooms: parseInt(formData.rooms),
        startingPrice: parseInt(formData.startingPrice),
        rating: 0,
        reviewCount: 0,
        occupied: 0,
        occupancyRate: 0,
        dailyRevenue: 0,
        monthlyRevenue: 0,
        amenities: formData.amenities.split(',').map(a => a.trim()).filter(a => a),
        lastUpdated: 'Just added',
        alerts: 0,
        image: formData.image || `https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop`
      };
      onSubmit(newHotel);
      setFormData({
        name: '',
        location: '',
        region: '',
        image: '',
        rooms: '',
        startingPrice: '',
        category: '',
        manager: '',
        phone: '',
        email: '',
        amenities: '',
        status: 'Under Construction'
      });
      setErrors({});
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Add New Ceylon Heritage Property</h2>
            <p className="text-sm text-gray-600">Expand the Ceylon Heritage Hotels chain across Sri Lanka</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FaTimes className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hotel Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Ceylon Heritage [Location Name]"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location *
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                placeholder="e.g., Marine Drive, Colombo 03"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                  errors.location ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Province *
              </label>
              <select
                value={formData.region}
                onChange={(e) => handleChange('region', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                  errors.region ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select Province</option>
                {sriLankanProvinces.map(province => (
                  <option key={province} value={province}>{province}</option>
                ))}
              </select>
              {errors.region && <p className="text-red-500 text-sm mt-1">{errors.region}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hotel Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                  errors.category ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select Category</option>
                {hotelCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Rooms *
              </label>
              <input
                type="number"
                value={formData.rooms}
                onChange={(e) => handleChange('rooms', e.target.value)}
                placeholder="e.g., 150"
                min="1"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                  errors.rooms ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.rooms && <p className="text-red-500 text-sm mt-1">{errors.rooms}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Starting Price (LKR) *
              </label>
              <input
                type="number"
                value={formData.startingPrice}
                onChange={(e) => handleChange('startingPrice', e.target.value)}
                placeholder="e.g., 35000"
                min="1000"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                  errors.startingPrice ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.startingPrice && <p className="text-red-500 text-sm mt-1">{errors.startingPrice}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Image URL
              </label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => handleChange('image', e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </div>

          {/* Management Information */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Management Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaUsers className="inline mr-1" />
                  General Manager *
                </label>
                <input
                  type="text"
                  value={formData.manager}
                  onChange={(e) => handleChange('manager', e.target.value)}
                  placeholder="Mr./Ms. [Name]"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                    errors.manager ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.manager && <p className="text-red-500 text-sm mt-1">{errors.manager}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaPhone className="inline mr-1" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="+94 XX XXX XXXX"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaEnvelope className="inline mr-1" />
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="location@ceylonheritage.lk"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Hotel Amenities</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amenities (comma-separated)
              </label>
              <textarea
                value={formData.amenities}
                onChange={(e) => handleChange('amenities', e.target.value)}
                placeholder="Spa, Pool, Restaurant, Business Center, Cultural Tours, etc."
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
              <p className="text-sm text-gray-500 mt-1">
                Enter amenities separated by commas. Examples: Spa, Pool, Cultural Tours, Beach Access
              </p>
            </div>
          </div>

          {/* Form Actions */}
          <div className="border-t pt-6 flex gap-4 justify-end">
            <SecondaryButton
              type="button"
              onClick={onClose}
              className="px-6 py-2"
              text="Cancel"
            />
            <PrimaryButton
              type="submit"
              className="px-6 py-2 bg-orange-500 hover:bg-orange-600"
              text="Add Property to Chain"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

// Property Details Modal Component
function PropertyDetailsModal({ isOpen, onClose, property }) {
  if (!isOpen || !property) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{property.name}</h2>
            <p className="text-sm text-gray-600">{property.location} • {property.region}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FaTimes className="text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {/* Property Image */}
          <div className="mb-6">
            <img 
              src={property.image} 
              alt={property.name}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>

          {/* Property Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Basic Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium">{property.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <StatusBadge status={property.status} />
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rating:</span>
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-500" />
                    <span className="font-medium">{property.rating}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Reviews:</span>
                  <span className="font-medium">{property.reviewCount.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Capacity & Occupancy</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Rooms:</span>
                  <span className="font-medium">{property.rooms}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Occupied:</span>
                  <span className="font-medium">{property.occupied}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Occupancy Rate:</span>
                  <span className="font-medium text-blue-600">{property.occupancyRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Available:</span>
                  <span className="font-medium text-green-600">{property.rooms - property.occupied}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Financial Performance</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Starting Price:</span>
                  <span className="font-medium">LKR {property.startingPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Daily Revenue:</span>
                  <span className="font-medium text-green-600">LKR {(property.dailyRevenue / 1000000).toFixed(1)}M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly Revenue:</span>
                  <span className="font-medium text-green-600">LKR {(property.monthlyRevenue / 1000000).toFixed(1)}M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rev per Room:</span>
                  <span className="font-medium">LKR {Math.round(property.dailyRevenue / property.rooms).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Management Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FaUsers className="text-blue-500" />
                Management Team
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">General Manager:</span>
                  <span className="font-medium">{property.manager}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone:</span>
                  <span className="font-medium">{property.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{property.email}</span>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Alerts & Updates</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Alerts:</span>
                  <span className={`font-medium ${property.alerts > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {property.alerts > 0 ? `${property.alerts} issues` : 'No issues'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Updated:</span>
                  <span className="font-medium">{property.lastUpdated}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Hotel Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {property.amenities.map((amenity, index) => (
                <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="border-t pt-6 flex gap-4 justify-end">
            <SecondaryButton
              onClick={onClose}
              className="px-6 py-2"
              text="Close"
            />
            <PrimaryButton
              className="px-6 py-2 bg-orange-500 hover:bg-orange-600"
              text="Edit Property"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Property Management Modal Component
function PropertyManagementModal({ isOpen, onClose, property, onUpdate }) {
  const [formData, setFormData] = useState({
    rooms: '',
    startingPrice: '',
    status: '',
    manager: '',
    phone: '',
    email: ''
  });

  useEffect(() => {
    if (property) {
      setFormData({
        rooms: property.rooms || '',
        startingPrice: property.startingPrice || '',
        status: property.status || '',
        manager: property.manager || '',
        phone: property.phone || '',
        email: property.email || ''
      });
    }
  }, [property]);

  const statusOptions = [
    'Operational',
    'Seasonal Peak', 
    'Under Renovation',
    'Under Construction',
    'Maintenance',
    'Pre-Opening'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProperty = {
      ...property,
      rooms: parseInt(formData.rooms),
      startingPrice: parseInt(formData.startingPrice),
      status: formData.status,
      manager: formData.manager,
      phone: formData.phone,
      email: formData.email,
      lastUpdated: 'Just updated'
    };
    onUpdate(updatedProperty);
    onClose();
  };

  if (!isOpen || !property) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Manage {property.name}</h2>
            <p className="text-sm text-gray-600">Update property information and settings</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FaTimes className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Management Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Rooms
              </label>
              <input
                type="number"
                value={formData.rooms}
                onChange={(e) => setFormData(prev => ({ ...prev, rooms: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Starting Price (LKR)
              </label>
              <input
                type="number"
                value={formData.startingPrice}
                onChange={(e) => setFormData(prev => ({ ...prev, startingPrice: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                min="1000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                General Manager
              </label>
              <input
                type="text"
                value={formData.manager}
                onChange={(e) => setFormData(prev => ({ ...prev, manager: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </div>

          {/* Current Statistics (Read-only) */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Performance</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-3 rounded-lg text-center">
                <p className="text-sm text-gray-600">Occupancy</p>
                <p className="text-lg font-bold text-blue-600">{property.occupancyRate}%</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg text-center">
                <p className="text-sm text-gray-600">Daily Revenue</p>
                <p className="text-lg font-bold text-green-600">LKR {(property.dailyRevenue / 1000000).toFixed(1)}M</p>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg text-center">
                <p className="text-sm text-gray-600">Rating</p>
                <p className="text-lg font-bold text-yellow-600">{property.rating}</p>
              </div>
              <div className="bg-red-50 p-3 rounded-lg text-center">
                <p className="text-sm text-gray-600">Alerts</p>
                <p className="text-lg font-bold text-red-600">{property.alerts}</p>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="border-t pt-6 flex gap-4 justify-end">
            <SecondaryButton
              type="button"
              onClick={onClose}
              className="px-6 py-2"
              text="Cancel"
            />
            <PrimaryButton
              type="submit"
              className="px-6 py-2 bg-orange-500 hover:bg-orange-600"
              text="Update Property"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

// Property Card Component (Admin Style)
function PropertyCard({ property, onViewDetails, onManage }) {
  return (
    <AdminCard className="hover:shadow-lg transition-all duration-200">
      <div className="relative">
        <img 
          src={property.image} 
          alt={property.name}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <div className="absolute top-2 right-2">
          <StatusBadge status={property.status} />
        </div>
        {property.alerts > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
            {property.alerts}
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{property.name}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FaMapMarkerAlt className="text-orange-500" />
            <span>{property.location}</span>
            <span className="text-gray-400">•</span>
            <span>{property.region}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <FaStar className="text-yellow-500" />
            <span className="font-semibold">{property.rating}</span>
            <span className="text-sm text-gray-600">({property.reviewCount} reviews)</span>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Starting from</p>
            <p className="font-bold text-green-600">LKR {property.startingPrice.toLocaleString()}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 py-3 border-y border-gray-100">
          <div className="text-center">
            <p className="text-sm text-gray-600">Occupancy</p>
            <p className="font-bold text-blue-600">{property.occupancyRate}%</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Rooms</p>
            <p className="font-bold text-gray-900">{property.occupied}/{property.rooms}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Manager:</span>
            <span className="font-medium">{property.manager}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Daily Revenue:</span>
            <span className="font-medium text-green-600">LKR {(property.dailyRevenue / 1000000).toFixed(1)}M</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Category:</span>
            <span className="font-medium">{property.category}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mt-3">
          {property.amenities.slice(0, 3).map((amenity, index) => (
            <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
              {amenity}
            </span>
          ))}
          {property.amenities.length > 3 && (
            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
              +{property.amenities.length - 3} more
            </span>
          )}
        </div>

        <div className="flex gap-2 mt-4">
          <SecondaryButton 
            className="flex-1 text-sm py-2"
            text="View Details"
            onClick={() => onViewDetails(property)}
          />
          <SecondaryButton 
            className="flex-1 text-sm py-2"
            text="Manage"
            onClick={() => onManage(property)}
          />
        </div>

        <div className="text-xs text-gray-500 text-center mt-2">
          Last updated: {property.lastUpdated}
        </div>
      </div>
    </AdminCard>
  );
}

export default function HotelListings() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [chainProperties, setChainProperties] = useState(initialChainProperties);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const formatDateTime = (date) => {
    return {
      date: date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      time: date.toLocaleTimeString('en-US', {
        hour12: true,
        hour: '2-digit',
        minute: '2-digit'
      })
    };
  };

  const { date: currentDate, time: currentTimeStr } = formatDateTime(currentTime);

  // Calculate chain statistics
  const chainStats = {
    totalProperties: chainProperties.length,
    totalRooms: chainProperties.reduce((sum, prop) => sum + prop.rooms, 0),
    totalOccupied: chainProperties.reduce((sum, prop) => sum + prop.occupied, 0),
    totalRevenue: chainProperties.reduce((sum, prop) => sum + prop.dailyRevenue, 0),
    averageRating: (chainProperties.reduce((sum, prop) => sum + prop.rating, 0) / chainProperties.length).toFixed(1),
    totalReviews: chainProperties.reduce((sum, prop) => sum + prop.reviewCount, 0),
    totalAlerts: chainProperties.reduce((sum, prop) => sum + prop.alerts, 0)
  };

  // Filter and sort properties
  const filteredProperties = chainProperties.filter(property => {
    const matchesSearch = property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || property.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const statusOptions = ['All', 'Operational', 'Seasonal Peak', 'Under Renovation', 'Maintenance'];

  // Handle adding new hotel
  const handleAddHotel = (newHotel) => {
    setChainProperties(prev => [...prev, newHotel]);
    setIsAddModalOpen(false);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 5000);
  };

  // Handle view details
  const handleViewDetails = (property) => {
    setSelectedProperty(property);
    setIsDetailsModalOpen(true);
  };

  // Handle manage property
  const handleManageProperty = (property) => {
    setSelectedProperty(property);
    setIsManageModalOpen(true);
  };

  // Handle update property
  const handleUpdateProperty = (updatedProperty) => {
    setChainProperties(prev => 
      prev.map(prop => prop.id === updatedProperty.id ? updatedProperty : prop)
    );
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 5000);
  };

  return (
    <HotelLayout>
      <div className="p-6">
        {/* Success Message */}
        {showSuccessMessage && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2">
            <FaCheckCircle />
            <span>New property added successfully to Ceylon Heritage Hotels!</span>
          </div>
        )}

        {/* Header Section - Admin Style */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Ceylon Heritage Hotels</h1>
            <p className="text-gray-600">Comprehensive property management for Sri Lanka's premier hotel chain across {chainStats.totalProperties} locations</p>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                {chainStats.totalProperties} Active Properties
              </span>
              <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                {chainStats.totalRooms.toLocaleString()} Total Rooms
              </span>
              {chainStats.totalAlerts > 0 && (
                <span className="text-sm bg-red-100 text-red-700 px-3 py-1 rounded-full font-medium animate-pulse">
                  {chainStats.totalAlerts} Alerts
                </span>
              )}
            </div>
          </div>
          <div className="mt-4 lg:mt-0 text-right">
            <p className="text-sm text-gray-500">Current Time (Sri Lanka)</p>
            <p className="text-lg font-semibold text-orange-600">{currentDate} at {currentTimeStr}</p>
            <p className="text-sm text-gray-500 mt-1">Chain Operations Center</p>
          </div>
        </div>

        {/* Critical Alerts */}
        {chainStats.totalAlerts > 0 && (
          <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-xl p-4 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FaBell className="text-red-600 text-xl animate-pulse" />
                <div>
                  <h3 className="font-semibold text-red-800">Property Alerts: {chainStats.totalAlerts} issues require attention</h3>
                  <p className="text-red-700 text-sm">Sigiriya renovation updates • Kandy VIP arrival preparation • Nuwara Eliya seasonal maintenance</p>
                </div>
              </div>
              <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Review Alerts
              </button>
            </div>
          </div>
        )}

        {/* Enhanced Chain Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <EnhancedStatsCard
            icon={<FaHotel className="text-white" />}
            title="Chain Properties"
            value={chainStats.totalProperties}
            change="0% this month"
            changeType="positive"
            color="bg-orange-500"
            subtitle="Across Sri Lanka's key destinations"
          />
          <EnhancedStatsCard
            icon={<FaBed className="text-white" />}
            title="Total Capacity"
            value={`${chainStats.totalOccupied}/${chainStats.totalRooms}`}
            change="4.2%"
            changeType="positive"
            color="bg-blue-500"
            subtitle={`${((chainStats.totalOccupied / chainStats.totalRooms) * 100).toFixed(1)}% overall occupancy`}
          />
          <EnhancedStatsCard
            icon={<FaChartBar className="text-white" />}
            title="Daily Revenue"
            value={`LKR ${(chainStats.totalRevenue / 1000000).toFixed(1)}M`}
            change="8.5%"
            changeType="positive"
            color="bg-green-500"
            subtitle="Chain-wide today"
          />
          <EnhancedStatsCard
            icon={<FaStar className="text-white" />}
            title="Chain Rating"
            value={chainStats.averageRating}
            change="2.1%"
            changeType="positive"
            color="bg-yellow-500"
            subtitle={`${chainStats.totalReviews.toLocaleString()} total reviews`}
          />
        </div>

        {/* Action Header with Add Property Button */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Property Management</h2>
            <p className="text-sm text-gray-600">Manage Ceylon Heritage Hotels chain properties</p>
          </div>
          <div className="flex gap-3">
            <PrimaryButton 
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium"
              onClick={() => setIsAddModalOpen(true)}
              text="Add New Property"
            />
            <SecondaryButton 
              className="px-4 py-3"
              text="Advanced Filters"
            />
          </div>
        </div>

        {/* Search and Filter Controls */}
        <AdminCard className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              <div className="relative flex-1">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search properties by name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="name">Sort by Name</option>
                  <option value="occupancy">Sort by Occupancy</option>
                  <option value="revenue">Sort by Revenue</option>
                  <option value="rating">Sort by Rating</option>
                </select>
              </div>
            </div>
          </div>
        </AdminCard>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredProperties.map((property) => (
            <PropertyCard 
              key={property.id} 
              property={property} 
              onViewDetails={handleViewDetails}
              onManage={handleManageProperty}
            />
          ))}
        </div>

        {/* Chain Performance Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <AdminCard>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-bold">Regional Performance</h3>
                <p className="text-sm text-gray-600">Revenue by province this month</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-blue-500" />
                  <span className="text-gray-700 font-medium">Western Province</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-lg">LKR 187.5M</span>
                  <p className="text-xs text-gray-500">Colombo Grand</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-green-500" />
                  <span className="text-gray-700 font-medium">Central Province</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-lg">LKR 174.6M</span>
                  <p className="text-xs text-gray-500">Kandy + Nuwara Eliya</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-orange-500" />
                  <span className="text-gray-700 font-medium">Southern Province</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-lg">LKR 179.2M</span>
                  <p className="text-xs text-gray-500">Galle + Bentota</p>
                </div>
              </div>
            </div>
          </AdminCard>

          <AdminCard>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-bold">Property Categories</h3>
                <p className="text-sm text-gray-600">Portfolio composition</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="font-medium">Luxury City Hotels</span>
                <span className="font-bold">1 property</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="font-medium">Heritage Cultural</span>
                <span className="font-bold">2 properties</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <span className="font-medium">Beach Resorts</span>
                <span className="font-bold">2 properties</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                <span className="font-medium">Archaeological Sites</span>
                <span className="font-bold">1 property</span>
              </div>
            </div>
          </AdminCard>
        </div>

        {/* Action Center */}
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-6 text-center">
          <h3 className="text-xl font-bold mb-2">Ceylon Heritage Chain Management</h3>
          <p className="text-gray-600 mb-6">Comprehensive tools for managing Sri Lanka's premier hotel portfolio</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PrimaryButton 
              className="px-8 py-3 bg-orange-500 hover:bg-orange-600"
              text="Generate Chain Report"
            />
            <SecondaryButton 
              className="px-8 py-3 border-orange-500 text-orange-700 hover:bg-orange-50"
              text="Property Alerts Center"
            />
            <SecondaryButton 
              className="px-8 py-3 border-orange-500 text-orange-700 hover:bg-orange-50"
              text="Manager Directory"
            />
          </div>
        </div>

        {/* Add Hotel Modal */}
        <AddHotelModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddHotel}
        />

        {/* Property Details Modal */}
        <PropertyDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          property={selectedProperty}
        />

        {/* Property Management Modal */}
        <PropertyManagementModal
          isOpen={isManageModalOpen}
          onClose={() => setIsManageModalOpen(false)}
          property={selectedProperty}
          onUpdate={handleUpdateProperty}
        />
      </div>
    </HotelLayout>
  );
}
