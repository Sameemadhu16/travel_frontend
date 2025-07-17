import React, { useContext } from 'react';
import { useTourContext } from '../../../context/TourContext';
import { useNavigate } from 'react-router-dom';
import FormContext from '../../../context/InitialValues';

export default function ContactSummary() {
    const navigate = useNavigate();
    const { formData, setFormData } = useContext(FormContext);
    const contactInfo = formData.travelDetails;

    // Handle edit button click
    const handleEdit = () => {
        navigate('/tour/create-tour');
    };

    // Format country display
    const formatCountry = (country) => {
        if (!country) return 'Not specified';
        return country.replace(/^\w/, c => c.toUpperCase()).replace(/-/g, ' ');
    };

    // Format display values
    const formatDisplayValue = (value) => {
        if (!value) return 'Not specified';
        return value.replace(/^\w/, c => c.toUpperCase()).replace(/-/g, ' ');
    };

    return (
        <div className="bg-white rounded-lg border border-brand-primary p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-content-primary">Contact Information</h2>
                <button 
                    onClick={handleEdit}
                    className="text-brand-primary text-sm font-medium hover:underline flex items-center gap-1"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                    Edit
                </button>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
                <div>
                    <h3 className="text-sm font-medium text-content-secondary mb-2">Full Name</h3>
                    <p className="text-content-primary font-medium">{contactInfo.fullName || 'Not provided'}</p>
                </div>
                <div>
                    <h3 className="text-sm font-medium text-content-secondary mb-2">Email</h3>
                    <p className="text-content-primary font-medium">{contactInfo.email || 'Not provided'}</p>
                </div>
                <div>
                    <h3 className="text-sm font-medium text-content-secondary mb-2">Phone</h3>
                    <p className="text-content-primary font-medium">{contactInfo.phone || 'Not provided'}</p>
                </div>
                <div>
                    <h3 className="text-sm font-medium text-content-secondary mb-2">Country</h3>
                    <p className="text-content-primary font-medium">{formatCountry(contactInfo.country)}</p>
                </div>
                {contactInfo.ageGroup && (
                    <div>
                        <h3 className="text-sm font-medium text-content-secondary mb-2">Age Group</h3>
                        <p className="text-content-primary font-medium">{formatDisplayValue(contactInfo.ageGroup)}</p>
                    </div>
                )}
                {contactInfo.occupation && (
                    <div>
                        <h3 className="text-sm font-medium text-content-secondary mb-2">Occupation</h3>
                        <p className="text-content-primary font-medium">{formatDisplayValue(contactInfo.occupation)}</p>
                    </div>
                )}
            </div>

            {/* Additional Information */}
            {(contactInfo.travelExperience || contactInfo.referralSource) && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-2 gap-6">
                        {contactInfo.travelExperience && (
                            <div>
                                <h3 className="text-sm font-medium text-content-secondary mb-2">Travel Experience</h3>
                                <p className="text-content-primary font-medium">{formatDisplayValue(contactInfo.travelExperience)}</p>
                            </div>
                        )}
                        {contactInfo.referralSource && (
                            <div>
                                <h3 className="text-sm font-medium text-content-secondary mb-2">How They Found Us</h3>
                                <p className="text-content-primary font-medium">{formatDisplayValue(contactInfo.referralSource)}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Emergency Contact */}
            {contactInfo.optionalContact && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                    <h3 className="text-sm font-medium text-content-secondary mb-2">Emergency Contact</h3>
                    <p className="text-content-primary font-medium">{contactInfo.optionalContact}</p>
                </div>
            )}

            {/* Special Requests */}
            {contactInfo.specialRequests && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                    <h3 className="text-sm font-medium text-content-secondary mb-2">Special Requests</h3>
                    <p className="text-content-primary">{contactInfo.specialRequests}</p>
                </div>
            )}
        </div>
    );
}
