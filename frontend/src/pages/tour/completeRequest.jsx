import Main from '../../components/Main';
import StepIndicator from './components/StepIndicator';
import DestinationDetails from './components/DestinationDetails';
import ContactSummary from './components/ContactSummary';
import SelectedTourGuide from './components/SelectedTourGuide';
import HotelBookings from './components/HotelBookings';
import Transportation from './components/Transportation';
import ItineraryOverview from './components/ItineraryOverview';
import BookingSummary from './components/BookingSummary';
import { useContext } from 'react';
import FormContext from '../../context/InitialValues';
import { createTripRequest } from './service';
import { useSelector } from 'react-redux'

export default function CompleteRequest() {
    const { formData } = useContext(FormContext);
    const {user} = useSelector((state) => state.auth);
    const id = user.data.id;
    const tripReq = createTripRequest(formData, id);
    console.log('Complete request formData:', formData)
  return (
    <Main>
      <div className="max-w-7xl mx-auto py-8 px-4">
        {/* Step Indicator */}
        <StepIndicator />
        
        {/* Main Content */}
        <div className="mt-8">
          <h1 className="text-3xl font-bold text-content-primary mb-2">Complete Your Tour Request</h1>
          <p className="text-content-secondary mb-8">Review your tour details and complete your booking</p>
          
          <div className="flex gap-8">
            {/* Left Column - Tour Details */}
            <div className="flex-1 space-y-6">
              <DestinationDetails />
              <ContactSummary />
              <SelectedTourGuide />
              <HotelBookings />
              <Transportation />
              <ItineraryOverview />
            </div>
            
            {/* Right Column - Booking Summary */}
            <div className="w-80">
              <BookingSummary tripData={tripReq}/>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
}
