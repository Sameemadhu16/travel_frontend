import { useState, useEffect } from 'react';
import { 
  FaFileDownload, 
  FaCalendarAlt, 
  FaHotel, 
  FaChartBar,
  FaFileInvoiceDollar,
  FaBed,
  FaUserFriends,
  FaDownload,
  FaChartLine,
  FaStar,
  FaWallet,
  FaUsers,
  FaMapMarkerAlt,
  FaGlobe,
  FaExclamationTriangle,
  FaCheckCircle,
  FaBell,
  FaArrowUp,
  FaArrowDown,
  FaCog,
  FaPrint,
  FaFileExcel,
  FaFilePdf
} from 'react-icons/fa';
import HotelLayout from '../../../components/hotel/HotelLayout';

// Enhanced Statistics Card Component (matching dashboard style)
function EnhancedStatsCard({ icon, title, value, change, changeType, subtitle, bgColor }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-lg ${bgColor}`}>
          {icon}
        </div>
      </div>
      {change && (
        <div className="mt-3">
          <span className={`text-sm font-medium flex items-center ${
            changeType === 'positive' ? 'text-green-600' : 
            changeType === 'warning' ? 'text-orange-600' : 'text-red-600'
          }`}>
            {changeType === 'positive' ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
            {change}
          </span>
        </div>
      )}
    </div>
  );
}

function ReportTypeCard({ icon: Icon, title, description, onGenerate, isGenerating, bgColor }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${bgColor}`}>
          <Icon className="text-xl text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold mb-2 text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600 mb-4">{description}</p>
          <div className="flex gap-2">
            <button
              onClick={() => onGenerate('pdf')}
              disabled={isGenerating}
              className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 text-sm"
            >
              <FaFilePdf />
              PDF
            </button>
            <button
              onClick={() => onGenerate('excel')}
              disabled={isGenerating}
              className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 text-sm"
            >
              <FaFileExcel />
              Excel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterSection({ filters, setFilters, branches }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4">Report Filters</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium mb-2">From Date</label>
          <input
            type="date"
            value={filters.fromDate}
            onChange={(e) => setFilters({...filters, fromDate: e.target.value})}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">To Date</label>
          <input
            type="date"
            value={filters.toDate}
            onChange={(e) => setFilters({...filters, toDate: e.target.value})}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Branch Filter */}
        <div>
          <label className="block text-sm font-medium mb-2">Branch</label>
          <select 
            value={filters.branch}
            onChange={(e) => setFilters({...filters, branch: e.target.value})}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">All Branches</option>
            {branches.map(branch => (
              <option key={branch} value={branch}>{branch}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

function RecentReports({ reports }) {
  return (
    <div className="bg-white rounded-xl shadow">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold">Recently Generated Reports</h2>
      </div>
      <div className="divide-y">
        {reports.map((report, index) => (
          <div key={index} className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                <FaFileDownload />
              </div>
              <div>
                <h3 className="font-medium">{report.name}</h3>
                <p className="text-sm text-gray-500">{report.date} • {report.branch}</p>
              </div>
            </div>
            <a
              href={report.downloadUrl}
              className="flex items-center gap-2 px-4 py-2 text-brand-primary hover:bg-brand-primary/10 rounded-lg"
            >
              <FaDownload />
              Download
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HotelReports() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const formatDateTime = (date) => {
    return {
      date: date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      time: date.toLocaleTimeString('en-US', {
        hour12: true,
        hour: '2-digit',
        minute: '2-digit'
      })
    };
  };

  const { date: currentDate, time: currentTime } = formatDateTime(currentDateTime);

  const ceylonHeritageProperties = [
    "Ceylon Heritage Grand Colombo",
    "Ceylon Heritage Kandy",
    "Ceylon Heritage Galle Fort", 
    "Ceylon Heritage Nuwara Eliya",
    "Ceylon Heritage Sigiriya",
    "Ceylon Heritage Bentota Beach"
  ];

  const [filters, setFilters] = useState({
    fromDate: '',
    toDate: '',
    branch: ''
  });

  // Ceylon Heritage Hotels analytics data
  const analyticsData = {
    chainRevenue: 15850000, // LKR per day
    monthlyRevenue: 475500000, // LKR per month
    totalReports: 347,
    automatedReports: 289,
    customReports: 58,
    reportAccuracy: 98.7,
    dataProcessing: "Real-time",
    lastUpdate: "2 minutes ago"
  };

  // Sample recent reports data with Ceylon Heritage branding
  const recentReports = [
    {
      name: "Ceylon Heritage Chain Revenue Analysis - October 2025",
      date: "2025-10-19",
      branch: "All Properties",
      type: "Financial",
      size: "2.4 MB",
      format: "PDF + Excel",
      downloadUrl: "#",
      generatedBy: "Ms. Chamani Perera - Finance Director",
      insights: "Tea season boost: +18% revenue in Nuwara Eliya property"
    },
    {
      name: "Heritage Guest Demographics & Cultural Preferences",
      date: "2025-10-18", 
      branch: "Ceylon Heritage Kandy",
      type: "Analytics",
      size: "1.8 MB",
      format: "Excel Dashboard",
      downloadUrl: "#",
      generatedBy: "Mr. Chandana Perera - Property Manager",
      insights: "67% international guests interested in Temple of Tooth tours"
    },
    {
      name: "Sigiriya Rock View Rooms Performance Report",
      date: "2025-10-17",
      branch: "Ceylon Heritage Sigiriya",
      type: "Occupancy",
      size: "945 KB",
      format: "PDF",
      downloadUrl: "#",
      generatedBy: "Mrs. Nilanthi Silva - Revenue Manager",
      insights: "Rock view suites achieving 127% of target pricing"
    },
    {
      name: "Heritage Hospitality Training Effectiveness Report",
      date: "2025-10-16",
      branch: "All Properties",
      type: "Operations",
      size: "1.2 MB", 
      format: "PDF + Charts",
      downloadUrl: "#",
      generatedBy: "Dr. Rohan Wickramasinghe - HR Director",
      insights: "Traditional hospitality training improved guest satisfaction by 12%"
    },
    {
      name: "Fort View Suites Revenue Optimization - Galle",
      date: "2025-10-15",
      branch: "Ceylon Heritage Galle Fort",
      type: "Revenue",
      size: "786 KB",
      format: "Excel",
      downloadUrl: "#",
      generatedBy: "Mrs. Priyanka Fernando - Property Manager",
      insights: "Colonial architecture tours package increased RevPAR by 23%"
    }
  ];

  const handleGenerateReport = (reportType, format) => {
    setIsGenerating(true);
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      // Handle report download
      console.log(`Generating ${reportType} report in ${format} format`);
    }, 2000);
  };

  const reportTypes = [
    {
      icon: FaFileInvoiceDollar,
      title: "Financial Performance Reports",
      description: "Revenue analysis, profit margins, and financial forecasting across all Ceylon Heritage properties with currency conversion and tax implications.",
      bgColor: "bg-green-600"
    },
    {
      icon: FaChartBar,
      title: "Occupancy & Performance Analytics", 
      description: "Room occupancy rates, RevPAR analysis, seasonal trends, and competitive positioning in Sri Lankan luxury hospitality market.",
      bgColor: "bg-blue-600"
    },
    {
      icon: FaBed,
      title: "Heritage Property & Room Analysis",
      description: "Historic property maintenance, heritage room performance, cultural amenities utilization, and preservation cost analysis.",
      bgColor: "bg-purple-600"
    },
    {
      icon: FaUserFriends,
      title: "Cultural Tourism & Guest Analytics",
      description: "International vs local guest demographics, cultural experience preferences, heritage tour bookings, and guest satisfaction metrics.",
      bgColor: "bg-orange-600"
    },
    {
      icon: FaStar,
      title: "Guest Experience & Review Analytics",
      description: "Review sentiment analysis, service quality metrics, cultural hospitality feedback, and reputation management across properties.",
      bgColor: "bg-yellow-600"
    },
    {
      icon: FaHotel,
      title: "Multi-Property Chain Analytics",
      description: "Cross-property performance comparison, chain-wide KPIs, resource allocation optimization, and expansion opportunity analysis.",
      bgColor: "bg-indigo-600"
    }
  ];

  return (
    <HotelLayout>
      <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
        {/* Header Section - Hotel Chain Reports */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Ceylon Heritage Hotels</h1>
            <p className="text-gray-600">Advanced Analytics & Reporting Center for Sri Lanka's premier heritage hotel chain. Generate comprehensive insights across all properties.</p>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">6 Properties Active</span>
              <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">{analyticsData.totalReports} Reports Generated</span>
              <span className="text-sm bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-medium">Heritage Analytics Suite</span>
            </div>
          </div>
          <div className="mt-4 lg:mt-0 text-right">
            <p className="text-sm text-gray-500">Current Time (Sri Lanka)</p>
            <p className="text-lg font-semibold text-orange-600">{currentDate} at {currentTime}</p>
            <p className="text-sm text-gray-500 mt-1">Analytics & Reporting Center</p>
          </div>
        </div>

        {/* Analytics Alerts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <div className="flex items-center">
              <FaChartLine className="text-blue-500 mr-3" />
              <div>
                <p className="text-blue-800 font-semibold">Peak Season Analytics Ready</p>
                <p className="text-blue-600 text-sm">Tea season reports show 18% revenue increase in hill country properties</p>
              </div>
            </div>
          </div>
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <div className="flex items-center">
              <FaCheckCircle className="text-green-500 mr-3" />
              <div>
                <p className="text-green-800 font-semibold">Real-time Data Processing</p>
                <p className="text-green-600 text-sm">All property data synchronized - Last update: {analyticsData.lastUpdate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Analytics Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <EnhancedStatsCard
            icon={<FaWallet className="text-green-500" />}
            title="Chain Revenue"
            value={`LKR ${(analyticsData.chainRevenue / 1000000).toFixed(1)}M`}
            subtitle="Daily across 6 properties"
            change="+12.4% vs last month"
            changeType="positive"
            bgColor="bg-green-50"
          />
          <EnhancedStatsCard
            icon={<FaChartBar className="text-blue-500" />}
            title="Generated Reports"
            value={analyticsData.totalReports}
            subtitle={`${analyticsData.automatedReports} automated • ${analyticsData.customReports} custom`}
            change="+23 this month"
            changeType="positive"
            bgColor="bg-blue-50"
          />
          <EnhancedStatsCard
            icon={<FaCog className="text-purple-500" />}
            title="Data Accuracy"
            value={`${analyticsData.reportAccuracy}%`}
            subtitle="Real-time processing"
            change="+0.3% improvement"
            changeType="positive"
            bgColor="bg-purple-50"
          />
          <EnhancedStatsCard
            icon={<FaStar className="text-orange-500" />}
            title="Heritage Insights"
            value="Premium"
            subtitle="Cultural analytics enabled"
            change="Advanced features active"
            changeType="positive"
            bgColor="bg-orange-50"
          />
        </div>

        {/* Filters */}
        <FilterSection 
          filters={filters} 
          setFilters={setFilters}
          branches={ceylonHeritageProperties}
        />

        {/* Report Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {reportTypes.map((report, index) => (
            <ReportTypeCard
              key={index}
              icon={report.icon}
              title={report.title}
              description={report.description}
              onGenerate={handleGenerateReport}
              isGenerating={isGenerating}
              bgColor={report.bgColor}
            />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Reports (2/3 width) */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center">
                  <FaFileDownload className="mr-2 text-amber-600" />
                  Recent Ceylon Heritage Reports
                </h2>
                <div className="flex space-x-2">
                  <select className="border rounded px-3 py-1 text-sm">
                    <option>All Properties</option>
                    {ceylonHeritageProperties.map(property => (
                      <option key={property} value={property}>{property}</option>
                    ))}
                  </select>
                  <select className="border rounded px-3 py-1 text-sm">
                    <option>All Report Types</option>
                    <option>Financial</option>
                    <option>Analytics</option>
                    <option>Occupancy</option>
                    <option>Operations</option>
                    <option>Revenue</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                {recentReports.map((report, index) => (
                  <div key={index} className="border-b pb-4 last:border-b-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-1">{report.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                          <span>{report.branch}</span>
                          <span>•</span>
                          <span>{report.date}</span>
                          <span>•</span>
                          <span>{report.type}</span>
                          <span>•</span>
                          <span>{report.size}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          <strong>Generated by:</strong> {report.generatedBy}
                        </p>
                        <div className="bg-amber-50 p-2 rounded text-sm">
                          <strong className="text-amber-800">Key Insight:</strong>
                          <span className="text-amber-700 ml-1">{report.insights}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {report.format}
                        </span>
                        <button className="bg-amber-600 text-white px-3 py-1 rounded text-sm hover:bg-amber-700 flex items-center">
                          <FaDownload className="mr-1" />
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Analytics Sidebar (1/3 width) */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <FaCog className="mr-2 text-amber-600" />
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full bg-amber-600 text-white py-2 px-4 rounded hover:bg-amber-700">
                  Chain-wide Monthly Report
                </button>
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                  Heritage Performance Dashboard
                </button>
                <button className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
                  Cultural Tourism Analytics
                </button>
                <button className="w-full border border-gray-300 py-2 px-4 rounded hover:bg-gray-50">
                  Custom Report Builder
                </button>
              </div>
            </div>

            {/* Data Insights */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <FaChartLine className="mr-2 text-amber-600" />
                Heritage Analytics Insights
              </h3>
              <div className="space-y-4 text-sm">
                <div className="bg-green-50 p-3 rounded">
                  <p className="font-semibold text-green-800">Top Performing Categories</p>
                  <ul className="text-green-700 mt-1 space-y-1">
                    <li>• Heritage room types: +24% premium</li>
                    <li>• Cultural experience packages: +18%</li>
                    <li>• Tea plantation tours: +31%</li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-3 rounded">
                  <p className="font-semibold text-blue-800">Seasonal Trends</p>
                  <ul className="text-blue-700 mt-1 space-y-1">
                    <li>• Hill country peak: Oct-Feb</li>
                    <li>• Cultural festivals boost: +27%</li>
                    <li>• Monsoon strategy effective</li>
                  </ul>
                </div>
                <div className="bg-orange-50 p-3 rounded">
                  <p className="font-semibold text-orange-800">Guest Demographics</p>
                  <ul className="text-orange-700 mt-1 space-y-1">
                    <li>• International guests: 58%</li>
                    <li>• Heritage seekers: 42%</li>
                    <li>• Cultural tour groups: 23%</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <FaBell className="mr-2 text-amber-600" />
                System Status
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span>Data Processing:</span>
                  <span className="text-green-600 font-semibold">{analyticsData.dataProcessing}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Last Sync:</span>
                  <span className="text-green-600">{analyticsData.lastUpdate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Accuracy Rate:</span>
                  <span className="text-green-600 font-semibold">{analyticsData.reportAccuracy}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Properties Online:</span>
                  <span className="text-green-600 font-semibold">6/6</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HotelLayout>
  );
}
