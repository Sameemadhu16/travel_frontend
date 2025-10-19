import { useState, useEffect } from 'react';
import { FaFilter, FaEye, FaCheck, FaTimes, FaHotel, FaUserTie, FaCar, FaCalendar, FaPhone, FaEnvelope, FaStar, FaMapMarkerAlt, FaSearch, FaClock, FaUsers, FaUserCheck, FaUserPlus, FaUserTimes, FaCheckCircle, FaDownload, FaBan, FaCreditCard, FaRedo, FaUndo, FaRupeeSign, FaExclamationTriangle, FaUser } from 'react-icons/fa';
import AdminLayout from '../../components/admin/AdminLayout';
import AdminHeader from '../../components/admin/AdminHeader';
import StatusBadge from '../../components/admin/StatusBadge';
import Pagination from '../../components/admin/Pagination';

// Sri Lankan Payment Transactions Data
const mockPaymentTransactions = [
  {
    id: "PMT-2025-001",
    transactionRef: "TXN-SL-10250001",
    user: {
      name: "Kasun Perera",
      email: "kasun.perera@gmail.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=center"
    },
    service: "Hotel Booking",
    serviceName: "Cinnamon Grand Colombo",
    type: "Booking Payment",
    amount: 185000,
    currency: "LKR",
    method: "Visa Credit Card",
    cardLast4: "4567",
    status: "Refund Requested",
    date: "2025-10-19",
    time: "09:45 AM",
    description: "3-night stay at Cinnamon Grand Colombo - Deluxe City View",
    gateway: "PayHere",
    commission: 9250,
    netAmount: 175750,
    location: "Colombo",
    refundRequest: {
      requestedDate: "2025-10-19",
      requestedTime: "11:20 AM",
      reason: "Service quality issues",
      requestedAmount: 92500,
      customerNote: "The room was not as advertised. Air conditioning was broken, and the view was blocked by construction. Requesting 50% refund as we stayed only one night."
    }
  },
  {
    id: "PMT-2025-002",
    transactionRef: "TXN-SL-10250002",
    user: {
      name: "Nirmala Silva",
      email: "nirmala.silva@hotmail.com",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b4e8e4f8?w=100&h=100&fit=crop&crop=center"
    },
    service: "Tour Guide",
    serviceName: "Cultural Heritage Tour - Kandy",
    type: "Service Payment",
    amount: 75000,
    currency: "LKR",
    method: "Bank Transfer",
    bankName: "Commercial Bank",
    accountNo: "****7890",
    status: "Pending",
    date: "2025-10-18",
    time: "02:30 PM",
    description: "Full day tour guide service for 4 people",
    gateway: "Direct Bank Transfer",
    commission: 3750,
    netAmount: 71250,
    location: "Kandy"
  },
  {
    id: "PMT-2025-003",
    transactionRef: "TXN-SL-10250003",
    user: {
      name: "Chaminda Fernando",
      email: "chaminda@ceylonhotels.lk",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=center"
    },
    service: "Commission Payment",
    serviceName: "Lagoon Paradise Resort - Negombo",
    type: "Partner Payout",
    amount: 125000,
    currency: "LKR",
    method: "HNB Online",
    bankName: "Hatton National Bank",
    accountNo: "****3456",
    status: "Failed",
    date: "2025-10-17",
    time: "11:15 AM",
    description: "Monthly commission payout for hotel bookings",
    gateway: "HNB Online Banking",
    commission: 0,
    netAmount: 125000,
    location: "Negombo",
    failureReason: "Insufficient account details"
  },
  {
    id: "PMT-2025-004",
    transactionRef: "TXN-SL-10250004",
    user: {
      name: "Priya Jayawardena",
      email: "priya.j@outlook.com",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=center"
    },
    service: "Vehicle Rental",
    serviceName: "Safari Jeep - Yala National Park",
    type: "Booking Payment",
    amount: 55000,
    currency: "LKR",
    method: "Mastercard Debit",
    cardLast4: "8901",
    status: "Completed",
    date: "2025-10-16",
    time: "04:20 PM",
    description: "2-day safari jeep rental with driver",
    gateway: "PayHere",
    commission: 2750,
    netAmount: 52250,
    location: "Tissamaharama"
  },
  {
    id: "PMT-2025-005",
    transactionRef: "TXN-SL-10250005",
    user: {
      name: "Roshan Wickramasinghe",
      email: "roshan@safarijeeps.lk",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=center"
    },
    service: "Commission Payment",
    serviceName: "Safari Adventures Lanka",
    type: "Partner Payout",
    amount: 89000,
    currency: "LKR",
    method: "Sampath Bank Transfer",
    bankName: "Sampath Bank",
    accountNo: "****2345",
    status: "Processing",
    date: "2025-10-15",
    time: "10:30 AM",
    description: "Weekly commission for vehicle rental services",
    gateway: "Sampath Vishwa",
    commission: 0,
    netAmount: 89000,
    location: "Tissamaharama"
  },
  {
    id: "PMT-2025-006",
    transactionRef: "TXN-SL-10250006",
    user: {
      name: "Malini Rathnayake",
      email: "malini@vehicles.lk",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b4e8e4f8?w=100&h=100&fit=crop&crop=center"
    },
    service: "Tour Package",
    serviceName: "Complete Sri Lanka Tour - 7 Days",
    type: "Booking Payment",
    amount: 350000,
    currency: "LKR",
    method: "DFCC Bank Transfer",
    bankName: "DFCC Bank",
    accountNo: "****6789",
    status: "Completed",
    date: "2025-10-14",
    time: "08:45 AM",
    description: "7-day complete Sri Lanka tour package for 2 people",
    gateway: "DFCC Online",
    commission: 17500,
    netAmount: 332500,
    location: "Bentota"
  },
  {
    id: "PMT-2025-007",
    transactionRef: "TXN-SL-10250007",
    user: {
      name: "Thilina Gunasekara",
      email: "thilina@adventures.lk",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=center"
    },
    service: "Adventure Activity",
    serviceName: "White Water Rafting - Kitulgala",
    type: "Booking Payment",
    amount: 12000,
    currency: "LKR",
    method: "eZ Cash",
    mobileNo: "****4567",
    status: "Completed",
    date: "2025-10-13",
    time: "01:15 PM",
    description: "White water rafting experience for 6 people",
    gateway: "Dialog eZ Cash",
    commission: 600,
    netAmount: 11400,
    location: "Kitulgala"
  },
  {
    id: "PMT-2025-008",
    transactionRef: "TXN-SL-10250008",
    user: {
      name: "Sandani Perera",
      email: "sandani@beachresorts.lk",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=center"
    },
    service: "Commission Payment",
    serviceName: "Fortress Beach Resort - Galle",
    type: "Partner Payout",
    amount: 245000,
    currency: "LKR",
    method: "BOC Online",
    bankName: "Bank of Ceylon",
    accountNo: "****1234",
    status: "Completed",
    date: "2025-10-12",
    time: "03:30 PM",
    description: "Monthly commission for beach resort bookings",
    gateway: "BOC Online Banking",
    commission: 0,
    netAmount: 245000,
    location: "Galle"
  },
  {
    id: "PMT-2025-009",
    transactionRef: "TXN-SL-10250009",
    user: {
      name: "Lakshan Mendis",
      email: "lakshan@mountainguides.lk",
      avatar: "https://images.unshlash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=center"
    },
    service: "Ayurveda Treatment",
    serviceName: "Panchakarma Therapy - Bentota",
    type: "Booking Payment",
    amount: 425000,
    currency: "LKR",
    method: "Peoples Bank Transfer",
    bankName: "Peoples Bank",
    accountNo: "****5678",
    status: "Refund Requested",
    date: "2025-10-11",
    time: "11:45 AM",
    description: "7-day Ayurveda treatment package",
    gateway: "Peoples Bank Online",
    commission: 21250,
    netAmount: 403750,
    location: "Bentota",
    refundRequest: {
      requestedDate: "2025-10-18",
      requestedTime: "02:30 PM",
      reason: "Medical emergency - unable to travel",
      requestedAmount: 425000,
      customerNote: "I had to cancel my trip due to a family medical emergency. I have attached the medical documents as proof. Please process my full refund."
    }
  },
  {
    id: "PMT-2025-010",
    transactionRef: "TXN-SL-10250010",
    user: {
      name: "Dilani Karunaratne",
      email: "dilani@spicetours.lk",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b4e8e4f8?w=100&h=100&fit=crop&crop=center"
    },
    service: "Culinary Tour",
    serviceName: "Spice Garden & Cooking Class - Matale",
    type: "Booking Payment",
    amount: 18000,
    currency: "LKR",
    method: "mCash",
    mobileNo: "****7890",
    status: "Refunded",
    date: "2025-10-10",
    time: "09:20 AM",
    description: "Traditional cooking class and spice garden tour",
    gateway: "Mobitel mCash",
    commission: 900,
    netAmount: 17100,
    location: "Matale",
    refundReason: "Customer cancellation due to weather"
  }
];

// Payment Stats Card Component
function PaymentStatsCard({ icon, title, value, change, color, onClick }) {
  return (
    <div 
      className={`bg-white rounded-lg shadow p-6 ${onClick ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center">
            <div className={`${color} text-white p-3 rounded-lg mr-4`}>
              {icon}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">{title}</p>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <span className="text-sm text-green-600">{change}</span>
      </div>
    </div>
  );
}

// Payment Details Modal Component
function PaymentDetailsModal({ payment, isOpen, onClose, onRefund, onRetry, onApproveRefund, onDeclineRefund }) {
  if (!isOpen || !payment) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'text-green-600 bg-green-100';
      case 'Failed': return 'text-red-600 bg-red-100';
      case 'Pending': return 'text-yellow-600 bg-yellow-100';
      case 'Processing': return 'text-blue-600 bg-blue-100';
      case 'Refunded': return 'text-purple-600 bg-purple-100';
      case 'Refund Requested': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img 
              src={payment.user.avatar} 
              alt={payment.user.name}
              className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div>
              <h2 className="text-2xl font-bold">{payment.serviceName}</h2>
              <div className="flex items-center gap-2">
                <FaCreditCard className="text-blue-500" />
                <span className="text-gray-600">Transaction ID: {payment.transactionRef}</span>
              </div>
              <div className="text-sm text-gray-500">{payment.user.name} • {payment.user.email}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(payment.status)}`}>
              {payment.status}
            </span>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <FaTimes size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Payment Information */}
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <FaRupeeSign className="text-green-500" />
                  Payment Details
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-semibold text-xl text-green-600">Rs. {payment.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Commission:</span>
                    <span className="font-medium">Rs. {payment.commission?.toLocaleString() || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-gray-600">Net Amount:</span>
                    <span className="font-semibold">Rs. {payment.netAmount?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Method:</span>
                    <span className="font-medium">{payment.method}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Gateway:</span>
                    <span className="font-medium">{payment.gateway}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date & Time:</span>
                    <span className="font-medium">{payment.date} at {payment.time}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-blue-500" />
                  Service Information
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service Type:</span>
                    <span className="font-medium">{payment.service}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium">{payment.location}</span>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">{payment.description}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Refund Request Section */}
              {payment.refundRequest && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <FaExclamationTriangle className="text-orange-500" />
                    Refund Request
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Requested Date</label>
                      <p className="text-gray-900">{payment.refundRequest.requestedDate} at {payment.refundRequest.requestedTime}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                      <p className="text-gray-900">{payment.refundRequest.reason}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Requested Amount</label>
                      <p className="text-gray-900 font-semibold text-lg">Rs. {payment.refundRequest.requestedAmount.toLocaleString()}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Customer Note</label>
                      <div className="bg-white rounded-md p-3 border">
                        <p className="text-gray-800 text-sm">{payment.refundRequest.customerNote}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Customer Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <FaUser className="text-gray-500" />
                  Customer Information
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">{payment.user.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{payment.user.email}</span>
                  </div>
                  {payment.cardLast4 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Card:</span>
                      <span className="font-medium">**** {payment.cardLast4}</span>
                    </div>
                  )}
                  {payment.bankName && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bank:</span>
                      <span className="font-medium">{payment.bankName}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-3 justify-end border-t pt-4">
            {payment.refundRequest && payment.status === 'Refund Requested' && (
              <>
                <button
                  onClick={() => {
                    onApproveRefund(payment.id);
                    onClose();
                  }}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <FaCheck />
                  Approve Refund
                </button>
                <button
                  onClick={() => {
                    onDeclineRefund(payment.id);
                    onClose();
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <FaTimes />
                  Decline Refund
                </button>
              </>
            )}
            {payment.status === 'Failed' && (
              <button
                onClick={() => {
                  onRetry(payment.id);
                  onClose();
                }}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <FaRedo />
                Retry Payment
              </button>
            )}
            <button
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentManagement() {
  const [payments, setPayments] = useState(mockPaymentTransactions);
  const [filteredPayments, setFilteredPayments] = useState(mockPaymentTransactions);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    type: 'All',
    status: 'All',
    location: 'All'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const itemsPerPage = 8;

  // Filter payments based on current filters
  useEffect(() => {
    let filtered = payments;

    if (filters.search) {
      filtered = filtered.filter(payment => 
        payment.user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        payment.user.email.toLowerCase().includes(filters.search.toLowerCase()) ||
        payment.serviceName.toLowerCase().includes(filters.search.toLowerCase()) ||
        payment.transactionRef.toLowerCase().includes(filters.search.toLowerCase()) ||
        payment.method.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.type !== 'All') {
      filtered = filtered.filter(payment => payment.type === filters.type);
    }

    if (filters.status !== 'All') {
      filtered = filtered.filter(payment => payment.status === filters.status);
    }

    if (filters.location !== 'All') {
      filtered = filtered.filter(payment => payment.location.toLowerCase().includes(filters.location.toLowerCase()));
    }

    setFilteredPayments(filtered);
    setCurrentPage(1);
  }, [filters, payments]);

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 5000);
  };

  const handleRefundRequestsClick = () => {
    setFilters(prev => ({ ...prev, status: 'Refund Requested' }));
    showSuccess('🔍 Filtered to show refund requests only. You can approve or decline them from the action buttons.');
  };

  const handleViewDetails = (payment) => {
    setSelectedPayment(payment);
    setIsModalOpen(true);
  };

  const handleApproveRefund = (paymentId) => {
    setPayments(prev => 
      prev.map(payment => 
        payment.id === paymentId 
          ? { ...payment, status: 'Refunded' }
          : payment
      )
    );
    showSuccess('🎉 Refund approved successfully! Customer will receive the refund within 3-5 business days.');
  };

  const handleDeclineRefund = (paymentId) => {
    setPayments(prev => 
      prev.map(payment => 
        payment.id === paymentId 
          ? { ...payment, status: 'Completed', refundRequest: undefined }
          : payment
      )
    );
    showSuccess('⚠️ Refund request declined. Customer has been notified with the reason.');
  };

  const handleRetry = (paymentId) => {
    setPayments(prev => 
      prev.map(payment => 
        payment.id === paymentId 
          ? { ...payment, status: 'Processing' }
          : payment
      )
    );
    showSuccess('🔄 Payment retry initiated successfully! Transaction will be processed shortly.');
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Booking Payment': return <FaHotel className="text-blue-500" />;
      case 'Service Payment': return <FaUserTie className="text-green-500" />;
      case 'Partner Payout': return <FaCar className="text-orange-500" />;
      default: return <FaCreditCard className="text-gray-500" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Booking Payment': return 'bg-blue-100 text-blue-700';
      case 'Service Payment': return 'bg-green-100 text-green-700';
      case 'Partner Payout': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPayments = filteredPayments.slice(startIndex, endIndex);

  // Get unique locations for filter
  const uniqueLocations = [...new Set(payments.map(payment => payment.location))].sort();

  // Statistics
  const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const stats = {
    total: payments.length,
    completed: payments.filter(p => p.status === 'Completed').length,
    pending: payments.filter(p => p.status === 'Pending').length,
    refundRequests: payments.filter(p => p.status === 'Refund Requested').length,
    totalAmount: totalAmount
  };

  return (
    <AdminLayout>
      <AdminHeader 
        title="Payment Management" 
        subtitle="Manage payment transactions and refund requests across Sri Lankan tourism services"
      />
      
      {/* Enhanced Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <PaymentStatsCard
          icon={<FaCreditCard />}
          title="Total Transactions"
          value={stats.total}
          change="+25% this month"
          color="bg-blue-500"
        />
        <PaymentStatsCard
          icon={<FaCheckCircle />}
          title="Completed"
          value={stats.completed}
          change="+18% success rate"
          color="bg-green-500"
        />
        <PaymentStatsCard
          icon={<FaClock />}
          title="Pending"
          value={stats.pending}
          change="+3 new pending"
          color="bg-yellow-500"
        />
        <PaymentStatsCard
          icon={<FaExclamationTriangle />}
          title="Refund Requests"
          value={stats.refundRequests}
          change="+2 new requests"
          color="bg-orange-500"
          onClick={handleRefundRequestsClick}
        />
        <PaymentStatsCard
          icon={<FaRupeeSign />}
          title="Total Amount"
          value={`Rs. ${stats.totalAmount.toLocaleString()}`}
          change="+32% this month"
          color="bg-indigo-500"
        />
      </div>

      {/* Refund Requests Filter Indicator */}
      {filters.status === 'Refund Requested' && (
        <div className="bg-orange-100 border border-orange-300 rounded-lg p-4 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaExclamationTriangle className="text-orange-600 text-lg" />
            <div>
              <h3 className="font-semibold text-orange-800">Showing Refund Requests Only</h3>
              <p className="text-sm text-orange-700">Use the action buttons to approve or decline refund requests</p>
            </div>
          </div>
          <button
            onClick={() => setFilters(prev => ({ ...prev, status: 'All' }))}
            className="text-orange-600 hover:text-orange-800 px-3 py-1 rounded border border-orange-300 hover:bg-orange-200 transition-colors"
          >
            Show All Payments
          </button>
        </div>
      )}

      {/* Enhanced Filters */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500" 
              placeholder="Search by customer, service, transaction ref, or payment method..." 
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            />
          </div>
          <select 
            className="border rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
            value={filters.type}
            onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
          >
            <option value="All">All Types</option>
            <option value="Booking Payment">Booking Payments</option>
            <option value="Service Payment">Service Payments</option>
            <option value="Partner Payout">Partner Payouts</option>
          </select>
          <select 
            className="border rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
          >
            <option value="All">All Status</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Failed">Failed</option>
            <option value="Refunded">Refunded</option>
            <option value="Refund Requested">Refund Requested</option>
          </select>
          <select 
            className="border rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
            value={filters.location}
            onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
          >
            <option value="All">All Locations</option>
            {uniqueLocations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
          <button 
            onClick={() => setShowAddPaymentModal(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <FaUserPlus />
            Add Payment
          </button>
        </div>
      </div>

      {/* Enhanced Payments Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service & Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Method
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction Date
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentPayments.map(payment => (
                <tr 
                  key={payment.id} 
                  className={`hover:bg-gray-50 ${payment.status === 'Refund Requested' ? 'bg-orange-50 border-l-4 border-orange-400' : ''}`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img 
                        src={payment.user.avatar} 
                        alt={payment.user.name} 
                        className="h-12 w-12 rounded-full object-cover border-2 border-gray-200"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{payment.user.name}</div>
                        <div className="text-sm text-gray-500">{payment.user.email}</div>
                        <div className="text-xs text-gray-400 font-mono">{payment.transactionRef}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 mb-1">
                      {getTypeIcon(payment.type)}
                      <span className="text-sm font-medium text-gray-900">{payment.serviceName}</span>
                    </div>
                    <div className="text-sm text-gray-500 mb-1">{payment.description}</div>
                    <div className="text-lg font-bold text-green-600">
                      Rs. {payment.amount.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <FaMapMarkerAlt className="text-gray-400" />
                      {payment.location}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <FaCreditCard className="text-blue-500 text-sm" />
                        <span className="font-medium">{payment.method}</span>
                      </div>
                      {payment.cardLast4 && (
                        <div className="text-xs text-gray-600">**** {payment.cardLast4}</div>
                      )}
                      {payment.bankName && (
                        <div className="text-xs text-gray-600">{payment.bankName}</div>
                      )}
                      {payment.mobileNo && (
                        <div className="text-xs text-gray-600">{payment.mobileNo}</div>
                      )}
                      <div className="text-xs text-gray-500 mt-1">{payment.gateway}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={payment.status} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {payment.date}
                    </div>
                    <div className="text-sm text-gray-500">
                      {payment.time}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleViewDetails(payment)}
                        className="text-blue-500 hover:text-blue-700 p-2 rounded"
                        title="View Details"
                      >
                        <FaEye />
                      </button>
                      {payment.status === 'Failed' && (
                        <button 
                          onClick={() => handleRetry(payment.id)}
                          className="text-orange-500 hover:text-orange-700 p-2 rounded"
                          title="Retry Payment"
                        >
                          <FaRedo />
                        </button>
                      )}
                      {payment.status === 'Refund Requested' && (
                        <>
                          <button 
                            onClick={() => handleApproveRefund(payment.id)}
                            className="text-green-500 hover:text-green-700 p-2 rounded"
                            title="Approve Refund"
                          >
                            <FaCheck />
                          </button>
                          <button 
                            onClick={() => handleDeclineRefund(payment.id)}
                            className="text-red-500 hover:text-red-700 p-2 rounded"
                            title="Decline Refund"
                          >
                            <FaTimes />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t">
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            totalResults={filteredPayments.length}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {/* Payment Details Modal */}
      <PaymentDetailsModal
        payment={selectedPayment}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPayment(null);
        }}
        onApproveRefund={handleApproveRefund}
        onDeclineRefund={handleDeclineRefund}
        onRetry={handleRetry}
      />

      {/* Add Payment Modal */}
      {showAddPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Record New Payment</h3>
              <button 
                onClick={() => setShowAddPaymentModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                <input 
                  type="text" 
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                  placeholder="Enter customer name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
                <select className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500">
                  <option>Hotel Booking</option>
                  <option>Tour Package</option>
                  <option>Vehicle Rental</option>
                  <option>Guide Service</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount (LKR)</label>
                <input 
                  type="number" 
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                <select className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500">
                  <option>Visa Credit Card</option>
                  <option>Bank Transfer</option>
                  <option>PayHere</option>
                  <option>eZ Cash</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button 
                  onClick={() => {
                    setShowAddPaymentModal(false);
                    showSuccess('🎉 Payment recorded successfully! Transaction details have been saved and customer notified.');
                  }}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Record Payment
                </button>
                <button 
                  onClick={() => setShowAddPaymentModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2">
          <FaCheckCircle />
          {successMessage}
        </div>
      )}
    </AdminLayout>
  );
}