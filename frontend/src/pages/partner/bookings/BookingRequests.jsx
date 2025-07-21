import React, { useState } from 'react';
import PartnerLayout from '../../../components/partner/PartnerLayout';
import BookingDetailsModal from '../../../components/partner/BookingDetailsModal';

// Initial booking requests data
const initialBookingRequests = [
  {
    id: 1,
    user: {
      name: 'Priya Sharma',
      image: 'https://randomuser.me/api/portraits/women/2.jpg',
      joinedDate: '2 years ago'
    },
    destination: 'Nuwaraeliya',
    tourDates: 'Dec 15-22, 2024',
    duration: '7 Days',
    groupSize: '4 People',
    vehicle: 'Toyota Prius 2023',
    dailyRate: 4500,
    totalEarnings: 31500,
    status: 'pending'
  },
  {
    id: 2,
    user: {
      name: 'Raj Patel',
      image: 'https://randomuser.me/api/portraits/men/3.jpg',
      joinedDate: '1 year ago'
    },
    destination: 'Galle',
    tourDates: 'Jan 5-12, 2025',
    duration: '7 Days',
    groupSize: '2 People',
    vehicle: 'Suzuki Alto',
    dailyRate: 4500,
    totalEarnings: 31500,
    status: 'pending'
  },
  {
    id: 3,
    user: {
      name: 'Anita Gupta',
      image: 'https://randomuser.me/api/portraits/women/4.jpg',
      joinedDate: '3 years ago'
    },
    destination: 'Galle',
    tourDates: 'Dec 20-25, 2024',
    duration: '5 Days',
    groupSize: '6 People',
    vehicle: 'Toyota KDH',
    dailyRate: 4500,
    totalEarnings: 22500,
    status: 'pending'
  }
];

export default function BookingRequests() {
  const [bookingRequests, setBookingRequests] = useState(initialBookingRequests);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const handleAccept = (bookingId) => {
    setBookingRequests(prevRequests =>
      prevRequests.map(request =>
        request.id === bookingId
          ? { ...request, status: 'accepted' }
          : request
      )
    );
  };

  const handleDecline = (bookingId) => {
    setBookingRequests(prevRequests =>
      prevRequests.map(request =>
        request.id === bookingId
          ? { ...request, status: 'declined' }
          : request
      )
    );
  };

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setShowDetailsModal(true);
  };

  return (
    <PartnerLayout activePage="booking requests">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Booking Requests</h1>
          <p className="text-gray-600">Manage your vehicle rental bookings</p>
        </div>

        <div className="space-y-4">
          {bookingRequests.map((request) => (
            <div key={request.id} className="bg-white rounded-lg p-6 shadow-sm">
              {/* User Info and Joined Date */}
              <div className="flex items-center gap-3 mb-6">
                <img 
                  src={request.user.image} 
                  alt={request.user.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="font-semibold">{request.user.name}</h3>
                  <p className="text-sm text-gray-500">Joined {request.user.joinedDate}</p>
                </div>
              </div>

              {/* Booking Details Grid */}
              <div className="grid grid-cols-5 gap-6 mb-6">
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Destination</label>
                  <p className="font-medium">{request.destination}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Tour Dates</label>
                  <p className="font-medium">{request.tourDates}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Duration</label>
                  <p className="font-medium">{request.duration}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Group Size</label>
                  <p className="font-medium">{request.groupSize}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Vehicle</label>
                  <p className="font-medium">{request.vehicle}</p>
                </div>
              </div>

              {/* Price and Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Daily Rate</label>
                    <p className="font-medium text-orange-500">Rs. {request.dailyRate.toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Total Earnings</label>
                    <p className="font-medium text-orange-500">Rs. {request.totalEarnings.toLocaleString()}</p>
                  </div>
                  {request.status !== 'pending' && (
                    <div>
                      <label className="block text-sm text-gray-500 mb-1">Status</label>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                        request.status === 'accepted' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {request.status === 'accepted' ? 'Accepted' : 'Declined'}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-3">
                  {request.status === 'pending' && (
                    <>
                      <button 
                        onClick={() => handleAccept(request.id)}
                        className="px-4 py-2 text-white bg-orange-500 rounded-lg hover:bg-orange-600"
                      >
                        Accept
                      </button>
                      <button 
                        onClick={() => handleDecline(request.id)}
                        className="px-4 py-2 text-red-500 bg-red-50 rounded-lg hover:bg-red-100"
                      >
                        Decline
                      </button>
                    </>
                  )}
                  <button 
                    onClick={() => handleViewDetails(request)}
                    className="px-4 py-2 text-orange-500 bg-orange-50 rounded-lg hover:bg-orange-100"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showDetailsModal && selectedBooking && (
        <BookingDetailsModal
          booking={selectedBooking}
          onClose={() => setShowDetailsModal(false)}
        />
      )}
    </PartnerLayout>
  );
}
