import axios from 'axios';
import { API_BASE_URL } from '../core/service';

/**
 * Hotel API Service
 * Handles all API calls related to hotel management
 */

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Get hotel by user's Firebase UID (docId)
 * @param {string} docId - Firebase UID of the user
 * @returns {Promise<Object>} Hotel object
 */
export const getHotelByUserDocId = async (docId) => {
    try {
        const response = await apiClient.get(`/api/hotels/user/${docId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching hotel by user docId:', error);
        if (error.response) {
            throw {
                status: error.response.status,
                message: error.response.data || 'Failed to fetch hotel',
                originalError: error
            };
        }
        throw error;
    }
};

/**
 * Get hotel by ID
 * @param {number} id - Hotel ID
 * @returns {Promise<Object>} Hotel object
 */
export const getHotelById = async (id) => {
    try {
        const response = await apiClient.get(`/api/hotels/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching hotel ${id}:`, error);
        throw error;
    }
};

/**
 * Get all hotels
 * @returns {Promise<Array>} Array of all hotels
 */
export const getAllHotels = async () => {
    try {
        const response = await apiClient.get('/api/hotels');
        return response.data;
    } catch (error) {
        console.error('Error fetching hotels:', error);
        throw error;
    }
};

/**
 * Register a new hotel
 * @param {Object} hotelData - Hotel registration data
 * @returns {Promise<Object>} Response data
 */
export const registerHotel = async (hotelData) => {
    try {
        const response = await apiClient.post('/api/hotels/register', hotelData);
        return response.data;
    } catch (error) {
        console.error('Error registering hotel:', error);
        throw error;
    }
};

/**
 * Update hotel by ID
 * @param {number} id - Hotel ID
 * @param {Object} hotelData - Updated hotel data
 * @returns {Promise<Object>} Updated hotel object
 */
export const updateHotel = async (id, hotelData) => {
    try {
        const response = await apiClient.put(`/api/hotels/${id}`, hotelData);
        return response.data;
    } catch (error) {
        console.error(`Error updating hotel ${id}:`, error);
        throw error;
    }
};
