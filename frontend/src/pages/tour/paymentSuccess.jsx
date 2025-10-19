import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Main from '../../components/Main';
import { FaCheckCircle, FaCalendarAlt, FaMapMarkerAlt, FaTicketAlt } from 'react-icons/fa';

export default function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { trip, paymentMethod, paymentDate } = location.state || {};

  useEffect(() => {
    if (!trip) {
      navigate('/trips');
    }
  }, [trip, navigate]);

  if (!trip) {
    return null;
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <Main>
      <div className="max-w-4xl mx-auto py-12 px-4">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <FaCheckCircle className="text-5xl text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-content-primary mb-2">
            Payment Successful!
          </h1>
          <p className="text-content-secondary text-lg">
            Your tour booking has been confirmed
          </p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden mb-6">
          {/* Header */}
          <div className="bg-gradient-to-r from-brand-primary to-brand-secondary p-6 text-white">
            <h2 className="text-xl font-bold mb-2">Booking Confirmation</h2>
            <div className="flex items-center space-x-2">
              <FaTicketAlt />
              <span className="text-sm opacity-90">Trip Code: {trip.tripCode}</span>
            </div>
          </div>

          {/* Details */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-sm font-semibold text-content-tertiary mb-3">Trip Details</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <FaMapMarkerAlt className="text-brand-primary mt-1 mr-3" />
                    <div>
                      <p className="text-xs text-content-tertiary">Destination</p>
                      <p className="font-semibold text-content-primary">{trip.destination || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FaCalendarAlt className="text-brand-primary mt-1 mr-3" />
                    <div>
                      <p className="text-xs text-content-tertiary">Duration</p>
                      <p className="font-semibold text-content-primary">
                        {formatDate(trip.tripStartDate)} - {formatDate(trip.tripEndDate)}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-content-tertiary">Travelers</p>
                    <p className="font-semibold text-content-primary">
                      {(trip.numberOfAdults || 0) + (trip.numberOfKids || 0)} person(s)
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-content-tertiary mb-3">Payment Details</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-content-tertiary">Payment Method</p>
                    <p className="font-semibold text-content-primary capitalize">{paymentMethod}</p>
                  </div>
                  <div>
                    <p className="text-xs text-content-tertiary">Payment Date</p>
                    <p className="font-semibold text-content-primary">
                      {formatDate(paymentDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-content-tertiary">Amount Paid</p>
                    <p className="text-xl font-bold text-brand-primary">
                      LKR {parseFloat(trip.totalFare).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-content-tertiary">Status</p>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-300">
                      <FaCheckCircle className="mr-1" />
                      Paid
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Confirmation Message */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                <strong>What&apos;s next?</strong> Your tour guide will contact you soon with detailed itinerary and meeting point information. 
                A confirmation email has been sent to your registered email address.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate('/trips')}
                className="flex-1 px-6 py-3 bg-brand-primary text-white rounded-lg hover:bg-brand-secondary transition-colors font-semibold"
              >
                View My Trips
              </button>
              <button
                onClick={() => navigate('/')}
                className="flex-1 px-6 py-3 bg-white border-2 border-brand-primary text-brand-primary rounded-lg hover:bg-brand-accent transition-colors font-semibold"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <strong>Important:</strong> Please save your trip code for future reference. 
            You can view your booking details anytime in the &quot;My Trips&quot; section.
          </p>
        </div>
      </div>
    </Main>
  );
}
