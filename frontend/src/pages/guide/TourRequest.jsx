// src/pages/guide/TourRequest.jsx
// Updated to fetch real data from backend

import Main from '../../components/Main'
import TourRequestCard from './guideComponents/TourRequestCard'
import NavBar from './guideComponents/NavBar'
import { useState } from 'react'
import TourDetailsModal from './guideComponents/TourDetailsModal'
import TourAcceptanceModal from './guideComponents/TourAcceptanceModal'
import TourRejectModal from './guideComponents/TourRejectModal'
import useGuideRequests from './hooks/useGuideRequests'
import useGuideProfile from './hooks/useGuideProfile'
import { getUserIdFromStorage } from '../../core/authHelper'
import { Loader, AlertCircle } from 'lucide-react'

const TourRequest = () => {
    // Get the current user's ID from storage
    const userId = getUserIdFromStorage()

    // Fetch the guide profile to get the actual guide ID
    const { guideData, loading: profileLoading, error: profileError } = useGuideProfile(userId)

    // Get the guide ID from the guide profile
    const guideId = guideData?.guideId

    const { tourRequests, loading: requestsLoading, error: requestsError, acceptRequest, rejectRequest } = useGuideRequests(guideId)

    // Combine loading states - show loading if either profile or requests are loading
    const loading = profileLoading || requestsLoading

    // Combine error states - show profile error first, then requests error
    const error = profileError || requestsError
    
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
    const [isAcceptanceModalOpen, setIsAcceptanceModalOpen] = useState(false)
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)
    const [selectedTour, setSelectedTour] = useState(null)
    const [isAccepted, setIsAccepted] = useState(false)
    const [isRejected, setIsRejected] = useState(false)
    const [actionError, setActionError] = useState(null)
    const [actionLoading, setActionLoading] = useState(false)

    const handleViewDetails = (tourData) => {
        setSelectedTour(tourData)
        setIsDetailsModalOpen(true)
    }

    const handleCloseModal = () => {
        setSelectedTour(null)
        setIsDetailsModalOpen(false)
    }

    const handleAcceptTour = (tour) => {
        setSelectedTour(tour)
        setIsAcceptanceModalOpen(true)
        setIsAccepted(false)
        setActionError(null)
    }

    const handleConfirmAccept = async () => {
        try {
            setActionError(null)
            setActionLoading(true)
            
            // Call backend to accept request - pass tripId and guideId
            await acceptRequest(selectedTour.requestId, selectedTour.tripId, guideId)
            
            setIsAccepted(true)
            // Don't close modal immediately - let user see success state
            setTimeout(() => {
                handleCloseAcceptanceModal()
            }, 1500)
        } catch (err) {
            setActionError(err.message || 'Failed to accept request')
        } finally {
            setActionLoading(false)
        }
    }

    const handleCloseAcceptanceModal = () => {
        setIsAcceptanceModalOpen(false)
        setIsAccepted(false)
        setSelectedTour(null)
        setActionError(null)
    }

    const handleRejectTour = (tourData) => {
        setSelectedTour(tourData)
        setIsRejectModalOpen(true)
        setIsRejected(false)
        setActionError(null)
    }

    const handleConfirmReject = async () => {
        try {
            setActionError(null)
            setActionLoading(true)
            
            // Call backend to reject request
            await rejectRequest(selectedTour.requestId)
            
            setIsRejected(true)
            // Don't close modal immediately - let user see success state
            setTimeout(() => {
                handleCloseRejectModal()
            }, 1500)
        } catch (err) {
            setActionError(err.message || 'Failed to reject request')
        } finally {
            setActionLoading(false)
        }
    }

    const handleCloseRejectModal = () => {
        setIsRejectModalOpen(false)
        setIsRejected(false)
        setSelectedTour(null)
        setActionError(null)
    }

    return (
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

                        {/* Loading State */}
                        {loading ? (
                            <div className="flex items-center justify-center py-12">
                                <Loader className="w-8 h-8 animate-spin text-orange-600 mr-3" />
                                <span className="text-gray-600">Loading tour requests...</span>
                            </div>
                        ) : error ? (
                            /* Error State */
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex gap-3">
                                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="font-semibold text-red-900">Error Loading Requests</h3>
                                    <p className="text-red-700 text-sm mt-1">{error}</p>
                                </div>
                            </div>
                        ) : tourRequests.length > 0 ? (
                            /* Requests List */
                            <div className="space-y-4">
                                {tourRequests.map((tour) => (
                                    <TourRequestCard
                                        tour={tour}
                                        key={tour.requestId}
                                        onViewDetails={handleViewDetails}
                                        onAcceptTour={handleAcceptTour}
                                        onRejectTour={() => handleRejectTour(tour)}
                                    />
                                ))}
                            </div>
                        ) : (
                            /* Empty State */
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

            {/* Modal for tour details */}
            {selectedTour && (
                <TourDetailsModal
                    isOpen={isDetailsModalOpen}
                    onClose={handleCloseModal}
                    tourData={selectedTour}
                    onAccept={() => handleAcceptTour(selectedTour)}
                    onReject={() => handleRejectTour(selectedTour)}
                />
            )}

            {/* Modal for tour accepting */}
            {selectedTour && (
                <TourAcceptanceModal
                    isOpen={isAcceptanceModalOpen}
                    onClose={handleCloseAcceptanceModal}
                    tourData={selectedTour}
                    onConfirmAccept={handleConfirmAccept}
                    isAccepted={isAccepted}
                    isLoading={actionLoading}
                    error={actionError}
                />
            )}

            {/* Modal for tour rejection */}
            {selectedTour && (
                <TourRejectModal
                    isOpen={isRejectModalOpen}
                    onClose={handleCloseRejectModal}
                    tourData={selectedTour}
                    onConfirmReject={handleConfirmReject}
                    isRejected={isRejected}
                    isLoading={actionLoading}
                    error={actionError}
                />
            )}
        </div>
    )
}

export default TourRequest