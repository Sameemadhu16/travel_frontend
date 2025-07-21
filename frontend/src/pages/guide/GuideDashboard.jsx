// import React from 'react'
import { FaCalendar, FaClock, FaDollarSign, FaStar, FaUserPlus } from 'react-icons/fa'
import Main from '../../components/Main'
import Card from './guideComponents/Card'
import PrimaryButton from '../../components/PrimaryButton'
import SecondaryButton from '../../components/SecondaryButton'
import NavBar from './guideComponents/NavBar'
import user4 from '../../assets/users/user4.jpg'
import user5 from '../../assets/users/user5.jpg'
import { FaMessage } from 'react-icons/fa6'



const GuideDashboard = () => {
    return (
        <div className='flex'>
            <div className='sticky top-0 h-fit'>
                <NavBar />
            </div>
            <div className='flex-1'>
                <Main hasNavbar={true}>
                    <div>
                        <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
                        <p className="text-gray-600 mb-6">Here’s what’s coming up in your tours and what needs your attention today.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <Card>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm mb-1">Pending Requests</p>
                                    <p className="text-3xl font-bold">3</p>
                                    <p className="text-orange-500 text-sm">View All Requests</p>
                                </div>
                                <div className="bg-orange-100 p-3 rounded-full">
                                    <FaClock className="fas fa-clock text-orange-500 text-xl" />
                                </div>
                            </div>
                        </Card>

                        <Card>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm mb-1">Upcoming Tours</p>
                                    <p className="text-3xl font-bold">8</p>
                                    <p className="text-gray-400 text-xs">Next Tomorrow 9:00 AM</p>
                                </div>
                                <div className="bg-blue-100 p-3 rounded-full">
                                    <FaCalendar className="fas fa-calendar text-blue-500 text-xl" />
                                </div>
                            </div>
                        </Card>

                        <Card>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm mb-1">Monthly Earnings</p>
                                    <p className="text-3xl font-bold">Rs. 78500</p>
                                    <p className="text-green-500 text-xs">+12% vs last month</p>
                                </div>
                                <div className="bg-green-100 p-3 rounded-full">
                                    <FaDollarSign className="fas fa-dollar-sign text-green-500 text-xl" />
                                </div>
                            </div>
                        </Card>

                        <Card>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm mb-1">Overall Rating</p>
                                    <div className="flex items-center">
                                        <p className="text-3xl font-bold mr-2">4.8</p>
                                        <div className="flex text-yellow-400">
                                            <i className="fas fa-star text-sm"></i>
                                            <i className="fas fa-star text-sm"></i>
                                            <i className="fas fa-star text-sm"></i>
                                            <i className="fas fa-star text-sm"></i>
                                            <i className="fas fa-star text-sm"></i>
                                        </div>
                                    </div>
                                    <p className="text-gray-400 text-xs">From 53 reviews</p>
                                </div>
                                <div className="bg-yellow-100 p-3 rounded-full">
                                    <FaStar className="fas fa-star text-yellow-500 text-xl" />
                                </div>
                            </div>
                        </Card>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <Card className="h-fit">
                                <h3 className="text-lg font-semibold mb-4">Recent Requests</h3>

                                <div className="flex items-center justify-between py-3 border-b">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                                            <img src={user4} alt="" className='rounded-lg'/>
                                        </div>
                                        <div>
                                            <p className="font-medium">Galle Adventurous Tour</p>
                                            <p className="text-sm text-gray-500">Sumith Amanda • July 25, 2025</p>
                                            <p className="text-sm text-gray-400">Group of 4 people</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <div className="min-w-0">
                                            <PrimaryButton
                                                text={'Accept'}
                                                type="button"
                                                className="text-sm"
                                            />
                                        </div>
                                        <div className="">
                                            <SecondaryButton
                                                text="Decline"
                                                type={'button'}
                                                className={'text-sm'}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Request Item 2 */}
                                <div className="flex items-center justify-between py-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                                            <img src={user5} alt="" className='rounded-lg'/>
                                        </div>
                                        <div>
                                            <p className="font-medium">Kandy Historical Tour</p>
                                            <p className="text-sm text-gray-500">Nimal Dissanayake • July 31, 2025</p>
                                            <p className="text-sm text-gray-400">Group of 6 people</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <div className="min-w-0">
                                            <PrimaryButton
                                                text={'Accept'}
                                                type="button"
                                                className="text-sm"
                                            />
                                        </div>
                                        <div className="">
                                            <SecondaryButton
                                                text="Decline"
                                                type={'button'}
                                                className={'text-sm'}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            {/* Upcoming Tours */}
                            {/* Upcoming Tours */}
                            <Card className="mt-4 h-fit">
                                <h3 className="text-lg font-semibold mb-4">Upcoming Tours</h3>

                                {/* Tour Item 1 - Historic Downtown Tour */}
                                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                                    <div className="flex justify-between items-start mb-3">
                                        <h4 className="font-semibold text-gray-800">Historic Downtown Tour</h4>
                                        <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm">
                                            Starts in 2h 15m
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-3">Tomorrow, Dec 21 • 9:00 AM - 12:00 PM</p>
                                    <div className="flex gap-2">
                                        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm">
                                            Open Itinerary
                                        </button>
                                        <button className="border border-orange-500 text-orange-500 px-4 py-2 rounded-lg text-sm">
                                            Message Group
                                        </button>
                                    </div>
                                </div>

                                {/* Tour Item 2 - Food & Culture Tour */}
                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                    <div className="flex justify-between items-start mb-3">
                                        <h4 className="font-semibold text-gray-800">Food & Culture Tour</h4>
                                        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded text-sm">
                                            Dec 23
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-3">Dec 23 • 2:00 PM - 6:00 PM</p>
                                    <button className="border border-gray-300 text-gray-600 px-4 py-2 rounded-lg text-sm">
                                        View Details
                                    </button>
                                </div>
                            </Card>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-4">
                            {/* Today's Activities */}
                            <Card>
                                <h3 className="text-lg font-semibold mb-4">Today&apos;s Activities</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <p className="text-sm">Met at pickup point</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                        <p className="text-sm">Currently at lunch stop</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                                        <p className="text-sm">Final destination</p>
                                    </div>
                                </div>
                            </Card>

                            {/* Recent Notifications */}
                            <Card>
                                <h3 className="text-lg font-semibold mb-4">Recent Notifications</h3>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                                            <FaUserPlus />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">New tour request</p>
                                            <p className="text-xs text-gray-500">3 minutes ago</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                            <FaMessage />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">Message from Sarah</p>
                                            <p className="text-xs text-gray-500">15 minutes ago</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                            <FaStar />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">New 5-star review</p>
                                            <p className="text-xs text-gray-500">1 hour ago</p>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div >
                </Main >
            </div>
        </div>
    )
}

export default GuideDashboard