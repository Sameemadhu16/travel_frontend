import React, { useState } from 'react'
import PartnerLayout from '../../../components/partner/PartnerLayout'
import Card from '../../../components/partner/Card'
import StatusBadge from '../../../components/admin/StatusBadge'

export default function EarningsAndPayments() {
    const [activeTab, setActiveTab] = useState('earnings')
    
    // Sample data - replace with actual data from your backend
    const earningsData = {
        totalEarnings: 450000,
        pendingPayments: 75000,
        completedPayments: 375000,
        recentTransactions: [
            {
                id: 1,
                bookingId: "BK001",
                amount: 25000,
                date: "2025-07-18",
                status: "completed",
                type: "Vehicle Booking"
            },
            {
                id: 2,
                bookingId: "BK002",
                amount: 35000,
                date: "2025-07-15",
                status: "pending",
                type: "Tour Package"
            },
            {
                id: 3,
                bookingId: "BK003",
                amount: 15000,
                date: "2025-07-10",
                status: "completed",
                type: "Vehicle Booking"
            }
        ]
    }

    const formatCurrency = (amount) => {
        return `Rs. ${amount.toLocaleString()}`
    }

    return (
        <PartnerLayout>
            <div className="p-6 pt-0">
                <div>
                    <h1 className="text-2xl font-bold mb-1">Earnings & Payments</h1>
                    <p className="text-gray-600 mb-6">Track your revenue, payments, and financial transactions.</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card>
                        <h3 className="text-gray-500 text-sm mb-2">Total Earnings</h3>
                        <p className="text-2xl font-semibold text-green-600">{formatCurrency(earningsData.totalEarnings)}</p>
                    </Card>
                    <Card>
                        <h3 className="text-gray-500 text-sm mb-2">Pending Payments</h3>
                        <p className="text-2xl font-semibold text-yellow-600">{formatCurrency(earningsData.pendingPayments)}</p>
                    </Card>
                    <Card>
                        <h3 className="text-gray-500 text-sm mb-2">Completed Payments</h3>
                        <p className="text-2xl font-semibold text-orange-600">{formatCurrency(earningsData.completedPayments)}</p>
                    </Card>
                </div>

                {/* Tabs */}
                <div className="mb-6">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8">
                            <button
                                onClick={() => setActiveTab('earnings')}
                                className={`${
                                    activeTab === 'earnings'
                                        ? 'border-orange-500 text-orange-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                            >
                                Earnings
                            </button>
                            <button
                                onClick={() => setActiveTab('payment-history')}
                                className={`${
                                    activeTab === 'payment-history'
                                        ? 'border-orange-500 text-orange-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                            >
                                Payment History
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Tab Content */}
                {activeTab === 'earnings' ? (
                    <Card>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Booking ID
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Type
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Amount
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {earningsData.recentTransactions.map((transaction) => (
                                    <tr key={transaction.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {transaction.bookingId}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {transaction.type}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {formatCurrency(transaction.amount)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {transaction.date}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <StatusBadge 
                                                status={transaction.status} 
                                                colorMap={{
                                                    completed: 'green',
                                                    pending: 'yellow'
                                                }}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Card>
                ) : (
                    <Card>
                        <div className="p-4 border-b border-gray-200">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-medium text-gray-900">Payment History</h3>
                                <select className="rounded-md border-orange-400 shadow-sm focus:border-orange-500 focus:ring-orange-500">
                                    <option value="all">All Time</option>
                                    <option value="month">This Month</option>
                                    <option value="year">This Year</option>
                                </select>
                            </div>
                        </div>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Payment ID
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Method
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Amount
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {[
                                    {
                                        id: 'PAY001',
                                        method: 'Bank Transfer',
                                        amount: 125000,
                                        date: '2025-07-01',
                                        status: 'completed'
                                    },
                                    {
                                        id: 'PAY002',
                                        method: 'Credit Card',
                                        amount: 75000,
                                        date: '2025-07-10',
                                        status: 'completed'
                                    },
                                    {
                                        id: 'PAY003',
                                        method: 'Bank Transfer',
                                        amount: 95000,
                                        date: '2025-07-15',
                                        status: 'pending'
                                    }
                                ].map((payment) => (
                                    <tr key={payment.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {payment.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {payment.method}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {formatCurrency(payment.amount)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {payment.date}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <StatusBadge 
                                                status={payment.status}
                                                colorMap={{
                                                    completed: 'green',
                                                    pending: 'yellow'
                                                }}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Card>
                )}
            </div>
        </PartnerLayout>
    )
}
