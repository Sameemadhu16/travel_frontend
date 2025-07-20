import React from 'react';
import Main from '../../../components/Main';
import Title from '../../../components/Title';
import PrimaryButton from '../../../components/PrimaryButton';
import { navigateTo } from '../../../core/navigateHelper';
import SecondaryButton from '../../../components/SecondaryButton';
import { Link } from 'react-router-dom';

export default function GuidePending() {
    const handleGoHome = () => {
        navigateTo('/');
    };

    const handleCheckStatus = () => {
        navigateTo('/guide-profile');
    };

    return (
        <Main>
            <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
                {/* Success Icon */}
                <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-12 h-12 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                    </svg>
                </div>

                {/* Main Title */}
                <Title 
                    title="Registration Under Review" 
                    size="text-[36px]" 
                    font="font-[600]" 
                />

                {/* Status Message */}
                <div className="text-center max-w-2xl mb-8">
                    <p className="text-lg text-gray-700 mb-4">
                        Thank you for registering as a tour guide! Your application has been successfully submitted and is currently under admin review.
                    </p>
                    <p className="text-md text-gray-600">
                        Our team will carefully review your credentials, SLTA license, and submitted documents. You will be notified via email once your application has been approved.
                    </p>
                </div>

                {/* Status Cards */}
                <div className="grid md:grid-cols-3 gap-6 w-full max-w-4xl mb-8">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                            </svg>
                        </div>
                        <h3 className="font-semibold text-green-800 mb-2">Application Submitted</h3>
                        <p className="text-sm text-green-700">Your registration form has been successfully received</p>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                        <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                            </svg>
                        </div>
                        <h3 className="font-semibold text-yellow-800 mb-2">Under Review</h3>
                        <p className="text-sm text-yellow-700">Admin is currently reviewing your credentials and documents</p>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                            </svg>
                        </div>
                        <h3 className="font-semibold text-gray-600 mb-2">Pending Approval</h3>
                        <p className="text-sm text-gray-600">You'll receive confirmation once approved</p>
                    </div>
                </div>

                {/* What's Next Section */}
                <div className="bg-brand-light border border-brand-accent rounded-lg p-6 w-full max-w-4xl mb-8">
                    <h3 className="text-lg font-semibold text-content-primary mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                        </svg>
                        What happens next?
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <h4 className="font-semibold text-content-primary mb-2">📋 Document Verification</h4>
                            <p className="text-content-secondary">Our team will verify your SLTA license, NIC, and other submitted documents for authenticity.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-content-primary mb-2">✅ Profile Review</h4>
                            <p className="text-content-secondary">Your bio, specializations, and experience will be reviewed to ensure quality standards.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-content-primary mb-2">📧 Email Notification</h4>
                            <p className="text-content-secondary">You'll receive an email notification once your application is approved or if additional information is needed.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-content-primary mb-2">🚀 Start Guiding</h4>
                            <p className="text-content-secondary">Once approved, you can start receiving tour requests and building your guide profile.</p>
                        </div>
                    </div>
                </div>

                {/* Estimated Timeline */}
                <div className="bg-surface-secondary border border-border-light rounded-lg p-4 w-full max-w-2xl mb-8 text-center">
                    <h4 className="font-semibold text-content-primary mb-2">⏰ Estimated Review Time</h4>
                    <p className="text-content-secondary">Applications are typically reviewed within <span className="font-semibold text-brand-primary">2-3 business days</span></p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <div className="h-10">
                        <PrimaryButton text='Check Status' onClick={handleCheckStatus} />
                    </div>
                    <div className="h-10">
                        <SecondaryButton text='Return Home' onClick={handleGoHome} />
                    </div>
                </div>

                {/* Contact Info */}
                <div className="mt-8 text-center text-sm text-content-secondary">
                    <p>Need help? Contact our support team at 
                        <Link to="/chat-bot" className="text-brand-primary hover:underline ml-1">
                            support@travel.lk
                        </Link>
                    </p>
                </div>
            </div>
        </Main>
    );
}
