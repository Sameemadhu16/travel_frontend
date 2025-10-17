import { FaCalendar, FaClock, FaUsers, FaPhone } from 'react-icons/fa';
import Main from '../../components/Main';
import Card from './guideComponents/Card';
import PrimaryButton from '../../components/PrimaryButton';
import NavBar from './guideComponents/NavBar'
import { useState } from 'react';

const ConfirmedTours = () => {

    const [showConfirmation, setShowConfirmation] = useState(false);
    const [tourToStart, setTourToStart] = useState(null);
    const [activeTours, setActiveTours] = useState([]);
    const [tours, setTours] = useState([
        {
            tour: {
                tour_id: 1,
                destination: "Sigiriya Sunrise Adventure",
                date: "Dec 15 - Dec 17, 2024",
                groupSize: 2,
                duration: 3
            },
            customer: {
                name: "Akila Perera",
                phone: "+94 (77) 123-4567",
                image: "https://images.unsplash.com/photo-1494790108755-2616b332446c?w=50&h=50&fit=crop&crop=face"
            },
            payment: {
                status: "Confirmed",
                totalAmount: "Rs. 60,000",
                accepted: "100%",
                deadline: "Dec 14",
                due: "Payment Received"
            }
        },
        {
            tour: {
                tour_id: 2,
                destination: "Kandy Cultural Experience",
                date: "Dec 18 - Dec 22, 2024",
                groupSize: 4,
                duration: 4
            },
            customer: {
                name: "Ravi Kumar",
                phone: "+94 (76) 987-6543",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face"
            },
            payment: {
                status: "Confirmed",
                totalAmount: "Rs. 90,000",
                accepted: "100%",
                deadline: "Dec 16",
                due: "Payment Received"
            }
        },
        {
            tour: {
                tour_id: 3,
                destination: "Galle Fort Historical Walk",
                date: "Dec 22 - Dec 24, 2024",
                groupSize: 3,
                duration: 2
            },
            customer: {
                name: "Nithya de Silva",
                phone: "+94 (70) 456-7890",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face"
            },
            payment: {
                status: "Confirmed",
                totalAmount: "Rs. 63,000",
                accepted: "100%",
                deadline: "Dec 20",
                due: "Payment Received"
            }
        },
        {
            tour: {
                tour_id: 4,
                destination: "Ella Tea Plantation Tour",
                date: "Dec 25 - Dec 28, 2024",
                groupSize: 5,
                duration: 3
            },
            customer: {
                name: "Sampath Wijesinghe",
                phone: "+94 (71) 234-5678",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face"
            },
            payment: {
                status: "Confirmed",
                totalAmount: "Rs. 125,000",
                accepted: "100%",
                deadline: "Dec 23",
                due: "Payment Received"
            }
        },
        {
            tour: {
                tour_id: 5,
                destination: "Negombo Lagoon Adventure",
                date: "Dec 20 - Dec 21, 2024",
                groupSize: 2,
                duration: 1
            },
            customer: {
                name: "Meera Dissanayake",
                phone: "+94 (75) 567-8901",
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face"
            },
            payment: {
                status: "Confirmed",
                totalAmount: "Rs. 48,000",
                accepted: "100%",
                deadline: "Dec 19",
                due: "Payment Received"
            }
        },
        {
            tour: {
                tour_id: 6,
                destination: "Adam's Peak Hiking Expedition",
                date: "Dec 23 - Dec 24, 2024",
                groupSize: 3,
                duration: 2
            },
            customer: {
                name: "Janith Fernando",
                phone: "+94 (78) 890-1234",
                image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=50&h=50&fit=crop&crop=face"
            },
            payment: {
                status: "Confirmed",
                totalAmount: "Rs. 84,000",
                accepted: "100%",
                deadline: "Dec 22",
                due: "Payment Received"
            }
        }
    ]);

    let totalEarnings = 0;

    tours.forEach(tour => {
        totalEarnings += Number(tour.payment.totalAmount.replace(/,/g, '').replace('Rs. ', ''));
    });

    return (
        <div className='flex'>
            <div className='sticky top-0 h-fit'>
                <NavBar />
            </div>
            <div className='flex-1'>
                <Main hasNavbar={true}>
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-2xl font-bold mb-1">Confirmed Tours</h1>
                            <p className="text-gray-600">Tours with payment confirmed across Sri Lanka</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm font-medium">
                                {tours.length} Confirmed
                            </div>
                            <div className="text-gray-700 font-medium border border-gray-300 px-4 py-2 rounded-lg text-sm">
                                Total Earnings: <span className="text-green-600">Rs. {totalEarnings.toLocaleString()}</span>
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
                                        className="w-12 h-12 rounded-lg mr-3 object-cover"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900">{tour.customer.name}</h3>
                                        <p className="text-sm text-gray-600">{tour.customer.phone}</p>
                                    </div>
                                    <div className="flex items-center bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                                        <span className="w-2 h-2 bg-green-600 rounded-full mr-1"></span>
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
                                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium text-gray-700">Payment Status</span>
                                        <span className="text-sm font-bold text-green-600">✓ Confirmed</span>
                                    </div>
                                    <p className="text-xs text-gray-600">{tour.payment.due}</p>
                                </div>

                                {/* Earnings */}
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <p className="text-sm text-gray-600">Tour Earnings</p>
                                        <p className="text-2xl font-bold text-green-600">{tour.payment.totalAmount}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-600">Completed</p>
                                        <p className="text-sm font-medium text-gray-900">{tour.payment.accepted}</p>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex space-x-2">
                                    <div className="flex-1">
                                        <PrimaryButton
                                            text="Start Tour"
                                            type={'button'}
                                            className={'text-base'}
                                            onClick={() => {
                                                setTourToStart(tour);
                                                setShowConfirmation(true);
                                            }}
                                        />
                                    </div>
                                    <button className="flex-1 bg-white hover:bg-orange-50 text-orange-600 font-medium py-2 px-3 rounded-lg border border-orange-300 flex items-center justify-center gap-2 transition-colors">
                                        <FaPhone className="w-4 h-4" />
                                    </button>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {/* Confirmation Modal */}
                    {showConfirmation && tourToStart && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                            <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
                                <div className="p-6 border-b border-gray-200">
                                    <h2 className="text-2xl font-semibold text-gray-900">Start Tour</h2>
                                    <p className="text-gray-600 text-sm mt-1">Are you sure you want to start this tour?</p>
                                </div>

                                <div className="p-6 bg-gray-50">
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-sm text-gray-600">Tour</p>
                                            <p className="font-semibold text-gray-900">{tourToStart.tour.destination}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Customer</p>
                                            <p className="font-semibold text-gray-900">{tourToStart.customer.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Group Size</p>
                                            <p className="font-semibold text-gray-900">{tourToStart.tour.groupSize} Travelers</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Date</p>
                                            <p className="font-semibold text-gray-900">{tourToStart.tour.date}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 border-t border-gray-200 flex gap-2">
                                    <button
                                        onClick={() => setShowConfirmation(false)}
                                        className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 font-medium"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => {
                                            setActiveTours([...activeTours, tourToStart]);
                                            setTours(tours.filter(t => t.tour.tour_id !== tourToStart.tour.tour_id));
                                            setShowConfirmation(false);
                                            setTourToStart(null);
                                        }}
                                        className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium"
                                    >
                                        Start Tour
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </Main>
            </div>
        </div>
    );
};

export default ConfirmedTours;