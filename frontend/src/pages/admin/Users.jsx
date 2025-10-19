import { useState, useEffect } from 'react';
import { FaFilter, FaPlus, FaEye, FaEdit, FaTrash, FaTimes, FaUsers, FaUserCheck, FaUserTimes, FaSearch, FaMapMarkerAlt, FaPhone, FaEnvelope, FaCalendar, FaStar, FaBan, FaCheckCircle, FaUserTie, FaHotel, FaCar, FaRoute, FaDownload, FaUserPlus } from 'react-icons/fa';
import AdminLayout from '../../components/admin/AdminLayout';
import AdminHeader from '../../components/admin/AdminHeader';
import StatusBadge from '../../components/admin/StatusBadge';
import Pagination from '../../components/admin/Pagination';

// Mock Sri Lankan users data
const sriLankanUsers = [
  {
    id: "TLK001",
    name: "Kasun Perera",
    email: "kasun.perera@gmail.com",
    phone: "+94 77 123 4567",
    role: "Traveller",
    status: "Active",
    location: "Colombo",
    registered: "2024-01-15",
    lastActive: "2024-10-18",
    totalBookings: 12,
    totalSpent: 450000,
    rating: 4.8,
    verified: true,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=center"
  },
  {
    id: "TLK002",
    name: "Nirmala Silva",
    email: "nirmala.silva@hotmail.com",
    phone: "+94 71 987 6543",
    role: "Tour Guide",
    status: "Active",
    location: "Kandy",
    registered: "2023-11-20",
    lastActive: "2024-10-19",
    totalBookings: 87,
    totalEarned: 1250000,
    rating: 4.9,
    verified: true,
    specialties: ["Cultural Heritage", "Temple Tours"],
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b4e8e4f8?w=100&h=100&fit=crop&crop=center"
  },
  {
    id: "TLK003",
    name: "Chaminda Fernando",
    email: "chaminda@ceylonhotels.lk",
    phone: "+94 76 555 7890",
    role: "Hotel Manager",
    status: "Active",
    location: "Negombo",
    registered: "2023-08-10",
    lastActive: "2024-10-17",
    propertyName: "Lagoon Paradise Resort",
    totalBookings: 234,
    totalRevenue: 3200000,
    rating: 4.7,
    verified: true,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=center"
  },
  {
    id: "TLK004",
    name: "Priya Jayawardena",
    email: "priya.j@outlook.com",
    phone: "+94 81 234 5678",
    role: "Traveller",
    status: "Pending",
    location: "Matale",
    registered: "2024-10-10",
    lastActive: "2024-10-15",
    totalBookings: 2,
    totalSpent: 85000,
    rating: 4.5,
    verified: false,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=center"
  },
  {
    id: "TLK005",
    name: "Roshan Wickramasinghe",
    email: "roshan@safarijeeps.lk",
    phone: "+94 52 222 3456",
    role: "Vehicle Agency",
    status: "Active",
    location: "Tissamaharama",
    registered: "2023-05-15",
    lastActive: "2024-10-18",
    vehicleType: "Safari Jeep",
    totalBookings: 156,
    totalEarned: 890000,
    rating: 4.6,
    verified: true,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=center"
  },
  {
    id: "TLK006",
    name: "Malini Rathnayake",
    email: "malini@vehicles.lk",
    phone: "+94 31 227 8901",
    role: "Vehicle Agency",
    status: "Active",
    location: "Bentota",
    registered: "2023-03-22",
    lastActive: "2024-10-19",
    vehicleType: "Tour Van",
    totalBookings: 78,
    totalEarned: 650000,
    rating: 4.9,
    verified: true,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b4e8e4f8?w=100&h=100&fit=crop&crop=center"
  },
  {
    id: "TLK007",
    name: "Thilina Gunasekara",
    email: "thilina@adventures.lk",
    phone: "+94 47 223 9876",
    role: "Tour Guide",
    status: "Suspended",
    location: "Ella",
    registered: "2023-12-05",
    lastActive: "2024-09-20",
    totalBookings: 45,
    totalEarned: 320000,
    rating: 3.8,
    verified: true,
    suspensionReason: "Customer complaints",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=center"
  },
  {
    id: "TLK008",
    name: "Sandani Perera",
    email: "sandani@beachresorts.lk",
    phone: "+94 91 438 5672",
    role: "Hotel Manager",
    status: "Active",
    location: "Galle",
    registered: "2023-07-18",
    lastActive: "2024-10-19",
    propertyName: "Fortress Beach Resort",
    totalBookings: 289,
    totalRevenue: 4100000,
    rating: 4.8,
    verified: true,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=center"
  },
  {
    id: "TLK009",
    name: "Lakshan Mendis",
    email: "lakshan@mountainguides.lk",
    phone: "+94 66 223 4567",
    role: "Tour Guide",
    status: "Active",
    location: "Badulla",
    registered: "2023-09-12",
    lastActive: "2024-10-17",
    totalBookings: 112,
    totalEarned: 780000,
    rating: 4.7,
    verified: true,
    specialties: ["Mountain Trekking", "Adam's Peak"],
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=center"
  },
  {
    id: "TLK010",
    name: "Dilani Karunaratne",
    email: "dilani@spicetours.lk",
    phone: "+94 25 222 5678",
    role: "Tour Guide",
    status: "Active",
    location: "Anuradhapura",
    registered: "2023-04-08",
    lastActive: "2024-10-18",
    totalBookings: 95,
    totalEarned: 650000,
    rating: 4.8,
    verified: true,
    specialties: ["Spice Gardens", "Culinary Tours"],
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b4e8e4f8?w=100&h=100&fit=crop&crop=center"
  },
  {
    id: "TLK011",
    name: "Sunil Amarasinghe",
    email: "sunil@ceylontravel.com",
    phone: "+94 11 234 5678",
    role: "Traveller",
    status: "Active",
    location: "Colombo",
    registered: "2024-02-28",
    lastActive: "2024-10-19",
    totalBookings: 8,
    totalSpent: 325000,
    rating: 4.6,
    verified: true,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=center"
  },
  {
    id: "TLK012",
    name: "Amara Wickremasinghe",
    email: "amara@hillcountry.lk",
    phone: "+94 52 333 7890",
    role: "Hotel Manager",
    status: "Active",
    location: "Nuwara Eliya",
    registered: "2023-06-14",
    lastActive: "2024-10-18",
    propertyName: "Hill Country Estate",
    totalBookings: 167,
    totalRevenue: 2800000,
    rating: 4.9,
    verified: true,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=center"
  }
];

// User Details Modal Component
function UserDetailsModal({ user, isOpen, onClose, onStatusChange }) {
  if (!isOpen || !user) return null;

  const getRoleIcon = (role) => {
    switch (role) {
      case 'Tour Guide':
        return <FaUserTie className="text-green-500" />;
      case 'Hotel Manager':
        return <FaHotel className="text-blue-500" />;
      case 'Vehicle Agency':
        return <FaCar className="text-orange-500" />;
      case 'Traveller':
        return <FaUsers className="text-purple-500" />;
      default:
        return <FaUsers className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'text-green-600 bg-green-100';
      case 'Pending': return 'text-yellow-600 bg-yellow-100';
      case 'Suspended': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img 
              src={user.avatar} 
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <div className="flex items-center gap-2">
                {getRoleIcon(user.role)}
                <span className="text-gray-600">{user.role}</span>
                {user.verified && <FaCheckCircle className="text-green-500" title="Verified" />}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(user.status)}`}>
              {user.status}
            </span>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <FaTimes size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Contact & Basic Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Information */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <FaEnvelope className="text-blue-500" />
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <p className="text-gray-900">{user.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <p className="text-gray-900">{user.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <p className="text-gray-900 flex items-center gap-1">
                      <FaMapMarkerAlt className="text-gray-500" />
                      {user.location}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
                    <p className="text-gray-900 font-mono">{user.id}</p>
                  </div>
                </div>
              </div>

              {/* Role-specific Information */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  {getRoleIcon(user.role)}
                  {user.role} Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {user.propertyName && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Property</label>
                      <p className="text-gray-900">{user.propertyName}</p>
                    </div>
                  )}
                  {user.vehicleType && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type</label>
                      <p className="text-gray-900">{user.vehicleType}</p>
                    </div>
                  )}
                  {user.specialties && (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Specialties</label>
                      <div className="flex flex-wrap gap-2">
                        {user.specialties.map((specialty, index) => (
                          <span key={index} className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {user.suspensionReason && (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Suspension Reason</label>
                      <p className="text-red-600">{user.suspensionReason}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Activity Timeline */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <FaCalendar className="text-purple-500" />
                  Activity Timeline
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Registered on {new Date(user.registered).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Last active on {new Date(user.lastActive).toLocaleDateString()}</span>
                  </div>
                  {user.verified && (
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-sm">Account verified</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Stats & Actions */}
            <div className="space-y-6">
              {/* Performance Stats */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Performance</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Rating:</span>
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-500" />
                      <span className="font-semibold">{user.rating}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Bookings:</span>
                    <span className="font-semibold">{user.totalBookings}</span>
                  </div>
                  {user.totalSpent && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Spent:</span>
                      <span className="font-semibold text-green-600">Rs. {user.totalSpent.toLocaleString()}</span>
                    </div>
                  )}
                  {user.totalEarned && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Earned:</span>
                      <span className="font-semibold text-green-600">Rs. {user.totalEarned.toLocaleString()}</span>
                    </div>
                  )}
                  {user.totalRevenue && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Revenue Generated:</span>
                      <span className="font-semibold text-green-600">Rs. {user.totalRevenue.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Actions</h3>
                <div className="space-y-3">
                  {user.status === 'Active' && (
                    <button
                      onClick={() => onStatusChange(user.id, 'Suspended')}
                      className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 flex items-center justify-center gap-2"
                    >
                      <FaBan /> Suspend User
                    </button>
                  )}
                  {user.status === 'Suspended' && (
                    <button
                      onClick={() => onStatusChange(user.id, 'Active')}
                      className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 flex items-center justify-center gap-2"
                    >
                      <FaCheckCircle /> Reactivate User
                    </button>
                  )}
                  {user.status === 'Pending' && (
                    <button
                      onClick={() => onStatusChange(user.id, 'Active')}
                      className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 flex items-center justify-center gap-2"
                    >
                      <FaCheckCircle /> Approve User
                    </button>
                  )}
                  <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2">
                    <FaEnvelope /> Send Message
                  </button>
                  <button className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 flex items-center justify-center gap-2">
                    <FaDownload /> Export Data
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Statistics Card Component
function UserStatsCard({ icon, title, value, change, color }) {
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

function AddUserModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Traveller',
    location: '',
    password: '',
    confirmPassword: ''
  });

  const sriLankanCities = [
    'Colombo', 'Kandy', 'Galle', 'Negombo', 'Nuwara Eliya', 'Anuradhapura', 
    'Polonnaruwa', 'Bentota', 'Ella', 'Sigiriya', 'Matale', 'Badulla',
    'Tissamaharama', 'Trincomalee', 'Jaffna', 'Batticaloa'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    onSubmit(formData);
    onClose();
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: 'Traveller',
      location: '',
      password: '',
      confirmPassword: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Add New User</h2>
            <p className="text-gray-600">Create a new user account for the platform</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="e.g., Kasun Perera"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="kasun@gmail.com"
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
                onChange={handleChange}
                required
                placeholder="+94 77 123 4567"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location *
              </label>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
              >
                <option value="">Select City</option>
                {sriLankanCities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role *
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
              >
                <option value="Traveller">Traveller</option>
                <option value="Tour Guide">Tour Guide</option>
                <option value="Hotel Manager">Hotel Manager</option>
                <option value="Vehicle Agency">Vehicle Agency</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password *
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Minimum 8 characters"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password *
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Re-enter password"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>
          <div className="mt-8 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Users() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [usersList, setUsersList] = useState(sriLankanUsers);
  const [filteredUsers, setFilteredUsers] = useState(sriLankanUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    role: 'All',
    status: 'All',
    location: 'All'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter users based on current filters
  useEffect(() => {
    let filtered = usersList;

    if (filters.search) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        user.email.toLowerCase().includes(filters.search.toLowerCase()) ||
        user.id.toLowerCase().includes(filters.search.toLowerCase()) ||
        user.phone.includes(filters.search)
      );
    }

    if (filters.role !== 'All') {
      filtered = filtered.filter(user => user.role === filters.role);
    }

    if (filters.status !== 'All') {
      filtered = filtered.filter(user => user.status === filters.status);
    }

    if (filters.location !== 'All') {
      filtered = filtered.filter(user => user.location === filters.location);
    }

    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [filters, usersList]);

  const handleAddUser = (userData) => {
    const newUser = {
      ...userData,
      id: 'TLK' + String(usersList.length + 1).padStart(3, '0'),
      status: 'Pending',
      registered: new Date().toISOString().split('T')[0],
      lastActive: new Date().toISOString().split('T')[0],
      totalBookings: 0,
      totalSpent: 0,
      rating: 0,
      verified: false,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=center'
    };
    setUsersList(prev => [newUser, ...prev]);
  };

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setIsDetailsModalOpen(true);
  };

  const handleStatusChange = (userId, newStatus) => {
    setUsersList(prev => 
      prev.map(user => 
        user.id === userId 
          ? { ...user, status: newStatus }
          : user
      )
    );
    setIsDetailsModalOpen(false);
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'Tour Guide':
        return <FaUserTie className="text-green-500" />;
      case 'Hotel Manager':
        return <FaHotel className="text-blue-500" />;
      case 'Vehicle Agency':
        return <FaCar className="text-orange-500" />;
      case 'Traveller':
        return <FaUsers className="text-purple-500" />;
      default:
        return <FaUsers className="text-gray-500" />;
    }
  };

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  // Get unique locations for filter
  const uniqueLocations = [...new Set(usersList.map(user => user.location))].sort();
  const uniqueRoles = [...new Set(usersList.map(user => user.role))].sort();

  // Statistics
  const stats = {
    total: usersList.length,
    active: usersList.filter(u => u.status === 'Active').length,
    pending: usersList.filter(u => u.status === 'Pending').length,
    suspended: usersList.filter(u => u.status === 'Suspended').length
  };

  return (
    <AdminLayout activePage="users">
      <AdminHeader 
        title="User Management" 
        subtitle="Manage and monitor user accounts across the Sri Lankan travel platform"
      />
      
      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddUser}
      />

      <UserDetailsModal
        user={selectedUser}
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedUser(null);
        }}
        onStatusChange={handleStatusChange}
      />

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <UserStatsCard
          icon={<FaUsers />}
          title="Total Users"
          value={stats.total}
          change="+12% this month"
          color="bg-blue-500"
        />
        <UserStatsCard
          icon={<FaUserCheck />}
          title="Active Users"
          value={stats.active}
          change="+8% this month"
          color="bg-green-500"
        />
        <UserStatsCard
          icon={<FaUserPlus />}
          title="Pending Approval"
          value={stats.pending}
          change="+3 new today"
          color="bg-yellow-500"
        />
        <UserStatsCard
          icon={<FaUserTimes />}
          title="Suspended"
          value={stats.suspended}
          change="-2 this month"
          color="bg-red-500"
        />
      </div>

      {/* Enhanced Filters */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500" 
              placeholder="Search by name, email, ID, or phone..."
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            />
          </div>
          <select 
            className="border rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
            value={filters.role}
            onChange={(e) => setFilters(prev => ({ ...prev, role: e.target.value }))}
          >
            <option value="All">All Roles</option>
            {uniqueRoles.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
          <select 
            className="border rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Suspended">Suspended</option>
          </select>
          <select 
            className="border rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
            value={filters.location}
            onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
          >
            <option value="All">All Locations</option>
            {uniqueLocations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 flex items-center gap-2 transition-colors"
          >
            <FaPlus /> Add User
          </button>
        </div>
      </div>

      {/* Enhanced Users Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role & Location
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Activity
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentUsers.map(user => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img 
                        src={user.avatar} 
                        alt={user.name} 
                        className="h-12 w-12 rounded-full object-cover border-2 border-gray-200"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
                          {user.name}
                          {user.verified && <FaCheckCircle className="text-green-500 text-xs" />}
                        </div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                        <div className="text-xs text-gray-400 font-mono">{user.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 mb-1">
                      {getRoleIcon(user.role)}
                      <span className="text-sm font-medium text-gray-900">{user.role}</span>
                    </div>
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <FaMapMarkerAlt className="text-gray-400" />
                      {user.location}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="flex items-center gap-1 mb-1">
                        <FaStar className="text-yellow-500 text-xs" />
                        <span className="font-medium">{user.rating}</span>
                        <span className="text-gray-500">({user.totalBookings} bookings)</span>
                      </div>
                      {user.totalSpent && (
                        <div className="text-xs text-green-600">Spent: Rs. {user.totalSpent.toLocaleString()}</div>
                      )}
                      {user.totalEarned && (
                        <div className="text-xs text-green-600">Earned: Rs. {user.totalEarned.toLocaleString()}</div>
                      )}
                      {user.totalRevenue && (
                        <div className="text-xs text-green-600">Revenue: Rs. {user.totalRevenue.toLocaleString()}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={user.status} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      Registered: {new Date(user.registered).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      Last active: {new Date(user.lastActive).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleViewDetails(user)}
                        className="text-blue-500 hover:text-blue-700 p-2 rounded"
                        title="View Details"
                      >
                        <FaEye />
                      </button>
                      <button className="text-green-500 hover:text-green-700 p-2 rounded" title="Edit">
                        <FaEdit />
                      </button>
                      <button className="text-red-500 hover:text-red-700 p-2 rounded" title="Delete">
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
            totalResults={filteredUsers.length}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </AdminLayout>
  );
}