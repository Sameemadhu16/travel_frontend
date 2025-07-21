import { useState } from 'react';
import { 
  FaCalendarAlt, 
  FaHotel, 
  FaStar, 
  FaSearch,
  FaReply,
  FaCheck,
  FaTimes
} from 'react-icons/fa';
import HotelLayout from '../../../components/hotel/HotelLayout';

function StarRating({ rating }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, index) => (
        <FaStar 
          key={index} 
          className={`${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        />
      ))}
    </div>
  );
}

function FilterSection({ filters, setFilters, branches }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4">Filter Reviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium mb-2">Date From</label>
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => setFilters({...filters, dateFrom: e.target.value})}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Date To</label>
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => setFilters({...filters, dateTo: e.target.value})}
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

      {/* Search */}
      <div className="mt-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search reviews..."
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

function ReviewCard({ review, onReply }) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleSubmitReply = () => {
    onReply(review.id, replyText);
    setReplyText('');
    setIsReplying(false);
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <img 
              src={review.userImage} 
              alt={review.userName}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold">{review.userName}</h3>
              <p className="text-sm text-gray-500">{review.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <StarRating rating={review.rating} />
            <span className="text-sm text-gray-500">({review.rating}/5)</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <FaHotel className="text-gray-400" />
          <span className="text-sm text-gray-600">{review.branch}</span>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-gray-700">{review.comment}</p>
      </div>

      {/* Review Reply Section */}
      {review.reply && (
        <div className="ml-8 mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <FaReply className="text-brand-primary" />
            <span className="font-medium">Hotel Response</span>
          </div>
          <p className="text-gray-700">{review.reply}</p>
        </div>
      )}

      {!review.reply && !isReplying && (
        <button
          onClick={() => setIsReplying(true)}
          className="flex items-center gap-2 text-brand-primary hover:bg-brand-primary/10 px-4 py-2 rounded-lg"
        >
          <FaReply />
          Reply to Review
        </button>
      )}

      {isReplying && (
        <div className="mt-4">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write your reply..."
            className="w-full p-3 border rounded-lg mb-3"
            rows="3"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsReplying(false)}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <FaTimes />
              Cancel
            </button>
            <button
              onClick={handleSubmitReply}
              className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-lg"
            >
              <FaCheck />
              Submit Reply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function HotelReviews() {
  const branches = [
    "Cinnamon Grand Colombo",
    "Cinnamon Red Colombo",
    "Cinnamon Lakeside",
    "Cinnamon Wild Yala",
    "Cinnamon Bentota Beach",
    "Trinco Blu by Cinnamon"
  ];

  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    branch: '',
    search: ''
  });

  // Sample reviews data - replace with API call
  const [reviews, setReviews] = useState([
    {
      id: 1,
      userName: "John Smith",
      userImage: "/src/assets/users/user1.jpg",
      date: "2025-07-18",
      rating: 5,
      branch: "Cinnamon Grand Colombo",
      comment: "Excellent service and beautiful rooms! The staff was very attentive and the facilities were top-notch. Will definitely come back.",
      reply: null
    },
    {
      id: 2,
      userName: "Sarah Wilson",
      userImage: "/src/assets/users/user2.avif",
      date: "2025-07-17",
      rating: 4,
      branch: "Cinnamon Red Colombo",
      comment: "Great location and modern amenities. The breakfast buffet was amazing. Only minor issue was the slow check-in process.",
      reply: "Thank you for your feedback, Sarah! We're glad you enjoyed your stay and appreciate your comment about the check-in process. We're working on improving our efficiency."
    },
    {
      id: 3,
      userName: "David Brown",
      userImage: "/src/assets/users/user3.avif",
      date: "2025-07-16",
      rating: 3,
      branch: "Cinnamon Lakeside",
      comment: "Average experience. Room was clean but the air conditioning wasn't working properly. Staff was helpful in resolving the issue.",
      reply: null
    }
  ]);

  // Calculate summary statistics
  const stats = {
    totalReviews: reviews.length,
    averageRating: (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1),
    responseRate: Math.round((reviews.filter(r => r.reply).length / reviews.length) * 100),
    fiveStarReviews: reviews.filter(r => r.rating === 5).length
  };

  const handleReply = (reviewId, replyText) => {
    setReviews(reviews.map(review => 
      review.id === reviewId 
        ? { ...review, reply: replyText }
        : review
    ));
  };

  return (
    <HotelLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Reviews & Ratings</h1>
          <p className="text-gray-600">Manage and respond to guest reviews across all branches</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-gray-500 mb-2">Total Reviews</h3>
            <p className="text-2xl font-semibold">{stats.totalReviews}</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-gray-500 mb-2">Average Rating</h3>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-semibold">{stats.averageRating}</p>
              <StarRating rating={Math.round(stats.averageRating)} />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-gray-500 mb-2">Response Rate</h3>
            <p className="text-2xl font-semibold">{stats.responseRate}%</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-gray-500 mb-2">5-Star Reviews</h3>
            <p className="text-2xl font-semibold">{stats.fiveStarReviews}</p>
          </div>
        </div>

        {/* Filters */}
        <FilterSection 
          filters={filters} 
          setFilters={setFilters}
          branches={branches}
        />

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews.map(review => (
            <ReviewCard 
              key={review.id} 
              review={review}
              onReply={handleReply}
            />
          ))}
        </div>

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
