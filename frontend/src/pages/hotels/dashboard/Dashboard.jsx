import { useState, useEffect } from 'react';
import { 
  FaBed, FaCalendarCheck, FaStar, FaWallet, 
  FaUsers, FaCheck, FaClock, FaArrowUp, FaArrowDown,
  FaMapMarkerAlt, FaPhone, FaEnvelope, FaEye, FaEdit,
  FaChartLine, FaHotel, FaCar, FaRoute, FaUserTie,
  FaCheckCircle, FaTimes, FaBell, FaCalendar
} from 'react-icons/fa';
import HotelLayout from '../../../components/hotel/HotelLayout';
import StatusBadge from '../../../components/admin/StatusBadge';

// Ceylon Heritage Hotels Chain - Multi-property Sri Lankan hotel data
const chainActivities = [
  {
    id: 1,
    type: 'checkin',
    guestName: 'Mr. Rajith Wickramasinghe',
    nationality: 'Sri Lanka',
    property: 'Colombo Grand',
    guestAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=center',
    action: 'VIP Local Guest Check-in',
    details: 'Presidential Suite - Wedding celebration, 3 nights',
    amount: 'LKR 675,000',
    time: '12 minutes ago',
    status: 'Checked In',
    room: 'PS-02',
    priority: 'high'
  },
  {
    id: 2,
    type: 'booking',
    guestName: 'German Tourist Group',
    nationality: 'Germany', 
    property: 'Kandy Heritage',
    guestAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=center',
    action: 'Cultural Tour Group Booking',
    details: '25 rooms - Temple of Tooth pilgrimage tour, 4 nights',
    amount: 'LKR 2,100,000',
    time: '28 minutes ago',
    status: 'Confirmed',
    room: 'Multiple',
    priority: 'high'
  },
  {
    id: 3,
    type: 'payment',
    guestName: 'Mrs. Kamani Perera',
    nationality: 'Sri Lanka',
    property: 'Galle Fort Resort',
    guestAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b4e8e4f8?w=100&h=100&fit=crop&crop=center',
    action: 'Anniversary Package Payment',
    details: 'Booking #GFR-2025-0892 - Fort View Suite + Ayurveda Spa',
    amount: 'LKR 145,000',
    time: '35 minutes ago',
    status: 'Paid',
    room: '304',
    priority: 'medium'
  },
  {
    id: 4,
    type: 'maintenance',
    guestName: 'Engineering Team',
    nationality: '',
    property: 'Nuwara Eliya Retreat',
    guestAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=center',
    action: 'Fireplace Maintenance',
    details: 'Hill Country Suites - Seasonal fireplace servicing completed',
    amount: '',
    time: '1 hour ago',
    status: 'Completed',
    room: '201-220',
    priority: 'medium'
  },
  {
    id: 5,
    type: 'checkout',
    guestName: 'Dr. Nimal Fernando Family',
    nationality: 'Sri Lanka',
    property: 'Colombo Grand',
    guestAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=center',
    action: 'Family Vacation Checkout',
    details: 'Family Suite - Colombo city tour package, 5★ feedback',
    amount: 'LKR 285,000',
    time: '1.5 hours ago',
    status: 'Completed',
    room: 'FS-12',
    priority: 'low'
  },
  {
    id: 6,
    type: 'complaint',
    guestName: 'Prof. Sumith Rathnayake',
    nationality: 'Sri Lanka',
    property: 'Kandy Heritage',
    guestAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=center',
    action: 'Service Issue - Resolved',
    details: 'Cultural show timing conflict - Rescheduled with complimentary transport',
    amount: '',
    time: '2 hours ago',
    status: 'Resolved',
    room: '156',
    priority: 'low'
  },
  {
    id: 7,
    type: 'booking',
    guestName: 'Mr. Asanka Silva',
    nationality: 'Sri Lanka',
    property: 'Galle Fort Resort',
    guestAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=center',
    action: 'Corporate Retreat Booking',
    details: 'IT Company annual retreat - 40 rooms, team building activities',
    amount: 'LKR 3,200,000',
    time: '3 hours ago',
    status: 'Confirmed',
    room: 'Multiple',
    priority: 'high'
  }
];

// Chain-wide statistics across all properties
const chainStats = {
  totalRooms: 1247, // Across all 4 properties
  occupiedRooms: 1086,
  availableRooms: 161,
  outOfOrder: 23,
  todayArrivals: 156, // All properties combined
  todayDepartures: 142,
  checkins: 148,
  checkouts: 134,
  noShows: 8,
  walkIns: 12,
  monthlyRevenue: 487500000, // LKR 487.5M chain-wide
  dailyRevenue: 15850000, // LKR 15.85M daily
  averageRating: 4.7,
  totalReviews: 8642, // Across all properties
  occupancyRate: 87.1,
  averageDailyRate: 38500, // LKR 38.5K average
  revenuePAR: 33458 // Chain-wide RevPAR
};

// Individual property data
const properties = [
  {
    name: 'Colombo Grand',
    location: 'Colombo 03',
    rooms: 485,
    occupied: 421,
    occupancyRate: 86.8,
    dailyRevenue: 6850000,
    rating: 4.8,
    status: 'Operational',
    manager: 'Ms. Dilani Wickramasinghe'
  },
  {
    name: 'Kandy Heritage',
    location: 'Kandy Lake',
    rooms: 298,
    occupied: 267,
    occupancyRate: 89.6,
    dailyRevenue: 4120000,
    rating: 4.7,
    status: 'Operational',
    manager: 'Mr. Chandana Perera'
  },
  {
    name: 'Galle Fort Resort',
    location: 'Galle Fort',
    rooms: 245,
    occupied: 215,
    occupancyRate: 87.8,
    dailyRevenue: 2980000,
    rating: 4.6,
    status: 'Operational',
    manager: 'Mrs. Priyanka Fernando'
  },
  {
    name: 'Nuwara Eliya Retreat',
    location: 'Nuwara Eliya',
    rooms: 219,
    occupied: 183,
    occupancyRate: 83.6,
    dailyRevenue: 1900000,
    rating: 4.7,
    status: 'Seasonal Peak',
    manager: 'Mr. Ruwan Jayawardena'
  }
];

const upcomingReservations = [
  
  
  {
    guestName: 'Ceylon Tea Board Delegation',
    nationality: 'Sri Lanka',
    property: 'Nuwara Eliya Retreat',
    guestAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=center',
    roomType: 'Hill Country Suites x12',
    checkIn: '2025-10-20',
    checkOut: '2025-10-22',
    nights: 2,
    amount: 576000,
    status: 'Confirmed',
    specialRequests: 'Tea plantation visits, factory tours, traditional hill country breakfast',
    bookingSource: 'Government',
    arrivalTime: '11:00',
    guestType: 'Official Delegation'
  },
  {
    guestName: 'Mr. Nuwan Kulasekara Cricket Academy',
    nationality: 'Sri Lanka',
    property: 'Colombo Grand',
    guestAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=center',
    roomType: 'Sports Team Rooms x25',
    checkIn: '2025-10-23',
    checkOut: '2025-10-26',
    nights: 3,
    amount: 1125000,
    status: 'Confirmed',
    specialRequests: 'Sports nutrition meals, gym access, cricket ground arrangements',
    bookingSource: 'Sports Authority',
    arrivalTime: '14:00',
    guestType: 'Sports Team'
  }
];

// Enhanced Statistics Card Component matching admin style
function EnhancedStatsCard({ icon, title, value, change, changeType, color, subtitle, onClick }) {
  const isPositive = changeType === 'positive';
  
  return (
    <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={onClick}>
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
    </div>
  );
}



// Activity Item Component matching admin style
function ActivityItem({ activity }) {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'checkin': return <FaCheckCircle className="text-green-500" />;
      case 'checkout': return <FaCheck className="text-blue-500" />;
      case 'booking': return <FaCalendarCheck className="text-orange-500" />;
      case 'payment': return <FaWallet className="text-purple-500" />;
      case 'maintenance': return <FaEdit className="text-yellow-500" />;
      case 'complaint': return <FaBell className="text-red-500" />;
      default: return <FaBell className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Checked In': return 'bg-green-100 text-green-700';
      case 'Confirmed': return 'bg-blue-100 text-blue-700';
      case 'Paid': return 'bg-purple-100 text-purple-700';
      case 'Available': return 'bg-yellow-100 text-yellow-700';
      case 'Completed': return 'bg-gray-100 text-gray-700';
      case 'Resolved': return 'bg-green-100 text-green-700';
      case 'Pending': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high': return <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full font-bold">HIGH</span>;
      case 'medium': return <span className="text-xs bg-yellow-500 text-white px-2 py-1 rounded-full font-bold">MED</span>;
      case 'low': return <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full font-bold">LOW</span>;
      default: return null;
    }
  };

  return (
    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div className="flex-shrink-0">
        <img 
          src={activity.guestAvatar} 
          alt={activity.guestName}
          className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          {getActivityIcon(activity.type)}
          <p className="font-semibold text-sm text-gray-900 truncate">{activity.action}</p>
        </div>
        <p className="text-gray-600 text-xs mb-1 truncate">{activity.details}</p>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <FaHotel className="text-gray-400" />
          <span>{activity.property}</span>
          <span>•</span>
          <span>Room {activity.room}</span>
          {activity.nationality && (
            <>
              <span>•</span>
              <span>{activity.nationality}</span>
            </>
          )}
          <span>•</span>
          <span>{activity.time}</span>
        </div>
      </div>
      <div className="flex-shrink-0 text-right">
        <div className="flex items-center gap-2 mb-2">
          {activity.priority && getPriorityBadge(activity.priority)}
        </div>
        {activity.amount && (
          <p className="font-bold text-sm text-gray-900 mb-1">{activity.amount}</p>
        )}
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(activity.status)}`}>
          {activity.status}
        </span>
      </div>
    </div>
  );
}





export default function HotelDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [recentActivities] = useState(chainActivities);

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



  return (
    <HotelLayout>
      <div className="p-6">
        {/* Header Section - Hotel Chain Dashboard */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Ceylon Heritage Hotels</h1>
            <p className="text-gray-600">Multi-property dashboard for Sri Lanka's premier hotel chain. Monitor operations across Colombo, Kandy, Galle, and Nuwara Eliya properties.</p>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">4 Properties Active</span>
              <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">1,247 Total Rooms</span>
              <span className="text-sm bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-medium">Premium Chain</span>
            </div>
          </div>
          <div className="mt-4 lg:mt-0 text-right">
            <p className="text-sm text-gray-500">Current Time (Sri Lanka)</p>
            <p className="text-lg font-semibold text-orange-600">{currentDate} at {currentTimeStr}</p>
            <p className="text-sm text-gray-500 mt-1">Chain-wide Operations Center</p>
          </div>
        </div>

        {/* VIP Government Alert */}
        <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FaBell className="text-red-600 text-xl animate-pulse" />
              <div>
                <h3 className="font-semibold text-red-800">VIP ALERT: Hon. Minister arriving tomorrow at Colombo Grand</h3>
                <p className="text-red-700 text-sm">Security clearance completed • Press conference hall reserved • Traditional cuisine arranged</p>
              </div>
            </div>
            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              VIP Protocol
            </button>
          </div>
        </div>

        {/* Chain-wide Operations Summary */}
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-4 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FaHotel className="text-orange-600 text-xl" />
              <div>
                <h3 className="font-semibold text-orange-800">Chain Operations: 156 arrivals, 142 departures across 4 properties</h3>
                <p className="text-orange-700 text-sm">Kandy Heritage 89.6% occupancy • Tea Board delegation in Nuwara Eliya • Cricket academy booking confirmed</p>
              </div>
            </div>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Multi-Property View
            </button>
          </div>
        </div>

        {/* Chain-wide Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <EnhancedStatsCard
            icon={<FaBed className="text-white" />}
            title="Chain Occupancy"
            value={`${chainStats.occupiedRooms}/${chainStats.totalRooms}`}
            change="4.2%"
            changeType="positive"
            color="bg-blue-500"
            subtitle={`${chainStats.occupancyRate}% • 4 properties • ${chainStats.outOfOrder} OOO`}
          />
          <EnhancedStatsCard
            icon={<FaUsers className="text-white" />}
            title="Daily Movement"
            value={`${chainStats.todayArrivals}/${chainStats.todayDepartures}`}
            change="7.3%"
            changeType="positive"
            color="bg-green-500"
            subtitle={`Chain-wide • ${chainStats.noShows} no-shows • ${chainStats.walkIns} walk-ins`}
          />
          <EnhancedStatsCard
            icon={<FaWallet className="text-white" />}
            title="Chain Revenue"
            value={`LKR ${(chainStats.dailyRevenue / 1000000).toFixed(1)}M`}
            change="12.8%"
            changeType="positive"
            color="bg-purple-500"
            subtitle={`Monthly: LKR ${(chainStats.monthlyRevenue / 1000000).toFixed(0)}M • RevPAR: ${(chainStats.revenuePAR / 1000).toFixed(0)}K`}
          />
          <EnhancedStatsCard
            icon={<FaStar className="text-white" />}
            title="Chain Rating"
            value={chainStats.averageRating}
            change="3.5%"
            changeType="positive"
            color="bg-yellow-500"
            subtitle={`${chainStats.totalReviews} reviews • Sri Lanka's premium chain`}
          />
        </div>

        {/* Property Performance Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {properties.map((property, index) => (
            <div key={index} className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-gray-900">{property.name}</h3>
                  <p className="text-sm text-gray-600">{property.location}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  property.status === 'Operational' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                }`}>
                  {property.status}
                </span>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Occupancy</span>
                  <span className="font-semibold">{property.occupancyRate}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Rooms</span>
                  <span className="font-semibold">{property.occupied}/{property.rooms}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Daily Revenue</span>
                  <span className="font-semibold text-green-600">LKR {(property.dailyRevenue / 1000000).toFixed(1)}M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Rating</span>
                  <span className="font-semibold text-yellow-600">{property.rating}★</span>
                </div>
                <div className="pt-2 border-t border-gray-100">
                  <p className="text-xs text-gray-500">Manager: {property.manager}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Recent Activities */}
          <div className="lg:col-span-2 space-y-6">
            {/* Chain-wide Recent Activities */}
            <div className="bg-white rounded-xl shadow overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Chain-wide Recent Activities</h2>
                  <button className="text-orange-500 hover:text-orange-600 text-sm font-medium">
                    View All Properties
                  </button>
                </div>
                <p className="text-sm text-gray-600 mt-1">Live updates from all Ceylon Heritage Hotels properties</p>
              </div>
              <div className="p-6 space-y-4">
                {chainActivities.map(activity => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </div>
            </div>

            {/* Hotel Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaChartLine className="text-green-500 text-2xl" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Revenue Growth</h3>
                <p className="text-3xl font-bold text-green-600 mb-2">+12.4%</p>
                <p className="text-gray-600 text-sm">vs. last month</p>
                <div className="mt-3 text-xs space-y-1">
                  <div className="flex justify-between">
                    <span>Monthly Target:</span>
                    <span className="font-medium">LKR 135M</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Achieved:</span>
                    <span className="font-medium text-green-600">LKR 128.5M</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaUsers className="text-blue-500 text-2xl" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Guest Mix</h3>
                <p className="text-3xl font-bold text-blue-600 mb-2">85%</p>
                <p className="text-gray-600 text-sm">International guests</p>
                <div className="mt-3 text-xs space-y-1">
                  <div className="flex justify-between">
                    <span>Corporate:</span>
                    <span className="font-medium">35%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Leisure:</span>
                    <span className="font-medium">50%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Groups:</span>
                    <span className="font-medium">15%</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaStar className="text-purple-500 text-2xl" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Service Index</h3>
                <p className="text-3xl font-bold text-purple-600 mb-2">92%</p>
                <p className="text-gray-600 text-sm">Overall satisfaction</p>
                <div className="mt-3 text-xs space-y-1">
                  <div className="flex justify-between">
                    <span>Check-in:</span>
                    <span className="font-medium">4.8★</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Room Service:</span>
                    <span className="font-medium">4.7★</span>
                  </div>
                  <div className="flex justify-between">
                    <span>F&B:</span>
                    <span className="font-medium">4.6★</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Critical Operations Quick Actions */}
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Critical Operations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button className="p-4 bg-red-50 border border-red-200 rounded-lg text-center hover:bg-red-100 transition-colors relative">
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <FaBell className="text-2xl text-red-500 mx-auto mb-2" />
                  <span className="text-sm font-medium text-red-700">VIP Arrivals</span>
                  <p className="text-xs text-red-600 mt-1">2 pending</p>
                </button>
                <button className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center hover:bg-yellow-100 transition-colors">
                  <FaEdit className="text-2xl text-yellow-500 mx-auto mb-2" />
                  <span className="text-sm font-medium text-yellow-700">Maintenance</span>
                  <p className="text-xs text-yellow-600 mt-1">8 OOO rooms</p>
                </button>
                <button className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-center hover:bg-blue-100 transition-colors">
                  <FaUsers className="text-2xl text-blue-500 mx-auto mb-2" />
                  <span className="text-sm font-medium text-blue-700">Group Check-in</span>
                  <p className="text-xs text-blue-600 mt-1">15 rooms ready</p>
                </button>
                <button className="p-4 bg-purple-50 border border-purple-200 rounded-lg text-center hover:bg-purple-100 transition-colors">
                  <FaWallet className="text-2xl text-purple-500 mx-auto mb-2" />
                  <span className="text-sm font-medium text-purple-700">Payment Issues</span>
                  <p className="text-xs text-purple-600 mt-1">3 to resolve</p>
                </button>
              </div>
            </div>

            {/* Standard Operations */}
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Standard Operations</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button className="p-3 bg-gray-50 rounded-lg text-center hover:bg-gray-100 transition-colors">
                  <FaCalendarCheck className="text-xl text-gray-600 mx-auto mb-1" />
                  <span className="text-xs font-medium text-gray-700">Walk-in</span>
                </button>
                <button className="p-3 bg-gray-50 rounded-lg text-center hover:bg-gray-100 transition-colors">
                  <FaCheckCircle className="text-xl text-gray-600 mx-auto mb-1" />
                  <span className="text-xs font-medium text-gray-700">Express C/O</span>
                </button>
                <button className="p-3 bg-gray-50 rounded-lg text-center hover:bg-gray-100 transition-colors">
                  <FaPhone className="text-xl text-gray-600 mx-auto mb-1" />
                  <span className="text-xs font-medium text-gray-700">Wake-up Call</span>
                </button>
                <button className="p-3 bg-gray-50 rounded-lg text-center hover:bg-gray-100 transition-colors">
                  <FaCar className="text-xl text-gray-600 mx-auto mb-1" />
                  <span className="text-xs font-medium text-gray-700">Transport</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Room Status & Upcoming */}
          <div className="space-y-6">
            {/* Real-time Room Status */}
            <div className="bg-white rounded-xl shadow overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Live Room Status</h2>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Real-time</span>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{chainStats.availableRooms}</div>
                    <div className="text-sm text-gray-600">Clean & Ready</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{chainStats.occupiedRooms}</div>
                    <div className="text-sm text-gray-600">Occupied</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
                  <div className="text-center p-2 bg-red-50 rounded">
                    <div className="font-bold text-red-600">{chainStats.outOfOrder}</div>
                    <div className="text-red-600">Out of Order</div>
                  </div>
                  <div className="text-center p-2 bg-yellow-50 rounded">
                    <div className="font-bold text-yellow-600">12</div>
                    <div className="text-yellow-600">Housekeeping</div>
                  </div>
                  <div className="text-center p-2 bg-purple-50 rounded">
                    <div className="font-bold text-purple-600">6</div>
                    <div className="text-purple-600">Maintenance</div>
                  </div>
                </div>

                {/* Room Type Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm font-medium">Presidential Suite</span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">1/1</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm font-medium">Ocean View Suites</span>
                    <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">18/24</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm font-medium">Business Executive</span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">156/180</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm font-medium">Standard Rooms</span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">257/293</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Reservations */}
            <div className="bg-white rounded-xl shadow overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">Upcoming Reservations</h2>
              </div>
              <div className="p-6 space-y-4">
                {upcomingReservations.map((reservation, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="relative">
                        <img 
                          src={reservation.guestAvatar} 
                          alt={reservation.guestName}
                          className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">{reservation.nights}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-gray-900">{reservation.guestName}</h4>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{reservation.nationality}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{reservation.roomType}</p>
                        <div className="flex items-center gap-2">
                          <StatusBadge status={reservation.status} />
                          <span className="text-xs text-gray-500">{reservation.guestType}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-sm space-y-2 bg-gray-50 p-3 rounded-lg">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Property:</span>
                        <span className="text-gray-900 font-medium">{reservation.property}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Arrival:</span>
                        <span className="text-gray-900 font-medium">{reservation.checkIn} at {reservation.arrivalTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Duration:</span>
                        <span className="text-gray-900 font-medium">{reservation.nights} nights</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Revenue:</span>
                        <span className="font-bold text-green-600">LKR {reservation.amount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Source:</span>
                        <span className="text-gray-900 font-medium">{reservation.bookingSource}</span>
                      </div>
                      
                      {reservation.specialRequests && (
                        <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded text-xs">
                          <div className="flex items-start gap-2">
                            <FaBell className="text-blue-500 mt-0.5 flex-shrink-0" />
                            <div>
                              <strong className="text-blue-800">Special Requests:</strong>
                              <p className="text-blue-700 mt-1">{reservation.specialRequests}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Today's Schedule - Enhanced */}
        <div className="mt-8">
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Today's Schedule</h2>
                <div className="text-sm text-gray-500">
                  {currentDate} • {upcomingReservations.length + 3} events scheduled
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <FaCheckCircle className="text-blue-500 text-xl" />
                    <div>
                      <p className="font-semibold text-blue-900">Check-in: Room 204</p>
                      <p className="text-sm text-blue-700">Guest: David Miller</p>
                    </div>
                  </div>
                  <div className="text-sm text-blue-600">
                    <FaClock className="inline mr-1" />
                    2:00 PM • VIP Guest
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <FaCheck className="text-green-500 text-xl" />
                    <div>
                      <p className="font-semibold text-green-900">Check-out: Room 305</p>
                      <p className="text-sm text-green-700">Guest: Sarah Johnson</p>
                    </div>
                  </div>
                  <div className="text-sm text-green-600">
                    <FaClock className="inline mr-1" />
                    11:00 AM • Standard Suite
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <FaEdit className="text-yellow-500 text-xl" />
                    <div>
                      <p className="font-semibold text-yellow-900">Room Maintenance</p>
                      <p className="text-sm text-yellow-700">Rooms 401-405</p>
                    </div>
                  </div>
                  <div className="text-sm text-yellow-600">
                    <FaClock className="inline mr-1" />
                    1:00 PM - 3:00 PM
                  </div>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <FaBell className="text-purple-500 text-xl" />
                    <div>
                      <p className="font-semibold text-purple-900">Staff Meeting</p>
                      <p className="text-sm text-purple-700">Front desk team</p>
                    </div>
                  </div>
                  <div className="text-sm text-purple-600">
                    <FaClock className="inline mr-1" />
                    4:00 PM • Conference Room
                  </div>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <FaWallet className="text-orange-500 text-xl" />
                    <div>
                      <p className="font-semibold text-orange-900">Payment Follow-up</p>
                      <p className="text-sm text-orange-700">Pending payments</p>
                    </div>
                  </div>
                  <div className="text-sm text-orange-600">
                    <FaClock className="inline mr-1" />
                    5:30 PM • 3 accounts
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <FaCalendar className="text-gray-500 text-xl" />
                    <div>
                      <p className="font-semibold text-gray-900">Tomorrow Preview</p>
                      <p className="text-sm text-gray-700">8 check-ins expected</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <FaEye className="inline mr-1" />
                    View full schedule
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HotelLayout>
  );
}
