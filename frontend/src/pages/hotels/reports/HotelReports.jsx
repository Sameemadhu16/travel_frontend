import { useState } from 'react';
import { 
  FaFileDownload, 
  FaCalendarAlt, 
  FaHotel, 
  FaChartBar,
  FaFileInvoiceDollar,
  FaBed,
  FaUserFriends,
  FaDownload
} from 'react-icons/fa';
import HotelLayout from '../../../components/hotel/HotelLayout';

function ReportTypeCard({ icon: Icon, title, description, onGenerate, isGenerating }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
          <Icon className="text-xl" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold mb-2">{title}</h3>
          <p className="text-sm text-gray-600 mb-4">{description}</p>
          <button
            onClick={onGenerate}
            disabled={isGenerating}
            className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary/90 disabled:opacity-50"
          >
            <FaDownload />
            {isGenerating ? 'Generating...' : 'Generate Report'}
          </button>
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
  const branches = [
    "Cinnamon Grand Colombo",
    "Cinnamon Red Colombo",
    "Cinnamon Lakeside",
    "Cinnamon Wild Yala",
    "Cinnamon Bentota Beach",
    "Trinco Blu by Cinnamon"
  ];

  const [filters, setFilters] = useState({
    fromDate: '',
    toDate: '',
    branch: ''
  });

  const [isGenerating, setIsGenerating] = useState(false);

  // Sample recent reports data
  const recentReports = [
    {
      name: "Revenue Report - July 2025",
      date: "2025-07-19",
      branch: "Cinnamon Grand Colombo",
      downloadUrl: "#"
    },
    {
      name: "Occupancy Analysis - Q2 2025",
      date: "2025-07-18",
      branch: "All Branches",
      downloadUrl: "#"
    },
    {
      name: "Guest Demographics Report",
      date: "2025-07-17",
      branch: "Cinnamon Lakeside",
      downloadUrl: "#"
    }
  ];

  const handleGenerateReport = (reportType) => {
    setIsGenerating(true);
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      // Handle report download
    }, 2000);
  };

  const reportTypes = [
    {
      icon: FaFileInvoiceDollar,
      title: "Financial Reports",
      description: "Revenue, expenses, and profit analysis with detailed breakdowns by category.",
    },
    {
      icon: FaChartBar,
      title: "Performance Analytics",
      description: "Occupancy rates, RevPAR, and other key performance indicators.",
    },
    {
      icon: FaBed,
      title: "Room & Inventory",
      description: "Room type performance, maintenance schedules, and inventory status.",
    },
    {
      icon: FaUserFriends,
      title: "Guest Analytics",
      description: "Guest demographics, booking patterns, and preference analysis.",
    }
  ];

  return (
    <HotelLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Reports & Analytics</h1>
          <p className="text-gray-600">Generate and download detailed reports for your hotel operations</p>
        </div>

        {/* Filters */}
        <FilterSection 
          filters={filters} 
          setFilters={setFilters}
          branches={branches}
        />

        {/* Report Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {reportTypes.map((report, index) => (
            <ReportTypeCard
              key={index}
              icon={report.icon}
              title={report.title}
              description={report.description}
              onGenerate={() => handleGenerateReport(report.title)}
              isGenerating={isGenerating}
            />
          ))}
        </div>

        {/* Recent Reports */}
        <RecentReports reports={recentReports} />
      </div>
    </HotelLayout>
  );
}
