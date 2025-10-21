import { getRequest, postRequest, putRequest } from '../core/service';

/**
 * Guide Booking API Service
 * Handles all API calls related to standalone guide bookings (not part of tours)
 */

// Helper function to get user ID from Redux persist storage or localStorage
const getUserId = () => {
    // First, try to get from Redux persist storage
    try {
        const persistRoot = localStorage.getItem('persist:auth');
        if (persistRoot) {
            const authData = JSON.parse(persistRoot);
            if (authData.user) {
                const user = JSON.parse(authData.user);
                if (user?.data?.id) {
                    return user.data.id;
                }
            }
        }
    } catch (e) {
        console.error('Error parsing Redux persist storage:', e);
    }
    
    // Fallback: Try multiple possible storage keys
    const userId = localStorage.getItem('userId') || 
                   localStorage.getItem('user_id') ||
                   sessionStorage.getItem('userId') ||
                   sessionStorage.getItem('user_id');
    
    if (!userId) {
        // Try to get from user object
        const userStr = localStorage.getItem('user') || sessionStorage.getItem('user');
        if (userStr) {
            try {
                const user = JSON.parse(userStr);
                return user.id || user.userId || user.data?.id;
            } catch (e) {
                console.error('Error parsing user object:', e);
            }
        }
    }
    
    return userId;
};

// Helper function to get guide ID from Redux persist storage or localStorage (for guide users)
const getGuideId = () => {
    // First, try to get from Redux persist storage
    try {
        const persistRoot = localStorage.getItem('persist:auth');
        if (persistRoot) {
            const authData = JSON.parse(persistRoot);
            if (authData.user) {
                const user = JSON.parse(authData.user);
                // Check if user has guide data
                if (user?.data?.guideId) {
                    return user.data.guideId;
                }
                if (user?.data?.guide?.id) {
                    return user.data.guide.id;
                }
            }
        }
    } catch (e) {
        console.error('Error parsing Redux persist storage:', e);
    }
    
    const guideId = localStorage.getItem('guideId') || 
                    localStorage.getItem('guide_id') ||
                    sessionStorage.getItem('guideId') ||
                    sessionStorage.getItem('guide_id');
    
    if (!guideId) {
        const userStr = localStorage.getItem('user') || sessionStorage.getItem('user');
        if (userStr) {
            try {
                const user = JSON.parse(userStr);
                return user.guideId || user.guide_id || user.guide?.id;
            } catch (e) {
                console.error('Error parsing user object:', e);
            }
        }
    }
    
    return guideId;
};

// Create a new guide booking
export const createGuideBooking = async (bookingData) => {
    try {
        const userId = getUserId();
        if (!userId) {
            throw new Error('User ID not found. Please login again.');
        }
        
        // Ensure userId is included in the request
        const requestData = {
            ...bookingData,
            userId: parseInt(userId)
        };
        
        const response = await postRequest('/api/guide-bookings', requestData);
        return response;
    } catch (error) {
        console.error('Error creating guide booking:', error);
        throw error;
    }
};

// Get all bookings for the current user
export const getMyGuideBookings = async () => {
    try {
        const userId = getUserId();
        if (!userId) {
            throw new Error('User ID not found. Please login again.');
        }
        
        // Fetch from guid_requests table which has the correct status
        const bookings = await getRequest(`/api/guid-requests/user/${userId}`);
        return bookings;
    } catch (error) {
        console.error('Error fetching my guide bookings:', error);
        throw error;
    }
};

// Get all bookings for the current user, grouped by multi_request_id
// Returns bookings grouped with all guides and their individual statuses
export const getMyGuideBookingsGrouped = async () => {
    try {
        const userId = getUserId();
        if (!userId) {
            throw new Error('User ID not found. Please login again.');
        }
        
        const bookings = await getRequest('/api/guide-bookings/my-bookings/grouped', { userId: parseInt(userId) });
        return bookings;
    } catch (error) {
        console.error('Error fetching grouped guide bookings:', error);
        throw error;
    }
};

// Get a specific booking by ID
export const getGuideBookingById = async (id) => {
    try {
        const booking = await getRequest(`/api/guide-bookings/${id}`);
        return booking;
    } catch (error) {
        console.error(`Error fetching guide booking ${id}:`, error);
        throw error;
    }
};

// Get all booking requests for a guide (guide's perspective)
export const getGuideBookingRequests = async () => {
    try {
        const guideId = getGuideId();
        if (!guideId) {
            throw new Error('Guide ID not found. Please ensure you are logged in as a guide.');
        }
        
        const requests = await getRequest('/api/guide-bookings/requests', { guideId: parseInt(guideId) });
        return requests;
    } catch (error) {
        console.error('Error fetching guide booking requests:', error);
        throw error;
    }
};

// Guide approves a booking
export const approveGuideBooking = async (id) => {
    try {
        const guideId = getGuideId();
        if (!guideId) {
            throw new Error('Guide ID not found. Please ensure you are logged in as a guide.');
        }
        
        const response = await putRequest(`/api/guide-bookings/${id}/approve`, {}, { guideId: parseInt(guideId) });
        return response;
    } catch (error) {
        console.error(`Error approving booking ${id}:`, error);
        throw error;
    }
};

// Guide rejects a booking
export const rejectGuideBooking = async (id, reason) => {
    try {
        const guideId = getGuideId();
        if (!guideId) {
            throw new Error('Guide ID not found. Please ensure you are logged in as a guide.');
        }
        
        const response = await putRequest(`/api/guide-bookings/${id}/reject?guideId=${parseInt(guideId)}`, { reason });
        return response;
    } catch (error) {
        console.error(`Error rejecting booking ${id}:`, error);
        throw error;
    }
};

// User pays for an approved booking
export const payGuideBooking = async (id, paymentData) => {
    try {
        const userId = getUserId();
        if (!userId) {
            throw new Error('User ID not found. Please login again.');
        }
        
        const response = await postRequest(`/api/guide-bookings/${id}/pay?userId=${parseInt(userId)}`, paymentData);
        return response;
    } catch (error) {
        console.error(`Error paying for booking ${id}:`, error);
        throw error;
    }
};

// Cancel a booking
export const cancelGuideBooking = async (id, reason) => {
    try {
        const userId = getUserId();
        if (!userId) {
            throw new Error('User ID not found. Please login again.');
        }
        
        const response = await putRequest(`/api/guide-bookings/${id}/cancel?userId=${parseInt(userId)}`, { reason });
        return response;
    } catch (error) {
        console.error(`Error cancelling booking ${id}:`, error);
        throw error;
    }
};

// Complete a booking
export const completeGuideBooking = async (id) => {
    try {
        const guideId = getGuideId();
        if (!guideId) {
            throw new Error('Guide ID not found. Please ensure you are logged in as a guide.');
        }
        
        const response = await putRequest(`/api/guide-bookings/${id}/complete?guideId=${parseInt(guideId)}`);
        return response;
    } catch (error) {
        console.error(`Error completing booking ${id}:`, error);
        throw error;
    }
};

// Check booking availability
export const checkGuideAvailability = async (guideId, startDate, endDate) => {
    try {
        const response = await getRequest(`/api/guide-bookings/check-availability`, {
            guideId,
            startDate,
            endDate
        });
        return response;
    } catch (error) {
        console.error('Error checking guide availability:', error);
        throw error;
    }
};
