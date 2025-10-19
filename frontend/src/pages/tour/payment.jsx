import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Main from '../../components/Main';
import PaymentProgress from './components/PaymentProgress';
import PaymentMethodSelection from './components/PaymentMethodSelection';
import CardDetails from './components/CardDetails';
import BillingAddress from './components/BillingAddress';
import SecurityFeatures from './components/SecurityFeatures';
import { getTripById, updateTripStatus } from '../../api/tripService';
import Spinner from '../../components/Spinner';

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    billingAddress: {}
  });

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

  const handlePayment = async () => {
    // Validate payment details
    if (paymentMethod === 'card') {
      if (!paymentDetails.cardNumber || !paymentDetails.cardName || 
          !paymentDetails.expiryDate || !paymentDetails.cvv) {
        alert('Please fill in all card details');
        return;
      }
    }

    try {
      setProcessing(true);
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update trip status to 'paid'
      await updateTripStatus(tripId, 'paid');
      
      // Navigate to success page
      navigate('/tour/payment-success', { 
        state: { 
          trip,
          paymentMethod,
          paymentDate: new Date().toISOString()
        } 
      });
    } catch (err) {
      console.error('Error processing payment:', err);
      alert('Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
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
          <div className="lg:col-span-2 space-y-6 border-primary rounded-lg p-6">
            <PaymentProgress />
            <PaymentMethodSelection 
              selectedMethod={paymentMethod}
              onMethodChange={setPaymentMethod}
            />
            {paymentMethod === 'card' && (
              <>
                <CardDetails 
                  details={paymentDetails}
                  onChange={setPaymentDetails}
                />
                <BillingAddress 
                  details={paymentDetails}
                  onChange={setPaymentDetails}
                />
              </>
            )}
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

              <button 
                onClick={handlePayment}
                disabled={processing}
                className={`w-full py-4 px-6 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 
                  ${processing ? 'bg-gray-400 cursor-not-allowed' : 'bg-brand-primary hover:bg-brand-secondary text-white'}`}
              >
                {processing ? (
                  <>
                    <Spinner size="sm" />
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  <>
                    <span>✈️</span>
                    <span>Pay Now</span>
                  </>
                )}
              </button>
            </div>
            
            <SecurityFeatures />
          </div>
        </div>
      </div>
    </Main>
  );
}
