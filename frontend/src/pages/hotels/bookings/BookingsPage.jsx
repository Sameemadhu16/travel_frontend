import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { 
  FaCalendarAlt, 
  FaHotel, 
  FaClock, 
  FaMoneyBillWave,
  FaSearch,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaExclamationCircle,
  FaExclamationTriangle,
  FaBed
} from 'react-icons/fa';
import HotelLayout from '../../../components/hotel/HotelLayout';
import { getHotelByUserDocId, getHotelById } from '../../../api/hotelService';
import { getRoomsByHotelId } from '../../../api/roomService';
import { showToastMessage } from '../../../utils/toastHelper';
import { app } from '../../../config/firebase';
import Spinner from '../../../components/Spinner';

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
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const auth = getAuth(app);
  const [hotelData, setHotelData] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [filters, setFilters] = useState({
    checkInDate: '',
    checkOutDate: '',
    branch: '',
    paymentStatus: '',
    search: ''
  });

  // Fetch hotel and room data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const currentUser = auth.currentUser;
        
        if (!currentUser) {
          showToastMessage('error', 'Please login to access bookings');
          navigate('/partner-login/step-1');
          return;
        }

        let hotel;
        
        if (hotelId) {
          hotel = await getHotelById(hotelId);
        } else {
          hotel = await getHotelByUserDocId(currentUser.uid);
        }

        if (hotel) {
          setHotelData(hotel);
          
          // Update URL with hotel ID if not present
          if (!hotelId && hotel.id) {
            navigate(`/hotel/bookings/${hotel.id}`, { replace: true });
          }

          // Fetch rooms for this hotel
          try {
            const hotelRooms = await getRoomsByHotelId(hotel.id);
            setRooms(hotelRooms || []);
          } catch (roomError) {
            console.error('Error fetching rooms:', roomError);
          }
        } else {
          showToastMessage('error', 'No hotel found for your account');
          navigate('/hotel-registration');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        showToastMessage('error', 'Failed to load booking information');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [hotelId, auth, navigate]);

  if (loading) {
    return <Spinner />;
  }

  if (!hotelData) {
    return (
      <HotelLayout>
        <div className="flex items-center justify-center h-96">
          <p className="text-content-secondary">No hotel data available</p>
        </div>
      </HotelLayout>
    );
  }

  // Sample bookings data - This will be replaced with actual API call when booking system is implemented
  const bookings = [];

  // Get available rooms to show as bookable inventory
  const availableRooms = rooms.filter(room => room.availability === true);
  const occupiedRooms = rooms.filter(room => room.availability === false);

  // Calculate summary statistics based on room data
  const stats = {
    totalBookings: occupiedRooms.length, // Currently occupied rooms as "active bookings"
    totalRevenue: rooms
      .filter(r => !r.availability) // Occupied rooms
      .reduce((sum, r) => sum + (r.pricePerNight || 0), 0)
      .toLocaleString('en-LK', { minimumFractionDigits: 2 }),
    pendingPayments: 0, // Will be implemented with booking system
    cancelledBookings: 0 // Will be implemented with booking system
  };

  // Branches array - for now just the current hotel
  const branches = hotelData ? [hotelData.hotelName] : [];

  return (
    <HotelLayout 
      activePage="bookings"
      pageTitle="Bookings"
      pageSubtitle="Manage your hotel bookings and reservations"
    >
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

        {/* Booking System Status Banner */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
          <div className="flex items-start gap-3">
            <FaExclamationTriangle className="text-yellow-600 text-xl mt-1" />
            <div>
              <h3 className="font-semibold text-yellow-900 mb-2">Booking System Coming Soon</h3>
              <p className="text-yellow-800 text-sm mb-3">
                The booking management system is currently under development. Below you can see your room inventory status.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="bg-white rounded-lg p-4 border border-yellow-100">
                  <p className="text-sm text-gray-600 mb-1">Total Rooms</p>
                  <p className="text-2xl font-bold text-gray-900">{rooms.length}</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-yellow-100">
                  <p className="text-sm text-gray-600 mb-1">Currently Occupied</p>
                  <p className="text-2xl font-bold text-orange-600">{occupiedRooms.length}</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-yellow-100">
                  <p className="text-sm text-gray-600 mb-1">Available Now</p>
                  <p className="text-2xl font-bold text-green-600">{availableRooms.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Room Inventory Display */}
        {rooms.length > 0 ? (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Room Inventory</h3>
            {rooms.map((room, index) => (
              <div key={room.id || index} className="bg-white rounded-lg border p-6 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <h4 className="text-xl font-semibold text-gray-900">{room.roomType}</h4>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        room.availability 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        {room.availability ? 'Available' : 'Occupied'}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-2">{room.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-brand-primary">
                      Rs. {room.pricePerNight?.toLocaleString('en-LK')}
                    </p>
                    <p className="text-sm text-gray-500">per night</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                  <div>
                    <p className="text-sm text-gray-500">Max Guests</p>
                    <p className="font-medium">{room.maxGuests} persons</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Bed Type</p>
                    <p className="font-medium">{room.bedTypes}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Amenities</p>
                    <p className="font-medium">{room.amenities?.length || 0} available</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Room ID</p>
                    <p className="font-medium">#{room.id}</p>
                  </div>
                </div>

                {room.amenities && room.amenities.length > 0 && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-gray-500 mb-2">Room Amenities:</p>
                    <div className="flex flex-wrap gap-2">
                      {room.amenities.map((amenity, idx) => (
                        <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <FaBed className="text-gray-400 text-5xl mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Rooms Found</h3>
            <p className="text-gray-600 mb-4">Add rooms to your hotel to start managing bookings.</p>
            <button
              onClick={() => navigate(`/hotel/rooms/${hotelData.id}`)}
              className="px-6 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-secondary transition-colors"
            >
              Add Rooms
            </button>
          </div>
        )}

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
