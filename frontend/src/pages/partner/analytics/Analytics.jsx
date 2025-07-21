import React, { useState } from 'react'
import PartnerLayout from '../../../components/partner/PartnerLayout'
import Title from '../../../components/Title'

export default function Analytics() {
    const [timeRange, setTimeRange] = useState('month')

    // Sample data - replace with actual data from your backend
    const analyticsData = {
        totalBookings: 145,
        totalEarnings: 875000,
        averageRating: 4.7,
        bookingCompletionRate: 92,
        monthlyStats: {
            bookings: [28, 35, 42, 40, 45, 50, 48, 52, 55, 48, 50, 45],
            earnings: [150000, 175000, 200000, 185000, 225000, 250000, 240000, 260000, 275000, 240000, 250000, 225000],
            ratings: [4.5, 4.6, 4.7, 4.8, 4.7, 4.9, 4.8, 4.7, 4.8, 4.7, 4.8, 4.7]
        },
        popularServices: [
            { name: 'Airport Transfer', bookings: 45 },
            { name: 'City Tour', bookings: 35 },
            { name: 'Multi-day Tour', bookings: 25 },
            { name: 'Wedding Transport', bookings: 20 },
            { name: 'Corporate Service', bookings: 20 }
        ],
        customerSatisfaction: {
            excellent: 65,
            good: 25,
            average: 7,
            poor: 3
        }
    }

    const formatCurrency = (amount) => {
        return `Rs. ${amount.toLocaleString()}`
    }

    return (
        <PartnerLayout>
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <Title text="Analytics Dashboard" />
                    <select
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                        className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                        <option value="week">Last Week</option>
                        <option value="month">Last Month</option>
                        <option value="year">Last Year</option>
                    </select>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-gray-500 text-sm mb-2">Total Bookings</h3>
                        <p className="text-2xl font-semibold text-blue-600">{analyticsData.totalBookings}</p>
                        <p className="text-sm text-green-600 mt-2">↑ 12% from last month</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-gray-500 text-sm mb-2">Total Earnings</h3>
                        <p className="text-2xl font-semibold text-green-600">
                            {formatCurrency(analyticsData.totalEarnings)}
                        </p>
                        <p className="text-sm text-green-600 mt-2">↑ 8% from last month</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-gray-500 text-sm mb-2">Average Rating</h3>
                        <p className="text-2xl font-semibold text-yellow-600">
                            {analyticsData.averageRating} / 5
                        </p>
                        <p className="text-sm text-green-600 mt-2">↑ 0.2 from last month</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-gray-500 text-sm mb-2">Completion Rate</h3>
                        <p className="text-2xl font-semibold text-indigo-600">
                            {analyticsData.bookingCompletionRate}%
                        </p>
                        <p className="text-sm text-green-600 mt-2">↑ 3% from last month</p>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Monthly Booking Trends */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Booking Trends</h3>
                        <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                            {/* Replace with actual chart component */}
                            <p className="text-gray-500">Booking Trends Chart</p>
                        </div>
                    </div>

                    {/* Revenue Analytics */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue Analytics</h3>
                        <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                            {/* Replace with actual chart component */}
                            <p className="text-gray-500">Revenue Chart</p>
                        </div>
                    </div>
                </div>

                {/* Popular Services & Customer Satisfaction */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Popular Services */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Popular Services</h3>
                        <div className="space-y-4">
                            {analyticsData.popularServices.map((service) => (
                                <div key={service.name} className="flex items-center">
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900">{service.name}</p>
                                        <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-blue-600 h-2 rounded-full"
                                                style={{
                                                    width: `${(service.bookings / analyticsData.totalBookings) * 100}%`
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                    <span className="ml-4 text-sm text-gray-500">{service.bookings} bookings</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Customer Satisfaction */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Satisfaction</h3>
                        <div className="space-y-4">
                            {Object.entries(analyticsData.customerSatisfaction).map(([rating, percentage]) => (
                                <div key={rating} className="flex items-center">
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900 capitalize">{rating}</p>
                                        <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className={`h-2 rounded-full ${
                                                    rating === 'excellent'
                                                        ? 'bg-green-600'
                                                        : rating === 'good'
                                                        ? 'bg-blue-600'
                                                        : rating === 'average'
                                                        ? 'bg-yellow-600'
                                                        : 'bg-red-600'
                                                }`}
                                                style={{ width: `${percentage}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                    <span className="ml-4 text-sm text-gray-500">{percentage}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </PartnerLayout>
    )
}
