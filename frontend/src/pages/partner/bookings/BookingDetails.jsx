import React from 'react';
import { useParams } from 'react-router-dom';
import PartnerLayout from '../../../components/partner/PartnerLayout';

const BookingDetails = () => {
  const { id } = useParams();

  // This would normally come from an API call using the ID
  const booking = {
    id: "BK-2024-001",
    tourName: "Swiss Alps Adventure",
    date: "March 15, 2024",
    customer: {
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "+1 (555) 123-4567",
      image: "/src/assets/users/user1.jpg"
    },
    duration: "3 days",
    travelers: 2,
    amount: 1200,
    status: "completed",
    paymentDetails: {
      method: "Credit Card",
      transactionId: "TXN-789012",
      paidAmount: 1200,
      paidDate: "March 10, 2024"
    },
    itinerary: [
      {
        day: 1,
        activities: [
          {
            time: "09:00 AM",
            activity: "Hotel Pickup",
            location: "Guest Hotel"
          },
          {
            time: "10:30 AM",
            activity: "Mountain Trek",
            location: "Alps Base Camp"
          },
          {
            time: "13:00 PM",
            activity: "Lunch Break",
            location: "Mountain Lodge"
          }
        ]
      },
      {
        day: 2,
        activities: [
          {
            time: "09:30 AM",
            activity: "Ski Session",
            location: "Ski Resort"
          },
          {
            time: "14:00 PM",
            activity: "Hot Spring Visit",
            location: "Thermal Springs"
          }
        ]
      },
      {
        day: 3,
        activities: [
          {
            time: "10:00 AM",
            activity: "Cable Car Ride",
            location: "Mountain Peak"
          },
          {
            time: "15:00 PM",
            activity: "Return Journey",
            location: "Guest Hotel"
          }
        ]
      }
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      case 'refunded':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <PartnerLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold mb-1">Booking Details</h1>
            <p className="text-gray-600">Booking ID: {booking.id}</p>
          </div>
          <span className={`px-4 py-2 rounded-full text-sm ${getStatusColor(booking.status)}`}>
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </span>
        </div>

        {/* Tour and Customer Info */}
        <div className="grid grid-cols-2 gap-6">
          {/* Tour Details */}
          <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
            <h2 className="text-lg font-semibold">Tour Information</h2>
            <div className="space-y-3">
              <div>
                <p className="text-gray-600 text-sm">Tour Name</p>
                <p className="font-medium">{booking.tourName}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Date</p>
                <p className="font-medium">{booking.date}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Duration</p>
                <p className="font-medium">{booking.duration}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Number of Travelers</p>
                <p className="font-medium">{booking.travelers} persons</p>
              </div>
            </div>
          </div>

          {/* Customer Details */}
          <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
            <h2 className="text-lg font-semibold">Customer Information</h2>
            <div className="flex items-center gap-4 mb-4">
              <img 
                src={booking.customer.image}
                alt={booking.customer.name}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h3 className="font-semibold">{booking.customer.name}</h3>
                <p className="text-gray-600 text-sm">{booking.customer.email}</p>
              </div>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Phone Number</p>
              <p className="font-medium">{booking.customer.phone}</p>
            </div>
          </div>
        </div>

        {/* Payment Details */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Payment Information</h2>
          <div className="grid grid-cols-4 gap-6">
            <div>
              <p className="text-gray-600 text-sm">Amount Paid</p>
              <p className="font-medium">${booking.paymentDetails.paidAmount}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Payment Method</p>
              <p className="font-medium">{booking.paymentDetails.method}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Transaction ID</p>
              <p className="font-medium">{booking.paymentDetails.transactionId}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Payment Date</p>
              <p className="font-medium">{booking.paymentDetails.paidDate}</p>
            </div>
          </div>
        </div>

        {/* Itinerary */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Tour Itinerary</h2>
          <div className="space-y-6">
            {booking.itinerary.map((day, index) => (
              <div key={index}>
                <h3 className="font-semibold text-orange-500 mb-3">Day {day.day}</h3>
                <div className="space-y-4">
                  {day.activities.map((activity, actIndex) => (
                    <div key={actIndex} className="flex items-start gap-4">
                      <div className="w-20 text-sm text-gray-600">{activity.time}</div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.activity}</p>
                        <p className="text-sm text-gray-600">{activity.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <button 
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
            onClick={() => window.print()}
          >
            <i className="fas fa-print mr-2"></i>
            Print Details
          </button>
          <button 
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            onClick={() => window.location.href = `/partner/bookings/history`}
          >
            Back to History
          </button>
        </div>
      </div>
    </PartnerLayout>
  );
};

export default BookingDetails;
