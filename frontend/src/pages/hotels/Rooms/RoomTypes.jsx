import { useState, useEffect } from 'react';
import { FaBed, FaEdit, FaTrash, FaPlus, FaUsers, FaRulerCombined, FaWifi, FaSnowflake, FaTv, FaBath, FaEye, FaStar, FaChartBar, FaSearch, FaFilter, FaTimes, FaSave, FaCheckCircle, FaCoffee, FaHotTub, FaGlassMartini, FaWineGlass, FaCar, FaConciergeBell } from 'react-icons/fa';
import HotelLayout from '../../../components/hotel/HotelLayout';
import AdminCard from '../../../components/admin/AdminCard';
import PrimaryButton from '../../../components/PrimaryButton';
import SecondaryButton from '../../../components/SecondaryButton';

// Ceylon Heritage Hotels Room Categories with realistic Sri Lankan data
const initialRoomTypes = [
  {
    id: 1,
    name: "Heritage Deluxe Room",
    category: "Deluxe",
    price: 42500,
    capacity: 2,
    size: 420,
    totalRooms: 45,
    availableRooms: 38,
    occupancyRate: 84.4,
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop",
    amenities: ["King Bed", "Ocean View", "Mini Bar", "Wi-Fi", "Air Conditioning", "Tea/Coffee Maker", "Safe Box"],
    description: "Elegant rooms featuring traditional Sri Lankan décor with modern amenities and stunning ocean views from private balconies.",
    bedType: "1 King Bed",
    view: "Ocean View",
    dailyRevenue: 1615000,
    monthlyRevenue: 48450000,
    avgRating: 4.7,
    reviewCount: 324,
    lastUpdated: "2 hours ago",
    status: "Active"
  },
  {
    id: 2,
    name: "Royal Heritage Suite", 
    category: "Suite",
    price: 89500,
    capacity: 4,
    size: 750,
    totalRooms: 12,
    availableRooms: 9,
    occupancyRate: 75.0,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    amenities: ["King Bed", "Separate Living Area", "Marble Bathroom", "Butler Service", "Complimentary Breakfast", "Private Balcony", "Jacuzzi", "Mini Bar"],
    description: "Luxurious suites with separate living area, marble bathroom with jacuzzi, and panoramic views of the Indian Ocean.",
    bedType: "1 King Bed + Sofa Bed",
    view: "Ocean & Garden View",
    dailyRevenue: 1074000,
    monthlyRevenue: 32220000,
    avgRating: 4.9,
    reviewCount: 156,
    lastUpdated: "1 hour ago",
    status: "Active"
  },
  {
    id: 3,
    name: "Colonial Family Room",
    category: "Family",
    price: 65000,
    capacity: 4,
    size: 580,
    totalRooms: 28,
    availableRooms: 21,
    occupancyRate: 75.0,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
    amenities: ["2 Queen Beds", "Garden View", "Connecting Rooms Available", "Baby Cot", "Family Amenities", "Wi-Fi", "Air Conditioning"],
    description: "Spacious family accommodations with colonial-era charm, perfect for families exploring Sri Lanka's cultural heritage.",
    bedType: "2 Queen Beds",
    view: "Garden View",
    dailyRevenue: 1365000,
    monthlyRevenue: 40950000,
    avgRating: 4.6,
    reviewCount: 289,
    lastUpdated: "3 hours ago",
    status: "Active"
  },
  {
    id: 4,
    name: "Executive Club Room",
    category: "Executive",
    price: 58500,
    capacity: 2,
    size: 480,
    totalRooms: 22,
    availableRooms: 18,
    occupancyRate: 81.8,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop",
    amenities: ["King Bed", "Club Lounge Access", "Complimentary Breakfast", "Evening Cocktails", "Business Center", "Express Check-in"],
    description: "Premium rooms with exclusive club benefits including complimentary breakfast and evening cocktails at the executive lounge.",
    bedType: "1 King Bed",
    view: "City & Partial Ocean",
    dailyRevenue: 1053000,
    monthlyRevenue: 31590000,
    avgRating: 4.8,
    reviewCount: 198,
    lastUpdated: "4 hours ago",
    status: "Active"
  },
  {
    id: 5,
    name: "Presidential Villa",
    category: "Villa",
    price: 185000,
    capacity: 6,
    size: 1200,
    totalRooms: 3,
    availableRooms: 2,
    occupancyRate: 66.7,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
    amenities: ["2 Bedrooms", "Private Pool", "Personal Butler", "Kitchen", "Dining Area", "Sea View Terrace", "Spa Treatment Room", "Golf Cart Access"],
    description: "Ultra-luxurious private villas with personal butler service, private pool, and exclusive beachfront access for the ultimate Sri Lankan getaway.",
    bedType: "2 King Beds",
    view: "Private Beach Access",
    dailyRevenue: 370000,
    monthlyRevenue: 11100000,
    avgRating: 5.0,
    reviewCount: 47,
    lastUpdated: "6 hours ago",
    status: "Active"
  },
  {
    id: 6,
    name: "Ayurveda Wellness Room",
    category: "Wellness",
    price: 72500,
    capacity: 2,
    size: 520,
    totalRooms: 18,
    availableRooms: 14,
    occupancyRate: 77.8,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    amenities: ["King Bed", "Meditation Area", "Herbal Bath", "Yoga Mat", "Healthy Mini Bar", "Garden View", "Ayurveda Consultation"],
    description: "Specially designed wellness rooms focusing on traditional Ayurvedic healing with meditation spaces and organic amenities.",
    bedType: "1 King Bed",
    view: "Herb Garden View",
    dailyRevenue: 1015000,
    monthlyRevenue: 30450000,
    avgRating: 4.8,
    reviewCount: 142,
    lastUpdated: "5 hours ago",
    status: "Active"
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

// Room Category Badge Component
function CategoryBadge({ category }) {
  const getCategoryColor = (category) => {
    switch (category) {
      case 'Deluxe': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Suite': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Family': return 'bg-green-100 text-green-700 border-green-200';
      case 'Executive': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Villa': return 'bg-red-100 text-red-700 border-red-200';
      case 'Wellness': return 'bg-teal-100 text-teal-700 border-teal-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  return (
    <span className={`text-xs px-2 py-1 rounded-full font-medium border ${getCategoryColor(category)}`}>
      {category}
    </span>
  );
}

// Room Type Card Component (Admin Style)
function RoomTypeCard({ roomType, onViewDetails, onEdit, onDelete }) {
  return (
    <AdminCard className="hover:shadow-lg transition-all duration-200">
      <div className="relative">
        <img 
          src={roomType.image} 
          alt={roomType.name}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <div className="absolute top-2 right-2">
          <CategoryBadge category={roomType.category} />
        </div>
        <div className="absolute top-2 left-2 bg-green-500 text-white rounded-full px-2 py-1 text-xs font-bold">
          {roomType.availableRooms}/{roomType.totalRooms} Available
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{roomType.name}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FaBed className="text-orange-500" />
            <span>{roomType.bedType}</span>
            <span className="text-gray-400">•</span>
            <span>{roomType.view}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <FaStar className="text-yellow-500" />
            <span className="font-semibold">{roomType.avgRating}</span>
            <span className="text-sm text-gray-600">({roomType.reviewCount} reviews)</span>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Starting from</p>
            <p className="font-bold text-green-600">LKR {roomType.price.toLocaleString()}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 py-3 border-y border-gray-100">
          <div className="text-center">
            <p className="text-sm text-gray-600">Occupancy</p>
            <p className="font-bold text-blue-600">{roomType.occupancyRate}%</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Capacity</p>
            <p className="font-bold text-gray-900">{roomType.capacity} guests</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Size</p>
            <p className="font-bold text-gray-900">{roomType.size} sqft</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Daily Revenue:</span>
            <span className="font-medium text-green-600">LKR {(roomType.dailyRevenue / 1000000).toFixed(1)}M</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Monthly Revenue:</span>
            <span className="font-medium text-green-600">LKR {(roomType.monthlyRevenue / 1000000).toFixed(1)}M</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mt-3">
          {roomType.amenities.slice(0, 3).map((amenity, index) => (
            <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
              {amenity}
            </span>
          ))}
          {roomType.amenities.length > 3 && (
            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
              +{roomType.amenities.length - 3} more
            </span>
          )}
        </div>

        <div className="flex gap-2 mt-4">
          <SecondaryButton 
            className="flex-1 text-sm py-2"
            text="View Details"
            onClick={() => onViewDetails(roomType)}
          />
          <SecondaryButton 
            className="flex-1 text-sm py-2"
            text="Edit Room"
            onClick={() => onEdit(roomType)}
          />
        </div>

        <div className="text-xs text-gray-500 text-center mt-2">
          Last updated: {roomType.lastUpdated}
        </div>
      </div>
    </AdminCard>
  );
}

// Room Details Modal Component
function RoomDetailsModal({ isOpen, onClose, roomType }) {
  if (!isOpen || !roomType) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{roomType.name}</h2>
            <p className="text-sm text-gray-600">{roomType.category} • {roomType.bedType} • {roomType.view}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FaTimes className="text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {/* Room Image */}
          <div className="mb-6">
            <img 
              src={roomType.image} 
              alt={roomType.name}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>

          {/* Room Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Room Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <CategoryBadge category={roomType.category} />
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bed Type:</span>
                  <span className="font-medium">{roomType.bedType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Room Size:</span>
                  <span className="font-medium">{roomType.size} sqft</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Max Capacity:</span>
                  <span className="font-medium">{roomType.capacity} guests</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">View:</span>
                  <span className="font-medium">{roomType.view}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Availability & Pricing</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Rooms:</span>
                  <span className="font-medium">{roomType.totalRooms}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Available Now:</span>
                  <span className="font-medium text-green-600">{roomType.availableRooms}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Occupancy Rate:</span>
                  <span className="font-medium text-blue-600">{roomType.occupancyRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Price per Night:</span>
                  <span className="font-medium text-green-600">LKR {roomType.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rating:</span>
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-500" />
                    <span className="font-medium">{roomType.avgRating}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Revenue Performance</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Daily Revenue:</span>
                  <span className="font-medium text-green-600">LKR {(roomType.dailyRevenue / 1000000).toFixed(1)}M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly Revenue:</span>
                  <span className="font-medium text-green-600">LKR {(roomType.monthlyRevenue / 1000000).toFixed(1)}M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Revenue per Room:</span>
                  <span className="font-medium">LKR {Math.round(roomType.dailyRevenue / roomType.totalRooms).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Reviews:</span>
                  <span className="font-medium">{roomType.reviewCount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Updated:</span>
                  <span className="font-medium">{roomType.lastUpdated}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Room Description */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Room Description</h3>
            <p className="text-gray-700 leading-relaxed">{roomType.description}</p>
          </div>

          {/* Amenities */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Room Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {roomType.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-2 bg-blue-50 p-2 rounded-lg">
                  <FaCheckCircle className="text-blue-500 text-sm" />
                  <span className="text-sm text-gray-700">{amenity}</span>
                </div>
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
              text="Edit Room Type"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Add/Edit Room Type Modal Component
function RoomTypeModal({ isOpen, onClose, roomType, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    capacity: '',
    size: '',
    totalRooms: '',
    bedType: '',
    view: '',
    amenities: '',
    description: '',
    image: ''
  });

  const [errors, setErrors] = useState({});

  const roomCategories = [
    'Deluxe',
    'Suite', 
    'Family',
    'Executive',
    'Villa',
    'Wellness',
    'Standard',
    'Premium'
  ];

  const bedTypes = [
    '1 King Bed',
    '1 Queen Bed',
    '2 Queen Beds',
    '1 King Bed + Sofa Bed',
    '2 King Beds',
    '1 Twin Bed',
    '2 Twin Beds'
  ];

  const viewTypes = [
    'Ocean View',
    'Garden View',
    'City View',
    'Pool View',
    'Mountain View',
    'Ocean & Garden View',
    'City & Partial Ocean',
    'Private Beach Access',
    'Herb Garden View'
  ];

  useEffect(() => {
    if (roomType) {
      setFormData({
        name: roomType.name || '',
        category: roomType.category || '',
        price: roomType.price || '',
        capacity: roomType.capacity || '',
        size: roomType.size || '',
        totalRooms: roomType.totalRooms || '',
        bedType: roomType.bedType || '',
        view: roomType.view || '',
        amenities: roomType.amenities?.join(', ') || '',
        description: roomType.description || '',
        image: roomType.image || ''
      });
    } else {
      setFormData({
        name: '',
        category: '',
        price: '',
        capacity: '',
        size: '',
        totalRooms: '',
        bedType: '',
        view: '',
        amenities: '',
        description: '',
        image: ''
      });
    }
  }, [roomType]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Room name is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.price || formData.price < 1000) newErrors.price = 'Valid price is required';
    if (!formData.capacity || formData.capacity < 1) newErrors.capacity = 'Valid capacity is required';
    if (!formData.size || formData.size < 100) newErrors.size = 'Valid room size is required';
    if (!formData.totalRooms || formData.totalRooms < 1) newErrors.totalRooms = 'Valid number of rooms is required';
    if (!formData.bedType) newErrors.bedType = 'Bed type is required';
    if (!formData.view) newErrors.view = 'View type is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newRoomType = {
        ...roomType,
        ...formData,
        price: parseInt(formData.price),
        capacity: parseInt(formData.capacity),
        size: parseInt(formData.size),
        totalRooms: parseInt(formData.totalRooms),
        amenities: formData.amenities.split(',').map(a => a.trim()).filter(a => a),
        availableRooms: roomType?.availableRooms || parseInt(formData.totalRooms),
        occupancyRate: roomType?.occupancyRate || 0,
        avgRating: roomType?.avgRating || 0,
        reviewCount: roomType?.reviewCount || 0,
        dailyRevenue: roomType?.dailyRevenue || 0,
        monthlyRevenue: roomType?.monthlyRevenue || 0,
        lastUpdated: 'Just updated',
        status: 'Active',
        id: roomType?.id || Date.now(),
        image: formData.image || 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop'
      };
      onSave(newRoomType);
      onClose();
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {roomType ? 'Edit Room Type' : 'Add New Room Type'}
            </h2>
            <p className="text-sm text-gray-600">Configure room details and amenities for Ceylon Heritage Hotels</p>
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
                Room Type Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="e.g., Heritage Deluxe Room"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                  errors.category ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select Category</option>
                {roomCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price per Night (LKR) *
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => handleChange('price', e.target.value)}
                placeholder="e.g., 42500"
                min="1000"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                  errors.price ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Capacity *
              </label>
              <input
                type="number"
                value={formData.capacity}
                onChange={(e) => handleChange('capacity', e.target.value)}
                placeholder="e.g., 2"
                min="1"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                  errors.capacity ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.capacity && <p className="text-red-500 text-sm mt-1">{errors.capacity}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Room Size (sqft) *
              </label>
              <input
                type="number"
                value={formData.size}
                onChange={(e) => handleChange('size', e.target.value)}
                placeholder="e.g., 420"
                min="100"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                  errors.size ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.size && <p className="text-red-500 text-sm mt-1">{errors.size}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Rooms Available *
              </label>
              <input
                type="number"
                value={formData.totalRooms}
                onChange={(e) => handleChange('totalRooms', e.target.value)}
                placeholder="e.g., 45"
                min="1"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                  errors.totalRooms ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.totalRooms && <p className="text-red-500 text-sm mt-1">{errors.totalRooms}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bed Type *
              </label>
              <select
                value={formData.bedType}
                onChange={(e) => handleChange('bedType', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                  errors.bedType ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select Bed Type</option>
                {bedTypes.map(bedType => (
                  <option key={bedType} value={bedType}>{bedType}</option>
                ))}
              </select>
              {errors.bedType && <p className="text-red-500 text-sm mt-1">{errors.bedType}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                View Type *
              </label>
              <select
                value={formData.view}
                onChange={(e) => handleChange('view', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                  errors.view ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select View Type</option>
                {viewTypes.map(viewType => (
                  <option key={viewType} value={viewType}>{viewType}</option>
                ))}
              </select>
              {errors.view && <p className="text-red-500 text-sm mt-1">{errors.view}</p>}
            </div>
          </div>

          {/* Room Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Room Image URL
            </label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => handleChange('image', e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          {/* Amenities */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Room Amenities (comma-separated)
            </label>
            <textarea
              value={formData.amenities}
              onChange={(e) => handleChange('amenities', e.target.value)}
              placeholder="King Bed, Ocean View, Mini Bar, Wi-Fi, Air Conditioning, Tea/Coffee Maker"
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
            <p className="text-sm text-gray-500 mt-1">
              Enter amenities separated by commas. Examples: King Bed, Ocean View, Mini Bar, Wi-Fi
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Room Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Describe the room's features, ambiance, and unique selling points..."
              rows="4"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
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
              text={roomType ? 'Update Room Type' : 'Add Room Type'}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default function RoomTypes() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [roomTypes, setRoomTypes] = useState(initialRoomTypes);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRoomType, setSelectedRoomType] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

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

  // Calculate room statistics
  const roomStats = {
    totalTypes: roomTypes.length,
    totalRooms: roomTypes.reduce((sum, room) => sum + room.totalRooms, 0),
    totalAvailable: roomTypes.reduce((sum, room) => sum + room.availableRooms, 0),
    totalOccupied: roomTypes.reduce((sum, room) => sum + (room.totalRooms - room.availableRooms), 0),
    totalRevenue: roomTypes.reduce((sum, room) => sum + room.dailyRevenue, 0),
    averageOccupancy: (roomTypes.reduce((sum, room) => sum + room.occupancyRate, 0) / roomTypes.length).toFixed(1),
    averagePrice: Math.round(roomTypes.reduce((sum, room) => sum + room.price, 0) / roomTypes.length)
  };

  // Filter and sort room types
  const filteredRoomTypes = roomTypes.filter(roomType => {
    const matchesSearch = roomType.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         roomType.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterCategory === 'All' || roomType.category === filterCategory;
    return matchesSearch && matchesFilter;
  });

  const categoryOptions = ['All', 'Deluxe', 'Suite', 'Family', 'Executive', 'Villa', 'Wellness'];

  // Handle adding new room type
  const handleAddRoomType = (newRoomType) => {
    setRoomTypes(prev => [...prev, newRoomType]);
    setIsAddModalOpen(false);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 5000);
  };

  // Handle editing room type
  const handleEditRoomType = (updatedRoomType) => {
    setRoomTypes(prev => 
      prev.map(room => room.id === updatedRoomType.id ? updatedRoomType : room)
    );
    setIsEditModalOpen(false);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 5000);
  };

  // Handle view details
  const handleViewDetails = (roomType) => {
    setSelectedRoomType(roomType);
    setIsDetailsModalOpen(true);
  };

  // Handle edit room type
  const handleEditClick = (roomType) => {
    setSelectedRoomType(roomType);
    setIsEditModalOpen(true);
  };

  // Handle delete room type
  const handleDeleteRoomType = (id) => {
    if (window.confirm('Are you sure you want to delete this room type?')) {
      setRoomTypes(prev => prev.filter(room => room.id !== id));
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 5000);
    }
  };

  return (
    <HotelLayout>
      <div className="p-6">
        {/* Success Message */}
        {showSuccessMessage && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2">
            <FaCheckCircle />
            <span>Room type updated successfully!</span>
          </div>
        )}

        {/* Header Section - Admin Style */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Ceylon Heritage Room Types</h1>
            <p className="text-gray-600">Comprehensive room management for premium accommodations across {roomStats.totalTypes} room categories</p>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                {roomStats.totalTypes} Room Categories
              </span>
              <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                {roomStats.totalRooms} Total Rooms
              </span>
              <span className="text-sm bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-medium">
                {roomStats.averageOccupancy}% Avg Occupancy
              </span>
            </div>
          </div>
          <div className="mt-4 lg:mt-0 text-right">
            <p className="text-sm text-gray-500">Current Time (Sri Lanka)</p>
            <p className="text-lg font-semibold text-orange-600">{currentDate} at {currentTimeStr}</p>
            <p className="text-sm text-gray-500 mt-1">Room Management Center</p>
          </div>
        </div>

        {/* Enhanced Room Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <EnhancedStatsCard
            icon={<FaBed className="text-white" />}
            title="Room Categories"
            value={roomStats.totalTypes}
            change="0 new this month"
            changeType="positive"
            color="bg-blue-500"
            subtitle="Different accommodation types"
          />
          <EnhancedStatsCard
            icon={<FaUsers className="text-white" />}
            title="Total Capacity"
            value={`${roomStats.totalOccupied}/${roomStats.totalRooms}`}
            change="5.2%"
            changeType="positive"
            color="bg-green-500"
            subtitle={`${roomStats.averageOccupancy}% average occupancy`}
          />
          <EnhancedStatsCard
            icon={<FaChartBar className="text-white" />}
            title="Daily Revenue"
            value={`LKR ${(roomStats.totalRevenue / 1000000).toFixed(1)}M`}
            change="12.3%"
            changeType="positive"
            color="bg-orange-500"
            subtitle="All room categories"
          />
          <EnhancedStatsCard
            icon={<FaStar className="text-white" />}
            title="Average Rate"
            value={`LKR ${roomStats.averagePrice.toLocaleString()}`}
            change="8.1%"
            changeType="positive"
            color="bg-purple-500"
            subtitle="Per night pricing"
          />
        </div>

        {/* Action Header with Add Room Type Button */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Room Type Management</h2>
            <p className="text-sm text-gray-600">Configure and manage Ceylon Heritage Hotels room categories</p>
          </div>
          <div className="flex gap-3">
            <PrimaryButton 
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium"
              onClick={() => setIsAddModalOpen(true)}
              text="Add Room Type"
            />
            <SecondaryButton 
              className="px-4 py-3"
              text="Export Report"
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
                  placeholder="Search room types by name or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  {categoryOptions.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="name">Sort by Name</option>
                  <option value="price">Sort by Price</option>
                  <option value="occupancy">Sort by Occupancy</option>
                  <option value="revenue">Sort by Revenue</option>
                </select>
              </div>
            </div>
          </div>
        </AdminCard>

        {/* Room Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredRoomTypes.map((roomType) => (
            <RoomTypeCard 
              key={roomType.id} 
              roomType={roomType} 
              onViewDetails={handleViewDetails}
              onEdit={handleEditClick}
              onDelete={handleDeleteRoomType}
            />
          ))}
        </div>

        {/* Room Category Performance Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <AdminCard>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-bold">Category Performance</h3>
                <p className="text-sm text-gray-600">Revenue by room category this month</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FaBed className="text-purple-500" />
                  <span className="text-gray-700 font-medium">Suite Category</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-lg">LKR 43.3M</span>
                  <p className="text-xs text-gray-500">Royal Heritage Suite</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FaBed className="text-blue-500" />
                  <span className="text-gray-700 font-medium">Deluxe Category</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-lg">LKR 48.5M</span>
                  <p className="text-xs text-gray-500">Heritage Deluxe Room</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FaBed className="text-green-500" />
                  <span className="text-gray-700 font-medium">Family Category</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-lg">LKR 41.0M</span>
                  <p className="text-xs text-gray-500">Colonial Family Room</p>
                </div>
              </div>
            </div>
          </AdminCard>

          <AdminCard>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-bold">Occupancy Insights</h3>
                <p className="text-sm text-gray-600">Current room availability status</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="font-medium">Available Rooms</span>
                <span className="font-bold text-green-600">{roomStats.totalAvailable}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                <span className="font-medium">Occupied Rooms</span>
                <span className="font-bold text-orange-600">{roomStats.totalOccupied}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="font-medium">Average Occupancy</span>
                <span className="font-bold text-blue-600">{roomStats.averageOccupancy}%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <span className="font-medium">Revenue per Room</span>
                <span className="font-bold text-purple-600">LKR {Math.round(roomStats.totalRevenue / roomStats.totalRooms).toLocaleString()}</span>
              </div>
            </div>
          </AdminCard>
        </div>

        {/* Action Center */}
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-6 text-center">
          <h3 className="text-xl font-bold mb-2">Ceylon Heritage Room Management</h3>
          <p className="text-gray-600 mb-6">Comprehensive tools for managing premium accommodation categories</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PrimaryButton 
              className="px-8 py-3 bg-orange-500 hover:bg-orange-600"
              text="Generate Room Report"
            />
            <SecondaryButton 
              className="px-8 py-3 border-orange-500 text-orange-700 hover:bg-orange-50"
              text="Occupancy Analytics"
            />
            <SecondaryButton 
              className="px-8 py-3 border-orange-500 text-orange-700 hover:bg-orange-50"
              text="Pricing Strategy"
            />
          </div>
        </div>

        {/* Add Room Type Modal */}
        <RoomTypeModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleAddRoomType}
        />

        {/* Room Details Modal */}
        <RoomDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          roomType={selectedRoomType}
        />

        {/* Edit Room Type Modal */}
        <RoomTypeModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          roomType={selectedRoomType}
          onSave={handleEditRoomType}
        />
      </div>
    </HotelLayout>
  );
}
