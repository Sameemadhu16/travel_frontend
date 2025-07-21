import { FaCalendar, FaDollarSign, FaRoute, FaStar } from 'react-icons/fa';
import Main from '../../components/Main';
import Card from './guideComponents/Card';
import NavBar from './guideComponents/NavBar';
import user1 from '../../assets/users/user1.jpg';
import user2 from '../../assets/users/user4.jpg';
import user3 from '../../assets/users/user5.jpg';
import user4 from '../../assets/users/user4.jpg';

const TourHistory = () => {
    const statsData = [
        { icon: <FaRoute className='text-orange-600' />, label: 'Total Tours', value: '127', bgColor: 'bg-orange-50' },
        { icon: <FaDollarSign className='text-orange-600' />, label: 'Total Earnings', value: '$24,680', bgColor: 'bg-yellow-50' },
        { icon: <FaStar className='text-orange-600' />, label: 'Avg Rating', value: '4.8', bgColor: 'bg-orange-50' },
        { icon: <FaCalendar className='text-orange-600' />, label: 'This Month', value: '12', bgColor: 'bg-orange-50' }
    ];

    const tourData = [
        {
            id: 1,
            name: 'Sarah Rishan',
            avatar: user4,
            destination: 'Kandy',
            tourDate: 'July 15, 2025',
            duration: '3 days',
            status: 'Completed',
            earnings: 'Rs. 17500'
        },
        {
            id: 2,
            name: 'Nimal Fernando',
            avatar: user1,
            destination: 'Galle',
            tourDate: 'June 14, 2025',
            duration: '4 Days',
            status: 'Completed',
            earnings: 'Rs.32000'
        },
        {
            id: 3,
            name: 'Arul Kumar',
            avatar: user3,
            destination: 'Pottuvil',
            tourDate: 'June 10, 2025',
            duration: '2 Days',
            status: 'Completed',
            earnings: 'Rs.12000'
        },
        {
            id: 4,
            name: 'Sampath',
            avatar: user2,
            destination: 'Jaffna',
            tourDate: 'June 8, 2025',
            duration: '1 Day',
            status: 'Completed',
            earnings: 'Rs.22000'
        }
    ];

    return (
        <div className='flex'>
            <div className='sticky top-0 h-fit'>
                <NavBar />
            </div>
            <div className='flex-1'>
                <Main hasNavbar={true}>
                    <div className="max-w-6xl mx-auto">
                        {/* Header */}
                        <div className="">
                            <h1 className="text-2xl font-bold mb-1">Tour History</h1>
                            <p className="text-gray-600 mb-6">Track your completed tours and earnings</p>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                            {statsData.map((stat, index) => (
                                <Card key={index} className="!mb-0">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                        </div>
                                        <div className={`w-10 h-10 rounded-full ${stat.bgColor} flex items-center justify-center text-lg`}>
                                            {stat.icon}
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        {/* Tour History List */}
                        <div className="space-y-4">
                            {tourData.map((tour) => (
                                <Card key={tour.id} className="!mb-0">
                                    <div className="flex items-center justify-between">
                                        {/* Left side - Tourist info */}
                                        <div className="flex items-center space-x-4 flex-1">
                                            <div className="w-12 h-12 flex items-center justify-center">
                                                <img src={tour.avatar} alt="" className='w-full h-full object-cover rounded-lg' />
                                            </div>
                                            <div className="min-w-0">
                                                <h3 className="font-semibold text-gray-900">{tour.name}</h3>
                                                <p className="text-sm text-gray-600">{tour.type}</p>
                                            </div>
                                        </div>

                                        {/* Tour details */}
                                        <div className="flex items-center space-x-8 lg:space-x-16">
                                            {/* Destination */}
                                            <div className="text-center min-w-0">
                                                <p className="text-xs text-gray-500 mb-1">Destination</p>
                                                <p className="text-sm font-medium text-gray-900">{tour.destination}</p>
                                            </div>

                                            {/* Tour Date */}
                                            <div className="text-center min-w-0">
                                                <p className="text-xs text-gray-500 mb-1">Tour Date</p>
                                                <p className="text-sm font-medium text-gray-900">{tour.tourDate}</p>
                                            </div>

                                            {/* Duration */}
                                            <div className="text-center min-w-0">
                                                <p className="text-xs text-gray-500 mb-1">Duration</p>
                                                <p className="text-sm font-medium text-gray-900">{tour.duration}</p>
                                            </div>

                                            {/* Status */}
                                            <div className="text-center min-w-0">
                                                <p className="text-xs text-gray-500 mb-1">Status</p>
                                                <span className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                                                    {tour.status}
                                                </span>
                                            </div>

                                            {/* Earnings */}
                                            {tour.earnings && (
                                                <div className="text-right min-w-0">
                                                    <p className="text-lg font-bold text-orange-600">{tour.earnings}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </Main>
            </div>
        </div>
    );
};

export default TourHistory;