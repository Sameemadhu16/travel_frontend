import { useState, useEffect } from 'react';
import { 
  FaCalendarAlt, 
  FaHotel, 
  FaClock, 
  FaMoneyBillWave,
  FaSearch,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaEye,
  FaEdit,
  FaCheckCircle,
  FaTimes,
  FaPlus,
  FaFilter,
  FaChartBar,
  FaStar,
  FaBed,
  FaMapMarkerAlt,
  FaUsers,
  FaCreditCard,
  FaClipboardCheck,
  FaExclamationTriangle,
  FaBan,
  FaArrowUp,
  FaArrowDown,
  FaBell
} from 'react-icons/fa';
import HotelLayout from '../../../components/hotel/HotelLayout';
import AdminCard from '../../../components/admin/AdminCard';
import PrimaryButton from '../../../components/PrimaryButton';
import SecondaryButton from '../../../components/SecondaryButton';

// Ceylon Heritage Hotels Booking Status Badge
function StatusBadge({ status }) {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'Confirmed': return { color: 'bg-green-100 text-green-700 border-green-200', icon: FaCheckCircle };
      case 'Pending': return { color: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: FaClock };
      case 'Cancelled': return { color: 'bg-red-100 text-red-700 border-red-200', icon: FaBan };
      case 'Refunded': return { color: 'bg-gray-100 text-gray-700 border-gray-200', icon: FaArrowUp };
      case 'Checked-in': return { color: 'bg-blue-100 text-blue-700 border-blue-200', icon: FaHotel };
      case 'Checked-out': return { color: 'bg-purple-100 text-purple-700 border-purple-200', icon: FaClipboardCheck };
      default: return { color: 'bg-gray-100 text-gray-600 border-gray-200', icon: FaClock };
    }
  };

  const { color, icon: Icon } = getStatusConfig(status);

  return (
    <span className={`text-xs px-2 py-1 rounded-full font-medium border flex items-center gap-1 ${color}`}>
      <Icon />
      {status}
    </span>
  );
}

// Ceylon Heritage Hotels realistic booking data
const initialBookings = [
  {
    id: 1,
    bookingId: "CHH001",
    guestName: "Mr. & Mrs. Perera",
    guestEmail: "amara.perera@gmail.com",
    guestPhone: "+94 77 123 4567",
    property: "Ceylon Heritage Grand Colombo",
    roomType: "Heritage Deluxe Room",
    roomNumber: "1205",
    checkIn: "2025-10-25",
    checkOut: "2025-10-28",
    nights: 3,
    guests: "2 Adults",
    totalAmount: 127500,
    advancePayment: 63750,
    balance: 63750,
    paymentStatus: "Confirmed",
    bookingDate: "2025-10-15",
    bookingSource: "Direct Booking",
    specialRequests: "Late check-in, Ocean view room preferred",
    nationality: "Sri Lankan",
    passportNumber: "N1234567",
    rating: 4.8,
    lastUpdated: "2 hours ago"
  },
  {
    id: 2,
    bookingId: "CHH002",
    guestName: "Dr. James Wilson",
    guestEmail: "j.wilson@medicalcorp.com",
    guestPhone: "+44 20 7123 4567",
    property: "Ceylon Heritage Kandy",
    roomType: "Royal Heritage Suite",
    roomNumber: "301",
    checkIn: "2025-10-22",
    checkOut: "2025-10-26",
    nights: 4,
    guests: "2 Adults",
    totalAmount: 358000,
    advancePayment: 179000,
    balance: 179000,
    paymentStatus: "Pending",
    bookingDate: "2025-10-12",
    bookingSource: "Booking.com",
    specialRequests: "Vegetarian meals, Airport transfer required",
    nationality: "British",
    passportNumber: "GB987654321",
    rating: 4.9,
    lastUpdated: "5 hours ago"
  },
  {
    id: 3,
    bookingId: "CHH003",
    guestName: "Ms. Sakura Tanaka",
    guestEmail: "sakura.t@tokyo-design.jp",
    guestPhone: "+81 3 1234 5678",
    property: "Ceylon Heritage Galle Fort",
    roomType: "Colonial Family Room",
    roomNumber: "205",
    checkIn: "2025-10-20",
    checkOut: "2025-10-23",
    nights: 3,
    guests: "2 Adults, 1 Child",
    totalAmount: 195000,
    advancePayment: 195000,
    balance: 0,
    paymentStatus: "Confirmed",
    bookingDate: "2025-09-28",
    bookingSource: "Agoda",
    specialRequests: "Baby cot, Early check-in",
    nationality: "Japanese",
    passportNumber: "JP567891234",
    rating: 4.7,
    lastUpdated: "1 day ago"
  },
  {
    id: 4,
    bookingId: "CHH004",
    guestName: "Mr. Alexander Schmidt",
    guestEmail: "a.schmidt@berlintech.de",
    guestPhone: "+49 30 1234 5678",
    property: "Ceylon Heritage Nuwara Eliya",
    roomType: "Executive Club Room",
    roomNumber: "408",
    checkIn: "2025-10-18",
    checkOut: "2025-10-22",
    nights: 4,
    guests: "1 Adult",
    totalAmount: 234000,
    advancePayment: 117000,
    balance: 117000,
    paymentStatus: "Checked-in",
    bookingDate: "2025-10-05",
    bookingSource: "Direct Booking",
    specialRequests: "Business center access, Late checkout",
    nationality: "German",
    passportNumber: "DE789123456",
    rating: 4.6,
    lastUpdated: "30 minutes ago"
  },
  {
    id: 5,
    bookingId: "CHH005",
    guestName: "Mr. & Mrs. Anderson",
    guestEmail: "robert.anderson@usa-corp.com",
    guestPhone: "+1 555 123 4567",
    property: "Ceylon Heritage Bentota Beach",
    roomType: "Presidential Villa",
    roomNumber: "Villa 1",
    checkIn: "2025-10-30",
    checkOut: "2025-11-05",
    nights: 6,
    guests: "2 Adults",
    totalAmount: 1110000,
    advancePayment: 555000,
    balance: 555000,
    paymentStatus: "Confirmed",
    bookingDate: "2025-09-15",
    bookingSource: "Luxury Travel Agent",
    specialRequests: "Private butler, Helicopter transfer, Special anniversary dinner",
    nationality: "American",
    passportNumber: "US123456789",
    rating: 5.0,
    lastUpdated: "12 hours ago"
  },
  {
    id: 6,
    bookingId: "CHH006",
    guestName: "Dr. Priya Sharma",
    guestEmail: "priya.sharma@wellness.in",
    guestPhone: "+91 98 1234 5678",
    property: "Ceylon Heritage Sigiriya",
    roomType: "Ayurveda Wellness Room",
    roomNumber: "302",
    checkIn: "2025-10-16",
    checkOut: "2025-10-19",
    nights: 3,
    guests: "1 Adult",
    totalAmount: 217500,
    advancePayment: 108750,
    balance: 108750,
    paymentStatus: "Cancelled",
    bookingDate: "2025-09-20",
    bookingSource: "Wellness Portal",
    specialRequests: "Ayurveda treatments, Yoga sessions",
    nationality: "Indian",
    passportNumber: "IN456789123",
    rating: 4.8,
    lastUpdated: "2 days ago"
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

// Booking Details Modal Component
function BookingDetailsModal({ isOpen, onClose, booking }) {
  if (!isOpen || !booking) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Booking Details</h2>
            <p className="text-sm text-gray-600">Booking ID: {booking.bookingId} • {booking.property}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FaTimes className="text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {/* Guest Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FaUser className="text-blue-500" />
                Guest Information
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium">{booking.guestName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{booking.guestEmail}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone:</span>
                  <span className="font-medium">{booking.guestPhone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Nationality:</span>
                  <span className="font-medium">{booking.nationality}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Passport:</span>
                  <span className="font-medium">{booking.passportNumber}</span>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FaHotel className="text-orange-500" />
                Accommodation Details
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Property:</span>
                  <span className="font-medium">{booking.property}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Room Type:</span>
                  <span className="font-medium">{booking.roomType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Room Number:</span>
                  <span className="font-medium">{booking.roomNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Guests:</span>
                  <span className="font-medium">{booking.guests}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Nights:</span>
                  <span className="font-medium">{booking.nights} nights</span>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FaCalendarAlt className="text-green-500" />
                Stay Dates
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Check-in:</span>
                  <span className="font-medium">{booking.checkIn}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Check-out:</span>
                  <span className="font-medium">{booking.checkOut}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <StatusBadge status={booking.paymentStatus} />
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FaCreditCard className="text-purple-500" />
                Payment Details
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Amount:</span>
                  <span className="font-medium text-green-600">LKR {booking.totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Advance Paid:</span>
                  <span className="font-medium">LKR {booking.advancePayment.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Balance:</span>
                  <span className="font-medium text-orange-600">LKR {booking.balance.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FaChartBar className="text-gray-500" />
                Booking Info
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Booking Date:</span>
                  <span className="font-medium">{booking.bookingDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Source:</span>
                  <span className="font-medium">{booking.bookingSource}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Updated:</span>
                  <span className="font-medium">{booking.lastUpdated}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Special Requests */}
          {booking.specialRequests && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Special Requests</h3>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-gray-700">{booking.specialRequests}</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="border-t pt-6 flex gap-4 justify-end">
            <SecondaryButton
              onClick={onClose}
              className="px-6 py-2"
              text="Close"
            />
            <PrimaryButton
              className="px-6 py-2 bg-orange-500 hover:bg-orange-600"
              text="Edit Booking"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// New Booking Modal Component
function NewBookingModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const ceylonHeritageProperties = [
    'Ceylon Heritage Grand Colombo',
    'Ceylon Heritage Kandy',
    'Ceylon Heritage Galle Fort',
    'Ceylon Heritage Nuwara Eliya',
    'Ceylon Heritage Sigiriya',
    'Ceylon Heritage Bentota Beach'
  ];

  const roomTypes = [
    'Standard Room',
    'Deluxe Room',
    'Heritage Suite',
    'Royal Suite',
    'Presidential Villa'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">New Booking</h2>
            <p className="text-sm text-gray-600">Create a new reservation for Ceylon Heritage Hotels</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <FaTimes size={20} />
          </button>
        </div>

        <div className="p-6">
          <form className="space-y-6">
            {/* Guest Information */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FaUser className="text-blue-500" />
                Guest Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Guest Name</label>
                  <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Enter guest name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="guest@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input type="tel" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="+94 XX XXX XXXX" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                  <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Sri Lankan" />
                </div>
              </div>
            </div>

            {/* Booking Details */}
            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FaHotel className="text-orange-500" />
                Booking Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Property</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500">
                    <option value="">Select Property</option>
                    {ceylonHeritageProperties.map((property) => (
                      <option key={property} value={property}>{property}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500">
                    <option value="">Select Room Type</option>
                    {roomTypes.map((room) => (
                      <option key={room} value={room}>{room}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Check-in Date</label>
                  <input type="date" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Check-out Date</label>
                  <input type="date" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500">
                    <option value="1">1 Adult</option>
                    <option value="2">2 Adults</option>
                    <option value="3">2 Adults, 1 Child</option>
                    <option value="4">2 Adults, 2 Children</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount (LKR)</label>
                  <input type="number" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="150000" />
                </div>
              </div>
            </div>

            {/* Special Requests */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
              <textarea className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" rows="3" placeholder="Any special requests or notes..."></textarea>
            </div>
          </form>

          {/* Modal Actions */}
          <div className="border-t pt-6 flex gap-4 justify-end mt-6">
            <SecondaryButton
              onClick={onClose}
              className="px-6 py-2"
              text="Cancel"
            />
            <PrimaryButton
              className="px-6 py-2 bg-orange-500 hover:bg-orange-600"
              text="Create Booking"
              onClick={() => {
                alert("New booking would be created here - This feature can be implemented with backend integration");
                onClose();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Booking Card Component (Admin Style)
function BookingCard({ booking, onViewDetails, onEdit, onUpdateStatus }) {
  const getPriorityLevel = (status, balance) => {
    if (status === 'Pending' && balance > 0) return 'high';
    if (status === 'Cancelled') return 'low';
    return 'normal';
  };

  const priority = getPriorityLevel(booking.paymentStatus, booking.balance);

  return (
    <AdminCard className={`hover:shadow-lg transition-all duration-200 ${priority === 'high' ? 'border-l-4 border-l-yellow-500' : ''}`}>
      <div className="relative">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-bold text-gray-900">{booking.guestName}</h3>
              <StatusBadge status={booking.paymentStatus} />
              {priority === 'high' && (
                <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  <FaBell className="text-xs" />
                  Urgent
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <span className="font-medium">ID: {booking.bookingId}</span>
              <span className="text-gray-400">•</span>
              <FaMapMarkerAlt className="text-orange-500" />
              <span>{booking.property}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FaBed className="text-blue-500" />
              <span>{booking.roomType}</span>
              <span className="text-gray-400">•</span>
              <span>Room {booking.roomNumber}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 mb-1">
              <FaStar className="text-yellow-500 text-sm" />
              <span className="text-sm font-medium">{booking.rating}</span>
            </div>
            <p className="text-xs text-gray-500">{booking.nationality}</p>
          </div>
        </div>

        {/* Stay Details */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-3 border-y border-gray-100 mb-4">
          <div className="text-center">
            <p className="text-xs text-gray-600">Check-in</p>
            <p className="font-bold text-sm text-green-600">{booking.checkIn}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-600">Check-out</p>
            <p className="font-bold text-sm text-red-600">{booking.checkOut}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-600">Nights</p>
            <p className="font-bold text-sm text-blue-600">{booking.nights}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-600">Guests</p>
            <p className="font-bold text-sm text-gray-900">{booking.guests}</p>
          </div>
        </div>

        {/* Financial Summary */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-green-50 p-3 rounded-lg text-center">
            <p className="text-xs text-gray-600">Total Amount</p>
            <p className="font-bold text-sm text-green-600">LKR {booking.totalAmount.toLocaleString()}</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg text-center">
            <p className="text-xs text-gray-600">Advance Paid</p>
            <p className="font-bold text-sm text-blue-600">LKR {booking.advancePayment.toLocaleString()}</p>
          </div>
          <div className={`p-3 rounded-lg text-center ${booking.balance > 0 ? 'bg-orange-50' : 'bg-gray-50'}`}>
            <p className="text-xs text-gray-600">Balance</p>
            <p className={`font-bold text-sm ${booking.balance > 0 ? 'text-orange-600' : 'text-gray-600'}`}>
              LKR {booking.balance.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <FaEnvelope className="text-gray-400" />
            <span className="text-gray-700">{booking.guestEmail}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <FaPhone className="text-gray-400" />
            <span className="text-gray-700">{booking.guestPhone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <FaCalendarAlt className="text-gray-400" />
            <span className="text-gray-700">Booked: {booking.bookingDate}</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-500">via {booking.bookingSource}</span>
          </div>
        </div>

        {/* Special Requests */}
        {booking.specialRequests && (
          <div className="bg-yellow-50 p-3 rounded-lg mb-4">
            <p className="text-xs font-medium text-yellow-800 mb-1">Special Requests:</p>
            <p className="text-xs text-yellow-700">{booking.specialRequests}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <SecondaryButton 
            className="flex-1 text-sm py-2"
            text="View Details"
            onClick={() => {
              console.log('Button clicked - View Details for:', booking.bookingId);
              onViewDetails(booking);
            }}
          />
          <SecondaryButton 
            className="flex-1 text-sm py-2"
            text="Edit Booking"
            onClick={() => {
              console.log('Button clicked - Edit Booking for:', booking.bookingId);
              onEdit(booking);
            }}
          />
          {booking.paymentStatus === 'Pending' && booking.balance > 0 && (
            <PrimaryButton
              className="flex-1 text-sm py-2 bg-green-500 hover:bg-green-600"
              text="Mark Paid"
              onClick={() => onUpdateStatus(booking.id, 'Confirmed')}
            />
          )}
        </div>

        <div className="text-xs text-gray-500 text-center mt-2">
          Last updated: {booking.lastUpdated}
        </div>
      </div>
    </AdminCard>
  );
}

export default function BookingsPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterProperty, setFilterProperty] = useState('All');
  const [sortBy, setSortBy] = useState('checkIn');
  const [bookings, setBookings] = useState(initialBookings);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isNewBookingModalOpen, setIsNewBookingModalOpen] = useState(false);

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

  const ceylonHeritageProperties = [
    'All',
    'Ceylon Heritage Grand Colombo',
    'Ceylon Heritage Kandy',
    'Ceylon Heritage Galle Fort',
    'Ceylon Heritage Nuwara Eliya',
    'Ceylon Heritage Sigiriya',
    'Ceylon Heritage Bentota Beach'
  ];

  const statusOptions = ['All', 'Confirmed', 'Pending', 'Cancelled', 'Refunded', 'Checked-in', 'Checked-out'];

  // Calculate booking statistics
  const bookingStats = {
    totalBookings: bookings.length,
    totalRevenue: bookings
      .filter(b => b.paymentStatus === 'Confirmed' || b.paymentStatus === 'Checked-in' || b.paymentStatus === 'Checked-out')
      .reduce((sum, b) => sum + b.totalAmount, 0),
    pendingPayments: bookings.filter(b => b.paymentStatus === 'Pending').length,
    averageBookingValue: Math.round(bookings.reduce((sum, b) => sum + b.totalAmount, 0) / bookings.length),
    checkedInToday: bookings.filter(b => b.paymentStatus === 'Checked-in').length,
    totalBalance: bookings.reduce((sum, b) => sum + b.balance, 0),
    internationalGuests: bookings.filter(b => b.nationality !== 'Sri Lankan').length
  };

  // Filter and sort bookings
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.guestEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || booking.paymentStatus === filterStatus;
    const matchesProperty = filterProperty === 'All' || booking.property === filterProperty;
    return matchesSearch && matchesStatus && matchesProperty;
  });

  // Handle view details
  const handleViewDetails = (booking) => {
    console.log('View Details clicked for:', booking.bookingId);
    setSelectedBooking(booking);
    setIsDetailsModalOpen(true);
  };

  // Handle edit booking
  const handleEditBooking = (booking) => {
    console.log('Edit booking clicked for:', booking.bookingId);
    // Implementation for edit functionality - could open edit modal
    alert(`Edit booking functionality for ${booking.bookingId} - This feature can be implemented based on requirements`);
  };

  // Handle new booking
  const handleNewBooking = () => {
    console.log('New Booking button clicked');
    setIsNewBookingModalOpen(true);
  };

  // Handle update status
  const handleUpdateStatus = (bookingId, newStatus) => {
    setBookings(prev => 
      prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, paymentStatus: newStatus, lastUpdated: 'Just updated' }
          : booking
      )
    );
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 5000);
  };

  // Branches array - for now just the current hotel
  const branches = hotelData ? [hotelData.hotelName] : [];

  return (
    <HotelLayout>
      <div className="p-6">
        {/* Success Message */}
        {showSuccessMessage && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2">
            <FaCheckCircle />
            <span>Booking status updated successfully!</span>
          </div>
        )}

        {/* Header Section - Admin Style */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Ceylon Heritage Bookings</h1>
            <p className="text-gray-600">Comprehensive booking management for Sri Lanka's premier hotel chain with {bookingStats.totalBookings} reservations</p>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                {bookingStats.totalBookings} Total Bookings
              </span>
              <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                LKR {(bookingStats.totalRevenue / 1000000).toFixed(1)}M Revenue
              </span>
              {bookingStats.pendingPayments > 0 && (
                <span className="text-sm bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-medium animate-pulse">
                  {bookingStats.pendingPayments} Pending Payments
                </span>
              )}
            </div>
          </div>
          <div className="mt-4 lg:mt-0 text-right">
            <p className="text-sm text-gray-500">Current Time (Sri Lanka)</p>
            <p className="text-lg font-semibold text-orange-600">{currentDate} at {currentTimeStr}</p>
            <p className="text-sm text-gray-500 mt-1">Booking Management Center</p>
          </div>
        </div>

        {/* Critical Alerts */}
        {bookingStats.pendingPayments > 0 && (
          <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200 rounded-xl p-4 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FaBell className="text-yellow-600 text-xl animate-pulse" />
                <div>
                  <h3 className="font-semibold text-yellow-800">Payment Alerts: {bookingStats.pendingPayments} bookings require attention</h3>
                  <p className="text-yellow-700 text-sm">Outstanding balance: LKR {bookingStats.totalBalance.toLocaleString()} • Follow up needed</p>
                </div>
              </div>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Review Pending
              </button>
            </div>
          </div>
        )}

        {/* Enhanced Booking Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <EnhancedStatsCard
            icon={<FaCalendarAlt className="text-white" />}
            title="Total Bookings"
            value={bookingStats.totalBookings}
            change="12.5%"
            changeType="positive"
            color="bg-blue-500"
            subtitle="All properties combined"
          />
          <EnhancedStatsCard
            icon={<FaCreditCard className="text-white" />}
            title="Total Revenue"
            value={`LKR ${(bookingStats.totalRevenue / 1000000).toFixed(1)}M`}
            change="8.3%"
            changeType="positive"
            color="bg-green-500"
            subtitle="Confirmed bookings"
          />
          <EnhancedStatsCard
            icon={<FaExclamationTriangle className="text-white" />}
            title="Pending Payments"
            value={bookingStats.pendingPayments}
            change="5 new today"
            changeType="positive"
            color="bg-yellow-500"
            subtitle={`LKR ${(bookingStats.totalBalance / 1000000).toFixed(1)}M outstanding`}
          />
          <EnhancedStatsCard
            icon={<FaUsers className="text-white" />}
            title="Avg Booking Value"
            value={`LKR ${(bookingStats.averageBookingValue / 1000).toFixed(0)}K`}
            change="15.2%"
            changeType="positive"
            color="bg-purple-500"
            subtitle={`${bookingStats.internationalGuests} international guests`}
          />
        </div>

        {/* Action Header with Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Booking Management</h2>
            <p className="text-sm text-gray-600">Monitor and manage Ceylon Heritage Hotels reservations</p>
          </div>
          <div className="flex gap-3">
            <PrimaryButton 
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium text-sm"
              text="New Booking"
              onClick={handleNewBooking}
            />
            <SecondaryButton 
              className="px-4 py-2 text-sm"
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
                  placeholder="Search by booking ID, guest name, or email..."
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
                  value={filterProperty}
                  onChange={(e) => setFilterProperty(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  {ceylonHeritageProperties.map(property => (
                    <option key={property} value={property}>{property}</option>
                  ))}
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="checkIn">Sort by Check-in</option>
                  <option value="bookingDate">Sort by Booking Date</option>
                  <option value="amount">Sort by Amount</option>
                  <option value="status">Sort by Status</option>
                </select>
              </div>
            </div>
          </div>
        </AdminCard>

        {/* Bookings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {filteredBookings.map((booking) => (
            <BookingCard 
              key={booking.id} 
              booking={booking} 
              onViewDetails={handleViewDetails}
              onEdit={handleEditBooking}
              onUpdateStatus={handleUpdateStatus}
            />
          ))}
        </div>

        {/* Booking Performance Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <AdminCard>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-bold">Property Performance</h3>
                <p className="text-sm text-gray-600">Booking distribution by property</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FaHotel className="text-blue-500" />
                  <span className="text-gray-700 font-medium">Grand Colombo</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-lg">LKR 487.5K</span>
                  <p className="text-xs text-gray-500">1 booking</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FaHotel className="text-green-500" />
                  <span className="text-gray-700 font-medium">Bentota Beach</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-lg">LKR 1.11M</span>
                  <p className="text-xs text-gray-500">1 booking</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FaHotel className="text-orange-500" />
                  <span className="text-gray-700 font-medium">Other Properties</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-lg">LKR 945K</span>
                  <p className="text-xs text-gray-500">4 bookings</p>
                </div>
              </div>
            </div>
          </AdminCard>

          <AdminCard>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-bold">Guest Analytics</h3>
                <p className="text-sm text-gray-600">Booking insights and patterns</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <span className="font-medium">International Guests</span>
                <span className="font-bold text-purple-600">{bookingStats.internationalGuests}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="font-medium">Average Stay</span>
                <span className="font-bold text-blue-600">{(bookings.reduce((sum, b) => sum + b.nights, 0) / bookings.length).toFixed(1)} nights</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="font-medium">Advance Bookings</span>
                <span className="font-bold text-green-600">{bookings.filter(b => new Date(b.checkIn) > new Date()).length}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                <span className="font-medium">Total Revenue</span>
                <span className="font-bold text-yellow-600">LKR {(bookingStats.totalRevenue / 1000000).toFixed(1)}M</span>
              </div>
            </div>
          </AdminCard>
        </div>

        {/* Action Center */}
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-6 text-center">
          <h3 className="text-xl font-bold mb-2">Ceylon Heritage Booking Management</h3>
          <p className="text-gray-600 mb-6">Advanced tools for managing reservations and guest experiences</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PrimaryButton 
              className="px-8 py-3 bg-orange-500 hover:bg-orange-600"
              text="Generate Booking Report"
            />
            <SecondaryButton 
              className="px-8 py-3 border-orange-500 text-orange-700 hover:bg-orange-50"
              text="Payment Reminders"
            />
            <SecondaryButton 
              className="px-8 py-3 border-orange-500 text-orange-700 hover:bg-orange-50"
              text="Guest Communication"
            />
          </div>
        </div>

        {/* Booking Details Modal */}
        <BookingDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          booking={selectedBooking}
        />

        {/* New Booking Modal */}
        <NewBookingModal
          isOpen={isNewBookingModalOpen}
          onClose={() => setIsNewBookingModalOpen(false)}
        />
      </div>
    </HotelLayout>
  );
}
