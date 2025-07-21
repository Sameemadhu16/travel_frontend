import React, { useState } from 'react';
import PartnerLayout from '../../../components/partner/PartnerLayout';

const activeBookings = [
  {
    id: 1,
    user: {
      name: 'Sarah Johnson',
      image: 'https://randomuser.me/api/portraits/women/1.jpg',
      phone: '+94 71 234 5678',
      email: 'sarah.j@email.com'
    },
    bookingId: '#BK87234',
    tripDetails: {
      destination: 'Kandy',
      startDate: '15 Aug, 2025',
      endDate: '20 Aug, 2025',
      duration: '5 Days',
      groupSize: '3 People'
    },
    vehicle: {
      name: 'Toyota Axio',
      regNumber: 'CAR-2345',
      type: 'Car'
    },
    paymentStatus: 'Paid',
    amount: 25000
  },
  {
    id: 2,
    user: {
      name: 'Mike Chen',
      image: 'https://randomuser.me/api/portraits/men/2.jpg',
      phone: '+94 76 345 6789',
      email: 'mike.c@email.com'
    },
    bookingId: '#BK87235',
    tripDetails: {
      destination: 'Galle',
      startDate: '18 Aug, 2025',
      endDate: '25 Aug, 2025',
      duration: '7 Days',
      groupSize: '4 People'
    },
    vehicle: {
      name: 'Toyota KDH',
      regNumber: 'VAN-3456',
      type: 'Van'
    },
    paymentStatus: 'Pending',
    amount: 35000
  }
];

const ContactModal = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[400px] shadow-lg">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Contact Customer</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-4 mb-6">
            <img src={user.image} alt={user.name} className="w-16 h-16 rounded-full"/>
            <div>
              <h3 className="font-semibold text-lg">{user.name}</h3>
              <p className="text-gray-500">Customer</p>
            </div>
          </div>
          <a
            href={`tel:${user.phone}`}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50"
          >
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <i className="fas fa-phone text-orange-500"></i>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone Number</p>
              <p className="font-medium">{user.phone}</p>
            </div>
          </a>
          <a
            href={`mailto:${user.email}`}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50"
          >
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <i className="fas fa-envelope text-orange-500"></i>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email Address</p>
              <p className="font-medium">{user.email}</p>
            </div>
          </a>
        </div>
        <div className="border-t p-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const BookingDetailsModal = ({ booking, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[700px] shadow-lg">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Booking Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="p-6">
          {/* Booking ID and Status */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-sm text-gray-500">Booking ID</p>
              <p className="font-semibold text-lg">{booking.bookingId}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm ${
              booking.paymentStatus === 'Paid' 
                ? 'bg-green-100 text-green-700' 
                : 'bg-yellow-100 text-yellow-700'
            }`}>
              {booking.paymentStatus}
            </span>
          </div>

          {/* Customer Info */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg mb-6">
            <img src={booking.user.image} alt={booking.user.name} className="w-12 h-12 rounded-full"/>
            <div>
              <h3 className="font-semibold">{booking.user.name}</h3>
              <p className="text-gray-500 text-sm">{booking.user.phone}</p>
            </div>
          </div>

          {/* Trip Details */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-semibold mb-4">Trip Details</h4>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Destination</p>
                  <p className="font-medium">{booking.tripDetails.destination}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-medium">{booking.tripDetails.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Group Size</p>
                  <p className="font-medium">{booking.tripDetails.groupSize}</p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Vehicle Details</h4>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Vehicle</p>
                  <p className="font-medium">{booking.vehicle.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Registration Number</p>
                  <p className="font-medium">{booking.vehicle.regNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Type</p>
                  <p className="font-medium">{booking.vehicle.type}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div>
            <h4 className="font-semibold mb-4">Payment Details</h4>
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="font-semibold text-lg">Rs. {booking.amount.toLocaleString()}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  booking.paymentStatus === 'Paid' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {booking.paymentStatus}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t p-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default function ActiveBookings() {
  const [showContactModal, setShowContactModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleContact = (booking) => {
    setSelectedBooking(booking);
    setShowContactModal(true);
  };

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setShowDetailsModal(true);
  };

  return (
    <PartnerLayout activePage="active bookings">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Active Bookings</h1>
          <p className="text-gray-600">View and manage your ongoing bookings</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {activeBookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex justify-between items-start">
                {/* Left: Customer Info */}
                <div className="flex items-center gap-4">
                  <img 
                    src={booking.user.image} 
                    alt={booking.user.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold">{booking.user.name}</h3>
                    <p className="text-sm text-gray-500">Booking ID: {booking.bookingId}</p>
                  </div>
                </div>

                {/* Right: Status and Amount */}
                <div className="text-right">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                    booking.paymentStatus === 'Paid' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {booking.paymentStatus}
                  </span>
                  <p className="mt-1 font-semibold">Rs. {booking.amount.toLocaleString()}</p>
                </div>
              </div>

              {/* Trip Details */}
              <div className="grid grid-cols-5 gap-6 mt-6 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Destination</p>
                  <p className="font-medium">{booking.tripDetails.destination}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Start Date</p>
                  <p className="font-medium">{booking.tripDetails.startDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">End Date</p>
                  <p className="font-medium">{booking.tripDetails.endDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-medium">{booking.tripDetails.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Vehicle</p>
                  <p className="font-medium">{booking.vehicle.name}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => handleContact(booking)}
                  className="px-4 py-2 text-orange-500 bg-orange-50 rounded-lg hover:bg-orange-100"
                >
                  Contact
                </button>
                <button
                  onClick={() => handleViewDetails(booking)}
                  className="px-4 py-2 text-orange-500 bg-orange-50 rounded-lg hover:bg-orange-100"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      {showContactModal && selectedBooking && (
        <ContactModal
          user={selectedBooking.user}
          onClose={() => setShowContactModal(false)}
        />
      )}

      {showDetailsModal && selectedBooking && (
        <BookingDetailsModal
          booking={selectedBooking}
          onClose={() => setShowDetailsModal(false)}
        />
      )}
    </PartnerLayout>
  );
}
