import React from 'react';

export default function BookingDetailsModal({ booking, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[800px]">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Booking Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* User Info */}
          <div className="flex items-center gap-4 mb-8">
            <img 
              src={booking.user.image} 
              alt={booking.user.name}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="text-xl font-semibold">{booking.user.name}</h3>
              <p className="text-gray-500">Joined {booking.user.joinedDate}</p>
            </div>
          </div>

          {/* Booking Details */}
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm text-gray-500 mb-1">Destination</label>
                <p className="font-medium text-lg">{booking.destination}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Tour Dates</label>
                <p className="font-medium text-lg">{booking.tourDates}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Duration</label>
                <p className="font-medium text-lg">{booking.duration}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Group Size</label>
                <p className="font-medium text-lg">{booking.groupSize}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm text-gray-500 mb-1">Vehicle</label>
                <p className="font-medium text-lg">{booking.vehicle}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Daily Rate</label>
                <p className="font-medium text-lg text-orange-500">Rs. {booking.dailyRate.toLocaleString()}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Total Earnings</label>
                <p className="font-medium text-lg text-orange-500">Rs. {booking.totalEarnings.toLocaleString()}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Status</label>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                  booking.status === 'accepted' ? 'bg-green-100 text-green-700' :
                  booking.status === 'declined' ? 'bg-red-100 text-red-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="mt-8">
            <h4 className="font-semibold mb-4">Additional Notes</h4>
            <p className="text-gray-600">
              Special requirements or notes from the customer will appear here.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
