import React, { useState } from 'react';

export default function BillingAddress() {
    const [billingData, setBillingData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'Sri Lanka'
    });

    const handleInputChange = (field, value) => {
        setBillingData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <div className="bg-surface-primary rounded-lg p-6 border border-brand-primary">
            <h3 className="text-lg font-semibold text-content-primary mb-4">Billing Address</h3>
            
            <div className="space-y-4">
                {/* First Name and Last Name */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-content-secondary mb-2">
                            First Name
                        </label>
                        <input
                            type="text"
                            value={billingData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            className="w-full px-4 py-3 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary text-content-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-content-secondary mb-2">
                            Last Name
                        </label>
                        <input
                            type="text"
                            value={billingData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            className="w-full px-4 py-3 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary text-content-primary"
                        />
                    </div>
                </div>

                {/* Email and Phone */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-content-secondary mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={billingData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="w-full px-4 py-3 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary text-content-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-content-secondary mb-2">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            value={billingData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className="w-full px-4 py-3 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary text-content-primary"
                        />
                    </div>
                </div>

                {/* Address */}
                <div>
                    <label className="block text-sm font-medium text-content-secondary mb-2">
                        Address
                    </label>
                    <input
                        type="text"
                        value={billingData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="w-full px-4 py-3 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary text-content-primary"
                    />
                </div>

                {/* City, State, ZIP Code */}
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-content-secondary mb-2">
                            City
                        </label>
                        <input
                            type="text"
                            value={billingData.city}
                            onChange={(e) => handleInputChange('city', e.target.value)}
                            className="w-full px-4 py-3 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary text-content-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-content-secondary mb-2">
                            State
                        </label>
                        <input
                            type="text"
                            value={billingData.state}
                            onChange={(e) => handleInputChange('state', e.target.value)}
                            className="w-full px-4 py-3 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary text-content-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-content-secondary mb-2">
                            ZIP Code
                        </label>
                        <input
                            type="text"
                            value={billingData.zipCode}
                            onChange={(e) => handleInputChange('zipCode', e.target.value)}
                            className="w-full px-4 py-3 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary text-content-primary"
                        />
                    </div>
                </div>

                {/* Country */}
                <div>
                    <label className="block text-sm font-medium text-content-secondary mb-2">
                        Country
                    </label>
                    <select
                        value={billingData.country}
                        onChange={(e) => handleInputChange('country', e.target.value)}
                        className="w-full px-4 py-3 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary text-content-primary"
                    >
                        <option value="Sri Lanka">Sri Lanka</option>
                        <option value="India">India</option>
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                        <option value="Canada">Canada</option>
                        <option value="Germany">Germany</option>
                        <option value="France">France</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
