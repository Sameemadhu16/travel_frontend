import React from 'react';

export default function TourDetailsModal({ tour, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[800px] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white">
          <h2 className="text-xl font-semibold">{tour.tourName}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Customer Info */}
          <div className="flex items-center gap-4 mb-8">
            <img 
              src={tour.customer.image} 
              alt={tour.customer.name}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="text-xl font-semibold">{tour.customer.name}</h3>
              <p className="text-gray-500">{tour.customer.phone}</p>
            </div>
          </div>

          {/* Tour Details */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm text-gray-500 mb-1">Tour Date</label>
                <p className="font-medium text-lg">{tour.date}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Duration</label>
                <p className="font-medium text-lg">{tour.duration}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Group Size</label>
                <p className="font-medium text-lg">{tour.travelers} Travelers</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm text-gray-500 mb-1">Vehicle</label>
                <p className="font-medium text-lg">{tour.vehicle}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Status</label>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                  tour.status === 'starting_today' ? 'bg-green-100 text-green-700' :
                  tour.status === 'confirmed' ? 'bg-blue-100 text-blue-700' :
                  'bg-orange-100 text-orange-700'
                }`}>
                  {tour.status === 'starting_today' ? 'Starting Today' :
                   tour.status === 'confirmed' ? 'Confirmed' :
                   'This Week'}
                </span>
              </div>
            </div>
          </div>

          {/* Itinerary */}
          <div className="mb-8">
            <h4 className="font-semibold mb-4">Tour Itinerary</h4>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <h5 className="font-semibold">Pickup Location</h5>
                </div>
                <p className="text-gray-600 ml-11">Hotel Sunrise, 123 Beach Road</p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center">
                    <i className="fas fa-route"></i>
                  </div>
                  <h5 className="font-semibold">Tour Route</h5>
                </div>
                <div className="ml-11 space-y-2">
                  <p className="text-gray-600">• City Center - Historical Sites</p>
                  <p className="text-gray-600">• Cultural Village Visit</p>
                  <p className="text-gray-600">• Local Market Experience</p>
                  <p className="text-gray-600">• Scenic Mountain Drive</p>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <h4 className="font-semibold mb-4">Special Requirements</h4>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600">
                • Wheelchair accessible vehicle needed<br />
                • Child seat required for 1 passenger<br />
                • Early morning pickup preferred
              </p>
            </div>
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
          {tour.status === 'starting_today' && (
            <button
              className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              Start Tour
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
