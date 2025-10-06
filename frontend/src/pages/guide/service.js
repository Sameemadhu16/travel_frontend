import { getRequest } from '../../core/service';

/**
 * Fetch all available guides
 * @returns {Promise<Array>} Array of guide objects
 */
export const fetchGuides = async () => {
    try {
        const response = await getRequest('/api/guides');
        return response;
    } catch (error) {
        console.error('Error fetching guides:', error);
        throw error;
    }
};

/**
 * Fetch guides with filters
 * @param {Object} filters - Filter criteria
 * @param {Array} filters.languages - Array of languages
 * @param {Array} filters.specialties - Array of specialties
 * @param {number} filters.minPrice - Minimum price
 * @param {number} filters.maxPrice - Maximum price
 * @param {number} filters.minRating - Minimum rating
 * @param {boolean} filters.availableOnly - Only available guides
 * @returns {Promise<Array>} Filtered array of guide objects
 */
export const fetchGuidesWithFilters = async (filters = {}) => {
    try {
        const response = await getRequest('/api/guides/search', filters);
        return response;
    } catch (error) {
        console.error('Error fetching guides with filters:', error);
        throw error;
    }
};

/**
 * Fetch guide by ID
 * @param {number} guideId - Guide ID
 * @returns {Promise<Object>} Guide object
 */
export const fetchGuideById = async (guideId) => {
    try {
        const response = await getRequest(`/api/guides/${guideId}`);
        return response;
    } catch (error) {
        console.error('Error fetching guide by ID:', error);
        throw error;
    }
};

/**
 * Check guide availability for specific dates
 * @param {number} guideId - Guide ID
 * @param {string} startDate - Start date (YYYY-MM-DD)
 * @param {string} endDate - End date (YYYY-MM-DD)
 * @returns {Promise<boolean>} Availability status
 */
export const checkGuideAvailability = async (guideId, startDate, endDate) => {
    try {
        const response = await getRequest(`/api/guides/${guideId}/availability`, {
            startDate,
            endDate
        });
        return response.available;
    } catch (error) {
        console.error('Error checking guide availability:', error);
        throw error;
    }
};