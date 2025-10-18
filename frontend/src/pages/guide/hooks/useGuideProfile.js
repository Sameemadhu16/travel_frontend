import { useState, useEffect } from 'react';
import { getRequest, putRequest } from '../../../core/service'; // Adjust path to your service.js
// import { getUserIdFromStorage } from '../../../core/authHelper'; // Import helper if using it

const useGuideProfile = (userId) => {
    // If userId not provided, try to get it from storage
    // const finalUserId = userId || getUserIdFromStorage()
    const [guideData, setGuideData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch guide profile data
    useEffect(() => {
        if (!userId) {
            setError('User ID not provided');
            setLoading(false);
            return;
        }

        const fetchGuideProfile = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // Fetch guide data by userId
                const response = await getRequest(`/api/guides/user/${userId}`);
                
                // Transform the response to match your component's needs
                const transformedData = {
                    guideId: response.id,
                    firstName: response.user?.firstName || '',
                    lastName: response.user?.lastName || '',
                    email: response.user?.email || '',
                    nicNumber: response.nicNumber || '',
                    phoneNumber: response.user?.phone || '', // Adjust if phone is stored elsewhere
                    licenseNumber: response.sltaLicenseId || '',
                    businessEmail: response.user?.email || '',
                    bio: response.bio || '',
                    languages: response.languagesSpoken || [],
                    specializations: response.specialization || [],
                    experienceYears: response.experienceYears || 0,
                    hoursRate: response.hoursRate || 0,
                    isVerified: response.isVerified || false,
                    isAvailable: response.isAvailable || false,
                    sltaLicenseExpiry: response.sltaLicenseExpiry || null,
                    profilePicture: response.user?.profilePictures?.[0] || null,
                    nicPhotoFront: response.nicPhotoFront?.[0] || null,
                    sltaLicensePhoto: response.sltaLicensePhoto?.[0] || null,
                };

                setGuideData(transformedData);
            } catch (err) {
                setError(err.message || 'Failed to fetch guide profile');
                console.error('Error fetching guide profile:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchGuideProfile();
    }, [userId]);

    // Update guide profile data
    const updateGuideProfile = async (updatedData) => {
        try {
            setLoading(true);
            setError(null);

            const payload = {
                id: guideData.guideId,
                bio: updatedData.bio,
                languagesSpoken: updatedData.languages,
                specialization: updatedData.specializations,
                experienceYears: updatedData.experienceYears,
                hoursRate: updatedData.hoursRate,
                nicNumber: updatedData.nicNumber,
                sltaLicenseId: updatedData.licenseNumber,
            };

            const response = await putRequest(`/guides/${guideData.guideId}`, payload);
            
            setGuideData(prev => ({
                ...prev,
                ...updatedData
            }));

            return response;
        } catch (err) {
            setError(err.message || 'Failed to update guide profile');
            console.error('Error updating guide profile:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        guideData,
        loading,
        error,
        updateGuideProfile
    };
};

export default useGuideProfile;