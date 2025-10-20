import { useState, useEffect } from 'react';
import { 
  FaStar, 
  FaUsers, 
  FaClock, 
  FaBell,
  FaComments,
  FaChartBar,
  FaChartLine,
  FaCog,
  FaLightbulb,
  FaMapMarkerAlt,
  FaGlobe,
  FaExclamationTriangle,
  FaCheckCircle
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
          <span className={`text-sm font-medium ${
            changeType === 'positive' ? 'text-green-600' : 
            changeType === 'warning' ? 'text-orange-600' : 'text-red-600'
          }`}>
            {change}
          </span>
        </div>
      )}
    </div>
  );
}

export default function HotelReviews() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

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
    { name: "Ceylon Heritage Grand Colombo", rating: 4.8, reviews: 645, trend: "+8%", performance: "Excellent" },
    { name: "Ceylon Heritage Galle Fort", rating: 4.9, reviews: 512, trend: "+12%", performance: "Excellent" },
    { name: "Ceylon Heritage Kandy", rating: 4.6, reviews: 423, trend: "+5%", performance: "Very Good" },
    { name: "Ceylon Heritage Sigiriya", rating: 4.7, reviews: 389, trend: "+15%", performance: "Excellent" },
    { name: "Ceylon Heritage Nuwara Eliya", rating: 4.8, reviews: 367, trend: "+7%", performance: "Excellent" },
    { name: "Ceylon Heritage Bentota Beach", rating: 4.9, reviews: 511, trend: "+10%", performance: "Excellent" }
  ];

  // Ceylon Heritage Hotels guest reviews data
  const [reviews, setReviews] = useState([
    {
      id: 1,
      userName: "Mr. & Mrs. Anderson",
      userImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=center",
      date: "2025-10-18",
      rating: 5,
      nationality: "American",
      property: "Ceylon Heritage Grand Colombo",
      roomType: "Presidential Suite",
      stayDuration: "6 nights",
      comment: "Absolutely exceptional experience at Ceylon Heritage Grand Colombo! The presidential suite was magnificent with stunning harbor views. Staff anticipated our every need, and the traditional Sri Lankan hospitality was world-class. The helicopter transfer arrangement was flawless. Will definitely return for our anniversary!",
      reply: "Dear Mr. & Mrs. Anderson, Thank you for choosing Ceylon Heritage Grand Colombo for your special celebration! We're thrilled that our presidential suite and helicopter transfer exceeded your expectations. We look forward to welcoming you back for your anniversary. - Management Team",
      helpfulVotes: 24,
      verified: true,
      responseTime: "2 hours"
    },
    
    
    {
      id: 5,
      userName: "Herr Klaus Mueller",
      userImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=center",
      date: "2025-10-08",
      rating: 5,
      nationality: "German",
      property: "Ceylon Heritage Nuwara Eliya",
      roomType: "Royal Suite",
      stayDuration: "7 nights",
      comment: "Unparalleled luxury in Sri Lanka's hill country! The tea plantation tours were fascinating, and our suite's fireplace was perfect for cool evenings. The attention to detail in preserving colonial-era elegance while offering modern luxury is impressive. Golf course maintenance is exceptional.",
      reply: null,
      helpfulVotes: 22,
      verified: true,
      responseTime: null
    },
    {
      id: 6,
      userName: "Mr. & Mrs. Nakamura",
      userImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=center",
      date: "2025-10-05",
      rating: 5,
      nationality: "Japanese",
      property: "Ceylon Heritage Bentota Beach",
      roomType: "Honeymoon Suite",
      stayDuration: "7 nights",
      comment: "Absolutely perfect honeymoon destination! The beachfront honeymoon suite with private infinity pool exceeded all expectations. Romantic candlelight dinners on the beach were magical. Spa couple treatments were incredibly relaxing. Every staff member made our special time unforgettable.",
      reply: "Dear Mr. & Mrs. Nakamura, Congratulations on your marriage! We're honored you chose Ceylon Heritage Bentota Beach for your honeymoon. Creating magical moments for couples is our passion. Wishing you a lifetime of happiness together! - Bentota Beach Resort Team",
      helpfulVotes: 28,
      verified: true,
      responseTime: "1 hour"
    }
  ]);

  return (
    <HotelLayout>
      <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
        {/* Header Section - Hotel Chain Reviews */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Ceylon Heritage Hotels</h1>
            <p className="text-gray-600">Guest Reviews & Reputation Management across Sri Lanka's premier hotel chain. Monitor guest satisfaction and response metrics.</p>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">6 Properties Active</span>
              <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">2,847 Total Reviews</span>
              <span className="text-sm bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-medium">Heritage Excellence</span>
            </div>
          </div>
          <div className="mt-4 lg:mt-0 text-right">
            <p className="text-sm text-gray-500">Current Time (Sri Lanka)</p>
            <p className="text-lg font-semibold text-orange-600">{currentDate} at {currentTime}</p>
            <p className="text-sm text-gray-500 mt-1">Reviews Management Center</p>
          </div>
        </div>

        {/* Review Alerts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <div className="flex items-center">
              <FaExclamationTriangle className="text-red-500 mr-3" />
              <div>
                <p className="text-red-800 font-semibold">Critical Reviews Attention</p>
                <p className="text-red-600 text-sm">2 reviews below 3 stars need immediate response</p>
              </div>
            </div>
          </div>
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <div className="flex items-center">
              <FaCheckCircle className="text-green-500 mr-3" />
              <div>
                <p className="text-green-800 font-semibold">Excellent Performance</p>
                <p className="text-green-600 text-sm">Guest satisfaction increased 6% this month</p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Review Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <EnhancedStatsCard
            icon={<FaStar className="text-yellow-500" />}
            title="Overall Rating"
            value="4.7/5.0"
            subtitle="From 2,847 reviews"
            change="+0.2 this month"
            changeType="positive"
            bgColor="bg-yellow-50"
          />
          <EnhancedStatsCard
            icon={<FaUsers className="text-blue-500" />}
            title="Total Reviews"
            value="2,847"
            subtitle="Active guest feedback"
            change="+234 this month"
            changeType="positive"
            bgColor="bg-blue-50"
          />
          <EnhancedStatsCard
            icon={<FaClock className="text-green-500" />}
            title="Response Rate"
            value="97%"
            subtitle="Avg 3.2 hours response"
            change="+2% improvement"
            changeType="positive"
            bgColor="bg-green-50"
          />
          <EnhancedStatsCard
            icon={<FaBell className="text-orange-500" />}
            title="Pending Reviews"
            value="12"
            subtitle="Awaiting response"
            change="3 critical priority"
            changeType="warning"
            bgColor="bg-orange-50"
          />
        </div>

        {/* Ceylon Heritage Property Performance */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <FaChartLine className="mr-2 text-amber-600" />
            Ceylon Heritage Properties Performance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ceylonHeritageProperties.map((property, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-800">{property.name}</h3>
                  <span className={`text-sm px-2 py-1 rounded ${
                    property.performance === 'Excellent' ? 'bg-green-100 text-green-800' :
                    property.performance === 'Very Good' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {property.performance}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rating:</span>
                    <span className="font-semibold">{property.rating}/5.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Reviews:</span>
                    <span>{property.reviews}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">This Month:</span>
                    <span className={`font-semibold ${property.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {property.trend}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Reviews (2/3 width) */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center">
                  <FaComments className="mr-2 text-amber-600" />
                  Recent Guest Reviews
                </h2>
                <div className="flex space-x-2">
                  <select className="border rounded px-3 py-1 text-sm">
                    <option>All Properties</option>
                    <option>Ceylon Heritage Grand Colombo</option>
                    <option>Ceylon Heritage Galle Fort</option>
                    <option>Ceylon Heritage Kandy</option>
                    <option>Ceylon Heritage Sigiriya</option>
                    <option>Ceylon Heritage Nuwara Eliya</option>
                    <option>Ceylon Heritage Bentota Beach</option>
                  </select>
                  <select className="border rounded px-3 py-1 text-sm">
                    <option>All Ratings</option>
                    <option>5 Stars</option>
                    <option>4 Stars</option>
                    <option>3 Stars</option>
                    <option>2 Stars</option>
                    <option>1 Star</option>
                  </select>
                </div>
              </div>

              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b pb-6 last:border-b-0">
                    <div className="flex items-start space-x-4">
                      <img
                        src={review.userImage}
                        alt={review.userName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-800">{review.userName}</h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span>{review.nationality}</span>
                              <span>•</span>
                              <span>{review.property}</span>
                              <span>•</span>
                              <span>{review.roomType}</span>
                              <span>•</span>
                              <span>{review.stayDuration}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center mb-1">
                              {[...Array(5)].map((_, i) => (
                                <FaStar
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <div className="text-sm text-gray-500">{review.date}</div>
                            {review.verified && (
                              <div className="text-xs text-green-600 flex items-center">
                                <FaCheckCircle className="w-3 h-3 mr-1" />
                                Verified Stay
                              </div>
                            )}
                          </div>
                        </div>
                        <p className="text-gray-700 mb-3">{review.comment}</p>
                        {review.reply && (
                          <div className="bg-amber-50 p-3 rounded border-l-3 border-amber-500">
                            <p className="text-sm text-gray-700 mb-1">
                              <strong>Ceylon Heritage Response:</strong>
                            </p>
                            <p className="text-sm text-gray-600">{review.reply}</p>
                            <div className="text-xs text-gray-500 mt-1">
                              Responded in {review.responseTime}
                            </div>
                          </div>
                        )}
                        <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
                          <div className="flex items-center space-x-4">
                            <span>{review.helpfulVotes} found this helpful</span>
                            <button className="text-amber-600 hover:text-amber-700">
                              Mark as helpful
                            </button>
                          </div>
                          {!review.reply && (
                            <button className="bg-amber-600 text-white px-3 py-1 rounded text-sm hover:bg-amber-700">
                              Respond
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Review Management Sidebar (1/3 width) */}
          <div className="space-y-6">
            {/* Rating Distribution */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <FaChartBar className="mr-2 text-amber-600" />
                Rating Distribution
              </h3>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="flex items-center space-x-2">
                    <span className="text-sm font-medium w-8">{stars}★</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full"
                        style={{ width: `${[68, 22, 7, 2, 1][5 - stars]}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8">
                      {[68, 22, 7, 2, 1][5 - stars]}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <FaCog className="mr-2 text-amber-600" />
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full bg-amber-600 text-white py-2 px-4 rounded hover:bg-amber-700">
                  Export Reviews Report
                </button>
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                  Bulk Response Templates
                </button>
                <button className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
                  Review Analytics Dashboard
                </button>
                <button className="w-full border border-gray-300 py-2 px-4 rounded hover:bg-gray-50">
                  Review Settings
                </button>
              </div>
            </div>

            {/* Review Insights */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <FaLightbulb className="mr-2 text-amber-600" />
                Ceylon Heritage Insights
              </h3>
              <div className="space-y-4 text-sm">
                <div className="bg-green-50 p-3 rounded">
                  <p className="font-semibold text-green-800">Top Praised Features</p>
                  <ul className="text-green-700 mt-1 space-y-1">
                    <li>• Heritage architecture</li>
                    <li>• Traditional hospitality</li>
                    <li>• Scenic locations</li>
                  </ul>
                </div>
                <div className="bg-amber-50 p-3 rounded">
                  <p className="font-semibold text-amber-800">Areas for Enhancement</p>
                  <ul className="text-amber-700 mt-1 space-y-1">
                    <li>• WiFi in heritage buildings</li>
                    <li>• Check-in efficiency</li>
                    <li>• Room service timing</li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-3 rounded">
                  <p className="font-semibold text-blue-800">Guest Demographics</p>
                  <ul className="text-blue-700 mt-1 space-y-1">
                    <li>• 45% International guests</li>
                    <li>• 34% Repeat visitors</li>
                    <li>• 67% Leisure travelers</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HotelLayout>
  );
}
