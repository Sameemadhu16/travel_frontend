import React, { useState, useEffect } from 'react';
import Main from '../../components/Main';
import Title from '../../components/Title';
import PrimaryButton from '../../components/PrimaryButton';
import { postRequest, getRequest } from '../../core/service';
import { showToastMessage } from '../../utils/toastHelper';
import Spinner from '../../components/Spinner';

export default function AdminVehicleAgencyReview() {
    const [pendingAgencies, setPendingAgencies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState({});

    useEffect(() => {
        fetchPendingAgencies();
    }, []);

    const fetchPendingAgencies = async () => {
        try {
            setLoading(true);
            const response = await getRequest('/api/admin/vehicle-agencies/pending');
            setPendingAgencies(response.data || []);
        } catch (error) {
            console.error('Error fetching pending agencies:', error);
            showToastMessage('error', 'Failed to load pending agencies');
        } finally {
            setLoading(false);
        }
    };

    const handleApproval = async (agencyId, action) => {
        try {
            setActionLoading(prev => ({ ...prev, [agencyId]: true }));
            
            await postRequest(`/api/admin/vehicle-agencies/${agencyId}/${action}`, {});
            
            showToastMessage('success', `Vehicle agency ${action === 'approve' ? 'approved' : 'rejected'} successfully!`);
            
            // Remove the agency from pending list
            setPendingAgencies(prev => prev.filter(agency => agency.id !== agencyId));
            
        } catch (error) {
            console.error(`Error ${action}ing agency:`, error);
            showToastMessage('error', `Failed to ${action} agency`);
        } finally {
            setActionLoading(prev => ({ ...prev, [agencyId]: false }));
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
                <Title title="Vehicle Agency Registration Review" size="text-[36px]" font="font-[600]" />
                
                {pendingAgencies.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Pending Applications</h3>
                        <p className="text-gray-600">All vehicle agency registrations have been reviewed.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {pendingAgencies.map((agency) => (
                            <div key={agency.id} className="bg-white border border-gray-200 rounded-lg p-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Basic Info */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                            {agency.name}
                                        </h3>
                                        
                                        <div className="space-y-2 text-sm">
                                            <div><span className="font-medium">Location:</span> {agency.street}, {agency.city}</div>
                                            <div><span className="font-medium">District:</span> {agency.district}</div>
                                            <div><span className="font-medium">Province:</span> {agency.province}</div>
                                            <div><span className="font-medium">Registration No:</span> {agency.registrationNo}</div>
                                            <div><span className="font-medium">Applied:</span> {formatDate(agency.createdAt)}</div>
                                        </div>
                                    </div>

                                    {/* Additional Info */}
                                    <div>
                                        <div className="mb-4">
                                            <h4 className="font-medium text-gray-900 mb-2">Business Information</h4>
                                            <div className="text-sm text-gray-600">
                                                <p>Established vehicle rental agency providing transportation services.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="mt-4">
                                    <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                                        {agency.description}
                                    </p>
                                </div>

                                {/* Documents & Images */}
                                <div className="mt-4">
                                    <h4 className="font-medium text-gray-900 mb-2">Documents & Images</h4>
                                    <div className="grid grid-cols-2 gap-4 text-xs">
                                        <div>
                                            <span className="font-medium">Business License:</span>
                                            <span className="text-brand-primary ml-1">
                                                {agency.licensePhoto?.length || 0} file(s)
                                            </span>
                                        </div>
                                        <div>
                                            <span className="font-medium">Agency Images:</span>
                                            <span className="text-brand-primary ml-1">
                                                {agency.images?.length || 0} file(s)
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="mt-6 flex gap-3">
                                    <button
                                        onClick={() => handleApproval(agency.id, 'approve')}
                                        disabled={actionLoading[agency.id]}
                                        className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-4 py-2 rounded font-medium transition-colors"
                                    >
                                        {actionLoading[agency.id] ? 'Processing...' : 'Approve'}
                                    </button>
                                    <button
                                        onClick={() => handleApproval(agency.id, 'reject')}
                                        disabled={actionLoading[agency.id]}
                                        className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-4 py-2 rounded font-medium transition-colors"
                                    >
                                        {actionLoading[agency.id] ? 'Processing...' : 'Reject'}
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
