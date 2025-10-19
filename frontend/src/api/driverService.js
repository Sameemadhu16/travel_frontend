import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5454';

/**
 * Register a new driver
 * @param {Object} driverData - Driver data including user and agency association
 * @returns {Promise} - API response with created driver
 */
export const registerDriver = async (driverData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/drivers/register`, driverData);
    return response.data;
  } catch (error) {
    console.error('Error registering driver:', error);
    throw error;
  }
};

/**
 * Get all drivers
 * @returns {Promise} - List of all drivers
 */
export const getAllDrivers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/drivers/all`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all drivers:', error);
    throw error;
  }
};

/**
 * Get driver by ID
 * @param {number} id - Driver ID
 * @returns {Promise} - Driver data
 */
export const getDriverById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/drivers/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching driver:', error);
    throw error;
  }
};

/**
 * Get drivers by agency ID
 * @param {number} agencyId - Agency ID
 * @returns {Promise} - List of drivers for the agency
 */
export const getDriversByAgencyId = async (agencyId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/drivers/agency/${agencyId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching drivers by agency:', error);
    throw error;
  }
};

/**
 * Get driver by user ID
 * @param {number} userId - User ID
 * @returns {Promise} - Driver data
 */
export const getDriverByUserId = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/drivers/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching driver by user ID:', error);
    throw error;
  }
};

/**
 * Get drivers with pagination
 * @param {number} page - Page number (default 0)
 * @param {number} size - Page size (default 5)
 * @returns {Promise} - Paginated driver data
 */
export const getDriversPaged = async (page = 0, size = 5) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/drivers/paged`, {
      params: { page, size }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching paged drivers:', error);
    throw error;
  }
};

/**
 * Update driver
 * @param {number} id - Driver ID
 * @param {Object} driverData - Updated driver data
 * @returns {Promise} - Updated driver data
 */
export const updateDriver = async (id, driverData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/api/drivers/${id}`, driverData);
    return response.data;
  } catch (error) {
    console.error('Error updating driver:', error);
    throw error;
  }
};

/**
 * Delete driver
 * @param {number} id - Driver ID
 * @returns {Promise} - API response
 */
export const deleteDriver = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/drivers/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting driver:', error);
    throw error;
  }
};
