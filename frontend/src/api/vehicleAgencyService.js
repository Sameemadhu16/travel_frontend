import axios from 'axios';
import { API_BASE_URL } from '../core/service';

/**
 * Vehicle Agency API Service
 * Handles all API calls related to vehicle agency management
 */

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Register a new vehicle agency
 * @param {Object} agencyData - Vehicle agency registration data
 * @returns {Promise<Object>} Response data
 */
export const registerVehicleAgency = async (agencyData) => {
    try {
        const response = await apiClient.post('/api/vehicleAgencies/register', agencyData);
        return response.data;
    } catch (error) {
        console.error('Error registering vehicle agency:', error);
        if (error.response) {
            throw {
                status: error.response.status,
                message: error.response.data || 'Failed to register vehicle agency',
                originalError: error
            };
        }
        throw error;
    }
};

/**
 * Get vehicle agency by user ID
 * @param {number} userId - User ID
 * @returns {Promise<Object>} Vehicle agency object
 */
export const getVehicleAgencyByUserId = async (userId) => {
    try {
        const response = await apiClient.get(`/api/vehicleAgencies/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching vehicle agency for user ${userId}:`, error);
        if (error.response) {
            throw {
                status: error.response.status,
                message: error.response.data || 'Failed to fetch vehicle agency',
                originalError: error
            };
        }
        throw error;
    }
};

/**
 * Get vehicle agency by user's Firebase UID (docId)
 * @param {string} docId - Firebase UID of the user
 * @returns {Promise<Object>} Vehicle agency object
 */
export const getVehicleAgencyByUserDocId = async (docId) => {
    try {
        const response = await apiClient.get(`/api/vehicleAgencies/user/${docId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching vehicle agency by user docId:', error);
        if (error.response) {
            throw {
                status: error.response.status,
                message: error.response.data || 'Failed to fetch vehicle agency',
                originalError: error
            };
        }
        throw error;
    }
};

/**
 * Get vehicle agency by ID
 * @param {number} id - Vehicle agency ID
 * @returns {Promise<Object>} Vehicle agency object
 */
export const getVehicleAgencyById = async (id) => {
    try {
        const response = await apiClient.get(`/api/vehicleAgencies/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching vehicle agency ${id}:`, error);
        throw error;
    }
};

/**
 * Get all vehicle agencies
 * @returns {Promise<Array>} Array of all vehicle agencies
 */
export const getAllVehicleAgencies = async () => {
    try {
        const response = await apiClient.get('/api/vehicleAgencies');
        return response.data;
    } catch (error) {
        console.error('Error fetching vehicle agencies:', error);
        throw error;
    }
};

/**
 * Update vehicle agency by ID
 * @param {number} id - Vehicle agency ID
 * @param {Object} agencyData - Updated vehicle agency data
 * @returns {Promise<Object>} Updated vehicle agency object
 */
export const updateVehicleAgency = async (id, agencyData) => {
    try {
        const response = await apiClient.put(`/api/vehicleAgencies/${id}`, agencyData);
        return response.data;
    } catch (error) {
        console.error(`Error updating vehicle agency ${id}:`, error);
        throw error;
    }
};

/**
 * Delete vehicle agency by ID
 * @param {number} id - Vehicle agency ID
 * @returns {Promise<void>}
 */
export const deleteVehicleAgency = async (id) => {
    try {
        await apiClient.delete(`/api/vehicleAgencies/${id}`);
    } catch (error) {
        console.error(`Error deleting vehicle agency ${id}:`, error);
        throw error;
    }
};
