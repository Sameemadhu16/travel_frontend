import { NavLink } from 'react-router-dom';
import { Home, Users, ClipboardList, Calendar, Bell, CreditCard, Star, Settings, HelpCircle, LogOut, Building, BarChart3, UserCheck } from 'lucide-react';

const menuItems = [
  { label: 'Dashboard', icon: <Home size={18} />, path: '/admin/dashboard' },
  { label: 'User Management', icon: <Users size={18} />, path: '/admin/users' },
  { label: 'Partner Management', icon: <Building size={18} />, path: '/admin/partners' },
  { label: 'Tour Requests', icon: <ClipboardList size={18} />, path: '/admin/tour-requests' },
  { label: 'Bookings', icon: <UserCheck size={18} />, path: '/admin/bookings' },
  { label: 'Calendar', icon: <Calendar size={18} />, path: '/admin/calendar' },
  { label: 'Analytics', icon: <BarChart3 size={18} />, path: '/admin/analytics' },
  { label: 'Payments', icon: <CreditCard size={18} />, path: '/admin/payments' },
  { label: 'Reviews', icon: <Star size={18} />, path: '/admin/reviews' },
  { label: 'Notifications', icon: <Bell size={18} />, path: '/admin/notifications' },
  { label: 'Settings', icon: <Settings size={18} />, path: '/admin/settings' },
  { label: 'Help Center', icon: <HelpCircle size={18} />, path: '/admin/help' },
];

export default function AdminSidebar() {
  return (
    <div className="ml-2 mb-2 mt-5 bg-white shadow-xl border border-orange-400 rounded-3xl p-4 flex flex-col w-52">
      <div className="mb-4 px-4">
        <h2 className="font-bold text-xl text-orange-600">Admin Panel</h2>
        <p className="text-xs text-gray-500">Travel.lk Management</p>
      </div>
      
      <nav className="flex-1 mb-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 px-4 rounded-full cursor-pointer text-sm font-medium transition-all hover:bg-orange-100 hover:text-black ${
                isActive ? 'bg-orange-500 text-white' : 'text-gray-700'
              }`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="pl-4 pt-4 pb-2 border-t-2 border-orange-400">
        <div className="flex items-center gap-2 text-gray-600 hover:text-red-500 cursor-pointer">
          <LogOut size={18} />
          <span className="text-sm font-medium">Logout</span>
        </div>
      </div>
    </div>
  );
}
