// import React from 'react';
import { FaCalendar, FaFilter, FaUsers, FaDollarSign } from 'react-icons/fa';
import Main from '../../components/Main';
import Card from './guideComponents/Card'; // Adjust path as needed
import PrimaryButton from '../../components/PrimaryButton';
import SecondaryButton from '../../components/SecondaryButton';
import NavBar from './guideComponents/NavBar'

const ConfirmedTours = () => {
    const tours = [
        {
            id: 1,
            title: "Swiss Alps Adventure",
            icon: "🏔️",
            customer: {
                name: "Sarah Johnson",
                phone: "+1 (555) 123-4567",
                avatar: "https://images.unsplash.com/photo-1494790108755-2616b332446c?w=50&h=50&fit=crop&crop=face"
            },
            details: {
                dates: "Dec 15 - Dec 22, 2024",
                travelers: 2,
                amount: "Rs. 20000"
            },
            actions: {
                primary: "Start Tour",
                secondary: "View Itinerary"
            }
        },
        {
            id: 2,
            title: "Bali Cultural Tour",
            icon: "🏛️",
            customer: {
                name: "Mike Chen",
                phone: "+1 (555) 987-6543",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face"
            },
            details: {
                dates: "Dec 18 - Dec 25, 2024",
                travelers: 4,
                amount: "Rs. 30000"
            },
            actions: {
                primary: "View Itinerary",
                secondary: "View Itinerary"
            }
        },
        {
            id: 3,
            title: "Rome Historical Walk",
            icon: "🏛️",
            customer: {
                name: "Emma Rodriguez",
                phone: "+1 (555) 456-7890",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face"
            },
            details: {
                dates: "Dec 22 - Dec 28, 2024",
                travelers: 2,
                amount: "Rs. 21000"
            },
            actions: {
                primary: "View Itinerary",
                secondary: "View Itinerary"
            }
        }
    ];

    const stats = [
        {
            title: "Confirmed Tours",
            value: "12",
            icon: "✅",
            color: "bg-orange-100 text-orange-600"
        },
        {
            title: "Starting Today",
            value: "3",
            icon: "▶️",
            color: "bg-green-100 text-green-600"
        },
        {
            title: "This Week",
            value: "7",
            icon: "🕐",
            color: "bg-blue-100 text-blue-600"
        },
        {
            title: "Total Revenue",
            value: "$24,500",
            icon: "💰",
            color: "bg-purple-100 text-purple-600"
        }
    ];

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
                                <h1 className="text-2xl font-bold mb-1">Confirmed Tours</h1>
                                <p className="text-gray-600 mb-6">Ready-to-go tours with confirmed payments</p>
                            </div>
                            <div className="flex items-center space-x-3">
                                <button className="bg-white hover:bg-orange-50 text-gray-700 py-2 px-4 rounded-lg border border-gray-300 flex items-center gap-2">
                                    <FaCalendar className='text-orange-500' />
                                    Calendar View
                                </button>
                                <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg flex items-center gap-2">
                                    <FaFilter className='text-white' />
                                    Filter Tours
                                </button>
                            </div>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                            {stats.map((stat, index) => (
                                <Card key={index} className="!border-gray-200">
                                    <div className="flex items-center">
                                        <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center text-lg mr-3`}>
                                            {stat.icon}
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">{stat.title}</p>
                                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        {/* Tour Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {tours.map((tour) => (
                                <Card key={tour.id}>
                                    {/* Tour Header with Orange Background */}
                                    <div className="bg-orange-500 -m-4 mb-4 p-8 text-white text-center rounded-lg">
                                        <div className="text-4xl mb-2">{tour.icon}</div>
                                        <h3 className="text-xl font-semibold">{tour.title}</h3>
                                    </div>

                                    {/* Customer Info */}
                                    <div className="flex items-center mb-4">
                                        <img
                                            src={tour.customer.avatar}
                                            alt={tour.customer.name}
                                            className="w-10 h-10 rounded-full mr-3"
                                        />
                                        <div>
                                            <h4 className="font-medium text-gray-900">{tour.customer.name}</h4>
                                            <p className="text-sm text-gray-600">{tour.customer.phone}</p>
                                        </div>
                                    </div>

                                    {/* Tour Details */}
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center text-sm gap-2">
                                            <FaCalendar className='text-orange-600' />
                                            {tour.details.dates}
                                        </div>
                                        <div className="flex items-center text-sm gap-2">
                                            <FaUsers className='text-orange-600' />
                                            {tour.details.travelers} travelers
                                        </div>
                                        <div className="flex items-center text-sm gap-2">
                                            <FaDollarSign className='text-orange-600' />
                                            {tour.details.amount}
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex space-x-2 mt-4">
                                        {tour.actions.primary === "Start Tour" ? (
                                            <PrimaryButton
                                                text="Start Tour"
                                                type={'button'}
                                                className={'text-base'}
                                            />
                                        ) : (
                                            <SecondaryButton
                                                text="View Itinerary"
                                                type={'button'}
                                                className={'text-base hover:text-orange-600'}
                                            />
                                        )}
                                        <button className="bg-white hover:bg-gray-50 text-orange-700 font-medium py-2 px-3 rounded-lg border border-orange-300 flex items-center justify-center">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                            </svg>
                                        </button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </Main>
                </div>
            </div>
        </>
    );
};

export default ConfirmedTours;