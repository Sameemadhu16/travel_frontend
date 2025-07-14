// import { useState } from 'react';
import {
  Home,
  ClipboardList,
  Briefcase,
  CalendarCheck2,
  BookOpen,
  CalendarDays,
  MessageCircle,
  AlertCircle,
  Star,
  DollarSign,
  Settings,
  LogOut,
} from 'lucide-react';

const menuItems = [
  { label: 'Dashboard', icon: <Home size={18} /> },
  { label: 'Tour Requests', icon: <ClipboardList size={18} />, active: true },
  { label: 'Accepted Tours', icon: <Briefcase size={18} /> },
  { label: 'Confirmed Tours', icon: <CalendarCheck2 size={18} /> },
  { label: 'Active Tour', icon: <BookOpen size={18} /> },
  { label: 'Tours History', icon: <CalendarDays size={18} /> },
  { label: 'Availability Calendar', icon: <CalendarDays size={18} /> },
  { label: 'Messages', icon: <MessageCircle size={18} /> },
  { label: 'Special Inquiries', icon: <AlertCircle size={18} /> },
  { label: 'Reviews', icon: <Star size={18} /> },
  { label: 'Earnings & Payments', icon: <DollarSign size={18} /> },
  { label: 'Settings', icon: <Settings size={18} /> },
];

export default function Sidebar() {
  return (
    <div className="ml-2 mb-2 w-fit bg-white shadow-xl border rounded-3xl p-4 flex flex-col">
      {/* <div className="flex items-center gap-3 p-4">
        <img
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt="Profile"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h2 className="font-semibold text-sm">Sarah Johnson</h2>
          <p className="text-xs text-green-600">SLTDA Verified ●</p>
        </div>
      </div> */}

      <nav className="flex-1 mb-4 space-y-1">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`flex items-center gap-3 p-2 px-4 rounded-full cursor-pointer text-sm font-medium transition-all hover:bg-orange-100 ${
              item.active ? 'bg-orange-500 text-white' : 'text-gray-700'
            }`}
          >
            {item.icon}
            {item.label}
          </div>
        ))}
      </nav>

      <div className="p-4 border-t-2">
        <div className="flex items-center gap-2 text-gray-600 hover:text-red-500 cursor-pointer">
          <LogOut size={18} />
          <span className="text-sm font-medium">Logout</span>
        </div>
      </div>
    </div>
  );
}
