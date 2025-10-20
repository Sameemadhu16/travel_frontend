import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5454';

/**
 * Register a new vehicle
 * @param {Object} vehicleData - Vehicle data including agency association
 * @returns {Promise} - API response
 */
export const registerVehicle = async (vehicleData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/vehicles/register`, vehicleData);
    return response.data;
  } catch (error) {
    console.error('Error registering vehicle:', error);
    throw error;
  }
};

/**
 * Get vehicle by ID
 * @param {number} id - Vehicle ID
 * @returns {Promise} - Vehicle data
 */
export const getVehicleById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/vehicles/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching vehicle:', error);
    throw error;
  }
};

/**
 * Get vehicles by agency ID
 * @param {number} agencyId - Agency ID
 * @returns {Promise} - List of vehicles
 */
export const getVehiclesByAgencyId = async (agencyId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/vehicles/agency/${agencyId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching vehicles by agency:', error);
    throw error;
  }
};

/**
 * Get all vehicles
 * @returns {Promise} - List of all vehicles
 */
export const getAllVehicles = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/vehicles`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all vehicles:', error);
    throw error;
  }
};

/**
 * Update vehicle
 * @param {number} id - Vehicle ID
 * @param {Object} vehicleData - Updated vehicle data
 * @returns {Promise} - Updated vehicle data
 */
export const updateVehicle = async (id, vehicleData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/api/vehicles/${id}`, vehicleData);
    return response.data;
  } catch (error) {
    console.error('Error updating vehicle:', error);
    throw error;
  }
};

/**
 * Delete vehicle
 * @param {number} id - Vehicle ID
 * @returns {Promise} - API response
 */
export const deleteVehicle = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/vehicles/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting vehicle:', error);
    throw error;
  }
};

/**
 * Create a vehicle booking
 * @param {Object} bookingData - Booking details
 * @returns {Promise} - Created booking data
 */
export const createVehicleBooking = async (bookingData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${API_BASE_URL}/api/bookings/vehicles`,
      bookingData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating vehicle booking:', error);
    throw error;
  }
};

/**
 * Get vehicle bookings by user ID
 * @param {number} userId - User ID
 * @returns {Promise} - List of bookings
 */
export const getVehicleBookingsByUserId = async (userId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(
      `${API_BASE_URL}/api/bookings/vehicles/user/${userId}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching vehicle bookings:', error);
    throw error;
  }
};

/**
 * Get vehicle booking by ID
 * @param {number} bookingId - Booking ID
 * @returns {Promise} - Booking data
 */
export const getVehicleBookingById = async (bookingId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(
      `${API_BASE_URL}/api/bookings/vehicles/${bookingId}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching vehicle booking:', error);
    throw error;
  }
};

/**
 * Cancel vehicle booking
 * @param {number} bookingId - Booking ID
 * @returns {Promise} - API response
 */
export const cancelVehicleBooking = async (bookingId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(
      `${API_BASE_URL}/api/bookings/vehicles/${bookingId}/cancel`,
      {},
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error cancelling vehicle booking:', error);
    throw error;
  }
};
