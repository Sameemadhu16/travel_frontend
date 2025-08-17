// import React from 'react';
import Main from '../../components/Main';
// import NavBar from './guideComponents/NavBar';
import TourRequestCard from './guideComponents/TourRequestCard';
import NavBar from './guideComponents/NavBar'
import { useState } from 'react';
import TourDetailsModal from './guideComponents/TourDetailsModal';
import TourAcceptanceModal from './guideComponents/TourAcceptanceModal';
import TourRejectModal from './guideComponents/TourRejectModal';
import { tours } from './assets/pendingToursData';

const TourRequest = () => {
  const [tourRequests, setTourRequests] = useState(tours);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isAcceptanceModalOpen, setIsAcceptanceModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);
  const [isAccepted, setIsAccepted] = useState(false);
  const [isRejected, setIsRejected] = useState(false);

  const handleViewDetails = (tourData) => {
    setSelectedTour(tourData);
    setIsDetailsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedTour(null);
    setIsDetailsModalOpen(false);
  };

  const handleAcceptTour = (tour) => {
    setSelectedTour(tour);
    setIsAcceptanceModalOpen(true);
    setIsAccepted(false);
  };

  const handleConfirmAccept = () => {
    //remove the accepted tour from the tour request
    setTourRequests(prevRequests =>
      prevRequests.filter(request => request.tour.tour_id !== selectedTour.tour.tour_id)
    );

    setIsAccepted(true);
  };

  const handleCloseAcceptanceModal = () => {
    setIsAcceptanceModalOpen(false);
    setIsAccepted(false);
    setSelectedTour(null);
  };

  const handleRejectTour = (tourData) => {
    setSelectedTour(tourData);
    setIsRejectModalOpen(true);
    setIsRejected(false);
  };

  const handleConfirmReject = () => {
    setTourRequests(prevRequests =>
      prevRequests.filter(request => request.tour.tour_id !== selectedTour.tour.tour_id)
    );

    setIsRejected(true);

    //API call to do in backend
  };

  const handleCloseRejectModal = () => {
    setIsRejectModalOpen(false);
    setIsRejected(false);
    setSelectedTour(null);
  };

  const handleAcceptRequest = (tourId) => {
    setTourRequests(prevRequests =>
      prevRequests.filter(request => request.tour.tour_id !== tourId)
    );
  };

  const handleRejectRequest = (tourId) => {
    setTourRequests(prevRequests =>
      prevRequests.filter(request => request.tour.tour_id !== tourId)
    );
  };

  return (
    <>
      {/* <div className='mt-24'> */}
      <div className='flex'>
        <div className='sticky top-0 h-screen'>
          <NavBar />
        </div>
        <div className='flex-1'>
          <Main hasNavbar={true}>
            <div className="">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-2xl font-bold mb-1">Tour Requests</h1>
                  <p className="text-gray-600">Manage your incoming tour requests and bookings</p>
                </div>
                <div className="bg-orange-100 text-orange-600 px-4 py-2 rounded-lg text-sm font-medium">
                  {tourRequests.length} Pending Requests
                </div>
              </div>

              {/* Filters */}
              {/* <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                <input type="text" placeholder="Search by traveler name..." className="col-span-1 md:col-span-2 border border-gray-300 px-3 py-2 rounded" />
                <input type="date" className="border border-gray-300 px-3 py-2 rounded" />
                <select className="border border-gray-300 px-3 py-2 rounded">
                  <option>All Destinations</option>
                </select>
                <select className="border border-gray-300 px-3 py-2 rounded">
                  <option>All Status</option>
                </select>
              </div> */}

              {/* Cards */}
              {tourRequests.length > 0 ? (
                tourRequests.map((tour) => (
                  <TourRequestCard
                    tour={tour}
                    key={tour.tour.tour_id}
                    onViewDetails={handleViewDetails}
                    onAcceptTour={handleAcceptTour}
                    onRejectTour={() => handleRejectTour(tour)}

                  />
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No tour requests</h3>
                  <p className="text-gray-600">All tour requests have been processed or there are no new requests at the moment.</p>
                </div>
              )}
            </div>
          </Main>

        </div>
      </div>

      {/* Modal for tour details */}
      {selectedTour &&
        <TourDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={handleCloseModal}
          tourData={selectedTour}
          onAccept={handleAcceptRequest}
          onReject={handleRejectRequest}
        />
      }

      {/* Modal for tour accepting */}
      {selectedTour &&
        <TourAcceptanceModal
          isOpen={isAcceptanceModalOpen}
          onClose={handleCloseAcceptanceModal}
          tourData={selectedTour}
          onConfirmAccept={handleConfirmAccept}
          isAccepted={isAccepted}
        />
      }

      {selectedTour &&
        <TourRejectModal
          isOpen={isRejectModalOpen}
          onClose={handleCloseRejectModal}
          tourData={selectedTour}
          onConfirmReject={handleConfirmReject}
          isRejected={isRejected}
        />
      }
    </>
  );
};

export default TourRequest;
