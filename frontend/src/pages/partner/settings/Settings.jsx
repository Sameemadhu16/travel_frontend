import React, { useState } from 'react'
import PartnerLayout from '../../../components/partner/PartnerLayout'
import Title from '../../../components/Title'
import InputField from '../../../components/InputField'
import PrimaryButton from '../../../components/PrimaryButton'
import ImageUploader from '../../../components/ImageUploader'

export default function Settings() {
    const [activeTab, setActiveTab] = useState('profile')

    // Sample user data - replace with actual data from your backend
    const [userData, setUserData] = useState({
        profile: {
            name: 'John Doe',
            email: 'john.doe@example.com',
            phone: '+94 71 234 5678',
            address: 'No 123, Sample Street, Colombo',
            businessName: 'JD Tours & Travels',
            businessRegNo: 'BRN123456',
            profileImage: '/path/to/profile.jpg'
        },
        notifications: {
            emailNotifications: true,
            bookingAlerts: true,
            marketingEmails: false,
            smsNotifications: true,
            newReviewAlerts: true
        },
        security: {
            twoFactorAuth: false,
            lastPasswordChange: '2025-06-15',
            loginAlerts: true
        }
    })

    const handleNotificationToggle = (setting) => {
        setUserData(prev => ({
            ...prev,
            notifications: {
                ...prev.notifications,
                [setting]: !prev.notifications[setting]
            }
        }))
    }

    const handleSecurityToggle = (setting) => {
        setUserData(prev => ({
            ...prev,
            security: {
                ...prev.security,
                [setting]: !prev.security[setting]
            }
        }))
    }

    return (
        <PartnerLayout>
            <div className="p-6">
                <Title text="Settings" />

                {/* Settings Navigation */}
                <div className="flex mt-6 border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8">
                        {['profile', 'notifications', 'security', 'billing'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`${
                                    activeTab === tab
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize`}
                            >
                                {tab}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Profile Settings */}
                {activeTab === 'profile' && (
                    <div className="mt-6 bg-white shadow rounded-lg">
                        <div className="p-6">
                            <h2 className="text-xl font-medium text-gray-900 mb-6">Profile Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="col-span-2">
                                    <div className="flex items-center space-x-6">
                                        <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-100">
                                            <img
                                                src={userData.profile.profileImage}
                                                alt="Profile"
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <ImageUploader />
                                    </div>
                                </div>
                                <InputField
                                    label="Full Name"
                                    value={userData.profile.name}
                                    placeholder="Enter your full name"
                                />
                                <InputField
                                    label="Email"
                                    value={userData.profile.email}
                                    type="email"
                                    placeholder="Enter your email"
                                />
                                <InputField
                                    label="Phone Number"
                                    value={userData.profile.phone}
                                    placeholder="Enter your phone number"
                                />
                                <InputField
                                    label="Address"
                                    value={userData.profile.address}
                                    placeholder="Enter your address"
                                />
                                <InputField
                                    label="Business Name"
                                    value={userData.profile.businessName}
                                    placeholder="Enter your business name"
                                />
                                <InputField
                                    label="Business Registration Number"
                                    value={userData.profile.businessRegNo}
                                    placeholder="Enter business registration number"
                                />
                                <div className="col-span-2">
                                    <PrimaryButton text="Save Changes" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Notification Settings */}
                {activeTab === 'notifications' && (
                    <div className="mt-6 bg-white shadow rounded-lg">
                        <div className="p-6">
                            <h2 className="text-xl font-medium text-gray-900 mb-6">Notification Preferences</h2>
                            <div className="space-y-6">
                                {Object.entries(userData.notifications).map(([key, value]) => (
                                    <div key={key} className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-900 capitalize">
                                                {key.replace(/([A-Z])/g, ' $1').trim()}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {`Receive ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => handleNotificationToggle(key)}
                                            className={`${
                                                value ? 'bg-blue-600' : 'bg-gray-200'
                                            } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out`}
                                        >
                                            <span
                                                className={`${
                                                    value ? 'translate-x-6' : 'translate-x-1'
                                                } inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out mt-1`}
                                            />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Security Settings */}
                {activeTab === 'security' && (
                    <div className="mt-6 bg-white shadow rounded-lg">
                        <div className="p-6">
                            <h2 className="text-xl font-medium text-gray-900 mb-6">Security Settings</h2>
                            <div className="space-y-6">
                                <div className="pb-6 border-b border-gray-200">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
                                    <div className="grid grid-cols-1 gap-4">
                                        <InputField
                                            label="Current Password"
                                            type="password"
                                            placeholder="Enter current password"
                                        />
                                        <InputField
                                            label="New Password"
                                            type="password"
                                            placeholder="Enter new password"
                                        />
                                        <InputField
                                            label="Confirm New Password"
                                            type="password"
                                            placeholder="Confirm new password"
                                        />
                                        <div>
                                            <PrimaryButton text="Update Password" />
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="space-y-6">
                                    {Object.entries(userData.security).map(([key, value]) => (
                                        key !== 'lastPasswordChange' && (
                                            <div key={key} className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="text-sm font-medium text-gray-900 capitalize">
                                                        {key.replace(/([A-Z])/g, ' $1').trim()}
                                                    </h3>
                                                    <p className="text-sm text-gray-500">
                                                        {`Enable ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => handleSecurityToggle(key)}
                                                    className={`${
                                                        value ? 'bg-blue-600' : 'bg-gray-200'
                                                    } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out`}
                                                >
                                                    <span
                                                        className={`${
                                                            value ? 'translate-x-6' : 'translate-x-1'
                                                        } inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out mt-1`}
                                                    />
                                                </button>
                                            </div>
                                        )
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Billing Settings */}
                {activeTab === 'billing' && (
                    <div className="mt-6 bg-white shadow rounded-lg">
                        <div className="p-6">
                            <h2 className="text-xl font-medium text-gray-900 mb-6">Billing Information</h2>
                            <div className="space-y-6">
                                <div className="pb-6 border-b border-gray-200">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h3>
                                    <div className="grid grid-cols-1 gap-4">
                                        <InputField
                                            label="Bank Name"
                                            placeholder="Enter bank name"
                                        />
                                        <InputField
                                            label="Account Number"
                                            placeholder="Enter account number"
                                        />
                                        <InputField
                                            label="Account Holder Name"
                                            placeholder="Enter account holder name"
                                        />
                                        <InputField
                                            label="Branch"
                                            placeholder="Enter branch name"
                                        />
                                        <div>
                                            <PrimaryButton text="Save Payment Information" />
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="pt-4">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Billing Address</h3>
                                    <div className="grid grid-cols-1 gap-4">
                                        <InputField
                                            label="Address Line 1"
                                            placeholder="Enter street address"
                                        />
                                        <InputField
                                            label="Address Line 2"
                                            placeholder="Enter apartment, suite, etc."
                                        />
                                        <div className="grid grid-cols-2 gap-4">
                                            <InputField
                                                label="City"
                                                placeholder="Enter city"
                                            />
                                            <InputField
                                                label="Postal Code"
                                                placeholder="Enter postal code"
                                            />
                                        </div>
                                        <div>
                                            <PrimaryButton text="Save Billing Address" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </PartnerLayout>
    )
}
