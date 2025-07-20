// import React from 'react';
import PropTypes from 'prop-types';
import Main from '../../components/Main';
import Card from './guideComponents/Card';
import NavBar from './guideComponents/NavBar';
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
    const reviewsData = [
        {
            id: 1,
            name: "Priya Perera",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c962?w=40&h=40&fit=crop&crop=face",
            rating: 5,
            tourType: "Kandy Tour",
            timeAgo: "2 days ago",
            comment: "Excellent service! The car was clean and well-maintained. Driver was very professional and knew all the tourist spots around Kandy. Highly recommend for anyone visiting Sri Lanka.",
            hasReply: false
        },
        {
            id: 2,
            name: "Rajesh Fernando",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
            rating: 4,
            tourType: "Arugambay Tour",
            timeAgo: "5 days ago",
            comment: "Good experience overall. The vehicle was comfortable for our family trip to Galle. Only minor issue was the pickup was slightly delayed, but the driver made up for it with great service.",
            hasReply: true,
            reply: "Thank you for your feedback! We apologize for the delay and have addressed this with our team. We're glad you enjoyed the rest of your journey!"
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

    return (
        <div className="flex">
            <div className="sticky top-0 h-fit">
                <NavBar />
            </div>
            <div className="flex-1">
                <Main hasNavbar={true}>
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
                                <div className="text-4xl font-bold text-gray-800 mb-1">4.7</div>
                                <StarRating rating={4} />
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
                                    <div className="flex items-center gap-4 text-sm">
                                        <button className="flex items-center gap-1 text-orange-500 hover:text-orange-600">
                                            Reply
                                        </button>
                                        <button className="flex items-center gap-1 text-gray-500 hover:text-gray-600">
                                            Report
                                        </button>
                                    </div>

                                    {/* Company Reply */}
                                    {review.hasReply && (
                                        <div className="mt-4 p-3 bg-orange-200 rounded-lg border-l-4 border-orange-400">
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
                </Main>
            </div>
        </div>
    );
};

export default Reviews;