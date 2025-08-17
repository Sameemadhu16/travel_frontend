// import React from 'react';
import Card from './guideComponents/Card'; // Adjust path as needed
import Main from '../../components/Main';
import PrimaryButton from '../../components/PrimaryButton';
import SecondaryButton from '../../components/SecondaryButton';
import { FaCalendar, FaClock, FaUsers } from 'react-icons/fa';
import NavBar from './guideComponents/NavBar'
import { useState } from 'react';
import TourDetailsModal from './guideComponents/TourDetailsModal';
import { tours } from './assets/acceptedTourData';

const AcceptedTours = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTour, setSelectedTour] = useState(null);

    const handleViewDetails = (tourData) => {
        setSelectedTour(tourData);
        setIsModalOpen(true);
    }

    const handleCloseDetails = () => {
        setIsModalOpen(false);
        setSelectedTour(null);
    }

    let totalEarnings = 0;

    tours.forEach(tour => {
        totalEarnings += Number(tour.payment.totalAmount.replace(/,/g,''));
    });

    return (
        <>
            {/* <div className='mt-24'> */}
            <div className='flex'>
                <div className='sticky top-0 h-screen'>
                    <NavBar />
                </div>
                <div className='flex-1'>
                    <Main hasNavbar={true}>
                        {/* Header */}
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-2xl font-bold mb-1">Accepted Tours</h1>
                                <p className="text-gray-600 mb-6">Tours awaiting payment confirmation</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="bg-orange-100 text-orange-600 px-4 py-2 rounded-lg text-sm font-medium">
                                    3 Pending Payments
                                </div>
                                <div className="text-gray-700 font-medium border border-gray-300 px-4 py-2 rounded-lg text-sm">
                                    Total Earnings: <span className="text-green-600">Rs. {totalEarnings}</span>
                                </div>
                            </div>
                        </div>

                        {/* Tour Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {tours.map((tour) => (
                                <Card key={tour.tour.tour_id} className="h-full">
                                    {/* Customer Info */}
                                    <div className="flex items-center mb-4">
                                        <img
                                            src={tour.customer.image}
                                            alt={tour.customer.name}
                                            className="w-12 h-12 rounded-lg mr-3"
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-900">{tour.customer.name}</h3>
                                            {/* <p className="text-sm text-gray-600">{tour.customer.type}</p> */}
                                        </div>
                                        <div className="flex items-center bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs font-medium">
                                            <span className="w-2 h-2 bg-orange-500 rounded-full mr-1"></span>
                                            {tour.payment.status}
                                        </div>
                                    </div>

                                    {/* Tour Details */}
                                    <div className="mb-4">
                                        <h4 className="font-semibold text-gray-900 mb-3">{tour.tour.destination}</h4>
                                        <div className="space-y-2">
                                            <div className="flex items-center text-sm text-gray-600 gap-2">
                                                <FaCalendar className='text-orange-500' />
                                                {tour.tour.date}
                                            </div>
                                            <div className="flex items-center text-sm text-gray-600 gap-2">
                                                <FaUsers className='text-orange-500' />
                                                {tour.tour.groupSize} Travelers
                                            </div>
                                            <div className="flex items-center text-sm text-gray-600 gap-2">
                                                <FaClock className='text-orange-500' />
                                                {tour.tour.duration} days
                                            </div>
                                        </div>
                                    </div>

                                    {/* Payment Info */}
                                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm font-medium text-gray-700">Payment Deadline</span>
                                            <span className="text-sm font-bold text-red-600">{tour.payment.deadline}</span>
                                        </div>
                                        <p className="text-xs text-gray-600">Due: {tour.payment.due}</p>
                                    </div>

                                    {/* Earnings */}
                                    <div className="flex justify-between items-center mb-4">
                                        <div>
                                            <p className="text-sm text-gray-600">Estimated Earnings</p>
                                            <p className="text-2xl font-bold text-green-600">{tour.payment.totalAmount}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-gray-600">Accepted</p>
                                            <p className="text-sm font-medium text-gray-900">{tour.payment.accepted}</p>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex space-x-2">
                                        <div className="w-1/2">
                                            <PrimaryButton
                                                text="Contact"
                                                type={'button'}
                                                className={'text-base'}
                                            />
                                        </div>
                                        <div className="w-1/2">
                                            <SecondaryButton
                                                text="View Details"
                                                type={'button'}
                                                className={'text-base hover:text-orange-600'}
                                                onClick={() => handleViewDetails(tour)}
                                            />
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        {/* Quick Actions */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <button className="bg-white hover:bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center text-left transition-colors">
                                    <div className="bg-red-100 p-3 rounded-lg mr-4">
                                        <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 2L3 7v11a2 2 0 002 2h10a2 2 0 002-2V7l-7-5zM8 15a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900">Send Payment Reminders</h3>
                                    </div>
                                </button>

                                <button className="bg-white hover:bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center text-left transition-colors">
                                    <div className="bg-gray-100 p-3 rounded-lg mr-4">
                                        <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900">Export Tour List</h3>
                                    </div>
                                </button>

                                <button className="bg-white hover:bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center text-left transition-colors">
                                    <div className="bg-gray-100 p-3 rounded-lg mr-4">
                                        <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900">View Calendar</h3>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </Main>
                </div>
            </div>

            {selectedTour &&
                <TourDetailsModal
                    isOpen={isModalOpen}
                    onClose={handleCloseDetails}
                    tourData={selectedTour}
                    tourAccepted={true}
                />
            }
        </>
    );
};

export default AcceptedTours;