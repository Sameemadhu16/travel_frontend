import React, { useState } from 'react';
import PartnerLayout from '../../../components/partner/PartnerLayout';
import ActiveBookingCard from '../../../components/partner/ActiveBookingCard';

const activeBookings = [
  {
    id: 1,
    user: {
      name: 'Chaminda Wickramasinghe',
      image: 'https://randomuser.me/api/portraits/men/15.jpg',
      phone: '+94 71 234 5678',
      email: 'chaminda.w@email.lk'
    },
    bookingId: '#BK10234',
    tripDetails: {
      destination: 'Kandy Sacred City',
      startDate: '15 Feb, 2025',
      endDate: '20 Feb, 2025',
      duration: '5 Days',
      groupSize: '3 People'
    },
    vehicle: {
      name: 'Toyota Axio',
      regNumber: 'WP CAR-2345',
      type: 'Car'
    },
    paymentStatus: 'Pending Payment',
    paymentDeadline: 'Jan 25, 2025',
    paymentDue: '3 days remaining',
    acceptedDate: 'Jan 15, 2025',
    amount: 42500
  },
  {
    id: 2,
    user: {
      name: 'Thilini Rathnayake',
      image: 'https://randomuser.me/api/portraits/women/22.jpg',
      phone: '+94 76 345 6789',
      email: 'thilini.r@email.lk'
    },
    bookingId: '#BK10235',
    tripDetails: {
      destination: 'Galle Fort & Bentota',
      startDate: '28 Feb, 2025',
      endDate: '7 Mar, 2025',
      duration: '7 Days',
      groupSize: '4 People'
    },
    vehicle: {
      name: 'Toyota KDH Van',
      regNumber: 'SP VAN-3456',
      type: 'Van'
    },
    paymentStatus: 'Pending Payment',
    paymentDeadline: 'Feb 5, 2025',
    paymentDue: '5 days remaining',
    acceptedDate: 'Jan 18, 2025',
    amount: 84000
  },
  {
    id: 3,
    user: {
      name: 'Ruwan De Silva',
      image: 'https://randomuser.me/api/portraits/men/28.jpg',
      phone: '+94 77 456 7890',
      email: 'ruwan.ds@email.lk'
    },
    bookingId: '#BK10236',
    tripDetails: {
      destination: 'Yala National Park',
      startDate: '10 Feb, 2025',
      endDate: '13 Feb, 2025',
      duration: '3 Days',
      groupSize: '2 People'
    },
    vehicle: {
      name: 'Suzuki Alto',
      regNumber: 'CP CAR-7890',
      type: 'Car'
    },
    paymentStatus: 'Pending Payment',
    paymentDeadline: 'Feb 1, 2025',
    paymentDue: '8 days remaining',
    acceptedDate: 'Jan 20, 2025',
    amount: 19500
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
            <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm flex items-center">
              <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
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
                <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
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

  // Calculate total earnings
  const totalEarnings = activeBookings.reduce((total, booking) => total + booking.amount, 0);

  return (
    <PartnerLayout activePage="active bookings">
      <div className="p-6 pt-0">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-1">Active Bookings</h1>
            <p className="text-gray-600">Bookings awaiting payment confirmation</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-orange-100 text-orange-600 px-4 py-2 rounded-lg text-sm font-medium">
              {activeBookings.length} Pending Payments
            </div>
            <div className="text-gray-700 font-medium border border-gray-300 px-4 py-2 rounded-lg text-sm">
              Total Earnings: <span className="text-green-600">Rs. {totalEarnings.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Booking Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeBookings.map((booking) => (
            <ActiveBookingCard
              key={booking.id}
              booking={booking}
              onContact={handleContact}
              onViewDetails={handleViewDetails}
            />
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
