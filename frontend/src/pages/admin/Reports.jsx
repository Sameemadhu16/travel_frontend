import { FaDownload, FaChartBar, FaChartPie, FaChartLine, FaCalendarAlt } from 'react-icons/fa';
import AdminLayout from '../../components/admin/AdminLayout';
import AdminHeader from '../../components/admin/AdminHeader';

const reportCards = [
  {
    title: "Revenue Analysis",
    description: "Monthly and yearly revenue breakdowns",
    icon: <FaChartBar className="text-blue-500" />,
    lastUpdated: "Updated 2 hours ago"
  },
  {
    title: "Booking Statistics",
    description: "Booking trends and patterns",
    icon: <FaChartLine className="text-green-500" />,
    lastUpdated: "Updated 1 hour ago"
  },
  {
    title: "User Demographics",
    description: "User distribution and activities",
    icon: <FaChartPie className="text-purple-500" />,
    lastUpdated: "Updated 3 hours ago"
  }
];

function ReportCard({ report }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-gray-50 rounded-lg">
          {report.icon}
        </div>
        <button className="text-brand-primary hover:text-brand-primary-dark">
          <FaDownload />
        </button>
      </div>
      <h3 className="text-lg font-semibold mb-2">{report.title}</h3>
      <p className="text-content-secondary mb-4">{report.description}</p>
      <div className="flex items-center text-xs text-content-tertiary">
        <FaCalendarAlt className="mr-1" />
        {report.lastUpdated}
      </div>
    </div>
  );
}

function MetricCard({ title, value, change, isPositive }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-content-secondary mb-2">{title}</h3>
      <div className="text-2xl font-bold mb-2">{value}</div>
      <div className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        {isPositive ? '↑' : '↓'} {change}
      </div>
    </div>
  );
}

export default function Reports() {
  return (
    <AdminLayout activePage="reports">
      <AdminHeader 
        title="Reports & Analytics" 
        subtitle="View and download business reports" 
      />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <MetricCard
          title="Total Revenue"
          value="$124,563.00"
          change="12% vs last month"
          isPositive={true}
        />
        <MetricCard
          title="Total Bookings"
          value="1,234"
          change="8% vs last month"
          isPositive={true}
        />
        <MetricCard
          title="Average Rating"
          value="4.8/5.0"
          change="0.2 vs last month"
          isPositive={true}
        />
        <MetricCard
          title="Cancellation Rate"
          value="2.3%"
          change="0.5% vs last month"
          isPositive={false}
        />
      </div>

      {/* Date Range Selector */}
      <div className="bg-white rounded-xl shadow p-4 mb-6 flex items-center gap-4">
        <span className="text-content-secondary">Date Range:</span>
        <input 
          type="date" 
          className="border rounded px-3 py-2"
        />
        <span>to</span>
        <input 
          type="date" 
          className="border rounded px-3 py-2"
        />
        <button className="bg-brand-primary text-white px-4 py-2 rounded">
          Apply Range
        </button>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reportCards.map((report, index) => (
          <ReportCard key={index} report={report} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Revenue Trends</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
            {/* Chart component would go here */}
            <span className="text-content-secondary">Revenue Chart</span>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Booking Distribution</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
            {/* Chart component would go here */}
            <span className="text-content-secondary">Booking Chart</span>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}