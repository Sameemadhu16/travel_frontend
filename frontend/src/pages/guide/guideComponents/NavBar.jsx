import { NavLink } from 'react-router-dom';
import {Home, ClipboardList, Briefcase, CalendarCheck2, BookOpen, CalendarDays, MessageCircle, AlertCircle, Star, DollarSign, LogOut, Bell, User } from 'lucide-react';

const menuItems = [
  { label: 'Dashboard', icon: <Home size={18} />, path: '/guide-dashboard' },
  { label: 'Tour Requests', icon: <ClipboardList size={18} />, path: '/guide-tour-request' },
  { label: 'Accepted Tours', icon: <Briefcase size={18} />, path: '/guide-accepted-tours' },
  { label: 'Confirmed Tours', icon: <CalendarCheck2 size={18} />, path: '/guide-confirmed-tours' },
  { label: 'Active Tour', icon: <BookOpen size={18} />, path: '/guide-active-tour' },
  { label: 'Tours History', icon: <CalendarDays size={18} />, path: '/guide-tour-history' },
  { label: 'Availability Calendar', icon: <CalendarDays size={18} />, path: '/guide-availability' },
  { label: 'Messages', icon: <MessageCircle size={18} />, path: '/messages' },
  { label: 'Inquiries', icon: <AlertCircle size={18} />, path: '/guide-complaints' },
  { label: 'Reviews', icon: <Star size={18} />, path: '/guide-reviews' },
  { label: 'Earnings & Payments', icon: <DollarSign size={18} />, path: '/earnings' },
  { label: 'Notifications', icon: <Bell size={18} />, path: '/guide-notifications' },
  { label: 'Profile', icon: <User size={18} />, path: '/guide-profile' },
];

export default function Sidebar() {
  return (
    <div className="ml-2 mb-2 mt-5 bg-white shadow-xl border border-orange-400 rounded-3xl p-4 flex flex-col w-52">
      <nav className="flex-1 mb-4">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
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
