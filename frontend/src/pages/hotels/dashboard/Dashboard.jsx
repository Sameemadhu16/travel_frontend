import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { 
  FaBed, FaCalendarCheck, FaStar, FaWallet, FaClock, FaCog
} from 'react-icons/fa';
import HotelLayout from '../../../components/hotel/HotelLayout';
import { getHotelByUserDocId, getHotelById } from '../../../api/hotelService';
import { getRoomsByHotelId } from '../../../api/roomService';
import { showToastMessage } from '../../../utils/toastHelper';
import { app } from '../../../config/firebase';
import Spinner from '../../../components/Spinner';

function DashboardMetricCard({ icon, label, value, subValue, color }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex items-center gap-4 mb-4">
        <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center text-white`}>
          {icon}
        </div>
        <div>
          <h3 className="text-content-secondary">{label}</h3>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
      </div>
      {subValue && (
        <p className="text-sm text-content-secondary">{subValue}</p>
      )}
    </div>
  );
}

export default function HotelDashboard() {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const auth = getAuth(app);
  const [hotelData, setHotelData] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRooms: 0,
    occupiedRooms: 0,
    availableRooms: 0,
    maintenanceRooms: 0,
    todayBookings: 0,
    monthlyRevenue: 0,
    averageRating: 0,
    totalReviews: 0
  });
  const [todaySchedule, setTodaySchedule] = useState([]);

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        setLoading(true);
        const currentUser = auth.currentUser;
        
        if (!currentUser) {
          showToastMessage('error', 'Please login to access hotel dashboard');
          navigate('/partner-login/step-1');
          return;
        }

        let hotel;
        
        if (hotelId) {
          // If hotelId is in URL, fetch by ID
          hotel = await getHotelById(hotelId);
        } else {
          // Otherwise, fetch by user's Firebase UID
          hotel = await getHotelByUserDocId(currentUser.uid);
        }

        if (hotel) {
          setHotelData(hotel);
          // Update URL with hotel ID if not present
          if (!hotelId && hotel.id) {
            navigate(`/hotel/dashboard/${hotel.id}`, { replace: true });
          }

          // Fetch rooms for this hotel
          try {
            const hotelRooms = await getRoomsByHotelId(hotel.id);
            setRooms(hotelRooms || []);

            // Calculate room statistics
            const occupied = hotelRooms.filter(r => r.availability === false).length;
            const available = hotelRooms.filter(r => r.availability === true).length;
            
            setStats(prev => ({
              ...prev,
              totalRooms: hotelRooms.length,
              occupiedRooms: occupied,
              availableRooms: available,
              maintenanceRooms: 0 // TODO: Add maintenance status to room model
            }));

            // Generate today's schedule based on room status
            // Note: This is a simplified version. Replace with actual booking data when booking system is implemented
            const schedule = [];
            const currentHour = new Date().getHours();
            
            // Add check-in schedules (occupied rooms)
            hotelRooms.filter(r => !r.availability).slice(0, 3).forEach((room, index) => {
              schedule.push({
                id: `checkin-${room.id}`,
                type: 'check-in',
                roomType: room.roomType,
                roomId: room.id,
                time: `${14 + index}:00`, // Sample check-in times starting from 2 PM
                status: currentHour >= (14 + index) ? 'completed' : 'upcoming',
                guestName: 'Guest', // Placeholder - will be replaced with real booking data
              });
            });

            // Add check-out schedules (occupied rooms)
            hotelRooms.filter(r => !r.availability).slice(0, 2).forEach((room, index) => {
              schedule.push({
                id: `checkout-${room.id}`,
                type: 'check-out',
                roomType: room.roomType,
                roomId: room.id,
                time: `${10 + index}:00`, // Sample check-out times starting from 10 AM
                status: currentHour >= (10 + index) ? 'completed' : 'upcoming',
                guestName: 'Guest', // Placeholder
              });
            });

            // Add cleaning schedules
            if (hotelRooms.length > 0) {
              schedule.push({
                id: 'cleaning-1',
                type: 'cleaning',
                roomType: 'Multiple Rooms',
                time: '13:00',
                status: currentHour >= 13 ? 'completed' : 'upcoming',
                details: `Rooms ${hotelRooms.slice(0, 3).map(r => r.id).join(', ')}`
              });
            }

            // Sort schedule by time
            schedule.sort((a, b) => {
              const timeA = parseInt(a.time.split(':')[0]);
              const timeB = parseInt(b.time.split(':')[0]);
              return timeA - timeB;
            });

            setTodaySchedule(schedule);
          } catch (roomError) {
            console.error('Error fetching rooms:', roomError);
            // Continue even if rooms fail to load
          }
        } else {
          showToastMessage('error', 'No hotel found for your account. Please register your hotel first.');
          navigate('/hotel-registration');
        }
      } catch (error) {
        console.error('Error fetching hotel data:', error);
        showToastMessage('error', 'Failed to load hotel information');
      } finally {
        setLoading(false);
      }
    };

    fetchHotelData();
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

  return (
    <HotelLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">{hotelData.hotelName || 'Hotel Dashboard'}</h1>
          <p className="text-content-secondary">Welcome back! Here&apos;s what&apos;s happening with your hotel today.</p>
          {hotelData.isVerified ? (
            <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              ✓ Verified Hotel
            </span>
          ) : (
            <span className="inline-block mt-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
              ⏳ Pending Verification
            </span>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <DashboardMetricCard
            icon={<FaBed />}
            label="Total Rooms"
            value={stats.totalRooms.toString()}
            subValue={`${stats.occupiedRooms} Occupied, ${stats.availableRooms} Available`}
            color="bg-brand-primary"
          />
          <DashboardMetricCard
            icon={<FaCalendarCheck />}
            label="Today&apos;s Bookings"
            value={stats.todayBookings.toString()}
            subValue="Booking system coming soon"
            color="bg-green-500"
          />
          <DashboardMetricCard
            icon={<FaWallet />}
            label="Revenue (This Month)"
            value={`LKR ${stats.monthlyRevenue.toLocaleString()}`}
            subValue="Booking system coming soon"
            color="bg-blue-500"
          />
          <DashboardMetricCard
            icon={<FaStar />}
            label="Average Rating"
            value={stats.averageRating > 0 ? stats.averageRating.toFixed(1) : 'N/A'}
            subValue={stats.totalReviews > 0 ? `From ${stats.totalReviews} reviews` : 'No reviews yet'}
            color="bg-yellow-500"
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Bookings */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold">Recent Bookings</h2>
              </div>
              <div className="p-8 text-center text-content-secondary">
                <FaCalendarCheck className="text-4xl mx-auto mb-3 opacity-50" />
                <p>Booking system coming soon!</p>
                <p className="text-sm mt-2">Recent hotel bookings will appear here.</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <button 
                onClick={() => navigate(`/hotel/rooms/${hotelData.id}`)}
                className="p-4 bg-white rounded-xl shadow text-center hover:bg-gray-50 transition"
              >
                <FaBed className="text-2xl text-brand-primary mx-auto mb-2" />
                <span className="text-sm font-medium">Manage Rooms</span>
              </button>
              <button 
                onClick={() => navigate(`/hotel/bookings/${hotelData.id}`)}
                className="p-4 bg-white rounded-xl shadow text-center hover:bg-gray-50 transition"
              >
                <FaCalendarCheck className="text-2xl text-green-500 mx-auto mb-2" />
                <span className="text-sm font-medium">View Bookings</span>
              </button>
              <button 
                onClick={() => navigate(`/hotel/settings/${hotelData.id}`)}
                className="p-4 bg-white rounded-xl shadow text-center hover:bg-gray-50 transition"
              >
                <FaCog className="text-2xl text-blue-500 mx-auto mb-2" />
                <span className="text-sm font-medium">Hotel Settings</span>
              </button>
            </div>
          </div>

          {/* Room Status */}
          <div className="bg-white rounded-xl shadow">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Room Status</h2>
            </div>
            <div className="p-4">
              {rooms.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                    {rooms.slice(0, 10).map((room) => (
                      <div key={room.id} className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-3 h-3 rounded-full ${
                            !room.availability ? 'bg-red-500' : 'bg-green-500'
                          }`} />
                          <h4 className="font-medium">{room.roomType}</h4>
                        </div>
                        <p className="text-sm text-content-secondary mb-1">
                          Max Guests: {room.maxGuests}
                        </p>
                        <p className="text-sm font-medium text-brand-primary">
                          LKR {room.pricePerNight?.toLocaleString()}/night
                        </p>
                        <p className="text-xs text-content-secondary mt-1">
                          {room.availability ? '✓ Available' : '✗ Occupied'}
                        </p>
                      </div>
                    ))}
                  </div>
                  {rooms.length > 10 && (
                    <p className="text-sm text-content-secondary mt-2 text-center">
                      Showing 10 of {rooms.length} rooms
                    </p>
                  )}
                </>
              ) : (
                <p className="text-content-secondary text-center py-8">
                  No rooms added yet. Add your first room to get started!
                </p>
              )}
            </div>
            <div className="p-4 border-t text-center">
              <button 
                onClick={() => navigate(`/hotel/rooms/${hotelData.id}`)}
                className="text-brand-primary hover:underline"
              >
                {rooms.length > 0 ? 'Manage All Rooms' : 'Add Your First Room'}
              </button>
            </div>
          </div>
        </div>

        {/* Upcoming Section */}
        <div className="mt-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Today&apos;s Schedule</h2>
            <div className="space-y-4">
              {todaySchedule.length > 0 ? (
                <>
                  {todaySchedule.map((item) => (
                    <div 
                      key={item.id} 
                      className={`flex items-center gap-4 p-4 rounded-lg ${
                        item.status === 'completed' ? 'bg-gray-100' : 'bg-blue-50'
                      }`}
                    >
                      <div className="flex-shrink-0">
                        {item.type === 'check-in' && (
                          <FaCalendarCheck className={`text-2xl ${
                            item.status === 'completed' ? 'text-gray-400' : 'text-green-600'
                          }`} />
                        )}
                        {item.type === 'check-out' && (
                          <FaClock className={`text-2xl ${
                            item.status === 'completed' ? 'text-gray-400' : 'text-orange-600'
                          }`} />
                        )}
                        {item.type === 'cleaning' && (
                          <FaBed className={`text-2xl ${
                            item.status === 'completed' ? 'text-gray-400' : 'text-blue-600'
                          }`} />
                        )}
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center gap-2">
                          <p className={`font-medium ${
                            item.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-900'
                          }`}>
                            {item.type === 'check-in' && `Check-in: ${item.roomType}`}
                            {item.type === 'check-out' && `Check-out: ${item.roomType}`}
                            {item.type === 'cleaning' && `Room Cleaning: ${item.roomType}`}
                          </p>
                          {item.status === 'completed' && (
                            <span className="text-xs px-2 py-1 bg-gray-200 text-gray-600 rounded-full">
                              Completed
                            </span>
                          )}
                          {item.status === 'upcoming' && (
                            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full">
                              Scheduled
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-content-secondary mt-1">
                          {item.type === 'check-in' && `Guest: ${item.guestName} - ${item.time}`}
                          {item.type === 'check-out' && `Guest: ${item.guestName} - ${item.time}`}
                          {item.type === 'cleaning' && `${item.details} - ${item.time}`}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-medium ${
                          item.status === 'completed' ? 'text-gray-400' : 'text-brand-primary'
                        }`}>
                          {item.time}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div className="pt-4 border-t">
                    <p className="text-sm text-content-secondary text-center">
                      💡 Note: This is based on current room status. Real booking data will be shown once the booking system is implemented.
                    </p>
                  </div>
                </>
              ) : (
                <div className="p-8 text-center text-content-secondary">
                  <FaClock className="text-4xl mx-auto mb-3 opacity-50" />
                  <p>No activities scheduled for today!</p>
                  <p className="text-sm mt-2">
                    {rooms.length === 0 
                      ? 'Add rooms to your hotel to start managing schedules.'
                      : stats.occupiedRooms === 0
                      ? 'All rooms are available. Check-ins will appear here once rooms are booked.'
                      : 'Schedule data will appear here once you have bookings.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </HotelLayout>
  );
}
