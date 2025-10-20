import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Main from '../../components/Main';
import SuccessMessage from './components/SuccessMessage';
import RequestDetails from './components/RequestDetails';
import WhatHappensNext from './components/WhatHappensNext';
import ActionButtons from './components/ActionButtons';
import EmergencyContact from './components/EmergencyContact';
import FAQ from './components/FAQ';
import NeedAssistance from './components/NeedAssistance';

export default function RequestSent() {
  const location = useLocation();
  const navigate = useNavigate();
  const tripData = location.state?.tripData;

  return (
    <Main>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Success Message */}
        <SuccessMessage />
        
        {/* Guide Request Info */}
        {tripData?.selectedGuideIds && tripData.selectedGuideIds.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Guide Requests Sent</h3>
            <p className="text-blue-800 mb-4">
              Your tour request has been sent to {tripData.selectedGuideIds.length} tour guide{tripData.selectedGuideIds.length > 1 ? 's' : ''} for approval. 
              You will be notified once a guide accepts your request.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => navigate('/trips')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                View Trip Status
              </button>
            </div>
          </div>
        )}
        
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
