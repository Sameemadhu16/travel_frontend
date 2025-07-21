import { FaBell, FaUserCircle } from 'react-icons/fa';

export default function HotelHeader({ title, subtitle }) {
  return (
    <div className="bg-white shadow-sm">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
            {subtitle && (
              <p className="text-gray-600 mt-1">{subtitle}</p>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            <button className="text-gray-600 hover:text-gray-800">
              <FaBell className="text-xl" />
            </button>
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
              <FaUserCircle className="text-xl" />
              <span>Hotel Admin</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
