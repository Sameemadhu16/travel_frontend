import { FaUser, FaCalendar, FaDollarSign, FaChartLine, FaFilter } from 'react-icons/fa';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const userData = [
  { date: 'Jan 1', users: 10500 },
  { date: 'Jan 2', users: 11200 },
  { date: 'Jan 3', users: 11800 },
  { date: 'Jan 4', users: 12100 },
  { date: 'Jan 5', users: 12400 },
  { date: 'Jan 6', users: 12700 },
  { date: 'Jan 7', users: 12847 }
];

const bookingData = [
  { type: 'Hotels', value: 1842 },
  { type: 'Tours', value: 1024 },
  { type: 'Vehicles', value: 776 }
];

export default function Reports() {
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
          <button className="bg-brand-primary text-white px-4 py-2 rounded font-semibold">Reports</button>
          <button className="text-content-primary px-4 py-2 rounded hover:bg-brand-accent text-left">Notifications</button>
          <button className="text-content-primary px-4 py-2 rounded hover:bg-brand-accent text-left">Payments</button>
          <button className="text-content-primary px-4 py-2 rounded hover:bg-brand-accent text-left">Settings</button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Reports & Analytics</h1>
            <p className="text-content-secondary">Comprehensive insights into your travel platform performance</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-semibold">Admin User</span>
            <img src="https://randomuser.me/api/portraits/men/4.jpg" alt="Admin" className="w-10 h-10 rounded-full" />
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow p-4 mb-6 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <FaCalendar className="text-gray-500" />
            <select className="border rounded px-3 py-2">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 3 months</option>
              <option>Last year</option>
            </select>
          </div>
          <select className="border rounded px-3 py-2">
            <option>All Types</option>
            <option>Hotels</option>
            <option>Tours</option>
            <option>Vehicles</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2">
            <FaFilter /> Apply Filters
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <StatCard 
            icon={<FaUser className="text-blue-500" />}
            label="Total Users"
            value="12,847"
            change="+12.1%"
            isPositive={true}
          />
          <StatCard 
            icon={<FaCalendar className="text-orange-500" />}
            label="Total Bookings"
            value="3,642"
            change="+8.2%"
            isPositive={true}
          />
          <StatCard 
            icon={<FaDollarSign className="text-green-500" />}
            label="Revenue"
            value="$284,592"
            change="+15.3%"
            isPositive={true}
          />
          <StatCard 
            icon={<FaChartLine className="text-purple-500" />}
            label="Avg. Order Value"
            value="$78.12"
            change="-2.1%"
            isPositive={false}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold mb-4">User Signups Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#4F46E5" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold mb-4">Booking Volume by Type</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={bookingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#F97316" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon, label, value, change, isPositive }) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <span className="text-content-secondary">{label}</span>
      </div>
      <div className="text-2xl font-bold mb-1">{value}</div>
      <div className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        {change}
      </div>
    </div>
  );
}