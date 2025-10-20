import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Spinner from '../../components/Spinner';
import Main from '../../components/Main';

const HotelDetails = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchHotelDetails();
  }, [hotelId]);

  const fetchHotelDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5454/api/hotels/${hotelId}`);
      setHotel(response.data);
    } catch (error) {
      console.error('Error fetching hotel details:', error);
      toast.error('Failed to load hotel details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (!hotel) {
    return (
      <Main>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Hotel not found</h2>
            <button
              onClick={() => navigate('/bookings/hotels')}
              className="mt-4 px-6 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary-dark"
            >
              Back to Hotels
            </button>
          </div>
        </div>
      </Main>
    );
  }

  const allImages = hotel.images || [];

  return (
    <Main>
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/bookings/hotels')}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Hotels
          </button>
        </div>
      </div>

      <div className="py-8">
        {/* Hotel Images Gallery */}
        <div className="mb-8">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-3">
              {allImages.length > 0 ? (
                <img
                  src={allImages[selectedImage]}
                  alt={hotel.hotelName}
                  className="w-full h-96 object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400">No images available</span>
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              {allImages.slice(0, 4).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${hotel.hotelName} ${index + 1}`}
                  className={`w-full h-20 object-cover rounded-lg cursor-pointer ${
                    selectedImage === index ? 'ring-2 ring-blue-600' : ''
                  }`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Hotel Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Hotel Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {hotel.hotelName}
                  </h1>
                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {hotel.street}, {hotel.city}, {hotel.district}, {hotel.province}
                  </div>
                </div>
                {hotel.isVerified && (
                  <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    ✓ Verified
                  </div>
                )}
              </div>

              {hotel.type && (
                <div className="mb-4">
                  <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {hotel.type}
                  </span>
                </div>
              )}

              <p className="text-gray-700 leading-relaxed">
                {hotel.description || 'No description available'}
              </p>
            </div>

            {/* Amenities */}
            {hotel.amenities && hotel.amenities.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Amenities</h2>
                <div className="grid grid-cols-2 gap-3">
                  {hotel.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Available Rooms */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Rooms</h2>
              
              {!hotel.rooms || hotel.rooms.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No rooms available at the moment</p>
              ) : (
                <div className="space-y-4">
                  {hotel.rooms.map(room => (
                    <div
                      key={room.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {room.roomType}
                            </h3>
                            {!room.availability && (
                              <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                                Not Available
                              </span>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                            {room.maxGuests && (
                              <div className="flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                </svg>
                                {room.maxGuests} Guests
                              </div>
                            )}
                            {room.bedTypes && (
                              <div className="flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                </svg>
                                {room.bedTypes}
                              </div>
                            )}
                          </div>

                          {room.description && (
                            <p className="text-gray-600 text-sm mb-3">{room.description}</p>
                          )}

                          {room.amenities && room.amenities.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-3">
                              {room.amenities.slice(0, 4).map((amenity, idx) => (
                                <span
                                  key={idx}
                                  className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                                >
                                  {amenity}
                                </span>
                              ))}
                            </div>
                          )}

                          {room.images && room.images.length > 0 && (
                            <div className="flex gap-2 mt-3">
                              {room.images.slice(0, 3).map((img, idx) => (
                                <img
                                  key={idx}
                                  src={img}
                                  alt={`${room.roomType} ${idx + 1}`}
                                  className="w-20 h-20 object-cover rounded"
                                />
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="ml-6 text-right">
                          <div className="mb-3">
                            <p className="text-2xl font-bold text-blue-600">
                              LKR {room.pricePerNight?.toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-500">per night</p>
                          </div>
                          
                          <button
                            onClick={() => navigate(`/bookings/hotels/${hotelId}/room/${room.id}/book`)}
                            disabled={!room.availability}
                            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                              room.availability
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                          >
                            {room.availability ? 'Book Now' : 'Unavailable'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Quick Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Hotel Information</h3>
              
              {hotel.registrationNo && (
                <div className="mb-3">
                  <p className="text-sm text-gray-500">Registration No.</p>
                  <p className="font-medium text-gray-900">{hotel.registrationNo}</p>
                </div>
              )}

              {hotel.pricePerNight && (
                <div className="mb-3">
                  <p className="text-sm text-gray-500">Starting from</p>
                  <p className="text-2xl font-bold text-blue-600">
                    LKR {hotel.pricePerNight.toLocaleString()}
                    <span className="text-sm text-gray-500 font-normal">/night</span>
                  </p>
                </div>
              )}

              <div className="border-t border-gray-200 pt-4 mt-4">
                <p className="text-xs text-gray-500 mb-2">Total Rooms Available</p>
                <p className="text-lg font-semibold text-gray-900">
                  {hotel.rooms?.filter(r => r.availability).length || 0} Rooms
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default HotelDetails;
