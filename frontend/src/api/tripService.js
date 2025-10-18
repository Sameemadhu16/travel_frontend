import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

/**
 * Get all trips for a specific user
 * @param {number} userId - The user ID
 * @returns {Promise} Array of trips
 */
export const getUserTrips = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/trips/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user trips:', error);
        throw error;
    }
};

/**
 * Get a specific trip by ID
 * @param {number} tripId - The trip ID
 * @returns {Promise} Trip details
 */
export const getTripById = async (tripId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/trips/${tripId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching trip:', error);
        throw error;
    }
};

/**
 * Get all guide requests for a specific user
 * @param {number} userId - The user ID
 * @returns {Promise} Array of guide requests
 */
export const getUserGuideRequests = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/guid-requests/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching guide requests:', error);
        throw error;
    }
};

/**
 * Get all guide requests for a specific trip
 * @param {number} tripId - The trip ID
 * @returns {Promise} Array of guide requests for the trip
 */
export const getTripGuideRequests = async (tripId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/guid-requests/trip/${tripId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching trip guide requests:', error);
        throw error;
    }
};

/**
 * Update guide request status
 * @param {number} requestId - The guide request ID
 * @param {string} status - New status (pending/approved/rejected)
 * @returns {Promise} Updated guide request
 */
export const updateGuideRequestStatus = async (requestId, status) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/guid-requests/${requestId}`, { status });
        return response.data;
    } catch (error) {
        console.error('Error updating guide request status:', error);
        throw error;
    }
};

/**
 * Get trips with guide request details for a user
 * @param {number} userId - The user ID
 * @returns {Promise} Array of trips with their guide requests
 */
export const getUserTripsWithGuideRequests = async (userId) => {
    try {
        const trips = await getUserTrips(userId);
        
        // Fetch guide requests for each trip
        const tripsWithRequests = await Promise.all(
            trips.map(async (trip) => {
                try {
                    const guideRequests = await getTripGuideRequests(trip.id);
                    return {
                        ...trip,
                        guideRequests: guideRequests || []
                    };
                } catch (error) {
                    console.error(`Error fetching guide requests for trip ${trip.id}:`, error);
                    return {
                        ...trip,
                        guideRequests: []
                    };
                }
            })
        );
        
        return tripsWithRequests;
    } catch (error) {
        console.error('Error fetching trips with guide requests:', error);
        throw error;
    }
};
