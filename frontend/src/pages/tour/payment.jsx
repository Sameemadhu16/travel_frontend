import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Main from '../../components/Main';
import PaymentProgress from './components/PaymentProgress';
import SecurityFeatures from './components/SecurityFeatures';
import StripePaymentComponent from '../../components/StripePaymentComponent';
import { getTripById, updateTripStatus } from '../../api/tripService';
import Spinner from '../../components/Spinner';
import toast from 'react-hot-toast';

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const paymentMethod = 'stripe'; // Using Stripe for payments

  const tripId = location.state?.tripId;

  useEffect(() => {
    if (!tripId) {
      setError('No trip selected for payment');
      setLoading(false);
      return;
    }

    const fetchTripDetails = async () => {
      try {
        setLoading(true);
        const data = await getTripById(tripId);
        setTrip(data);
        setError(null);
      } catch (err) {
        console.error('Error loading trip:', err);
        setError('Failed to load trip details');
      } finally {
        setLoading(false);
      }
    };

    fetchTripDetails();
  }, [tripId]);

  const handlePaymentSuccess = async (paymentIntent) => {
    try {
      console.log('Payment successful:', paymentIntent);
      
      // Update trip status to 'paid'
      await updateTripStatus(tripId, 'paid');
      
      toast.success('Payment successful!');
      
      // Navigate to success page
      navigate('/tour/payment-success', { 
        state: { 
          trip,
          paymentMethod: 'stripe',
          paymentDate: new Date().toISOString(),
          paymentIntentId: paymentIntent.id
        } 
      });
    } catch (err) {
      console.error('Error updating trip status:', err);
      toast.error('Payment successful but failed to update trip status');
    }
  };

  const handlePaymentError = (error) => {
    console.error('Payment error:', error);
    toast.error(error.message || 'Payment failed. Please try again.');
  };

  const handleCancel = () => {
    navigate('/trips');
  };

  if (loading) {
    return (
      <Main>
        <div className="flex justify-center items-center min-h-screen">
          <Spinner />
        </div>
      </Main>
    );
  }

  if (error || !trip) {
    return (
      <Main>
        <div className="max-w-7xl mx-auto py-8 px-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-800 font-semibold">{error || 'Trip not found'}</p>
            <button 
              onClick={() => navigate('/trips')}
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Back to Trips
            </button>
          </div>
        </div>
      </Main>
    );
  }

  return (
    <Main>
      <div className="max-w-7xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold text-content-primary mb-8">Tour Payment</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Payment Details */}
          <div className="lg:col-span-2 space-y-6">
            <PaymentProgress />
            
            <div className="bg-surface-primary border-primary rounded-lg p-6">
              <h3 className="text-lg font-semibold text-content-primary mb-4">Secure Payment</h3>
              <p className="text-sm text-content-tertiary mb-6">
                Complete your payment securely using Stripe. Your payment information is encrypted and secure.
              </p>
              
              {paymentMethod === 'stripe' && (
                <StripePaymentComponent
                  amount={parseFloat(trip.totalFare || 0)}
                  currency="USD"
                  description={`Trip Payment - ${trip.tripCode}`}
                  bookingId={trip.id}
                  bookingType="TRIP"
                  onPaymentSuccess={handlePaymentSuccess}
                  onPaymentError={handlePaymentError}
                  onCancel={handleCancel}
                />
              )}
            </div>
          </div>
          
          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1 space-y-6 border-primary rounded-lg p-6">
            <div className="bg-surface-primary rounded-lg p-6 border border-brand-primary">
              <h3 className="text-lg font-semibold text-content-primary mb-4">Tour Summary</h3>
              
              <div className="space-y-3 mb-4">
                <div>
                  <p className="text-sm text-content-tertiary">Destination</p>
                  <p className="font-semibold text-content-primary">{trip.destination || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-content-tertiary">Trip Code</p>
                  <p className="font-semibold text-content-primary">{trip.tripCode}</p>
                </div>
                <div>
                  <p className="text-sm text-content-tertiary">Duration</p>
                  <p className="font-semibold text-content-primary">
                    {new Date(trip.tripStartDate).toLocaleDateString()} - {new Date(trip.tripEndDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-content-tertiary">Travelers</p>
                  <p className="font-semibold text-content-primary">
                    {(trip.numberOfAdults || 0) + (trip.numberOfKids || 0)} person(s)
                  </p>
                </div>
              </div>

              {trip.totalFare && (
                <div className="border-t border-border-light pt-4 mb-4">
                  <div className="flex justify-between text-lg font-bold text-content-primary">
                    <span>Total Amount</span>
                    <span className="text-brand-primary">LKR {parseFloat(trip.totalFare).toLocaleString()}</span>
                  </div>
                </div>
              )}
            </div>
            
            <SecurityFeatures />
          </div>
        </div>
      </div>
    </Main>
  );
}
