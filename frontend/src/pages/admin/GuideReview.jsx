import React, { useState, useEffect } from 'react';
import Main from '../../components/Main';
import Title from '../../components/Title';
import PrimaryButton from '../../components/PrimaryButton';
import { postRequest, getRequest } from '../../core/service';
import { showToastMessage } from '../../utils/toastHelper';
import Spinner from '../../components/Spinner';

export default function AdminGuideReview() {
    const [pendingGuides, setPendingGuides] = useState([]);
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState({});

    useEffect(() => {
        fetchPendingGuides();
    }, []);

    const fetchPendingGuides = async () => {
        try {
            setLoading(true);
            const response = await getRequest('/api/admin/guides/pending');
            setPendingGuides(response.data || []);
        } catch (error) {
            console.error('Error fetching pending guides:', error);
            showToastMessage('error', 'Failed to load pending guides');
        } finally {
            setLoading(false);
        }
    };

    const handleApproval = async (guideId, action) => {
        try {
            setActionLoading(prev => ({ ...prev, [guideId]: true }));
            
            await postRequest(`/api/admin/guides/${guideId}/${action}`, {});
            
            showToastMessage('success', `Guide ${action === 'approve' ? 'approved' : 'rejected'} successfully!`);
            
            // Remove the guide from pending list
            setPendingGuides(prev => prev.filter(guide => guide.id !== guideId));
            
        } catch (error) {
            console.error(`Error ${action}ing guide:`, error);
            showToastMessage('error', `Failed to ${action} guide`);
        } finally {
            setActionLoading(prev => ({ ...prev, [guideId]: false }));
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <Main>
                <div className="flex justify-center items-center min-h-[400px]">
                    <Spinner />
                </div>
            </Main>
        );
    }

    return (
        <Main>
            <div className="container mx-auto px-4">
                <Title title="Guide Registration Review" size="text-[36px]" font="font-[600]" />
                
                {pendingGuides.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Pending Applications</h3>
                        <p className="text-gray-600">All guide registrations have been reviewed.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {pendingGuides.map((guide) => (
                            <div key={guide.id} className="bg-white border border-gray-200 rounded-lg p-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Basic Info */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                            {guide.user?.firstName} {guide.user?.lastName}
                                        </h3>
                                        
                                        <div className="space-y-2 text-sm">
                                            <div><span className="font-medium">Email:</span> {guide.user?.email}</div>
                                            <div><span className="font-medium">Phone:</span> {guide.user?.phone}</div>
                                            <div><span className="font-medium">Experience:</span> {guide.experienceYears} years</div>
                                            <div><span className="font-medium">Hourly Rate:</span> ${guide.hoursRate}</div>
                                            <div><span className="font-medium">SLTA License:</span> {guide.sltaLicenseId}</div>
                                            <div><span className="font-medium">NIC:</span> {guide.nicNumber}</div>
                                            <div><span className="font-medium">Applied:</span> {formatDate(guide.createdAt)}</div>
                                        </div>
                                    </div>

                                    {/* Languages & Specializations */}
                                    <div>
                                        <div className="mb-4">
                                            <h4 className="font-medium text-gray-900 mb-2">Languages</h4>
                                            <div className="flex flex-wrap gap-1">
                                                {guide.languagesSpoken?.map((lang, index) => (
                                                    <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                                        {lang}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        
                                        <div className="mb-4">
                                            <h4 className="font-medium text-gray-900 mb-2">Specializations</h4>
                                            <div className="flex flex-wrap gap-1">
                                                {guide.specialization?.map((spec, index) => (
                                                    <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                                        {spec}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Bio */}
                                <div className="mt-4">
                                    <h4 className="font-medium text-gray-900 mb-2">Bio</h4>
                                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                                        {guide.bio}
                                    </p>
                                </div>

                                {/* Documents */}
                                <div className="mt-4">
                                    <h4 className="font-medium text-gray-900 mb-2">Documents</h4>
                                    <div className="grid grid-cols-3 gap-4 text-xs">
                                        <div>
                                            <span className="font-medium">SLTA License:</span>
                                            <span className="text-blue-600 ml-1">
                                                {guide.sltaLicensePhoto?.length || 0} file(s)
                                            </span>
                                        </div>
                                        <div>
                                            <span className="font-medium">NIC Front:</span>
                                            <span className="text-blue-600 ml-1">
                                                {guide.nicPhotoFront?.length || 0} file(s)
                                            </span>
                                        </div>
                                        <div>
                                            <span className="font-medium">NIC Back:</span>
                                            <span className="text-blue-600 ml-1">
                                                {guide.nicPhotoBack?.length || 0} file(s)
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="mt-6 flex gap-3">
                                    <button
                                        onClick={() => handleApproval(guide.id, 'approve')}
                                        disabled={actionLoading[guide.id]}
                                        className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-4 py-2 rounded font-medium transition-colors"
                                    >
                                        {actionLoading[guide.id] ? 'Processing...' : 'Approve'}
                                    </button>
                                    <button
                                        onClick={() => handleApproval(guide.id, 'reject')}
                                        disabled={actionLoading[guide.id]}
                                        className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-4 py-2 rounded font-medium transition-colors"
                                    >
                                        {actionLoading[guide.id] ? 'Processing...' : 'Reject'}
                                    </button>
                                    <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded font-medium transition-colors">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Main>
    );
}
