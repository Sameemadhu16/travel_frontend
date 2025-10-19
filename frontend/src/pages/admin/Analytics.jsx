import { useState, useEffect } from 'react';
import { FaChartLine, FaUsers, FaMapMarkerAlt, FaCalendarAlt, FaFilter, FaDownload, FaEye, FaHotel, FaCar, FaRoute, FaStar, FaArrowUp, FaArrowDown, FaDollarSign, FaPercent, FaGlobe, FaUserTie, FaChartBar, FaEdit, FaSearch } from 'react-icons/fa';
import AdminLayout from '../../components/admin/AdminLayout';
import AdminHeader from '../../components/admin/AdminHeader';

// Sri Lankan Tourism Analytics Data
const touristsData = {
  monthlyVisitors: [
    { month: 'Jan 2025', visitors: 142500, revenue: 2850000000, growth: 15.2 },
    { month: 'Feb 2025', visitors: 135800, revenue: 2716000000, growth: 12.8 },
    { month: 'Mar 2025', visitors: 158900, revenue: 3178000000, growth: 18.5 },
    { month: 'Apr 2025', visitors: 167200, revenue: 3344000000, growth: 22.1 },
    { month: 'May 2025', visitors: 145600, revenue: 2912000000, growth: 8.9 },
    { month: 'Jun 2025', visitors: 138900, revenue: 2778000000, growth: 6.2 },
    { month: 'Jul 2025', visitors: 172400, revenue: 3448000000, growth: 25.3 },
    { month: 'Aug 2025', visitors: 179800, revenue: 3596000000, growth: 28.7 },
    { month: 'Sep 2025', visitors: 165300, revenue: 3306000000, growth: 19.8 },
    { month: 'Oct 2025', visitors: 182650, revenue: 3653000000, growth: 31.4 }
  ],
  popularDestinations: [
    {
      name: 'Sigiriya Rock Fortress',
      visitors: 45600,
      revenue: 456000000,
      growth: 23.5,
      category: 'Historical',
      rating: 4.8,
      bookings: 12400
    },
    {
      name: 'Kandy Temple of Tooth',
      visitors: 52300,
      revenue: 418400000,
      growth: 18.9,
      category: 'Religious',
      rating: 4.7,
      bookings: 15200
    },
    {
      name: 'Yala National Park',
      visitors: 38900,
      revenue: 583500000,
      growth: 35.2,
      category: 'Wildlife',
      rating: 4.9,
      bookings: 8900
    },
    {
      name: 'Galle Fort',
      visitors: 41200,
      revenue: 371800000,
      growth: 16.7,
      category: 'Historical',
      rating: 4.6,
      bookings: 11800
    },
    {
      name: 'Nuwara Eliya Hill Country',
      visitors: 34800,
      revenue: 417600000,
      growth: 21.3,
      category: 'Nature',
      rating: 4.5,
      bookings: 9600
    },
    {
      name: 'Mirissa Whale Watching',
      visitors: 28500,
      revenue: 456000000,
      growth: 42.8,
      category: 'Marine',
      rating: 4.8,
      bookings: 6800
    },
    {
      name: 'Adam\'s Peak',
      visitors: 31200,
      revenue: 249600000,
      growth: 28.4,
      category: 'Adventure',
      rating: 4.7,
      bookings: 7200
    },
    {
      name: 'Colombo City Tours',
      visitors: 47800,
      revenue: 334600000,
      growth: 14.2,
      category: 'Urban',
      rating: 4.3,
      bookings: 13600
    }
  ],
  serviceBreakdown: {
    hotels: { bookings: 24560, revenue: 4912000000, growth: 18.5, avgStay: 4.2 },
    tours: { bookings: 15840, revenue: 3168000000, growth: 25.7, avgDuration: 3.8 },
    vehicles: { bookings: 18920, revenue: 1324400000, growth: 22.1, avgRental: 2.5 },
    guides: { bookings: 12680, revenue: 1014400000, growth: 31.2, avgTour: 5.2 }
  },
  visitorCountries: [
    { country: 'India', visitors: 356800, percentage: 28.5, revenue: 7136000000, growth: 22.1 },
    { country: 'United Kingdom', visitors: 187500, percentage: 15.0, revenue: 5625000000, growth: 18.9 },
    { country: 'Germany', visitors: 142300, percentage: 11.4, revenue: 4980500000, growth: 16.7 },
    { country: 'Australia', visitors: 128900, percentage: 10.3, revenue: 5156000000, growth: 24.5 },
    { country: 'China', visitors: 95600, percentage: 7.6, revenue: 3824000000, growth: 35.2 },
    { country: 'France', visitors: 89400, percentage: 7.1, revenue: 3576000000, growth: 12.8 },
    { country: 'United States', visitors: 76800, percentage: 6.1, revenue: 4608000000, growth: 28.9 },
    { country: 'Japan', visitors: 71200, percentage: 5.7, revenue: 3560000000, growth: 19.3 },
    { country: 'Others', visitors: 103500, percentage: 8.3, revenue: 3105000000, growth: 15.6 }
  ],
  revenueByService: [
    { service: 'Luxury Hotels', amount: 2456000000, percentage: 32.1, bookings: 8540 },
    { service: 'Cultural Tours', amount: 1847000000, percentage: 24.1, bookings: 12680 },
    { service: 'Wildlife Safaris', amount: 1234000000, percentage: 16.1, bookings: 5890 },
    { service: 'Adventure Activities', amount: 892000000, percentage: 11.6, bookings: 7420 },
    { service: 'Beach Resorts', amount: 678000000, percentage: 8.9, bookings: 4560 },
    { service: 'Ayurveda Treatments', amount: 545000000, percentage: 7.1, bookings: 2340 }
  ],
  performanceMetrics: {
    totalRevenue: 7652000000,
    totalBookings: 41430,
    averageBookingValue: 184750,
    customerSatisfaction: 4.6,
    repeatCustomers: 23.4,
    cancellationRate: 8.7,
    averageStayDuration: 6.8,
    peakSeason: 'December - March'
  }
};

// Analytics Stats Card Component (Similar to UserStatsCard)
function AnalyticsStatsCard({ icon, title, value, change, color }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
          {change && <p className="text-sm text-green-500">{change}</p>}
        </div>
        <div className={`w-12 h-12 flex items-center justify-center rounded-full text-white ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

// Chart Component (Similar to User Management table style)
function AnalyticsChart({ data, title, height = 200 }) {
  const maxValue = Math.max(...data.map(item => item.value));
  
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="px-6 py-4 border-b bg-gray-50">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-28 text-sm font-medium text-gray-700 truncate">
                {item.label}
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-8 relative">
                <div 
                  className="bg-gradient-to-r from-orange-400 to-orange-600 h-8 rounded-full flex items-center justify-end pr-3"
                  style={{ width: `${(item.value / maxValue) * 100}%` }}
                >
                  <span className="text-xs font-medium text-white">
                    {typeof item.value === 'number' && item.value > 100000 
                      ? `${(item.value / 1000000).toFixed(1)}M`
                      : item.value.toLocaleString()
                    }
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Destination Performance Table (Similar to User Management table)
function DestinationTable({ destinations }) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="px-6 py-4 border-b bg-gray-50 flex justify-between items-center">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <FaMapMarkerAlt className="text-orange-500" />
          Top Performing Destinations
        </h3>
        <button className="text-sm text-orange-500 hover:text-orange-600 flex items-center gap-1">
          <FaDownload />
          Export Data
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Destination Details
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Performance
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Revenue & Growth
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category & Rating
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {destinations.map((destination, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                      <FaMapMarkerAlt className="text-orange-500" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{destination.name}</div>
                      <div className="text-sm text-gray-500">{destination.bookings.toLocaleString()} total bookings</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">
                    <div className="text-sm font-medium text-gray-900">{destination.visitors.toLocaleString()} visitors</div>
                    <div className="text-sm text-gray-500">This period</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">
                    <div className="text-sm font-medium text-gray-900">Rs. {(destination.revenue / 1000000).toFixed(1)}M</div>
                    <div className={`text-sm flex items-center gap-1 ${
                      destination.growth > 20 ? 'text-green-600' : 
                      destination.growth > 10 ? 'text-yellow-600' : 'text-gray-600'
                    }`}>
                      <FaArrowUp className="text-xs" />
                      +{destination.growth}% growth
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">
                    <div className="flex items-center gap-1 mb-1">
                      <FaStar className="text-yellow-500 text-xs" />
                      <span className="font-medium">{destination.rating}</span>
                      <span className="text-gray-500">rating</span>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {destination.category}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="text-blue-500 hover:text-blue-700 p-2 rounded" title="View Details">
                      <FaEye />
                    </button>
                    <button className="text-green-500 hover:text-green-700 p-2 rounded" title="Edit">
                      <FaEdit />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Main Analytics Component
export default function Analytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [filters, setFilters] = useState({
    search: '',
    category: 'All',
    period: 'monthly'
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const metrics = touristsData.performanceMetrics;
  const monthlyData = touristsData.monthlyVisitors;
  const currentMonth = monthlyData[monthlyData.length - 1];

  return (
    <AdminLayout activePage="analytics">
      <AdminHeader 
        title="Analytics Management" 
        subtitle="Monitor and analyze tourism performance across the Sri Lankan travel platform"
      />

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <AnalyticsStatsCard
          icon={<FaDollarSign />}
          title="Total Revenue"
          value={`Rs. ${(metrics.totalRevenue / 1000000000).toFixed(1)}B`}
          change="+31.4% this month"
          color="bg-green-500"
        />
        <AnalyticsStatsCard
          icon={<FaUsers />}
          title="Total Visitors"
          value={currentMonth.visitors.toLocaleString()}
          change="+31.4% this month"
          color="bg-blue-500"
        />
        <AnalyticsStatsCard
          icon={<FaCalendarAlt />}
          title="Average Booking Value"
          value={`Rs. ${(metrics.averageBookingValue / 1000).toFixed(0)}K`}
          change="+15.2% this month"
          color="bg-purple-500"
        />
        <AnalyticsStatsCard
          icon={<FaStar />}
          title="Customer Satisfaction"
          value={`${metrics.customerSatisfaction}/5.0`}
          change="+8.7% this month"
          color="bg-orange-500"
        />
      </div>

      {/* Enhanced Filters */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500" 
              placeholder="Search destinations, services, or metrics..."
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            />
          </div>
          <select 
            className="border rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
            value={filters.category}
            onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
          >
            <option value="All">All Categories</option>
            <option value="Historical">Historical</option>
            <option value="Wildlife">Wildlife</option>
            <option value="Cultural">Cultural</option>
            <option value="Nature">Nature</option>
            <option value="Marine">Marine</option>
            <option value="Adventure">Adventure</option>
          </select>
          <select 
            className="border rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
            value={filters.period}
            onChange={(e) => setFilters(prev => ({ ...prev, period: e.target.value }))}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 flex items-center gap-2 transition-colors">
            <FaDownload /> Export Report
          </button>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Monthly Visitors Chart */}
        <AnalyticsChart
          title="Monthly Visitor Trends (2025)"
          data={touristsData.monthlyVisitors.slice(-6).map(item => ({
            label: item.month.split(' ')[0],
            value: item.visitors
          }))}
        />

        {/* Revenue by Service */}
        <AnalyticsChart
          title="Revenue Distribution by Service"
          data={touristsData.revenueByService.map(item => ({
            label: item.service,
            value: item.amount
          }))}
        />
      </div>

      {/* Service Performance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <AnalyticsStatsCard
          icon={<FaHotel />}
          title="Hotels"
          value={touristsData.serviceBreakdown.hotels.bookings.toLocaleString()}
          change={`+18.5% • Rs. ${(touristsData.serviceBreakdown.hotels.revenue / 1000000000).toFixed(1)}B revenue`}
          color="bg-blue-500"
        />
        <AnalyticsStatsCard
          icon={<FaRoute />}
          title="Tours"
          value={touristsData.serviceBreakdown.tours.bookings.toLocaleString()}
          change={`+25.7% • Rs. ${(touristsData.serviceBreakdown.tours.revenue / 1000000000).toFixed(1)}B revenue`}
          color="bg-green-500"
        />
        <AnalyticsStatsCard
          icon={<FaCar />}
          title="Vehicles"
          value={touristsData.serviceBreakdown.vehicles.bookings.toLocaleString()}
          change={`+22.1% • Rs. ${(touristsData.serviceBreakdown.vehicles.revenue / 1000000).toFixed(1)}M revenue`}
          color="bg-orange-500"
        />
        <AnalyticsStatsCard
          icon={<FaUserTie />}
          title="Guides"
          value={touristsData.serviceBreakdown.guides.bookings.toLocaleString()}
          change={`+31.2% • Rs. ${(touristsData.serviceBreakdown.guides.revenue / 1000000).toFixed(1)}M revenue`}
          color="bg-purple-500"
        />
      </div>

      {/* Visitor Countries Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden mb-8">
        <div className="px-6 py-4 border-b bg-gray-50 flex justify-between items-center">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <FaGlobe className="text-blue-500" />
            Top Source Countries
          </h3>
          <button className="text-sm text-orange-500 hover:text-orange-600 flex items-center gap-1">
            <FaDownload />
            Export Data
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Country Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Visitors & Share
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue & Growth
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {touristsData.visitorCountries.slice(0, 6).map((country, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                        <span className="text-blue-600 font-bold">#{index + 1}</span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{country.country}</div>
                        <div className="text-sm text-gray-500">{country.percentage}% market share</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="text-sm font-medium text-gray-900">{country.visitors.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">visitors this period</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="text-sm font-medium text-gray-900">Rs. {(country.revenue / 1000000000).toFixed(1)}B</div>
                      <div className="text-sm text-green-600 flex items-center gap-1">
                        <FaArrowUp className="text-xs" />
                        +{country.growth}% growth
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="text-blue-500 hover:text-blue-700 p-2 rounded" title="View Details">
                        <FaEye />
                      </button>
                      <button className="text-green-500 hover:text-green-700 p-2 rounded" title="Marketing Insights">
                        <FaChartLine />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Key Performance Metrics Card */}
      <div className="bg-white rounded-xl shadow overflow-hidden mb-8">
        <div className="px-6 py-4 border-b bg-gray-50">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <FaChartLine className="text-green-500" />
            Key Performance Metrics Summary
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">{metrics.averageStayDuration} days</div>
              <div className="text-sm text-gray-600">Average Stay Duration</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{metrics.cancellationRate}%</div>
              <div className="text-sm text-gray-600">Cancellation Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{metrics.repeatCustomers}%</div>
              <div className="text-sm text-gray-600">Repeat Customers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{metrics.totalBookings.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Bookings</div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Destinations Table */}
      <DestinationTable destinations={touristsData.popularDestinations} />
    </AdminLayout>
  );
}
