import axios from 'axios';
import { API_BASE_URL } from '../core/service';

/**
 * User API Service
 * Handles all API calls related to user management
 */

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Get user by Firebase UID (docId)
 * @param {string} docId - Firebase UID of the user
 * @returns {Promise<Object>} User object
 */
export const getUserByDocId = async (docId) => {
    try {
        const response = await apiClient.get(`/api/users/public/${docId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user by docId:', error);
        if (error.response) {
            throw {
                status: error.response.status,
                message: error.response.data || 'Failed to fetch user',
                originalError: error
            };
        }
        throw error;
    }
};

/**
 * Get user by ID
 * @param {number} id - User ID
 * @returns {Promise<Object>} User object
 */
export const getUserById = async (id) => {
    try {
        const response = await apiClient.get(`/api/users/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching user ${id}:`, error);
        throw error;
    }
};

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @returns {Promise<Object>} Response data
 */
export const registerUser = async (userData) => {
    try {
        const response = await apiClient.post('/api/users/register', userData);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

/**
 * Update user by ID
 * @param {number} id - User ID
 * @param {Object} userData - Updated user data
 * @returns {Promise<Object>} Updated user object
 */
export const updateUser = async (id, userData) => {
    try {
        const response = await apiClient.put(`/api/users/${id}`, userData);
        return response.data;
    } catch (error) {
        console.error(`Error updating user ${id}:`, error);
        throw error;
    }
};
