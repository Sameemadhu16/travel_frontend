import { NavLink } from 'react-router-dom'
import Logo from '../../assets/users/Logo.png'
import { Home, BarChart3, MapPin, Bell, Calendar, Clock, Star, MessageCircle, DollarSign, Car, Plus, CalendarDays, HelpCircle, Settings, LogOut } from 'lucide-react'

export default function PartnerLayout({ children }) {
    const menuItems = [
        {
            title: 'MAIN',
            items: [
                { label: 'Dashboard', icon: <Home size={18} />, path: '/partner/dashboard' },
                { label: 'Analytics', icon: <BarChart3 size={18} />, path: '/partner/analytics' }
            ]
        },
        {
            title: 'MANAGEMENT',
            items: [
                { label: 'Trip Planner', icon: <MapPin size={18} />, path: '/partner/trip-planner' },
                { label: 'Booking Requests', icon: <Bell size={18} />, path: '/partner/booking-requests' },
                { label: 'Active Bookings', icon: <Calendar size={18} />, path: '/partner/bookings/active' },
                { label: 'Booking History', icon: <Clock size={18} />, path: '/partner/bookings/history' },
                { label: 'Reviews', icon: <Star size={18} />, path: '/partner/reviews' },
                { label: 'Messages', icon: <MessageCircle size={18} />, path: '/partner/messages' }
            ]
        },
        {
            title: 'FINANCE',
            items: [
                { label: 'Earnings & Payments', icon: <DollarSign size={18} />, path: '/partner/earnings' }
            ]
        },
        {
            title: 'VEHICLES',
            items: [
                { label: 'My Vehicles', icon: <Car size={18} />, path: '/partner/vehicles' },
                { label: 'Add Vehicle', icon: <Plus size={18} />, path: '/partner/vehicles/add' },
                { label: 'Availability Calendar', icon: <CalendarDays size={18} />, path: '/partner/calendar' }
            ]
        },
        {
            title: 'SUPPORT',
            items: [
                { label: 'Help Center', icon: <HelpCircle size={18} />, path: '/partner/help' },
                { label: 'Settings', icon: <Settings size={18} />, path: '/partner/settings' }
            ]
        }
    ]

    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="ml-2 mb-2 bg-white shadow-xl border border-orange-400 rounded-3xl p-4 flex flex-col w-52 h-[calc(100vh-2.5rem)] sticky top-5">
                {/* Logo */}
                {/* <div className="mb-6 flex justify-center">
                    <img src={Logo} alt="travel.lk" className="h-8 w-auto" />
                </div> */}

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto">
                    {menuItems.map((section, index) => (
                        <div key={index} className="mb-6">
                            <h3 className="px-2 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                {section.title}
                            </h3>
                            <div className="space-y-1">
                                {section.items.map((item, itemIndex) => (
                                    <NavLink
                                        key={itemIndex}
                                        to={item.path}
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 p-2 px-4 rounded-full cursor-pointer text-sm font-medium transition-all hover:bg-orange-100 hover:text-black ${
                                                isActive ? 'bg-orange-500 text-white' : 'text-gray-700'
                                            }`
                                        }
                                    >
                                        {item.icon}
                                        {item.label}
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                    ))}
                </nav>

                {/* Logout */}
                <div className="pl-4 pt-4 pb-2 border-t-2 border-orange-400">
                    <div className="flex items-center gap-2 text-gray-600 hover:text-red-500 cursor-pointer">
                        <LogOut size={18} />
                        <span className="text-sm font-medium">Logout</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-h-screen bg-white p-6">
                {children}
            </div>
        </div>
    )
}
