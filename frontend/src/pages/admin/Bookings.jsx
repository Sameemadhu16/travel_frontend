import { useState, useEffect } from 'react';
import { FaCalendarCheck, FaSearch, FaFilter, FaEye, FaEdit, FaTrash, FaHotel, FaCar, FaUserTie, FaRoute, FaCalendar, FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaTimes, FaCheck, FaDollarSign, FaClock, FaUsers } from 'react-icons/fa';
import AdminLayout from '../../components/admin/AdminLayout';
import AdminHeader from '../../components/admin/AdminHeader';
import StatusBadge from '../../components/admin/StatusBadge';
import Pagination from '../../components/admin/Pagination';

// Mock data for Sri Lankan bookings
const mockBookings = [
  {
    id: 'BK-001',
    bookingNumber: 'TLK2024001',
    customerName: 'Kasun Perera',
    customerEmail: 'kasun.perera@email.lk',
    customerPhone: '+94 77 123 4567',
    customerLocation: 'Colombo',
    serviceType: 'Hotel',
    serviceName: 'Cinnamon Grand Colombo',
    serviceDetails: 'Deluxe Room with City View',
    checkInDate: '2024-11-20',
    checkOutDate: '2024-11-23',
    duration: '3 nights',
    guests: 2,
    totalAmount: 145000,
    paidAmount: 145000,
    bookingDate: '2024-10-15',
    status: 'Confirmed',
    paymentStatus: 'Paid',
    specialRequests: ['Airport pickup', 'Late checkout'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=center'
  },
  {
    id: 'BK-002',
    bookingNumber: 'TLK2024002',
    customerName: 'Nirmala Silva',
    customerEmail: 'nirmala.silva@gmail.com',
    customerPhone: '+94 71 987 6543',
    customerLocation: 'Kandy',
    serviceType: 'Tour Package',
    serviceName: 'Cultural Triangle Explorer',
    serviceDetails: '7-day Cultural Heritage Tour',
    checkInDate: '2024-12-05',
    checkOutDate: '2024-12-12',
    duration: '7 days',
    guests: 4,
    totalAmount: 280000,
    paidAmount: 140000,
    bookingDate: '2024-10-12',
    status: 'Pending',
    paymentStatus: 'Partial',
    specialRequests: ['Vegetarian meals', 'English-speaking guide'],
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=center'
  },
  {
    id: 'BK-003',
    bookingNumber: 'TLK2024003',
    customerName: 'Chaminda Fernando',
    customerEmail: 'chaminda@rentals.lk',
    customerPhone: '+94 76 555 7890',
    customerLocation: 'Negombo',
    serviceType: 'Vehicle',
    serviceName: 'Toyota Hiace Van Rental',
    serviceDetails: '15-seater van with driver',
    checkInDate: '2024-11-25',
    checkOutDate: '2024-11-30',
    duration: '5 days',
    guests: 12,
    totalAmount: 75000,
    paidAmount: 75000,
    bookingDate: '2024-10-18',
    status: 'Completed',
    paymentStatus: 'Paid',
    specialRequests: ['Airport transfers', 'Hill country tours'],
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=center'
  },
  {
    id: 'BK-004',
    bookingNumber: 'TLK2024004',
    customerName: 'Priya Jayawardena',
    customerEmail: 'priya.j@tours.lk',
    customerPhone: '+94 81 234 5678',
    customerLocation: 'Matale',
    serviceType: 'Guide Service',
    serviceName: 'Cultural Heritage Guide',
    serviceDetails: 'Licensed tour guide for 3 days',
    checkInDate: '2024-11-15',
    checkOutDate: '2024-11-18',
    duration: '3 days',
    guests: 6,
    totalAmount: 45000,
    paidAmount: 45000,
    bookingDate: '2024-10-14',
    status: 'Confirmed',
    paymentStatus: 'Paid',
    specialRequests: ['Temple protocols', 'Photography assistance'],
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b4e8e4f8?w=100&h=100&fit=crop&crop=center'
  },
  {
    id: 'BK-005',
    bookingNumber: 'TLK2024005',
    customerName: 'Roshan Wickramasinghe',
    customerEmail: 'roshan@hotel.lk',
    customerPhone: '+94 52 222 3456',
    customerLocation: 'Nuwara Eliya',
    serviceType: 'Hotel',
    serviceName: 'Tea Hills Resort',
    serviceDetails: 'Mountain View Suite',
    checkInDate: '2024-12-01',
    checkOutDate: '2024-12-05',
    duration: '4 nights',
    guests: 2,
    totalAmount: 120000,
    paidAmount: 60000,
    bookingDate: '2024-10-16',
    status: 'Pending',
    paymentStatus: 'Partial',
    specialRequests: ['Honeymoon package', 'Room decoration'],
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=center'
  },
  {
    id: 'BK-006',
    bookingNumber: 'TLK2024006',
    customerName: 'Malini Rathnayake',
    customerEmail: 'malini@wellness.lk',
    customerPhone: '+94 31 227 8901',
    customerLocation: 'Bentota',
    serviceType: 'Tour Package',
    serviceName: 'Ayurveda Wellness Retreat',
    serviceDetails: '14-day wellness program',
    checkInDate: '2024-11-28',
    checkOutDate: '2024-12-12',
    duration: '14 days',
    guests: 1,
    totalAmount: 350000,
    paidAmount: 350000,
    bookingDate: '2024-10-10',
    status: 'Confirmed',
    paymentStatus: 'Paid',
    specialRequests: ['Dietary restrictions', 'Morning yoga sessions'],
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=center'
  },
  {
    id: 'BK-007',
    bookingNumber: 'TLK2024007',
    customerName: 'Thilina Gunasekara',
    customerEmail: 'thilina@safari.lk',
    customerPhone: '+94 47 223 9876',
    customerLocation: 'Tissamaharama',
    serviceType: 'Vehicle',
    serviceName: 'Safari Jeep - Yala National Park',
    serviceDetails: 'Modified jeep with tracker',
    checkInDate: '2024-11-22',
    checkOutDate: '2024-11-24',
    duration: '2 days',
    guests: 4,
    totalAmount: 35000,
    paidAmount: 0,
    bookingDate: '2024-10-17',
    status: 'Cancelled',
    paymentStatus: 'Refunded',
    specialRequests: ['Early morning safari', 'Wildlife photography'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=center'
  },
  {
    id: 'BK-008',
    bookingNumber: 'TLK2024008',
    customerName: 'Sandani Perera',
    customerEmail: 'sandani@beach.lk',
    customerPhone: '+94 91 438 5672',
    customerLocation: 'Galle',
    serviceType: 'Hotel',
    serviceName: 'Fortress Resort & Spa',
    serviceDetails: 'Ocean View Villa',
    checkInDate: '2024-12-15',
    checkOutDate: '2024-12-18',
    duration: '3 nights',
    guests: 2,
    totalAmount: 195000,
    paidAmount: 97500,
    bookingDate: '2024-10-13',
    status: 'Pending',
    paymentStatus: 'Partial',
    specialRequests: ['Beach access', 'Spa treatments'],
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b4e8e4f8?w=100&h=100&fit=crop&crop=center'
  },
  {
    id: 'BK-009',
    bookingNumber: 'TLK2024009',
    customerName: 'Lakshan Mendis',
    customerEmail: 'lakshan@adventure.lk',
    customerPhone: '+94 66 223 4567',
    customerLocation: 'Badulla',
    serviceType: 'Guide Service',
    serviceName: 'Mountain Trekking Guide',
    serviceDetails: 'Certified mountain guide for Adam\'s Peak',
    checkInDate: '2024-12-20',
    checkOutDate: '2024-12-22',
    duration: '2 days',
    guests: 8,
    totalAmount: 60000,
    paidAmount: 60000,
    bookingDate: '2024-10-11',
    status: 'Confirmed',
    paymentStatus: 'Paid',
    specialRequests: ['Pre-dawn start', 'Safety equipment'],
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=center'
  },
  {
    id: 'BK-010',
    bookingNumber: 'TLK2024010',
    customerName: 'Dilani Karunaratne',
    customerEmail: 'dilani@spice.lk',
    customerPhone: '+94 25 222 5678',
    customerLocation: 'Anuradhapura',
    serviceType: 'Tour Package',
    serviceName: 'Spice & Culinary Tour',
    serviceDetails: '5-day cooking and spice garden tour',
    checkInDate: '2024-12-10',
    checkOutDate: '2024-12-15',
    duration: '5 days',
    guests: 3,
    totalAmount: 150000,
    paidAmount: 150000,
    bookingDate: '2024-10-09',
    status: 'Completed',
    paymentStatus: 'Paid',
    specialRequests: ['Cooking classes', 'Market tours'],
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=center'
  }
];

// Booking Details Modal Component
function BookingDetailsModal({ booking, isOpen, onClose, onStatusChange }) {
  if (!isOpen || !booking) return null;

  const getServiceIcon = (serviceType) => {
    switch (serviceType) {
      case 'Hotel': return <FaHotel className="text-blue-500" />;
      case 'Vehicle': return <FaCar className="text-orange-500" />;
      case 'Guide Service': return <FaUserTie className="text-green-500" />;
      case 'Tour Package': return <FaRoute className="text-purple-500" />;
      default: return <FaCalendarCheck className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed': return 'text-green-600 bg-green-100';
      case 'Pending': return 'text-yellow-600 bg-yellow-100';
      case 'Completed': return 'text-blue-600 bg-blue-100';
      case 'Cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'Paid': return 'text-green-600 bg-green-100';
      case 'Partial': return 'text-yellow-600 bg-yellow-100';
      case 'Pending': return 'text-orange-600 bg-orange-100';
      case 'Refunded': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            {getServiceIcon(booking.serviceType)}
            <div>
              <h2 className="text-2xl font-bold">{booking.serviceName}</h2>
              <p className="text-gray-600">Booking #{booking.bookingNumber}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
              {booking.status}
            </span>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <FaTimes size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Booking Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Service Information */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  {getServiceIcon(booking.serviceType)}
                  Service Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
                    <p className="text-gray-900">{booking.serviceType}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Service Name</label>
                    <p className="text-gray-900">{booking.serviceName}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Service Details</label>
                    <p className="text-gray-900">{booking.serviceDetails}</p>
                  </div>
                </div>
              </div>

              {/* Booking Information */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <FaCalendar className="text-orange-500" />
                  Booking Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Check-in Date</label>
                    <p className="text-gray-900">{new Date(booking.checkInDate).toLocaleDateString('en-US', { 
                      year: 'numeric', month: 'long', day: 'numeric' 
                    })}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Check-out Date</label>
                    <p className="text-gray-900">{new Date(booking.checkOutDate).toLocaleDateString('en-US', { 
                      year: 'numeric', month: 'long', day: 'numeric' 
                    })}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                    <p className="text-gray-900">{booking.duration}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
                    <p className="text-gray-900 flex items-center gap-1">
                      <FaUsers className="text-gray-500" />
                      {booking.guests} {booking.guests === 1 ? 'guest' : 'guests'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Booking Date</label>
                    <p className="text-gray-600">{new Date(booking.bookingDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              {/* Special Requests */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Special Requests</h3>
                <div className="space-y-2">
                  {booking.specialRequests.map((request, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <FaCheck className="text-green-500 text-sm" />
                      <span className="text-gray-700">{request}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Customer & Payment */}
            <div className="space-y-6">
              {/* Customer Information */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <FaUser className="text-purple-500" />
                  Customer Details
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={booking.avatar} 
                      alt={booking.customerName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium">{booking.customerName}</p>
                      <p className="text-sm text-gray-600">{booking.customerLocation}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <FaEnvelope className="text-gray-400" />
                      <span className="text-sm">{booking.customerEmail}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaPhone className="text-gray-400" />
                      <span className="text-sm">{booking.customerPhone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-gray-400" />
                      <span className="text-sm">{booking.customerLocation}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <FaDollarSign className="text-green-500" />
                  Payment Details
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="font-semibold">Rs. {booking.totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Paid Amount:</span>
                    <span className="font-semibold text-green-600">Rs. {booking.paidAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Outstanding:</span>
                    <span className="font-semibold text-red-600">Rs. {(booking.totalAmount - booking.paidAmount).toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Payment Status:</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getPaymentStatusColor(booking.paymentStatus)}`}>
                        {booking.paymentStatus}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Actions</h3>
                <div className="space-y-3">
                  {booking.status === 'Pending' && (
                    <button
                      onClick={() => onStatusChange(booking.id, 'Confirmed')}
                      className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 flex items-center justify-center gap-2"
                    >
                      <FaCheck /> Confirm Booking
                    </button>
                  )}
                  {booking.status === 'Confirmed' && (
                    <button
                      onClick={() => onStatusChange(booking.id, 'Completed')}
                      className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2"
                    >
                      <FaCheck /> Mark as Completed
                    </button>
                  )}
                  {(booking.status === 'Pending' || booking.status === 'Confirmed') && (
                    <button
                      onClick={() => onStatusChange(booking.id, 'Cancelled')}
                      className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 flex items-center justify-center gap-2"
                    >
                      <FaTimes /> Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BookingCard({ icon, label, value, change, color }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{label}</p>
          <p className="text-3xl font-bold">{value}</p>
          <p className="text-sm text-green-500">{change}</p>
        </div>
        <div className={`w-12 h-12 flex items-center justify-center rounded-full text-white ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

export default function Bookings() {
  const [bookings, setBookings] = useState(mockBookings);
  const [filteredBookings, setFilteredBookings] = useState(mockBookings);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    status: 'All',
    serviceType: 'All',
    paymentStatus: 'All'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter bookings based on current filters
  useEffect(() => {
    let filtered = bookings;

    if (filters.search) {
      filtered = filtered.filter(booking => 
        booking.customerName.toLowerCase().includes(filters.search.toLowerCase()) ||
        booking.bookingNumber.toLowerCase().includes(filters.search.toLowerCase()) ||
        booking.serviceName.toLowerCase().includes(filters.search.toLowerCase()) ||
        booking.customerEmail.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.status !== 'All') {
      filtered = filtered.filter(booking => booking.status === filters.status);
    }

    if (filters.serviceType !== 'All') {
      filtered = filtered.filter(booking => booking.serviceType === filters.serviceType);
    }

    if (filters.paymentStatus !== 'All') {
      filtered = filtered.filter(booking => booking.paymentStatus === filters.paymentStatus);
    }

    setFilteredBookings(filtered);
    setCurrentPage(1);
  }, [filters, bookings]);

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleStatusChange = (bookingId, newStatus) => {
    setBookings(prev => 
      prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: newStatus }
          : booking
      )
    );
    setIsModalOpen(false);
  };

  const getServiceIcon = (serviceType) => {
    switch (serviceType) {
      case 'Hotel': return <FaHotel className="text-blue-500" />;
      case 'Vehicle': return <FaCar className="text-orange-500" />;
      case 'Guide Service': return <FaUserTie className="text-green-500" />;
      case 'Tour Package': return <FaRoute className="text-purple-500" />;
      default: return <FaCalendarCheck className="text-gray-500" />;
    }
  };

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBookings = filteredBookings.slice(startIndex, endIndex);

  // Statistics
  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'Pending').length,
    confirmed: bookings.filter(b => b.status === 'Confirmed').length,
    completed: bookings.filter(b => b.status === 'Completed').length,
    cancelled: bookings.filter(b => b.status === 'Cancelled').length,
    totalRevenue: bookings.reduce((sum, booking) => sum + booking.paidAmount, 0)
  };

  return (
    <AdminLayout activePage="bookings">
      <AdminHeader 
        title="Bookings Management" 
        subtitle="Manage and track all bookings across the platform"
      />
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <BookingCard
          icon={<FaCalendarCheck />}
          label="Total Bookings"
          value={stats.total}
          change="+15% from last month"
          color="bg-blue-500"
        />
        <BookingCard
          icon={<FaClock />}
          label="Pending Bookings"
          value={stats.pending}
          change="+5% from last month"
          color="bg-yellow-500"
        />
        <BookingCard
          icon={<FaCheck />}
          label="Completed"
          value={stats.completed}
          change="+18% from last month"
          color="bg-green-500"
        />
        <BookingCard
          icon={<FaDollarSign />}
          label="Total Revenue"
          value={`Rs. ${(stats.totalRevenue / 1000000).toFixed(1)}M`}
          change="+22% from last month"
          color="bg-purple-500"
        />
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by customer name, booking number, or service..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
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
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <select 
            className="border rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
            value={filters.serviceType}
            onChange={(e) => setFilters(prev => ({ ...prev, serviceType: e.target.value }))}
          >
            <option value="All">All Services</option>
            <option value="Hotel">Hotels</option>
            <option value="Vehicle">Vehicles</option>
            <option value="Guide Service">Guide Services</option>
            <option value="Tour Package">Tour Packages</option>
          </select>
          <select 
            className="border rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
            value={filters.paymentStatus}
            onChange={(e) => setFilters(prev => ({ ...prev, paymentStatus: e.target.value }))}
          >
            <option value="All">All Payments</option>
            <option value="Paid">Paid</option>
            <option value="Partial">Partial</option>
            <option value="Pending">Pending</option>
            <option value="Refunded">Refunded</option>
          </select>
          <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 flex items-center gap-2">
            <FaFilter /> Apply
          </button>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Booking Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dates
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">#{booking.bookingNumber}</div>
                      <div className="text-sm text-gray-500">Booked: {new Date(booking.bookingDate).toLocaleDateString()}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={booking.avatar}
                        alt={booking.customerName}
                      />
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{booking.customerName}</div>
                        <div className="text-sm text-gray-500">{booking.customerLocation}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getServiceIcon(booking.serviceType)}
                      <div>
                        <div className="text-sm font-medium text-gray-900">{booking.serviceName}</div>
                        <div className="text-sm text-gray-500">{booking.serviceType}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{new Date(booking.checkInDate).toLocaleDateString()}</div>
                    <div className="text-sm text-gray-500">{booking.duration}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">Rs. {booking.totalAmount.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">{booking.paymentStatus}</div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={booking.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleViewDetails(booking)}
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
            totalResults={filteredBookings.length}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {/* Booking Details Modal */}
      <BookingDetailsModal
        booking={selectedBooking}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedBooking(null);
        }}
        onStatusChange={handleStatusChange}
      />
    </AdminLayout>
  );
}
