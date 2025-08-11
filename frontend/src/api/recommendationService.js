import axios from 'axios';

// API client for recommendation service
const recommendationAPI = axios.create({
    baseURL: 'http://localhost:5001/api',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 30000, // 30 seconds for AI generation
});

// Request interceptor for logging
recommendationAPI.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        console.error('❌ Request Error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor for logging
recommendationAPI.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error('❌ Response Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export const recommendationService = {
    // Generate travel recommendations
    async generateRecommendations(userInputs) {
        try {
            const response = await recommendationAPI.post('/recommendations/generate', userInputs);
            console.log(response.data)
            return response.data;
        } catch (error) {
            // Handle different error types
            if (error.response) {
                // Server responded with error status
                throw new Error(error.response.data?.error || 'Server error occurred');
            } else if (error.request) {
                // Request made but no response received
                throw new Error('No response from server. Please check if the backend is running.');
            } else {
                // Something else happened
                throw new Error('Request failed: ' + error.message);
            }
        }
    },

    // Health check
    async healthCheck() {
        try {
            const response = await recommendationAPI.get('/recommendations/health');
            return response.data;
        } catch (error) {
            throw new Error('Backend service is not available');
        }
    }
};

export default recommendationService;
