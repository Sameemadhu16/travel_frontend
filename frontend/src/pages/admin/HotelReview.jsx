import React, { useState, useEffect } from 'react';
import Main from '../../components/Main';
import Title from '../../components/Title';
import PrimaryButton from '../../components/PrimaryButton';
import { postRequest, getRequest } from '../../core/service';
import { showToastMessage } from '../../utils/toastHelper';
import Spinner from '../../components/Spinner';

export default function AdminHotelReview() {
    const [pendingHotels, setPendingHotels] = useState([]);
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState({});

    useEffect(() => {
        fetchPendingHotels();
    }, []);

    const fetchPendingHotels = async () => {
        try {
            setLoading(true);
            const response = await getRequest('/api/admin/hotels/pending');
            setPendingHotels(response.data || []);
        } catch (error) {
            console.error('Error fetching pending hotels:', error);
            showToastMessage('error', 'Failed to load pending hotels');
        } finally {
            setLoading(false);
        }
    };

    const handleApproval = async (hotelId, action) => {
        try {
            setActionLoading(prev => ({ ...prev, [hotelId]: true }));
            
            await postRequest(`/api/admin/hotels/${hotelId}/${action}`, {});
            
            showToastMessage('success', `Hotel ${action === 'approve' ? 'approved' : 'rejected'} successfully!`);
            
            // Remove the hotel from pending list
            setPendingHotels(prev => prev.filter(hotel => hotel.id !== hotelId));
            
        } catch (error) {
            console.error(`Error ${action}ing hotel:`, error);
            showToastMessage('error', `Failed to ${action} hotel`);
        } finally {
            setActionLoading(prev => ({ ...prev, [hotelId]: false }));
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
                <Title title="Hotel Registration Review" size="text-[36px]" font="font-[600]" />
                
                {pendingHotels.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Pending Applications</h3>
                        <p className="text-gray-600">All hotel registrations have been reviewed.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {pendingHotels.map((hotel) => (
                            <div key={hotel.id} className="bg-white border border-gray-200 rounded-lg p-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Basic Info */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                            {hotel.hotelName}
                                        </h3>
                                        
                                        <div className="space-y-2 text-sm">
                                            <div><span className="font-medium">Type:</span> {hotel.type}</div>
                                            <div><span className="font-medium">Location:</span> {hotel.street}, {hotel.city}</div>
                                            <div><span className="font-medium">District:</span> {hotel.district}</div>
                                            <div><span className="font-medium">Province:</span> {hotel.province}</div>
                                            <div><span className="font-medium">Registration No:</span> {hotel.registrationNo}</div>
                                            <div><span className="font-medium">Applied:</span> {formatDate(hotel.createdAt)}</div>
                                        </div>
                                    </div>

                                    {/* Amenities */}
                                    <div>
                                        <div className="mb-4">
                                            <h4 className="font-medium text-gray-900 mb-2">Amenities</h4>
                                            <div className="flex flex-wrap gap-1">
                                                {hotel.amenities?.map((amenity, index) => (
                                                    <span key={index} className="bg-brand-accent text-brand-primary text-xs px-2 py-1 rounded">
                                                        {amenity}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="mt-4">
                                    <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                                        {hotel.description}
                                    </p>
                                </div>

                                {/* Documents & Images */}
                                <div className="mt-4">
                                    <h4 className="font-medium text-gray-900 mb-2">Documents & Images</h4>
                                    <div className="grid grid-cols-2 gap-4 text-xs">
                                        <div>
                                            <span className="font-medium">Business License:</span>
                                            <span className="text-brand-primary ml-1">
                                                {hotel.licensePhoto?.length || 0} file(s)
                                            </span>
                                        </div>
                                        <div>
                                            <span className="font-medium">Hotel Images:</span>
                                            <span className="text-brand-primary ml-1">
                                                {hotel.images?.length || 0} file(s)
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="mt-6 flex gap-3">
                                    <button
                                        onClick={() => handleApproval(hotel.id, 'approve')}
                                        disabled={actionLoading[hotel.id]}
                                        className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-4 py-2 rounded font-medium transition-colors"
                                    >
                                        {actionLoading[hotel.id] ? 'Processing...' : 'Approve'}
                                    </button>
                                    <button
                                        onClick={() => handleApproval(hotel.id, 'reject')}
                                        disabled={actionLoading[hotel.id]}
                                        className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-4 py-2 rounded font-medium transition-colors"
                                    >
                                        {actionLoading[hotel.id] ? 'Processing...' : 'Reject'}
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
