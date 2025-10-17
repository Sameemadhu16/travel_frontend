import { useState } from 'react';
import { Download, ChevronDown, X, DollarSign } from 'lucide-react';
import Main from '../../components/Main';
import NavBar from './guideComponents/NavBar'
import Card from './guideComponents/Card'
import { FaChartBar, FaCheck, FaDollarSign, FaHourglassHalf, FaSpinner } from 'react-icons/fa';

const TourEarningsModal = ({ isOpen, onClose }) => {
    const allTourHistory = [
        {
            id: 'TG-2024-001',
            name: 'Sigiriya Sunrise Tour',
            date: 'Dec 15, 2024',
            totalPaid: 'Rs. 45,000',
            commission: 'Rs. 9,000 (20%)',
            netEarning: 'Rs. 36,000',
            status: 'Pending'
        },
        {
            id: 'TG-2024-002',
            name: 'Kandy Cultural Tour',
            date: 'Dec 12, 2024',
            totalPaid: 'Rs. 60,000',
            commission: 'Rs. 12,000 (20%)',
            netEarning: 'Rs. 48,000',
            status: 'Paid'
        },
        {
            id: 'TG-2024-003',
            name: 'Galle Fort Walking Tour',
            date: 'Dec 10, 2024',
            totalPaid: 'Rs. 36,000',
            commission: 'Rs. 7,200 (20%)',
            netEarning: 'Rs. 28,800',
            status: 'Paid'
        },
        {
            id: 'TG-2024-004',
            name: 'Ella Tea Plantation Tour',
            date: 'Dec 8, 2024',
            totalPaid: 'Rs. 54,000',
            commission: 'Rs. 10,800 (20%)',
            netEarning: 'Rs. 43,200',
            status: 'Paid'
        },
        {
            id: 'TG-2024-005',
            name: 'Colombo City Tour',
            date: 'Dec 5, 2024',
            totalPaid: 'Rs. 42,000',
            commission: 'Rs. 8,400 (20%)',
            netEarning: 'Rs. 33,600',
            status: 'Paid'
        },
        {
            id: 'TG-2024-006',
            name: 'Negombo Lagoon Adventure',
            date: 'Dec 1, 2024',
            totalPaid: 'Rs. 48,000',
            commission: 'Rs. 9,600 (20%)',
            netEarning: 'Rs. 38,400',
            status: 'Paid'
        },
        {
            id: 'TG-2024-007',
            name: 'Adam\'s Peak Hiking Tour',
            date: 'Nov 28, 2024',
            totalPaid: 'Rs. 72,000',
            commission: 'Rs. 14,400 (20%)',
            netEarning: 'Rs. 57,600',
            status: 'Paid'
        },
        {
            id: 'TG-2024-008',
            name: 'Anuradhapura Ancient Sites',
            date: 'Nov 25, 2024',
            totalPaid: 'Rs. 66,000',
            commission: 'Rs. 13,200 (20%)',
            netEarning: 'Rs. 52,800',
            status: 'Paid'
        }
    ];

    const getStatusBadge = (status) => {
        if (status === 'Pending') {
            return 'bg-orange-100 text-orange-800 px-2 py-1 rounded-md text-xs font-medium';
        }
        return 'bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs font-medium';
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-orange-200">
                    <h2 className="text-2xl font-semibold">All Tour Earnings</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto flex-1">
                    <table className="w-full">
                        <thead className="bg-orange-50 sticky top-0">
                            <tr>
                                <th className="text-left py-3 px-6 text-xs font-medium text-gray-600 uppercase tracking-wider">Tour Details</th>
                                <th className="text-left py-3 px-6 text-xs font-medium text-gray-600 uppercase tracking-wider">Date</th>
                                <th className="text-left py-3 px-6 text-xs font-medium text-gray-600 uppercase tracking-wider">Total Paid</th>
                                <th className="text-left py-3 px-6 text-xs font-medium text-gray-600 uppercase tracking-wider">Commission</th>
                                <th className="text-left py-3 px-6 text-xs font-medium text-gray-600 uppercase tracking-wider">Net Earning</th>
                                <th className="text-left py-3 px-6 text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                                <th className="text-left py-3 px-6 text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {allTourHistory.map((tour, index) => (
                                <tr key={index} className="hover:bg-orange-50 transition">
                                    <td className="py-4 px-6">
                                        <div>
                                            <div className="font-medium text-gray-900">{tour.name}</div>
                                            <div className="text-sm text-gray-500">Booking #{tour.id}</div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-sm text-gray-900">{tour.date}</td>
                                    <td className="py-4 px-6 text-sm font-medium text-gray-900">{tour.totalPaid}</td>
                                    <td className="py-4 px-6 text-sm text-gray-600">{tour.commission}</td>
                                    <td className="py-4 px-6 text-sm font-medium text-orange-600">{tour.netEarning}</td>
                                    <td className="py-4 px-6">
                                        <span className={getStatusBadge(tour.status)}>{tour.status}</span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <button className="text-orange-600 hover:text-orange-700">
                                            <Download className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const GuideEarnings = () => {
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [showAllEarnings, setShowAllEarnings] = useState(false);

    const summaryCards = [
        {
            title: 'Total Earnings',
            amount: 'Rs. 1,28,000',
            icon: FaDollarSign,
            bgColor: 'bg-orange-50',
            iconColor: 'text-orange-600'
        },
        {
            title: 'Pending',
            amount: 'Rs. 36,000',
            icon: FaSpinner,
            bgColor: 'bg-amber-50',
            iconColor: 'text-amber-600'
        },
        {
            title: 'Paid Out',
            amount: 'Rs. 1,00,800',
            icon: FaHourglassHalf,
            bgColor: 'bg-orange-50',
            iconColor: 'text-orange-600'
        },
        {
            title: 'This Month',
            amount: 'Rs. 33,600',
            icon: FaChartBar,
            bgColor: 'bg-orange-100',
            iconColor: 'text-orange-700'
        }
    ];

    const tourHistory = [
        {
            id: 'TG-2024-001',
            name: 'Sigiriya Sunrise Tour',
            date: 'Dec 15, 2024',
            totalPaid: 'Rs. 45,000',
            commission: 'Rs. 9,000 (20%)',
            netEarning: 'Rs. 36,000',
            status: 'Pending'
        },
        {
            id: 'TG-2024-002',
            name: 'Kandy Cultural Tour',
            date: 'Dec 12, 2024',
            totalPaid: 'Rs. 60,000',
            commission: 'Rs. 12,000 (20%)',
            netEarning: 'Rs. 48,000',
            status: 'Paid'
        },
        {
            id: 'TG-2024-003',
            name: 'Galle Fort Walking Tour',
            date: 'Dec 10, 2024',
            totalPaid: 'Rs. 36,000',
            commission: 'Rs. 7,200 (20%)',
            netEarning: 'Rs. 28,800',
            status: 'Paid'
        }
    ];

    const adminPayouts = [
        {
            date: 'Dec 15, 2024',
            method: 'Bank Transfer',
            amount: 'Rs. 77,000',
            reference: 'PAY-2024-045',
            status: 'completed'
        },
        {
            date: 'Dec 6, 2024',
            method: 'PayPal',
            amount: 'Rs. 1,44,000',
            reference: 'PAY-2024-041',
            status: 'completed'
        },
        {
            date: 'Nov 29, 2024',
            method: 'Bank Transfer',
            amount: 'Rs. 96,000',
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
        <div className="flex">
            <div className="sticky top-0 h-fit">
                <NavBar />
            </div>
            <div className="flex-1">
                <Main hasNavbar={true}>
                    <div>
                        <h1 className="text-2xl font-bold mb-1">Earnings & Payment</h1>
                        <p className="text-gray-600 mb-6">View your total earnings, tour history, and recent payouts from the admin team</p>
                    </div>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        {summaryCards.map((card, index) => (
                            <Card key={index}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-600 text-sm mb-1">{card.title}</p>
                                        <p className="text-3xl font-bold">{card.amount}</p>
                                    </div>
                                    <div className="bg-orange-100 p-3 rounded-full">
                                        <card.icon className="fas fa-clock text-orange-500 text-xl" />
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {/* Info Banner */}
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                        <div className="flex items-start">
                            <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center mr-3 mt-0.5">
                                <span className="text-white text-xs">i</span>
                            </div>
                            <p className="text-orange-800 text-sm">
                                Payments are processed every Friday. Pending payouts will be sent within 5 business days to your registered bank account.
                            </p>
                        </div>
                    </div>

                    {/* Tour Earnings History */}
                    <Card className="mb-6">
                        <div className="pb-4 border-b border-orange-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold">Tour Earnings History</h2>
                                <div className="flex items-center space-x-4">
                                    <div className="relative">
                                        <select
                                            value={statusFilter}
                                            onChange={(e) => setStatusFilter(e.target.value)}
                                            className="appearance-none bg-white border border-orange-300 rounded-md px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                        >
                                            <option>All Status</option>
                                            <option>Pending</option>
                                            <option>Paid</option>
                                        </select>
                                        <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                                    </div>
                                    <button
                                        onClick={() => setShowAllEarnings(true)}
                                        className="text-orange-600 hover:text-orange-700 text-sm font-medium flex items-center"
                                    >
                                        View All
                                        <span className="ml-1">→</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-orange-50">
                                    <tr>
                                        <th className="text-left py-3 px-6 text-xs font-medium text-gray-600 uppercase tracking-wider">Tour Details</th>
                                        <th className="text-left py-3 px-6 text-xs font-medium text-gray-600 uppercase tracking-wider">Date</th>
                                        <th className="text-left py-3 px-6 text-xs font-medium text-gray-600 uppercase tracking-wider">Total Paid</th>
                                        <th className="text-left py-3 px-6 text-xs font-medium text-gray-600 uppercase tracking-wider">Commission</th>
                                        <th className="text-left py-3 px-6 text-xs font-medium text-gray-600 uppercase tracking-wider">Net Earning</th>
                                        <th className="text-left py-3 px-6 text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                                        <th className="text-left py-3 px-6 text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {tourHistory.map((tour, index) => (
                                        <tr key={index} className="hover:bg-orange-50 transition">
                                            <td className="py-4 px-6">
                                                <div>
                                                    <div className="font-medium text-gray-900">{tour.name}</div>
                                                    <div className="text-sm text-gray-500">Booking #{tour.id}</div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-sm text-gray-900">{tour.date}</td>
                                            <td className="py-4 px-6 text-sm font-medium text-gray-900">{tour.totalPaid}</td>
                                            <td className="py-4 px-6 text-sm text-gray-600">{tour.commission}</td>
                                            <td className="py-4 px-6 text-sm font-medium text-orange-600">{tour.netEarning}</td>
                                            <td className="py-4 px-6">
                                                <span className={getStatusBadge(tour.status)}>{tour.status}</span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <button className="text-orange-600 hover:text-orange-700">
                                                    <Download className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>

                    {/* Admin Payouts */}
                    <Card>
                        <div className="pb-4 border-b border-orange-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold">Admin Payouts</h2>
                                <button className="text-orange-600 hover:text-orange-700 text-sm font-medium flex items-center">
                                    View All
                                    <span className="ml-1">→</span>
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {adminPayouts.map((payout, index) => (
                                <div key={index} className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-200">
                                    <div className="flex items-center">
                                        <div className="bg-orange-100 p-3 rounded-full">
                                            <FaCheck className="fas fa-clock text-orange-500 text-xl" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-900">Payment Received</div>
                                            <div className="text-sm text-gray-600">{payout.date} • {payout.method}</div>
                                        </div>
                                    </div>
                                    <div className='flex items-center justify-between'>
                                        <div>
                                            <div className="font-bold text-lg text-gray-900">{payout.amount}</div>
                                            <div className="text-sm text-gray-500">Ref: {payout.reference}</div>
                                        </div>
                                        <button className="ml-4 text-orange-600 hover:text-orange-700">
                                            <Download className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Modal */}
                    <TourEarningsModal
                        isOpen={showAllEarnings}
                        onClose={() => setShowAllEarnings(false)}
                    />
                </Main>
            </div>
        </div>
    );
};

export default GuideEarnings;