import  { useState } from 'react';
import { Download, ChevronDown } from 'lucide-react';
import Main from '../../components/Main';

const GuideEarnings = () => {
    const [statusFilter, setStatusFilter] = useState('All Status');

    const summaryCards = [
        {
            title: 'Total Earnings',
            amount: '$4,250',
            icon: '$',
            bgColor: 'bg-green-50',
            iconColor: 'text-green-600'
        },
        {
            title: 'Pending',
            amount: '$890',
            icon: '⏳',
            bgColor: 'bg-orange-50',
            iconColor: 'text-orange-600'
        },
        {
            title: 'Paid Out',
            amount: '$3,360',
            icon: '✓',
            bgColor: 'bg-blue-50',
            iconColor: 'text-blue-600'
        },
        {
            title: 'This Month',
            amount: '$1,120',
            icon: '📈',
            bgColor: 'bg-purple-50',
            iconColor: 'text-purple-600'
        }
    ];

    const tourHistory = [
        {
            id: 'TG-2024-001',
            name: 'Sigiriya Sunrise Tour',
            date: 'Dec 15, 2024',
            totalPaid: '$150',
            commission: '$30 (20%)',
            netEarning: '$120',
            status: 'Pending'
        },
        {
            id: 'TG-2024-002',
            name: 'Kandy Cultural Tour',
            date: 'Dec 12, 2024',
            totalPaid: '$200',
            commission: '$40 (20%)',
            netEarning: '$160',
            status: 'Paid'
        },
        {
            id: 'TG-2024-003',
            name: 'Galle Fort Walking Tour',
            date: 'Dec 10, 2024',
            totalPaid: '$120',
            commission: '$24 (20%)',
            netEarning: '$96',
            status: 'Paid'
        }
    ];

    const adminPayouts = [
        {
            date: 'Dec 15, 2024',
            method: 'Bank Transfer',
            amount: '$256',
            reference: 'PAY-2024-045',
            status: 'completed'
        },
        {
            date: 'Dec 6, 2024',
            method: 'PayPal',
            amount: '$480',
            reference: 'PAY-2024-041',
            status: 'completed'
        },
        {
            date: 'Nov 29, 2024',
            method: 'Bank Transfer',
            amount: '$320',
            reference: 'PAY-2024-038',
            status: 'completed'
        }
    ];

    const getStatusBadge = (status) => {
        if (status === 'Pending') {
            return 'bg-orange-100 text-orange-800 px-2 py-1 rounded-md text-xs font-medium';
        }
        return 'bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs font-medium';
    };

    return (
        <Main>
            <div className="min-h-screen">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">Tour Earnings</h1>
                        <p className="text-gray-600">Track your tour earnings and admin payouts</p>
                    </div>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {summaryCards.map((card, index) => (
                            <div key={index} className={`${card.bgColor} rounded-lg p-6 border border-gray-200`}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
                                        <p className="text-2xl font-bold text-gray-900">{card.amount}</p>
                                    </div>
                                    <div className={`w-10 h-10 rounded-lg ${card.bgColor} flex items-center justify-center ${card.iconColor} text-lg font-bold`}>
                                        {card.icon}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Info Banner */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                        <div className="flex items-start">
                            <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center mr-3 mt-0.5">
                                <span className="text-white text-xs">i</span>
                            </div>
                            <p className="text-blue-800 text-sm">
                                Payments are processed every Friday. Pending payouts will be sent within 5 business days.
                            </p>
                        </div>
                    </div>

                    {/* Tour Earnings History */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-gray-900">Tour Earnings History</h2>
                                <div className="flex items-center space-x-4">
                                    <div className="relative">
                                        <select
                                            value={statusFilter}
                                            onChange={(e) => setStatusFilter(e.target.value)}
                                            className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option>All Status</option>
                                            <option>Pending</option>
                                            <option>Paid</option>
                                        </select>
                                        <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                                    </div>
                                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                                    View All
                                    <span className="ml-1">→</span>
                                </button>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Tour Details</th>
                                        <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Total Paid</th>
                                        <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Commission</th>
                                        <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Net Earning</th>
                                        <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {tourHistory.map((tour, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="py-4 px-6">
                                                <div>
                                                    <div className="font-medium text-gray-900">{tour.name}</div>
                                                    <div className="text-sm text-gray-500">Booking #{tour.id}</div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-sm text-gray-900">{tour.date}</td>
                                            <td className="py-4 px-6 text-sm font-medium text-gray-900">{tour.totalPaid}</td>
                                            <td className="py-4 px-6 text-sm text-gray-600">{tour.commission}</td>
                                            <td className="py-4 px-6 text-sm font-medium text-green-600">{tour.netEarning}</td>
                                            <td className="py-4 px-6">
                                                <span className={getStatusBadge(tour.status)}>{tour.status}</span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <button className="text-blue-600 hover:text-blue-800">
                                                    <Download className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Admin Payouts */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-gray-900">Admin Payouts</h2>
                                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                                    View All
                                    <span className="ml-1">→</span>
                                </button>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="space-y-4">
                                {adminPayouts.map((payout, index) => (
                                    <div key={index} className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4">
                                                <span className="text-green-600 text-sm">✓</span>
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900">Payment Received</div>
                                                <div className="text-sm text-gray-600">{payout.date} • {payout.method}</div>
                                            </div>
                                        </div>
                                        <div className='justify-between flex'>
                                            <div className="">
                                                <div className="font-bold text-lg text-gray-900">{payout.amount}</div>
                                                <div className="text-sm text-gray-500">Ref: {payout.reference}</div>
                                            </div>
                                            <button className="ml-4 text-blue-600 hover:text-blue-800">
                                                <Download className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Main>
    );
};

export default GuideEarnings;