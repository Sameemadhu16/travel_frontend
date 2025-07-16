import React, { useState } from 'react';
import { useTourContext } from '../../../context/TourContext';

export default function ContactInformation() {
    const { 
        contactInfo, 
        updateContactInfo, 
        errors: contextErrors, 
        touched: contextTouched,
        setFieldError,
        clearFieldError,
        setFieldTouched
    } = useTourContext();

    const [localErrors, setLocalErrors] = useState({});
    const [localTouched, setLocalTouched] = useState({});

    // Use context errors and touched, fallback to local state
    const errors = { ...localErrors, ...contextErrors };
    const touched = { ...localTouched, ...contextTouched };

    const validateField = (name, value) => {
        let error = '';
        
        switch (name) {
            case 'fullName':
                if (!value.trim()) {
                    error = 'Full name is required';
                } else if (value.trim().length < 2) {
                    error = 'Name must be at least 2 characters';
                } else if (!/^[a-zA-Z\s]+$/.test(value)) {
                    error = 'Name can only contain letters and spaces';
                }
                break;
                
            case 'email':
                if (!value.trim()) {
                    error = 'Email is required';
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    error = 'Please enter a valid email address';
                }
                break;
                
            case 'phone':
                if (!value.trim()) {
                    error = 'Phone number is required';
                } else if (!/^\+?[\d\s-()]{10,15}$/.test(value.replace(/\s/g, ''))) {
                    error = 'Please enter a valid phone number';
                }
                break;
                
            case 'country':
                if (!value) {
                    error = 'Please select your country';
                }
                break;
                
            case 'nicNumber':
                if (!value.trim()) {
                    error = 'NIC number is required';
                } else if (!/^(\d{9}[vVxX]|\d{12})$/.test(value.replace(/\s/g, ''))) {
                    error = 'Please enter a valid NIC number (e.g., 123456789V or 199812345678)';
                }
                break;
                
            case 'optionalContact':
                if (value && !/^\+?[\d\s-()]{10,15}$/.test(value.replace(/\s/g, ''))) {
                    error = 'Please enter a valid phone number';
                }
                break;
        }
        
        return error;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        updateContactInfo({ [name]: value });

        // Validate field on change if it has been touched
        if (touched[name]) {
            const error = validateField(name, value);
            setFieldError(name, error);
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setFieldTouched(name, true);

        const error = validateField(name, value);
        setFieldError(name, error);
    };

    const isFormValid = () => {
        const requiredFields = ['fullName', 'email', 'phone', 'country', 'nicNumber'];
        return requiredFields.every(field => {
            const error = validateField(field, contactInfo[field]);
            return !error && contactInfo[field] && contactInfo[field].trim();
        });
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
                    <label className="block text-sm font-semibold mb-1">
                        Full Name <span className="text-red-500">*</span>
                    </label>
                    <input 
                        type="text"
                        name="fullName"
                        value={contactInfo.fullName}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none transition-all ${
                            errors.fullName ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' : 
                            'border-border-light focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20'
                        }`}
                        placeholder="John Doe" 
                        required
                    />
                    {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-1">
                        Email Address <span className="text-red-500">*</span>
                    </label>
                    <input 
                        type="email"
                        name="email"
                        value={contactInfo.email}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none transition-all ${
                            errors.email ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' : 
                            'border-border-light focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20'
                        }`}
                        placeholder="john.doe@example.com" 
                        required
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-semibold mb-1">
                        Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input 
                        type="tel"
                        name="phone"
                        value={contactInfo.phone}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none transition-all ${
                            errors.phone ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' : 
                            'border-border-light focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20'
                        }`}
                        placeholder="+94 71 234 5678" 
                        required
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-1">
                        Country <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="country"
                        value={contactInfo.country}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none transition-all bg-white ${
                            errors.country ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' : 
                            'border-border-light focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20'
                        }`}
                        required
                    >
                        <option value="">Select your country</option>
                        <option value="sri-lanka">Sri Lanka</option>
                        <option value="india">India</option>
                        <option value="maldives">Maldives</option>
                        <option value="usa">United States</option>
                        <option value="uk">United Kingdom</option>
                        <option value="australia">Australia</option>
                        <option value="other">Other</option>
                    </select>
                    {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-semibold mb-1">
                        NIC Number <span className="text-red-500">*</span>
                    </label>
                    <input 
                        type="text"
                        name="nicNumber"
                        value={contactInfo.nicNumber}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none transition-all ${
                            errors.nicNumber ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' : 
                            'border-border-light focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20'
                        }`}
                        placeholder="123456789V or 199812345678" 
                        required
                    />
                    {errors.nicNumber ? (
                        <p className="text-red-500 text-xs mt-1">{errors.nicNumber}</p>
                    ) : (
                        <p className="text-xs text-gray-500 mt-1">Enter your National Identity Card number</p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Emergency Contact
                        <span className="text-xs text-gray-500 ml-1">(Optional)</span>
                    </label>
                    <input 
                        type="tel"
                        name="optionalContact"
                        value={contactInfo.optionalContact}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none transition-all ${
                            errors.optionalContact ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' : 
                            'border-border-light focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20'
                        }`}
                        placeholder="+94 77 987 6543" 
                    />
                    {errors.optionalContact ? (
                        <p className="text-red-500 text-xs mt-1">{errors.optionalContact}</p>
                    ) : (
                        <p className="text-xs text-gray-500 mt-1">Alternative contact for emergencies</p>
                    )}
                </div>
            </div>
            <div>
                <label className="block text-sm font-semibold mb-1">Special Requests</label>
                <textarea 
                    name="specialRequests"
                    value={contactInfo.specialRequests}
                    onChange={handleInputChange}
                    className="w-full border border-border-light rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all resize-none" 
                    placeholder="Tell us about any dietary restrictions, accessibility needs, special celebrations, or other requirements..."
                    rows="4"
                />
                <p className="text-xs text-gray-500 mt-1">Help us make your tour perfect by sharing any special needs or preferences</p>
            </div>
            
            {/* Form validation status */}
            <div className="mt-4 p-3 rounded-lg bg-gray-50">
                <div className="flex items-center gap-2">
                    {isFormValid() ? (
                        <>
                            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                            </svg>
                            <span className="text-green-700 text-sm font-medium">All required fields are completed</span>
                        </>
                    ) : (
                        <>
                            <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                            </svg>
                            <span className="text-orange-700 text-sm font-medium">Please complete all required fields</span>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}
