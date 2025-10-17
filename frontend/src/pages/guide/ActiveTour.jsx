import { useState } from 'react';
import Main from '../../components/Main';
import Card from './guideComponents/Card';
import User from '../../assets/users/user4.jpg'
import { ClockIcon, MapPinIcon, X } from 'lucide-react';
import PrimaryButton from '../../components/PrimaryButton';
import SecondaryButton from '../../components/SecondaryButton';
import NavBar from './guideComponents/NavBar'

const FullItineraryModal = ({ isOpen, onClose, tourInfo, fullItinerary }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-orange-200 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-semibold">Full Tour Itinerary</h2>
                        <p className="text-gray-600 text-sm mt-1">{tourInfo.destination} - {tourInfo.totalDuration}</p>
                    </div>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="overflow-y-auto flex-1 p-6">
                    <div className="space-y-6">
                        {Object.entries(fullItinerary).map(([day, activities]) => (
                            <div key={day}>
                                <h3 className="text-lg font-semibold text-orange-600 mb-3">{day}</h3>
                                <div className="space-y-3">
                                    {activities.map((item, index) => (
                                        <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                                            <div className="flex items-start">
                                                <div className="flex-shrink-0">
                                                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                                                        <span className="text-orange-600 font-semibold text-sm">{index + 1}</span>
                                                    </div>
                                                </div>
                                                <div className="ml-4 flex-1">
                                                    <h4 className="font-semibold text-gray-900">{item.title}</h4>
                                                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                                                    <div className="flex items-center text-sm text-gray-600 space-x-4 mt-3">
                                                        <div className="flex items-center">
                                                            <ClockIcon className="w-4 h-4 mr-1" />
                                                            {item.time}
                                                        </div>
                                                        <div className="flex items-center">
                                                            <MapPinIcon className="w-4 h-4 mr-1" />
                                                            {item.location}
                                                        </div>
                                                    </div>
                                                    <div className="mt-2">
                                                        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                                                            item.status === 'completed' ? 'bg-green-100 text-green-700' :
                                                            item.status === 'active' ? 'bg-blue-100 text-blue-700' :
                                                            'bg-gray-100 text-gray-700'
                                                        }`}>
                                                            {item.statusText}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-orange-200">
                    <button
                        onClick={onClose}
                        className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

const EndDayConfirmationModal = ({ isOpen, onClose, onConfirm, currentDay, totalDays }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
                <div className="p-6 border-b border-orange-200">
                    <h2 className="text-2xl font-semibold text-gray-900">End Day {currentDay}?</h2>
                    <p className="text-gray-600 text-sm mt-1">This will move to Day {currentDay + 1} of {totalDays}</p>
                </div>

                <div className="p-6 bg-gray-50">
                    <p className="text-gray-700">Are you sure you want to end the day and move to the next day's itinerary?</p>
                </div>

                <div className="p-6 border-t border-orange-200 flex gap-2">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium"
                    >
                        End Day
                    </button>
                </div>
            </div>
        </div>
    );
};

const ActiveTour = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEndDayModalOpen, setIsEndDayModalOpen] = useState(false);
    const [currentDay, setCurrentDay] = useState(1);
    const [completedActivities, setCompletedActivities] = useState([]);

    const tourInfo = {
        destination: "Ella & Nuwara Eliya",
        totalDuration: "5 Days",
        travelers: "3 People",
        totalDays: 5
    };

    const traveler = {
        name: "Akila Perera",
        role: "Group Leader",
        avatar: User
    };

    // Complete itinerary for all 5 days
    const completeItinerary = {
        "Day 1: Arrival & Settling In": [
            {
                id: 1,
                title: "Arrival at Colombo Airport",
                description: "Pick up from Colombo airport and drive to Nuwara Eliya.",
                time: "09:00",
                location: "Colombo Airport",
                status: "completed",
                statusText: "Done"
            },
            {
                id: 2,
                title: "Hotel Check-in",
                description: "Check-in at the hotel and relax after travel.",
                time: "16:00",
                location: "Nuwara Eliya",
                status: "completed",
                statusText: "Done"
            },
            {
                id: 3,
                title: "Dinner & Orientation",
                description: "Welcome dinner and brief orientation about the tour.",
                time: "19:00",
                location: "Hotel Restaurant",
                status: "completed",
                statusText: "Done"
            }
        ],
        "Day 2: Horton Plains & Baker's Falls": [
            {
                id: 4,
                title: "Sunrise Hike at Horton Plains",
                description: "Early morning hike to World's End for beautiful sunrise views.",
                time: "06:00",
                location: "Horton Plains National Park",
                status: currentDay === 2 ? "completed" : currentDay > 2 ? "completed" : "upcoming",
                statusText: currentDay === 2 ? "Done" : currentDay > 2 ? "Done" : "Pending"
            },
            {
                id: 5,
                title: "Visit to Baker's Falls",
                description: "Trek through scenic trails to reach Baker's Falls waterfall.",
                time: "10:30",
                location: "Baker's Falls",
                status: currentDay === 2 ? "active" : currentDay > 2 ? "completed" : "upcoming",
                statusText: currentDay === 2 ? "Active" : currentDay > 2 ? "Done" : "Pending"
            },
            {
                id: 6,
                title: "Lunch at Local Restaurant",
                description: "Enjoy authentic Sri Lankan cuisine and rest.",
                time: "13:00",
                location: "Nuwara Eliya",
                status: currentDay > 2 ? "completed" : "upcoming",
                statusText: currentDay > 2 ? "Done" : "Pending"
            },
            {
                id: 7,
                title: "Sunset at Gregory Lake",
                description: "Scenic sunset photography session and evening walk.",
                time: "18:00",
                location: "Gregory Lake",
                status: currentDay > 2 ? "completed" : "upcoming",
                statusText: currentDay > 2 ? "Done" : "Pending"
            }
        ],
        "Day 3: Tea Plantations & Ella": [
            {
                id: 8,
                title: "Tea Plantation Tour",
                description: "Visit a local tea plantation and learn about Sri Lankan tea production.",
                time: "08:00",
                location: "Ella Tea Gardens",
                status: currentDay === 3 ? "completed" : currentDay > 3 ? "completed" : "upcoming",
                statusText: currentDay === 3 ? "Done" : currentDay > 3 ? "Done" : "Pending"
            },
            {
                id: 9,
                title: "Ravana Falls Visit",
                description: "Explore the beautiful Ravana Falls, the widest waterfall in Sri Lanka.",
                time: "11:30",
                location: "Ravana Falls",
                status: currentDay === 3 ? "active" : currentDay > 3 ? "completed" : "upcoming",
                statusText: currentDay === 3 ? "Active" : currentDay > 3 ? "Done" : "Pending"
            },
            {
                id: 10,
                title: "Dinner at Ella",
                description: "Enjoy dinner with a view of the mountains.",
                time: "19:00",
                location: "Ella",
                status: currentDay > 3 ? "completed" : "upcoming",
                statusText: currentDay > 3 ? "Done" : "Pending"
            }
        ],
        "Day 4: Kandy Cultural Tour": [
            {
                id: 11,
                title: "Drive to Kandy",
                description: "Scenic drive from Ella to Kandy through tea plantations.",
                time: "07:00",
                location: "Kandy",
                status: currentDay === 4 ? "completed" : currentDay > 4 ? "completed" : "upcoming",
                statusText: currentDay === 4 ? "Done" : currentDay > 4 ? "Done" : "Pending"
            },
            {
                id: 12,
                title: "Temple of the Tooth Visit",
                description: "Visit the sacred Temple of the Tooth in Kandy.",
                time: "10:00",
                location: "Temple of the Tooth",
                status: currentDay === 4 ? "active" : currentDay > 4 ? "completed" : "upcoming",
                statusText: currentDay === 4 ? "Active" : currentDay > 4 ? "Done" : "Pending"
            },
            {
                id: 13,
                title: "Kandy Lake Walk",
                description: "Relaxing walk around the beautiful Kandy Lake.",
                time: "14:00",
                location: "Kandy Lake",
                status: currentDay > 4 ? "completed" : "upcoming",
                statusText: currentDay > 4 ? "Done" : "Pending"
            },
            {
                id: 14,
                title: "Traditional Dance Show",
                description: "Evening traditional Kandyan dance performance.",
                time: "19:30",
                location: "Cultural Center",
                status: currentDay > 4 ? "completed" : "upcoming",
                statusText: currentDay > 4 ? "Done" : "Pending"
            }
        ],
        "Day 5: Departure": [
            {
                id: 15,
                title: "Breakfast & Packing",
                description: "Final breakfast and pack for departure.",
                time: "07:00",
                location: "Hotel",
                status: currentDay === 5 ? "completed" : "upcoming",
                statusText: currentDay === 5 ? "Done" : "Pending"
            },
            {
                id: 16,
                title: "Drive to Airport",
                description: "Drive to Colombo airport for departure.",
                time: "09:00",
                location: "Colombo Airport",
                status: currentDay === 5 ? "active" : "upcoming",
                statusText: currentDay === 5 ? "Active" : "Pending"
            }
        ]
    };

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

    const dayKeys = Object.keys(completeItinerary);
    const todayActivities = completeItinerary[dayKeys[currentDay - 1]] || [];

    const handleEndDay = () => {
        if (currentDay < tourInfo.totalDays) {
            setCurrentDay(currentDay + 1);
            setIsEndDayModalOpen(false);
        }
    };

    return (
        <div className='flex'>
            <div className='sticky top-0 h-fit'>
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
                                Day {currentDay} of {tourInfo.totalDays}
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
                            <h2 className="text-lg font-semibold text-gray-900 mb-3">Group Leader</h2>
                            <div className="flex items-center">
                                <img
                                    src={traveler.avatar}
                                    alt={traveler.name}
                                    className="w-10 h-10 rounded-full mr-3 object-cover"
                                />
                                <div>
                                    <p className="font-medium text-gray-900">{traveler.name}</p>
                                    <p className="text-sm text-gray-600">{traveler.role}</p>
                                </div>
                            </div>
                        </div>

                        {/* Today's Itinerary */}
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                {dayKeys[currentDay - 1]}
                            </h2>

                            <div className="space-y-4">
                                {todayActivities.map((item) => (
                                    <Card key={item.id} className={`${getStatusColor(item.status)}`}>
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-start flex-1">
                                                <div className={`w-3 h-3 rounded-full ${getStatusDot(item.status)} mt-1 mr-3 flex-shrink-0`}></div>
                                                <div className="flex-1">
                                                    <h3 className="font-medium text-gray-900 mb-2">{item.title}</h3>
                                                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>
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
                                            <div className="flex items-center space-x-2 ml-4">
                                                <span className={`text-sm font-medium ${getStatusTextColor(item.status)}`}>
                                                    {item.statusText}
                                                </span>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        {/* Bottom Actions */}
                        <div className="flex justify-between items-center pt-4 border-t">
                            <div>
                                <SecondaryButton
                                    text="View Full Itinerary"
                                    type={'button'}
                                    className={'text-base'}
                                    onClick={() => setIsModalOpen(true)}
                                />
                            </div>
                            <div>
                                <PrimaryButton
                                    text={currentDay === tourInfo.totalDays ? "Finish Tour" : "End Day"}
                                    type={'button'}
                                    className={'text-base'}
                                    onClick={() => setIsEndDayModalOpen(true)}
                                />
                            </div>
                        </div>
                    </div>
                </Main>
            </div>

            {/* Full Itinerary Modal */}
            <FullItineraryModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)}
                tourInfo={tourInfo}
                fullItinerary={completeItinerary}
            />

            {/* End Day Confirmation Modal */}
            <EndDayConfirmationModal
                isOpen={isEndDayModalOpen}
                onClose={() => setIsEndDayModalOpen(false)}
                onConfirm={handleEndDay}
                currentDay={currentDay}
                totalDays={tourInfo.totalDays}
            />
        </div>
    );
};

export default ActiveTour;