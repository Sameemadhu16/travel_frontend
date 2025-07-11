import React, { useState } from 'react';

export default function ContactInformation() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        country: '',
        specialRequests: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <section className="bg-white rounded-xl shadow p-6 border border-brand-accent border-l-4 border-l-brand-primary">
            <div className="flex items-center gap-2 mb-4">
                <span className="bg-brand-primary text-white px-3 py-1 rounded font-semibold flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                    </svg>
                    Contact Information
                </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-semibold mb-1">Full Name</label>
                    <input 
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full border border-border-light rounded px-3 py-2 text-sm focus:outline-none focus:border-brand-primary" 
                        placeholder="Enter your name" 
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-1">Email Address</label>
                    <input 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full border border-border-light rounded px-3 py-2 text-sm focus:outline-none focus:border-brand-primary" 
                        placeholder="Enter your email" 
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-semibold mb-1">Phone Number</label>
                    <input 
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full border border-border-light rounded px-3 py-2 text-sm focus:outline-none focus:border-brand-primary" 
                        placeholder="Enter your phone" 
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-1">Country</label>
                    <input 
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full border border-border-light rounded px-3 py-2 text-sm focus:outline-none focus:border-brand-primary" 
                        placeholder="Enter your country" 
                    />
                </div>
            </div>
            <div>
                <label className="block text-sm font-semibold mb-1">Special Requests</label>
                <textarea 
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    className="w-full border border-border-light rounded px-3 py-2 text-sm focus:outline-none focus:border-brand-primary" 
                    placeholder="Any special requirements or requests for your tour..."
                    rows="4"
                />
            </div>
        </section>
    );
}
