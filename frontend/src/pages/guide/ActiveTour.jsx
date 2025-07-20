// import React from 'react';
import Main from '../../components/Main';
import Card from './guideComponents/Card'; // Adjust path as needed
import User from '../../assets/users/user4.jpg'
import { ClockIcon, MapPinIcon } from 'lucide-react';
import PrimaryButton from '../../components/PrimaryButton';
import SecondaryButton from '../../components/SecondaryButton';
import NavBar from './guideComponents/NavBar'

const ActiveTour = () => {
    const tourInfo = {
        destination: "Santorini, Greece",
        totalDuration: "7 Days",
        travelers: "4 People",
        currentDay: 3,
        totalDays: 7
    };

    const traveler = {
        name: "Sarah Johnson",
        role: "Group Leader",
        avatar: User
    };

    const itinerary = [
        {
            id: 1,
            title: "Adventure at Horton Plains",
            time: "09:00",
            location: "Horton Plains",
            status: "completed",
            statusText: "Done"
        },
        {
            id: 2,
            title: "Visit to Moon Plains",
            time: "12:30",
            location: "Moon Plains",
            status: "active",
            statusText: "Active"
        },
        {
            id: 3,
            title: "Sunset Photography Session",
            time: "19:00",
            location: "Gregory Lake",
            status: "upcoming",
            statusText: "Pending"
        },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 border-green-200';
            case 'active':
                return 'bg-blue-100 border-blue-200';
            case 'upcoming':
                return 'bg-gray-100 border-gray-200';
            default:
                return 'bg-gray-100 border-gray-200';
        }
    };

    const getStatusDot = (status) => {
        switch (status) {
            case 'completed':
                return 'bg-green-500';
            case 'active':
                return 'bg-blue-500';
            case 'upcoming':
                return 'bg-gray-400';
            default:
                return 'bg-gray-400';
        }
    };

    const getStatusTextColor = (status) => {
        switch (status) {
            case 'completed':
                return 'text-green-600';
            case 'active':
                return 'text-blue-600';
            case 'upcoming':
                return 'text-gray-600';
            default:
                return 'text-gray-600';
        }
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
                        <div>
                            {/* Header */}

                            <div className="flex justify-between items-center">
                                <div>
                                    <h1 className="text-2xl font-bold mb-1">Active Tour Dashboard</h1>
                                    <p className="text-gray-600 mb-6">Monitor current tour progress and upcoming activities</p>
                                </div>
                                <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                                    Day {tourInfo.currentDay} of {tourInfo.totalDays}
                                </div>
                            </div>

                            {/* Tour Info Cards */}
                            <div className="grid grid-cols-3 gap-4 mb-6">
                                <div className="bg-orange-500 text-white p-4 rounded-lg">
                                    <p className="text-sm font-medium opacity-90">Destination</p>
                                    <p className="text-lg font-semibold">{tourInfo.destination}</p>
                                </div>
                                <div className="bg-gray-100 p-4 rounded-lg">
                                    <p className="text-sm text-gray-600">Total Duration</p>
                                    <p className="text-lg font-semibold text-gray-900">{tourInfo.totalDuration}</p>
                                </div>
                                <div className="bg-gray-100 p-4 rounded-lg">
                                    <p className="text-sm text-gray-600">Travelers</p>
                                    <p className="text-lg font-semibold text-gray-900">{tourInfo.travelers}</p>
                                </div>
                            </div>

                            {/* Traveler Info */}
                            <div className="mb-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-3">Traveler</h2>
                                <div className="flex items-center">
                                    <img
                                        src={traveler.avatar}
                                        alt={traveler.name}
                                        className="w-10 h-10 rounded-full mr-3"
                                    />
                                    <div>
                                        <p className="font-medium text-gray-900">{traveler.name}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Today's Itinerary */}
                            <div className="mb-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                    Todays Itinerary - Day {tourInfo.currentDay}
                                </h2>

                                <div className="space-y-4">
                                    {itinerary.map((item) => (
                                        <Card key={item.id} className={`${getStatusColor(item.status)}`}>
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-start">
                                                    <div className={`w-3 h-3 rounded-full ${getStatusDot(item.status)} mt-1 mr-3 flex-shrink-0`}></div>
                                                    <div className="flex-1">
                                                        <h3 className="font-medium text-gray-900 mb-2">{item.title}</h3>
                                                        <div className="flex items-center text-sm text-gray-600 space-x-4">
                                                            <div className="flex items-center">
                                                                <ClockIcon className="w-4 h-4 mr-1" />
                                                                {item.time}
                                                            </div>
                                                            <div className="flex items-center">
                                                                <MapPinIcon className="w-4 h-4 mr-1" />
                                                                {item.location}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <span className={`text-sm font-medium ${getStatusTextColor(item.status)}`}>
                                                        {item.statusText}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="mt-3 flex space-x-2">
                                                {item.status === 'active' && (
                                                    <div className='w-1/6'>
                                                        <PrimaryButton
                                                            text="Mark Completed"
                                                            type={'button'}
                                                            className={'text-base'}
                                                        />
                                                    </div>
                                                )}
                                                {item.status === 'upcoming' && (
                                                    <div className='w-1/6'>
                                                        <PrimaryButton
                                                            text="Start Activity"
                                                            type={'button'}
                                                            className={'text-base'}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </div>

                            {/* Bottom Actions */}
                            <div className="flex justify-between items-center pt-4 border-t">
                                <div className=''>
                                    <SecondaryButton
                                        text="View Full Itinerary"
                                        type={'button'}
                                        className={'text-base'}
                                    />
                                </div>
                                <div className=''>
                                    <PrimaryButton
                                        text="End Day"
                                        type={'button'}
                                        className={'text-base'}
                                    />
                                </div>
                            </div>
                        </div>
                    </Main>
                </div>
            </div>
        </>
    );
};

export default ActiveTour;