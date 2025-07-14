import { FaBell, FaEnvelope, FaExclamationTriangle, FaCheck, FaPlus } from 'react-icons/fa';

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

export default function Notifications() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-1/5 bg-white rounded-xl shadow p-4 flex flex-col gap-4">
        <div className="font-bold text-xl text-brand-primary mb-4">Travel.lk</div>
        <nav className="flex flex-col gap-2">
          <button className="text-content-primary px-4 py-2 rounded hover:bg-brand-accent text-left">Dashboard</button>
          <button className="text-content-primary px-4 py-2 rounded hover:bg-brand-accent text-left">Users</button>
          <button className="text-content-primary px-4 py-2 rounded hover:bg-brand-accent text-left">Listings</button>
          <button className="text-content-primary px-4 py-2 rounded hover:bg-brand-accent text-left">Bookings</button>
          <button className="text-content-primary px-4 py-2 rounded hover:bg-brand-accent text-left">Reviews</button>
          <button className="text-content-primary px-4 py-2 rounded hover:bg-brand-accent text-left">Reports</button>
          <button className="bg-brand-primary text-white px-4 py-2 rounded font-semibold">Notifications</button>
          <button className="text-content-primary px-4 py-2 rounded hover:bg-brand-accent text-left">Payments</button>
          <button className="text-content-primary px-4 py-2 rounded hover:bg-brand-accent text-left">Settings</button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Notifications Center</h1>
            <p className="text-content-secondary">Manage all system and user notifications</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-semibold">Admin User</span>
            <img src="https://randomuser.me/api/portraits/men/4.jpg" alt="Admin" className="w-10 h-10 rounded-full" />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 rounded-xl p-4">
            <div className="text-sm text-blue-600">Total Notifications</div>
            <div className="text-2xl font-bold text-blue-700">247</div>
          </div>
          <div className="bg-red-50 rounded-xl p-4">
            <div className="text-sm text-red-600">Unread</div>
            <div className="text-2xl font-bold text-red-700">23</div>
          </div>
          <div className="bg-yellow-50 rounded-xl p-4">
            <div className="text-sm text-yellow-600">System Alerts</div>
            <div className="text-2xl font-bold text-yellow-700">5</div>
          </div>
          <div className="bg-green-50 rounded-xl p-4">
            <div className="text-sm text-green-600">Today</div>
            <div className="text-2xl font-bold text-green-700">18</div>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="bg-white rounded-xl shadow p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <select className="border rounded px-3 py-2">
              <option>All Types</option>
              <option>System</option>
              <option>User</option>
              <option>Alert</option>
            </select>
            <select className="border rounded px-3 py-2">
              <option>All</option>
              <option>Unread</option>
              <option>Read</option>
            </select>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-blue-600 hover:underline">Mark All Read</button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2">
              <FaPlus /> New Notification
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="bg-white rounded-xl shadow">
          <div className="p-4 border-b">
            <h2 className="font-semibold">Recent Notifications</h2>
          </div>
          <div className="divide-y">
            {notifications.map(notification => (
              <div key={notification.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-full 
                    ${notification.type === 'system' ? 'bg-blue-100' : 
                      notification.type === 'alert' ? 'bg-red-100' : 
                      notification.type === 'user' ? 'bg-green-100' : 'bg-gray-100'}`}>
                    {notification.type === 'system' && <FaBell className="text-blue-600" />}
                    {notification.type === 'alert' && <FaExclamationTriangle className="text-red-600" />}
                    {notification.type === 'user' && <FaEnvelope className="text-green-600" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{notification.title}</h3>
                      <span className="text-sm text-gray-500">{notification.time}</span>
                    </div>
                    <p className="text-gray-600 mt-1">{notification.message}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`text-xs px-2 py-1 rounded-full 
                        ${notification.priority === 'high' ? 'bg-red-100 text-red-600' : 
                          notification.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' : 
                          'bg-green-100 text-green-600'}`}>
                        {notification.priority.charAt(0).toUpperCase() + notification.priority.slice(1)}
                      </span>
                      {notification.status === 'unread' && (
                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">New</span>
                      )}
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <FaCheck />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 text-center border-t">
            <button className="text-blue-600 hover:underline">Load More Notifications</button>
          </div>
        </div>
      </main>
    </div>
  );
}