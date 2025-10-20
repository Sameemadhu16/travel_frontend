import { useState } from 'react';
import PartnerLayout from '../../../components/partner/PartnerLayout';
import BookingDetailsModal from '../../../components/partner/BookingDetailsModal';
import BookingRequestCard from '../../../components/partner/BookingRequestCard';

// Initial booking requests data
const initialBookingRequests = [
  {
    id: 1,
    user: {
      name: 'Kasun Perera',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      joinedDate: '2 years ago'
    },
    destination: 'Nuwara Eliya',
    tourDates: 'Jan 15-22, 2025',
    duration: '7 Days',
    groupSize: '4 People',
    vehicle: 'Toyota Prius 2023',
    dailyRate: 8500,
    totalEarnings: 59500,
    status: 'pending'
  },
  {
    id: 2,
    user: {
      name: 'Dilshan Fernando',
      image: 'https://randomuser.me/api/portraits/men/45.jpg',
      joinedDate: '1 year ago'
    },
    destination: 'Galle Fort',
    tourDates: 'Jan 25 - Feb 1, 2025',
    duration: '7 Days',
    groupSize: '2 People',
    vehicle: 'Suzuki Alto',
    dailyRate: 5500,
    totalEarnings: 38500,
    status: 'pending'
  },
  {
    id: 3,
    user: {
      name: 'Nadeesha Silva',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      joinedDate: '3 years ago'
    },
    destination: 'Ella & Arugam Bay',
    tourDates: 'Feb 5-10, 2025',
    duration: '5 Days',
    groupSize: '6 People',
    vehicle: 'Toyota KDH Van',
    dailyRate: 12000,
    totalEarnings: 60000,
    status: 'pending'
  },
  {
    id: 4,
    user: {
      name: 'Saman Jayawardena',
      image: 'https://randomuser.me/api/portraits/men/52.jpg',
      joinedDate: '6 months ago'
    },
    destination: 'Sigiriya & Dambulla',
    tourDates: 'Jan 28-30, 2025',
    duration: '3 Days',
    groupSize: '3 People',
    vehicle: 'Toyota Axio',
    dailyRate: 7000,
    totalEarnings: 21000,
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
      <div className="p-6 pt-0">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-1">Booking Requests</h1>
            <p className="text-gray-600">Manage your incoming vehicle rental bookings</p>
          </div>
          <div className="bg-orange-100 text-orange-600 px-4 py-2 rounded-lg text-sm font-medium">
            {bookingRequests.filter(r => r.status === 'pending').length} Pending Requests
          </div>
        </div>

        <div className="space-y-4">
          {bookingRequests.map((request) => (
            <BookingRequestCard
              key={request.id}
              booking={request}
              onAccept={handleAccept}
              onDecline={handleDecline}
              onViewDetails={handleViewDetails}
            />
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
