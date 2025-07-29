import React, { useState } from 'react'
import PartnerLayout from '../../../components/partner/PartnerLayout'
import Title from '../../../components/Title'
import InputField from '../../../components/InputField'
import InputArea from '../../../components/InputArea'
import PrimaryButton from '../../../components/PrimaryButton'
import StatusBadge from '../../../components/admin/StatusBadge'

export default function TripPlanner() {
    const [activeTab, setActiveTab] = useState('my-trips')
    const [showAddTripModal, setShowAddTripModal] = useState(false)

    // Sample data - replace with actual data from your backend
    const tripsData = {
        activeTrips: [
            {
                id: 1,
                name: 'Kandy City Explorer',
                duration: '2 Days',
                price: 25000,
                status: 'active',
                bookings: 12,
                rating: 4.8
            },
            {
                id: 2,
                name: 'Galle Fort Adventure',
                duration: '3 Days',
                price: 35000,
                status: 'active',
                bookings: 8,
                rating: 4.7
            }
        ],
        draftTrips: [
            {
                id: 3,
                name: 'Hill Country Tour',
                duration: '4 Days',
                price: 45000,
                status: 'draft',
                lastEdited: '2025-07-15'
            }
        ]
    }

    const formatCurrency = (amount) => {
        return `Rs. ${amount.toLocaleString()}`
    }

    return (
        <PartnerLayout>
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <Title text="Trip Planner" />
                    <PrimaryButton
                        text="Create New Trip"
                        onClick={() => setShowAddTripModal(true)}
                    />
                </div>

                {/* Tabs */}
                <div className="mb-6">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8">
                            <button
                                onClick={() => setActiveTab('my-trips')}
                                className={`${
                                    activeTab === 'my-trips'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                            >
                                My Trips
                            </button>
                            <button
                                onClick={() => setActiveTab('drafts')}
                                className={`${
                                    activeTab === 'drafts'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                            >
                                Drafts
                            </button>
                            <button
                                onClick={() => setActiveTab('templates')}
                                className={`${
                                    activeTab === 'templates'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                            >
                                Templates
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Active Trips Table */}
                {activeTab === 'my-trips' && (
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Trip Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Duration
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Price
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Bookings
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Rating
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {tripsData.activeTrips.map((trip) => (
                                    <tr key={trip.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {trip.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {trip.duration}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {formatCurrency(trip.price)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {trip.bookings}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            ⭐ {trip.rating}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <StatusBadge
                                                status={trip.status}
                                                colorMap={{
                                                    active: 'green',
                                                    draft: 'yellow'
                                                }}
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <button className="text-blue-600 hover:text-blue-800 mr-3">
                                                Edit
                                            </button>
                                            <button className="text-red-600 hover:text-red-800">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Drafts Table */}
                {activeTab === 'drafts' && (
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Trip Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Duration
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Price
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Last Edited
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {tripsData.draftTrips.map((trip) => (
                                    <tr key={trip.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {trip.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {trip.duration}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {formatCurrency(trip.price)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {trip.lastEdited}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <button className="text-blue-600 hover:text-blue-800 mr-3">
                                                Edit
                                            </button>
                                            <button className="text-green-600 hover:text-green-800 mr-3">
                                                Publish
                                            </button>
                                            <button className="text-red-600 hover:text-red-800">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Templates Tab */}
                {activeTab === 'templates' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Template Cards */}
                        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
                            <h3 className="text-lg font-medium text-gray-900 mb-2">City Explorer</h3>
                            <p className="text-gray-500 text-sm mb-4">
                                Perfect for urban adventures and city tours
                            </p>
                            <ul className="text-sm text-gray-600 mb-4">
                                <li>• City sightseeing</li>
                                <li>• Cultural activities</li>
                                <li>• Local cuisine experience</li>
                            </ul>
                            <button className="w-full bg-blue-50 text-blue-600 py-2 px-4 rounded-md hover:bg-blue-100">
                                Use Template
                            </button>
                        </div>

                        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Beach Getaway</h3>
                            <p className="text-gray-500 text-sm mb-4">
                                Ideal for coastal adventures and beach activities
                            </p>
                            <ul className="text-sm text-gray-600 mb-4">
                                <li>• Beach activities</li>
                                <li>• Water sports</li>
                                <li>• Sunset cruises</li>
                            </ul>
                            <button className="w-full bg-blue-50 text-blue-600 py-2 px-4 rounded-md hover:bg-blue-100">
                                Use Template
                            </button>
                        </div>

                        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Adventure Trek</h3>
                            <p className="text-gray-500 text-sm mb-4">
                                For nature lovers and adventure seekers
                            </p>
                            <ul className="text-sm text-gray-600 mb-4">
                                <li>• Hiking trails</li>
                                <li>• Camping spots</li>
                                <li>• Nature activities</li>
                            </ul>
                            <button className="w-full bg-blue-50 text-blue-600 py-2 px-4 rounded-md hover:bg-blue-100">
                                Use Template
                            </button>
                        </div>
                    </div>
                )}

                {/* Add New Trip Modal */}
                {showAddTripModal && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white rounded-lg p-8 w-full max-w-2xl">
                            <h2 className="text-2xl font-bold mb-6">Create New Trip</h2>
                            <form className="space-y-6">
                                <InputField
                                    label="Trip Name"
                                    placeholder="Enter trip name"
                                    type="text"
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <InputField
                                        label="Duration"
                                        placeholder="e.g., 3 Days"
                                        type="text"
                                    />
                                    <InputField
                                        label="Price"
                                        placeholder="Enter price"
                                        type="number"
                                    />
                                </div>
                                <InputArea
                                    label="Description"
                                    placeholder="Enter trip description"
                                    rows={4}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <InputField
                                        label="Start Location"
                                        placeholder="Enter start location"
                                        type="text"
                                    />
                                    <InputField
                                        label="End Location"
                                        placeholder="Enter end location"
                                        type="text"
                                    />
                                </div>
                                <div className="flex justify-end space-x-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowAddTripModal(false)}
                                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <PrimaryButton text="Create Trip" type="submit" />
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </PartnerLayout>
    )
}
