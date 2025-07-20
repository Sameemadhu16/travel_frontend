// import React from 'react';
import PropTypes from 'prop-types';
import PrimaryButton from '../../../components/PrimaryButton';
import SecondaryButton from '../../../components/SecondaryButton';
import Card from './Card';

const TourRequestCard = ({ traveler }) => {
    return (
        <Card>
            <div className="flex items-start gap-4 w-full">
                <img src={traveler.avatar} alt={traveler.name} className="w-12 h-12 rounded-full" />
                <div>
                    <h2 className="font-semibold text-lg">{traveler.name}</h2>
                    <p className="text-sm text-gray-500">Joined {traveler.joined}</p>
                </div>
            </div>
            <div className="flex items-start gap-4 mt-4 justify-between pb-3 border-b-2">
                <div className='flex flex-col'>
                    <p className="mt-1 text-gray-500">Destination</p>
                    <p className='font-medium'>{traveler.destination}</p>
                </div>
                <div className='flex flex-col'>
                    <p className="mt-1 text-gray-500">Tour Dates</p>
                    <p className='font-medium'>{traveler.dates}</p>
                </div>
                <div className='flex flex-col'>
                    <p className="mt-1 text-gray-500">Duration</p>
                    <p className='font-medium'>{traveler.duration}</p>
                </div>
                <div className='flex flex-col'>
                    <p className="mt-1 text-gray-500">Group Size</p>
                    <p className='font-medium'>{traveler.groupSize}</p>
                </div>
            </div>
            <div className="mt-4 flex flex-row justify-between items-end gap-2 items-center">
                <div>
                    <p className="text-orange-600 font-semibold">Daily Rate: Rs. {traveler.dailyRate}</p>
                    <p className="text-green-600 font-semibold">Total Earnings: Rs. {traveler.totalEarnings}</p>
                </div>
                <div className="flex gap-2">
                    {/* <PrimaryButton />
                    <SecondaryButton /> */}
                    <div className="">
                        <PrimaryButton
                            text="Accept"
                            type={'button'}
                            className={'text-base'}
                        />
                    </div>
                    <div className="">
                        <SecondaryButton
                            text="View Details"
                            type={'button'}
                            className={'text-base hover:text-orange-600'}
                        />
                    </div>
                    <div className="">
                        <SecondaryButton
                            text="✕ Decline"
                            type={'button'}
                            className={'text-base hover:text-red-600 text-red-500 hover:bg-orange-50 border-red-500 hover:bg-red-50'}
                        />
                    </div>
                </div>
            </div>
        </Card>
    );
};

TourRequestCard.propTypes = {
    traveler: PropTypes.shape({
        name: PropTypes.string.isRequired,
        joined: PropTypes.string.isRequired,
        destination: PropTypes.string.isRequired,
        dates: PropTypes.string.isRequired,
        duration: PropTypes.string.isRequired,
        groupSize: PropTypes.string.isRequired,
        dailyRate: PropTypes.string.isRequired,
        totalEarnings: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
    }).isRequired,
};

export default TourRequestCard;
