import React, { useContext } from 'react';
import { useTourContext } from '../../context/TourContext';
import Main from '../../components/Main';
import SuccessMessage from './components/SuccessMessage';
import RequestDetails from './components/RequestDetails';
import WhatHappensNext from './components/WhatHappensNext';
import ActionButtons from './components/ActionButtons';
import EmergencyContact from './components/EmergencyContact';
import FAQ from './components/FAQ';
import NeedAssistance from './components/NeedAssistance';
import FormContext from '../../context/InitialValues';

export default function RequestSent() {
  const {formData} = useContext(FormContext);
  const { 
    travelDetails, 
    contactInfo, 
    selectedItems, 
    tourPreferences,
    itinerary,
    bookingSummary,
    resetTour 
  } = formData;

  return (
    <Main>
      <div className="max-w-4xl mx-auto px-4">
        {/* Success Message */}
        <SuccessMessage />
        
        {/* Request Details */}
        <RequestDetails />
        
        {/* What Happens Next */}
        <WhatHappensNext />
        
        {/* Action Buttons */}
        <ActionButtons />
        
        {/* Emergency Contact */}
        <EmergencyContact />
        
        {/* FAQ */}
        <FAQ />
        
        {/* Need Assistance */}
        <NeedAssistance />
      </div>
    </Main>
  );
}
