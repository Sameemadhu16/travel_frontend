import { useState, useEffect } from 'react';
import { FaBed, FaStar, FaHotel, FaMapMarkerAlt, FaUsers, FaEye, FaEdit, FaTrash, FaPlus, FaFilter, FaSearch, FaArrowUp, FaArrowDown, FaBell, FaCheckCircle, FaExclamationTriangle, FaClock, FaChartBar, FaTimes, FaSave, FaPhone, FaBuilding, FaTools } from 'react-icons/fa';
import HotelLayout from '../../../components/hotel/HotelLayout';
import AdminCard from '../../../components/admin/AdminCard';
import AdminHeader from '../../../components/admin/AdminHeader';
import StatusBadge from '../../../components/admin/StatusBadge';
import Pagination from '../../../components/admin/Pagination';
import PrimaryButton from '../../../components/PrimaryButton';
import SecondaryButton from '../../../components/SecondaryButton';

// Statistics Card Component
function PropertyStatsCard({ icon, title, value, change, color }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
          {change && <p className="text-sm text-green-500">{change}</p>}
        </div>
        <div className={`w-12 h-12 flex items-center justify-center rounded-full text-white ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

// Ceylon Heritage Hotels Chain - Realistic Sri Lankan hotel properties
const chainProperties = [
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
  }
];

// View Hotel Details Modal Component
function ViewDetailsModal({ isOpen, onClose, property }) {
  if (!isOpen || !property) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{property.name}</h2>
              <p className="text-gray-600 mt-1">Detailed Property Information</p>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 p-2"
            >
              <FaTimes size={20} />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Property Image and Basic Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div>
              <img 
                src={property.image} 
                alt={property.name}
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
              <div className="mt-4">
                <StatusBadge status={property.status} />
                <div className="flex items-center gap-2 mt-2">
                  <FaStar className="text-yellow-500" />
                  <span className="font-semibold">{property.rating}</span>
                  <span className="text-sm text-gray-600">({property.reviewCount} reviews)</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Location & Contact</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-orange-500" />
                    <span>{property.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaHotel className="text-blue-500" />
                    <span>{property.region}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaPhone className="text-green-500" />
                    <span>{property.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaBell className="text-purple-500" />
                    <span>{property.email}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Property Manager</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium">{property.manager}</p>
                  <p className="text-sm text-gray-600">Property Operations Manager</p>
                  <p className="text-sm text-gray-600 mt-1">Last updated: {property.lastUpdated}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Operational Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <FaBed className="text-2xl text-blue-500 mx-auto mb-2" />
              <p className="font-bold text-2xl text-blue-600">{property.rooms}</p>
              <p className="text-sm text-gray-600">Total Rooms</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <FaUsers className="text-2xl text-green-500 mx-auto mb-2" />
              <p className="font-bold text-2xl text-green-600">{property.occupancyRate}%</p>
              <p className="text-sm text-gray-600">Occupancy Rate</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <FaChartBar className="text-2xl text-purple-500 mx-auto mb-2" />
              <p className="font-bold text-2xl text-purple-600">LKR {(property.dailyRevenue / 1000000).toFixed(1)}M</p>
              <p className="text-sm text-gray-600">Daily Revenue</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg text-center">
              <FaStar className="text-2xl text-orange-500 mx-auto mb-2" />
              <p className="font-bold text-2xl text-orange-600">LKR {property.startingPrice.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Starting Price</p>
            </div>
          </div>

          {/* Property Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium">{property.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Occupied Rooms:</span>
                  <span className="font-medium">{property.occupied}/{property.rooms}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly Revenue:</span>
                  <span className="font-medium text-green-600">LKR {(property.monthlyRevenue / 1000000).toFixed(1)}M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Property ID:</span>
                  <span className="font-medium">CHH-{property.id.toString().padStart(3, '0')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Alerts:</span>
                  <span className={`font-medium ${property.alerts > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {property.alerts > 0 ? `${property.alerts} Active` : 'No Issues'}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Amenities & Services</h3>
              <div className="grid grid-cols-2 gap-2">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <FaCheckCircle className="text-green-500 flex-shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6 border-t border-gray-200">
            <PrimaryButton 
              text="Generate Property Report"
              className="flex-1"
            />
            <SecondaryButton 
              text="Edit Property"
              className="flex-1"
            />
            <SecondaryButton 
              text="Close"
              onClick={onClose}
              className="flex-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Manage Hotel Modal Component
function ManageHotelModal({ isOpen, onClose, property, onUpdate }) {
  const [formData, setFormData] = useState({
    status: '',
    occupancyRate: '',
    dailyRevenue: '',
    manager: '',
    phone: '',
    email: '',
    alerts: ''
  });

  // Initialize form data when modal opens
  useEffect(() => {
    if (isOpen && property) {
      setFormData({
        status: property.status,
        occupancyRate: property.occupancyRate.toString(),
        dailyRevenue: (property.dailyRevenue / 1000000).toString(),
        manager: property.manager,
        phone: property.phone,
        email: property.email,
        alerts: property.alerts.toString()
      });
    }
  }, [isOpen, property]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const updatedProperty = {
      ...property,
      status: formData.status,
      occupancyRate: parseFloat(formData.occupancyRate),
      dailyRevenue: parseFloat(formData.dailyRevenue) * 1000000,
      manager: formData.manager,
      phone: formData.phone,
      email: formData.email,
      alerts: parseInt(formData.alerts),
      lastUpdated: 'Just updated'
    };

    onUpdate(updatedProperty);
    onClose();
  };

  if (!isOpen || !property) return null;

  const statusOptions = ['Operational', 'Seasonal Peak', 'Under Renovation', 'Maintenance'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Manage {property.name}</h2>
              <p className="text-gray-600 mt-1">Update property operational details</p>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 p-2"
            >
              <FaTimes size={20} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Operational Status */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4">Operational Status</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  >
                    {statusOptions.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Occupancy Rate (%)</label>
                  <input
                    type="number"
                    name="occupancyRate"
                    value={formData.occupancyRate}
                    onChange={handleInputChange}
                    min="0"
                    max="100"
                    step="0.1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Daily Revenue (LKR Millions)</label>
                  <input
                    type="number"
                    name="dailyRevenue"
                    value={formData.dailyRevenue}
                    onChange={handleInputChange}
                    min="0"
                    step="0.1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Active Alerts</label>
                  <input
                    type="number"
                    name="alerts"
                    value={formData.alerts}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Management Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4">Management Details</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Manager</label>
                  <input
                    type="text"
                    name="manager"
                    value={formData.manager}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">Quick Management Actions</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <button
                type="button"
                className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm"
                onClick={() => setFormData(prev => ({ ...prev, alerts: '0' }))}
              >
                Clear Alerts
              </button>
              <button
                type="button"
                className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 text-sm"
                onClick={() => setFormData(prev => ({ ...prev, status: 'Operational' }))}
              >
                Set Operational
              </button>
              <button
                type="button"
                className="p-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 text-sm"
                onClick={() => setFormData(prev => ({ ...prev, status: 'Maintenance' }))}
              >
                Maintenance Mode
              </button>
              <button
                type="button"
                className="p-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 text-sm"
                onClick={() => setFormData(prev => ({ ...prev, occupancyRate: '85' }))}
              >
                Target Occupancy
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6 border-t border-gray-200">
            <PrimaryButton 
              text="Update Property"
              type="submit" 
              className="flex-1"
            />
            <SecondaryButton 
              text="Cancel"
              type="button" 
              onClick={onClose} 
              className="flex-1"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

// Add Hotel Modal Component
function AddHotelModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    region: 'Western Province',
    category: 'Luxury City Hotel',
    rooms: '',
    manager: '',
    phone: '',
    email: '',
    startingPrice: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newProperty = {
      id: Date.now(),
      ...formData,
      image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop",
      rating: 4.5,
      reviewCount: 0,
      status: 'Operational',
      rooms: parseInt(formData.rooms),
      occupied: 0,
      occupancyRate: 0,
      dailyRevenue: 0,
      monthlyRevenue: 0,
      startingPrice: parseInt(formData.startingPrice),
      amenities: ['Pool', 'Spa', 'Restaurant'],
      lastUpdated: 'Just added',
      alerts: 0
    };

    onSave(newProperty);
    onClose();
    
    // Reset form
    setFormData({
      name: '',
      location: '',
      region: 'Western Province',
      category: 'Luxury City Hotel',
      rooms: '',
      manager: '',
      phone: '',
      email: '',
      startingPrice: ''
    });
  };

  if (!isOpen) return null;

  const regions = ['Western Province', 'Central Province', 'Southern Province', 'Northern Province', 'Eastern Province', 'North Western Province', 'North Central Province', 'Uva Province', 'Sabaragamuwa Province'];
  const categories = ['Luxury City Hotel', 'Heritage Cultural Hotel', 'Historic Fort Hotel', 'Hill Country Retreat', 'Beach Resort', 'Safari Lodge'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Add New Property</h2>
            <p className="text-gray-600">Expand Ceylon Heritage Hotels chain</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Property Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="e.g., Ceylon Heritage Mirissa"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
                placeholder="e.g., Mirissa Beach, Mirissa"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Region *
              </label>
              <select
                name="region"
                value={formData.region}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
              >
                {regions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Rooms *
              </label>
              <input
                type="number"
                name="rooms"
                value={formData.rooms}
                onChange={handleInputChange}
                required
                min="1"
                placeholder="e.g., 150"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Starting Price (LKR) *
              </label>
              <input
                type="number"
                name="startingPrice"
                value={formData.startingPrice}
                onChange={handleInputChange}
                required
                min="1000"
                placeholder="e.g., 25000"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Property Manager *
              </label>
              <input
                type="text"
                name="manager"
                value={formData.manager}
                onChange={handleInputChange}
                required
                placeholder="e.g., Ms. Samanthi Silva"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                placeholder="+94 41 222 3456"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="mirissa@ceylonheritage.lk"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>
          
          <div className="mt-8 flex justify-end gap-3">
            <SecondaryButton 
              text="Cancel"
              type="button" 
              onClick={onClose} 
            />
            <PrimaryButton 
              text="Add Property"
              type="submit" 
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default function HotelListings() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [properties, setProperties] = useState(chainProperties);
  const [filteredProperties, setFilteredProperties] = useState(chainProperties);
  const [filters, setFilters] = useState({
    search: '',
    status: 'All',
    region: 'All',
    category: 'All'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Modal Handlers
  const handleViewDetails = (property) => {
    console.log('View details clicked for:', property.name);
    setSelectedProperty(property);
    setShowViewModal(true);
  };

  const handleManage = (property) => {
    console.log('Manage clicked for:', property.name);
    setSelectedProperty(property);
    setShowManageModal(true);
  };

  const handleUpdateProperty = (updatedProperty) => {
    setProperties(prevProperties => 
      prevProperties.map(prop => 
        prop.id === updatedProperty.id ? updatedProperty : prop
      )
    );
    console.log('Property updated:', updatedProperty.name);
  };

  const handleAddHotel = (newProperty) => {
    setProperties(prev => [newProperty, ...prev]);
    console.log('New property added:', newProperty.name);
  };

  // Filter properties based on current filters
  useEffect(() => {
    let filtered = properties;

    if (filters.search) {
      filtered = filtered.filter(property => 
        property.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        property.location.toLowerCase().includes(filters.search.toLowerCase()) ||
        property.manager.toLowerCase().includes(filters.search.toLowerCase()) ||
        property.region.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.status !== 'All') {
      filtered = filtered.filter(property => property.status === filters.status);
    }

    if (filters.region !== 'All') {
      filtered = filtered.filter(property => property.region === filters.region);
    }

    if (filters.category !== 'All') {
      filtered = filtered.filter(property => property.category === filters.category);
    }

    setFilteredProperties(filtered);
    setCurrentPage(1);
  }, [filters, properties]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Get unique values for filters
  const uniqueRegions = [...new Set(properties.map(property => property.region))].sort();
  const uniqueCategories = [...new Set(properties.map(property => property.category))].sort();
  const statusOptions = ['All', 'Operational', 'Seasonal Peak', 'Under Renovation', 'Maintenance'];

  // Pagination
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProperties = filteredProperties.slice(startIndex, endIndex);

  // Statistics for filtered properties
  const stats = {
    total: filteredProperties.length,
    operational: filteredProperties.filter(p => p.status === 'Operational').length,
    seasonal: filteredProperties.filter(p => p.status === 'Seasonal Peak').length,
    maintenance: filteredProperties.filter(p => p.status === 'Under Renovation' || p.status === 'Maintenance').length
  };

  return (
    <HotelLayout>
      <AdminHeader 
        title="Ceylon Heritage Hotels" 
        subtitle="Comprehensive property management for Sri Lanka's premier hotel chain"
      />

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <PropertyStatsCard
          icon={<FaHotel />}
          title="Total Properties"
          value={stats.total}
          change="+2 new this year"
          color="bg-blue-500"
        />
        <PropertyStatsCard
          icon={<FaCheckCircle />}
          title="Operational"
          value={stats.operational}
          change="85% occupancy avg"
          color="bg-green-500"
        />
        <PropertyStatsCard
          icon={<FaStar />}
          title="Seasonal Peak"
          value={stats.seasonal}
          change="Peak season active"
          color="bg-yellow-500"
        />
        <PropertyStatsCard
          icon={<FaTools />}
          title="Maintenance"
          value={stats.maintenance}
          change="Scheduled updates"
          color="bg-orange-500"
        />
      </div>

      {/* Enhanced Filters */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500" 
              placeholder="Search by property name, location, or manager..."
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            />
          </div>
          <select 
            className="border rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
          >
            <option value="All">All Status</option>
            {statusOptions.filter(status => status !== 'All').map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          <select 
            className="border rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
            value={filters.region}
            onChange={(e) => setFilters(prev => ({ ...prev, region: e.target.value }))}
          >
            <option value="All">All Regions</option>
            {uniqueRegions.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
          <select 
            className="border rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
            value={filters.category}
            onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
          >
            <option value="All">All Categories</option>
            {uniqueCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 flex items-center gap-2 transition-colors"
          >
            <FaPlus /> Add Property
          </button>
        </div>
      </div>

      {/* Enhanced Properties Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location & Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Management
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentProperties.map(property => (
                <tr key={property.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img 
                        src={property.image} 
                        alt={property.name} 
                        className="h-16 w-24 rounded-lg object-cover border-2 border-gray-200"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
                          {property.name}
                          {property.alerts > 0 && (
                            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                              {property.alerts}
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">{property.location}</div>
                        <div className="text-xs text-gray-400 font-mono">CHH-{property.id.toString().padStart(3, '0')}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="flex items-center gap-1 mb-1">
                        <FaMapMarkerAlt className="text-orange-500" />
                        <span className="font-medium text-gray-900">{property.region}</span>
                      </div>
                      <div className="text-sm text-gray-500">{property.category}</div>
                      <div className="text-xs text-green-600 mt-1">
                        LKR {property.startingPrice.toLocaleString()} / night
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="flex items-center gap-1 mb-1">
                        <FaStar className="text-yellow-500 text-xs" />
                        <span className="font-medium">{property.rating}</span>
                        <span className="text-gray-500">({property.reviewCount} reviews)</span>
                      </div>
                      <div className="text-xs text-blue-600 mb-1">
                        Occupancy: {property.occupancyRate}% ({property.occupied}/{property.rooms})
                      </div>
                      <div className="text-xs text-green-600">
                        Revenue: LKR {(property.dailyRevenue / 1000000).toFixed(1)}M/day
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={property.status} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">{property.manager}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <FaPhone className="text-gray-400" />
                        {property.phone}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Updated: {property.lastUpdated}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleViewDetails(property)}
                        className="text-blue-500 hover:text-blue-700 p-2 rounded"
                        title="View Details"
                      >
                        <FaEye />
                      </button>
                      <button 
                        onClick={() => handleManage(property)}
                        className="text-green-500 hover:text-green-700 p-2 rounded" 
                        title="Manage Property"
                      >
                        <FaEdit />
                      </button>
                      <button className="text-red-500 hover:text-red-700 p-2 rounded" title="Remove">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t">
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            totalResults={filteredProperties.length}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {/* Modals */}
      <AddHotelModal 
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddHotel}
      />

      <ViewDetailsModal 
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        property={selectedProperty}
      />

      <ManageHotelModal 
        isOpen={showManageModal}
        onClose={() => setShowManageModal(false)}
        property={selectedProperty}
        onUpdate={handleUpdateProperty}
      />
    </HotelLayout>
  );
}