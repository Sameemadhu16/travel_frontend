// import React from '                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       react';
import Card from './Card';
import { FaX } from 'react-icons/fa6';
import { FaCalendar, FaMapPin, FaUsers } from 'react-icons/fa';
import PrimaryButton from '../../../components/PrimaryButton';
import SecondaryButton from '../../../components/SecondaryButton';
import PropTypes from 'prop-types';
import TourRejectModal from './TourRejectModal';
import TourAcceptanceModal from './TourAcceptanceModal';
// import { tours } from '../assets/pendingToursData';
import { useState } from 'react';

const TourDetailsModal = ({ isOpen, onClose, tourData, tourAccepted = false, onAccept, onReject }) => {
    // const [tourRequests, setTourRequests] = useState(null);
    const [isAcceptanceModalOpen, setIsAcceptanceModalOpen] = useState(false);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    // const [selectedTour, setSelectedTour] = useState(null);
    const [isAccepted, setIsAccepted] = useState(false);
    const [isRejected, setIsRejected] = useState(false);

    if (!isOpen) return null;

    const handleAcceptTour = () => {
        // setSelectedTour(tour);
        setIsAcceptanceModalOpen(true);
        setIsAccepted(false);
    };

    const handleConfirmAccept = () => {
        if (onAccept) {
            onAccept(tourData.tour.tour_id); // Call parent's accept handler
        }
        setIsAccepted(true);
        // onClose(); // Close the modal
    };

    const handleCloseAcceptanceModal = () => {
        setIsAcceptanceModalOpen(false);
        setIsAccepted(false);
        // setSelectedTour(null);
        onClose();
    };

    const handleRejectTour = () => {
        // setSelectedTour(tourData);
        setIsRejectModalOpen(true);
        setIsRejected(false);
    };

    const handleConfirmReject = () => {
        if (onReject) {
            onReject(tourData.tour.tour_id); // Call parent's accept handler
        }

        setIsRejected(true);

        //API call to do in backend
    };

    const handleCloseRejectModal = () => {
        setIsRejectModalOpen(false);
        setIsRejected(false);
        // setSelectedTour(null);
        onClose();
    };

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                    {/* Modal Header */}
                    <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-gray-900">Tour Request Details</h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <FaX className="h-6 w-6 text-gray-500" />
                        </button>
                    </div>

                    {/* Modal Content */}
                    <div className="p-6">
                        {/* Traveler Info */}
                        <div className="bg-orange-50 rounded-lg p-4 mb-6">
                            <div className="flex items-center space-x-4">
                                <img
                                    src={tourData.customer.image}
                                    alt={tourData.customer.name}
                                    className="h-16 w-16 rounded-full object-cover"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">{tourData.customer.name}</h3>
                                    <p className="text-gray-600">Joined {tourData.customer.joined}</p>
                                </div>
                            </div>
                        </div>

                        {/* Destination Details */}
                        <Card>
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-lg font-semibold text-gray-900">Destination Details</h4>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <div className="flex items-center space-x-2 mb-2">
                                        <FaMapPin className="h-4 w-4 text-orange-500" />
                                        <span className="font-medium text-gray-700">Destination</span>
                                    </div>
                                    <p className="text-gray-900">{tourData.tour.destination}</p>

                                    <div className="flex items-center space-x-2 mt-4 mb-2">
                                        <FaCalendar className="h-4 w-4 text-orange-500" />
                                        <span className="font-medium text-gray-700">Duration</span>
                                    </div>
                                    <p className="text-gray-900">{tourData.tour.duration} days</p>
                                </div>

                                <div>
                                    <div className="flex items-center space-x-2 mb-2">
                                        <FaCalendar className="h-4 w-4 text-orange-500" />
                                        <span className="font-medium text-gray-700">Travel Dates</span>
                                    </div>
                                    <p className="text-gray-900">{tourData.tour.date}</p>

                                    <div className="flex items-center space-x-2 mt-4 mb-2">
                                        <FaUsers className="h-4 w-4 text-orange-500" />
                                        <span className="font-medium text-gray-700">Group Size</span>
                                    </div>
                                    <p className="text-gray-900">{tourData.tour.groupSize} people</p>
                                </div>
                            </div>
                        </Card>

                        {/* Tour Preferences */}
                        {/* <Card>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Tour Preferences</h4>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">Cultural Heritage</span>
                            <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">Wildlife Safari</span>
                            <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">Adventure</span>
                        </div>
                    </Card> */}

                        {/* Hotel Bookings */}
                        <Card>
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-lg font-semibold text-gray-900">Hotel Bookings</h4>
                            </div>

                            <div className="space-y-4">
                                {tourData.accommodation && tourData.accommodation.length > 0 ? (
                                    tourData.accommodation.map((hotel, index) => (
                                        <div key={index}>
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h5 className="font-medium text-gray-900">{hotel.hotelName}</h5>
                                                    <p className="text-gray-600 text-sm">{hotel.roomType} • {hotel.nights} Nights</p>
                                                    <p className="text-gray-600 text-sm">{hotel.dates}</p>
                                                </div>
                                                <span className="text-orange-600 font-semibold">LKR {hotel.price}</span>
                                            </div>
                                        </div>
                                    ))) :
                                    (
                                        <p className="text-gray-500 text-sm italic">No hotels booked</p>
                                    )
                                }
                            </div>
                        </Card>

                        {/* Transportation */}
                        <Card>
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-lg font-semibold text-gray-900">Transportation</h4>
                            </div>

                            <div>
                                {tourData.transport ? (
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h5 className="font-medium text-gray-900">{tourData.transport.type}</h5>
                                            <p className="text-gray-600 text-sm">{tourData.transport.details}</p>
                                            {/* <p className="text-gray-600 text-sm">Full Tour Duration</p> */}
                                        </div>
                                        <span className="text-orange-600 font-semibold">LKR {tourData.transport.price}</span>
                                    </div>
                                ) : (
                                    <p className="text-gray-500 text-sm italic">No transport booked</p>
                                )}
                            </div>
                        </Card>

                        {/* Itinerary Overview */}
                        {/* // Replace the Itinerary Overview section in your TourDetailsModal.jsx with this: */}

                        {/* Itinerary Overview */}
                        <Card>
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-lg font-semibold text-gray-900">Itinerary Overview</h4>
                            </div>

                            {/* {console.log('Modal itinerary prop:', tourData.itinerary)} */}

                            {tourData.itinerary && tourData.itinerary.length > 0 ? (
                                <div className="space-y-6">
                                    {tourData.itinerary.map((dayItem, dayIndex) => (
                                        <div key={dayIndex} className="pb-6 border-b border-gray-200 last:border-b-0">
                                            {/* Day Header */}
                                            <div className="bg-orange-100 text-orange-800 rounded-lg px-3 py-2 text-sm font-semibold inline-block mb-4">
                                                Day {dayItem.day || dayIndex + 1}
                                            </div>

                                            {/* Activities */}
                                            {dayItem.activities && dayItem.activities.length > 0 ? (
                                                <div className="space-y-3 mt-3">
                                                    {dayItem.activities.map((activity, actIdx) => {
                                                        // Check if activity has any meaningful content
                                                        const hasContent = activity.title || activity.description || activity.customActivity

                                                        return (
                                                            <div key={actIdx} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                                                {/* Activity Title and Time */}
                                                                {activity.title ? (
                                                                    <div className="flex items-start justify-between mb-2">
                                                                        <h5 className="font-semibold text-gray-900">{activity.title}</h5>
                                                                        {activity.time && (
                                                                            <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded whitespace-nowrap ml-2">
                                                                                {activity.time}
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                ) : null}

                                                                {/* Activity Description */}
                                                                {activity.description && (
                                                                    <p className="text-gray-600 text-sm">{activity.description}</p>
                                                                )}

                                                                {/* Custom Activity */}
                                                                {activity.customActivity && (
                                                                    <p className="text-sm text-gray-700 mt-2 italic border-l-4 border-orange-400 pl-2">
                                                                        {activity.customActivity}
                                                                    </p>
                                                                )}

                                                                {/* Attraction/District Info - Always show */}
                                                                <div className={`${hasContent ? 'mt-3 pt-3 border-t border-gray-300' : 'mt-1'}`}>
                                                                    <p className="text-xs text-gray-600">
                                                                        {activity.districtId && `📍 District: ${activity.districtId}`}
                                                                        {activity.districtId && activity.attractionId && ' • '}
                                                                        {activity.attractionId && `🎯 Attraction: ${activity.attractionId}`}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            ) : (
                                                <p className="text-gray-500 text-sm italic mt-3">No activities planned for this day</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                    <p className="text-yellow-800 text-sm">No itinerary has been planned for this tour yet.</p>
                                </div>
                            )}
                        </Card>

                        {/* Payment Summary */}
                        <Card>
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">Payment Summary</h4>
                            <div className="space-y-2">
                                <div className="flex justify-between text-gray-700">
                                    <span>Daily Rate (Guide Services):</span>
                                    <span>LKR {tourData.payment.dailyRate}/day</span>
                                </div>
                                <div className="flex justify-between text-gray-700">
                                    <span>Duration:</span>
                                    <span>{tourData.tour.duration}</span>
                                </div>
                                <div className="border-t border-orange-200 pt-2 mt-2">
                                    <div className="flex justify-between font-semibold text-lg text-gray-900">
                                        <span>Total Guide Earnings:</span>
                                        <span className="text-orange-600">LKR {tourData.payment.totalAmount}</span>
                                    </div>
                                </div>
                            </div>
                        </Card>


                        {tourAccepted === false && (
                            <div className="flex space-x-4 pt-4">
                                <div className="w-1/2">
                                    <PrimaryButton
                                        text="Accept"
                                        type={'button'}
                                        className={'text-base'}
                                        onClick={() => handleAcceptTour()}
                                    />
                                </div>
                                <div className="w-1/2">
                                    <SecondaryButton
                                        text="✕ Decline"
                                        type={'button'}
                                        className={'text-base hover:text-red-600 text-red-500 border-red-500 hover:bg-red-50'}
                                        onClick={() => handleRejectTour()}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Modal for tour accepting */}
            {tourData && (
                <TourAcceptanceModal
                    isOpen={isAcceptanceModalOpen}
                    onClose={handleCloseAcceptanceModal}
                    tourData={tourData}
                    onConfirmAccept={handleConfirmAccept}
                    isAccepted={isAccepted}
                />
            )}

            {tourData &&
                <TourRejectModal
                    isOpen={isRejectModalOpen}
                    onClose={handleCloseRejectModal}
                    tourData={tourData}
                    onConfirmReject={handleConfirmReject}
                    isRejected={isRejected}
                />
            }
        </>
    );
};

TourDetailsModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    tourAccepted: PropTypes.bool,
    onAccept: PropTypes.func,
    onReject: PropTypes.func,
    tourData: PropTypes.shape({
        customer: PropTypes.shape({
            user_id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
            joined: PropTypes.string.isRequired
        }).isRequired,
        tour: PropTypes.shape({
            tour_id: PropTypes.number.isRequired,
            destination: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            groupSize: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ]).isRequired,
            duration: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ]).isRequired
        }).isRequired,
        payment: PropTypes.shape({
            payment_id: PropTypes.number.isRequired,
            dailyRate: PropTypes.string.isRequired,
            totalAmount: PropTypes.string.isRequired,
            status: PropTypes.string.isRequired,
            deadline: PropTypes.string.isRequired,
            due: PropTypes.string.isRequired,
            // accepted: PropTypes.string.isRequired
        }).isRequired,
        accommodation: PropTypes.arrayOf(
            PropTypes.shape({
                hotelName: PropTypes.string.isRequired,
                roomType: PropTypes.string.isRequired,
                nights: PropTypes.number.isRequired,
                dates: PropTypes.string.isRequired,
                price: PropTypes.string.isRequired
            })
        ),
        transport: PropTypes.shape({
            type: PropTypes.string.isRequired,
            details: PropTypes.string.isRequired,
            price: PropTypes.string.isRequired
        }),
        itinerary: PropTypes.arrayOf(
            PropTypes.shape({
                day: PropTypes.number.isRequired,
                title: PropTypes.string.isRequired,
                description: PropTypes.string.isRequired
            })
        ).isRequired
    }).isRequired
};

// TourDetailsModal.defaultProps = {
//     tourAccepted: false
// };

export default TourDetailsModal;