import React, { useState } from 'react';
import PartnerLayout from '../../../components/partner/PartnerLayout';

const ReviewCard = ({ review, isSelected, onClick }) => {
  const getStarRating = (rating) => {
    return [...Array(5)].map((_, index) => (
      <i 
        key={index}
        className={`fas fa-star ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div 
      className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${isSelected ? 'bg-orange-50' : ''}`}
      onClick={onClick}
    >
      <div className="flex gap-4">
        <img 
          src={review.customer.image} 
          alt={review.customer.name}
          className="w-12 h-12 rounded-full"
        />
        <div className="flex-1">
          <div className="flex justify-between items-start mb-1">
            <h4 className="font-semibold">{review.customer.name}</h4>
            <span className="text-xs text-gray-500">{review.date}</span>
          </div>
          <div className="flex items-center gap-1 mb-1">
            {getStarRating(review.rating)}
            <span className="text-sm text-gray-600 ml-1">{review.rating}.0</span>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">{review.comment}</p>
          {!review.replied && (
            <span className="inline-block bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full mt-2">
              Needs Response
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const Reviews = () => {
  const [selectedReview, setSelectedReview] = useState(null);
  const [filterRating, setFilterRating] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [replyText, setReplyText] = useState('');

  // Sample data - Replace with your API data
  const reviews = [
    {
      id: 1,
      customer: {
        name: "Sarah Johnson",
        image: "/src/assets/users/user1.jpg",
        tourCount: 3
      },
      tourName: "Swiss Alps Adventure",
      date: "July 15, 2024",
      rating: 5,
      comment: "Amazing experience! Our guide was incredibly knowledgeable and made sure we got the best photos at every spot. The trek was well-paced and the views were breathtaking.",
      replied: false,
      images: [
        "/src/assets/places/1.jpg",
        "/src/assets/places/2.jpg"
      ]
    },
    {
      id: 2,
      customer: {
        name: "Mike Chen",
        image: "/src/assets/users/user2.avif",
        tourCount: 1
      },
      tourName: "Paris City Tour",
      date: "July 14, 2024",
      rating: 4,
      comment: "Great tour overall. The historical information was fascinating. Would have appreciated more time at some locations, but understand the schedule constraints.",
      replied: true,
      reply: "Thank you for your feedback, Mike! We're glad you enjoyed the historical aspects of the tour. We'll consider adjusting the timing at key locations for future tours.",
      images: [
        "/src/assets/places/3.jpg"
      ]
    }
  ];

  const handleReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    selectedReview.replied = true;
    selectedReview.reply = replyText;
    setReplyText('');
  };

  const stats = {
    totalReviews: reviews.length,
    averageRating: (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1),
    pendingResponses: reviews.filter(r => !r.replied).length,
    fiveStarReviews: reviews.filter(r => r.rating === 5).length
  };

  const filteredReviews = reviews.filter(review => {
    const matchesRating = filterRating === 'all' || review.rating === parseInt(filterRating);
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'pending' && !review.replied) ||
      (filterStatus === 'responded' && review.replied);
    const matchesSearch = 
      review.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.tourName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRating && matchesStatus && matchesSearch;
  });

  const StatsCard = ({ icon, label, value, type }) => (
    <div className="bg-white p-4 rounded-lg flex items-center gap-4 shadow-sm">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
        type === "rating" ? "bg-yellow-100 text-yellow-600" :
        type === "reviews" ? "bg-blue-100 text-blue-500" :
        type === "pending" ? "bg-orange-100 text-orange-500" :
        "bg-green-100 text-green-500"
      }`}>
        <i className={`fas ${icon} text-xl`}></i>
      </div>
      <div>
        <h4 className="text-2xl font-bold">{value}</h4>
        <p className="text-gray-600">{label}</p>
      </div>
    </div>
  );

  return (
    <PartnerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Reviews & Ratings</h1>
            <p className="text-gray-600">Manage and respond to customer reviews</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <StatsCard 
            icon="fa-star" 
            label="Average Rating" 
            value={stats.averageRating}
            type="rating"
          />
          <StatsCard 
            icon="fa-comments" 
            label="Total Reviews" 
            value={stats.totalReviews}
            type="reviews"
          />
          <StatsCard 
            icon="fa-reply" 
            label="Pending Responses" 
            value={stats.pendingResponses}
            type="pending"
          />
          <StatsCard 
            icon="fa-award" 
            label="5-Star Reviews" 
            value={stats.fiveStarReviews}
            type="five-star"
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-3 gap-6 h-[calc(100vh-300px)]">
          {/* Reviews List */}
          <div className="col-span-1 bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="p-4 border-b">
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search reviews..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <select
                  className="w-full p-2 border rounded-lg"
                  value={filterRating}
                  onChange={(e) => setFilterRating(e.target.value)}
                >
                  <option value="all">All Ratings</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
                <select
                  className="w-full p-2 border rounded-lg"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="pending">Needs Response</option>
                  <option value="responded">Responded</option>
                </select>
              </div>
            </div>
            <div className="overflow-y-auto h-[calc(100%-155px)]">
              {filteredReviews.map(review => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  isSelected={selectedReview?.id === review.id}
                  onClick={() => setSelectedReview(review)}
                />
              ))}
            </div>
          </div>

          {/* Review Details */}
          {selectedReview ? (
            <div className="col-span-2 bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="p-6 border-b">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    <img 
                      src={selectedReview.customer.image}
                      alt={selectedReview.customer.name}
                      className="w-16 h-16 rounded-full"
                    />
                    <div>
                      <h2 className="text-xl font-semibold mb-1">{selectedReview.customer.name}</h2>
                      <p className="text-gray-600">Completed {selectedReview.customer.tourCount} tours</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-yellow-400 text-xl mb-1">
                      {[...Array(selectedReview.rating)].map((_, i) => (
                        <i key={i} className="fas fa-star"></i>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500">{selectedReview.date}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="font-medium mb-2">Tour</h3>
                  <p className="text-gray-700">{selectedReview.tourName}</p>
                </div>

                <div className="mb-4">
                  <h3 className="font-medium mb-2">Review</h3>
                  <p className="text-gray-700">{selectedReview.comment}</p>
                </div>

                {selectedReview.images?.length > 0 && (
                  <div>
                    <h3 className="font-medium mb-2">Photos</h3>
                    <div className="flex gap-4">
                      {selectedReview.images.map((image, index) => (
                        <img 
                          key={index}
                          src={image}
                          alt="Review"
                          className="w-24 h-24 rounded-lg object-cover"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="font-semibold mb-4">Response</h3>
                {selectedReview.replied ? (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <i className="fas fa-reply text-gray-400"></i>
                      <span className="text-sm text-gray-500">Your response</span>
                    </div>
                    <p className="text-gray-700">{selectedReview.reply}</p>
                  </div>
                ) : (
                  <form onSubmit={handleReply}>
                    <textarea
                      placeholder="Write your response..."
                      className="w-full p-3 border rounded-lg mb-3"
                      rows="4"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                    ></textarea>
                    <div className="flex justify-end">
                      <button 
                        type="submit"
                        className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                        disabled={!replyText.trim()}
                      >
                        Post Response
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          ) : (
            <div className="col-span-2 bg-white rounded-lg shadow-sm border flex items-center justify-center">
              <div className="text-center">
                <i className="far fa-star text-5xl text-gray-400 mb-2"></i>
                <p className="text-gray-500">Select a review to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </PartnerLayout>
  );
};

export default Reviews;
