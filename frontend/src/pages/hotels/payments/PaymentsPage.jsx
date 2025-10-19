import { useState, useEffect } from 'react';
import { 
  FaEye, 
  FaTimes, 
  FaHotel, 
  FaCalendarAlt, 
  FaSearch, 
  FaClock, 
  FaCheckCircle, 
  FaCreditCard, 
  FaExclamationTriangle, 
  FaUser,
  FaMoneyBillWave
} from 'react-icons/fa';
import HotelLayout from '../../../components/hotel/HotelLayout';

// Enhanced Statistics Card Component (matching dashboard style)
function EnhancedStatsCard({ icon, title, value, change, changeType, color, subtitle, onClick }) {
  const isPositive = changeType === 'positive';
  
  return (
    <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={onClick}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <p className="text-gray-600 text-sm font-medium">{title}</p>
            {changeType && (
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${isPositive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                {isPositive ? '↗' : '↘'} {change}
              </span>
            )}
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-xl ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

// Ceylon Heritage Hotels Payment Transactions Data
const mockCeylonHeritagePayments = [
  {
    id: "PMT-CHH-001",
    transactionRef: "TXN-CHH-10250001",
    guest: {
      name: "Mr. & Mrs. Johnson",
      email: "johnson.family@email.com",
      phone: "+1 555 123 4567",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=center"
    },
    property: "Ceylon Heritage Grand Colombo",
    roomType: "Presidential Suite",
    bookingId: "CHH-BK-001",
    checkIn: "2025-10-25",
    checkOut: "2025-10-30",
    nights: 5,
    amount: 1425000,
    currency: "LKR",
    method: "Visa Credit Card",
    cardLast4: "4567",
    status: "Completed",
    date: "2025-10-20",
    time: "09:45 AM",
    description: "5-night stay in Presidential Suite with breakfast and spa access",
    gateway: "PayHere",
    commission: 71250,
    netAmount: 1353750,
    guestCount: 2,
    nationality: "American"
  },
  {
    id: "PMT-CHH-002",
    transactionRef: "TXN-CHH-10250002",
    guest: {
      name: "Dr. Rajesh Patel",
      email: "rajesh.patel@gmail.com",
      phone: "+91 98765 43210",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=center"
    },
    property: "Ceylon Heritage Kandy",
    roomType: "Heritage Deluxe",
    bookingId: "CHH-BK-002",
    checkIn: "2025-10-22",
    checkOut: "2025-10-25",
    nights: 3,
    amount: 135000,
    currency: "LKR",
    method: "Bank Transfer",
    bankName: "HDFC Bank",
    accountNo: "****7890",
    status: "Pending",
    date: "2025-10-19",
    time: "02:30 PM",
    description: "3-night heritage experience with cultural tour",
    gateway: "International Wire Transfer",
    commission: 6750,
    netAmount: 128250,
    guestCount: 1,
    nationality: "Indian"
  },
  {
    id: "PMT-CHH-003",
    transactionRef: "TXN-CHH-10250003",
    guest: {
      name: "Ms. Sarah Williams",
      email: "sarah.williams@outlook.com",
      phone: "+44 20 1234 5678",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b4e8e4f8?w=100&h=100&fit=crop&crop=center"
    },
    property: "Ceylon Heritage Galle Fort",
    roomType: "Fort View Suite",
    bookingId: "CHH-BK-003",
    checkIn: "2025-10-28",
    checkOut: "2025-11-02",
    nights: 5,
    amount: 475000,
    currency: "LKR",
    method: "Mastercard Debit",
    cardLast4: "8901",
    status: "Refund Requested",
    date: "2025-10-18",
    time: "11:15 AM",
    description: "5-night stay in historic Galle Fort with sunset views",
    gateway: "PayHere",
    commission: 23750,
    netAmount: 451250,
    guestCount: 1,
    nationality: "British",
    refundRequest: {
      requestedDate: "2025-10-19",
      requestedTime: "03:45 PM",
      reason: "Travel restrictions due to family emergency",
      requestedAmount: 237500,
      customerNote: "Due to unexpected family emergency, I need to cancel my trip. Requesting 50% refund as per your cancellation policy. I have attached medical documents as proof."
    }
  },
  {
    id: "PMT-CHH-004",
    transactionRef: "TXN-CHH-10250004",
    guest: {
      name: "Herr Klaus Mueller",
      email: "klaus.mueller@email.de",
      phone: "+49 30 12345678",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=center"
    },
    property: "Ceylon Heritage Nuwara Eliya",
    roomType: "Royal Suite",
    bookingId: "CHH-BK-004",
    checkIn: "2025-11-05",
    checkOut: "2025-11-12",
    nights: 7,
    amount: 875000,
    currency: "LKR",
    method: "Euro Bank Transfer",
    bankName: "Deutsche Bank",
    accountNo: "****2345",
    status: "Completed",
    date: "2025-10-17",
    time: "04:20 PM",
    description: "7-night hill country retreat with tea plantation tours",
    gateway: "SWIFT Transfer",
    commission: 43750,
    netAmount: 831250,
    guestCount: 2,
    nationality: "German"
  },
  {
    id: "PMT-CHH-005",
    transactionRef: "TXN-CHH-10250005",
    guest: {
      name: "Chen Wei & Family",
      email: "chen.wei@email.cn",
      phone: "+86 138 0013 8000",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=center"
    },
    property: "Ceylon Heritage Sigiriya",
    roomType: "Family Heritage",
    bookingId: "CHH-BK-005",
    checkIn: "2025-10-26",
    checkOut: "2025-10-29",
    nights: 3,
    amount: 204000,
    currency: "LKR",
    method: "Union Pay",
    cardLast4: "6789",
    status: "Failed",
    date: "2025-10-16",
    time: "10:30 AM",
    description: "3-night family package with Sigiriya Rock Fortress tours",
    gateway: "Union Pay Gateway",
    commission: 10200,
    netAmount: 193800,
    guestCount: 4,
    nationality: "Chinese",
    failureReason: "Card authentication failed"
  },
  {
    id: "PMT-CHH-006",
    transactionRef: "TXN-CHH-10250006",
    guest: {
      name: "Mr. & Mrs. Nakamura",
      email: "nakamura@email.jp",
      phone: "+81 3 1234 5678",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=center"
    },
    property: "Ceylon Heritage Bentota Beach",
    roomType: "Honeymoon Suite",
    bookingId: "CHH-BK-006",
    checkIn: "2025-11-01",
    checkOut: "2025-11-08",
    nights: 7,
    amount: 665000,
    currency: "LKR",
    method: "JCB Credit Card",
    cardLast4: "1234",
    status: "Completed",
    date: "2025-10-15",
    time: "08:45 AM",
    description: "7-night honeymoon package with beach activities and spa treatments",
    gateway: "PayHere",
    commission: 33250,
    netAmount: 631750,
    guestCount: 2,
    nationality: "Japanese"
  }
];

// Ceylon Heritage Hotels Status Badge
function StatusBadge({ status }) {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'Completed': return { color: 'bg-green-100 text-green-700 border-green-200', icon: FaCheckCircle };
      case 'Pending': return { color: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: FaClock };
      case 'Failed': return { color: 'bg-red-100 text-red-700 border-red-200', icon: FaTimes };
      case 'Refunded': return { color: 'bg-purple-100 text-purple-700 border-purple-200', icon: FaArrowUp };
      case 'Refund Requested': return { color: 'bg-orange-100 text-orange-700 border-orange-200', icon: FaExclamationTriangle };
      default: return { color: 'bg-gray-100 text-gray-600 border-gray-200', icon: FaClock };
    }
  };

  const { color, icon: Icon } = getStatusConfig(status);

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${color}`}>
      <Icon className="text-xs" />
      {status}
    </span>
  );
}



// Ceylon Heritage Hotels Payment Details Modal
function PaymentDetailsModal({ payment, isOpen, onClose, formatCurrency }) {
  if (!isOpen || !payment) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Payment Details</h2>
            <p className="text-gray-600">Transaction Reference: {payment.transactionRef}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Status and Amount Section */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <StatusBadge status={payment.status} />
              <div className="text-right">
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="text-3xl font-bold text-gray-900">{formatCurrency(payment.amount)}</p>
              </div>
            </div>
            
            {payment.refundRequest && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <FaExclamationTriangle className="text-orange-600" />
                  <h4 className="font-semibold text-orange-800">Refund Request</h4>
                </div>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Requested Amount:</strong> {formatCurrency(payment.refundRequest.requestedAmount)}
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Reason:</strong> {payment.refundRequest.reason}
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Request Date:</strong> {payment.refundRequest.requestedDate} at {payment.refundRequest.requestedTime}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Customer Note:</strong> {payment.refundRequest.customerNote}
                </p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Guest Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Guest Information</h3>
              
              <div className="flex items-center gap-4">
                <img 
                  className="h-16 w-16 rounded-full object-cover"
                  src={payment.guest.avatar}
                  alt={payment.guest.name}
                />
                <div>
                  <p className="font-semibold text-gray-900">{payment.guest.name}</p>
                  <p className="text-sm text-gray-600">{payment.guest.email}</p>
                  <p className="text-sm text-gray-600">{payment.guest.phone}</p>
                  <p className="text-xs text-gray-500">{payment.nationality} National</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Guest Count</p>
                  <p className="text-sm text-gray-900">{payment.guestCount} {payment.guestCount === 1 ? 'Guest' : 'Guests'}</p>
                </div>
              </div>
            </div>

            {/* Booking Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Booking Information</h3>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-700">Property</p>
                  <p className="text-sm text-gray-900">{payment.property}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-700">Room Type</p>
                  <p className="text-sm text-gray-900">{payment.roomType}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-700">Booking ID</p>
                  <p className="text-sm text-gray-900">{payment.bookingId}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Check-in</p>
                    <p className="text-sm text-gray-900">{payment.checkIn}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Check-out</p>
                    <p className="text-sm text-gray-900">{payment.checkOut}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-700">Duration</p>
                  <p className="text-sm text-gray-900">{payment.nights} nights</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Payment Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <p className="text-sm font-medium text-gray-700">Payment Method</p>
                <p className="text-sm text-gray-900">{payment.method}</p>
                {payment.cardLast4 && (
                  <p className="text-xs text-gray-500">Card ending in {payment.cardLast4}</p>
                )}
                {payment.bankName && (
                  <p className="text-xs text-gray-500">{payment.bankName}</p>
                )}
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700">Payment Gateway</p>
                <p className="text-sm text-gray-900">{payment.gateway}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700">Transaction Date</p>
                <p className="text-sm text-gray-900">{payment.date} at {payment.time}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700">Commission</p>
                <p className="text-sm text-gray-900">{formatCurrency(payment.commission)}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700">Net Amount</p>
                <p className="text-sm text-gray-900">{formatCurrency(payment.netAmount)}</p>
              </div>
              
              {payment.failureReason && (
                <div>
                  <p className="text-sm font-medium text-red-700">Failure Reason</p>
                  <p className="text-sm text-red-600">{payment.failureReason}</p>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Booking Description</h3>
            <p className="text-sm text-gray-700">{payment.description}</p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            {payment.status === 'Pending' && (
              <>
                <PrimaryButton text="Process Payment" />
                <SecondaryButton text="Cancel Payment" />
              </>
            )}
            {payment.status === 'Refund Requested' && (
              <>
                <PrimaryButton text="Approve Refund" />
                <SecondaryButton text="Reject Refund" />
              </>
            )}
            {payment.status === 'Failed' && (
              <PrimaryButton text="Retry Payment" />
            )}
            <SecondaryButton text="Download Receipt" />
            <SecondaryButton text="Email Receipt" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState(mockCeylonHeritagePayments);
  const [filteredPayments, setFilteredPayments] = useState(payments);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  // Calculate payment statistics for Ceylon Heritage Hotels
  const stats = {
    totalPayments: payments.length,
    totalRevenue: payments.reduce((sum, payment) => sum + payment.amount, 0),
    completedPayments: payments.filter(p => p.status === 'Completed').length,
    pendingPayments: payments.filter(p => p.status === 'Pending').length,
    failedPayments: payments.filter(p => p.status === 'Failed').length,
    refundRequests: payments.filter(p => p.status === 'Refund Requested').length
  };

  // Filter payments based on search and status
  useEffect(() => {
    let filtered = payments;

    if (searchTerm) {
      filtered = filtered.filter(payment =>
        payment.guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.transactionRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.guest.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'All') {
      filtered = filtered.filter(payment => payment.status === statusFilter);
    }

    setFilteredPayments(filtered);
  }, [searchTerm, statusFilter, payments]);

  // Format currency for Ceylon Heritage Hotels (LKR)
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR'
    }).format(amount);
  };

  // View payment details
  const viewPaymentDetails = (payment) => {
    setSelectedPayment(payment);
    setShowModal(true);
  };

  return (
    <HotelLayout>
      <div className="p-6">
        {/* Header Section - Hotel Chain Payments */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Ceylon Heritage Payments</h1>
            <p className="text-gray-600">Multi-property payment management for Sri Lanka's premier hotel chain. Monitor transactions across all properties.</p>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">{stats.completedPayments} Completed</span>
              <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">{formatCurrency(stats.totalRevenue)}</span>
              <span className="text-sm bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-medium">Chain-wide Payments</span>
            </div>
          </div>
          <div className="mt-4 lg:mt-0 text-right">
            <p className="text-sm text-gray-500">Current Time (Sri Lanka)</p>
            <p className="text-lg font-semibold text-orange-600">{new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}</p>
            <p className="text-sm text-gray-500 mt-1">Payment Operations Center</p>
          </div>
        </div>

        {/* Payment Alerts */}
        {stats.pendingPayments > 0 && (
          <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FaExclamationTriangle className="text-red-600 text-xl animate-pulse" />
                <div>
                  <h3 className="font-semibold text-red-800">PAYMENT ALERT: {stats.pendingPayments} pending payments require attention</h3>
                  <p className="text-red-700 text-sm">Follow-up required • Outstanding amount: {formatCurrency(payments.filter(p => p.status === 'Pending').reduce((sum, p) => sum + p.amount, 0))}</p>
                </div>
              </div>
              <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Review Pending
              </button>
            </div>
          </div>
        )}

        {/* Chain-wide Payment Summary */}
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-4 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FaMoneyBillWave className="text-orange-600 text-xl" />
              <div>
                <h3 className="font-semibold text-orange-800">Chain Operations: {stats.totalPayments} transactions processed across 4 properties</h3>
                <p className="text-orange-700 text-sm">Daily revenue tracking • Multi-currency support • International payment gateways active</p>
              </div>
            </div>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Payment Analytics
            </button>
          </div>
        </div>

        {/* Chain-wide Payment Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <EnhancedStatsCard
            icon={<FaMoneyBillWave className="text-white" />}
            title="Total Revenue"
            value={formatCurrency(stats.totalRevenue)}
            change="12.8%"
            changeType="positive"
            color="bg-blue-500"
            subtitle={`Chain-wide • ${stats.totalPayments} transactions`}
          />
          <EnhancedStatsCard
            icon={<FaCheckCircle className="text-white" />}
            title="Success Rate"
            value={`${Math.round((stats.completedPayments / stats.totalPayments) * 100)}%`}
            change="4.2%"
            changeType="positive"
            color="bg-green-500"
            subtitle={`${stats.completedPayments} completed • ${stats.failedPayments} failed`}
          />
          <EnhancedStatsCard
            icon={<FaClock className="text-white" />}
            title="Pending Review"
            value={stats.pendingPayments}
            change="7.3%"
            changeType="negative"
            color="bg-yellow-500"
            subtitle={`Requires attention • Follow-up needed`}
          />
          <EnhancedStatsCard
            icon={<FaExclamationTriangle className="text-white" />}
            title="Chain Average"
            value={formatCurrency(Math.round(stats.totalRevenue / stats.totalPayments))}
            change="3.5%"
            changeType="positive"
            color="bg-purple-500"
            subtitle={`Per transaction • Multi-property`}
          />
        </div>

        {/* Property Payment Performance Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { name: "Grand Colombo", location: "Colombo 3", revenue: 1425000, transactions: 8, status: "Active", success: 95 },
            { name: "Heritage Kandy", location: "Kandy Hills", revenue: 875000, transactions: 12, status: "Active", success: 88 },
            { name: "Galle Fort", location: "Historic Galle", revenue: 665000, transactions: 6, status: "Active", success: 92 },
            { name: "Bentota Beach", location: "Beach Resort", revenue: 1110000, transactions: 4, status: "Active", success: 100 }
          ].map((property, index) => (
            <div key={index} className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-gray-900">{property.name}</h3>
                  <p className="text-sm text-gray-600">{property.location}</p>
                </div>
                <span className="text-xs px-2 py-1 rounded-full font-medium bg-green-100 text-green-700">
                  {property.status}
                </span>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Revenue</span>
                  <span className="font-semibold text-green-600">{formatCurrency(property.revenue)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Transactions</span>
                  <span className="font-semibold">{property.transactions}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Success Rate</span>
                  <span className="font-semibold text-blue-600">{property.success}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Avg Transaction</span>
                  <span className="font-semibold">{formatCurrency(Math.round(property.revenue / property.transactions))}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Payment Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Payment Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full p-2 border rounded-lg"
              >
                <option value="All">All Status</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
                <option value="Refund Requested">Refund Requested</option>
                <option value="Refunded">Refunded</option>
              </select>
            </div>
          </div>

          {/* Search */}
          <div className="mt-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by guest name, booking ID, transaction reference, or email..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Recent Payment Activities */}
          <div className="lg:col-span-2 space-y-6">
            {/* Chain-wide Recent Payment Activities */}
            <div className="bg-white rounded-xl shadow overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Chain-wide Payment Activities</h2>
                  <button className="text-orange-500 hover:text-orange-600 text-sm font-medium">
                    View All Transactions
                  </button>
                </div>
                <p className="text-sm text-gray-600 mt-1">Live payment updates from all Ceylon Heritage Hotels properties</p>
              </div>
              <div className="p-6 space-y-4">
                {filteredPayments.slice(0, 6).map(payment => (
                  <div key={payment.id} className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                    <img 
                      className="w-12 h-12 rounded-full object-cover"
                      src={payment.guest.avatar}
                      alt={payment.guest.name}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-gray-900">{payment.guest.name}</h4>
                        <span className="text-sm font-bold text-green-600">{formatCurrency(payment.amount)}</span>
                      </div>
                      <p className="text-sm text-gray-600">{payment.property} • {payment.roomType}</p>
                      <p className="text-xs text-gray-500">{payment.date} at {payment.time} • {payment.method}</p>
                    </div>
                    <div className="text-right">
                      <StatusBadge status={payment.status} />
                      <p className="text-xs text-gray-500 mt-1">{payment.nationality}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column - Payment Summary & Controls */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Payment Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-lg font-medium transition-colors">
                  Export Daily Report
                </button>
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg font-medium transition-colors">
                  Payment Analytics
                </button>
                <button className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-3 rounded-lg font-medium transition-colors">
                  Process Refunds
                </button>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Payment Methods</h3>
              <div className="space-y-3">
                {[
                  { method: "Credit Cards", count: 12, percentage: 67 },
                  { method: "Bank Transfer", count: 4, percentage: 22 },
                  { method: "Digital Wallets", count: 2, percentage: 11 }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{item.method}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{item.count}</span>
                      <span className="text-xs text-gray-500">({item.percentage}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Today's Schedule */}
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Payment Schedule</h3>
              <div className="space-y-4">
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <FaClock className="text-orange-500 text-xl" />
                    <div>
                      <p className="font-semibold text-gray-900">Settlement Due</p>
                      <p className="text-sm text-gray-700">Daily batch processing</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    6:00 PM • {formatCurrency(stats.totalRevenue)}
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <FaExclamationTriangle className="text-blue-500 text-xl" />
                    <div>
                      <p className="font-semibold text-gray-900">Pending Review</p>
                      <p className="text-sm text-gray-700">{stats.pendingPayments} transactions</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    Requires manual verification
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Details Modal */}
        {showModal && selectedPayment && (
          <PaymentDetailsModal
            payment={selectedPayment}
            isOpen={showModal}
            onClose={() => {
              setShowModal(false);
              setSelectedPayment(null);
            }}
            formatCurrency={formatCurrency}
          />
        )}
      </div>
    </HotelLayout>
  );
}
