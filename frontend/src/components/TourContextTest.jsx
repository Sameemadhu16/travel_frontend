import React from 'react';
import { useTourContext } from '../context/TourContext';

// Simple test component to demonstrate TourContext usage
const TourContextTest = () => {
  const {
    travelDetails,
    selectedItems,
    bookingSummary,
    currentStep,
    updateTravelDetails,
    addSelectedGuide,
    nextStep
  } = useTourContext();

  const addTestGuide = () => {
    addSelectedGuide({
      id: 1,
      name: 'Test Guide',
      price: 5000,
      specialty: 'Cultural Tours',
      rating: 4.8
    });
  };

  const updateTestDetails = () => {
    updateTravelDetails({
      destination: 'Kandy',
      adults: 2,
      duration: '5-days'
    });
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Tour Context Test</h2>
      
      <div className="space-y-4">
        <div className="p-4 border rounded">
          <h3 className="font-semibold mb-2">Current Step: {currentStep}</h3>
          <button 
            onClick={nextStep}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Next Step
          </button>
        </div>

        <div className="p-4 border rounded">
          <h3 className="font-semibold mb-2">Travel Details</h3>
          <p>Destination: {travelDetails.destination || 'None'}</p>
          <p>Adults: {travelDetails.adults}</p>
          <p>Duration: {travelDetails.duration || 'None'}</p>
          <button 
            onClick={updateTestDetails}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
          >
            Update Test Details
          </button>
        </div>

        <div className="p-4 border rounded">
          <h3 className="font-semibold mb-2">Selected Guides ({selectedItems.guides.length})</h3>
          {selectedItems.guides.map((guide) => (
            <div key={guide.id} className="text-sm">
              {guide.name} - LKR {guide.price}
            </div>
          ))}
          <button 
            onClick={addTestGuide}
            className="mt-2 px-4 py-2 bg-purple-500 text-white rounded"
          >
            Add Test Guide
          </button>
        </div>

        <div className="p-4 border rounded">
          <h3 className="font-semibold mb-2">Booking Summary</h3>
          <p>Guides Cost: LKR {bookingSummary.guidesCost}</p>
          <p>Hotels Cost: LKR {bookingSummary.hotelsCost}</p>
          <p>Total Cost: LKR {bookingSummary.totalCost}</p>
        </div>
      </div>
    </div>
  );
};

export default TourContextTest;
