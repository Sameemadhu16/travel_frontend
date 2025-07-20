import { useState } from 'react';
import { 
  FaCalendarAlt, 
  FaHotel, 
  FaClock, 
  FaMoneyBillWave,
  FaSearch,
  FaUser,
  FaPhone,
  FaEnvelope
} from 'react-icons/fa';
import HotelLayout from '../../../components/hotel/HotelLayout';

function StatusBadge({ status }) {
  const statusColors = {
    'Paid': 'bg-green-100 text-green-800',
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Cancelled': 'bg-red-100 text-red-800',
    'Refunded': 'bg-gray-100 text-gray-800'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[status]}`}>
      {status}
    </span>
  );
}

function FilterSection({ filters, setFilters, branches }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium mb-2">Check-in Date</label>
          <input
            type="date"
            value={filters.checkInDate}
            onChange={(e) => setFilters({...filters, checkInDate: e.target.value})}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Check-out Date</label>
          <input
            type="date"
            value={filters.checkOutDate}
            onChange={(e) => setFilters({...filters, checkOutDate: e.target.value})}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Branch Filter */}
        <div>
          <label className="block text-sm font-medium mb-2">Branch</label>
          <select 
            value={filters.branch}
            onChange={(e) => setFilters({...filters, branch: e.target.value})}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">All Branches</option>
            {branches.map(branch => (
              <option key={branch} value={branch}>{branch}</option>
            ))}
          </select>
        </div>

        {/* Payment Status */}
        <div>
          <label className="block text-sm font-medium mb-2">Payment Status</label>
          <select
            value={filters.paymentStatus}
            onChange={(e) => setFilters({...filters, paymentStatus: e.target.value})}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">All Statuses</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Refunded">Refunded</option>
          </select>
        </div>
      </div>

      {/* Search */}
      <div className="mt-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by booking ID, guest name, or contact..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={filters.search}
            onChange={(e) => setFilters({...filters, search: e.target.value})}
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>
    </div>
  );
}

function BookingCard({ booking }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold">{booking.guestName}</h3>
          <p className="text-sm text-gray-500">Booking ID: {booking.bookingId}</p>
        </div>
        <StatusBadge status={booking.paymentStatus} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        <div className="flex items-start gap-2">
          <FaHotel className="mt-1 text-gray-400" />
          <div>
            <p className="text-sm text-gray-500">Branch</p>
            <p className="font-medium">{booking.branch}</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <FaCalendarAlt className="mt-1 text-gray-400" />
          <div>
            <p className="text-sm text-gray-500">Check-in</p>
            <p className="font-medium">{booking.checkIn}</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <FaCalendarAlt className="mt-1 text-gray-400" />
          <div>
            <p className="text-sm text-gray-500">Check-out</p>
            <p className="font-medium">{booking.checkOut}</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <FaMoneyBillWave className="mt-1 text-gray-400" />
          <div>
            <p className="text-sm text-gray-500">Total Amount</p>
            <p className="font-medium">LKR {booking.totalAmount}</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <FaPhone className="mt-1 text-gray-400" />
          <div>
            <p className="text-sm text-gray-500">Contact</p>
            <p className="font-medium">{booking.contact}</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <FaEnvelope className="mt-1 text-gray-400" />
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{booking.email}</p>
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex flex-wrap gap-4 justify-between items-center">
          <div>
            <p className="text-sm font-medium">Room: {booking.roomType}</p>
            <p className="text-sm text-gray-500">Guests: {booking.guests}</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-brand-primary hover:bg-brand-primary/10 rounded-lg">
              View Details
            </button>
            {booking.paymentStatus === 'Pending' && (
              <button className="px-4 py-2 bg-brand-primary text-white rounded-lg">
                Mark as Paid
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingsPage() {
  const branches = [
    "Cinnamon Grand Colombo",
    "Cinnamon Red Colombo",
    "Cinnamon Lakeside",
    "Cinnamon Wild Yala",
    "Cinnamon Bentota Beach",
    "Trinco Blu by Cinnamon"
  ];

  const [filters, setFilters] = useState({
    checkInDate: '',
    checkOutDate: '',
    branch: '',
    paymentStatus: '',
    search: ''
  });

  // Sample bookings data - replace with API call
  const bookings = [
    {
      bookingId: "BK001",
      guestName: "John Smith",
      branch: "Cinnamon Grand Colombo",
      checkIn: "2025-07-25",
      checkOut: "2025-07-28",
      totalAmount: "135,000",
      paymentStatus: "Paid",
      roomType: "Deluxe Room",
      guests: "2 Adults",
      contact: "+94 77 123 4567",
      email: "john.smith@email.com"
    },
    {
      bookingId: "BK002",
      guestName: "Sarah Wilson",
      branch: "Cinnamon Red Colombo",
      checkIn: "2025-07-22",
      checkOut: "2025-07-24",
      totalAmount: "50,000",
      paymentStatus: "Pending",
      roomType: "Standard Room",
      guests: "2 Adults, 1 Child",
      contact: "+94 76 234 5678",
      email: "sarah.w@email.com"
    },
    {
      bookingId: "BK003",
      guestName: "David Brown",
      branch: "Cinnamon Lakeside",
      checkIn: "2025-07-21",
      checkOut: "2025-07-23",
      totalAmount: "70,000",
      paymentStatus: "Cancelled",
      roomType: "Executive Suite",
      guests: "2 Adults",
      contact: "+94 75 345 6789",
      email: "david.b@email.com"
    }
  ];

  // Calculate summary statistics
  const stats = {
    totalBookings: bookings.length,
    totalRevenue: bookings
      .filter(b => b.paymentStatus === 'Paid')
      .reduce((sum, b) => sum + parseInt(b.totalAmount.replace(/,/g, '')), 0)
      .toLocaleString(),
    pendingPayments: bookings.filter(b => b.paymentStatus === 'Pending').length,
    cancelledBookings: bookings.filter(b => b.paymentStatus === 'Cancelled').length
  };

  return (
    <HotelLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Bookings</h1>
          <p className="text-gray-600">Manage your hotel bookings and reservations</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-gray-500 mb-2">Total Bookings</h3>
            <p className="text-2xl font-semibold">{stats.totalBookings}</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-gray-500 mb-2">Total Revenue</h3>
            <p className="text-2xl font-semibold">LKR {stats.totalRevenue}</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-gray-500 mb-2">Pending Payments</h3>
            <p className="text-2xl font-semibold text-yellow-600">{stats.pendingPayments}</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-gray-500 mb-2">Cancelled Bookings</h3>
            <p className="text-2xl font-semibold text-red-600">{stats.cancelledBookings}</p>
          </div>
        </div>

        {/* Filters */}
        <FilterSection 
          filters={filters} 
          setFilters={setFilters}
          branches={branches}
        />

        {/* Bookings List */}
        <div className="space-y-6">
          {bookings.map((booking, index) => (
            <BookingCard key={index} booking={booking} />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-center">
          <nav className="flex items-center gap-2">
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">Previous</button>
            <button className="px-4 py-2 bg-brand-primary text-white rounded-lg">1</button>
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">2</button>
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">3</button>
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">Next</button>
          </nav>
        </div>
      </div>
    </HotelLayout>
  );
}
