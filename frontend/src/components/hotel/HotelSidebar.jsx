import { NavLink } from 'react-router-dom';
import { Home, Hotel, CreditCard, Star, BarChart3, Settings, LogOut, Bed, ClipboardList } from 'lucide-react';

const menuItems = [
  { label: 'Dashboard', icon: <Home size={18} />, path: '/hotel/dashboard' },
  { label: 'Hotel Listings', icon: <Hotel size={18} />, path: '/hotel/listings' },
  { label: 'Rooms', icon: <Bed size={18} />, path: '/hotel/rooms' },
  { label: 'Bookings', icon: <ClipboardList size={18} />, path: '/hotel/bookings' },
  { label: 'Payments', icon: <CreditCard size={18} />, path: '/hotel/payments' },
  { label: 'Reviews', icon: <Star size={18} />, path: '/hotel/reviews' },
  { label: 'Analytics', icon: <BarChart3 size={18} />, path: '/hotel/analytics' },
  { label: 'Settings', icon: <Settings size={18} />, path: '/hotel/settings' },
];

export default function HotelSidebar() {
  return (
    <div className="ml-2 mb-2 mt-5 bg-white shadow-xl border border-orange-400 rounded-3xl p-4 flex flex-col w-52">
      <div className="mb-4 px-4">
        <h2 className="font-bold text-xl text-orange-600">Hotel Panel</h2>
        <p className="text-xs text-gray-500">Hotel Management</p>
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
