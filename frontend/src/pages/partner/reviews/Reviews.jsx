import { useState } from 'react';
import PropTypes from 'prop-types';
import PartnerLayout from '../../../components/partner/PartnerLayout';
import Card from '../../../components/partner/Card';
import { FaUser } from 'react-icons/fa';

// Star Rating Component
const StarRating = ({ rating, showNumber = false }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <span
                key={i}
                className={`text-lg ${i <= rating ? 'text-orange-400' : 'text-gray-300'}`}
            >
                ★
            </span>
        );
    }
    return (
        <div className="flex items-center gap-1">
            {stars}
            {showNumber && <span className="ml-1 text-sm text-gray-600">({rating})</span>}
        </div>
    );
};

StarRating.propTypes = {
    rating: PropTypes.number.isRequired,
    showNumber: PropTypes.bool,
};

// Rating Bar Component
const RatingBar = ({ rating, count, total }) => {
    const percentage = (count / total) * 100;

    return (
        <div className="flex items-center gap-2 mb-1">
            <span className="text-sm text-gray-600 w-2">{rating}</span>
            <span className="text-orange-400 text-sm">★</span>
            <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                    className="bg-orange-400 h-2 rounded-full"
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
            <span className="text-sm text-gray-600 w-8 text-right">{count}</span>
        </div>
    );
};

RatingBar.propTypes = {
    rating: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
};

const Reviews = () => {
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyText, setReplyText] = useState('');

    const reviewsData = [
        {
            id: 1,
            name: "Sarah Johnson",
            avatar: "https://randomuser.me/api/portraits/women/1.jpg",
            rating: 5,
            tourType: "Kandy Tour - Toyota Prius",
            timeAgo: "2 days ago",
            comment: "Excellent service! The car was clean and well-maintained. Driver was very professional and knew all the tourist spots around Kandy. Highly recommend for anyone visiting Sri Lanka.",
            hasReply: false
        },
        {
            id: 2,
            name: "Mike Chen",
            avatar: "https://randomuser.me/api/portraits/men/2.jpg",
            rating: 4,
            tourType: "Galle Tour - Toyota KDH",
            timeAgo: "5 days ago",
            comment: "Good experience overall. The vehicle was comfortable for our family trip to Galle. Only minor issue was the pickup was slightly delayed, but the driver made up for it with great service.",
            hasReply: true,
            reply: "Thank you for your feedback! We apologize for the delay and have addressed this with our team. We're glad you enjoyed the rest of your journey!"
        },
        {
            id: 3,
            name: "Emma Rodriguez",
            avatar: "https://randomuser.me/api/portraits/women/3.jpg",
            rating: 5,
            tourType: "Nuwara Eliya Tour - Suzuki Alto",
            timeAgo: "1 week ago",
            comment: "Amazing experience! The vehicle was perfect for our needs and the driver was incredibly friendly and knowledgeable about the local area. Will definitely book again!",
            hasReply: false
        }
    ];

    const ratingStats = [
        { rating: 5, count: 162 },
        { rating: 4, count: 62 },
        { rating: 3, count: 19 },
        { rating: 2, count: 3 },
        { rating: 1, count: 2 }
    ];

    const totalReviews = ratingStats.reduce((sum, stat) => sum + stat.count, 0);
    const averageRating = (
        ratingStats.reduce((sum, stat) => sum + stat.rating * stat.count, 0) / totalReviews
    ).toFixed(1);

    const handleReply = (reviewId) => {
        if (!replyText.trim()) return;

        // Here you would typically send the reply to your backend
        console.log(`Reply to review ${reviewId}:`, replyText);

        // Reset form
        setReplyText('');
        setReplyingTo(null);
    };

    const handleCancelReply = () => {
        setReplyText('');
        setReplyingTo(null);
    };

    return (
        <PartnerLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold mb-1">Reviews & Feedback</h1>
                    <p className="text-gray-600 mb-6">See what travelers are saying about their experiences</p>
                </div>

                {/* Overall Rating Card */}
                <Card>
                    <div className="flex justify-between items-start mb-4">
                        <h2 className="text-lg font-semibold text-gray-800">Overall Rating</h2>
                    </div>

                    <div className="flex gap-8">
                        {/* Rating Score */}
                        <div className="flex flex-col items-center">
                            <div className="text-4xl font-bold text-gray-800 mb-1">{averageRating}</div>
                            <StarRating rating={Math.round(parseFloat(averageRating))} />
                            <div className="text-sm text-gray-500 mt-1">Based on {totalReviews} reviews</div>
                        </div>

                        {/* Rating Bars */}
                        <div className="flex-1">
                            {ratingStats.map((stat) => (
                                <RatingBar
                                    key={stat.rating}
                                    rating={stat.rating}
                                    count={stat.count}
                                    total={totalReviews}
                                />
                            ))}
                        </div>
                    </div>
                </Card>

                {/* Individual Reviews */}
                {reviewsData.map((review) => (
                    <Card key={review.id}>
                        <div className="flex gap-3">
                            {/* Avatar */}
                            <img
                                src={review.avatar}
                                alt={review.name}
                                className="w-10 h-10 rounded-full object-cover"
                            />

                            {/* Review Content */}
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-semibold text-gray-800">{review.name}</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <StarRating rating={review.rating} />
                                            <span className="text-sm text-gray-600">{review.tourType}</span>
                                        </div>
                                    </div>
                                    <span className="text-sm text-gray-500">{review.timeAgo}</span>
                                </div>

                                {/* Review Text */}
                                <p className="text-gray-700 text-sm mb-3 leading-relaxed">
                                    {review.comment}
                                </p>

                                {/* Action Buttons */}
                                {!review.hasReply && replyingTo !== review.id && (
                                    <div className="flex items-center gap-4 text-sm">
                                        <button
                                            className="flex items-center gap-1 text-orange-500 hover:text-orange-600"
                                            onClick={() => setReplyingTo(review.id)}
                                        >
                                            Reply
                                        </button>
                                        <button className="flex items-center gap-1 text-gray-500 hover:text-gray-600">
                                            Report
                                        </button>
                                    </div>
                                )}

                                {/* Reply Form */}
                                {!review.hasReply && replyingTo === review.id && (
                                    <div className="mt-3">
                                        <textarea
                                            placeholder="Write your response..."
                                            className="w-full p-3 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                                            rows="3"
                                            value={replyText}
                                            onChange={(e) => setReplyText(e.target.value)}
                                        ></textarea>
                                        <div className="flex justify-end gap-2">
                                            <button
                                                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
                                                onClick={handleCancelReply}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                                onClick={() => handleReply(review.id)}
                                                disabled={!replyText.trim()}
                                            >
                                                Post Response
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Company Reply */}
                                {review.hasReply && (
                                    <div className="mt-4 p-3 bg-orange-50 rounded-lg border-l-4 border-orange-400">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-sm"><FaUser /></span>
                                            <span className="font-medium text-sm">Your Reply</span>
                                        </div>
                                        <p className="text-sm text-gray-700">{review.reply}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </PartnerLayout>
    );
};

export default Reviews;
