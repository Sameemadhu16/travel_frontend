import { useState } from 'react';
import { 
  FaCalendarAlt, 
  FaHotel, 
  FaMoneyBillWave,
  FaSearch,
  FaUser,
  FaReceipt
} from 'react-icons/fa';
import HotelLayout from '../../../components/hotel/HotelLayout';
import PaymentDetailsModal from '../../../components/hotel/PaymentDetailsModal';

function StatusBadge({ status }) {
  const statusColors = {
    'Completed': 'bg-green-100 text-green-800',
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Failed': 'bg-red-100 text-red-800',
    'Refunded': 'bg-gray-100 text-gray-800'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[status]}`}>
      {status}
    </span>
  );
}

function FilterSection({ filters, setFilters, branches }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4">Payment Filters</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

        {/* Payment Status */}
        <div>
          <label className="block text-sm font-medium mb-2">Payment Status</label>
          <select
            value={filters.paymentStatus}
            onChange={(e) => setFilters({...filters, paymentStatus: e.target.value})}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">All Statuses</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
            <option value="Refunded">Refunded</option>
          </select>
        </div>
      </div>

      {/* Search */}
      <div className="mt-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by payment ID, guest name, or booking ID..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={filters.search}
            onChange={(e) => setFilters({...filters, search: e.target.value})}
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>
    </div>
  );
}

function PaymentCard({ payment, onViewDetails }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold">{payment.guestName}</h3>
          <p className="text-sm text-gray-500">Payment ID: {payment.paymentId}</p>
          <p className="text-sm text-gray-500">Booking ID: {payment.bookingId}</p>
        </div>
        <StatusBadge status={payment.status} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        <div className="flex items-start gap-2">
          <FaHotel className="mt-1 text-gray-400" />
          <div>
            <p className="text-sm text-gray-500">Branch</p>
            <p className="font-medium">{payment.branch}</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <FaCalendarAlt className="mt-1 text-gray-400" />
          <div>
            <p className="text-sm text-gray-500">Payment Date</p>
            <p className="font-medium">{payment.paymentDate}</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <FaMoneyBillWave className="mt-1 text-gray-400" />
          <div>
            <p className="text-sm text-gray-500">Amount</p>
            <p className="font-medium">LKR {payment.amount}</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <FaReceipt className="mt-1 text-gray-400" />
          <div>
            <p className="text-sm text-gray-500">Payment Method</p>
            <p className="font-medium">{payment.paymentMethod}</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <FaUser className="mt-1 text-gray-400" />
          <div>
            <p className="text-sm text-gray-500">Guest Name</p>
            <p className="font-medium">{payment.guestName}</p>
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex flex-wrap gap-4 justify-between items-center">
          <div>
            <p className="text-sm font-medium">Room: {payment.roomType}</p>
            <p className="text-sm text-gray-500">Stay Duration: {payment.duration}</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => onViewDetails(payment)}
              className="px-4 py-2 text-brand-primary hover:bg-brand-primary/10 rounded-lg"
            >
              View Details
            </button>
            {payment.status === 'Pending' && (
              <button className="px-4 py-2 bg-brand-primary text-white rounded-lg">
                Process Payment
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentsPage() {
  const [selectedPayment, setSelectedPayment] = useState(null);
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
    branch: '',
    paymentStatus: '',
    search: ''
  });

  // Sample payments data - replace with API call
  const payments = [
    {
      paymentId: "PAY001",
      bookingId: "BK001",
      guestName: "John Smith",
      branch: "Cinnamon Grand Colombo",
      paymentDate: "2025-07-20",
      amount: "135,000",
      status: "Completed",
      paymentMethod: "Credit Card",
      roomType: "Deluxe Room",
      duration: "3 nights"
    },
    {
      paymentId: "PAY002",
      bookingId: "BK002",
      guestName: "Sarah Wilson",
      branch: "Cinnamon Red Colombo",
      paymentDate: "2025-07-21",
      amount: "50,000",
      status: "Pending",
      paymentMethod: "Bank Transfer",
      roomType: "Standard Room",
      duration: "2 nights"
    },
    {
      paymentId: "PAY003",
      bookingId: "BK003",
      guestName: "David Brown",
      branch: "Cinnamon Lakeside",
      paymentDate: "2025-07-19",
      amount: "70,000",
      status: "Failed",
      paymentMethod: "Credit Card",
      roomType: "Executive Suite",
      duration: "2 nights"
    }
  ];

  // Calculate summary statistics
  const stats = {
    totalPayments: payments.length,
    totalRevenue: payments
      .filter(p => p.status === 'Completed')
      .reduce((sum, p) => sum + parseInt(p.amount.replace(/,/g, '')), 0)
      .toLocaleString(),
    pendingPayments: payments.filter(p => p.status === 'Pending').length,
    failedPayments: payments.filter(p => p.status === 'Failed').length
  };

  return (
    <HotelLayout 
      activePage="payments"
      pageTitle="Payments"
      pageSubtitle="Manage hotel payments and transactions"
    >
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Payments</h1>
          <p className="text-gray-600">Manage hotel payments and transactions</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-gray-500 mb-2">Total Payments</h3>
            <p className="text-2xl font-semibold">{stats.totalPayments}</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-gray-500 mb-2">Total Revenue</h3>
            <p className="text-2xl font-semibold">LKR {stats.totalRevenue}</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-gray-500 mb-2">Pending Payments</h3>
            <p className="text-2xl font-semibold text-yellow-600">{stats.pendingPayments}</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-gray-500 mb-2">Failed Payments</h3>
            <p className="text-2xl font-semibold text-red-600">{stats.failedPayments}</p>
          </div>
        </div>

        {/* Filters */}
        <FilterSection 
          filters={filters} 
          setFilters={setFilters}
          branches={branches}
        />

        {/* Payments List */}
        <div className="space-y-6">
          {payments.map((payment, index) => (
            <PaymentCard 
              key={index} 
              payment={payment} 
              onViewDetails={setSelectedPayment}
            />
          ))}
        </div>

        {/* Payment Details Modal */}
        {selectedPayment && (
          <PaymentDetailsModal
            payment={selectedPayment}
            onClose={() => setSelectedPayment(null)}
          />
        )}

        {/* Pagination */}
        <div className="mt-6 flex justify-center">
          <nav className="flex items-center gap-2">
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">Previous</button>
            <button className="px-4 py-2 bg-brand-primary text-white rounded-lg">1</button>
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">2</button>
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">3</button>
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">Next</button>
          </nav>
        </div>
      </div>
    </HotelLayout>
  );
}
