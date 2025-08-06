import { FaFilter, FaBell, FaUser, FaExclamationCircle, FaCog, FaEye, FaTrash } from 'react-icons/fa';
import AdminLayout from '../../components/admin/AdminLayout';
import AdminHeader from '../../components/admin/AdminHeader';
import Pagination from '../../components/admin/Pagination';

const notifications = [
  {
    id: 1,
    type: 'system',
    title: 'Server Maintenance Alert',
    message: 'Scheduled maintenance will begin at 2:00 AM UTC',
    status: 'unread',
    time: '2 minutes ago',
    priority: 'high'
  },
  {
    id: 2,
    type: 'user',
    title: 'New User Registration',
    message: 'John Doe has successfully registered',
    status: 'unread',
    time: '15 minutes ago',
    priority: 'low'
  },
  {
    id: 3,
    type: 'alert',
    title: 'Payment Processing Issue',
    message: 'Multiple payment failures detected',
    status: 'unread',
    time: '1 hour ago',
    priority: 'medium'
  },
  {
    id: 4,
    type: 'system',
    title: 'System Update Available',
    message: 'Version 2.1.4 & new additions',
    status: 'read',
    time: '3 hours ago',
    priority: 'low'
  },
  {
    id: 5,
    type: 'booking',
    title: 'Booking Confirmation',
    message: 'Booking #TL-2024-001 confirmed',
    status: 'read',
    time: '5 hours ago',
    priority: 'low'
  }
];

function NotificationItem({ notification }) {
  const typeConfig = {
    system: {
      icon: <FaCog className="text-orange-500" />,
      bgColor: 'bg-orange-50'
    },
    user: {
      icon: <FaUser className="text-green-500" />,
      bgColor: 'bg-green-50'
    },
    alert: {
      icon: <FaExclamationCircle className="text-red-500" />,
      bgColor: 'bg-red-50'
    },
    booking: {
      icon: <FaBell className="text-purple-500" />,
      bgColor: 'bg-purple-50'
    }
  };

  const config = typeConfig[notification.type] || typeConfig.system;

  return (
    <div className={`p-4 rounded-lg ${config.bgColor} ${notification.status === 'unread' ? 'border-l-4 border-brand-primary' : ''}`}>
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <div className="mt-1">{config.icon}</div>
          <div>
            <h3 className="font-semibold text-content-primary">{notification.title}</h3>
            <p className="text-content-secondary text-sm">{notification.message}</p>
            <span className="text-content-tertiary text-xs">{notification.time}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="text-orange-500 hover:text-orange-700">
            <FaEye />
          </button>
          <button className="text-red-500 hover:text-red-700">
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Notifications() {
  return (
    <AdminLayout activePage="notifications">
      <AdminHeader 
        title="Notifications" 
        subtitle="Manage system notifications and alerts" 
      />

      {/* Filters */}
      <div className="bg-white rounded-xl shadow p-4 mb-4 flex items-center gap-4">
        <input 
          className="border rounded px-3 py-2 flex-1" 
          placeholder="Search notifications..." 
        />
        <select className="border rounded px-3 py-2">
          <option>All Types</option>
          <option>System</option>
          <option>User</option>
          <option>Alert</option>
          <option>Booking</option>
        </select>
        <select className="border rounded px-3 py-2">
          <option>All Status</option>
          <option>Read</option>
          <option>Unread</option>
        </select>
        <button className="bg-orange-500 text-white px-4 py-2 rounded flex items-center gap-2">
          <FaFilter /> Apply Filters
        </button>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-xl shadow p-4">
        <div className="space-y-4">
          {notifications.map(notification => (
            <NotificationItem key={notification.id} notification={notification} />
          ))}
        </div>

        <Pagination 
          currentPage={1}
          totalPages={5}
          totalResults={42}
          onPageChange={(page) => console.log('Page changed to:', page)}
        />
      </div>
    </AdminLayout>
  );
}