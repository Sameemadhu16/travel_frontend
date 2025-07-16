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
                        
                        {/* South Asian Countries */}
                        <optgroup label="South Asia">
                            <option value="sri-lanka">🇱🇰 Sri Lanka</option>
                            <option value="india">🇮🇳 India</option>
                            <option value="maldives">🇲🇻 Maldives</option>
                            <option value="bangladesh">🇧🇩 Bangladesh</option>
                            <option value="pakistan">🇵🇰 Pakistan</option>
                            <option value="nepal">🇳🇵 Nepal</option>
                            <option value="bhutan">🇧🇹 Bhutan</option>
                        </optgroup>

                        {/* Popular Tourist Countries */}
                        <optgroup label="Popular Destinations">
                            <option value="usa">🇺🇸 United States</option>
                            <option value="uk">🇬🇧 United Kingdom</option>
                            <option value="canada">🇨🇦 Canada</option>
                            <option value="australia">🇦🇺 Australia</option>
                            <option value="new-zealand">🇳🇿 New Zealand</option>
                            <option value="germany">🇩🇪 Germany</option>
                            <option value="france">🇫🇷 France</option>
                            <option value="netherlands">🇳🇱 Netherlands</option>
                            <option value="sweden">🇸🇪 Sweden</option>
                            <option value="norway">🇳🇴 Norway</option>
                            <option value="denmark">🇩🇰 Denmark</option>
                            <option value="switzerland">🇨🇭 Switzerland</option>
                        </optgroup>

                        {/* Southeast Asia */}
                        <optgroup label="Southeast Asia">
                            <option value="thailand">🇹🇭 Thailand</option>
                            <option value="singapore">🇸🇬 Singapore</option>
                            <option value="malaysia">🇲🇾 Malaysia</option>
                            <option value="indonesia">🇮🇩 Indonesia</option>
                            <option value="philippines">🇵🇭 Philippines</option>
                            <option value="vietnam">🇻🇳 Vietnam</option>
                            <option value="myanmar">🇲🇲 Myanmar</option>
                            <option value="cambodia">🇰🇭 Cambodia</option>
                            <option value="laos">🇱🇦 Laos</option>
                            <option value="brunei">🇧🇳 Brunei</option>
                        </optgroup>

                        {/* East Asia */}
                        <optgroup label="East Asia">
                            <option value="china">🇨🇳 China</option>
                            <option value="japan">🇯🇵 Japan</option>
                            <option value="south-korea">🇰🇷 South Korea</option>
                            <option value="taiwan">🇹🇼 Taiwan</option>
                            <option value="hong-kong">🇭🇰 Hong Kong</option>
                            <option value="macau">🇲🇴 Macau</option>
                        </optgroup>

                        {/* Middle East */}
                        <optgroup label="Middle East">
                            <option value="uae">🇦🇪 United Arab Emirates</option>
                            <option value="saudi-arabia">🇸🇦 Saudi Arabia</option>
                            <option value="qatar">🇶🇦 Qatar</option>
                            <option value="kuwait">🇰🇼 Kuwait</option>
                            <option value="oman">🇴🇲 Oman</option>
                            <option value="bahrain">🇧🇭 Bahrain</option>
                            <option value="israel">🇮🇱 Israel</option>
                            <option value="jordan">🇯🇴 Jordan</option>
                            <option value="lebanon">🇱🇧 Lebanon</option>
                        </optgroup>

                        {/* Africa */}
                        <optgroup label="Africa">
                            <option value="south-africa">🇿🇦 South Africa</option>
                            <option value="egypt">🇪🇬 Egypt</option>
                            <option value="morocco">🇲🇦 Morocco</option>
                            <option value="kenya">🇰🇪 Kenya</option>
                            <option value="tanzania">🇹🇿 Tanzania</option>
                            <option value="nigeria">🇳🇬 Nigeria</option>
                            <option value="ghana">🇬🇭 Ghana</option>
                            <option value="ethiopia">🇪🇹 Ethiopia</option>
                        </optgroup>

                        {/* Others */}
                        <optgroup label="Other Countries">
                            <option value="brazil">🇧🇷 Brazil</option>
                            <option value="argentina">🇦🇷 Argentina</option>
                            <option value="mexico">🇲🇽 Mexico</option>
                            <option value="chile">🇨🇱 Chile</option>
                            <option value="russia">🇷🇺 Russia</option>
                            <option value="italy">🇮🇹 Italy</option>
                            <option value="spain">🇪🇸 Spain</option>
                            <option value="portugal">🇵🇹 Portugal</option>
                            <option value="austria">🇦🇹 Austria</option>
                            <option value="belgium">🇧🇪 Belgium</option>
                            <option value="poland">🇵🇱 Poland</option>
                            <option value="czech-republic">🇨🇿 Czech Republic</option>
                            <option value="other">🌍 Other</option>
                        </optgroup>
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
            
            {/* Additional Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-semibold mb-1">
                        Age Group
                    </label>
                    <select
                        name="ageGroup"
                        value={contactInfo.ageGroup || ''}
                        onChange={handleInputChange}
                        className="w-full border border-border-light rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all bg-white"
                    >
                        <option value="">Select age group</option>
                        <option value="18-25">👨‍🎓 18-25 years</option>
                        <option value="26-35">👨‍💼 26-35 years</option>
                        <option value="36-45">👨‍👩‍👧 36-45 years</option>
                        <option value="46-55">👨‍🦳 46-55 years</option>
                        <option value="56-65">👴 56-65 years</option>
                        <option value="65+">👵 65+ years</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-1">
                        Occupation
                    </label>
                    <select
                        name="occupation"
                        value={contactInfo.occupation || ''}
                        onChange={handleInputChange}
                        className="w-full border border-border-light rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all bg-white"
                    >
                        <option value="">Select occupation</option>
                        <option value="student">👨‍🎓 Student</option>
                        <option value="teacher">👨‍🏫 Teacher/Educator</option>
                        <option value="engineer">👨‍💻 Engineer/IT Professional</option>
                        <option value="doctor">👨‍⚕️ Doctor/Healthcare</option>
                        <option value="business">👨‍💼 Business Professional</option>
                        <option value="government">🏛️ Government Employee</option>
                        <option value="retired">👴 Retired</option>
                        <option value="freelancer">💼 Freelancer</option>
                        <option value="artist">🎨 Artist/Creative</option>
                        <option value="other">🔧 Other</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-semibold mb-1">
                        Travel Experience
                    </label>
                    <select
                        name="travelExperience"
                        value={contactInfo.travelExperience || ''}
                        onChange={handleInputChange}
                        className="w-full border border-border-light rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all bg-white"
                    >
                        <option value="">Select travel experience</option>
                        <option value="first-time">🆕 First time to Sri Lanka</option>
                        <option value="second-visit">🔄 Second visit to Sri Lanka</option>
                        <option value="frequent">✈️ Frequent visitor</option>
                        <option value="experienced">🌍 Experienced international traveler</option>
                        <option value="backpacker">🎒 Backpacking experience</option>
                        <option value="luxury">💎 Luxury travel experience</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-1">
                        How did you hear about us?
                    </label>
                    <select
                        name="referralSource"
                        value={contactInfo.referralSource || ''}
                        onChange={handleInputChange}
                        className="w-full border border-border-light rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all bg-white"
                    >
                        <option value="">Select source</option>
                        <option value="google">🔍 Google Search</option>
                        <option value="social-media">📱 Social Media</option>
                        <option value="friend">👥 Friend/Family Recommendation</option>
                        <option value="travel-agent">🏢 Travel Agent</option>
                        <option value="hotel">🏨 Hotel Recommendation</option>
                        <option value="online-review">⭐ Online Reviews</option>
                        <option value="repeat-customer">🔄 Previous Customer</option>
                        <option value="other">📝 Other</option>
                    </select>
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
