import { FaHome, FaBed, FaCalendarAlt, FaUsers, FaBroom, FaStar, FaChartBar, FaCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function SidebarLink({ to, icon: Icon, label, isActive }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
        isActive 
          ? 'bg-brand-primary text-white' 
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <Icon className="text-xl" />
      <span>{label}</span>
    </Link>
  );
}

export default function HotelSidebar({ activePage }) {
  const navigationItems = [
    { to: '/hotel/dashboard', id: 'dashboard', icon: FaHome, label: 'Dashboard' },
    { to: '/hotel/rooms', id: 'rooms', icon: FaBed, label: 'Rooms' },
    { to: '/hotel/bookings', id: 'bookings', icon: FaCalendarAlt, label: 'Bookings' },
    { to: '/hotel/guests', id: 'guests', icon: FaUsers, label: 'Guests' },
    { to: '/hotel/housekeeping', id: 'housekeeping', icon: FaBroom, label: 'Housekeeping' },
    { to: '/hotel/reviews', id: 'reviews', icon: FaStar, label: 'Reviews' },
    { to: '/hotel/reports', id: 'reports', icon: FaChartBar, label: 'Reports' },
    { to: '/hotel/settings', id: 'settings', icon: FaCog, label: 'Settings' }
  ];

  return (
    <div className="w-64 bg-white shadow-md p-4 h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-brand-primary">Hotel Manager</h1>
      </div>
      <nav className="space-y-2">
        {navigationItems.map(item => (
          <SidebarLink
            key={item.id}
            to={item.to}
            icon={item.icon}
            label={item.label}
            isActive={activePage === item.id}
          />
        ))}
      </nav>
    </div>
  );
}
