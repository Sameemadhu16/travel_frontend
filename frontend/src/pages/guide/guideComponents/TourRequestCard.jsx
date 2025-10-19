// import React from 'react';
import PropTypes from 'prop-types';
import PrimaryButton from '../../../components/PrimaryButton';
import SecondaryButton from '../../../components/SecondaryButton';
import Card from './Card';

const TourRequestCard = ({ tour, onViewDetails, onAcceptTour, onRejectTour }) => {
    return (
        <Card>
            <div className="flex items-center gap-4 w-full">
                <img src={tour.customer.image} alt={tour.customer.name} className="w-12 h-12 rounded-full" />
                <div>
                    <h2 className="font-semibold text-lg">{tour.customer.name}</h2>
                    {/* <p className="text-sm text-gray-500">Joined {tour.joined}</p> */}
                </div>
            </div>
            <div className="flex items-start gap-4 mt-4 justify-between pb-3 border-b-2">
                <div className='flex flex-col'>
                    <p className="mt-1 text-gray-500">Destination</p>
                    <p className='font-medium'>{tour.tour.destination}</p>
                </div>
                <div className='flex flex-col'>
                    <p className="mt-1 text-gray-500">Tour Dates</p>
                    <p className='font-medium'>{tour.tour.date}</p>
                </div>
                <div className='flex flex-col'>
                    <p className="mt-1 text-gray-500">Duration</p>
                    <p className='font-medium'>{tour.tour.duration} days</p>
                </div>
                <div className='flex flex-col'>
                    <p className="mt-1 text-gray-500">Group Size</p>
                    <p className='font-medium'>{tour.tour.groupSize} people</p>
                </div>
            </div>
            <div className="mt-4 flex flex-row justify-between gap-2 items-center">
                <div>
                    <p className="text-orange-600 font-semibold">Daily Rate: Rs. {tour.payment.dailyRate}</p>
                    <p className="text-green-600 font-semibold">Total Earnings: Rs. {tour.payment.totalAmount}</p>
                </div>
                <div className="flex gap-2">
                    {/* <PrimaryButton />
                    <SecondaryButton /> */}
                    <div className="">
                        <PrimaryButton
                            text="Accept"
                            type={'button'}
                            className={'text-base'}
                            onClick={() => onAcceptTour(tour)}
                        />
                    </div>
                    <div className="">
                        <SecondaryButton
                            text="View Details"
                            type={'button'}
                            onClick={() => onViewDetails(tour)}
                            className={'text-base hover:text-orange-600'}
                        />
                    </div>
                    <div className="">
                        <SecondaryButton
                            text="✕ Reject"
                            type={'button'}
                            onClick={() => onRejectTour(tour)}
                            className={'text-base hover:text-red-600 text-red-500 border-red-500 hover:bg-red-50'}
                        />
                    </div>
                </div>
            </div>
        </Card>
    );
};

TourRequestCard.propTypes = {
    tour: PropTypes.shape({
        customer: PropTypes.shape({
            user_id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
            joined: PropTypes.string, // optional unless you always provide it
        }).isRequired,
        tour: PropTypes.shape({
            tour_id: PropTypes.number.isRequired,
            destination: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            duration: PropTypes.string.isRequired,
            groupSize: PropTypes.string.isRequired,
        }).isRequired,
        payment: PropTypes.shape({
            payment_id: PropTypes.number.isRequired,
            dailyRate: PropTypes.string.isRequired,
            totalAmount: PropTypes.string.isRequired,
            status: PropTypes.string,   // optional (e.g., "Pending Payment")
            deadline: PropTypes.string, // optional
            due: PropTypes.string,      // optional
        }).isRequired,
    }).isRequired,
    onViewDetails: PropTypes.func.isRequired,
    onAcceptTour: PropTypes.func.isRequired,
    onRejectTour: PropTypes.func.isRequired,
};


export default TourRequestCard;
