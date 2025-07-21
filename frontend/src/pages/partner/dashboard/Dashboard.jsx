import React from 'react'
import PartnerLayout from '../../../components/partner/PartnerLayout'
import Title from '../../../components/Title'
import StatusBadge from '../../../components/admin/StatusBadge'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
    const navigate = useNavigate()

    // Sample data - replace with actual data from your backend
    const dashboardData = {
        stats: {
            totalBookings: 145,
            activeBookings: 12,
            pendingRequests: 5,
            totalEarnings: 875000,
            rating: 4.8,
            completedTrips: 133
        },
        recentBookings: [
            {
                id: 'BK001',
                customerName: 'John Smith',
                service: 'City Tour Package',
                date: '2025-07-20',
                amount: 35000,
                status: 'confirmed'
            },
            {
                id: 'BK002',
                customerName: 'Emma Wilson',
                service: 'Beach Tour',
                date: '2025-07-19',
                amount: 45000,
                status: 'pending'
            },
            {
                id: 'BK003',
                customerName: 'Michael Brown',
                service: 'Hill Country Tour',
                date: '2025-07-18',
                amount: 55000,
                status: 'completed'
            }
        ],
        popularServices: [
            { name: 'City Tour', bookings: 45, rating: 4.9 },
            { name: 'Beach Package', bookings: 38, rating: 4.7 },
            { name: 'Cultural Tour', bookings: 32, rating: 4.8 }
        ],
        notifications: [
            {
                id: 1,
                type: 'booking',
                message: 'New booking request received',
                time: '10 minutes ago'
            },
            {
                id: 2,
                type: 'review',
                message: 'New 5-star review received',
                time: '1 hour ago'
            },
            {
                id: 3,
                type: 'payment',
                message: 'Payment of Rs. 45,000 received',
                time: '2 hours ago'
            }
        ]
    }

    const formatCurrency = (amount) => {
        return `Rs. ${amount.toLocaleString()}`
    }

    // Quick action handlers
    const handleQuickAction = (action) => {
        switch (action) {
            case 'newTrip':
                navigate('/partner/trip-planner')
                break
            case 'viewBookings':
                navigate('/partner/bookings/active')
                break
            case 'viewEarnings':
                navigate('/partner/earnings')
                break
            case 'viewAnalytics':
                navigate('/partner/analytics')
                break
            default:
                break
        }
    }

    return (
        <PartnerLayout>
            <div className="p-6">
                <Title text="Partner Dashboard" />

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-sm font-medium text-gray-500">Total Bookings</h3>
                        <p className="text-2xl font-semibold text-gray-900 mt-2">
                            {dashboardData.stats.totalBookings}
                        </p>
                        <span className="text-sm text-green-600">↑ 12% from last month</span>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-sm font-medium text-gray-500">Active Bookings</h3>
                        <p className="text-2xl font-semibold text-blue-600 mt-2">
                            {dashboardData.stats.activeBookings}
                        </p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-sm font-medium text-gray-500">Pending Requests</h3>
                        <p className="text-2xl font-semibold text-yellow-600 mt-2">
                            {dashboardData.stats.pendingRequests}
                        </p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-sm font-medium text-gray-500">Total Earnings</h3>
                        <p className="text-2xl font-semibold text-green-600 mt-2">
                            {formatCurrency(dashboardData.stats.totalEarnings)}
                        </p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-sm font-medium text-gray-500">Rating</h3>
                        <p className="text-2xl font-semibold text-yellow-600 mt-2">
                            ⭐ {dashboardData.stats.rating}
                        </p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-sm font-medium text-gray-500">Completed Trips</h3>
                        <p className="text-2xl font-semibold text-indigo-600 mt-2">
                            {dashboardData.stats.completedTrips}
                        </p>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <button
                        onClick={() => handleQuickAction('newTrip')}
                        className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                        <h3 className="text-blue-700 font-medium">Create New Trip</h3>
                        <p className="text-sm text-blue-600 mt-1">Add a new trip package</p>
                    </button>
                    <button
                        onClick={() => handleQuickAction('viewBookings')}
                        className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                    >
                        <h3 className="text-green-700 font-medium">View Bookings</h3>
                        <p className="text-sm text-green-600 mt-1">Manage your bookings</p>
                    </button>
                    <button
                        onClick={() => handleQuickAction('viewEarnings')}
                        className="p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
                    >
                        <h3 className="text-yellow-700 font-medium">View Earnings</h3>
                        <p className="text-sm text-yellow-600 mt-1">Track your revenue</p>
                    </button>
                    <button
                        onClick={() => handleQuickAction('viewAnalytics')}
                        className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                    >
                        <h3 className="text-purple-700 font-medium">Analytics</h3>
                        <p className="text-sm text-purple-600 mt-1">View detailed reports</p>
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Bookings */}
                    <div className="bg-white rounded-lg shadow">
                        <div className="p-6">
                            <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Bookings</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full">
                                    <thead>
                                        <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            <th className="px-6 py-3">ID</th>
                                            <th className="px-6 py-3">Customer</th>
                                            <th className="px-6 py-3">Service</th>
                                            <th className="px-6 py-3">Amount</th>
                                            <th className="px-6 py-3">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {dashboardData.recentBookings.map((booking) => (
                                            <tr key={booking.id}>
                                                <td className="px-6 py-4 text-sm text-gray-900">
                                                    {booking.id}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-900">
                                                    {booking.customerName}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                    {booking.service}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-900">
                                                    {formatCurrency(booking.amount)}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <StatusBadge
                                                        status={booking.status}
                                                        colorMap={{
                                                            confirmed: 'blue',
                                                            pending: 'yellow',
                                                            completed: 'green'
                                                        }}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Notifications & Updates */}
                    <div className="bg-white rounded-lg shadow">
                        <div className="p-6">
                            <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Updates</h2>
                            <div className="space-y-4">
                                {dashboardData.notifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
                                    >
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-900">{notification.message}</p>
                                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Popular Services */}
                <div className="mt-6">
                    <div className="bg-white rounded-lg shadow">
                        <div className="p-6">
                            <h2 className="text-lg font-medium text-gray-900 mb-4">Popular Services</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {dashboardData.popularServices.map((service, index) => (
                                    <div
                                        key={index}
                                        className="bg-gray-50 rounded-lg p-4"
                                    >
                                        <h3 className="font-medium text-gray-900">{service.name}</h3>
                                        <div className="mt-2 space-y-2">
                                            <p className="text-sm text-gray-600">
                                                Bookings: {service.bookings}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Rating: ⭐ {service.rating}
                                            </p>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-blue-600 h-2 rounded-full"
                                                    style={{
                                                        width: `${(service.bookings / Math.max(...dashboardData.popularServices.map(s => s.bookings))) * 100}%`
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PartnerLayout>
    )
}
