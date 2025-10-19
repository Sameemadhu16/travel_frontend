import axios from 'axios';
import { API_BASE_URL } from '../core/service';

/**
 * Room API Service
 * Handles all API calls related to room management
 */

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Create a new room for the authenticated hotel
 * @param {Object} roomData - Room data including roomType, description, maxGuests, bedTypes, pricePerNight, amenities, images
 * @param {string} userDocId - Firebase UID of the authenticated user
 * @returns {Promise<Object>} Created room object
 */
export const createRoom = async (roomData, userDocId) => {
    try {
        const response = await apiClient.post('/api/rooms', roomData, {
            headers: {
                'X-User-DocId': userDocId
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating room:', error);
        // Return structured error for better handling
        if (error.response) {
            throw {
                status: error.response.status,
                message: error.response.data || 'Failed to create room',
                originalError: error
            };
        }
        throw error;
    }
};

/**
 * Get all rooms
 * @returns {Promise<Array>} Array of all rooms
 */
export const getAllRooms = async () => {
    try {
        const response = await apiClient.get('/api/rooms');
        return response.data;
    } catch (error) {
        console.error('Error fetching rooms:', error);
        throw error;
    }
};

/**
 * Get room by ID
 * @param {number} id - Room ID
 * @returns {Promise<Object>} Room object
 */
export const getRoomById = async (id) => {
    try {
        const response = await apiClient.get(`/api/rooms/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching room ${id}:`, error);
        throw error;
    }
};

/**
 * Get rooms by hotel ID
 * @param {number} hotelId - Hotel ID
 * @returns {Promise<Array>} Array of rooms for the hotel
 */
export const getRoomsByHotelId = async (hotelId) => {
    try {
        const response = await apiClient.get(`/api/rooms/hotel/${hotelId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching rooms for hotel ${hotelId}:`, error);
        throw error;
    }
};

/**
 * Update room by ID
 * @param {number} id - Room ID
 * @param {Object} roomData - Updated room data
 * @returns {Promise<Object>} Updated room object
 */
export const updateRoom = async (id, roomData) => {
    try {
        const response = await apiClient.put(`/api/rooms/${id}`, roomData);
        return response.data;
    } catch (error) {
        console.error(`Error updating room ${id}:`, error);
        throw error;
    }
};

/**
 * Delete room by ID
 * @param {number} id - Room ID
 * @returns {Promise<void>}
 */
export const deleteRoom = async (id) => {
    try {
        const response = await apiClient.delete(`/api/rooms/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting room ${id}:`, error);
        throw error;
    }
};
