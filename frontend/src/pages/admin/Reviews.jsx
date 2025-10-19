import { useState, useEffect } from 'react';
import { FaFilter, FaStar, FaEye, FaEdit, FaTrash, FaSearch, FaClock, FaUsers, FaCheckCircle, FaExclamationTriangle, FaTimes, FaCheck, FaMapMarkerAlt, FaCalendar, FaHotel, FaCar, FaUserTie, FaCamera, FaFlag, FaComments } from 'react-icons/fa';
import AdminLayout from '../../components/admin/AdminLayout';
import AdminHeader from '../../components/admin/AdminHeader';
import StatusBadge from '../../components/admin/StatusBadge';
import Pagination from '../../components/admin/Pagination';

// Sri Lankan Tourism Reviews Data
const mockReviews = [
  {
    id: "RV-2025-001",
    user: {
      name: "Sandun Perera",
      email: "sandun.perera@gmail.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=center"
    },
    service: {
      id: "HTL-001",
      name: "Cinnamon Grand Colombo",
      type: "Hotel",
      location: "Colombo"
    },
    rating: 4.5,
    title: "Excellent stay with great service",
    review: "Had a wonderful 3-night stay at Cinnamon Grand. The staff was incredibly friendly and helpful. The room was spacious with a beautiful city view. The breakfast buffet was amazing with a great variety of Sri Lankan and international dishes. The location is perfect for exploring Colombo. Only minor issue was the WiFi speed could be better. Highly recommended!",
    date: "2025-10-18",
    time: "02:30 PM",
    status: "Approved",
    likes: 24,
    helpful: 18,
    photos: 5,
    verified: true,
    response: {
      from: "Cinnamon Grand Management",
      message: "Thank you so much for your wonderful review! We're delighted to hear you enjoyed your stay with us. We've noted your feedback about WiFi and are working on improvements. We look forward to welcoming you back soon!",
      date: "2025-10-19"
    }
  },
  {
    id: "RV-2025-002",
    user: {
      name: "Priya Jayawardena",
      email: "priya.j@outlook.com",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=center"
    },
    service: {
      id: "TUR-002",
      name: "Sigiriya Rock Fortress Tour",
      type: "Tour Package",
      location: "Sigiriya"
    },
    rating: 5,
    title: "Absolutely breathtaking experience!",
    review: "This was the highlight of our Sri Lanka trip! Our guide Chaminda was incredibly knowledgeable about the history and shared amazing stories. The climb was challenging but so worth it for the spectacular views from the top. The ancient paintings and gardens were fascinating. Perfect organization and timing. This is a must-do when visiting Sri Lanka!",
    date: "2025-10-17",
    time: "04:15 PM",
    status: "Approved",
    likes: 31,
    helpful: 27,
    photos: 8,
    verified: true
  },
  {
    id: "RV-2025-003",
    user: {
      name: "Rohan Wickramasinghe",
      email: "rohan@email.lk",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=center"
    },
    service: {
      id: "VEH-003",
      name: "Toyota Hiace - Airport Transfer",
      type: "Vehicle Rental",
      location: "Negombo"
    },
    rating: 2,
    title: "Disappointing service",
    review: "The vehicle was late for pickup by 45 minutes with no prior notice. The van was not clean and had a strong smell. The driver was unprofessional and drove recklessly. For the price we paid, we expected much better service. Would not recommend this particular vehicle rental company.",
    date: "2025-10-16",
    time: "09:30 AM",
    status: "Pending",
    likes: 3,
    helpful: 8,
    photos: 2,
    verified: true,
    flagged: true,
    flagReason: "Service quality complaint"
  },
  {
    id: "RV-2025-004",
    user: {
      name: "Malini Rathnayake",
      email: "malini@tours.lk",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b4e8e4f8?w=100&h=100&fit=crop&crop=center"
    },
    service: {
      id: "GID-004",
      name: "Kandy Cultural Heritage Tour",
      type: "Tour Guide",
      location: "Kandy"
    },
    rating: 4.8,
    title: "Excellent cultural insights",
    review: "Sunil was an amazing guide who brought the history of Kandy to life. His knowledge of Buddhist traditions and local customs was impressive. We visited the Temple of the Tooth, Royal Botanical Gardens, and local markets. He also recommended excellent local restaurants. Very professional and friendly. Highly recommended for anyone wanting to understand Sri Lankan culture deeply.",
    date: "2025-10-15",
    time: "11:45 AM",
    status: "Approved",
    likes: 19,
    helpful: 15,
    photos: 6,
    verified: true
  },
  {
    id: "RV-2025-005",
    user: {
      name: "Nimal Fernando",
      email: "nimal.fernando@hotmail.com",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=center"
    },
    service: {
      id: "HTL-005",
      name: "Jetwing Vil Uyana - Sigiriya",
      type: "Hotel",
      location: "Sigiriya"
    },
    rating: 4.9,
    title: "Paradise in the cultural triangle",
    review: "What an incredible eco-luxury resort! The treehouse-style villas are stunning and blend perfectly with nature. Woke up to peacocks and monkeys outside our villa. The spa treatments were heavenly, and the staff anticipated every need. The location is perfect for exploring Sigiriya and Dambulla. The dining was exceptional with great local and international options. Worth every rupee!",
    date: "2025-10-14",
    time: "08:20 AM",
    status: "Approved",
    likes: 42,
    helpful: 33,
    photos: 12,
    verified: true,
    response: {
      from: "Jetwing Vil Uyana",
      message: "Dear Nimal, we are thrilled that you had such a wonderful experience at our resort! Your kind words about our team and facilities mean the world to us. We look forward to welcoming you back to our little paradise soon!",
      date: "2025-10-15"
    }
  },
  {
    id: "RV-2025-006",
    user: {
      name: "Chaminda Silva",
      email: "chaminda@adventures.lk",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=center"
    },
    service: {
      id: "TUR-006",
      name: "Yala National Park Safari",
      type: "Tour Package",
      location: "Yala"
    },
    rating: 4.2,
    title: "Great wildlife experience",
    review: "Fantastic safari experience in Yala! We saw leopards, elephants, crocodiles, and many bird species. Our jeep driver was knowledgeable about animal behavior and knew the best spots. The early morning start was worth it. Only downside was the park was quite crowded with many jeeps, which sometimes disturbed the animals. Overall, a memorable wildlife experience in Sri Lanka's premier national park.",
    date: "2025-10-13",
    time: "06:15 PM",
    status: "Approved",
    likes: 28,
    helpful: 22,
    photos: 9,
    verified: true
  },
  {
    id: "RV-2025-007",
    user: {
      name: "Dilani Perera",
      email: "dilani@spicegardens.lk",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=center"
    },
    service: {
      id: "TUR-007",
      name: "Spice Garden & Cooking Class - Matale",
      type: "Tour Package",
      location: "Matale"
    },
    rating: 1.5,
    title: "Overpriced and underwhelming",
    review: "Very disappointed with this experience. The spice garden was small and seemed poorly maintained. The cooking class was rushed and we barely learned anything. The instructor seemed uninterested and kept checking his phone. For 8000 LKR per person, we expected much more. The lunch was basic and portions were small. Would not recommend this particular operator.",
    date: "2025-10-12",
    time: "03:45 PM",
    status: "Under Review",
    likes: 2,
    helpful: 12,
    photos: 3,
    verified: true,
    flagged: true,
    flagReason: "Pricing dispute"
  },
  {
    id: "RV-2025-008",
    user: {
      name: "Thilaka Bandara",
      email: "thilaka@beachresorts.lk",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b4e8e4f8?w=100&h=100&fit=crop&crop=center"
    },
    service: {
      id: "HTL-008",
      name: "Fortress Resort & Spa - Galle",
      type: "Hotel",
      location: "Galle"
    },
    rating: 4.7,
    title: "Beautiful heritage hotel with character",
    review: "Staying within the historic Galle Fort was magical! This boutique hotel perfectly balances colonial charm with modern luxury. Our room had stunning views of the Indian Ocean. The spa was excellent and the ayurvedic treatments were authentic. The restaurant serves great fusion cuisine. Staff was attentive and friendly. Perfect location for exploring the fort and nearby attractions. Highly recommended for a romantic getaway!",
    date: "2025-10-11",
    time: "07:30 PM",
    status: "Approved",
    likes: 35,
    helpful: 29,
    photos: 10,
    verified: true
  },
  {
    id: "RV-2025-009",
    user: {
      name: "Kasun Mendis",
      email: "kasun@mountainguides.lk",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=center"
    },
    service: {
      id: "GID-009",
      name: "Adams Peak Pilgrimage Trek",
      type: "Tour Guide",
      location: "Ratnapura"
    },
    rating: 4.6,
    title: "Spiritual and challenging trek",
    review: "What an incredible experience climbing Adams Peak! Our guide Saman was excellent - very patient and encouraging during the tough climb. The night trek was well-organized with proper lighting and rest stops. Reaching the summit for sunrise was absolutely spiritual and breathtaking. The views of the surrounding mountains were spectacular. This is a must-do experience for anyone visiting Sri Lanka. Prepare for a challenging but rewarding journey!",
    date: "2025-10-10",
    time: "05:15 AM",
    status: "Approved",
    likes: 26,
    helpful: 20,
    photos: 7,
    verified: true
  },
  {
    id: "RV-2025-010",
    user: {
      name: "Sandani Wickramasinghe",
      email: "sandani@ayurveda.lk",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=center"
    },
    service: {
      id: "TUR-010",
      name: "Ayurveda Wellness Retreat - Bentota",
      type: "Tour Package",
      location: "Bentota"
    },
    rating: 3.2,
    title: "Good concept but needs improvement",
    review: "The ayurvedic treatments were authentic and the doctors were knowledgeable. However, the accommodation was not up to the standard advertised. The food was repetitive and some facilities needed maintenance. The location by the beach was beautiful. The staff tried their best but seemed understaffed. For the price, we expected better overall experience. Has potential but needs significant improvements.",
    date: "2025-10-09",
    time: "12:20 PM",
    status: "Rejected",
    likes: 4,
    helpful: 9,
    photos: 4,
    verified: false,
    rejectReason: "Contains unverified claims about facility conditions"
  }
];

// Review Stats Card Component
function ReviewStatsCard({ icon, title, value, change, color }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
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

// Review Details Modal Component
function ReviewDetailsModal({ review, isOpen, onClose, onApprove, onReject }) {
  if (!isOpen || !review) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'text-green-600 bg-green-100';
      case 'Rejected': return 'text-red-600 bg-red-100';
      case 'Pending': return 'text-yellow-600 bg-yellow-100';
      case 'Under Review': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={index < rating ? 'text-yellow-400' : 'text-gray-300'}
      />
    ));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img 
              src={review.user.avatar} 
              alt={review.user.name}
              className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div>
              <h2 className="text-2xl font-bold">{review.title}</h2>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">{review.user.name}</span>
                {review.verified && <span className="text-blue-500 text-sm">✓ Verified</span>}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1">
                  {renderStars(review.rating)}
                  <span className="ml-1 font-semibold">{review.rating}</span>
                </div>
                <span className="text-gray-500">•</span>
                <span className="text-gray-500">{review.date}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(review.status)}`}>
              {review.status}
            </span>
            {review.flagged && (
              <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-600">
                <FaFlag className="inline mr-1" />
                Flagged
              </span>
            )}
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <FaTimes size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Review Content */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-3">Service Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service:</span>
                    <span className="font-medium">{review.service.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-medium">{review.service.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium">{review.service.location}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-3">Review Content</h3>
                <p className="text-gray-800 leading-relaxed">{review.review}</p>
                {review.photos > 0 && (
                  <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                    <FaCamera />
                    <span>{review.photos} photos attached</span>
                  </div>
                )}
              </div>

              {/* Business Response */}
              {review.response && (
                <div className="bg-green-50 border-l-4 border-green-400 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Response from {review.response.from}</h4>
                  <p className="text-green-700 text-sm">{review.response.message}</p>
                  <p className="text-green-600 text-xs mt-2">Responded on {review.response.date}</p>
                </div>
              )}
            </div>

            {/* Review Stats & Actions */}
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-3">Review Stats</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Likes:</span>
                    <span className="font-medium">{review.likes}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Helpful votes:</span>
                    <span className="font-medium">{review.helpful}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Photos:</span>
                    <span className="font-medium">{review.photos}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Verified:</span>
                    <span className={`font-medium ${review.verified ? 'text-green-600' : 'text-red-600'}`}>
                      {review.verified ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </div>

              {review.flagged && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="font-semibold text-red-800 mb-2">
                    <FaFlag className="inline mr-2" />
                    Flagged Content
                  </h3>
                  <p className="text-red-700 text-sm">{review.flagReason}</p>
                </div>
              )}

              {review.rejectReason && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-semibold text-yellow-800 mb-2">Rejection Reason</h3>
                  <p className="text-yellow-700 text-sm">{review.rejectReason}</p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-3 justify-end border-t pt-4">
            {review.status === 'Pending' && (
              <>
                <button
                  onClick={() => {
                    onApprove(review.id);
                    onClose();
                  }}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <FaCheck />
                  Approve Review
                </button>
                <button
                  onClick={() => {
                    onReject(review.id);
                    onClose();
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <FaTimes />
                  Reject Review
                </button>
              </>
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

export default function Reviews() {
  const [reviews, setReviews] = useState(mockReviews);
  const [filteredReviews, setFilteredReviews] = useState(mockReviews);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    type: 'All',
    status: 'All',
    rating: 'All'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const itemsPerPage = 8;

  // Filter reviews based on current filters
  useEffect(() => {
    let filtered = reviews;

    if (filters.search) {
      filtered = filtered.filter(review => 
        review.user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        review.service.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        review.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        review.review.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.type !== 'All') {
      filtered = filtered.filter(review => review.service.type === filters.type);
    }

    if (filters.status !== 'All') {
      filtered = filtered.filter(review => review.status === filters.status);
    }

    if (filters.rating !== 'All') {
      const minRating = parseInt(filters.rating);
      filtered = filtered.filter(review => Math.floor(review.rating) >= minRating);
    }

    setFilteredReviews(filtered);
    setCurrentPage(1);
  }, [filters, reviews]);

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 5000);
  };

  const handleViewDetails = (review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  const handleApprove = (reviewId) => {
    setReviews(prev => 
      prev.map(review => 
        review.id === reviewId 
          ? { ...review, status: 'Approved' }
          : review
      )
    );
    showSuccess('✅ Review approved successfully! It will now be visible to other users.');
  };

  const handleReject = (reviewId) => {
    setReviews(prev => 
      prev.map(review => 
        review.id === reviewId 
          ? { ...review, status: 'Rejected' }
          : review
      )
    );
    showSuccess('⚠️ Review rejected. It will not be displayed publicly.');
  };

  const getServiceIcon = (type) => {
    switch (type) {
      case 'Hotel': return <FaHotel className="text-blue-500" />;
      case 'Tour Guide': return <FaUserTie className="text-green-500" />;
      case 'Vehicle Rental': return <FaCar className="text-orange-500" />;
      case 'Tour Package': return <FaCamera className="text-purple-500" />;
      default: return <FaStar className="text-gray-500" />;
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={index < rating ? 'text-yellow-400' : 'text-gray-300'}
        size={14}
      />
    ));
  };

  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentReviews = filteredReviews.slice(startIndex, endIndex);

  // Statistics
  const avgRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const stats = {
    total: reviews.length,
    approved: reviews.filter(r => r.status === 'Approved').length,
    pending: reviews.filter(r => r.status === 'Pending').length,
    flagged: reviews.filter(r => r.flagged).length,
    avgRating: avgRating.toFixed(1)
  };

  return (
    <AdminLayout>
      <AdminHeader 
        title="Reviews Management" 
        subtitle="Monitor and manage customer reviews across Sri Lankan tourism services"
      />
      
      {/* Enhanced Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <ReviewStatsCard
          icon={<FaComments />}
          title="Total Reviews"
          value={stats.total}
          change="+12% this month"
          color="bg-blue-500"
        />
        <ReviewStatsCard
          icon={<FaCheckCircle />}
          title="Approved"
          value={stats.approved}
          change="+8% this week"
          color="bg-green-500"
        />
        <ReviewStatsCard
          icon={<FaClock />}
          title="Pending"
          value={stats.pending}
          change="+3 new today"
          color="bg-yellow-500"
        />
        <ReviewStatsCard
          icon={<FaExclamationTriangle />}
          title="Flagged"
          value={stats.flagged}
          change="2 need attention"
          color="bg-red-500"
        />
        <ReviewStatsCard
          icon={<FaStar />}
          title="Avg Rating"
          value={stats.avgRating}
          change="+0.2 this month"
          color="bg-purple-500"
        />
      </div>

      {/* Enhanced Filters */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500" 
              placeholder="Search reviews by customer, service, or content..." 
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
            <option value="Hotel">Hotels</option>
            <option value="Tour Package">Tour Packages</option>
            <option value="Tour Guide">Tour Guides</option>
            <option value="Vehicle Rental">Vehicle Rentals</option>
          </select>
          <select 
            className="border rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
          >
            <option value="All">All Status</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Under Review">Under Review</option>
            <option value="Rejected">Rejected</option>
          </select>
          <select 
            className="border rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
            value={filters.rating}
            onChange={(e) => setFilters(prev => ({ ...prev, rating: e.target.value }))}
          >
            <option value="All">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4+ Stars</option>
            <option value="3">3+ Stars</option>
            <option value="2">2+ Stars</option>
            <option value="1">1+ Star</option>
          </select>
        </div>
      </div>

      {/* Enhanced Reviews Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reviewer & Service
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Review Content
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating & Stats
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentReviews.map(review => (
                <tr key={review.id} className={`hover:bg-gray-50 ${review.flagged ? 'bg-red-50' : ''}`}>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-y-2">
                      <img 
                        src={review.user.avatar} 
                        alt={review.user.name} 
                        className="h-12 w-12 rounded-full object-cover border-2 border-gray-200"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
                          {review.user.name}
                          {review.verified && <span className="text-blue-500 text-xs">✓</span>}
                        </div>
                        <div className="text-sm text-gray-500">{review.user.email}</div>
                        <div className="flex items-center gap-2 mt-1">
                          {getServiceIcon(review.service.type)}
                          <span className="text-xs text-gray-600">{review.service.name}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    <div className="text-sm font-medium text-gray-900 mb-1">{review.title}</div>
                    <div className="text-sm text-gray-600 line-clamp-2">{review.review.substring(0, 120)}...</div>
                    {review.photos > 0 && (
                      <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                        <FaCamera />
                        <span>{review.photos} photos</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 mb-2">
                      {renderStars(review.rating)}
                      <span className="ml-1 text-sm font-semibold">{review.rating}</span>
                    </div>
                    <div className="text-xs text-gray-500 space-y-1">
                      <div>👍 {review.likes} likes</div>
                      <div>✋ {review.helpful} helpful</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <StatusBadge status={review.status} />
                      {review.flagged && (
                        <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-600">
                          <FaFlag className="inline mr-1" />
                          Flagged
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{review.date}</div>
                    <div className="text-sm text-gray-500">{review.time}</div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleViewDetails(review)}
                        className="text-blue-500 hover:text-blue-700 p-2 rounded"
                        title="View Details"
                      >
                        <FaEye />
                      </button>
                      {review.status === 'Pending' && (
                        <>
                          <button 
                            onClick={() => handleApprove(review.id)}
                            className="text-green-500 hover:text-green-700 p-2 rounded"
                            title="Approve Review"
                          >
                            <FaCheck />
                          </button>
                          <button 
                            onClick={() => handleReject(review.id)}
                            className="text-red-500 hover:text-red-700 p-2 rounded"
                            title="Reject Review"
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
            totalResults={filteredReviews.length}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {/* Review Details Modal */}
      <ReviewDetailsModal
        review={selectedReview}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedReview(null);
        }}
        onApprove={handleApprove}
        onReject={handleReject}
      />

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