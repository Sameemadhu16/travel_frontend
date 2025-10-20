import PartnerLayout from '../../../components/partner/PartnerLayout'
import Card from '../../../components/partner/Card'
import StatusBadge from '../../../components/admin/StatusBadge'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
    const navigate = useNavigate()

    // Sample data - replace with actual data from your backend
    const dashboardData = {
        stats: {
            totalBookings: 248,
            activeBookings: 18,
            pendingRequests: 7,
            totalEarnings: 1875000,
            rating: 4.7,
            completedTrips: 223
        },
        recentBookings: [
            {
                id: 'BK10241',
                customerName: 'Tharindu Jayawardena',
                service: 'Kandy & Nuwara Eliya Tour',
                date: '2025-01-25',
                amount: 68000,
                status: 'confirmed'
            },
            {
                id: 'BK10242',
                customerName: 'Methmi Rajapaksha',
                service: 'Galle & Bentota Beach Tour',
                date: '2025-01-24',
                amount: 52000,
                status: 'pending'
            },
            {
                id: 'BK10243',
                customerName: 'Isuru Samaraweera',
                service: 'Sigiriya & Polonnaruwa Tour',
                date: '2025-01-23',
                amount: 75000,
                status: 'completed'
            },
            {
                id: 'BK10244',
                customerName: 'Dilini Wickramasinghe',
                service: 'Yala Safari & Ella Tour',
                date: '2025-01-22',
                amount: 95000,
                status: 'completed'
            }
        ],
        popularServices: [
            { name: 'Kandy & Hill Country', bookings: 78, rating: 4.8 },
            { name: 'South Coast Beaches', bookings: 65, rating: 4.7 },
            { name: 'Cultural Triangle', bookings: 52, rating: 4.9 }
        ],
        notifications: [
            {
                id: 1,
                type: 'booking',
                message: 'New booking request from Nimal Perera for Ella Tour',
                time: '15 minutes ago'
            },
            {
                id: 2,
                type: 'review',
                message: 'New 5-star review for Sigiriya Tour service',
                time: '2 hours ago'
            },
            {
                id: 3,
                type: 'payment',
                message: 'Payment of Rs. 68,000 received from Tharindu Jayawardena',
                time: '3 hours ago'
            },
            {
                id: 4,
                type: 'booking',
                message: 'Booking confirmed for Arugam Bay Surf Tour',
                time: '5 hours ago'
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
            <div className="p-6 pt-0">
                <div>
                    <h1 className="text-2xl font-bold mb-1">Vehicle Agency Dashboard</h1>
                    <p className="text-gray-600 mb-6">Here&apos;s an overview of your bookings, vehicles, and earnings.</p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
                    <Card>
                        <h3 className="text-sm font-medium text-gray-500">Total Bookings</h3>
                        <p className="text-2xl font-semibold text-gray-900 mt-2">
                            {dashboardData.stats.totalBookings}
                        </p>
                        <span className="text-sm text-green-600">↑ 12% from last month</span>
                    </Card>
                    <Card>
                        <h3 className="text-sm font-medium text-gray-500">Active Bookings</h3>
                        <p className="text-2xl font-semibold text-orange-600 mt-2">
                            {dashboardData.stats.activeBookings}
                        </p>
                    </Card>
                    <Card>
                        <h3 className="text-sm font-medium text-gray-500">Pending Requests</h3>
                        <p className="text-2xl font-semibold text-yellow-600 mt-2">
                            {dashboardData.stats.pendingRequests}
                        </p>
                    </Card>
                    <Card>
                        <h3 className="text-sm font-medium text-gray-500">Total Earnings</h3>
                        <p className="text-2xl font-semibold text-green-600 mt-2">
                            {formatCurrency(dashboardData.stats.totalEarnings)}
                        </p>
                    </Card>
                    <Card>
                        <h3 className="text-sm font-medium text-gray-500">Rating</h3>
                        <p className="text-2xl font-semibold text-yellow-600 mt-2">
                            ⭐ {dashboardData.stats.rating}
                        </p>
                    </Card>
                    <Card>
                        <h3 className="text-sm font-medium text-gray-500">Completed Trips</h3>
                        <p className="text-2xl font-semibold text-orange-600 mt-2">
                            {dashboardData.stats.completedTrips}
                        </p>
                    </Card>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <button
                        onClick={() => handleQuickAction('newTrip')}
                        className="p-4 bg-orange-50 border border-orange-400 rounded-lg hover:bg-orange-100 transition-colors"
                    >
                        <h3 className="text-orange-700 font-medium">Create New Trip</h3>
                        <p className="text-sm text-orange-600 mt-1">Add a new trip package</p>
                    </button>
                    <button
                        onClick={() => handleQuickAction('viewBookings')}
                        className="p-4 bg-orange-50 border border-orange-400 rounded-lg hover:bg-orange-100 transition-colors"
                    >
                        <h3 className="text-orange-700 font-medium">View Bookings</h3>
                        <p className="text-sm text-orange-600 mt-1">Manage your bookings</p>
                    </button>
                    <button
                        onClick={() => handleQuickAction('viewEarnings')}
                        className="p-4 bg-orange-50 border border-orange-400 rounded-lg hover:bg-orange-100 transition-colors"
                    >
                        <h3 className="text-orange-700 font-medium">View Earnings</h3>
                        <p className="text-sm text-orange-600 mt-1">Track your revenue</p>
                    </button>
                    <button
                        onClick={() => handleQuickAction('viewAnalytics')}
                        className="p-4 bg-orange-50 border border-orange-400 rounded-lg hover:bg-orange-100 transition-colors"
                    >
                        <h3 className="text-orange-700 font-medium">Analytics</h3>
                        <p className="text-sm text-orange-600 mt-1">View detailed reports</p>
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Bookings */}
                    <Card>
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
                                                        confirmed: 'orange',
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
                    </Card>

                    {/* Notifications & Updates */}
                    <Card>
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Updates</h2>
                        <div className="space-y-4">
                            {dashboardData.notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className="flex items-start space-x-4 p-4 bg-orange-50 border border-orange-200 rounded-lg"
                                >
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-900">{notification.message}</p>
                                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Popular Services */}
                <div className="mt-6">
                    <Card>
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Popular Services</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {dashboardData.popularServices.map((service, index) => (
                                <div
                                    key={index}
                                    className="bg-orange-50 border border-orange-200 rounded-lg p-4"
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
                                                className="bg-orange-500 h-2 rounded-full"
                                                style={{
                                                    width: `${(service.bookings / Math.max(...dashboardData.popularServices.map(s => s.bookings))) * 100}%`
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </PartnerLayout>
    )
}
