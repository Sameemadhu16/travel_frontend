import { useState, useEffect } from 'react';
import { FaUsers, FaClipboardList, FaCalendarCheck, FaRupeeSign, FaFlag, FaClipboard, FaEye, FaBell, FaCreditCard, FaHotel, FaCar, FaUserTie, FaRoute, FaArrowUp, FaArrowDown, FaPhone, FaEnvelope, FaMapMarkerAlt, FaExclamationTriangle, FaCheckCircle, FaChartBar } from 'react-icons/fa';
import { FaMessage, FaUserPlus, FaStar, FaChartLine } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import Main from '../../components/Main';
import AdminCard from '../../components/admin/AdminCard';
import AdminSidebar from '../../components/admin/AdminSidebar';
import PrimaryButton from '../../components/PrimaryButton';
import SecondaryButton from '../../components/SecondaryButton';
import user4 from '../../assets/users/user4.jpg';
import user5 from '../../assets/users/user5.jpg';

// Mock data for Sri Lankan travel platform
const sriLankanActivities = [
  {
    id: 1,
    type: 'booking',
    customerName: 'Tharindu Perera',
    customerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=center',
    action: 'New cultural tour booking',
    details: 'Anuradhapura to Polonnaruwa - 2 days heritage tour',
    amount: 'Rs. 45,000',
    time: '3 minutes ago',
    status: 'New',
    location: 'Colombo'
  },
  {
    id: 2,
    type: 'payment',
    customerName: 'Sachini Fernando',
    customerAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b4e8e4f8?w=100&h=100&fit=crop&crop=center',
    action: 'Payment received for Ayurveda package',
    details: 'Booking #TLK-2024-156 - Bentota retreat',
    amount: 'Rs. 125,000',
    time: '12 minutes ago',
    status: 'Payment',
    location: 'Kandy'
  },
  {
    id: 3,
    type: 'partner',
    customerName: 'Chamara Rathnayake',
    customerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=center',
    action: 'New hotel partnership request',
    details: 'Lagoon Paradise Resort - Negombo',
    amount: '',
    time: '25 minutes ago',
    status: 'Pending',
    location: 'Negombo'
  },
  {
    id: 4,
    type: 'complaint',
    customerName: 'Malini Silva',
    customerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=center',
    action: 'Service complaint submitted',
    details: 'Late pickup for Yala safari tour',
    amount: '',
    time: '1 hour ago',
    status: 'Issue',
    location: 'Tissamaharama'
  },
  {
    id: 5,
    type: 'booking',
    customerName: 'Kasun Wickramasinghe',
    customerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=center',
    action: 'Hill country tour completed',
    details: 'Nuwara Eliya tea plantation tour - 3 days',
    amount: 'Rs. 75,000',
    time: '2 hours ago',
    status: 'Completed',
    location: 'Nuwara Eliya'
  }
];

const topPerformers = [
  {
    rank: 1,
    name: 'Ceylon Heritage Tours',
    type: 'Tour Operator',
    rating: 4.9,
    tours: 187,
    revenue: 'Rs. 2.8M',
    location: 'Kandy'
  },
  {
    rank: 2,
    name: 'Cinnamon Hotels & Resorts',
    type: 'Hotel Chain',
    rating: 4.8,
    bookings: 312,
    revenue: 'Rs. 4.2M',
    location: 'Colombo'
  },
  {
    rank: 3,
    name: 'Lanka Safari Adventures',
    type: 'Safari Operator',
    rating: 4.7,
    tours: 156,
    revenue: 'Rs. 1.9M',
    location: 'Yala'
  },
  {
    rank: 4,
    name: 'Ayurveda Wellness Retreats',
    type: 'Wellness Center',
    rating: 4.9,
    packages: 98,
    revenue: 'Rs. 3.1M',
    location: 'Bentota'
  }
];

const systemStats = {
  activeTours: 73,
  registeredPartners: 456,
  totalUsers: 18347,
  systemUptime: 99.8,
  pendingApprovals: 28,
  activeBookings: 234,
  monthlyGrowth: 15.8
};

// Enhanced Statistics Card Component
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

// Recent Activity Item Component
function ActivityItem({ activity }) {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'booking': return <FaCalendarCheck className="text-blue-500" />;
      case 'payment': return <FaCreditCard className="text-green-500" />;
      case 'partner': return <FaUserTie className="text-purple-500" />;
      case 'complaint': return <FaExclamationTriangle className="text-red-500" />;
      default: return <FaCheckCircle className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'New': return 'bg-blue-100 text-blue-600';
      case 'Payment': return 'bg-green-100 text-green-600';
      case 'Pending': return 'bg-yellow-100 text-yellow-600';
      case 'Issue': return 'bg-red-100 text-red-600';
      case 'Completed': return 'bg-purple-100 text-purple-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div className="flex-shrink-0">
        <img 
          src={activity.customerAvatar} 
          alt={activity.customerName}
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
          <FaMapMarkerAlt className="text-gray-400" />
          <span>{activity.location}</span>
          <span>•</span>
          <span>{activity.time}</span>
        </div>
      </div>
      <div className="flex-shrink-0 text-right">
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

export default function AdminDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [recentActivities] = useState(sriLankanActivities);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDateTime = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className='flex'>
      <div className='sticky top-0 h-fit'>
        <AdminSidebar />
      </div>
      <div className='flex-1'>
        <Main hasNavbar={true}>
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <div className="text-right">
                <p className="text-sm text-gray-600">Current Time (Sri Lanka)</p>
                <p className="text-lg font-semibold text-orange-600">{formatDateTime(currentTime)}</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Welcome to your Sri Lankan travel platform control center. Monitor operations, manage partners, and track performance across the island.
            </p>
            
            {/* Quick Alert Banner */}
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-lg p-4 flex items-center gap-3">
              <FaBell className="text-orange-500 text-xl" />
              <div>
                <p className="font-semibold text-orange-800">28 partner requests awaiting approval</p>
                <p className="text-sm text-orange-700">New hotels and tour operators from Galle, Kandy, and Nuwara Eliya regions</p>
              </div>
              <Link 
                to="/admin/partners" 
                className="ml-auto bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium"
              >
                Review Now
              </Link>
            </div>
          </div>

          {/* Enhanced Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <EnhancedStatsCard
              icon={<FaClipboardList className="text-orange-500 text-xl" />}
              title="Partner Requests"
              value="28"
              change="12%"
              changeType="positive"
              color="bg-orange-100"
              subtitle="Hotels, guides & drivers"
              onClick={() => window.location.href = '/admin/partners'}
            />

            <EnhancedStatsCard
              icon={<FaUsers className="text-blue-500 text-xl" />}
              title="Active Travelers"
              value="18,347"
              change="15.8%"
              changeType="positive"
              color="bg-blue-100"
              subtitle="Monthly active users"
            />

            <EnhancedStatsCard
              icon={<FaRupeeSign className="text-green-500 text-xl" />}
              title="Monthly Revenue"
              value="Rs. 12.4M"
              change="22.5%"
              changeType="positive"
              color="bg-green-100"
              subtitle="October 2024 earnings"
            />

            <EnhancedStatsCard
              icon={<FaCalendarCheck className="text-purple-500 text-xl" />}
              title="Active Bookings"
              value="234"
              change="8.3%"
              changeType="positive"
              color="bg-purple-100"
              subtitle="Currently in progress"
            />
          </div>

          {/* Key Performance Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <AdminCard>
              <div className="text-center p-4">
                <FaChartBar className="text-4xl text-green-500 mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2">Platform Growth</h3>
                <p className="text-3xl font-bold text-green-600 mb-1">+{systemStats.monthlyGrowth}%</p>
                <p className="text-sm text-gray-600">Compared to last month</p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>New Registrations</span>
                    <span className="font-medium">+2,847</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Partner Sign-ups</span>
                    <span className="font-medium">+156</span>
                  </div>
                </div>
              </div>
            </AdminCard>

            <AdminCard>
              <div className="text-center p-4">
                <FaMapMarkerAlt className="text-4xl text-orange-500 mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2">Coverage Areas</h3>
                <p className="text-3xl font-bold text-orange-600 mb-1">25</p>
                <p className="text-sm text-gray-600">Districts covered</p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Western Province</span>
                    <span className="font-medium">156 partners</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Central Province</span>
                    <span className="font-medium">89 partners</span>
                  </div>
                </div>
              </div>
            </AdminCard>

            <AdminCard>
              <div className="text-center p-4">
                <FaStar className="text-4xl text-yellow-500 mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2">Service Quality</h3>
                <p className="text-3xl font-bold text-yellow-600 mb-1">4.8</p>
                <p className="text-sm text-gray-600">Average rating</p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>5-star reviews</span>
                    <span className="font-medium">78%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Response time</span>
                    <span className="font-medium">&lt; 2 hours</span>
                  </div>
                </div>
              </div>
            </AdminCard>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Recent Activities - Enhanced */}
            <div className="lg:col-span-2">
              <AdminCard>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-xl font-bold">Live Activity Feed</h3>
                    <p className="text-sm text-gray-600">Real-time platform activities across Sri Lanka</p>
                  </div>
                  <SecondaryButton className="text-sm px-4 py-2">
                    <FaEye className="mr-2" /> View All
                  </SecondaryButton>
                </div>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {recentActivities.map((activity) => (
                    <ActivityItem key={activity.id} activity={activity} />
                  ))}
                </div>
              </AdminCard>
            </div>

            {/* Enhanced Quick Actions & Alerts */}
            <div className="space-y-6">
              <AdminCard>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg font-bold">Quick Actions</h3>
                    <p className="text-sm text-gray-600">Frequently used admin tools</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <Link to="/admin/partners" className="block">
                    <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg hover:bg-orange-100 cursor-pointer transition-all hover:shadow-md">
                      <div className="bg-orange-500 p-2 rounded-full">
                        <FaUserPlus className="text-white text-sm" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">Review Partners</p>
                        <p className="text-gray-500 text-xs">28 pending approvals</p>
                      </div>
                      <div className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">28</div>
                    </div>
                  </Link>
                  
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 cursor-pointer transition-all hover:shadow-md">
                    <div className="bg-green-500 p-2 rounded-full">
                      <FaBell className="text-white text-sm" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">Send Alerts</p>
                      <p className="text-gray-500 text-xs">Weather & travel advisories</p>
                    </div>
                  </div>
                  
                  <Link to="/admin/bookings" className="block">
                    <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg hover:bg-purple-100 cursor-pointer transition-all hover:shadow-md">
                      <div className="bg-purple-500 p-2 rounded-full">
                        <FaCreditCard className="text-white text-sm" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">Payment Issues</p>
                        <p className="text-gray-500 text-xs">3 pending refunds</p>
                      </div>
                      <div className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full">3</div>
                    </div>
                  </Link>

                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 cursor-pointer transition-all hover:shadow-md">
                    <div className="bg-blue-500 p-2 rounded-full">
                      <FaChartLine className="text-white text-sm" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">Generate Reports</p>
                      <p className="text-gray-500 text-xs">Monthly analytics ready</p>
                    </div>
                  </div>
                </div>
              </AdminCard>

              {/* System Alerts */}
              <AdminCard>
                <h3 className="text-lg font-bold mb-4">System Alerts</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <FaExclamationTriangle className="text-red-500 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-sm text-red-800">High Traffic Alert</p>
                      <p className="text-red-700 text-xs">Unusual activity from Colombo region</p>
                      <p className="text-red-600 text-xs">2 minutes ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <FaBell className="text-yellow-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-sm text-yellow-800">Server Maintenance</p>
                      <p className="text-yellow-700 text-xs">Scheduled for 2:00 AM tomorrow</p>
                      <p className="text-yellow-600 text-xs">12 hours remaining</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <FaCheckCircle className="text-green-500 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-sm text-green-800">Backup Completed</p>
                      <p className="text-green-700 text-xs">All data successfully backed up</p>
                      <p className="text-green-600 text-xs">1 hour ago</p>
                    </div>
                  </div>
                </div>
              </AdminCard>
            </div>
          </div>

          {/* Enhanced Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Enhanced System Overview */}
            <AdminCard>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-bold">System Overview</h3>
                  <p className="text-sm text-gray-600">Platform performance metrics</p>
                </div>
                <SecondaryButton className="text-sm px-4 py-2">
                  <FaEye className="mr-2" /> Details
                </SecondaryButton>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FaRoute className="text-blue-500" />
                    <span className="text-gray-700 font-medium">Active Tours</span>
                  </div>
                  <span className="font-bold text-lg">{systemStats.activeTours}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FaUserTie className="text-purple-500" />
                    <span className="text-gray-700 font-medium">Registered Partners</span>
                  </div>
                  <span className="font-bold text-lg">{systemStats.registeredPartners}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FaUsers className="text-orange-500" />
                    <span className="text-gray-700 font-medium">Total Users</span>
                  </div>
                  <span className="font-bold text-lg">{systemStats.totalUsers.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="text-green-500" />
                    <span className="text-gray-700 font-medium">System Uptime</span>
                  </div>
                  <span className="font-bold text-lg text-green-600">{systemStats.systemUptime}%</span>
                </div>
              </div>
            </AdminCard>

            {/* Enhanced Top Performers with Sri Lankan Data */}
            <AdminCard>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-bold">Top Performers</h3>
                  <p className="text-sm text-gray-600">Highest rated partners this month</p>
                </div>
                <SecondaryButton className="text-sm px-4 py-2">
                  <FaStar className="mr-2" /> Rankings
                </SecondaryButton>
              </div>
              <div className="space-y-4">
                {topPerformers.map((performer) => (
                  <div key={performer.rank} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                      performer.rank === 1 ? 'bg-yellow-500' : 
                      performer.rank === 2 ? 'bg-gray-400' : 
                      performer.rank === 3 ? 'bg-orange-400' : 'bg-blue-400'
                    }`}>
                      {performer.rank}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{performer.name}</p>
                      <p className="text-gray-600 text-xs">{performer.type} • {performer.location}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <FaStar className="text-yellow-500" />
                          {performer.rating}
                        </span>
                        <span className="text-xs text-green-600 font-medium">{performer.revenue}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold">
                        {performer.tours ? `${performer.tours} tours` : 
                         performer.bookings ? `${performer.bookings} bookings` : 
                         `${performer.packages} packages`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </AdminCard>
          </div>

          {/* Enhanced Action Buttons */}
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-6 text-center">
            <h3 className="text-xl font-bold mb-2">Platform Management</h3>
            <p className="text-gray-600 mb-6">Take control of your Sri Lankan travel platform operations</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <PrimaryButton className="px-8 py-3 bg-orange-500 hover:bg-orange-600">
                <FaMessage className="mr-2" />
                Send Platform Announcements
              </PrimaryButton>
              <SecondaryButton className="px-8 py-3 border-orange-500 text-orange-700 hover:bg-orange-50">
                <FaClipboard className="mr-2" />
                Generate Monthly Reports
              </SecondaryButton>
              <SecondaryButton className="px-8 py-3 border-orange-500 text-orange-700 hover:bg-orange-50">
                <FaBell className="mr-2" />
                Emergency Broadcast
              </SecondaryButton>
            </div>
          </div>
        </Main>
      </div>
    </div>
  );
}