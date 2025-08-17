// import React from 'react';
import { FaX } from 'react-icons/fa6';
import PropTypes from 'prop-types';
import PrimaryButton from '../../../components/PrimaryButton';
import SecondaryButton from '../../../components/SecondaryButton';

const TourRejectModal = ({ isOpen, onClose, tourData, onConfirmReject, isRejected }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-md w-full mx-4">
                {/* Modal Header */}
                <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900">
                        {isRejected ? 'Tour Rejected!' : 'Confirm Tour Rejection'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <FaX className="h-5 w-5 text-gray-500" />
                    </button>
                </div>

                {/* Modal Content */}
                <div className="p-6">
                    {!isRejected ? (
                        // Confirmation Screen
                        <>
                            <div className="text-center mb-6">
                                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                                    <FaX className="h-6 w-6 text-red-600" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    Reject Tour Request?
                                </h3>
                                <p className="text-gray-600">
                                    Are you sure you want to reject the tour request from {tourData.customer?.name}?
                                </p>
                            </div>

                            {/* Tour Summary */}
                            <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Destination:</span>
                                        <span className="font-medium">{tourData.tour?.destination}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Date:</span>
                                        <span className="font-medium">{tourData.tour?.date}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Duration:</span>
                                        <span className="font-medium">{tourData.tour?.duration} days</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Group Size:</span>
                                        <span className="font-medium">{tourData.tour?.groupSize} peoples</span>
                                    </div>
                                    <div className="flex justify-between border-t border-gray-200 pt-2">
                                        <span className="text-gray-600">Total Earnings:</span>
                                        <span className="font-semibold text-orange-600">Rs. {tourData.payment?.totalAmount}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex space-x-3">
                                <SecondaryButton
                                    text='Cancel'
                                    onClick={onClose}
                                    className={"flex-1 px-4 py-2 font-medium text-base hover:bg-gray-50 transition-colors"}
                                />
                                <PrimaryButton
                                    text='Yes, Reject Tour'
                                    onClick={onConfirmReject}
                                    className={"flex-1 px-4 py-2 font-medium text-base bg-red-500 hover:bg-red-600"}
                                />
                            </div>
                        </>
                    ) : (
                        // Success Screen
                        <>
                            <div className="text-center mb-6">
                                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                                    <FaX className="h-8 w-8 text-red-600" />
                                </div>
                                <h3 className="text-xl font-medium text-gray-900 mb-2">
                                    Tour Successfully Rejected!
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    You have rejected the tour request from {tourData.customer?.name}.
                                </p>
                            </div>

                            {/* Next Steps */}
                            <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                <h4 className="font-medium text-gray-900 mb-2">What&apos;s Next?</h4>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    <li>• Traveler will receive your tour rejection message</li>
                                </ul>
                            </div>

                            {/* Action Button */}
                            <PrimaryButton
                                text='Got it, Thanks!'
                                onClick={onClose}
                                className={"px-4 py-2 text-base"}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

TourRejectModal.propTypes = {
    tourData: PropTypes.shape({
        customer: PropTypes.shape({
            user_id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired
        }).isRequired,
        tour: PropTypes.shape({
            tour_id: PropTypes.number.isRequired,
            destination: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired, 
            duration: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ]).isRequired,
            groupSize: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ]).isRequired,
        }).isRequired,
        payment: PropTypes.shape({
            payment_id: PropTypes.number.isRequired,
            dailyRate: PropTypes.string.isRequired,
            totalAmount: PropTypes.string.isRequired,
            status: PropTypes.string.isRequired,
            deadline: PropTypes.string.isRequired,
            due: PropTypes.string.isRequired,
        }).isRequired
    }).isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirmReject: PropTypes.func.isRequired,
    isRejected: PropTypes.bool.isRequired,
};

export default TourRejectModal;