// import React from 'react';
import { FaClock, FaX } from 'react-icons/fa6';
import { FaCheckCircle } from 'react-icons/fa';
import PropTypes from 'prop-types';
import PrimaryButton from '../../../components/PrimaryButton';
import SecondaryButton from '../../../components/SecondaryButton';

const TourAcceptanceModal = ({ isOpen, onClose, tourData, onConfirmAccept, isAccepted }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-md w-full mx-4">
                {/* Modal Header */}
                <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900">
                        {isAccepted ? 'Tour Accepted!' : 'Confirm Tour Acceptance'}
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
                    {!isAccepted ? (
                        // Confirmation Screen
                        <>
                            <div className="text-center mb-6">
                                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-orange-100 mb-4">
                                    <FaCheckCircle className="h-6 w-6 text-orange-600" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    Accept Tour Request?
                                </h3>
                                <p className="text-gray-600">
                                    Are you sure you want to accept the tour request from {tourData?.customer.name}?
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
                                    text='Yes, Accept Tour'
                                    onClick={onConfirmAccept}
                                    className={"flex-1 px-4 py-2 font-medium text-base"}
                                />
                            </div>
                        </>
                    ) : (
                        // Success Screen
                        <>
                            <div className="text-center mb-6">
                                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                                    <FaCheckCircle className="h-8 w-8 text-green-600" />
                                </div>
                                <h3 className="text-xl font-medium text-gray-900 mb-2">
                                    Tour Successfully Accepted!
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    You have accepted the tour request from {tourData.customer?.name}.
                                </p>
                            </div>

                            {/* Status Info */}
                            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                                <div className="flex items-center mb-2">
                                    <FaClock className="h-5 w-5 text-orange-600 mr-2" />
                                    <span className="font-medium text-orange-800">Awaiting Payment Confirmation</span>
                                </div>
                                <p className="text-sm text-orange-700">
                                    The traveler has been notified and will receive payment instructions.
                                    You&apos;ll be notified once the payment is confirmed.
                                </p>
                            </div>

                            {/* Next Steps */}
                            <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                <h4 className="font-medium text-gray-900 mb-2">What&aapos;s Next?</h4>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    <li>• Traveler will receive payment instructions</li>
                                    <li>• You can track this tour in &quot;Accepted Tours&quot; section</li>
                                    <li>• Payment confirmation typically takes 1-2 business days</li>
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

TourAcceptanceModal.propTypes = {
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
    onConfirmAccept: PropTypes.func.isRequired,
    isAccepted: PropTypes.bool.isRequired,
};

export default TourAcceptanceModal;